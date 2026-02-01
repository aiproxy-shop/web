// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite' // Keep this!
import remarkAlert from 'remark-github-alerts'

export default defineConfig({
  site: 'https://aiproxy.shop',
  integrations: [mdx(), sitemap()],
  vite: {
    // @ts-ignore
    plugins: [tailwindcss({})], // And keep this!
  },
  markdown: {
    remarkPlugins: [remarkAlert],
  },
})
