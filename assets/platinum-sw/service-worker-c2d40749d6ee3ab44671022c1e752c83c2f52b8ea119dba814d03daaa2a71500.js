/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
!function(i){function t(i){return new Map(i.split("&").map(function(i){var t=i.split("="),n=decodeURIComponent(t[0]),e=decodeURIComponent(t[1]);return e.indexOf(",")>=0&&(e=e.split(",")),[n,e]}))}var n="1.0";if(i.params=t(location.search.substring(1)),i.params.get("version")!==n)throw"The registered script is version "+n+" and cannot be used with <platinum-sw-register> version "+i.params.get("version");if(i.params.has("importscript")){var e=i.params.get("importscript");Array.isArray(e)?importScripts.apply(null,e):importScripts(e)}"true"===i.params.get("skipWaiting")&&i.skipWaiting&&i.addEventListener("install",function(t){t.waitUntil(i.skipWaiting())}),"true"===i.params.get("clientsClaim")&&i.clients&&i.clients.claim&&i.addEventListener("activate",function(t){t.waitUntil(i.clients.claim())})}(self);