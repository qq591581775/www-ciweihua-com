<script setup lang="ts">
import { flowers } from '~/data/flowers'
import { occasions } from '~/data/occasions'
import { guides } from '~/data/guides'
import { site } from '~/data/site'

usePageSeo({
  title: '关于刺猬花｜一个不卖花的鲜花聚合平台',
  description:
    '刺猬花是鲜花的聚合平台：整理花材信息、场景判断与养护方法，不卖花、不做商城，只把选择讲清楚。',
  path: '/about/',
  structuredData: [
    {
      '@type': 'AboutPage',
      name: '关于刺猬花',
      description: '刺猬花的定位、内容原则与编辑方式。',
      url: `${site.url}/about/`,
      inLanguage: 'zh-CN',
    },
  ],
})
</script>

<template>
  <div>
    <section class="page-header">
      <div class="narrow container">
        <p class="eyebrow">about</p>
        <h1>关于刺猬花</h1>
        <p class="page-intro">
          刺猬花是一个鲜花的聚合平台：把花材的花语、花期、参考价格和养护方法整理在一起，
          再按场景给出可执行的判断。我们不卖花，也不做商城。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="narrow container">
        <h2 class="section-title">为什么做这个站</h2>
        <p>
          买花这件事的信息很不集中：花语散在各种文章里，价格藏在商品详情页，养护方法往往是互相矛盾的短视频。
          真正需要判断的时候，反而找不到一句能用的结论。
        </p>
        <p>
          刺猬花做的事很简单：把常见花材放在一起，用同一套字段描述；把送花场景拆开，写清楚适合和避开；
          再把养护步骤整理成能照着做的动作。信息尽量具体，结论尽量可执行。
        </p>

        <h2 class="section-title mt-12">三条编辑原则</h2>
        <ul class="value-list">
          <li>
            <strong>先说结论</strong>
            <span>每页开头给出判断，再解释原因，不把读者绕进长篇背景里。</span>
          </li>
          <li>
            <strong>承认边界</strong>
            <span>价格是区间，花期因城市和季节而变；不确定的地方直接写出来，不装作权威。</span>
          </li>
          <li>
            <strong>不替花店说话</strong>
            <span>没有返佣、没有推广位，推荐基于适用性，而不是谁给的钱多。</span>
          </li>
        </ul>

        <h2 class="section-title mt-12">站里有什么</h2>
        <div class="do-list">
          <div>
            <h3>会做的事</h3>
            <ul>
              <li>{{ flowers.length }} 种常见花材的结构化信息</li>
              <li>{{ occasions.length }} 个送花场景的判断与避雷</li>
              <li>按预算和支数整理的搭配清单</li>
              <li>{{ guides.length }} 篇可执行的选购与养护指南</li>
            </ul>
          </div>
          <div>
            <h3 class="muted-title">不会做的事</h3>
            <ul>
              <li>不卖花、不接花店广告</li>
              <li>不写“全网最低价”这类无法验证的话</li>
              <li>不把染色花、喷色花当成天然花材介绍</li>
              <li>不为了流量编造花语和功效</li>
            </ul>
          </div>
        </div>

        <h2 class="section-title mt-12">内容怎么更新</h2>
        <p>
          花材页会随着季节和价格变化更新；场景页和清单页按实际使用反馈调整；指南只写验证过的做法。
          如果你发现错误、过时的价格，或者想补充一种花材，欢迎通过
          <NuxtLink to="/contact/" class="text-link">联系页</NuxtLink>
          告诉我。
        </p>

        <p class="muted mt-8 text-[13px]">
          站内图片为自制示意图，用于说明花材的形态与色系，不代表具体品种等级或实际商品。
        </p>
      </div>
    </section>
  </div>
</template>
