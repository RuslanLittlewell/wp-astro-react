import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      height: {
        fill: "-webkit-fill-available",
      },
      colors: {
        denim: {
          900: "#37474F", // Тёмно-серый с холодным подтоном (глубина)
          800: "#546E7A", // Серо-синий (текст заголовков)
          700: "#78909C", // Светло-серо-синий (основной текст)
          600: "#64B5F6", // Голубой акцент (кнопки, ссылки)
          500: "#90CAF9", // Светлый голубой (hover, иконки)
          300: "#e86901", // Очень светлый голубой (фон блоков)
          200: "#E3F2FD", // Почти белый голубой (общий фон секций)
          100: "#F5F5F5", // Светлый нейтральный фон
          50: "#FFFFFF", // Чисто белый (фон и карточки)
        },
        frost: {
          900: "#1C1F26",
          800: "#2E3A59",
          700: "#3F4E68",
          600: "#5C8DFF",
          500: "#8AB4F8",
          300: "#D6E4FF",
          100: "#F1F5FA",
          50: "#FFFFFF",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "denim-gradient": "linear-gradient(to bottom, #90CAF9, #546E7A)",
        "denim-gradient-r": "linear-gradient(to right, #90CAF9, #546E7A)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), typography],
};

export default config;
