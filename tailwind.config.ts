/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"
import _ from 'lodash'

export default {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1440px'
		},
		linearGradientColors: {
      white: ['#f4f4f4', '#D9D9D9 42%'],
		},
		fontFamily: {
			sans: [
				'var(--font-noto-sans-tc)',
				'Arial',
				'Helvetica',
				'微軟正黑體',
				'Microsoft JhengHei',
				'Heiti TC',
				'LiHei Pro',
				'新細明體',
				'PMingLiU',
				...defaultTheme.fontFamily.sans
			]
		},
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
		require("@tailwindcss/forms")({
			strategy: 'class',
		}),
		require('tailwindcss-aspect-ratio'),
		require('tailwindcss-gradients'),
		require('tailwindcss-border-gradients')(),
		require('tailwindcss-textshadow'),
		plugin(function({ addComponents, theme, e }) {
			const screens = theme('screens', {})
			const css = {
				'.rendering-auto': {
					'image-rendering': 'auto',
				},
				'.rendering-webkit': {
					'image-rendering': '-webkit-optimize-contrast',
				},
				'.rendering-pixelated': {
					'image-rendering': 'pixelated',
				}
			}

			const mediaQueries = _.map(screens, (width, breakpoint) => {
				const obj: Record<string, any> = {}
				obj[`@media (min-width: ${width})`] = _.map(css, (val, key) => {
					return {
						[`.${e(`${breakpoint}\:${key.split('.')[1]}`)}`]: val
					}
				})
				return obj
			})

			addComponents([
				css,
				...mediaQueries
			])
		})
  ],
} satisfies Config;
