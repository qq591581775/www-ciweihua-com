import assert from 'node:assert/strict'
import { access, readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const DIST_DIR = 'dist'
const PAGES_DIR = 'app/pages'
const SITE_URL = 'https://www.ciweihua.com'

async function discoverRoutes(directory, prefix = '') {
  const routes = []
  const entries = await readdir(directory, { withFileTypes: true })
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith('.') || entry.name.endsWith('.d.ts')) continue

    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      routes.push(...(await discoverRoutes(join(directory, entry.name), relativePath)))
      continue
    }
    if (!entry.isFile() || !entry.name.endsWith('.vue')) continue

    const pageName = entry.name.slice(0, -4)
    if (pageName.startsWith('[')) continue

    routes.push(
      pageName === 'index' ? `${prefix ? `/${prefix}` : ''}/` : `/${relativePath.slice(0, -4)}/`,
    )
  }
  return routes
}

const routeToFile = (route) => (route === '/' ? 'index.html' : `${route.slice(1)}index.html`)

const sourceRoutes = await discoverRoutes(PAGES_DIR)

// 动态详情页不在 app/pages 里逐一存在，按 dist 下实际生成的目录补进检查列表。
async function discoverGeneratedRoutes(section) {
  const routes = []
  const directory = join(DIST_DIR, section)
  try {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const candidate = join(directory, entry.name, 'index.html')
      try {
        if ((await stat(candidate)).isFile()) routes.push(`/${section}/${entry.name}/`)
      } catch {
        // 没有 index.html 的目录不是详情页
      }
    }
  } catch {
    // 尚未生成该栏目时跳过
  }
  return routes
}

const generatedDetailRoutes = [
  ...(await discoverGeneratedRoutes('flowers')),
  ...(await discoverGeneratedRoutes('occasions')),
  ...(await discoverGeneratedRoutes('festivals')),
  ...(await discoverGeneratedRoutes('lists')),
  ...(await discoverGeneratedRoutes('guides')),
]

const routes = [...sourceRoutes, ...generatedDetailRoutes].sort()
const routeFiles = routes.map(routeToFile)
const requiredFiles = [
  ...new Set([
    ...routeFiles,
    '200.html',
    '404.html',
    'favicon.svg',
    'robots.txt',
    'sitemap.xml',
    'og-image.jpg',
  ]),
]

for (const file of requiredFiles) {
  const info = await stat(join(DIST_DIR, file))
  assert(info.isFile() && info.size > 0, `${file} is missing or empty`)
}

const pageFiles = [...routeFiles, '404.html']
const checkedAssets = new Set()
const checkedImages = new Set()

for (const file of pageFiles) {
  const html = await readFile(join(DIST_DIR, file), 'utf8')
  assert(html.length > 500, `${file} looks like an empty shell`)
  assert(html.trimEnd().endsWith('</html>'), `${file} has an invalid HTML ending`)
  assert(/<html\s+[^>]*lang="zh-CN"/.test(html), `${file} has no zh-CN language`)
  assert((html.match(/<h1(?:\s|>)/g) ?? []).length === 1, `${file} must contain exactly one h1`)
  assert(!html.includes('movesay'), `${file} still references the source site`)

  for (const match of html.matchAll(/(?:src|href)="(\/_nuxt\/[^"]+)"/g)) {
    const asset = match[1].split('?')[0]
    if (checkedAssets.has(asset)) continue

    const info = await stat(join(DIST_DIR, asset))
    assert(info.isFile() && info.size > 0, `${file} references missing asset ${asset}`)
    checkedAssets.add(asset)
  }

  // 花材图必须来自本站，逐张确认已随构建产物落盘。
  for (const match of html.matchAll(/<img[^>]+src="(\/images\/[^"]+)"/g)) {
    const image = match[1].split('?')[0]
    if (checkedImages.has(image)) continue

    const info = await stat(join(DIST_DIR, image))
    assert(info.isFile() && info.size > 0, `${file} references missing image ${image}`)
    checkedImages.add(image)
  }
}

