let coffee = require("esbuild-coffeescript");

let useWatch = process.argv.includes("--watch");

let externals = [
	'fs',
	'path', 
	'fastify-static'
]

require("esbuild")
	.build({
		entryPoints: ["app/server.coffee"],
		outfile: "build/index.js",
		platform: "node",
		target: "node12",
		external: externals,
		watch: useWatch,
		bundle: true,
		plugins: [coffee()]
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
