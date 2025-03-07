/** @type {import('tailwindcss').Config} */

const { brown } = require('@mui/material/colors');

// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths as per your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#e6c4af",
          DEFAULT: "#e9ded4",
        },
        secondary: {
          beige: "#b38d72",
          darkBeige: "#bb8d72",
          blue: "#92a2ba",
          mauve: "#75636c",
          green: "#62754f",
          brown: "#3e2723",
          brownLight: "#4e342e",
        },
        tertiary: {
          dark: "#29282e",
        },
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
