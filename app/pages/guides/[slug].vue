<script setup lang="ts">
import { flowers } from '~/data/flowers'
import { formatGuideDate, getGuide } from '~/data/guides'
import { site } from '~/data/site'

const route = useRoute()
const guide = getGuide(String(route.params.slug))

if (!guide) {
  throw createError({ statusCode: 404, statusMessage: '指南不存在' })
}

const guideText = [
  guide.title,
  guide.description,
  guide.summary,
  ...guide.sections.flatMap((section) => [
    section.heading,
    ...section.paragraphs,
    ...(section.points ?? []),
  ]),
].join(' ')

const matchedFlowers = flowers.filter((flower) => guideText.includes(flower.name))
const relatedFlowers = (
  matchedFlowers.length > 0 ? matchedFlowers : flowers.filter((flower) => flower.featured)
).slice(0, 6)

const keywords = [
  guide.category,
  '鲜花养护',
  '买花指南',
  ...guide.title.split(/[，、：]/).filter((part) => part.length > 1),
]

usePageSeo({
  title: `${guide.title}｜刺猬花`,
  description: guide.description,
  path: `/guides/${guide.slug}/`,
  keywords,
  type: 'article',
  publishedTime: guide.date,
  modifiedTime: guide.updated,
  structuredData: [
    {
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      image: `${site.url}/og-image.jpg`,
      datePublished: guide.date,
      dateModified: guide.updated,
      author: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
      publisher: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
      mainEntityOfPage: `${site.url}/guides/${guide.slug}/`,
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: '指南', item: `${site.url}/guides/` },
        {
          '@type': 'ListItem',
          position: 3,
          name: guide.title,
          item: `${site.url}/guides/${guide.slug}/`,
        },
      ],
    },
  ],
})
</script>

<template>
  <div>
    <section class="page-header">
      <div class="narrow container">
        <nav class="breadcrumb" aria-label="面包屑">
          <NuxtLink to="/">首页</NuxtLink>
          <span>/</span>
          <NuxtLink to="/guides/">指南</NuxtLink>
          <span>/</span>
          <span>{{ guide.category }}</span>
        </nav>
        <p class="guide-meta">
          <strong>{{ guide.category }}</strong>
          <span>{{ guide.readingTime }} 分钟阅读</span>
          <span>{{ formatGuideDate(guide.date) }}</span>
        </p>
        <h1>{{ guide.title }}</h1>
        <p class="page-intro">{{ guide.description }}</p>
      </div>
    </section>

    <section class="section">
      <div class="narrow container">
        <div class="article-summary">{{ guide.summary }}</div>

        <div class="article-body">
          <section v-for="section in guide.sections" :key="section.heading">
            <h2>{{ section.heading }}</h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            <ul v-if="section.points" class="article-points">
              <li v-for="point in section.points" :key="point">{{ point }}</li>
            </ul>
          </section>
        </div>

        <div v-if="relatedFlowers.length > 0" class="article-related">
          <h2>相关花材</h2>
          <div class="chip-row">
            <NuxtLink
              v-for="item in relatedFlowers"
              :key="item.slug"
              :to="`/flowers/${item.slug}/`"
              class="chip-link"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>

        <div class="article-cta">
          <h2>想直接配一束？</h2>
          <p>清单里给了具体支数和预算，照着买就行。</p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/lists/" class="btn btn-primary">看搭配清单</NuxtLink>
            <NuxtLink to="/flowers/" class="btn btn-ghost">回到花材库</NuxtLink>
          </div>
        </div>

        <p class="muted mt-8 text-[13px]">
          养护建议为通用做法，不同花材、不同季节会有差异，以实际花材状态为准。
        </p>
      </div>
    </section>
  </div>
</template>
