import html from '@rollup/plugin-html'
import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

export default defineConfig({
  input: ["src/app.tsx"],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.tsx']
    }),
    commonjs(),
    html({
      template: () => {
        return `
        
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Rollup Bundle</title>
    
  </head>
  <body>
    <div id="root"></div>
    <script src="app.js"></script>
  </body>
</html>
        
        `
      }
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions:['.ts', '.tsx'],
      presets: ['@babel/preset-typescript', ["@babel/preset-react", { runtime: "automatic" }],]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __buildDate__: () => JSON.stringify(new Date()),
    })
  ],
  output: {
    dir: 'output',
    format: 'iife'
  },
})
