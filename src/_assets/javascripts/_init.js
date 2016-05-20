'use strict'

// FastClick
;(function (window, document) {
  document.addEventListener('DOMContentLoaded', function () {
    window.FastClick.attach(document.body)
  }, false)
})(window, document)

// Service Worker Events
;(function (document) {
  var swEl = document.getElementById('service-worker')

  if (!swEl) { return null }

  swEl.addEventListener('service-worker-installed', function () {
    document.getElementById('toast-service-worker').open()
  })
})(document)

// Headroom.js
;(function (window, document) {
  document.addEventListener('DOMContentLoaded', function () {
    var headerEl = document.getElementById('header')

    if (!headerEl) { return null }

    new window.Headroom(headerEl, {
      offset: 200,
      tolerance: 15,
      classes: {
        pinned: 'is-pinned',
        unpinned: 'is-unpinned',
        top: 'is-top',
        notTop: 'is-not-top',
        bottom: 'is-bottom',
        notBottom: 'is-not-bottom'
      }
    }).init()
  })
})(window, document)