// 静态站没有服务端路由：站内链接必须能直接落到 dist 里的文件。
for (const file of pageFiles) {
  const html = await readFile(join(DIST_DIR, file), 'utf8')
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const raw = match[1]
    const path = raw.split('#')[0].split('?')[0]
    if (!path || path === '/' || !path.startsWith('/')) continue
    if (path === '/_nuxt/' || path.startsWith('/_nuxt/')) continue

    const relative = path.slice(1)
    const candidates = path.endsWith('/')
      ? [join(DIST_DIR, relative, 'index.html')]
      : [join(DIST_DIR, relative), join(DIST_DIR, relative, 'index.html')]

    let found = false
    for (const candidate of candidates) {
      try {
        if ((await stat(candidate)).isFile()) {
          found = true
          break
        }
      } catch {
        // try the next candidate
      }
    }
    assert(found, `${file} has broken internal link ${raw}`)
  }
}

for (const route of routes) {
  const html = await readFile(join(DIST_DIR, routeToFile(route)), 'utf8')
  const canonicalUrl = `${SITE_URL}${route}`

  assert(
    html.includes(`<link rel="canonical" href="${canonicalUrl}">`),
    `${route} has no matching canonical link`,
  )
  assert(
    html.includes('<meta property="og:site_name" content="刺猬花">'),
    `${route} has no og:site_name`,
  )
  assert(html.includes('og:image'), `${route} has no og:image`)
  assert(html.includes('og:title'), `${route} has no og:title`)
  assert(html.includes('og:image:type'), `${route} has no og:image:type`)
  assert(html.includes('application/ld+json'), `${route} has no structured data`)
  assert(html.includes('og:image:alt'), `${route} has no og:image:alt`)
  assert(html.includes('刺猬花'), `${route} has no site name in the title or body`)
  assert(
    html.includes('name="robots" content="index,follow'),
    `${route} has no index/follow robots meta`,
  )

  if (route.startsWith('/flowers/') && route !== '/flowers/') {
    const slug = route.split('/')[2]
    assert(html.includes(`"@type":"FAQPage"`), `${route} has no FAQ structured data`)
    assert(html.includes(`/images/flowers/${slug}.jpg`), `${route} has no flower social image`)
    assert(html.includes('name="keywords"'), `${route} has no keywords meta`)
  }

  if (route.startsWith('/festivals/') && route !== '/festivals/') {
    assert(html.includes(`"@type":"FAQPage"`), `${route} has no FAQ structured data`)
    assert(html.includes('name="keywords"'), `${route} has no keywords meta`)
    assert(html.includes('预算怎么分'), `${route} has no budget tiers`)
  }

  if (route === '/contact/') {
    assert(html.includes('mailto:591581775@qq.com'), `${route} has no contact email`)
    assert(html.includes('"email":"591581775@qq.com"'), `${route} has no email in structured data`)
  }
}

const notFound = await readFile(join(DIST_DIR, '404.html'), 'utf8')
assert(notFound.includes('页面不存在'), '404.html has no rendered error content')
assert(notFound.includes('name="robots" content="noindex"'), '404.html is not marked noindex')

const home = await readFile(join(DIST_DIR, 'index.html'), 'utf8')
assert(
  !home.includes('type="importmap"'),
  'index.html has an import map; keep entryImportMap disabled',
)
assert(
  !home.includes('"#entry"'),
  'index.html references #entry; client hydration may fail in Chromium',
)

const robots = await readFile(join(DIST_DIR, 'robots.txt'), 'utf8')
assert(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), 'robots.txt has no sitemap')

const sitemap = await readFile(join(DIST_DIR, 'sitemap.xml'), 'utf8')
for (const route of routes) {
  assert(sitemap.includes(`${SITE_URL}${route}`), `sitemap.xml is missing ${route}`)
}

const latest = JSON.parse(await readFile(join(DIST_DIR, '_nuxt/builds/latest.json'), 'utf8'))
const latestMeta = join(DIST_DIR, '_nuxt/builds/meta', `${latest.id}.json`)
assert((await stat(latestMeta)).isFile(), `latest.json points to missing build ${latest.id}`)
await assert.rejects(access(join(DIST_DIR, '.deploy-status')), { code: 'ENOENT' })

console.log(
  `dist verified: ${routes.length} routes, ${pageFiles.length} pages, ${checkedAssets.size} assets, ${checkedImages.size} images`,
)
