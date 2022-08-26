import NodePath from 'path'
import RollupJson from '@rollup/plugin-json'
import RollupTypescript from '@rollup/plugin-typescript'
import fs from 'fs'

const resolveFile = path => {
  const result = NodePath.resolve(process.cwd(), path)
  console.log(result, 'result')
  return result
}

const Package = JSON.parse(fs.readFileSync(resolveFile('./package.json')).toString())


export default {
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.main),
      format: 'cjs',
      sourcemap: false
    },
    {
      file: resolveFile(Package.module),
      format: 'es',
      sourcemap: false
    },
    {
      file: resolveFile(Package.browser),
      format: 'umd',
      name: 'taro-lazy-swiper',
      sourcemap: false,
      globals: {
        react: 'React',
        '@tarojs/components': 'components',
        '@tarojs/taro': 'Taro'
      }
    }
  ],
  external: externalPackages,
  plugins: [
    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    RollupCommonjs({
      include: /\/node_modules\//
    }),
    RollupJson(),
    RollupTypescript({
      tsconfig: resolveFile('tsconfig.rollup.json')
    }),
    RollupCopy({
      targets: [
        { 
          src: './src/style', 
          dest: './dist', 
        },
      ]
    })
  ]
}
