/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,svg}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      base: '#FAF0E4',
      primary: '#FFE569',
      secondary: '#F79327'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        base: '#FAF0E4',
        primary: '#FFE569',
        secondary: '#F79327'
      }
    },
    plugins: [],
  }
}
