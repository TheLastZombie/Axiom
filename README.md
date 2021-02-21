# Axiom

Axiom is a simple static site generator powering my personal website and its subdomains.

## Features

- Optimized for easily navigating between multiple domains.
- A simple, straight-forward theme inspired by [Oscean](https://wiki.xxiivv.com/site/oscean.html).
- Automatic minification of HTML files via [HTML Minifier](https://kangax.github.io/html-minifier/).

## Installation

```
git clone https://github.com/TheLastZombie/Axiom
cd Axiom
npm install
```

## Usage

1. Add sites as subdirectories to the `src` directory.
2. Add pages as Markdown files to the respective site's directory.
3. Add any assets by placing them inside the site's directory.
4. Add your sites, pages and footer links to the `cfg/config.json` file.
5. Run `npm start` to build your sites into the `dist` directory.

A simple example with one site (home), one page (index) and one link (link) has been included in this repository. It is highly recommended to create an index file; Axiom will not do this by itself.

To modify the default theme, have a look at `cfg/index.html` and `cfg/dist`.
  - The comments within `cfg/index.html` will be replaced with the actual menus and content.
  - Any files inside `cfg/dist` will be copied to every site's directory. CSS and JS files should be placed here.

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
