/* global FastClick, Headroom */

'use strict'

// FastClick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

// Headroom.js
new Headroom(document.getElementById('header'), {
  offset: 300,
  classes: {
    pinned: 'is-pinned',
    unpinned: 'is-unpinned',
    top: 'is-top',
    notTop: 'is-not-top',
    bottom: 'is-bottom',
    notBottom: 'is-not-bottom'
  }
}).init()
