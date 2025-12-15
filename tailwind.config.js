// tailwind.config.js
const tailwindConfig = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Configure your template paths
    theme: {
        extend: {
            colors: {
                // This adds a new 'primary' color utility (e.g., bg-primary)
                'primary': '#FF5733',
                // You can also extend default colors like gray
                'gray': {
                    ...require('tailwindcss/defaultTheme').colors.gray,
                    '950': '#0a0d12',
                },
            },
            // You can also extend other aspects globally, like spacing or typography
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
        },
    },
    plugins: [],
};

export default tailwindConfig
