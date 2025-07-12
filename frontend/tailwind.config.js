/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";
import typography from "@tailwindcss/typography";
export default {
  theme: {
    extend: {
      colors: {
        primary: "#C9B974", // nice yellow
        logo: "#CFB755", // color for logos and icons
        base: "#0A0F1F", // Deep Space Violet - dark background also used for tooltips
        "base-secondary": "#1A1F2F", // lighter background based on Deep Space Violet
        danger: "#E76A5E",
        success: "#A5E75E",
        basic: "#A8AFC1", // Frosted Lavender - light gray
        tertiary: "#454545", // gray, used for inputs
        "tertiary-light": "#B7BDC2", // lighter gray, used for borders and placeholder text
        content: "#D6DCE4", // Soft Platinum - light gray, used mostly for text
        "content-2": "#FAF8FF", // Aurora Mist - ultra-light off-white with a purplish hue
      },
    },
  },
  darkMode: "class",
  plugins: [typography],
};
