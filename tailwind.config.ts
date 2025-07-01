import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        bakker: {
          cream: '#FFF8E7',
          beige: '#F5E6D3',
          bruin: '#8B4513',
          donkerbruin: '#654321',
          goud: '#FFD700',
        },
        // ... existing colors ...
      },
      // ... existing config ...
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config 