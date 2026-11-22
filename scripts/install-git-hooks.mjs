import { execFileSync } from 'node:child_process'

try {
  execFileSync('git', ['rev-parse', '--is-inside-work-tree'], { stdio: 'ignore' })
} catch {
  console.log('not a git worktree, skip git hooks installation')
  process.exit(0)
}

execFileSync('git', ['config', 'core.hooksPath', '.githooks'])
console.log('git hooks installed: core.hooksPath=.githooks')
