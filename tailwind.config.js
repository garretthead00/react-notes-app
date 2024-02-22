/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: 'Roboto',
      secondary: 'Rajdhani',
      tertiary: 'Aldrich',
    },
    container: {
      padding: '2px',
      center:true
    },
    screens: {
      xs: '370px',
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#7E3DD4',
        accent: '#FDD023',
      }
    },
  },
  plugins: [],
}

