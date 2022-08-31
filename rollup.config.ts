import NodePath from 'path'
import RollupJson from '@rollup/plugin-json'
import RollupTypescript from 'rollup-plugin-typescript2'
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
  ],
  plugins: [
  
  ]
}
