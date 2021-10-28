let { execSync } = require('child_process')

async function clean() {
  return Promise.all([
    execSync('yarn cache clean'),
    execSync('rm -rf node_modules'),
    execSync('rm -rf .app'),
  ])  
}

module.exports = clean()
