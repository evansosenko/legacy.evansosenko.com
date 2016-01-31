/* global WebFont */


'use strict'

WebFont.load({
  google: {
    families: [
      'Noto Sans'
    ]
  },
  custom: {
    families: [
      'Material-Design-Iconic-Font',
      'Monoid Regular', 'Monoid Bold', 'Monoid Italic',
      'Overpass'
    ],
    urls: [
      'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css',
      '/assets/vendor/monoid.css',
      '/assets/vendor/overpass.css'
    ]
  }
})
