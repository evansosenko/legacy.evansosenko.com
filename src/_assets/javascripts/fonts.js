/* global WebFont */

'use strict'

WebFont.load({
  google: {
    families: [
      'Noto Sans',
      'Material Icons'
    ]
  },
  custom: {
    families: [
      '{{ site.data.vendor.material-design-iconic-font.family }}'
    ],
    urls: [
      '{{ site.data.vendor.material-design-iconic-font.src | remove: " " }}'
    ]
  }
})
