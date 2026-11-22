<script setup lang="ts">
import { type FlowerFamily, flowers, flowersByFamily } from '~/data/flowers'
import { occasions } from '~/data/occasions'
import { site } from '~/data/site'

usePageSeo({
  title: '花材库｜常见鲜花的花语、花期与养护｜刺猬花',
  description:
    '刺猬花的花材库整理了玫瑰、洋桔梗、郁金香、向日葵、绣球、百合、康乃馨、芍药等常见鲜花的花语、花期、参考价格、瓶插期、挑选要点与养护方法。',
  path: '/flowers/',
  structuredData: [
    {
      '@type': 'CollectionPage',
      name: '花材库｜刺猬花',
      description: '常见鲜花花材的花语、花期、价格与养护整理。',
      url: `${site.url}/flowers/`,
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'ItemList',
      name: '常见花材',
      numberOfItems: flowers.length,
      itemListElement: flowers.map((flower, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: flower.name,
        url: `${site.url}/flowers/${flower.slug}/`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: '花材', item: `${site.url}/flowers/` },
      ],
    },
  ],
})

const families: { key: FlowerFamily; title: string; note: string }[] = [
  { key: '主花', title: '主花', note: '决定整束花的气质和体量，通常也是预算的大头。' },
  { key: '配花', title: '配花', note: '负责蓬松、过渡和层次，数量不要超过主花。' },
  { key: '叶材', title: '叶材', note: '让花束有呼吸感，也常常是最耐放的部分。' },
]
</script>

<template>
  <div>
    <section class="page-header">
      <div class="container">
        <p class="eyebrow">flowers · 花材库</p>
        <h1>常见花材，一次看全</h1>
        <p class="page-intro">
          这里整理了 {{ flowers.length }} 种花店里最常见的鲜花，按主花、配花、叶材分组。
          每一种都写了花语、花期、参考价格、瓶插期、挑选要点和养护方法，点进详情可以看到完整信息。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div
          class="border-line bg-surface text-muted rounded-card mb-10 flex flex-wrap gap-x-8 gap-y-3 border px-5 py-4 text-sm"
        >
          <p class="m-0">
            <strong class="text-ink text-base">{{ flowers.length }}</strong> 种花材
          </p>
          <p class="m-0">
            <strong class="text-ink text-base">{{ flowersByFamily('主花').length }}</strong> 种主花
          </p>
          <p class="m-0">
            <strong class="text-ink text-base">{{ flowersByFamily('配花').length }}</strong> 种配花
          </p>
          <p class="m-0">
            <strong class="text-ink text-base">{{ flowersByFamily('叶材').length }}</strong> 种叶材
          </p>
          <p class="m-0">价格区间随城市、季节和等级变化</p>
        </div>

        <div v-for="family in families" :key="family.key" class="mb-14">
          <div class="section-heading">
            <div>
              <h2 class="section-title">{{ family.title }}</h2>
              <p class="section-lead">{{ family.note }}</p>
            </div>
            <span class="text-muted text-sm">{{ flowersByFamily(family.key).length }} 种</span>
          </div>
          <div class="flower-grid">
            <FlowerCard
              v-for="flower in flowersByFamily(family.key)"
              :key="flower.slug"
              :flower="flower"
              :eager="family.key === '主花'"
              heading-level="h3"
            />
          </div>
        </div>

        <div
          class="border-line text-muted mt-4 flex flex-col items-start gap-4 border-t pt-6 text-[15px] sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="m-0">知道该买什么花，但不确定送什么场合？按场景挑会更稳。</p>
          <NuxtLink to="/occasions/" class="btn btn-primary">按场景挑花</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">find by occasion</p>
            <h2 class="section-title">这些花，分别在什么场合用</h2>
            <p class="section-lead">花语只是参考，场合和对方的感受更重要。</p>
          </div>
        </div>
        <div class="chip-row">
          <NuxtLink
            v-for="occasion in occasions"
            :key="occasion.slug"
            :to="`/occasions/${occasion.slug}/`"
            class="chip-link"
          >
            {{ occasion.name }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
