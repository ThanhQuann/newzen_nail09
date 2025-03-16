import { SitemapStream, streamToPromise } from 'sitemap'
import { serverQueryContent } from '#content/server'
import SiteSettings from '@/data/site.json'
 
export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find()
  const baseUrl = SiteSettings?.en.BaseURL || 'https://example.com'
  const sitemap = new SitemapStream({
    hostname: baseUrl
  })
  for (const doc of docs) {

    if (doc._path?.startsWith('/blog') && doc._path !== '/blog' ) {
      if (doc.publish) {
        sitemap.write({
          url: doc._path,
          changefreq: doc?.sitemap?.changefreq || 'weekly',
          priority: doc?.sitemap?.priority || (doc._path !== undefined && doc._path !== '/') ? 0.8 : 1.0,
          lastmod: new Date()
        })
          if (doc?.category) {
            for (const cate of doc?.category) {
              if (typeof cate?.text === 'string') {
                sitemap.write({
                  url: `/blog/category/${cate?.text.toLowerCase().replace(/\s+/g, '-')}`,
                  changefreq: cate?.sitemap?.changefreq || 'weekly',
                  priority: cate?.sitemap?.priority || 0.8,
                  lastmod: new Date()
                })
              }
            }
          }
        }
      }
      else {
        sitemap.write({
          url: doc._path,
          changefreq: doc?.sitemap?.changefreq || 'weekly',
          priority: doc?.sitemap?.priority || (doc._path !== undefined && doc._path !== '/') ? 0.8 : 1.0,
          lastmod: new Date()
        })
      }
    }
  sitemap.end()
  return streamToPromise(sitemap)
})