<script setup lang="ts">
import { site } from '~/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner container">
      <div class="footer-brand">
        <NuxtLink to="/" class="brand" aria-label="刺猬花首页">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 20c-4.4 0-8-3.6-8-8 0-4.4 3.6-8 8-8 4.4 0 8 3.6 8 8 0 4.4-3.6 8-8 8Z"
                fill="currentColor"
                opacity=".18"
              />
              <path d="M12 5c3.9 0 7 3.1 7 7-3.9 0-7-3.1-7-7Z" fill="currentColor" />
              <path d="M12 12v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </span>
          <span class="brand-name">刺猬花</span>
        </NuxtLink>
        <p>
          鲜花的聚合平台。把花材的花语、花期、价格和养护方法整理在一起，按场景给出可执行的判断，不卖花。
        </p>
      </div>
      <div class="footer-col">
        <h3>栏目</h3>
        <NuxtLink to="/flowers/">花材库</NuxtLink>
        <NuxtLink to="/occasions/">场景</NuxtLink>
        <NuxtLink to="/festivals/">节日花礼</NuxtLink>
        <NuxtLink to="/lists/">搭配清单</NuxtLink>
        <NuxtLink to="/guides/">养护指南</NuxtLink>
      </div>
      <div class="footer-col">
        <h3>关于</h3>
        <NuxtLink to="/about/">关于刺猬花</NuxtLink>
        <NuxtLink to="/contact/">联系与纠错</NuxtLink>
        <a :href="`mailto:${site.email}`">{{ site.email }}</a>
      </div>
    </div>
    <div class="footer-bottom container">
      <p class="m-0">© {{ year }} 刺猬花</p>
      <p class="m-0">ciweihua · {{ site.domain }}</p>
    </div>
  </footer>
</template>
