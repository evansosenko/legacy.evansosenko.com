//= require katex
//= require katex/dist/contrib/auto-render.min

'use strict'

;(function (window, document) {
  function init () {
    window.renderMathInElement(document.body)
  }

  if (document.readyState !== 'loading') {
    init()
  } else {
    document.addEventListener('DOMContentLoaded', init)
  }
})(window, document)
