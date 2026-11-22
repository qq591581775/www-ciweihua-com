import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import FlowerCard from '~/components/FlowerCard.vue'
import { flowers } from '~/data/flowers'

describe('AppHeader', () => {
  it('renders the brand and five navigation links', async () => {
    const wrapper = await mountSuspended(AppHeader)

    expect(wrapper.text()).toContain('刺猬花')
    expect(wrapper.text()).toContain('ciweihua')
    expect(wrapper.find('a.brand').attributes('aria-label')).toBe('刺猬花首页')
    expect(wrapper.find('nav').attributes('aria-label')).toBe('主导航')
    expect(wrapper.find('.brand-mark').attributes('aria-hidden')).toBe('true')

    const links = wrapper.findAll('nav a')
    expect(links).toHaveLength(5)
    expect(links.map((link) => link.text())).toEqual(['首页', '花材', '场景', '清单', '指南'])
    expect(links.map((link) => link.attributes('href'))).toEqual([
      '/',
      '/flowers/',
      '/occasions/',
      '/lists/',
      '/guides/',
    ])
  })

  it('marks the current route as active', async () => {
    const wrapper = await mountSuspended(AppHeader, { route: '/flowers/rose' })
    const activeLink = wrapper.find('nav a.active')

    expect(activeLink.text()).toBe('花材')
    expect(activeLink.attributes('aria-current')).toBe('page')
  })
})

describe('AppFooter', () => {
  it('shows the current year, site name and domain', async () => {
    const wrapper = await mountSuspended(AppFooter)

    expect(wrapper.text()).toContain(`© ${new Date().getFullYear()} 刺猬花`)
    expect(wrapper.text()).toContain('ciweihua · www.ciweihua.com')
  })
})

describe('FlowerCard', () => {
  it('links to the flower detail page and shows family and tags', async () => {
    const wrapper = await mountSuspended(FlowerCard, { props: { flower: flowers[0] } })

    expect(wrapper.find('h2 a').attributes('href')).toBe('/flowers/rose/')
    expect(wrapper.find('h2 a').text()).toBe('玫瑰')
    expect(wrapper.find('.family-pill').text()).toBe('主花')
    expect(wrapper.findAll('.tag')).toHaveLength(3)
    expect(wrapper.find('img').attributes('src')).toBe('/images/flowers/rose.jpg')
    expect(wrapper.find('img').attributes('alt')).toBeTruthy()
  })
})
