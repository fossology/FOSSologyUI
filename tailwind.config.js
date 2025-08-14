const config = {
    content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {
    spacing: {
        'page': '32px',
        'gutter': '24px',
    },
    colors: {
        // Primary
        primary: {
            900: "#C31730",
            800: "#EC4958",
            700: "#F57B85",
            100: "#FFCED7",
        },
        // Secondary
        secondary: {
            900: "#101010",
            700: "#807F82",
        },
        // Tertiary 1
        tertiary1: {
            900: "#000B54",
            800: "#004494",
            600: "#4D7CB7",
            400: "#B0C4DE",
            200: "#DEE7F2",
        },
        // Tertiary 2
        tertiary2: {
            900: "#513DA8",
            800: "#6D67D9",
            600: "#9BA1F4",
            400: "#D3D6FF",
            200: "#EEEFFF",
        },
        // Neutrals
        neutral: {
            900: "#303030",
            800: "#616161",
            700: "#888888",
            600: "#A9A9A9",
            400: "#CECECE",
            300: "#E1E1E1",
            200: "#EDEDED",
            100: "#F6F6F6",
        },
        // Alerts
        error: {
            100: "#FFEBEE",
            500: "#E03C31",
            700: "#5F2120",
        },
        warning: {
            100: "#FFF3E0",
            500: "#EF6C00",
            700: "#663C00",
        },
        info: {
            100: "#E1F5FE",
            500: "#0079BA",
            700: "#014361",
        },
        success: {
            100: "#E8F5E9",
            500: "#2E7D32",
            700: "#1E4620",
        },
        },
        fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        },
        fontSize: {
            base: ["14px", "20px"], // 14px font size with ~20px line-height
        },
        letterSpacing: {
            normal: "0px",
        },
        textColor: {
            default: "#101010",
        },
        spacing: {
            13: "3.25rem", // 52px
            18: "4.5rem",  // 72px
        },
        },
    },
    plugins: [],
}
export default config