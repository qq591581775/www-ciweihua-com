<script setup lang="ts">
import { lists } from '~/data/lists'
import { site } from '~/data/site'

usePageSeo({
  title: '搭配清单｜按预算和场景配一束花｜刺猬花',
  description:
    '刺猬花整理了 4 份可直接照抄的鲜花搭配清单：第一次买花的 150 元方案、办公桌一周花、探病送花、婚礼手捧花，都给出了具体支数和理由。',
  path: '/lists/',
  structuredData: [
    {
      '@type': 'CollectionPage',
      name: '搭配清单｜刺猬花',
      description: '按预算、场景和数量整理的鲜花搭配清单。',
      url: `${site.url}/lists/`,
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: '清单', item: `${site.url}/lists/` },
      ],
    },
  ],
})
</script>

<template>
  <div>
    <section class="page-header">
      <div class="container">
        <p class="eyebrow">lists · 搭配清单</p>
        <h1>别再对着花店列表发呆</h1>
        <p class="page-intro">
          这几份清单把“买什么、买几支、为什么”写清楚了。预算和场景都固定，照着配就行，
          不需要一次买齐，也不需要买最贵的。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="index-list">
          <article v-for="(list, index) in lists" :key="list.slug" class="index-row">
            <span class="index-no">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h2 class="index-row-title text-[20px]">
                <NuxtLink :to="`/lists/${list.slug}/`">{{ list.title }}</NuxtLink>
              </h2>
              <p>{{ list.description }}</p>
            </div>
            <div class="index-meta">
              <strong>{{ list.budget }}</strong>
              <span>{{ list.scene }}</span>
            </div>
          </article>
        </div>

        <div class="note-box">
          <strong>关于价格：</strong>
          清单里的预算是常见城市的参考区间，节日、进口花和一线城市会上浮。
          同样预算下，优先保证主花数量，配花和叶材可以减。
        </div>
      </div>
    </section>
  </div>
</template>
