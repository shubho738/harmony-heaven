import type { Config } from 'tailwindcss'

const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {

    screens: {
      'xs': '430px',
      ...defaultTheme.screens,
    },

    extend: {
      colors: {
        "background": "hsl(var(--clr-background))",
        "foreground": "hsl(var(--clr-foreground))",

        "accent": "hsl(var(--clr-accent))",
        "accent-secondary": "hsl(var(--clr-accent-secondary))",

        "neutral-dark": "hsl(var(--clr-neutral-dark))",
        "neutral-md": "hsl(var(--clr-neutral-md))",
        "neutral-light": "hsl(var(--clr-neutral-light))",

        "border-dark": "hsl(var(--clr-border-dark))",
        "border-md": "hsl(var(--clr-border-md))",
        "border-light": "hsl(var(--clr-border-light))",

        "tooltip-bg": "hsl(var(--clr-tooltip-bg))",
        "tooltip-text": "hsl(var(--clr-tooltip-text))",

        "btn-primary": "hsl(var(--clr-btn-primary))",
        "btn-primary-text": "hsl(var(--clr-btn-primary-text))",
        "btn-primary-loader": "hsl(var(--clr-btn-primary-loader))",
        "btn-secondary": "hsl(var(--clr-btn-secondary))",
        "btn-secondary-text": "hsl(var(--clr-btn-secondary-text))",
        "btn-secondary-loader": "hsl(var(--clr-btn-secondary-loader))",
        "btn-danger": "hsl(var(--clr-btn-danger))",
        "btn-danger-text": "hsl(var(--clr-btn-danger-text))",
        "btn-danger-loader": "hsl(var(--clr-btn-danger-loader))",

        "hover-primary": "hsl(var(--clr-hover-primary))",
        "hover-secondary": "hsl(var(--clr-hover-secondary))",

        "loader": "hsl(var(--clr-loader))"
      },
    }
  },

  plugins: [
    require('@shrutibalasa/tailwind-grid-auto-fit')
  ],
}
export default config 
