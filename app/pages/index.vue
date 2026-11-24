<script setup lang="ts">
import { featuredFlowers, flowers } from '~/data/flowers'
import { occasions } from '~/data/occasions'
import { lists } from '~/data/lists'
import { formatGuideDate, guides } from '~/data/guides'
import { site } from '~/data/site'

usePageSeo({
  title: '刺猬花｜鲜花的聚合平台',
  description:
    '刺猬花汇总常见花材的花语、花期、参考价格与养护方法，按表白、生日、探病、商务、婚礼和节日整理选花判断，不卖花，只把选择讲清楚。',
  path: '/',
  keywords: ['鲜花', '花材', '花语', '送花', '鲜花养护', '搭配清单', '刺猬花'],
  structuredData: [
    {
      '@type': 'CollectionPage',
      name: '刺猬花｜鲜花的聚合平台',
      description: '花材库、送花场景、搭配清单与养护指南。',
      url: `${site.url}/`,
      inLanguage: 'zh-CN',
    },
  ],
})

const entries = [
  {
    index: '01',
    title: '花材库',
    description: `${flowers.length} 种常见花材的花语、花期、参考价格、瓶插期和养护要点。`,
    to: '/flowers/',
    action: '挑花材 →',
  },
  {
    index: '02',
    title: '送花场景',
    description: '告白、生日、探病、商务、婚礼、节日：每个场景该送什么、避开什么。',
    to: '/occasions/',
    action: '按场景挑 →',
  },
  {
    index: '03',
    title: '清单与指南',
    description: '按预算和支数配一束花，再把花瓶、水位、换水这些细节做对。',
    to: '/lists/',
    action: '看搭配清单 →',
  },
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-grid container">
        <div>
          <p class="kicker">鲜花的聚合平台 · 花材 / 场景 / 养护</p>
          <h1>把一束花，<br />挑得明白一点</h1>
          <p class="hero-sub">
            刺猬花把常见花材的花语、花期、价格和养护方法整理在一起，再按场景给出可执行的判断。
            不卖花，也不堆砌“网红花束”，只把选择讲清楚。
          </p>
          <div class="hero-actions">
            <NuxtLink to="/flowers/" class="btn btn-primary">逛花材库</NuxtLink>
            <NuxtLink to="/occasions/" class="btn btn-ghost">按场景挑花</NuxtLink>
          </div>
          <div class="hero-stats">
            <div>
              <strong>{{ flowers.length }}</strong>
              <span>种常见花材</span>
            </div>
            <div>
              <strong>{{ occasions.length }}</strong>
              <span>个送花场景</span>
            </div>
            <div>
              <strong>{{ lists.length }}</strong>
              <span>份搭配清单</span>
            </div>
          </div>
        </div>
        <figure class="hero-figure">
          <img
            src="/images/hero-florist.jpg"
            alt="窗边木桌上摆放的玫瑰、郁金香、洋桔梗与尤加利叶"
            width="1600"
            height="900"
            fetchpriority="high"
          />
          <div class="hero-caption">
            <strong>本周花材</strong>
            <span>洋桔梗 · 郁金香 · 尤加利</span>
          </div>
        </figure>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">start here</p>
            <h2 class="section-title">从这三个入口开始</h2>
            <p class="section-lead">先认识花，再决定送什么，最后把花养好。</p>
          </div>
        </div>
        <div class="entry-grid">
          <NuxtLink v-for="entry in entries" :key="entry.index" :to="entry.to" class="entry-card">
            <span class="entry-index">{{ entry.index }}</span>
            <h3>{{ entry.title }}</h3>
            <p>{{ entry.description }}</p>
            <span class="entry-arrow">{{ entry.action }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">flowers</p>
            <h2 class="section-title">先认识几种常见花材</h2>
            <p class="section-lead">
              同一束花的差别，往往不在包装，而在主花、配花和叶材有没有选对。
            </p>
          </div>
          <NuxtLink to="/flowers/" class="text-link">查看全部花材 →</NuxtLink>
        </div>
        <div class="flower-grid">
          <FlowerCard
            v-for="(flower, index) in featuredFlowers"
            :key="flower.slug"
            :flower="flower"
            :eager="index < 3"
            heading-level="h3"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">occasions</p>
            <h2 class="section-title">按场景挑，不容易送错</h2>
            <p class="section-lead">同一个花材，在不同的场合里，合适与否完全不同。</p>
          </div>
          <NuxtLink to="/occasions/" class="text-link">全部场景 →</NuxtLink>
        </div>
        <div class="scene-grid">
          <article
            v-for="occasion in occasions"
            :key="occasion.slug"
            class="scene-card"
            :style="{ '--scene-tone': occasion.tone }"
          >
            <h3>
              <NuxtLink :to="`/occasions/${occasion.slug}/`">{{ occasion.name }}</NuxtLink>
            </h3>
            <p class="scene-tagline">{{ occasion.tagline }}</p>
            <div class="scene-meta">
              <span>{{ occasion.scene }}</span>
              <span>预算 {{ occasion.budget }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">lists</p>
            <h2 class="section-title">按预算和数量直接抄</h2>
            <p class="section-lead">第一次买花、办公桌、探病、手捧花，都给了具体支数和理由。</p>
          </div>
          <NuxtLink to="/lists/" class="text-link">全部清单 →</NuxtLink>
        </div>
        <div class="index-list">
          <article v-for="(list, index) in lists" :key="list.slug" class="index-row">
            <span class="index-no">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3>
                <NuxtLink :to="`/lists/${list.slug}/`">{{ list.title }}</NuxtLink>
              </h3>
              <p>{{ list.description }}</p>
            </div>
            <div class="index-meta">
              <strong>{{ list.budget }}</strong>
              <span>{{ list.scene }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">guides</p>
            <h2 class="section-title">养花这件事，细节比花材重要</h2>
            <p class="section-lead">剪口、水位、换水、温度，做好这四件事，花期能长不少。</p>
          </div>
          <NuxtLink to="/guides/" class="text-link">全部指南 →</NuxtLink>
        </div>
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

    <section class="section">
      <div class="container">
        <div class="cta-panel">
          <h2>不卖花，只把选择讲清楚</h2>
          <p>
            刺猬花不做商城，也不做“全网最低价”。内容来自公开的花材资料和实际养护经验，
            价格是区间参考，会随城市、季节和等级变化。
          </p>
          <div class="hero-actions" style="margin-top: 0">
            <NuxtLink to="/about/" class="btn btn-primary">了解这个平台</NuxtLink>
            <NuxtLink to="/contact/" class="btn btn-ghost">纠错与补充</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
