//= require console-polyfill
//= require fastclick
//= require webfontloader/webfontloader
//= require vendor/disqus
//= require _init
//= require _fonts

/* global ga */

'use strict'

{% if jekyll.environment == 'production' %}
  ga('create', '{{ site.data.vendor.google.analytics.id }}', 'auto')
  ga('send', 'pageview')
{% endif %}
