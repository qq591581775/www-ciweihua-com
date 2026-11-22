import { execFileSync } from 'node:child_process'

const output = execFileSync('git', ['status', '--porcelain', '--untracked-files=normal'], {
  encoding: 'utf8',
})

const lines = output
  .split('\n')
  .filter(Boolean)
  .filter((line) => !line.slice(3).startsWith('dist/'))

if (lines.length > 0) {
  console.error('工作区存在未提交改动，本地 CI 只校验即将推送的提交。')
  console.error('请先提交或 stash 后再执行：')
  console.error(lines.join('\n'))
  process.exit(1)
}

console.log('worktree clean (dist/ excluded)')
