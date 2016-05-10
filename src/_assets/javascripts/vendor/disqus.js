'use strict'

window.disqus_config = function () {
{% if jekyll.environment == 'production' %}
  this.page.url = '{{ site.url }}{{ site.basename }}{{ page.url }}'
{% endif %}
  this.page.identifier = '{{ page.url }}'
}

{% if jekyll.environment == 'production' %}
  {% assign shortname = site.data.vendor.disqus.shortname %}
{% else %}
  {% assign shortname = site.data.vendor.disqus.devshortname %}
{% endif %}

;(function (d) {
  var el = d.createElement('script')
  var s = d.scripts[0]
  el.async = 1
  el.src = 'https://{{ shortname }}.{{ site.data.vendor.disqus.src }}'
  s.parentNode.insertBefore(el, s)
  s.setAttribute('data-timestamp', +new Date());
})(document)
