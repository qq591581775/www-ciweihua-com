import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { flowers, getFlower } from '~/data/flowers'
import { getOccasion, occasions } from '~/data/occasions'
import { festivals } from '~/data/festivals'
import { getList, lists } from '~/data/lists'
import { getGuide, guides } from '~/data/guides'

describe('内容数据', () => {
  it('has unique slugs across every section', () => {
    for (const collection of [flowers, occasions, lists, guides, festivals]) {
      const slugs = collection.map((item) => item.slug)
      expect(new Set(slugs).size).toBe(slugs.length)
    }
  })

  it('resolves every cross reference', () => {
    for (const flower of flowers) {
      for (const slug of flower.combos) {
        expect(getFlower(slug), `flower.combos ${slug}`).toBeTruthy()
      }
      for (const slug of flower.occasions) {
        expect(getOccasion(slug), `flower.occasions ${slug}`).toBeTruthy()
      }
    }

    for (const occasion of occasions) {
      for (const slug of occasion.flowers) {
        expect(getFlower(slug), `occasion.flowers ${slug}`).toBeTruthy()
      }
    }

    for (const list of lists) {
      for (const section of list.sections) {
        for (const item of section.items) {
          expect(getFlower(item.flower), `list item ${item.flower}`).toBeTruthy()
        }
      }
    }

    for (const guide of guides) {
      expect(guide.sections.length).toBeGreaterThan(0)
    }

    for (const festival of festivals) {
      for (const slug of festival.flowers) {
        expect(getFlower(slug), `festival.flowers ${slug}`).toBeTruthy()
      }
      for (const slug of festival.lists) {
        expect(getList(slug), `festival.lists ${slug}`).toBeTruthy()
      }
      for (const slug of festival.guides) {
        expect(getGuide(slug), `festival.guides ${slug}`).toBeTruthy()
      }
    }
  })

  it('keeps every festival page complete enough to rank', () => {
    for (const festival of festivals) {
      expect(festival.budgets).toHaveLength(3)
      expect(festival.plan.length).toBeGreaterThanOrEqual(4)
      expect(festival.avoid.length).toBeGreaterThanOrEqual(3)
      expect(festival.faq.length).toBeGreaterThanOrEqual(3)
      expect(festival.intro.length).toBeGreaterThan(40)
      for (const item of festival.faq) {
        expect(item.question.trim().length, `${festival.slug} question`).toBeGreaterThan(4)
        expect(item.answer.trim().length, `${festival.slug} answer`).toBeGreaterThan(20)
        expect(item.answer).not.toMatch(/undefined|null/)
      }
    }
  })

  it('ships every referenced flower image', () => {
    for (const flower of flowers) {
      expect(existsSync(join(process.cwd(), 'public', flower.image)), flower.image).toBe(true)
      expect(flower.imageWidth).toBe(1000)
      expect(flower.imageHeight).toBe(1250)
    }
  })
})
