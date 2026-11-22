# 刺猬花（ciweihua）官网

鲜花的聚合平台，域名 <https://www.ciweihua.com>。整理常见花材的花语、花期、参考价格与养护方法，按送花场景给出判断，不卖花。

## 技术线

与 `www-movesay-net` 完全一致：

- Nuxt 4 静态生成（`nuxt generate`），产物同步到 `dist/` 并提交入库
- Vue 3 + TypeScript + Tailwind CSS 4（`@tailwindcss/vite`，入口 `app/assets/css/main.css`，设计 token 在 `tailwind.config.ts`）
- ESLint + Prettier + Vitest + `vue-tsc`
- 本地 CI（`.githooks/pre-push`）与 GitHub Actions 共用同一套检查
- 服务器无构建环境，站点根指向仓库里的 `dist/`

## 环境

- Node.js >= 20.19（推荐 22）

## 命令

```bash
npm install
npm run dev        # 开发服务器 http://localhost:3000
npm run build      # 服务端构建，产物在 .output/
npm run generate   # 静态生成，构建到 .output/public 并同步到 dist/
npm run preview
npm run typecheck
npm run lint
npm run format:check
npm test
npm run verify:dist
npm run ci:local
npm run hooks:install
```

## 栏目与数据

- 花材库：`app/data/flowers.ts`，列表页 `app/pages/flowers/index.vue`，详情页 `app/pages/flowers/[slug].vue`。
- 送花场景：`app/data/occasions.ts`，列表页 `app/pages/occasions/index.vue`，详情页 `app/pages/occasions/[slug].vue`。
- 搭配清单：`app/data/lists.ts`，列表页 `app/pages/lists/index.vue`，详情页 `app/pages/lists/[slug].vue`。
- 养护指南：`app/data/guides.ts`，列表页 `app/pages/guides/index.vue`，详情页 `app/pages/guides/[slug].vue`。
- 站点常量（域名、名称、邮箱）：`app/data/site.ts`。
- 花材图片放在 `public/images/flowers/<slug>.jpg`（4:5，1000×1250），页面只引用本地路径。

新增花材 / 场景 / 清单 / 指南时，除了补数据，还要同步：

1. `nuxt.config.ts` 的 `nitro.prerender.routes`
2. `public/sitemap.xml`
3. 相关内容之间的引用（花材的搭配与场景、清单里的花材 slug）
4. 图片落盘，并在 `app/data/*.ts` 里写好宽高

`scripts/verify-dist.mjs` 会逐页检查 canonical、og、结构化数据、`_nuxt` 资源、`/images/` 图片、站内链接、404 和 sitemap。

## 设计

- 主色调：树叶绿 `#3f7a3d`（深色 `#2c572c`，浅底 `#e7efe1`）
- 背景纸色 `#f8f9f4`，正文 `#1e261c`，正文弱化 `#68725f`
- 标题使用宋体系（`--font-display`），正文使用系统无衬线字体

## 本地 CI

```bash
npm run hooks:install   # 一次性安装 pre-push 钩子
npm run ci:local        # 手动执行
```

`ci:local` 依次执行：工作区检查（`dist/` 除外）→ lint → 格式检查 → typecheck → 单测 → 静态生成并同步 `dist/` → `verify:dist` → 检查 `dist/` 是否与源码一致 → `webhook.sh` 语法检查。

## 部署

- 主分支 `main`，部署路径 `/www/wwwroot/www.ciweihua.com`，站点根 `dist`。
- `buildId` 由源码内容哈希生成，构建时间戳归一化，重复生成不会产生无意义 diff。
- 站内规范 URL 带尾斜杠。
- GitHub Actions 的 `verify` 通过后才会调用服务器上的 `webhook.sh`；服务器只部署指定提交。

服务器上手动执行：

```bash
bash /www/wwwroot/www.ciweihua.com/webhook.sh
```

Actions 部署时传入精确提交：

```bash
DEPLOY_SHA=<commit-sha> bash /www/wwwroot/www.ciweihua.com/webhook.sh
```

### Nginx 关键配置

```nginx
root /www/wwwroot/www.ciweihua.com/dist;
index index.html;

location = /_nuxt/builds/latest.json {
    add_header Cache-Control "no-cache" always;
}

location ^~ /_nuxt/ {
    add_header Cache-Control "public, max-age=31536000, immutable" always;
}

location = /.deploy-status {
    return 404;
}

location = /200.html {
    return 404;
}

location / {
    try_files $uri $uri/ =404;
}

error_page 404 /404.html;
```

### GitHub Actions Secrets

```text
DEPLOY_HOST
DEPLOY_PORT
DEPLOY_USER
DEPLOY_SSH_KEY
```
