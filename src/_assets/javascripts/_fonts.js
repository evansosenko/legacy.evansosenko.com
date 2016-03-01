/* global WebFont */

'use strict'

WebFont.load({
  custom: {
    families: [
      'Monoid Regular', 'Monoid Bold', 'Monoid Italic'
    ],
    urls: [
      '{% asset_path vendor/monoid %}'
    ]
  }
})
