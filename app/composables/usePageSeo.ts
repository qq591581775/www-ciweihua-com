import { site } from '~/data/site'

const SOCIAL_IMAGE = `${site.url}/og-image.jpg`

type PageSeoOptions = {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  structuredData?: Record<string, unknown>[]
}

export const usePageSeo = (options: PageSeoOptions) => {
  const url = new URL(options.path, site.url).toString()
  const image = options.image ? new URL(options.image, site.url).toString() : SOCIAL_IMAGE

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: options.type ?? 'website',
    ogUrl: url,
    ogSiteName: site.name,
    ogLocale: 'zh_CN',
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    ogImage: image,
    ogImageType: 'image/jpeg',
    ogImageWidth: options.imageWidth ?? 1200,
    ogImageHeight: options.imageHeight ?? 630,
    ogImageAlt: options.imageAlt ?? '刺猬花｜鲜花的聚合平台',
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: image,
    twitterImageAlt: options.imageAlt ?? '刺猬花｜鲜花的聚合平台',
    ...(options.type === 'article'
      ? {
          articlePublishedTime: options.publishedTime,
          articleModifiedTime: options.modifiedTime,
        }
      : {}),
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
    meta: options.keywords?.length
      ? [{ name: 'keywords', content: options.keywords.join(',') }]
      : [],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              name: site.name,
              alternateName: site.english,
              description: site.description,
              url: `${site.url}/`,
              email: site.email,
              '@id': `${site.url}/#organization`,
            },
            {
              '@type': 'WebSite',
              name: site.name,
              alternateName: site.english,
              url: `${site.url}/`,
              inLanguage: 'zh-CN',
              '@id': `${site.url}/#website`,
            },
            ...(options.structuredData ?? []),
          ],
        }),
      },
    ],
  })
}
