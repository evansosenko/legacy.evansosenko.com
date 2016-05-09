/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
!function(t){function o(){t.simpleDB.open(c).then(function(o){o.forEach(function(n,e){var c=Date.now()-e,i=n+"&qt="+c;console.log("About to replay:",i),t.fetch(i).then(function(t){return t.status>=500?Response.error():void o["delete"](n)})["catch"](function(){c>r&&o["delete"](n)})})})}function n(o){t.simpleDB.open(c).then(function(t){t.set(o.url,Date.now())})}function e(o){return t.fetch(o).then(function(t){return t.status>=500?Response.error():t})["catch"](function(){n(o)})}var c="offline-analytics",r=864e5,i=/https?:\/\/((www|ssl)\.)?google-analytics\.com/;t.toolbox.router.get("/collect",e,{origin:i}),t.toolbox.router.get("/analytics.js",t.toolbox.networkFirst,{origin:i}),o()}(self);