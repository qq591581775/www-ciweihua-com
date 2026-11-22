<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: '首页', path: '/' },
  { label: '花材', path: '/flowers/' },
  { label: '场景', path: '/occasions/' },
  { label: '清单', path: '/lists/' },
  { label: '指南', path: '/guides/' },
]

const isActive = (path: string) => {
  const pathname = route.path.endsWith('/') ? route.path : `${route.path}/`
  return path === '/' ? pathname === '/' : pathname.startsWith(path)
}
</script>

<template>
  <header class="site-header">
    <div class="header-inner container">
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
        <span class="brand-en">ciweihua</span>
      </NuxtLink>
      <nav class="site-nav" aria-label="主导航">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="isActive(item.path) ? 'active' : ''"
          :aria-current="isActive(item.path) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
