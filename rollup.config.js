import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import glsl from "rollup-plugin-glsl";

const production = !process.env.ROLLUP_WATCH;

export default {
    input: "src/main.ts",
    output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: "public/build/bundle.js",
    },
    plugins: [
        commonjs(),
        css({ output: "bundle.css" }),
        glsl({
            include: "src/**/*.glsl",
            exclude: ["node_modules"],
            sourceMap: false,
        }),
        resolve({ browser: true }),
        typescript({
            sourceMap: !production,
            inlineSources: !production,
        }),
        !production && serve({ contentBase: "public", port: 5000 }),
        !production && livereload({ watch: "public", port: 12345 }),
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
};
