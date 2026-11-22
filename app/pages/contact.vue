<script setup lang="ts">
import { site } from '~/data/site'

usePageSeo({
  title: '联系与纠错｜刺猬花',
  description: '联系刺猬花：内容纠错、补充花材、价格更新或合作沟通，可以通过邮箱联系。',
  path: '/contact/',
  structuredData: [
    {
      '@type': 'ContactPage',
      name: '联系与纠错｜刺猬花',
      description: '刺猬花的内容纠错与联系渠道。',
      url: `${site.url}/contact/`,
      inLanguage: 'zh-CN',
    },
  ],
})
</script>

<template>
  <div>
    <section class="page-header">
      <div class="narrow container">
        <p class="eyebrow">contact</p>
        <h1>联系与纠错</h1>
        <p class="page-intro">
          刺猬花是一个持续维护的内容站。发现错误、价格过时，或者想补充某种花材，
          都欢迎直接写信说明。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="narrow container">
        <ul class="contact-list">
          <li>
            <span>邮箱</span>
            <a :href="`mailto:${site.email}`">{{ site.email }}</a>
          </li>
          <li>
            <span>站点</span>
            <span>{{ site.domain }}</span>
          </li>
        </ul>

        <p>写信时如果能带上这几点，会更容易处理：</p>
        <ul class="criteria-list">
          <li>具体页面链接或花材名称，方便定位。</li>
          <li>你认为不对的地方，以及可参考的来源。</li>
          <li>如果是价格问题，注明城市和看到价格的时间。</li>
        </ul>

        <div class="contact-actions">
          <a class="btn btn-primary" :href="`mailto:${site.email}`">发送邮件</a>
          <NuxtLink to="/flowers/" class="btn btn-ghost">回到花材库</NuxtLink>
        </div>

        <p class="muted">
          一般会在几天内回复。站内不接花店推广，也不提供下单、配送或售后相关服务。
        </p>
      </div>
    </section>
  </div>
</template>
