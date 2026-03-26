import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import toc from '@lobehub/icons/es/toc.js'

const providers = [
  'Bailian',
  'Vercel',
  'Kimi',
  'DeepInfra',
  'DeepSeek',
  'Minimax',
  'OpenCode',
  'OpenRouter',
  'Baseten',
  'Novita',
  'Fireworks',
  'Zeabur',
]

const outputDir = path.resolve('public/imgs/providers')
const iconMap = new Map(toc.map((item) => [item.id, item]))

const isSvgMarkup = (markup) => markup.trimStart().startsWith('<svg')

const importIconComponent = async (iconId) => {
  const iconMeta = iconMap.get(iconId)
  const candidates = iconMeta?.param.hasColor
    ? ['Color', 'Mono', 'Text', 'Avatar', 'Combine']
    : ['Mono', 'Text', 'Color', 'Avatar', 'Combine']

  for (const variant of candidates) {
    const modulePath = path.resolve(
      `node_modules/@lobehub/icons/es/${iconId}/components/${variant}.js`
    )

    try {
      const module = await import(pathToFileURL(modulePath).href)
      if (module.default) {
        return module.default
      }
    } catch {
      // Try the next available variant.
    }
  }

  throw new Error(`No icon component found for ${iconId}`)
}

await mkdir(outputDir, { recursive: true })

for (const iconId of providers) {
  const IconComponent = await importIconComponent(iconId)
  const svg = renderToStaticMarkup(
    React.createElement(IconComponent, { size: 24 })
  )

  if (!isSvgMarkup(svg)) {
    throw new Error(`Generated markup for ${iconId} is not an svg element`)
  }

  const filePath = path.join(outputDir, `${iconId}.svg`)

  await writeFile(filePath, svg)
  console.log(`Generated ${filePath}`)
}
