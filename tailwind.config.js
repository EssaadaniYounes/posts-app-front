module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(0) ' },
          '50%': { transform: 'scale(1) ' },
        },
        // pulse: {
        //   '0 %, 100 %': { opacity: 1 },
        //   '50 %': { opacity: .5 },
        // }
      },
      animation: {
        zoom: 'zoom .8s ease ',
        // pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ]
}