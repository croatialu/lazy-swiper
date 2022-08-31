import html from '@rollup/plugin-html'
import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

export default defineConfig({
  input: ["src/index.ts"],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.tsx']
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions:['.ts', '.tsx'],
      presets: ['@babel/preset-typescript', ["@babel/preset-react", { runtime: "automatic" }]],
    })
  ],
  output: {
    dir: 'dist',
    format: 'es'
  },
  external: ["react", 'react-dom']
})
