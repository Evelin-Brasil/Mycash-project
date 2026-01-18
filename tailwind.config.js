/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CCFF00', // Verde limão da marca (ajustado visualmente)
          hover: '#B8E600',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F9FA',
        },
        text: {
          main: '#111827', // Gray 900
          secondary: '#6B7280', // Gray 500
        },
        border: '#E5E7EB', // Gray 200
        success: '#10B981',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assumindo Inter para modern look
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'float': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
      },
      screens: {
        'md': '768px',
        'lg': '1280px', // Ponto crítico da sidebar
        'xl': '1920px',
      }
    },
  },
  plugins: [],
}
