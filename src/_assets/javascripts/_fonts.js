'use strict'

window.WebFontConfig = {
  google: {
    families: [
      'Noto Sans',
      'Noto Serif',
      'Inconsolata'
    ]
  },
  custom: {
    families: [
      '{{ site.data.vendor.overpass.families | join:"', '" }}',
      '{{ site.data.vendor.monoid.families | join:"', '" }}',
      '{{ site.data.vendor.zmdi.families | join:"', '" }}'
    ],
    urls: [
      '{{ site.data.vendor.overpass.src }}',
      '{% asset_path vendor/monoid %}',
      '{{ site.data.vendor.zmdi.src }}'
    ]
  }
}
