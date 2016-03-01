var disqus_config = function () {
  {% if jekyll.environment == 'production' %}
    this.page.url = '{{ site.url }}{{ site.basename }}{{ page.url }}'
  {% endif %}
  this.page.identifier = '{{ page.url }}'
}
