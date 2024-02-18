/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'skyBlue': '#E2F0F9',
        'midBlue': '#B0DDE4',
        'darkBlue': '#286FB4',
        'white': '#FFFFFF',
        'red': '#DF4C73',
        'pink': '#efa3a0',
        'purple': '#8b597b',
        'lightPurple': '#b8a2b9',
        'skin': '#ffdec7',
        'brown': '#493129',
        'linear-darkBlue':'rgb(0, 64, 255)',
        'linear-lightBlue':'#00d4ff',
        'shade-darkBlue':'#00f7ff',
        'maldive-darkblue':'#6190E8',
        'maldive-lightblue':'#A7BFE8',
        'morning-yellw':'#f6d365',
        'morning-orange':'#fda085',
        'haldi':'#FFA900',
        'haldi-orange':'#FF5C01',
        'haldi-red':'#B01432',
        'haldi-yellow':'#EECF1A',
      },
      screens: {
        'sm': '425px',
        'md': '764px',
        'lg': '1024px',
        'xl': '1280px',
        'smmax': {'max': '425px'},
        'mdmax': {'max': '620px'},
        'mdsmax': {'max': '874px'},
        'mddmax':{'max':'900px'},
        'lgmax': {'max': '1024px'},
        'xlmax': {'max': '1155px'},
        'xxlmax': {'max': '1280px'},
        'xxxlmax':{'max':'1345px'},
      },
      // backgroung image
      backgroundImage:{
        'hero': "url('./src/assets/Image/bg-1.jpg')",
        'hero2': "url('./src/assets/Image/bg-2.jpg')",
        'hero3': "url('./src/assets/Image/bg-3.jpg')",
      },
      fontFamily: {
        'logo': ['Berkshire Swash', 'serif'],
      },
    },
  },
  plugins: [],
}

