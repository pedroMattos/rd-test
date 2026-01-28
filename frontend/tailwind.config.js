/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        rd: {
          blue: {
            500: "#1C6ED5",
            600: "#155BB0",
            700: "#0F3F7A",
          },
          orange: {
            600: "#D96512",
            700: "#A94A0C",
          },
          gray: {
            50: "#F8FAFC",
            200: "#E2E8F0",
            300: "#CBD5E1",
            500: "#64748B",
            700: "#334155",
            800: "#1E293B",
          },
        },
      },
    },
  },
  plugins: [],
}
