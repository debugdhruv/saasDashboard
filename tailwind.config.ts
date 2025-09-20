import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // This is important
  theme: {
   extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ONLY your primary color #1c1c1c at different opacities
        primary: {
          5: 'rgba(28, 28, 28, 0.05)',   // 5% opacity
          10: 'rgba(28, 28, 28, 0.10)',  // 10% opacity  
          20: 'rgba(28, 28, 28, 0.20)',  // 20% opacity
          40: 'rgba(28, 28, 28, 0.40)',  // 40% opacity
          100: '#1c1c1c',                // 100% opacity
        },
      },
    },
  },
  plugins: [],
}

export default config