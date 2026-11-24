import type { Flower } from '~/data/flowers'

export type FaqItem = {
  question: string
  answer: string
}

/** 由花材字段生成常见问题，页面展示与 FAQPage 结构化数据共用同一份内容。 */
export const buildFlowerFaq = (flower: Flower): FaqItem[] => {
  const firstTip = flower.buyTips[0] ?? ''
  const secondTip = flower.buyTips[1] ?? ''
  const avoid = flower.notFor[0]
  const suits = flower.bestFor.slice(0, 2).join('、')

  return [
    {
      question: `${flower.name}多少钱一支？`,
      answer: `参考价 ${flower.price}。这是昆明常见等级的价格区间，城市、季节和节日都会影响，节前通常最贵。`,
    },
    {
      question: `${flower.name}买回家能放多久？`,
      answer: `瓶插期大约 ${flower.vaseLife}。${flower.care[0] ?? '斜剪换水、避开直射光，能放得更久。'}`,
    },
    {
      question: `${flower.name}怎么挑更新鲜？`,
      answer: [firstTip, secondTip].filter(Boolean).join(' '),
    },
    {
      question: `${flower.name}适合送什么人？`,
      answer: suits
        ? `${suits}都合适。${avoid ? `但${avoid}时，建议换一种更稳妥的花材。` : ''}`
        : `${flower.meaning}`,
    },
  ]
}

/** 页面 keywords：覆盖「花语 / 花期 / 价格 / 养护」这些常见搜索词。 */
export const buildFlowerKeywords = (flower: Flower): string[] => [
  flower.name,
  `${flower.name}花语`,
  `${flower.name}花期`,
  `${flower.name}价格`,
  `${flower.name}怎么养`,
  `${flower.name}搭配`,
  flower.english,
]
