<script setup lang="ts">
import { getFlower } from '~/data/flowers'
import { getList } from '~/data/lists'
import { site } from '~/data/site'

const route = useRoute()
const list = getList(String(route.params.slug))

if (!list) {
  throw createError({ statusCode: 404, statusMessage: '清单不存在' })
}

const sections = list.sections.map((section) => ({
  ...section,
  items: section.items.flatMap((entry) => {
    const flower = getFlower(entry.flower)
    return flower ? [{ ...entry, flower }] : []
  }),
}))

usePageSeo({
  title: `${list.title}｜搭配清单｜刺猬花`,
  description: `${list.description} 预算 ${list.budget}，适用 ${list.scene}。`,
  path: `/lists/${list.slug}/`,
  type: 'article',
  publishedTime: list.date,
  modifiedTime: list.updated,
  structuredData: [
    {
      '@type': 'Article',
      headline: list.title,
      description: list.description,
      image: `${site.url}/og-image.jpg`,
      datePublished: list.date,
      dateModified: list.updated,
      author: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
      publisher: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
      mainEntityOfPage: `${site.url}/lists/${list.slug}/`,
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: '清单', item: `${site.url}/lists/` },
        {
          '@type': 'ListItem',
          position: 3,
          name: list.title,
          item: `${site.url}/lists/${list.slug}/`,
        },
      ],
    },
  ],
})
</script>

<template>
  <div>
    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="面包屑">
          <NuxtLink to="/">首页</NuxtLink>
          <span>/</span>
          <NuxtLink to="/lists/">清单</NuxtLink>
          <span>/</span>
          <span>{{ list.title }}</span>
        </nav>
        <p class="eyebrow">lists · {{ list.scene }}</p>
        <h1>{{ list.title }}</h1>
        <p class="page-intro">{{ list.description }}</p>
        <div class="occasion-facts">
          <div>
            <span>适用场景</span>
            <strong>{{ list.scene }}</strong>
          </div>
          <div>
            <span>参考预算</span>
            <strong>{{ list.budget }}</strong>
          </div>
          <div>
            <span>更新</span>
            <strong>{{ list.updated }}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="narrow container">
        <p class="text-[16px] leading-[1.95]">{{ list.intro }}</p>

        <div v-for="section in sections" :key="section.heading" class="list-section">
          <h2>{{ section.heading }}</h2>
          <p class="section-note">{{ section.note }}</p>
          <article v-for="entry in section.items" :key="entry.flower.slug" class="bouquet-row">
            <NuxtLink :to="`/flowers/${entry.flower.slug}/`">
              <img :src="entry.flower.image" :alt="entry.flower.imageAlt" loading="lazy" />
            </NuxtLink>
            <div>
              <NuxtLink :to="`/flowers/${entry.flower.slug}/`">
                <strong>{{ entry.flower.name }}</strong>
              </NuxtLink>
              <span class="bouquet-qty">{{ entry.quantity }}</span>
              <p>{{ entry.reason }}</p>
            </div>
          </article>
        </div>

        <div class="note-box"><strong>最后提醒：</strong>{{ list.closing }}</div>

        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/lists/" class="btn btn-ghost">返回清单列表</NuxtLink>
          <NuxtLink to="/guides/" class="btn btn-primary">看养护指南</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
