import { cp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DIST_DIR = 'dist'
// 固定构建时间戳，避免 Nuxt 把当前时间写进产物造成每次 generate 都产生 diff。
const BUILD_TIMESTAMP = 1700000000000
const TEXT_FILE = /\.(?:html|json)$/
const TIMESTAMP_PATTERN = /(?<!\+)\b\d{13}\b/g

async function normalizeDirectory(directory) {
  let normalized = 0
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      normalized += await normalizeDirectory(path)
      continue
    }
    if (!entry.isFile() || !TEXT_FILE.test(entry.name)) continue

    const text = await readFile(path, 'utf8')
    const next = text.replace(TIMESTAMP_PATTERN, String(BUILD_TIMESTAMP))
    if (next === text) continue

    await writeFile(path, next)
    normalized += 1
  }
  return normalized
}

await rm(DIST_DIR, { recursive: true, force: true })
await cp('.output/public', DIST_DIR, { recursive: true })
const normalized = await normalizeDirectory(DIST_DIR)
console.log(`dist exported: ${normalized} timestamped text files normalized`)
