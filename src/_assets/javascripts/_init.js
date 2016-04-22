/* global FastClick, Headroom */

'use strict'

// FastClick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

// Headroom.js
var headerEl = document.getElementById('header')
if (headerEl) {
  new Headroom(headerEl, {
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
}
