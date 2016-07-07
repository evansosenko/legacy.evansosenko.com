//= require gist-async/js/gist-async.min

'use strict'

;(function (window, document) {
  function init () {
    window.gistAsync()
  }

  if (document.readyState !== 'loading') {
    init()
  } else {
    document.addEventListener('DOMContentLoaded', init)
  }
})(window, document)
