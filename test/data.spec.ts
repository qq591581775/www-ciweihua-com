import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { flowers, getFlower } from '~/data/flowers'
import { getOccasion, occasions } from '~/data/occasions'
import { lists } from '~/data/lists'
import { guides } from '~/data/guides'

describe('内容数据', () => {
  it('has unique slugs across every section', () => {
    for (const collection of [flowers, occasions, lists, guides]) {
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
  })

  it('ships every referenced flower image', () => {
    for (const flower of flowers) {
      expect(existsSync(join(process.cwd(), 'public', flower.image)), flower.image).toBe(true)
      expect(flower.imageWidth).toBe(1000)
      expect(flower.imageHeight).toBe(1250)
    }
  })
})
