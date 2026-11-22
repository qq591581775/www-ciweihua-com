<script setup lang="ts">
import { formatGuideDate, guides } from '~/data/guides'
import { site } from '~/data/site'

usePageSeo({
  title: '养护指南｜让鲜花多开几天的做法｜刺猬花',
  description:
    '刺猬花整理了 4 篇可执行的鲜花养护与选购指南：延长花期、判断新鲜度、花瓶与换水、四季花材日历。',
  path: '/guides/',
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
        <p class="eyebrow">guides · 养护指南</p>
        <h1>花买回家之后，才是关键</h1>
        <p class="page-intro">
          同样一束花，有人摆三天，有人摆一周。差别通常不在花，而在剪口、水位、换水和温度这几个细节。
          这里只写能直接执行的做法。
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
