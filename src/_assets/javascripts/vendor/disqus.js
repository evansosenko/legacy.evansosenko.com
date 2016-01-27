{% if jekyll.environment == 'production' %}
  {% assign shortname = site.data.vendor.disqus.shortname %}
{% else %}
  {% assign shortname = site.data.vendor.disqus.devshortname %}
{% endif %}

(function() {
  var d = document, s = d.createElement('script');
  s.src = 'https://{{ shortname }}.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();
