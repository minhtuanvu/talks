import { defineConfig, mergeConfigs, presetAttributify, presetIcons, presetUno } from 'unocss'
import config from '@slidev/client/uno.config.ts'

export default mergeConfigs([
  config,
  {
    shortcuts: [
    ],
    rules: [
      ['font-math', { 'font-family': 'Latin Modern Roman, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }],
    ],
    safelist: [
      ...Array.from({ length: 30 }, (_, i) => `delay-${(i + 1) * 100}`),
    ],
    presets: [
      presetUno({
        dark: 'class',
      }),
      presetAttributify(),
      presetIcons({
        prefix: 'i-',
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        warn: true,
      }),
    ],
  },
])
