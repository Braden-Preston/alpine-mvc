let fs = require('fs-extra')
let path = require('path')
let esbuild = require('esbuild')
let chokidar = require('chokidar')
let coffee = require('esbuild-coffeescript')
let pkg = require('../package.json')

let { exec } = require('child_process')

let useWatch = process.argv.includes('-w')
let external = Object.keys(pkg.dependencies)

async function watch(dir, cb) {
  chokidar.watch(dir).on('change', cb)
}

async function copy(src, out) {
  let srcDir = path.resolve(src)
  let outDir = path.resolve(out)
  await fs.ensureDir(outDir)
  await fs.copy(srcDir, outDir)
}

async function build() {
  // Clear old .app directory
  await fs.emptyDir(path.resolve('.app'))

  // Transform CSS with tailwind
  exec(
    `tailwindcss -i src/app.css -o .app/dist/app.css ${useWatch && '--watch'}`
  )

  // Copy static dirs and re-copy on changes
  await copy('app/public', '.app/public')
  await copy('app/views', '.app/views')
  useWatch && watch('app/public', () => copy('app/public', '.app/public'))
  useWatch && watch('app/views', () => copy('app/views', '.app/views'))

  // Bundle the client code
  await esbuild.build({
    bundle: true,
    minify: true,
    entryPoints: ['src/app.js'],
    outdir: '.app/dist',
    platform: 'browser',
    target: 'es2020',
    watch: useWatch
  })

  // Bundle the server code
  await esbuild.build({
    bundle: true,
    plugins: [coffee()],
    resolveExtensions: ['.coffee', '.js'],
    entryPoints: ['app/server.coffee'],
    outdir: '.app',
    platform: 'node',
    target: 'node14',
    external: external,
    watch: useWatch
  })
}

module.exports = build()
