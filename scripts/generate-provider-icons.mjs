import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

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

const outputDir = path.resolve('src/components/providers')

const isSvgMarkup = (markup) => markup.trimStart().startsWith('<svg')

const importIconComponent = async (iconId) => {
  const candidates = ['Mono']

  for (const variant of candidates) {
    const modulePath = path.resolve(
      `node_modules/@lobehub/icons/es/${iconId}/components/${variant}.js`
    )

    try {
      const module = await import(pathToFileURL(modulePath).href)
      if (module.default) {
        return {
          component: module.default,
          variant,
        }
      }
    } catch {
      // Try the next available variant.
    }
  }

  throw new Error(`No icon component found for ${iconId}`)
}

const toAstroComponentSource = (svg) => `${svg}\n`

const toIndexSource = (iconIds) => {
  const imports = iconIds
    .map((iconId) => `import ${iconId} from './${iconId}.astro'`)
    .join('\n')

  const entries = iconIds.map((iconId) => `  ${iconId},`).join('\n')

  return `${imports}\n\nexport const providerIcons = {\n${entries}\n}\n`
}

await mkdir(outputDir, { recursive: true })

for (const iconId of providers) {
  const { component: IconComponent, variant } =
    await importIconComponent(iconId)
  const svg = renderToStaticMarkup(
    React.createElement(IconComponent, { size: 24 })
  )

  if (!isSvgMarkup(svg)) {
    throw new Error(`Generated markup for ${iconId} is not an svg element`)
  }

  const filePath = path.join(outputDir, `${iconId}.astro`)

  await writeFile(filePath, toAstroComponentSource(svg))
  console.log(`Generated ${filePath} from ${variant}`)
}

await writeFile(path.join(outputDir, 'index.ts'), toIndexSource(providers))
console.log(`Generated ${path.join(outputDir, 'index.ts')}`)
