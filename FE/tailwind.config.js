/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      zIndex: {
        100: "100",
        1000: "1000",
      },
      fontFamily: {
        merriweather: ["Merriweather", "serif"],
        noto: ["Noto Sans", "serif"],
        open_sans: ["Open Sans", "sans-serif"],
      },
      colors: {
        bg_main: "#F3F3F3",
        table_background: "#A3A3A3",
        table_body_background: "#C7C7C7",
        table_header_background: "#262626",
        bg_login: "#C3C4C6",
      },
      rotate: {
        28: "28deg",
      },
      keyframes: {
        loader: {
          "15%": {
            transform: "translateX(0)",
          },
          "45%": {
            transform: " translateX(230px)",
          },
          "65%": {
            transform: " translateX(230px)",
          },
          "95%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        loading: "loader infinite 2s",
      },
      transitionDelay: {
        400: "400ms",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {
            focus: "#000000",
            primary: "#000000",
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#000000", // or DEFAULT
            foreground: "#ECEDEE", // or 50 to 900 DEFAULT
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
          },
        },
      },
    }),
  ],
};
