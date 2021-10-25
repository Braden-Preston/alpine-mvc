async function dev() {
  process.argv.push('-w')
  require('./build')
  require('./serve')
}

module.exports = dev()
