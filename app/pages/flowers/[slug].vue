<script setup lang="ts">
import { getFlower } from '~/data/flowers'
import { getOccasion } from '~/data/occasions'
import { site } from '~/data/site'

const route = useRoute()
const flower = getFlower(String(route.params.slug))

if (!flower) {
  throw createError({ statusCode: 404, statusMessage: '花材不存在' })
}

const relatedFlowers = flower.combos.flatMap((slug) => {
  const item = getFlower(slug)
  return item ? [item] : []
})

const relatedOccasions = flower.occasions.flatMap((slug) => {
  const item = getOccasion(slug)
  return item ? [item] : []
})

usePageSeo({
  title: `${flower.name}的花语、花期与养护｜刺猬花`,
  description: `${flower.name}的花语、花期、参考价格、瓶插期与养护方法：${flower.summary}`,
  path: `/flowers/${flower.slug}/`,
  type: 'article',
  publishedTime: '2026-11-22',
  modifiedTime: flower.updated,
  structuredData: [
    {
      '@type': 'Article',
      headline: `${flower.name}的花语、花期与养护`,
      description: flower.summary,
      image: `${site.url}${flower.image}`,
      datePublished: '2026-11-22',
      dateModified: flower.updated,
      author: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
      publisher: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
      mainEntityOfPage: `${site.url}/flowers/${flower.slug}/`,
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: '花材', item: `${site.url}/flowers/` },
        {
          '@type': 'ListItem',
          position: 3,
          name: flower.name,
          item: `${site.url}/flowers/${flower.slug}/`,
        },
      ],
    },
  ],
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="面包屑">
          <NuxtLink to="/">首页</NuxtLink>
          <span>/</span>
          <NuxtLink to="/flowers/">花材</NuxtLink>
          <span>/</span>
          <span>{{ flower.name }}</span>
        </nav>

        <div class="detail-layout">
          <figure class="detail-figure">
            <img
              :src="flower.image"
              :alt="flower.imageAlt"
              :width="flower.imageWidth"
              :height="flower.imageHeight"
              loading="eager"
            />
            <figcaption>
              {{ flower.name }}（{{ flower.english }}），{{
                flower.family
              }}。图片为本站自制的花材示意图， 用于说明形态与色系，不代表具体品种等级。
            </figcaption>
          </figure>

          <div class="detail-body">
            <span class="tag">{{ flower.family }}</span>
            <h1>{{ flower.name }}</h1>
            <p class="detail-latin">{{ flower.english }} · {{ flower.latin }}</p>
            <p class="detail-summary">{{ flower.summary }}</p>

            <div class="meaning-box">
              <h2>花语</h2>
              <p>{{ flower.meaning }}</p>
            </div>

            <dl class="facts">
              <div>
                <dt>花期</dt>
                <dd>{{ flower.season }}</dd>
              </div>
              <div>
                <dt>常见色</dt>
                <dd>{{ flower.colors }}</dd>
              </div>
              <div>
                <dt>参考价</dt>
                <dd>{{ flower.price }}</dd>
              </div>
              <div>
                <dt>瓶插期</dt>
                <dd>{{ flower.vaseLife }}</dd>
              </div>
              <div>
                <dt>香气</dt>
                <dd>{{ flower.scent }}</dd>
              </div>
            </dl>

            <div class="detail-section">
              <h2>适合与不适合</h2>
              <div class="check-columns">
                <div class="check-box">
                  <h3>适合</h3>
                  <ul>
                    <li v-for="item in flower.bestFor" :key="item">{{ item }}</li>
                  </ul>
                </div>
                <div class="check-box avoid">
                  <h3>不太适合</h3>
                  <ul>
                    <li v-for="item in flower.notFor" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h2>挑选时看什么</h2>
              <ul class="criteria-list">
                <li v-for="item in flower.buyTips" :key="item">{{ item }}</li>
              </ul>
            </div>

            <div class="detail-section">
              <h2>养护要点</h2>
              <ul class="criteria-list">
                <li v-for="item in flower.care" :key="item">{{ item }}</li>
              </ul>
            </div>

            <div class="detail-section">
              <h2>可以这样搭</h2>
              <div class="mini-flower-grid">
                <NuxtLink
                  v-for="item in relatedFlowers"
                  :key="item.slug"
                  :to="`/flowers/${item.slug}/`"
                  class="mini-flower"
                >
                  <img :src="item.image" :alt="item.imageAlt" loading="lazy" />
                  <div>
                    <strong>{{ item.name }}</strong>
                    <span>{{ item.family }} · {{ item.vaseLife }}</span>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <div class="detail-section">
              <h2>适合的场景</h2>
              <div class="chip-row">
                <NuxtLink
                  v-for="item in relatedOccasions"
                  :key="item.slug"
                  :to="`/occasions/${item.slug}/`"
                  class="chip-link"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap gap-3">
              <NuxtLink to="/flowers/" class="btn btn-ghost">返回花材库</NuxtLink>
              <NuxtLink to="/lists/" class="btn btn-primary">看搭配清单</NuxtLink>
            </div>

            <p class="muted mt-6 text-[13px]">
              参考价格随城市、季节与等级浮动；养护建议为通用做法，具体以实际花材状态为准。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
