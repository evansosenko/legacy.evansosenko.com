//= require prism

(function () {
  'use strict'

  function init () {
    window.Prism.highlightAll()
  }

  if (document.readyState !== 'loading') {
    init()
  } else {
    document.addEventListener('DOMContentLoaded', init)
  }
})()
