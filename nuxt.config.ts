import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import tailwindcss from '@tailwindcss/vite'

// 让同一份源码始终生成同一个 buildId，避免每次构建都改写 dist。
const SOURCE_INPUTS = [
  'app',
  'public',
  'nuxt.config.ts',
  'tailwind.config.ts',
  'package.json',
  'package-lock.json',
]

function collectFiles(relativePath: string, files: string[]): void {
  const absolutePath = join(process.cwd(), relativePath)
  const info = statSync(absolutePath)
  if (info.isDirectory()) {
    for (const entry of readdirSync(absolutePath, { withFileTypes: true })) {
      if (entry.name === '.DS_Store') continue
      collectFiles(`${relativePath}/${entry.name}`, files)
    }
    return
  }
  if (info.isFile()) files.push(relativePath)
}

const sourceFiles: string[] = []
for (const input of SOURCE_INPUTS) {
  try {
    collectFiles(input, sourceFiles)
  } catch {
    // 可选输入，例如未检出 package-lock.json 的环境
  }
}

const sourceHash = createHash('sha256')
for (const file of sourceFiles.sort()) {
  sourceHash.update(file)
  sourceHash.update(readFileSync(join(process.cwd(), file)))
}

const prerenderRoutes = [
  '/',
  '/flowers/',
  '/flowers/rose/',
  '/flowers/eustoma/',
  '/flowers/tulip/',
  '/flowers/sunflower/',
  '/flowers/hydrangea/',
  '/flowers/lily/',
  '/flowers/carnation/',
  '/flowers/peony/',
  '/flowers/ranunculus/',
  '/flowers/baby-breath/',
  '/flowers/daisy/',
  '/flowers/eucalyptus/',
  '/occasions/',
  '/occasions/confession/',
  '/occasions/birthday/',
  '/occasions/visit/',
  '/occasions/business/',
  '/occasions/wedding/',
  '/occasions/festival/',
  '/festivals/',
  '/festivals/valentine/',
  '/festivals/mothers-day/',
  '/festivals/graduation/',
  '/festivals/qixi/',
  '/festivals/teachers-day/',
  '/festivals/spring-festival/',
  '/lists/',
  '/lists/first-bouquet/',
  '/lists/desk-week/',
  '/lists/visit-patient/',
  '/lists/wedding-bouquet/',
  '/guides/',
  '/guides/keep-flowers-longer/',
  '/guides/judge-freshness/',
  '/guides/vase-and-water/',
  '/guides/seasonal-calendar/',
  '/about/',
  '/contact/',
]

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  buildId: sourceHash.digest('hex').slice(0, 16),
  devtools: { enabled: false },

  modules: ['@nuxt/eslint'],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: '刺猬花｜鲜花的聚合平台',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            '刺猬花是鲜花的聚合平台：汇总常见花材的花语、花期、参考价格与养护方法，按场景整理送花和买花的判断。',
        },
        { name: 'theme-color', content: '#f8f9f4' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
      ],
    },
  },

  experimental: {
    // 静态站点的部分 Chromium 环境无法解析 Nuxt 生成的 #entry import map。
    entryImportMap: false,
    prerenderErrorPages: true,
  },

  nitro: {
    prerender: {
      // 只生成规范 URL；关闭链接抓取，避免 /flowers 与 /flowers/ 重复写同一文件。
      crawlLinks: false,
      routes: prerenderRoutes,
    },
  },
})
