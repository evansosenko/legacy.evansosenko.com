//= require katex
//= require katex/dist/contrib/auto-render.min

'use strict'

document.addEventListener('DOMContentLoaded', function () {
  window.WebFont.load({
    custom: {
      families: [
        '{{ site.data.vendor.katex.families | join:"', '" }}'
      ],
      urls: [
        '{{ site.data.vendor.katex.src }}'
      ]
    }
  })

  window.renderMathInElement(document.body)
})
