import { site } from '~/data/site'

const SOCIAL_IMAGE = `${site.url}/og-image.jpg`

type PageSeoOptions = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  structuredData?: Record<string, unknown>[]
}

export const usePageSeo = (options: PageSeoOptions) => {
  const url = new URL(options.path, site.url).toString()

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: options.type ?? 'website',
    ogUrl: url,
    ogSiteName: site.name,
    ogLocale: 'zh_CN',
    ogImage: SOCIAL_IMAGE,
    ogImageType: 'image/jpeg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: '刺猬花｜鲜花的聚合平台',
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: SOCIAL_IMAGE,
    twitterImageAlt: '刺猬花｜鲜花的聚合平台',
    ...(options.type === 'article'
      ? {
          articlePublishedTime: options.publishedTime,
          articleModifiedTime: options.modifiedTime,
        }
      : {}),
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
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
