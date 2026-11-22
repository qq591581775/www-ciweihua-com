<script setup lang="ts">
import type { Flower } from '~/data/flowers'

const props = withDefaults(
  defineProps<{
    flower: Flower
    headingLevel?: 'h2' | 'h3'
    eager?: boolean
  }>(),
  {
    headingLevel: 'h2',
    eager: false,
  },
)

const tags = computed(() => props.flower.tags.slice(0, 3))
</script>

<template>
  <article class="flower-card">
    <NuxtLink
      :to="`/flowers/${flower.slug}/`"
      class="flower-media"
      :aria-label="`查看${flower.name}花材详情`"
    >
      <img
        :src="flower.image"
        :alt="flower.imageAlt"
        :width="flower.imageWidth"
        :height="flower.imageHeight"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
      />
      <span class="family-pill">{{ flower.family }}</span>
    </NuxtLink>
    <div class="flower-body">
      <component :is="headingLevel" class="flower-name">
        <NuxtLink :to="`/flowers/${flower.slug}/`">{{ flower.name }}</NuxtLink>
      </component>
      <p class="flower-latin">{{ flower.english }} · {{ flower.latin }}</p>
      <p class="flower-intro">{{ flower.summary }}</p>
      <div class="flower-tags">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>
