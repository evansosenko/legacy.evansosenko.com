//= require katex
//= require katex/dist/contrib/auto-render.min

/* global renderMathInElement, WebFont */

'use strict'

document.addEventListener('DOMContentLoaded', function () {
  WebFont.load({
    custom: {
      families: [
        '{{ site.data.vendor.katex.families | join:"', '" }}'
      ],
      urls: [
        '{{ site.data.vendor.katex.src }}'
      ]
    }
  })

  renderMathInElement(document.body)
})
