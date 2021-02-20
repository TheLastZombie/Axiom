console.log('Initializing modules and variables...')

const fs = require('fs')
const path = require('path')

const { minify } = require('html-minifier')
const marked = require('marked')

const input = path.resolve('src')
const output = path.resolve('dist')
const assets = path.resolve('cfg', 'dist')
const index = fs.readFileSync(path.resolve('cfg', 'index.html')).toString()

let config = path.resolve('cfg', 'config.json')

console.log('Reading configuration file...')

config = JSON.parse(fs.readFileSync(config))

config.forEach(x => {
  console.log('Building ' + x.title + ' (' + x.folder + ')...')

  if (fs.existsSync(path.resolve(output, x.folder))) {
    console.log('  Removing existing root directory...')

    fs.rmdirSync(path.resolve(output, x.folder), {
      recursive: true
    })
  }

  console.log('  Creating root directory...')

  fs.mkdirSync(path.resolve(output, x.folder))

  const files = fs.readdirSync(path.resolve(input, x.folder))
  const filesX = files.filter(y => path.extname(y) === '.md')
  const filesY = files.filter(y => !filesX.includes(y))

  if (filesX.length) {
    console.log('  Generating ' + filesX.length + ' HTML documents from Markdown files...')

    filesX.forEach(y => {
      const infile = path.resolve(input, x.folder, y)
      const outfile = path.resolve(output, x.folder, path.parse(y).name + '.html')

      console.log('    Generating ' + path.basename(outfile) + ' from ' + path.basename(infile) + '...')

      const outtext = index
        .replace('<!-- LEFT -->', config.map(z => '<p><a href="https://' + z.host + '">' + z.title + '</a></p>').join(''))
        .replace('<!-- CENTER -->', marked(fs.readFileSync(infile).toString()))
        .replace('<!-- RIGHT -->', x.pages.filter(z => !z.hidden).map(z => '<p><a href="/' + z.file + '.html' + '">' + z.title + '</a></p>').join(''))

      fs.writeFileSync(outfile, outtext)
    })
  }

  if (filesY.length) {
    console.log('  Copying ' + filesY.length + ' non-Markdown files...')

    filesY.forEach(y => {
      const infile = path.resolve(input, x.folder, y)
      const outfile = path.resolve(output, x.folder, y)

      console.log('    Copying file ' + y + '...')

      fs.copyFileSync(infile, outfile)
    })
  }

  console.log('  Copying remaining assets...')

  fs.readdirSync(assets).forEach(y => {
    const infile = path.resolve(assets, y)
    const outfile = path.resolve(output, x.folder, y)

    console.log('    Copying file ' + y + '...')

    fs.copyFileSync(infile, outfile)
  })

  console.log('  Minifying HTML files...')

  fs.readdirSync(path.resolve(output, x.folder)).forEach(y => {
    if (path.extname(y) === '.html') {
      const file = path.resolve(output, x.folder, y)

      console.log('    Minifying file ' + y + '...')

      const sizepre = fs.statSync(file).size
      fs.writeFileSync(file, minify(fs.readFileSync(file).toString(), {
        collapseWhitespace: true
      }))
      const sizepost = fs.statSync(file).size

      console.log('      Reduced file size from ' + sizepre + ' B to ' + sizepost + ' B.')
    }
  })
})
