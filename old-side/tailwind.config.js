/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "background": "var(--background-color)",
                "middleground": "var(--middleground-color)",
                "foreground": "var(--foreground-color)",
                "highlight": "var(--highlight-color)",
                "lowlight": "var(--lowlight-color)"
            },
            screens: {
                "navBreak": "640px"
            }
        }
    },
    plugins: []
};
