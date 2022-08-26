const fs = require('fs')
const { resolve } = require('path')


const targets = fs.readdirSync(resolve(__dirname, '../packages')).filter(f => {
  if (!fs.statSync(resolve(__dirname, `../packages/${f}`)).isDirectory()) {
    return false
  }
  const pkg = require(resolve(__dirname, `../packages/${f}/package.json`))
  if (pkg.private && !pkg.buildOptions) {
    return false
  }
  return true
})


module.exports = {
  targets
}
