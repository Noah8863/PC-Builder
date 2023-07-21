/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.625rem",
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        xxl: "1.75rem",
        "2xl": "2rem",
        "3xl": "3.5rem",
        "superText": "5rem",
      },
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
        customLightBlue: 'rgb(199, 225, 243)',
      },
      width: {
        'custom-width': '1400px',
      },
    },
  },
  plugins: [],
};
