<script setup lang="ts">
import { occasions } from '~/data/occasions'
import { site } from '~/data/site'

usePageSeo({
  title: '送花场景｜告白、生日、探病、商务、婚礼与节日｜刺猬花',
  description:
    '刺猬花按场景整理送花判断：表白与告白、生日送花、探病与看望、商务与开业、婚礼与纪念日、节日与家宴，分别该选什么花、避开什么。',
  path: '/occasions/',
  structuredData: [
    {
      '@type': 'CollectionPage',
      name: '送花场景｜刺猬花',
      description: '按场合整理的选花判断与避雷提醒。',
      url: `${site.url}/occasions/`,
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: '场景', item: `${site.url}/occasions/` },
      ],
    },
  ],
})
</script>

<template>
  <div>
    <section class="page-header">
      <div class="container">
        <p class="eyebrow">occasions · 场景</p>
        <h1>同一束花，换个场合就不合适</h1>
        <p class="page-intro">
          告白可以热烈，探病需要克制，商务要的是得体。这里按
          {{ occasions.length }} 个常见场合整理选花判断：
          该选什么、为什么、尽量避开什么，以及那些容易被忽略的实际问题。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="scene-grid">
          <article
            v-for="occasion in occasions"
            :key="occasion.slug"
            class="scene-card"
            :style="{ '--scene-tone': occasion.tone }"
          >
            <p class="eyebrow mb-2">{{ occasion.english }}</p>
            <h2 class="text-[21px]">
              <NuxtLink :to="`/occasions/${occasion.slug}/`">{{ occasion.name }}</NuxtLink>
            </h2>
            <p class="scene-tagline">{{ occasion.tagline }}</p>
            <p class="muted m-0 text-sm">{{ occasion.intro }}</p>
            <div class="scene-meta">
              <span>{{ occasion.scene }}</span>
              <span>预算 {{ occasion.budget }}</span>
            </div>
          </article>
        </div>

        <div class="note-box">
          <strong>一个通用判断：</strong>
          先想“对方收到之后怎么处理”，再想“我送出去好不好看”。花束的大小、香气、包装复杂度，
          都会影响对方真实的体验。
        </div>
      </div>
    </section>
  </div>
</template>
