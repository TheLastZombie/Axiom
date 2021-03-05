console.log('Initializing modules and variables...')

const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const { minify } = require('html-minifier')
const marked = require('marked')
const UglifyJS = require('uglify-js')

const input = path.resolve('src')
const output = path.resolve('dist')
let assets = path.resolve('cfg', 'themes')
let idxHTML = path.resolve('cfg', 'themes')
const idxGMI = fs.readFileSync(path.resolve('cfg', 'index.gmi')).toString()

let config = path.resolve('cfg', 'config.json')

console.log('Reading configuration file...')

config = JSON.parse(fs.readFileSync(config))

assets = path.resolve(assets, config.theme, 'dist')
idxHTML = fs.readFileSync(path.resolve(idxHTML, config.theme, 'index.html')).toString()

config.sites.forEach(x => {
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
      let title = x.pages.filter(z => z.file === path.parse(y).name)[0]
      title = title ? title.title : path.parse(y).name

      console.log('    Generating ' + path.basename(outfile) + ' from ' + path.basename(infile) + '...')

      const outtext = idxHTML
        .replace('<!-- TITLE -->', title)
        .replace('<!-- LEFT -->', config.sites.map(z => '<p><a href="https://' + z.host + '">' + z.title + '</a></p>').join(''))
        .replace('<!-- CENTER -->', marked(fs.readFileSync(infile).toString()))
        .replace('<!-- BOTTOM -->', config.footer.map(z => '<a' + (z['rel-me'] ? ' rel="me" ' : ' ') + 'href="' + z.link + '" title="' + z.title + '"><img src="' + z.icon + '" alt="' + z.title + '"></a>').join(''))
        .replace('<!-- RIGHT -->', x.pages.filter(z => !z.hidden).map(z => '<p><a href="' + z.file + '.html' + '">' + z.title + '</a></p>').join(''))

      fs.writeFileSync(outfile, outtext)
    })

    console.log('  Generating ' + filesX.length + ' GMI documents from Markdown files...')

    filesX.forEach(y => {
      const infile = path.resolve(input, x.folder, y)
      const outfile = path.resolve(output, x.folder, path.parse(y).name + '.gmi')
      let title = x.pages.filter(z => z.file === path.parse(y).name)[0]
      title = title ? title.title : path.parse(y).name

      console.log('    Generating ' + path.basename(outfile) + ' from ' + path.basename(infile) + '...')

      const outtext = idxGMI
        .replace('<!-- TITLE -->', title)
        .replace('<!-- LEFT -->', config.sites.map(z => '=> gemini://' + z.host + ' ' + z.title).join('\n'))
        .replace('<!-- CENTER -->', childProcess.execFileSync('md2gemini', ['-l', 'copy', infile]).toString().replace(/\.html/g, '.gmi').trim())
        .replace('<!-- BOTTOM -->', config.footer.map(z => '=> ' + z.link + ' ' + z.title).join('\n'))
        .replace('<!-- RIGHT -->', x.pages.filter(z => !z.hidden).map(z => '=> ' + z.file + '.gmi' + ' ' + z.title).join('\n'))

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
    if (path.extname(y) === '.html' || path.extname(y) === '.htm') {
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

  console.log('  Minifying JS files...')

  fs.readdirSync(path.resolve(output, x.folder)).forEach(y => {
    if (path.extname(y) === '.js') {
      const file = path.resolve(output, x.folder, y)

      console.log('    Minifying file ' + y + '...')

      const sizepre = fs.statSync(file).size
      fs.writeFileSync(file, UglifyJS.minify(fs.readFileSync(file).toString()).code)
      const sizepost = fs.statSync(file).size

      console.log('      Reduced file size from ' + sizepre + ' B to ' + sizepost + ' B.')
    }
  })
})
