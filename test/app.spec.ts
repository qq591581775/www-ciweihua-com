import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

describe('App 布局壳', () => {
  it('composes header, routed page and footer', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })

    expect(wrapper.find('header.site-header').exists()).toBe(true)
    expect(wrapper.find('a.skip-link[href="#main-content"]').exists()).toBe(true)
    expect(wrapper.find('main#main-content.app-main h1').text()).toContain('把一束花')
    expect(wrapper.find('footer.site-footer').exists()).toBe(true)
  })

  it('renders the about page on /about', async () => {
    const wrapper = await mountSuspended(App, { route: '/about' })
    expect(wrapper.find('main.app-main h1').text()).toBe('关于刺猬花')
  })
})
