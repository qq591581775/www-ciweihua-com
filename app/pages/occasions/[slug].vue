<script setup lang="ts">
import { getFlower } from '~/data/flowers'
import { getOccasion } from '~/data/occasions'
import { site } from '~/data/site'

const route = useRoute()
const occasion = getOccasion(String(route.params.slug))

if (!occasion) {
  throw createError({ statusCode: 404, statusMessage: '场景不存在' })
}

const recommended = occasion.flowers.flatMap((slug) => {
  const item = getFlower(slug)
  return item ? [item] : []
})

usePageSeo({
  title: `${occasion.name}送什么花｜选花判断与避雷｜刺猬花`,
  description: `${occasion.name}：${occasion.tagline}。预算 ${occasion.budget}，推荐花材与需要避开的做法。`,
  path: `/occasions/${occasion.slug}/`,
  type: 'article',
  publishedTime: '2026-11-22',
  modifiedTime: occasion.updated,
  structuredData: [
    {
      '@type': 'Article',
      headline: `${occasion.name}送什么花`,
      description: occasion.intro,
      image: `${site.url}/og-image.jpg`,
      datePublished: '2026-11-22',
      dateModified: occasion.updated,
      author: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
      publisher: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
      mainEntityOfPage: `${site.url}/occasions/${occasion.slug}/`,
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: '场景', item: `${site.url}/occasions/` },
        {
          '@type': 'ListItem',
          position: 3,
          name: occasion.name,
          item: `${site.url}/occasions/${occasion.slug}/`,
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
          <NuxtLink to="/occasions/">场景</NuxtLink>
          <span>/</span>
          <span>{{ occasion.name }}</span>
        </nav>
        <p class="eyebrow">{{ occasion.english }}</p>
        <h1>{{ occasion.name }}，送什么花更合适</h1>
        <p class="page-intro">{{ occasion.intro }}</p>

        <div class="occasion-facts">
          <div>
            <span>适用</span>
            <strong>{{ occasion.scene }}</strong>
          </div>
          <div>
            <span>参考预算</span>
            <strong>{{ occasion.budget }}</strong>
          </div>
          <div>
            <span>推荐花材</span>
            <strong>{{ recommended.length }} 种</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="narrow container">
        <h2 class="section-title">选花的几条判断</h2>
        <ul class="criteria-list">
          <li v-for="item in occasion.criteria" :key="item">{{ item }}</li>
        </ul>

        <div class="detail-section mt-10">
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

        <div class="detail-section">
          <h2>尽量避开</h2>
          <div class="check-box avoid">
            <h3>这些做法容易出问题</h3>
            <ul>
              <li v-for="item in occasion.avoid" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="note-box"><strong>提醒：</strong>{{ occasion.note }}</div>

        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/occasions/" class="btn btn-ghost">返回场景列表</NuxtLink>
          <NuxtLink to="/lists/" class="btn btn-primary">看搭配清单</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
