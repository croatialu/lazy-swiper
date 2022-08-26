const { targets } = require('./utils')
const { resolve: _resolve, relative } = require('path')
const fs = require('fs-extra')
const args = require('minimist')(process.argv.slice(2));

const resolve = (path) => _resolve(__dirname, path)


(async () => {
  const execa = await import('execa')

  const commit = execa.execaSync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

  const target = args._[0] || 'core'
  const formats = args.formats || args.f
  const devOnly = args.devOnly || args.d
  const prodOnly = !devOnly && (args.prodOnly || args.p)
  const sourceMap = args.sourcemap || args.s
  const isRelease = args.release
  const buildTypes = args.t || args.types || isRelease
  const watch = args.w || args.watch

  const pkg = require(resolve(`../packages/${target}/package.json`))

  const { format = 'cjs' } = pkg.buildOptions || {}

  const outfile = resolve(
    `../packages/${target}/dist/${target}.${format}.js`.replace(/cjs./, '')
  )

  await start(target)

  async function start(target) {
    const pkgDir = resolve(`../packages/${target}`)
    const pkg = require(`${pkgDir}/package.json`)

    const env =
      (pkg.buildOptions?.env) ||
      (devOnly ? 'development' : 'production')

    await execa(
      'rollup',
      [
        `-c${watch ? 'w' : ''}`,
        `--config ${resolve(__dirname, './../rollup.config.ts')}`,
        '--environment',
        [
          `COMMIT:${commit}`,
          `NODE_ENV:${env}`,
          `TARGET:${target}`,
          `OUTFILE:${outfile}`,
          formats ? `FORMATS:${formats}` : ``,
          buildTypes ? `TYPES:true` : ``,
          prodOnly ? `PROD_ONLY:true` : ``,
          sourceMap ? `SOURCE_MAP:true` : ``
        ]
          .filter(Boolean)
          .join(',')
      ],
      { stdio: 'inherit' }
    )
  }
})()
