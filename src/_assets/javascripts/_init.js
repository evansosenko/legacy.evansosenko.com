/* global FastClick */

'use strict'

// FastClick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

// Service Worker Events
(function () {
  var swEl = document.getElementById('service-worker')

  if (!swEl) { return null }

  swEl.addEventListener('service-worker-installed', function () {
    document.getElementById('toast-service-worker').open()
  })
})();

// Headroom.js
(function () {
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
  })
  .init()
})()
