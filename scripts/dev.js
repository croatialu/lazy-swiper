const { targets } = require('./utils')
const { resolve, relative } = require('path')
const fs = require('fs-extra')
const args = require('minimist')(process.argv.slice(2));


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

  const pkg = require(resolve(__dirname, `../packages/${target}/package.json`))

  const { format = 'cjs' } = pkg.buildOptions || {}

  const outfile = resolve(
    __dirname,
    `../packages/${target}/dist/${target}.${format}.js`.replace(/cjs./, '')
  )


  const relativeOutfile = relative(process.cwd(), outfile)

  console.log({
    outfile, relativeOutfile,
  })


  start(target)

  function start(target) {
    const pkgDir = resolve(`packages/${target}`)
    const pkg = require(`${pkgDir}/package.json`)


    const env =
      (pkg.buildOptions?.env) ||
      (devOnly ? 'development' : 'production')

    console.log(
      'rollup',
      [
        '-c',
        '--environment',
        [
          `COMMIT:${commit}`,
          `NODE_ENV:${env}`,
          `TARGET:${target}`,
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
