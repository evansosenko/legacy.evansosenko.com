//= require prism

'use strict'

;(function (window, document) {
  function init () {
    window.Prism.highlightAll()
  }

  if (document.readyState !== 'loading') {
    init()
  } else {
    document.addEventListener('DOMContentLoaded', init)
  }
})(window, document)
