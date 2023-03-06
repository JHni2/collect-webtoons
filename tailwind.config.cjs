module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1025px',
      xl: '1280px',
      xl2: '1360px',
    },
    extend: {
      backgroundImage: {
        google: "url('./imgs/google.svg')",
      },
      transitionProperty: {
        toggleTransition: 'transform, oapcity',
      },
    },
  },
  plugins: [],
}
