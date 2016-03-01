/* global WebFont */

'use strict'

WebFont.load({
  custom: {
    families: [
      'Monoid Regular', 'Monoid Bold', 'Monoid Italic',
      'KaTeX_AMS', 'KaTeX_Caligraphic', 'KaTeX_Caligraphic', 'KaTeX_Fraktur',
      'KaTeX_Fraktur', 'KaTeX_Main', 'KaTeX_Main', 'KaTeX_Main', 'KaTeX_Math',
      'KaTeX_Math', 'KaTeX_Math', 'KaTeX_SansSerif', 'KaTeX_SansSerif',
      'KaTeX_SansSerif', 'KaTeX_Script', 'KaTeX_Size1', 'KaTeX_Size2',
      'KaTeX_Size3', 'KaTeX_Size4', 'KaTeX_Typewriter'
    ],
    urls: [
      '{% asset_path vendor/monoid %}',
      '{{ site.data.vendor.katex.src }}'
    ]
  }
})
