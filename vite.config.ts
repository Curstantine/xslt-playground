import path from "node:path";
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.svg"],
			manifest: {
				name: "XSLT Playground",
				short_name: "XSLT",
				description: "Browser-native XSLT 1.0 transformer playground",
				theme_color: "#4338ca",
				background_color: "#fafafa",
				display: "standalone",
				start_url: "/",
				icons: [
					{
						src: "favicon.svg",
						sizes: "192x192",
						type: "image/svg+xml",
						purpose: "any",
					},
					{
						src: "favicon.svg",
						sizes: "512x512",
						type: "image/svg+xml",
						purpose: "any",
					},
					{
						src: "favicon.svg",
						sizes: "512x512",
						type: "image/svg+xml",
						purpose: "maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
			},
			devOptions: {
				enabled: true,
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rolldownOptions: {
			output: {
				strictExecutionOrder: true,
				codeSplitting: {
					groups: [
						{
							name: "codemirror",
							test: /node_modules\/(@codemirror|@uiw\/react-codemirror|@lezer)/,
							priority: 20,
						},
						{
							name: "react-vendor",
							test: /node_modules\/(react|react-dom|scheduler)/,
							priority: 10,
						},
					],
				},
			},
		},
	},
});
