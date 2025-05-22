/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        finance: {
          50: '#F0F7FF',  // Lightest blue - almost white with blue tint
          100: '#E0EFFF',
          200: '#C0DFFF',
          300: '#80BFFF',
          400: '#4099FF',
          500: '#0074E1', // Primary blue for finance
          600: '#0058AD',
          700: '#004080',
          800: '#002F5C',
          900: '#001F3F', // Darkest blue - almost navy
        },
        accent: {
          50: '#F0FCF9',
          100: '#D0F4E9',
          200: '#A0E9D9',
          300: '#70DFC9',
          400: '#40D5B9',
          500: '#20B394', // Secondary teal accent
          600: '#188F75',
          700: '#106B57',
          800: '#084739',
          900: '#042E24',
        },
        academic: {
          50: '#E6EEF5',
          100: '#CCDCEB',
          200: '#99BAD7',
          300: '#6697C2',
          400: '#3375AE',
          500: '#013A63', // Primary academic blue
          600: '#012E4F',
          700: '#01223B',
          800: '#001728',
          900: '#000B14',
        },
        sicredi: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#2E7D32', // Sicredi green
          700: '#1B5E20',
          800: '#0A3C0A',
          900: '#051B05',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};