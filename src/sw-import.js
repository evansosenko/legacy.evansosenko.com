---
layout: ~
---
// Chain-loads the following files:
// {% asset_path platinum-sw/bootstrap/offline-analytics.js %}
// {% asset_path platinum-sw/bootstrap/simple-db.js %}
// {% asset_path platinum-sw/bootstrap/sw-toolbox-setup.js %}
// {% asset_path sw-toolbox/sw-toolbox.js %}
// {% asset_path sw-toolbox/sw-toolbox.map.json %}

importScripts('{% asset_path platinum-sw/service-worker.js %}')
