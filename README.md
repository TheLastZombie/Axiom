# Axiom

Axiom is a simple static site generator powering my personal website and its subdomains.

## Features

- Optimized for easily navigating between multiple domains.
- A simple, straight-forward theme inspired by [Oscean](https://wiki.xxiivv.com/site/oscean.html).
- A more modern theme similar to the one used by [Caddy](https://caddyserver.com/docs/).
- Automatic minification of HTML and JS files via [HTML Minifier](https://kangax.github.io/html-minifier/) and [UglifyJS](http://lisperator.net/uglifyjs/).
- Conversion to and generation of GMI files for [Gemini](https://gemini.circumlunar.space/).

## Installation

```
git clone https://github.com/TheLastZombie/Axiom
cd Axiom
npm install
pip install -r requirements.txt
```

## Usage

1. Add sites as subdirectories to the `src` directory.
2. Add pages as Markdown files to the respective site's directory.
3. Add any assets by placing them inside the site's directory.
4. Add your sites, pages and footer links to the `cfg/config.json` file.
5. Run `npm start` to build your sites into the `dist` directory.

A simple example with one site (home), one page (index) and one link (link) has been included in this repository. It is highly recommended to create an index file; Axiom will not do this by itself.

To modify a theme, have a look at `cfg/themes/theme/index.html` and `cfg/themes/theme/dist`.
  - The comments within `index.html` will be replaced with the actual menus and content.
  - Any files inside `dist` will be copied to every site's directory. CSS and JS files should be placed here.

## Changelog

- v1.0.0
  - Initial release
- v1.1.0
  - Don't assume websites are located at root
  - Use Poppins instead of Google Sans
  - Fix image links being inverted
  - Don't hide menus on smaller screens
- v2.0.0
  - Support prefers-color-scheme
  - Style selections
  - Breaking: Add footer links
- v2.1.0
  - Increase footer link margins
- v2.2.0
  - Generate title HTML tag
- v2.2.1
  - Fix overflowing images
- v2.3.0
  - Fix footer icon margins
  - Fix list margins
  - Add charset and viewport tags
  - Make links fill width on smaller screens
  - Hide menus when printing
- v2.4.0
  - Align left menu to right side
  - Don't convert code blocks to lowercase
  - Remove unwanted image underline on hover
- v2.4.1
  - Revert commit e87f544
- v2.5.0
  - Don't convert text to lowercase
- v2.6.0
  - Add rel-me configuration value
- v2.6.1
  - Fix iframe margins
- v2.7.0
  - Remove prefers-color-scheme support
- v2.7.1
  - Fix inverted links when using Dark Reader
- v2.8.0
  - Support generation of GMI files
- v2.8.1
  - Replace .html with .gmi in GMI files
- v2.9.0
  - Minify HTML files with .htm extension
  - Decrease margins on small screens
  - Update package-lock.json to version 2
  - Minify JS files with UglifyJS
- v2.10.0
  - Support multiple themes
  - Add Caddy theme
- v2.10.1
  - Fix top margin for Caddy theme
- v2.11.0
  - Make menus stick to top of page when scrolling
