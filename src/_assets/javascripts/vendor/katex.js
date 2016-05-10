//= require katex
//= require katex/dist/contrib/auto-render.min

(function () {
  'use strict'

  function init () {
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
  }

  if (document.readyState !== 'loading') {
    init()
  } else {
    document.addEventListener('DOMContentLoaded', init)
  }
})()
