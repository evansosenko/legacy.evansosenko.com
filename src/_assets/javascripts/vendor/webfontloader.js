'use strict'

;(function (d) {
  var el = d.createElement('script')
  var s = d.scripts[0]
  el.async = 1
  el.src = '{% asset_path webfontloader/webfontloader %}'
  s.parentNode.insertBefore(el, s)
})(document)
