/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [],
  },
  plugins: [
    require('daisyui'),
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '300px'
      },

      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        },

      animation: {
        border: 'border 4s ease infinite',
       
      },
      },

    },

  

}

