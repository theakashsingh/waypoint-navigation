/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate'; // Import the plugin

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnimate], // Use the imported plugin
}

