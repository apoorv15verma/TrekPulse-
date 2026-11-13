/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          brand: '#5046E4',
          hover: '#4338CA',
          soft: '#EEF2FF',
          tint: '#F1F3FF',
          border: '#D5DAFC',
        },
        alpine: {
          green: '#7EC845',
          hover: '#6EB43C',
          light: '#F2FCE8',
          border: '#C8ECA8',
        },
        alpenglow: {
          amber: '#FF9F1C',
          hover: '#F08C00',
          light: '#FFF6E8',
          border: '#FFE0B2',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'phone': '0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 12px #1E293B',
        'sheet': '0 -10px 40px -10px rgba(0, 0, 0, 0.15)',
        'pill': '0 4px 14px 0 rgba(80, 70, 228, 0.25)',
      },
    },
  },
  plugins: [],
}
