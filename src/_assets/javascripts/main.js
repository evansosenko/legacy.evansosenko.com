//= require console-polyfill
//= require fastclick
//= require headroom.js/dist/headroom
//= require vendor/disqus
//= require _fonts
//= require _init

'use strict'

{% if jekyll.environment == 'production' %}
  window.ga('create', '{{ site.data.vendor.google.analytics.id }}', 'auto')
  window.ga('send', 'pageview')
{% endif %}
