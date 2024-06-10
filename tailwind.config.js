// tailwind.config.js
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        retro: ['"Press Start 2p"', 'system-ui'],
      },
      colors: {
        retroGreen: '#198719',
        retroOrange: '#fff',
        orange: colors.orange,
        red: colors.red,
      },
    },
  },
  plugins: [],
};
