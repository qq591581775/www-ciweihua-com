import { execFileSync } from 'node:child_process'

const output = execFileSync('git', ['status', '--porcelain', '--', 'dist'], {
  encoding: 'utf8',
})

if (output.trim()) {
  console.error('dist/ 与当前源码不一致。')
  console.error('请检查并提交重新生成的 dist/：')
  console.error(output)
  process.exit(1)
}

console.log('dist is in sync')
