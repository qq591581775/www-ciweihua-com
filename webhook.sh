#!/usr/bin/env bash
# ============================================================
# 部署入口：拉取 main、校验 dist、发送钉钉通知
#
# GitHub Actions 或服务器上手动执行：
#   bash /www/wwwroot/www.ciweihua.com/webhook.sh
#
# 默认路径、域名、分支固定；本地测试可用环境变量覆盖：
#   REPO_DIR / WEB_DIR / SITE_URL / DEPLOY_BRANCH / DEPLOY_SHA / STATUS_FILE
# ============================================================
set -u

REPO_ROOT="${REPO_DIR:-/www/wwwroot/www.ciweihua.com}"
WEB_ROOT="${WEB_DIR:-$REPO_ROOT/dist}"
SITE_URL="${SITE_URL:-https://www.ciweihua.com/}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
DEPLOY_SHA="${DEPLOY_SHA:-}"
STATUS_FILE="${STATUS_FILE:-$REPO_ROOT/.deploy-status}"

# 钉钉配置直接内置；可用同名环境变量临时覆盖。
DINGTALK_WEBHOOK="${DINGTALK_WEBHOOK:-https://oapi.dingtalk.com/robot/send?access_token=113088088be0af189659ec7d18ae32837dc65850408cc8201143db0bc73bb16a}"
DINGTALK_SECRET="${DINGTALK_SECRET:-SECa7b64cf44f2fb82d654b54a7a7e41caf0ef39025ff1c6158fb77b98d877fa800}"

# 更新脚本时先复制到临时文件，避免 git 拉取过程中覆盖正在运行的脚本。
if [ "${DEPLOY_HOOK_REEXEC:-0}" != "1" ]; then
  TMP_HOOK="$(mktemp /tmp/deploy-hook.XXXXXX.sh)"
  cp "$0" "$TMP_HOOK"
  trap 'rm -f "$TMP_HOOK"' EXIT
  DEPLOY_HOOK_REEXEC=1 REPO_DIR="$REPO_ROOT" WEB_DIR="$WEB_ROOT" SITE_URL="$SITE_URL" \
    DEPLOY_BRANCH="$DEPLOY_BRANCH" DEPLOY_SHA="$DEPLOY_SHA" STATUS_FILE="$STATUS_FILE" \
    DINGTALK_WEBHOOK="$DINGTALK_WEBHOOK" DINGTALK_SECRET="$DINGTALK_SECRET" bash "$TMP_HOOK" "$@"
  exit $?
fi

START_TS=$(date +%s)
SITE_URL="${SITE_URL%/}/"
SITE_LABEL="${SITE_URL#*://}"
SITE_LABEL="${SITE_LABEL%/}"

log() { printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }
fail() { log "ERROR: $*"; exit 1; }

notify() {
  [ -n "$DINGTALK_WEBHOOK" ] || return 0
  command -v python3 >/dev/null 2>&1 || {
    log "WARN: 未安装 python3，跳过钉钉通知"
    return 0
  }

  local url="$DINGTALK_WEBHOOK" text="$1" ts sign payload response
  if [ -n "$DINGTALK_SECRET" ]; then
    ts="$(python3 -c 'import time; print(int(time.time() * 1000))')"
    sign="$(DINGTALK_SECRET="$DINGTALK_SECRET" TS="$ts" python3 -c '
import base64, hashlib, hmac, os, urllib.parse
secret = os.environ["DINGTALK_SECRET"]
ts = os.environ["TS"]
digest = hmac.new(secret.encode(), (ts + "\n" + secret).encode(), hashlib.sha256).digest()
print(urllib.parse.quote(base64.b64encode(digest).decode()))
')"
    url="${url}&timestamp=${ts}&sign=${sign}"
  fi

  payload="$(DINGTALK_TEXT="$text" SITE_LABEL="$SITE_LABEL" python3 -c '
import json, os
payload = {
    "msgtype": "markdown",
    "markdown": {
        "title": os.environ["SITE_LABEL"] + " 部署",
        "text": os.environ["DINGTALK_TEXT"],
    },
}
print(json.dumps(payload, ensure_ascii=False))
')"
  [ -n "$payload" ] || return 0

  if ! response="$(curl -sS --connect-timeout 5 --max-time 10 -X POST "$url" \
    -H 'Content-Type: application/json' -d "$payload" 2>/dev/null)"; then
    log "WARN: 钉钉通知请求失败"
    return 0
  fi
  log "钉钉通知响应：${response:-空响应}"
}

write_marker() {
  mkdir -p "$(dirname "$STATUS_FILE")" 2>/dev/null || true
  printf '%s %s %s\n' "$1" "${2:-unknown}" "$(date '+%Y-%m-%d %H:%M:%S')" \
    >"$STATUS_FILE" 2>/dev/null || log "WARN: 无法写入 $STATUS_FILE"
}

die() {
  local reason="$1" hash="${2:-unknown}"
  write_marker 0 "$hash"
  notify "## 🚨 ${SITE_LABEL} 部署失败

**${reason}**

**时间** $(date '+%Y-%m-%d %H:%M:%S')"
  fail "$reason"
}

# ---------- 检查仓库和产物 ----------
[ -d "$REPO_ROOT/.git" ] || die "不是 Git 仓库：$REPO_ROOT"
cd "$REPO_ROOT" || die "无法进入仓库：$REPO_ROOT"

