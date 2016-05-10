# evansosenko.com

[![GitHub release](https://img.shields.io/github/release/evansosenko/evansosenko.github.io.svg)](https://github.com/evansosenko/evansosenko.github.io/releases)
[![GitHub license](https://img.shields.io/badge/license-CC--BY--SA--4.0-blue.svg)](./LICENSE.txt)
[![Gemnasium](https://img.shields.io/gemnasium/evansosenko/evansosenko.github.io.svg)](https://gemnasium.com/evansosenko/evansosenko.github.io)
[![CircleCI](https://img.shields.io/circleci/project/evansosenko/evansosenko.github.io.svg)](https://circleci.com/gh/evansosenko/evansosenko.github.io)

> Built from [makenew/jekyll-site](https://github.com/makenew/jekyll-site).

## Description

Personal site and blog of Evan Sosenko:
Physics Ph.D. candidate, developer, gamer, and tinkerer.

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
rake build    # Generate, optimize, and test a production build of the Jekyll site
rake clean    # Remove build files with jekyll clean
rake default  # Default task
rake dev      # Start a local Jekyll development server
```

### LiveReload

LiveReload automatically updates the page in your browser
when `dist/` files change.
Start the livereload server in the background with

```
$ guard
```

### gulp

Linting and deployment is handled by [gulp].

In a separate window, use gulp to watch for changes
and lint JavaScript, Sass, and HTML files with

```
$ npm run lint:watch
```

If installed globally, `gulp` may be invoked directly.
View available commands with

```
$ gulp --tasks
```

[gulp]: http://gulpjs.com/

### Vulcanized Web Components

Web components imported in `src/_assets/elements/elements.html`
will be vulcanized to `src/_assets/elements/vulcanized.html`.
Polymer is vulcanized separately to
`src/_assets/elements/polymer-vulcanized.html`.

Run vulcanize with

```
$ npm run vulcanize
```

This also copies to `dist` any files
imported directly by the service workers scripts.

If Guard is running, then the vulcanized files
will be regenerated automatically whenever other files
in `src/_assets/elements` change.

### Build Optimization

Optimize files in the `dist` directory with

```
$ npm run optimize
```

This will tailor a customized Modernizr build, run crisper,
minify any unprocessed scripts, and minify all html and image files.

### Deploy to GitHub Pages

Deploy the `dist` directory to GitHub Pages with

```
$ npm run deploy
```

Commits pushed to production or staging branches are deployed automatically.
Set the corresponding branches with the CircleCI environment variables
`PRODUCTION_BRANCH` and `STAGING_BRANCH`.
This requires a deployment key added to CircleCI.

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

If Guard is running, then `modernizr.js` will be regenerated
automatically whenever `modernizr-config.json` changes.

For the production build, the Modernizr build is generated
by [customizr] from `customizr.json`.

[Configure modernizr]: https://modernizr.com/download#setclasses
[customizr]: https://github.com/Modernizr/customizr

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

### Fonts

Fonts are loaded by [Web Font Loader] and configured in
`src/_assets/javascripts/_fonts.js`.

[Web Font Loader]: https://github.com/typekit/webfontloader

### Syntax Highlighting

Syntax highlighting is handled by [Prism]
on any page that sets `page.code` true.

Additional languages and plugins are loaded in
`src/_assets/javascripts/vendor/prism.js`.

[Prism]: https://gist.github.com/

### Math with KaTeX

Math rendering is handled automatically by [KaTeX]
on pages where `page.math` is set true.

[KaTeX]: https://khan.github.io/KaTeX/

### Gists

[Gists][Gist] may be included using the `{% gist %}` liquid tag.
They will be loaded asynchronously using [gist-async].

The Jekyll variable `page.gist` must be set `true`
on any page that includes gists.

[Gist]: https://gist.github.com/
[gist-async]: https://github.com/razor-x/gist-async

### Citations with Jekyll-Scholar

[Jekyll-Scholar] is installed and configured to use
[evansosenko/references].

[Jekyll-Scholar]: https://github.com/inukshuk/jekyll-scholar
[evansosenko/references]: https://github.com/evansosenko/references

### Comments by Disqus

To enable comments by [Disqus], set `page.comments` true.

[Disqus]: https://disqus.com/

### Google Analytics

[Google Analytics] is configured in `src/_data/vendor.yml`.

[Google Analytics]: https://www.google.com/analytics/

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

[makenew/jekyll-site]: https://github.com/makenew/jekyll-site

## Warranty

This software is provided "as is" and without any express or
implied warranties, including, without limitation, the implied
warranties of merchantibility and fitness for a particular
purpose.
