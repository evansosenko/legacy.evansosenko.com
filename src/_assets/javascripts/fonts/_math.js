'use strict'

window.WebFontConfig.custom.families.push(
  '{{ site.data.vendor.katex.families | join:"', '" }}'
)

window.WebFontConfig.custom.urls.push(
  '{{ site.data.vendor.katex.src }}'
)
