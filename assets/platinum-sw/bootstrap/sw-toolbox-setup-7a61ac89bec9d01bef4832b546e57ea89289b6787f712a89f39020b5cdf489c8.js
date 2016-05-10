/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
!function(e){var o=new URL("../sw-toolbox/sw-toolbox-395835b36bbc5792f661bf1d461cf670f580f3ca6e552aea867881abe6dfa9f3.js",e.params.get("baseURI")).href;importScripts(o);var r=e.params.get("cacheId");if(r&&(e.toolbox.options.cacheName=r+"$$$"+e.registration.scope),e.params.has("defaultCacheStrategy")){var a=e.params.get("defaultCacheStrategy");e.toolbox.router["default"]=e.toolbox[a]||e[a]}var t;if(t=e.params.has("precacheFingerprint")&&e.params.has("cacheConfigFile")?e.fetch(e.params.get("cacheConfigFile")).then(function(e){return e.json()}).then(function(e){return e.precache||[]})["catch"](function(){return[]}).then(function(o){return o.concat(e.params.get("precache"))}):Promise.resolve(e.params.get("precache")||[]),e.toolbox.precache(t),e.params.has("route"))for(var c=e.params.get("route");c.length>0;){var n,s=c.splice(0,3);s[2]&&(n={origin:new RegExp(s[2])});var i=e.toolbox[s[1]]||e[s[1]];"function"==typeof i?e.toolbox.router.get(s[0],i,n):console.error("Unable to register sw-toolbox route: ",s)}}(self);