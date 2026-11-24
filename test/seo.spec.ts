import { describe, expect, it } from 'vitest'
import { flowers } from '~/data/flowers'
import { buildFlowerFaq, buildFlowerKeywords } from '~/utils/flowerSeo'

describe('花材 SEO 内容', () => {
  it('为每种花材生成 4 条互不重复的常见问题', () => {
    for (const flower of flowers) {
      const faq = buildFlowerFaq(flower)

      expect(faq, flower.slug).toHaveLength(4)
      expect(new Set(faq.map((item) => item.question)).size, flower.slug).toBe(4)

      for (const item of faq) {
        expect(item.question, flower.slug).toContain(flower.name)
        expect(item.answer.length, `${flower.slug} ${item.question}`).toBeGreaterThan(10)
        expect(item.answer, `${flower.slug} ${item.question}`).not.toContain('undefined')
        expect(item.answer, `${flower.slug} ${item.question}`).not.toContain('null')
      }
    }
  })

  it('keywords 覆盖花材的常见搜索词', () => {
    for (const flower of flowers) {
      const keywords = buildFlowerKeywords(flower)

      expect(keywords, flower.slug).toContain(flower.name)
      expect(keywords, flower.slug).toContain(`${flower.name}花语`)
      expect(keywords, flower.slug).toContain(`${flower.name}价格`)
      expect(keywords.length, flower.slug).toBeGreaterThanOrEqual(5)
    }
  })
})
