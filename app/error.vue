<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({}) as NuxtError,
  },
})

const statusCode = computed(() => props.error?.statusCode ?? 404)
const isNotFound = computed(() => statusCode.value === 404)
const title = computed(() => (isNotFound.value ? '页面不存在' : '页面出错了'))

const handleError = () => clearError({ redirect: '/' })

useHead({
  title: () => `${title.value} - 刺猬花`,
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <AppHeader />
    <main id="main-content" class="app-main" tabindex="-1">
      <section class="section">
        <div class="narrow not-found container">
          <p class="error-code">{{ statusCode }}</p>
          <h1 class="page-title">{{ title }}</h1>
          <p class="muted">
            {{
              isNotFound ? '这束花可能已经谢了，换个地方看看吧。' : '页面暂时无法访问，请稍后再试。'
            }}
          </p>
          <button type="button" class="btn btn-primary" @click="handleError">返回首页</button>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>
