/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MedGuard AI brand colors
        primary: {
          50:  '#F0FDFA',  // teal-50 - light backgrounds
          100: '#CCFBF1',  // teal-100
          200: '#99F6E4',  // teal-200
          500: '#14B8A6',  // teal-500
          600: '#0D9488',  // teal-600 - main brand color
          700: '#0F766E',  // teal-700 - hover state
          800: '#115E59',  // teal-800
        },
        // Semantic colors for risk levels
        success: {
          50:  '#F0FDF4',
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          50:  '#FFFBEB',
          500: '#F59E0B',
          600: '#D97706',
        },
        danger: {
          50:  '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
