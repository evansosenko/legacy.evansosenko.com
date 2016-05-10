//= require prism

'use strict'

;(function () {
  function init () {
    window.Prism.highlightAll()
  }

  if (document.readyState !== 'loading') {
    init()
  } else {
    document.addEventListener('DOMContentLoaded', init)
  }
})()
