/* global WebFont */

'use strict'

WebFont.load({
  custom: {
    families: [
      '{{ site.data.vendor.monoid.families | join:"', '" }}',
      '{{ site.data.vendor.zmdi.families | join:"', '" }}',
      '{{ site.data.vendor.katex.families | join:"', '" }}'
    ],
    urls: [
      '{% asset_path vendor/monoid %}',
      '{{ site.data.vendor.zmdi.src }}',
      '{{ site.data.vendor.katex.src }}'
    ]
  }
})
