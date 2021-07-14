const timepre = new Date()

console.log('Initializing modules and variables...')

const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

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

    let marked
    try {
      marked = require('marked')
    } catch (error) {
      console.log('    marked is not installed, skipping...')
    }

    if (marked) {
      filesX.forEach(y => {
        const infile = path.resolve(input, x.folder, y)
        const outfile = path.resolve(output, x.folder, path.parse(y).name + '.html')
        let title = x.pages.filter(z => z.file === path.parse(y).name)[0]
        title = title ? title.title : path.parse(y).name

        console.log('    Generating ' + path.basename(outfile) + ' from ' + path.basename(infile) + '...')

        const outtext = idxHTML
          .replace('<!-- LANGUAGE -->', config.language)
          .replace('<!-- TITLE -->', config.title + ' · ' + x.title + ' · ' + title)
          .replace('<!-- DESCRIPTION -->', fs.readFileSync(infile).toString().split('\n')[0].replace(/^#*\s*/, ''))
          .replace('<!-- LEFT -->', config.sites.map(z => '<p><a href="https://' + z.host + '">' + z.title + '</a></p>').join(''))
          .replace('<!-- CENTER -->', marked(fs.readFileSync(infile).toString()))
          .replace('<!-- BOTTOM -->', config.footer.map(z => '<a' + (z['rel-me'] ? ' rel="me" ' : ' ') + 'href="' + z.link + '" title="' + z.title + '"><img src="' + z.icon + '" width="32" height="32" alt="' + z.title + '"></a>').join(''))
          .replace('<!-- RIGHT -->', x.pages.filter(z => !z.hidden).map(z => '<p><a href="' + z.file + '.html' + '">' + z.title + '</a></p>').join(''))
          .replace('<!-- VERSION -->', require('./package').version)

        fs.writeFileSync(outfile, outtext)
      })
    }

    console.log('  Generating ' + filesX.length + ' GMI documents from Markdown files...')

    if (!process.env.PATH.split(path.delimiter).some(x => fs.existsSync(path.join(x, 'md2gemini')))) {
      console.log('    md2gemini is not installed, skipping...')
    } else {
      filesX.forEach(y => {
        const infile = path.resolve(input, x.folder, y)
        const outfile = path.resolve(output, x.folder, path.parse(y).name + '.gmi')
        let title = x.pages.filter(z => z.file === path.parse(y).name)[0]
        title = title ? title.title : path.parse(y).name

        console.log('    Generating ' + path.basename(outfile) + ' from ' + path.basename(infile) + '...')

        const outtext = idxGMI
          .replace('<!-- TITLE -->', config.title + ' · ' + x.title + ' · ' + title)
          .replace('<!-- LEFT -->', config.sites.map(z => '=> gemini://' + z.host + ' ' + z.title).join('\n'))
          .replace('<!-- CENTER -->', childProcess.execFileSync('md2gemini', ['-l', 'copy', infile]).toString().replace(/\.html/g, '.gmi').trim())
          .replace('<!-- BOTTOM -->', config.footer.map(z => '=> ' + z.link + ' ' + z.title).join('\n'))
          .replace('<!-- RIGHT -->', x.pages.filter(z => !z.hidden).map(z => '=> ' + z.file + '.gmi' + ' ' + z.title).join('\n'))
          .replace('<!-- VERSION -->', require('./package').version)

        fs.writeFileSync(outfile, outtext)
      })
    }
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

  let minify
  try {
    minify = require('html-minifier').minify
  } catch (error) {
    console.log('    html-minifier is not installed, skipping...')
  }

  if (minify) {
    fs.readdirSync(path.resolve(output, x.folder)).forEach(y => {
      if (path.extname(y) === '.html' || path.extname(y) === '.htm') {
        const file = path.resolve(output, x.folder, y)

        console.log('    Minifying file ' + y + '...')

        const sizepre = fs.statSync(file).size
        fs.writeFileSync(file, minify(fs.readFileSync(file).toString(), {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          includeAutoGeneratedTags: false,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeEmptyElements: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }))
        const sizepost = fs.statSync(file).size

        console.log('      Reduced file size from ' + sizepre + ' B to ' + sizepost + ' B.')
      }
    })
  }

  console.log('  Minifying CSS files...')

  let CleanCSS
  try {
    CleanCSS = require('clean-css')
  } catch (error) {
    console.log('    clean-css is not installed, skipping...')
  }

  if (CleanCSS) {
    fs.readdirSync(path.resolve(output, x.folder)).forEach(y => {
      if (path.extname(y) === '.css') {
        const file = path.resolve(output, x.folder, y)

        console.log('    Minifying file ' + y + '...')

        const sizepre = fs.statSync(file).size
        fs.writeFileSync(file, new CleanCSS({
          level: 2
        }).minify(fs.readFileSync(file).toString()).styles)
        const sizepost = fs.statSync(file).size

        console.log('      Reduced file size from ' + sizepre + ' B to ' + sizepost + ' B.')
      }
    })
  }

  console.log('  Minifying JS files...')

  let UglifyJS
  try {
    UglifyJS = require('uglify-js')
  } catch (error) {
    console.log('    uglify-js is not installed, skipping...')
  }

  if (UglifyJS) {
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
  }
})

const timepost = new Date()

console.log('Done. Processing took ' + (timepost - timepre) / 1000 + ' seconds.')
