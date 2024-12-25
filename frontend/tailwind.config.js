/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      cream: '#EAE8E4',
      gray:{
        dark: '#2E2E2E',
        light: '#D3D3D3',
      } ,
      green: {
        DEFAULT:'#957C3D',
        // dark: '#388E3C'
      } ,
      mustard: '#C49F5F',
      blue: {
        DEFAULT: '#002349',
      },
      red: '#E57373',
      white: '#FFFFFF',
    }
    // extend: {},
  },
  plugins: []
}
