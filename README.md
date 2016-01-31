# evansosenko.com

[![GitHub release](https://img.shields.io/github/release/evansosenko/evansosenko.github.io.svg)](https://github.com/evansosenko/evansosenko.github.io/releases)
[![GitHub license](https://img.shields.io/badge/license-CC--BY--SA--4.0-blue.svg)](./LICENSE.txt)
[![Gemnasium](https://img.shields.io/gemnasium/evansosenko/evansosenko.github.io.svg)](https://gemnasium.com/evansosenko/evansosenko.github.io)
[![Travis](https://img.shields.io/travis/evansosenko/evansosenko.github.io.svg)](https://travis-ci.org/evansosenko/evansosenko.github.io)

## Description

Personal site and blog of Evan Sosenko:
Ph.D. physics student, developer, gamer, and tinkerer.

## Quickstart

```
$ git clone https://github.com/evansosenko/evansosenko.github.io.git
$ cd evansosenko.github.io
$ bundle
$ npm install
$ rake dev
```

Start a LiveReload server in a separate terminal with

```
$ guard
```

Navigate to [http://localhost:4000](http://localhost:4000/).

## Development

### Source Code

The [evansosenko.com source] is hosted on GitHub.
Clone the project with

```
$ git clone https://github.com/evansosenko/evansosenko.github.io.git
```

[evansosenko.com source]: https://github.com/evansosenko/evansosenko.github.io

### Requirements

You will need [Ruby] with [Bundler] and [Node.js] with [npm].

Install the development and Bower dependencies with

```
$ bundle
$ npm install
```

[Bundler]: http://bundler.io/
[Node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[Ruby]: https://www.ruby-lang.org/

#### Updating requirements

Requirements are version-locked to ensure consistent deploys.

To use the newest allowed Ruby gems,
or after updating any gem versions in the `Gemfile`,
update and stage `Gemfile.lock` with

```
$ bundle update
$ git add Gemfile.lock
```

To use the newest allowed Node packages,
or after updating any package versions in `package.json`,
update and stage `npm-shrinkwrap.json` with

```
$ npm update
$ npm shrinkwrap --dev
$ git add npm-shrinkwrap.json
```

All Bower components must be set to an explicit version
in `bower.json` (Bower does not support lock-files).
They are installed via an npm install hook.
Install or update them manually with

```
$ npm run bower
```

### Rake

Run `$ rake -T` to see all Rake tasks.

```
rake build             # Generate and test a production build of the Jekyll site
rake clean             # Remove build files with jekyll clean
rake default           # Default task
rake dev               # Start a local Jekyll development server
rake scss_lint[files]  # Run `scss-lint src/_assets/stylesheets [files...]`
rake standard[file]    # Lint JavaScript against the JavaScript Standard Style
```

### LiveReload

LiveReload automatically updates the page in your browser
when `dist/` files change.
Start the livereload server in the background with

```
$ guard
```

## Other Features

### Modernizr

Modernizr is included as an npm package.
[Configure modernizr] with `modernizr-config.json`.

Modernizr will automatically generate
`src/_assets/javascripts/vendor/modernizr.js`
via an npm postinstall hook.
Regenerate `modernizr.js` manually with

```
$ npm run modernizr
```

If Guard is running, then `modernizr.js` will be regeneraed
automatically whenever `modernizr-config.json` changes.

[Configure modernizr]: https://modernizr.com/download#setclasses

### Meta Tags

Meta tags are included from `src/_includes/meta.html`.
Global default values for meta tags are defined in `src/_data/meta.yml`.
A missing value will not generate the corresponding meta tags.

Meta tags defined by the [Open Graph] protocol are generated
where possible, and meta tags for [Twitter Cards] are generated
from values under `site.data.meta.twitter` and `page.meta.twitter`.

Pages can override individual values in their front matter
by defining them within their own `meta` key,
or according to the following rules.

- All pages should specify a unique, `title` in their front matter,
  but `site.data.meta.title` may be used as a default.
  If `page.meta.title` exists, it will override `page.title`.
- The page's description will prioritize in the following order:
  `page.meta.description`, `page.preview`, `page.excerpt`,
  and `site.data.meta.description`.
- The page's updated time will prioritize in the following order:
  `page.meta.updated`, `page.date`, and `site.time`.
- Keywords are merged with the following priority:
  `page.meta.keywords`, `page.tags`, `page.categories`,
  and `site.data.meta.keywords`.
- The `image` meta tag has two modes:
  if `site.data.meta.image_asset` is given, it will be used as
  `{{ site.data.meta.image_asset | asset_path }}`; but if
  `site.data.meta.image` is given, then it will take priority and be used as
  `{{ site.url }}{{ site.baseurl }}/{{ site.data.meta.image }}`.
  The page-specific tags behave the same.
- The `audio` meta tag is page-specific only and used as
  `{{ site.url }}{{ site.baseurl }}/{{ site.data.meta.audio }}`.
- The `video` meta tag is page-specific and has two modes:
  if `page.meta.youtube` is given, it will be used as
  `https://www.youtube.com/v/{{ page.meta.youtube }}`; but if
  `page.meta.video` is given, then it will take priority and be used as
  `{{ site.url }}{{ site.baseurl }}/{{ page.meta.video }}`.
- The following properties are global and have no page-specific value:
  `name` and `twitter.site`.
- The following properties are page-specific and have no global value:
  `title`, `determiner`, `type`, `audio`, and `video`.

[Open Graph]: http://ogp.me/
[Twitter Cards]: https://dev.twitter.com/cards/

### HTMLMinifier

Minify all `.html` files in the `dist` directory with

```
$ npm run minify
```

### Deploy to GitHub Pages

Deploy the `dist` directory to GitHub Pages with

```
$ npm run deploy
```

This will minify the HTML before deployment.
Deploy the `dist` directory as-is with

```
$ npm run gh-pages
```

If `SOURCE_BRANCH` is set as a Travis CI environment variable,
then commits pushed to that branch will be deployed automatically.
This requires `.travis/deploy.key.enc` to be encrypted on Travis,
the corresponding decryption command in `.travis/deploy.sh`, and
the corresponding public key added as a deploy key to the GitHub repository.

## Contributing

Please submit and comment on bug reports and feature requests.

To submit a patch:

1. Fork it (https://github.com/evansosenko/evansosenko.github.io/fork).
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Make changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create a new Pull Request.

## License

<a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">evansosenko.com</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://evansosenko.com/" property="cc:attributionName" rel="cc:attributionURL">Evan Sosenko</a> is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/evansosenko/evansosenko.github.io" rel="dct:source">https://github.com/evansosenko/evansosenko.github.io</a>.

Some code and content may be licensed under other terms where noted.

### Acknowledgments

This site is based on [makenew/jekyll-site].
Front end third-party libraries are listed in [`humans.txt`](src/humans.txt).
All other libraries are listed in
[`Gemfile`](./Gemfile), [`package.json`](./package.json),
and [`bower.json`](./bower.json).

[makenew/jekyll-site]: https://github.com/makenew/jekyll-site

## Warranty

This software is provided "as is" and without any express or
implied warranties, including, without limitation, the implied
warranties of merchantibility and fitness for a particular
purpose.