log "仓库：$REPO_ROOT"
log "站点根：$WEB_ROOT"
log "站点地址：$SITE_URL"

if [ ! -f "$WEB_ROOT/index.html" ]; then
  die "缺少静态产物 $WEB_ROOT/index.html，请在本地构建并提交 dist/" "$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
fi

# ---------- 拉取固定分支 ----------
# SSH 远程必须设置超时，避免网络抖动长期占用部署进程。
case "$(git remote get-url origin 2>/dev/null || true)" in
  git@*|ssh://*)
    export GIT_SSH_COMMAND="ssh -o ConnectTimeout=10 -o ServerAliveInterval=10 -o ServerAliveCountMax=3 -o BatchMode=yes"
    ;;
esac

run_git() {
  if command -v timeout >/dev/null 2>&1; then
    timeout 90 "$@"
  else
    "$@"
  fi
}

# 部署完成后把旧版写在 dist/ 里的状态文件清掉，避免它继续被当成静态资源提供。
rm -f "$WEB_ROOT/.deploy-status" 2>/dev/null || true

if [ -n "$DEPLOY_SHA" ]; then
  log "部署指定提交：$DEPLOY_SHA"
  if ! run_git git fetch -q --prune origin "+refs/heads/$DEPLOY_BRANCH:refs/remotes/origin/$DEPLOY_BRANCH"; then
    die "git fetch 失败或超时"
  fi
  git cat-file -e "${DEPLOY_SHA}^{commit}" 2>/dev/null || die "提交不存在：$DEPLOY_SHA"
  git merge-base --is-ancestor "$DEPLOY_SHA" "origin/$DEPLOY_BRANCH"     || die "提交不在 $DEPLOY_BRANCH 上：$DEPLOY_SHA"
  run_git git checkout -q --detach "$DEPLOY_SHA"     || die "无法切换到指定提交：$DEPLOY_SHA"
else
  CURRENT_BRANCH="$(git symbolic-ref --short HEAD 2>/dev/null || true)"
  if [ "$CURRENT_BRANCH" != "$DEPLOY_BRANCH" ]; then
    log "切换分支：${CURRENT_BRANCH:-detached} -> $DEPLOY_BRANCH"
    git checkout -q "$DEPLOY_BRANCH" || die "无法切换到分支 $DEPLOY_BRANCH"
  fi

  if ! run_git git fetch -q --prune origin; then
    die "git fetch 失败或超时"
  fi

  if ! run_git git merge -q --ff-only "origin/$DEPLOY_BRANCH"; then
    die "git merge 失败或超时"
  fi

  git branch --set-upstream-to="origin/$DEPLOY_BRANCH" "$DEPLOY_BRANCH" >/dev/null 2>&1 || true
fi
HASH="$(git rev-parse --short HEAD)"
SUBJECT="$(git log -1 --format='%s')"
AUTHOR="$(git log -1 --format='%an')"
COMMIT_DATE="$(git log -1 --format='%cd' --date=format:'%Y-%m-%d %H:%M')"
log "已拉取 ${DEPLOY_BRANCH} @ ${HASH}：${SUBJECT}"

# ---------- 健康检查 ----------
health_paths=(/ /about/ /contact/ /sitemap.xml /robots.txt)
ASSET_PATH="$(grep -oE '(src|href)="[^"]+\.(js|css)"' "$WEB_ROOT/index.html" 2>/dev/null | head -1 | sed -E 's/^(src|href)="//; s/"$//')"
[ -n "$ASSET_PATH" ] && health_paths+=("$ASSET_PATH")

if command -v curl >/dev/null 2>&1; then
  BASE="${SITE_URL%/}"
  # 首次上线或证书刚生效时，Nginx/HTTPS 可能还没就绪，先给站点最多 30 秒启动时间。
  site_ready=""
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    code="$(curl -s -o /dev/null -m 10 -w '%{http_code}' "$BASE/" 2>/dev/null)" || code=000
    [ "${code:-}" = "200" ] && { site_ready=1; break; }
    sleep 3
  done
  [ -n "$site_ready" ] || log "WARN: 站点首页暂未响应，继续逐个检查"

  health_fail=""
  for path in "${health_paths[@]}"; do
    code="$(curl -s -o /dev/null -m 10 -w '%{http_code}' "$BASE$path" 2>/dev/null)" || code=000
    [ -n "${code:-}" ] || code=000
    [ "$code" = "200" ] || health_fail="$health_fail ${path}(${code})"
  done

  if [ -n "$health_fail" ]; then
    die "健康检查失败：${health_fail}" "$HASH"
  fi
  log "健康检查通过（${#health_paths[@]} 个地址）"
else
  log "WARN: 未安装 curl，跳过健康检查"
fi

# ---------- 完成 ----------
write_marker 1 "$HASH"
DURATION=$(( $(date +%s) - START_TS ))
notify "## ✅ ${SITE_LABEL} 部署成功

**分支** \`$DEPLOY_BRANCH\`

**提交** \`$HASH\` · $SUBJECT

**作者** $AUTHOR

**提交时间** $COMMIT_DATE

**耗时** ${DURATION} 秒

**访问** [${SITE_LABEL}](${SITE_URL})"
log "部署完成：${HASH}，耗时 ${DURATION} 秒"
exit 0
