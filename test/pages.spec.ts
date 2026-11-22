import { describe, expect, it, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import type { NuxtError } from '#app'
import IndexPage from '~/pages/index.vue'
import AboutPage from '~/pages/about.vue'
import ContactPage from '~/pages/contact.vue'
import FlowersIndexPage from '~/pages/flowers/index.vue'
import FlowerDetailPage from '~/pages/flowers/[slug].vue'
import OccasionsIndexPage from '~/pages/occasions/index.vue'
import OccasionDetailPage from '~/pages/occasions/[slug].vue'
import ListsIndexPage from '~/pages/lists/index.vue'
import ListDetailPage from '~/pages/lists/[slug].vue'
import GuidesIndexPage from '~/pages/guides/index.vue'
import GuideDetailPage from '~/pages/guides/[slug].vue'
import ErrorPage from '~/error.vue'

const { clearErrorMock } = vi.hoisted(() => ({ clearErrorMock: vi.fn() }))

mockNuxtImport('clearError', () => clearErrorMock)

describe('首页', () => {
  it('renders hero, entries, flowers, scenes, lists and guides', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.find('h1').text()).toContain('把一束花')
    expect(wrapper.findAll('.entry-card')).toHaveLength(3)
    expect(wrapper.findAll('.flower-card')).toHaveLength(6)
    expect(wrapper.findAll('.scene-card')).toHaveLength(6)
    expect(wrapper.findAll('.index-row')).toHaveLength(8)
  })

  it('links to every main section', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.find('a[href="/flowers/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/occasions/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/lists/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/guides/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/contact/"]').exists()).toBe(true)
  })
})

describe('花材库', () => {
  it('lists all twelve flowers grouped by family', async () => {
    const wrapper = await mountSuspended(FlowersIndexPage)

    expect(wrapper.find('h1').text()).toBe('常见花材，一次看全')
    expect(wrapper.findAll('.flower-card')).toHaveLength(12)

    const links = wrapper.findAll('.flower-name a').map((link) => link.attributes('href'))
    expect(links).toContain('/flowers/rose/')
    expect(links).toContain('/flowers/eucalyptus/')
    expect(links).toHaveLength(12)
  })
})

describe('花材详情', () => {
  it('renders meaning, facts, care, combos and occasions', async () => {
    const wrapper = await mountSuspended(FlowerDetailPage, { route: '/flowers/rose/' })

    expect(wrapper.find('h1').text()).toBe('玫瑰')
    expect(wrapper.find('.meaning-box').text()).toContain('玫瑰')
    expect(wrapper.find('.facts').findAll('div')).toHaveLength(5)
    expect(wrapper.findAll('.check-box')).toHaveLength(2)
    expect(wrapper.findAll('.criteria-list li')).toHaveLength(8)
    expect(wrapper.findAll('.mini-flower')).toHaveLength(3)
    expect(wrapper.findAll('.chip-link')).toHaveLength(4)
  })
})

describe('场景', () => {
  it('lists all six occasions', async () => {
    const wrapper = await mountSuspended(OccasionsIndexPage)

    expect(wrapper.find('h1').text()).toBe('同一束花，换个场合就不合适')
    expect(wrapper.findAll('.scene-card')).toHaveLength(6)
  })

  it('renders an occasion with recommended flowers and avoid list', async () => {
    const wrapper = await mountSuspended(OccasionDetailPage, {
      route: '/occasions/confession/',
    })

    expect(wrapper.find('h1').text()).toContain('表白与告白')
    expect(wrapper.findAll('.mini-flower')).toHaveLength(5)
    expect(wrapper.findAll('.criteria-list li')).toHaveLength(4)
    expect(wrapper.find('.note-box').text()).toContain('百合')
  })
})

describe('清单', () => {
  it('lists all four lists', async () => {
    const wrapper = await mountSuspended(ListsIndexPage)

    expect(wrapper.find('h1').text()).toBe('别再对着花店列表发呆')
    expect(wrapper.findAll('.index-row')).toHaveLength(4)
  })

  it('renders bouquet rows with quantities and reasons', async () => {
    const wrapper = await mountSuspended(ListDetailPage, { route: '/lists/first-bouquet/' })

    expect(wrapper.find('h1').text()).toBe('第一次买花，150 元以内怎么配')
    expect(wrapper.findAll('.list-section')).toHaveLength(3)
    expect(wrapper.findAll('.bouquet-row')).toHaveLength(5)
    expect(wrapper.find('.note-box').text()).toContain('包装')
  })
})

describe('指南', () => {
  it('lists all four guides', async () => {
    const wrapper = await mountSuspended(GuidesIndexPage)

    expect(wrapper.find('h1').text()).toBe('花买回家之后，才是关键')
    expect(wrapper.findAll('.index-row')).toHaveLength(4)
  })

  it('renders guide sections and points', async () => {
    const wrapper = await mountSuspended(GuideDetailPage, {
      route: '/guides/keep-flowers-longer/',
    })

    expect(wrapper.find('h1').text()).toBe('让鲜花多开三天的 7 个动作')
    expect(wrapper.findAll('.article-body section')).toHaveLength(4)
    expect(wrapper.findAll('.article-points li').length).toBeGreaterThan(0)
  })
})

describe('关于与联系', () => {
  it('renders the about page', async () => {
    const wrapper = await mountSuspended(AboutPage)
    expect(wrapper.find('h1').text()).toBe('关于刺猬花')
  })

  it('renders the contact email only', async () => {
    const wrapper = await mountSuspended(ContactPage)
    const email = wrapper.find('a[href="mailto:591581775@qq.com"]')

    expect(email.exists()).toBe(true)
    expect(email.text()).toBe('591581775@qq.com')
    expect(wrapper.findAll('.contact-list li')).toHaveLength(2)
  })
})

describe('错误页', () => {
  it('renders the status code and clears the error on the home button', async () => {
    const wrapper = await mountSuspended(ErrorPage, {
      props: {
        error: { statusCode: 404, statusMessage: 'Not Found', message: '' } as unknown as NuxtError,
      },
    })

    expect(wrapper.find('.error-code').text()).toBe('404')

    const button = wrapper.find('.not-found button')
    expect(button.text()).toBe('返回首页')

    await button.trigger('click')
    expect(clearErrorMock).toHaveBeenCalledWith({ redirect: '/' })
  })

  it('uses a generic message for server errors', async () => {
    const wrapper = await mountSuspended(ErrorPage, {
      props: {
        error: {
          statusCode: 500,
          statusMessage: 'Server Error',
          message: '',
        } as unknown as NuxtError,
      },
    })

    expect(wrapper.find('.error-code').text()).toBe('500')
    expect(wrapper.find('h1').text()).toBe('页面出错了')
  })
})
