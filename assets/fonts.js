'use strict'

window.WebFontConfig = {
  google: {
    families: [
      'Noto+Sans:400,400italic,700,700italic:latin',
      'Inconsolata:400,700:latin'
    ]
  },
  custom: {
    families: [
      'Overpass',
      'Monoid Regular', 'Monoid Bold', 'Monoid Italic',
      'Material-Design-Iconic-Font'
    ],
    urls: [
      '/assets/vendor/overpass.css',
      '/assets/vendor/monoid.css',
      'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css'
    ]
  }
}
