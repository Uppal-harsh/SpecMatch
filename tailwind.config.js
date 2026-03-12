/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        card: "var(--card)",
        border: "var(--border)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        accent3: "var(--accent3)",
        text: "var(--text)",
        muted: "var(--muted)",
      },
      fontFamily: {
        mono: ['var(--font-dm-mono)'],
        display: ['var(--font-syne)'],
        body: ['var(--font-instrument-sans)'],
      },
    },
  },
  plugins: [],
};
