import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default defineConfig(
	globalIgnores(["dist/**", "assets/**", "build/**", ".baseline-build/**", ".react-router/**", "playwright-report/**", "test-results/**"]),
	{
		files: ["**/*.{js,mjs,ts,tsx}"],
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
	{
		files: ["src/**/*.{ts,tsx}"],
		plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": ["error", { allowConstantExport: true, allowExportNames: ["meta", "links", "loader", "Layout", "ErrorBoundary"] }],
		},
	},
);
