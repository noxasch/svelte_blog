import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import alias from '@rollup/plugin-alias';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import { svelteShiki } from "svelte-shiki";

const production = !process.env.ROLLUP_WATCH;

// default
const shikiOptions = {
	theme: "nord",
	langs: "bash"
}

const aliases = alias({
	resolve: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.svelte'],
	entries: [
		{ find: '$src', replacement: `${__dirname}/src` },
		{ find: '$lib', replacement: `${__dirname}/src/lib` },
		{ find: '$stores', replacement: `${__dirname}/src/stores`},
	],
});

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		aliases,
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
			preprocess: [
				sveltePreprocess({
					sass: true,
					scss: true,
					sourceMap: !production,
					postcss: {
						plugins: [autoprefixer()],
					},
				}),
				svelteShiki(shikiOptions)
			],
			onwarn: (warning, handler) => {
				// e.g. don't warn on <marquee> elements, cos they're cool
				if (warning.code.includes('a11y')) return;

				// let Rollup handle all other warnings normally
				handler(warning);
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
