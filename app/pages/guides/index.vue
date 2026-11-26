<script setup lang="ts">
import { formatGuideDate, guides } from '~/data/guides'
import { site } from '~/data/site'

usePageSeo({
  title: '指南｜养花、选购与送花礼仪｜刺猬花',
  description: `刺猬花整理了 ${guides.length} 篇可执行的鲜花指南：延长花期、判断新鲜度、花材等级与价格、主花怎么选、送花礼仪与四季花材日历。`,
  path: '/guides/',
  keywords: ['鲜花养护', '买花技巧', '花材等级', '送花礼仪', '鲜花指南'],
  structuredData: [
    {
      '@type': 'CollectionPage',
      name: '养护指南｜刺猬花',
      description: '鲜花养护、选购与季节花材的实践整理。',
      url: `${site.url}/guides/`,
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: '指南', item: `${site.url}/guides/` },
      ],
    },
  ],
})
</script>

<template>
  <div>
    <section class="page-header">
      <div class="container">
        <p class="eyebrow">guides · 指南</p>
        <h1>买花、养花、送花的分寸</h1>
        <p class="page-intro">
          同样一束花，有人摆三天，有人摆一周；有人送得刚刚好，有人让收花的人为难。
          这里写的是能直接执行的做法：怎么挑、怎么养、怎么送。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="index-list">
          <article v-for="(guide, index) in guides" :key="guide.slug" class="index-row">
            <span class="index-no">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3>
                <NuxtLink :to="`/guides/${guide.slug}/`">{{ guide.title }}</NuxtLink>
              </h3>
              <p>{{ guide.description }}</p>
            </div>
            <div class="index-meta">
              <strong>{{ guide.category }}</strong>
              <span>{{ guide.readingTime }} 分钟</span>
              <span>{{ formatGuideDate(guide.date) }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
