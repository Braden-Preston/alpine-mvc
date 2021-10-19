let fs = require('fs-extra')
let path = require('path')
let esbuild = require('esbuild')
let coffee = require('esbuild-coffeescript')

let useWatch = process.argv.includes('-w')

let resolve = p => path.resolve(__dirname, '..', p)

let externals = [
  'fs',
  'cors',
  'path',
  'chalk',
  'middie',
  'kill-port',
  'fastify-cors',
  'fastify-express',
  'fastify-static',
  'connect-livereload',
  'livereload-js',
  'livereload'
]

build = async () => {
  // Copy static resources
  let outDir = resolve('.server')
  let publicDir = resolve('.server/public')
  let staticDir = resolve('web/public')
  await fs.emptyDir(outDir)
  await fs.ensureDir(publicDir)
  await fs.copy(staticDir, publicDir)

  // Bundle client
  esbuild
    .build({
      bundle: true,
      minify: true,
      platform: 'browser',
      entryPoints: ['web/src/app.js'],
      outfile: '.server/public/app.js',
      watch: useWatch
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })

  // Bundle server code
  esbuild
    .build({
      bundle: true,
      plugins: [coffee()],
      resolveExtensions: ['.coffee', '.js'],
      entryPoints: ['app/server.coffee'],
      outfile: '.server/index.js',
      platform: 'node',
      target: 'node12',
      external: externals,
      watch: useWatch
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

build()