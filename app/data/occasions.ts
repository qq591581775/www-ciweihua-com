export type Occasion = {
  slug: string
  name: string
  english: string
  tagline: string
  intro: string
  scene: string
  budget: string
  tone: string
  criteria: string[]
  flowers: string[]
  avoid: string[]
  note: string
  updated: string
}

export const occasions: Occasion[] = [
  {
    slug: 'confession',
    name: '表白与告白',
    english: 'confession',
    tagline: '让对方愿意拿回家的一束',
    intro:
      '告白花束的重点不是贵，而是“对方拿得动、愿意带回家”。第一次送花，选对方提过的颜色，比选传说中最浪漫的红色更有效。',
    scene: '约会、纪念日、求婚前的铺垫',
    budget: '150–400 元',
    tone: '#b85f68',
    criteria: [
      '先小后大：第一次送 11–19 支就够，巨型花束在餐厅或街头反而让人尴尬。',
      '颜色跟着对方的日常喜好走，别只按“红玫瑰才浪漫”的模板选。',
      '香气控制在可接受范围，密闭空间里浓香百合容易让人不适。',
      '包装简洁、便于单手拿，最好能直接放进车里或带回家。',
    ],
    flowers: ['rose', 'tulip', 'peony', 'eustoma', 'baby-breath'],
    avoid: ['喷色、染色过度的“网红花”', '浓香且花粉多的百合', '体积超过半米的巨型花束'],
    note: '先确认对方是否喜欢收到鲜花。对花粉过敏、家里有猫（百合对猫有毒性）时，换成小桌花或盆栽更稳妥。',
    updated: '2026-11-22',
  },
  {
    slug: 'birthday',
    name: '生日送花',
    english: 'birthday',
    tagline: '按对方的日常审美来挑',
    intro:
      '生日花束要考虑“对方怎么带回家”。餐厅里收到一大束花很好看，但饭后还要拎着它挤地铁就不太友好。',
    scene: '朋友、伴侣、家人的生日',
    budget: '100–300 元',
    tone: '#c08a4e',
    criteria: [
      '先想清楚送达场景：家里、办公室还是餐厅，决定花束大小和包装。',
      '办公室里送花，选低香、体积小、不用现场插瓶的款式。',
      '不知道喜好时，香槟色、白绿、浅粉是最不容易出错的色系。',
      '预算有限就把钱花在主花上，配花和叶材简单一点反而更清爽。',
    ],
    flowers: ['eustoma', 'rose', 'sunflower', 'ranunculus', 'carnation', 'daisy'],
    avoid: ['全白或大面积黄色（部分长辈会介意）', '香味太冲的花', '过度包装、拆起来很麻烦的花束'],
    note: '生日花束最好提前一天到，当天现买容易遇到涨价和花材不全。',
    updated: '2026-11-22',
  },
  {
    slug: 'visit',
    name: '探病与看望',
    english: 'visit',
    tagline: '低香、低花粉、颜色柔和',
    intro:
      '探病送花的第一原则是“不给对方添麻烦”。医院空间小、通风有限，浓香和花粉都比平时更需要回避。',
    scene: '住院探望、术后恢复、家中休养',
    budget: '80–200 元',
    tone: '#7f9c86',
    criteria: [
      '选无浓香、花粉少的品种，康乃馨、洋桔梗、小雏菊都合适。',
      '颜色柔和，浅粉、浅黄、白绿都可以，避免大红大紫的强刺激。',
      '体量小、花瓶简单，最好对方不用再找容器。',
      '很多医院不允许带花进病房，出发前先问护士站。',
    ],
    flowers: ['carnation', 'eustoma', 'daisy', 'baby-breath'],
    avoid: [
      '百合（浓香、花粉多，且对猫有毒）',
      '红玫瑰（语义不适合探病）',
      '白色菊花（文化上容易引起误会）',
    ],
    note: '不确定能否送花时，水果、绿植或一本轻松的书都比“硬送花”更得体。',
    updated: '2026-11-22',
  },
  {
    slug: 'business',
    name: '商务与开业',
    english: 'business',
    tagline: '体面、统一、不抢主角',
    intro: '商务用花的核心是“得体”。颜色统一、体量合适、送达准时，比花材是否昂贵重要得多。',
    scene: '开业、乔迁、前台布置、商务拜访',
    budget: '200–800 元',
    tone: '#6f8360',
    criteria: [
      '先确认场合是花篮、桌花还是单支礼盒，别把桌花送到开业门口。',
      '色系跟着品牌色或场地走，香槟、白绿最稳，避免粉色系过于私人。',
      '提前确认送达时间、摆放位置和是否需要现场组装。',
      '卡片文字简短、称呼准确，比花本身更容易被记住。',
    ],
    flowers: ['sunflower', 'hydrangea', 'rose', 'eucalyptus', 'carnation'],
    avoid: ['香气过浓的花', '容易掉瓣、掉粉的花材', '颜色杂乱、没有主色系的花束'],
    note: '开业花篮通常需要提前 1–2 天下单，节日和好日子还会更早截单。',
    updated: '2026-11-22',
  },
  {
    slug: 'wedding',
    name: '婚礼与纪念日',
    english: 'wedding',
    tagline: '先看重量，再看颜色',
    intro: '婚礼用花要同时满足“上镜”和“撑得住”。手捧花举一整天，重量和耐久度比单看照片更重要。',
    scene: '婚礼、领证、周年纪念',
    budget: '300–1500 元',
    tone: '#b58f9a',
    criteria: [
      '手捧花控制在单手能轻松举起的重量，仪式 2–4 小时不蔫。',
      '色系和婚纱、场地、伴娘服统一，别让花抢了人的注意力。',
      '提前一天试做一束，确认大小、重量和自己的握感。',
      '准备第二束备用，夏季户外尤其必要。',
    ],
    flowers: ['peony', 'rose', 'ranunculus', 'hydrangea', 'eustoma', 'eucalyptus', 'baby-breath'],
    avoid: ['容易掉花粉的百合', '极易脱水的绣球（户外婚礼慎用）', '带刺未处理的花材'],
    note: '纪念日不必照搬婚礼配置，一支主花加两枝叶材的小瓶花，反而更适合日常。',
    updated: '2026-11-22',
  },
  {
    slug: 'festival',
    name: '节日与家宴',
    english: 'festival',
    tagline: '错峰买，别为溢价买单',
    intro:
      '情人节、母亲节、教师节、七夕，花价通常提前一周开始上涨。同样的花，错峰两三天能省下不少。',
    scene: '情人节、母亲节、教师节、七夕、春节家宴',
    budget: '100–500 元',
    tone: '#a8752f',
    criteria: [
      '节日花提前 3–5 天预订，当天现买选择少、价格高。',
      '母亲节首选康乃馨，但浅粉、香槟色比大红更耐看。',
      '教师节送向日葵或小雏菊，体量小、不打扰办公桌。',
      '春节家宴选红、橙、金黄等暖色，客厅瓶花可以大一点。',
    ],
    flowers: ['carnation', 'sunflower', 'rose', 'daisy', 'baby-breath'],
    avoid: ['节日当天临时加价的“套餐花”', '为了显大而塞满廉价配花的花束', '香气过浓、影响吃饭的花'],
    note: '节日花束最容易出现“照片好看、实物缩水”，下单前问清主花支数和等级。',
    updated: '2026-11-22',
  },
]

export const getOccasion = (slug: string) => occasions.find((occasion) => occasion.slug === slug)

export const occasionName = (slug: string) => getOccasion(slug)?.name ?? slug
