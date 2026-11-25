<script setup lang="ts">
import { festivals } from '~/data/festivals'
import { site } from '~/data/site'

usePageSeo({
  title: '节日花礼｜情人节、母亲节、七夕、教师节怎么送花｜刺猬花',
  description:
    '刺猬花按节日整理送花方案：情人节、母亲节、毕业季、七夕、教师节、春节年花，分别什么时候订、预算怎么分、该选什么花、哪些做法容易出问题。',
  path: '/festivals/',
  keywords: ['节日送花', '情人节送花', '母亲节送花', '七夕送花', '教师节送花', '春节年花'],
  structuredData: [
    {
      '@type': 'CollectionPage',
      name: '节日花礼｜刺猬花',
      description: '按节日整理的订花时间、预算档位与花材建议。',
      url: `${site.url}/festivals/`,
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: '节日花礼', item: `${site.url}/festivals/` },
      ],
    },
  ],
})
</script>

<template>
  <div>
    <section class="page-header">
      <div class="container">
        <p class="eyebrow">festivals · 节日花礼</p>
        <h1>节日送花，先算时间再算预算</h1>
        <p class="page-intro">
          同一个节日，提前一周订和当天现买，价格能差一倍，花材等级也不一样。这里按
          {{ festivals.length }}
          个节日整理可执行的方案：什么时候订、钱怎么分、花怎么选、哪些坑要绕开。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="scene-grid">
          <article
            v-for="festival in festivals"
            :key="festival.slug"
            class="scene-card"
            :style="{ '--scene-tone': festival.tone }"
          >
            <p class="eyebrow mb-2">{{ festival.english }}</p>
            <h2 class="text-[21px]">
              <NuxtLink :to="`/festivals/${festival.slug}/`">{{ festival.name }}</NuxtLink>
            </h2>
            <p class="scene-tagline">{{ festival.tagline }}</p>
            <p class="muted m-0 text-sm">{{ festival.intro }}</p>
            <div class="scene-meta">
              <span>{{ festival.timing }}</span>
              <span>{{ festival.leadTime }}</span>
            </div>
          </article>
        </div>

        <div class="note-box">
          <strong>一个通用判断：</strong>
          节日花价上涨主要来自供需，不是花材本身变好。同样的预算，提前订能买到更高等级的主花；
          当天买，往往只够买包装。送花之前先确认对方方便收花的时间，比选什么花更影响体验。
        </div>
      </div>
    </section>
  </div>
</template>
