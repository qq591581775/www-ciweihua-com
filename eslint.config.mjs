// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Prettier 会为 img 等 HTML void 元素补上自闭合斜杠，两者保持一致。
    'vue/html-self-closing': ['error', { html: { void: 'always' } }],
  },
})
