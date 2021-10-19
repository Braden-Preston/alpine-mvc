const { exec } = require('child_process')
const { parallel, task } = require('gulp')

task('bundle', cb => {
  return exec('node scripts/build -w')
})

task('build', cb => {
  return exec('node scripts/build')
})

task('serve', async cb => {
  return exec('fastify start -l info .server/index.js', (err, stdout, stderr) =>
    err ? console.log(stdout) : console.error(stderr)
  )
})

task('clean', cb => {
  return Promise.all([
    exec('rm -r .server'),
    exec('rm -r node_modules'),
    exec('yarn cache clean'),
  ])
})

exports.watch = parallel('bundle')
exports.start = parallel('build', 'serve')
exports.clean = parallel('clean')
