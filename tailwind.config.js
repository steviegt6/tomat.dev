/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "background": "#0c0c0c"
            },
            screens: {
                "navBreak": "800px"
            }
        }
    },
    plugins: []
};
