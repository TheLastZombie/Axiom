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
4. Add your sites and pages to the `cfg/config.json` file.
5. Run `npm start` to build your sites into the `dist` directory.

A simple example with one site (home) and one page (index) has been included in this repository. It is highly recommended to create an index file; Axiom will not do this by itself.

To modify the default theme, have a look at `cfg/index.html` and `cfg/dist`.
  - The comments within `cfg/index.html` will be replaced with the actual menus and content.
  - Any files inside `cfg/dist` will be copied to every site's directory. CSS and JS files should be placed here.

## Changelog

- v1.0.0
  - Initial release
