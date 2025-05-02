import { defineConfig } from "eslint-define-config";

export default defineConfig({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended", // Si estás usando React
    ],
    rules: {
        // Agrega reglas personalizadas aquí
    },
    settings: {
        react: {
            version: "detect", // Si estás usando React
        },
    },
});