<script setup lang="ts">
import { getFlower } from '~/data/flowers'
import { getFestival } from '~/data/festivals'
import { getGuide } from '~/data/guides'
import { getList } from '~/data/lists'
import { site } from '~/data/site'

const route = useRoute()
const festival = getFestival(String(route.params.slug))

if (!festival) {
  throw createError({ statusCode: 404, statusMessage: '节日不存在' })
}

const path = `/festivals/${festival.slug}/`

const recommended = festival.flowers.flatMap((slug) => {
  const item = getFlower(slug)
  return item ? [item] : []
})

const relatedLists = festival.lists.flatMap((slug) => {
  const item = getList(slug)
  return item ? [item] : []
})

const relatedGuides = festival.guides.flatMap((slug) => {
  const item = getGuide(slug)
  return item ? [item] : []
})

usePageSeo({
  title: `${festival.name}送什么花｜预算档位与订花时间｜刺猬花`,
  description: `${festival.name}（${festival.timing}）：${festival.tagline}。${festival.leadTime}，预算怎么分、推荐花材、需要避开的做法。`,
  path,
  type: 'article',
  publishedTime: '2026-11-25',
  modifiedTime: festival.updated,
  keywords: [
    `${festival.name}送花`,
    `${festival.name}送什么花`,
    `${festival.name}花束`,
    `${festival.name}鲜花`,
    `${festival.name}订花`,
  ],
  structuredData: [
    {
      '@type': 'Article',
      headline: `${festival.name}送什么花`,
      description: festival.intro,
      image: `${site.url}/og-image.jpg`,
      datePublished: '2026-11-25',
      dateModified: festival.updated,
      author: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
      publisher: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
      mainEntityOfPage: `${site.url}${path}`,
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'FAQPage',
      mainEntity: festival.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: '节日花礼', item: `${site.url}/festivals/` },
        { '@type': 'ListItem', position: 3, name: festival.name, item: `${site.url}${path}` },
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
          <NuxtLink to="/festivals/">节日花礼</NuxtLink>
          <span>/</span>
          <span>{{ festival.name }}</span>
        </nav>
        <p class="eyebrow">{{ festival.english }}</p>
        <h1>{{ festival.name }}，送什么花更合适</h1>
        <p class="page-intro">{{ festival.intro }}</p>

        <div class="occasion-facts">
          <div>
            <span>时间</span>
            <strong>{{ festival.timing }}</strong>
          </div>
          <div>
            <span>建议预订</span>
            <strong>{{ festival.leadTime }}</strong>
          </div>
          <div>
            <span>常送对象</span>
            <strong>{{ festival.audience }}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="narrow container">
        <h2 class="section-title">提前多久准备，按这个节奏走</h2>
        <ul class="criteria-list">
          <li v-for="item in festival.plan" :key="item">{{ item }}</li>
        </ul>

        <div class="detail-section mt-10">
          <h2>预算怎么分</h2>
          <div class="budget-grid">
            <div v-for="item in festival.budgets" :key="item.label" class="budget-card">
              <p class="budget-label">{{ item.label }}</p>
              <p class="budget-range">{{ item.range }}</p>
              <p class="muted m-0 text-sm">{{ item.detail }}</p>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h2>推荐花材</h2>
          <div class="mini-flower-grid">
            <NuxtLink
              v-for="item in recommended"
              :key="item.slug"
              :to="`/flowers/${item.slug}/`"
              class="mini-flower"
            >
              <img :src="item.image" :alt="item.imageAlt" loading="lazy" />
              <div>
                <strong>{{ item.name }}</strong>
                <span>{{ item.family }} · {{ item.price }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div v-if="relatedLists.length" class="detail-section">
          <h2>照着搭配清单买</h2>
          <div class="chip-row">
            <NuxtLink
              v-for="item in relatedLists"
              :key="item.slug"
              :to="`/lists/${item.slug}/`"
              class="chip-link"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>

        <div v-if="relatedGuides.length" class="detail-section">
          <h2>买回家之后</h2>
          <div class="chip-row">
            <NuxtLink
              v-for="item in relatedGuides"
              :key="item.slug"
              :to="`/guides/${item.slug}/`"
              class="chip-link"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>

        <div class="detail-section">
          <h2>尽量避开</h2>
          <div class="check-box avoid">
            <h3>这些做法容易出问题</h3>
            <ul>
              <li v-for="item in festival.avoid" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="detail-section">
          <h2>常见问题</h2>
          <div class="faq-list">
            <details v-for="item in festival.faq" :key="item.question" class="faq-item">
              <summary>{{ item.question }}</summary>
              <p>{{ item.answer }}</p>
            </details>
          </div>
        </div>

        <div class="note-box"><strong>提醒：</strong>{{ festival.note }}</div>

        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/festivals/" class="btn btn-ghost">返回节日列表</NuxtLink>
          <NuxtLink to="/occasions/" class="btn btn-primary">按场景选花</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
