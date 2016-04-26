Polymer({is:"platinum-sw-register",_version:"1.0",properties:{autoRegister:{type:Boolean,value:!1},baseUri:{type:String,value:document._currentScript?document._currentScript.baseURI:document.currentScript?document.currentScript.baseURI:"./"},clientsClaim:{type:Boolean,value:!1},href:{type:String,value:"sw-import.js"},reloadOnInstall:{type:Boolean,value:!1},scope:{type:String,value:null},skipWaiting:{type:Boolean,value:!1},state:{notify:!0,readOnly:!0,type:String}},register:function(){"serviceWorker"in navigator?this._constructServiceWorkerUrl().then(function(e){this._registerServiceWorker(e)}.bind(this)):(this._setState("unsupported"),this.fire("service-worker-error","Service workers are not available in the current browser."))},_constructServiceWorkerUrl:function(){for(var e=[],t=Polymer.dom(this).children,i=new URL(this.baseUri,window.location.href),n=0;n<t.length;n++)"function"==typeof t[n]._getParameters&&e.push(t[n]._getParameters(i));return Promise.all(e).then(function(e){var t={baseURI:i,version:this._version};return e.forEach(function(e){Object.keys(e).forEach(function(i){Array.isArray(t[i])?t[i]=t[i].concat(e[i]):t[i]=[].concat(e[i])})}),t}.bind(this)).then(function(e){e.importscriptLate&&(e.importscript?e.importscript=e.importscript.concat(e.importscriptLate):e.importscript=e.importscriptLate),e.importscript&&(e.importscript=this._unique(e.importscript)),delete e.importscriptLate,e.clientsClaim=this.clientsClaim,e.skipWaiting=this.skipWaiting;var t=new URL(this.href,window.location);return t.search=this._serializeUrlParams(e),t}.bind(this))},_unique:function(e){return e.filter(function(t,i){return e.indexOf(t)===i})},_serializeUrlParams:function(e){return Object.keys(e).sort().map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])}).join("&")},_registerServiceWorker:function(e){var t=this.scope?{scope:this.scope}:null;navigator.serviceWorker.register(e,t).then(function(e){e.active&&this._setState("installed"),e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){switch(t.state){case"installed":navigator.serviceWorker.controller?(this._setState("updated"),this.fire("service-worker-updated","A new service worker was installed, replacing the old service worker.")):this.reloadOnInstall?window.location.reload():(this._setState("installed"),this.fire("service-worker-installed","A new service worker was installed."));break;case"redundant":this._setState("error"),this.fire("service-worker-error","The installing service worker became redundant.")}}.bind(this)}.bind(this)}.bind(this))["catch"](function(t){if(this._setState("error"),this.fire("service-worker-error",t.toString()),"NetworkError"===t.name){var i=e.origin+e.pathname;console.error("A valid service worker script was not found at "+i+"\nTo learn how to fix this, please see\nhttps://github.com/PolymerElements/platinum-sw#top-level-sw-importjs")}}.bind(this))},attached:function(){this.autoRegister&&this.async(this.register)}}),Polymer({is:"platinum-sw-cache",properties:{cacheConfigFile:String,cacheId:String,defaultCacheStrategy:{type:String,value:"networkFirst"},disabled:{type:Boolean,value:!1},precache:{type:Array,value:function(){return[]}}},_getParameters:function(e){return new Promise(function(t){var i={importscriptLate:new URL("bootstrap/sw-toolbox-setup.js",e).href,defaultCacheStrategy:this.defaultCacheStrategy,precache:this.precache};this.cacheConfigFile?(i.cacheConfigFile=this.cacheConfigFile,window.fetch(this.cacheConfigFile).then(function(e){if(!e.ok)throw Error("unable to load "+this.cacheConfigFile);return e.json()}.bind(this)).then(function(e){this.disabled=e.disabled,this.disabled?i={}:(e.precacheFingerprint?i.precacheFingerprint=e.precacheFingerprint:i.precache=i.precache.concat(e.precache),i.cacheId=e.cacheId||i.cacheId,i.defaultCacheStrategy=e.defaultCacheStrategy||i.defaultCacheStrategy)}.bind(this))["catch"](function(e){console.info("Skipping precaching: "+e.message)}).then(function(){t(i)})):t(i)}.bind(this))}}),Polymer({is:"platinum-sw-offline-analytics",_getParameters:function(e){return Promise.resolve({importscript:new URL("bootstrap/simple-db.js",e).href,importscriptLate:[new URL("bootstrap/sw-toolbox-setup.js",e).href,new URL("bootstrap/offline-analytics.js",e).href]})}}),function(){"use strict";Polymer.IronA11yAnnouncer=Polymer({is:"iron-a11y-announcer",properties:{mode:{type:String,value:"polite"},_text:{type:String,value:""}},created:function(){Polymer.IronA11yAnnouncer.instance||(Polymer.IronA11yAnnouncer.instance=this),document.body.addEventListener("iron-announce",this._onIronAnnounce.bind(this))},announce:function(e){this._text="",this.async(function(){this._text=e},100)},_onIronAnnounce:function(e){e.detail&&e.detail.text&&this.announce(e.detail.text)}}),Polymer.IronA11yAnnouncer.instance=null,Polymer.IronA11yAnnouncer.requestAvailability=function(){Polymer.IronA11yAnnouncer.instance||(Polymer.IronA11yAnnouncer.instance=document.createElement("iron-a11y-announcer")),document.body.appendChild(Polymer.IronA11yAnnouncer.instance)}}(),Polymer.IronFitBehavior={properties:{sizingTarget:{type:Object,value:function(){return this}},fitInto:{type:Object,value:window},autoFitOnAttach:{type:Boolean,value:!1},_fitInfo:{type:Object}},get _fitWidth(){var e;return e=this.fitInto===window?this.fitInto.innerWidth:this.fitInto.getBoundingClientRect().width},get _fitHeight(){var e;return e=this.fitInto===window?this.fitInto.innerHeight:this.fitInto.getBoundingClientRect().height},get _fitLeft(){var e;return e=this.fitInto===window?0:this.fitInto.getBoundingClientRect().left},get _fitTop(){var e;return e=this.fitInto===window?0:this.fitInto.getBoundingClientRect().top},attached:function(){this.autoFitOnAttach&&("none"===window.getComputedStyle(this).display?setTimeout(function(){this.fit()}.bind(this)):this.fit())},fit:function(){this._discoverInfo(),this.constrain(),this.center()},_discoverInfo:function(){if(!this._fitInfo){var e=window.getComputedStyle(this),t=window.getComputedStyle(this.sizingTarget);this._fitInfo={inlineStyle:{top:this.style.top||"",left:this.style.left||""},positionedBy:{vertically:"auto"!==e.top?"top":"auto"!==e.bottom?"bottom":null,horizontally:"auto"!==e.left?"left":"auto"!==e.right?"right":null,css:e.position},sizedBy:{height:"none"!==t.maxHeight,width:"none"!==t.maxWidth},margin:{top:parseInt(e.marginTop,10)||0,right:parseInt(e.marginRight,10)||0,bottom:parseInt(e.marginBottom,10)||0,left:parseInt(e.marginLeft,10)||0}}}},resetFit:function(){this._fitInfo&&this._fitInfo.sizedBy.width||(this.sizingTarget.style.maxWidth=""),this._fitInfo&&this._fitInfo.sizedBy.height||(this.sizingTarget.style.maxHeight=""),this.style.top=this._fitInfo?this._fitInfo.inlineStyle.top:"",this.style.left=this._fitInfo?this._fitInfo.inlineStyle.left:"",this._fitInfo&&(this.style.position=this._fitInfo.positionedBy.css),this._fitInfo=null},refit:function(){this.resetFit(),this.fit()},constrain:function(){var e=this._fitInfo;this._fitInfo.positionedBy.vertically||(this.style.top="0px"),this._fitInfo.positionedBy.horizontally||(this.style.left="0px"),this._fitInfo.positionedBy.vertically&&this._fitInfo.positionedBy.horizontally||(this.style.position="fixed"),this.sizingTarget.style.boxSizing="border-box";var t=this.getBoundingClientRect();e.sizedBy.height||this._sizeDimension(t,e.positionedBy.vertically,"top","bottom","Height"),e.sizedBy.width||this._sizeDimension(t,e.positionedBy.horizontally,"left","right","Width")},_sizeDimension:function(e,t,i,n,o){var s=this._fitInfo,r="Width"===o?this._fitWidth:this._fitHeight,a=t===n,h=a?r-e[n]:e[i],l=s.margin[a?i:n],c="offset"+o,d=this[c]-this.sizingTarget[c];this.sizingTarget.style["max"+o]=r-l-h-d+"px"},center:function(){var e=this._fitInfo.positionedBy;if(!e.vertically||!e.horizontally){this.style.position="fixed",e.vertically||(this.style.top="0px"),e.horizontally||(this.style.left="0px");var t=this.getBoundingClientRect();if(!e.vertically){var i=this._fitTop-t.top+(this._fitHeight-t.height)/2;this.style.top=i+"px"}if(!e.horizontally){var n=this._fitLeft-t.left+(this._fitWidth-t.width)/2;this.style.left=n+"px"}}}},Polymer.IronResizableBehavior={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:!1}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[],this._boundNotifyResize=this.notifyResize.bind(this)},attached:function(){this.fire("iron-request-resize-notifications",null,{node:this,bubbles:!0,cancelable:!0}),this._parentResizable||(window.addEventListener("resize",this._boundNotifyResize),this.notifyResize())},detached:function(){this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):window.removeEventListener("resize",this._boundNotifyResize),this._parentResizable=null},notifyResize:function(){this.isAttached&&(this._interestedResizables.forEach(function(e){this.resizerShouldNotify(e)&&this._notifyDescendant(e)},this),this._fireResize())},assignParentResizable:function(e){this._parentResizable=e},stopResizeNotificationsFor:function(e){var t=this._interestedResizables.indexOf(e);t>-1&&(this._interestedResizables.splice(t,1),this.unlisten(e,"iron-resize","_onDescendantIronResize"))},resizerShouldNotify:function(e){return!0},_onDescendantIronResize:function(e){return this._notifyingDescendant?void e.stopPropagation():void(Polymer.Settings.useShadow||this._fireResize())},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:!1})},_onIronRequestResizeNotifications:function(e){var t=e.path?e.path[0]:e.target;t!==this&&(-1===this._interestedResizables.indexOf(t)&&(this._interestedResizables.push(t),this.listen(t,"iron-resize","_onDescendantIronResize")),t.assignParentResizable(this),this._notifyDescendant(t),e.stopPropagation())},_parentResizableChanged:function(e){e&&window.removeEventListener("resize",this._boundNotifyResize)},_notifyDescendant:function(e){this.isAttached&&(this._notifyingDescendant=!0,e.notifyResize(),this._notifyingDescendant=!1)}},function(){"use strict";function e(e,t){var i="";if(e){var n=e.toLowerCase();" "===n||p.test(n)?i="space":y.test(n)?i="esc":1==n.length?t&&!c.test(n)||(i=n):i=u.test(n)?n.replace("arrow",""):"multiply"==n?"*":n}return i}function t(e){var t="";return e&&(e in a?t=a[e]:d.test(e)?(e=parseInt(e.replace("U+","0x"),16),t=String.fromCharCode(e).toLowerCase()):t=e.toLowerCase()),t}function i(e){var t="";return Number(e)&&(t=e>=65&&90>=e?String.fromCharCode(32+e):e>=112&&123>=e?"f"+(e-112):e>=48&&57>=e?String(e-48):e>=96&&105>=e?String(e-96):h[e]),t}function n(n,o){return e(n.key,o)||t(n.keyIdentifier)||i(n.keyCode)||e(n.detail.key,o)||""}function o(e,t){var i=n(t,e.hasModifiers);return i===e.key&&(!e.hasModifiers||!!t.shiftKey==!!e.shiftKey&&!!t.ctrlKey==!!e.ctrlKey&&!!t.altKey==!!e.altKey&&!!t.metaKey==!!e.metaKey)}function s(e){return 1===e.length?{combo:e,key:e,event:"keydown"}:e.split("+").reduce(function(e,t){var i=t.split(":"),n=i[0],o=i[1];return n in l?(e[l[n]]=!0,e.hasModifiers=!0):(e.key=n,e.event=o||"keydown"),e},{combo:e.split(":").shift()})}function r(e){return e.trim().split(" ").map(function(e){return s(e)})}var a={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"},h={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"},l={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"},c=/[a-z0-9*]/,d=/U\+/,u=/^arrow/,p=/^space(bar)?/,y=/^escape$/;Polymer.IronA11yKeysBehavior={properties:{keyEventTarget:{type:Object,value:function(){return this}},stopKeyboardEventPropagation:{type:Boolean,value:!1},_boundKeyHandlers:{type:Array,value:function(){return[]}},_imperativeKeyBindings:{type:Object,value:function(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],keyBindings:{},registered:function(){this._prepKeyBindings()},attached:function(){this._listenKeyEventListeners()},detached:function(){this._unlistenKeyEventListeners()},addOwnKeyBinding:function(e,t){this._imperativeKeyBindings[e]=t,this._prepKeyBindings(),this._resetKeyEventListeners()},removeOwnKeyBindings:function(){this._imperativeKeyBindings={},this._prepKeyBindings(),this._resetKeyEventListeners()},keyboardEventMatchesKeys:function(e,t){for(var i=r(t),n=0;n<i.length;++n)if(o(i[n],e))return!0;return!1},_collectKeyBindings:function(){var e=this.behaviors.map(function(e){return e.keyBindings});return-1===e.indexOf(this.keyBindings)&&e.push(this.keyBindings),e},_prepKeyBindings:function(){this._keyBindings={},this._collectKeyBindings().forEach(function(e){for(var t in e)this._addKeyBinding(t,e[t])},this);for(var e in this._imperativeKeyBindings)this._addKeyBinding(e,this._imperativeKeyBindings[e]);for(var t in this._keyBindings)this._keyBindings[t].sort(function(e,t){var i=e[0].hasModifiers,n=t[0].hasModifiers;return i===n?0:i?-1:1})},_addKeyBinding:function(e,t){r(e).forEach(function(e){this._keyBindings[e.event]=this._keyBindings[e.event]||[],this._keyBindings[e.event].push([e,t])},this)},_resetKeyEventListeners:function(){this._unlistenKeyEventListeners(),this.isAttached&&this._listenKeyEventListeners()},_listenKeyEventListeners:function(){Object.keys(this._keyBindings).forEach(function(e){var t=this._keyBindings[e],i=this._onKeyBindingEvent.bind(this,t);this._boundKeyHandlers.push([this.keyEventTarget,e,i]),this.keyEventTarget.addEventListener(e,i)},this)},_unlistenKeyEventListeners:function(){for(var e,t,i,n;this._boundKeyHandlers.length;)e=this._boundKeyHandlers.pop(),t=e[0],i=e[1],n=e[2],t.removeEventListener(i,n)},_onKeyBindingEvent:function(e,t){if(this.stopKeyboardEventPropagation&&t.stopPropagation(),!t.defaultPrevented)for(var i=0;i<e.length;i++){var n=e[i][0],s=e[i][1];if(o(n,t)&&(this._triggerKeyHandler(n,s,t),t.defaultPrevented))return}},_triggerKeyHandler:function(e,t,i){var n=Object.create(e);n.keyboardEvent=i;var o=new CustomEvent(e.event,{detail:n,cancelable:!0});this[t].call(this,o),o.defaultPrevented&&i.preventDefault()}}}(),Polymer.IronOverlayManagerClass=function(){this._overlays=[],this._minimumZ=101,this._backdropElement=null;var e="ontouchstart"in window?"touchstart":"mousedown";document.addEventListener(e,this._onCaptureClick.bind(this),!0),document.addEventListener("focus",this._onCaptureFocus.bind(this),!0),document.addEventListener("keydown",this._onCaptureKeyDown.bind(this),!0)},Polymer.IronOverlayManagerClass.prototype={constructor:Polymer.IronOverlayManagerClass,get backdropElement(){return this._backdropElement||(this._backdropElement=document.createElement("iron-overlay-backdrop")),this._backdropElement},get deepActiveElement(){for(var e=document.activeElement||document.body;e.root&&Polymer.dom(e.root).activeElement;)e=Polymer.dom(e.root).activeElement;return e},_bringOverlayAtIndexToFront:function(e){var t=this._overlays[e];if(t){var i=this._overlays.length-1,n=this._overlays[i];if(n&&this._shouldBeBehindOverlay(t,n)&&i--,!(e>=i)){var o=Math.max(this.currentOverlayZ(),this._minimumZ);for(this._getZ(t)<=o&&this._applyOverlayZ(t,o);i>e;)this._overlays[e]=this._overlays[e+1],e++;this._overlays[i]=t}}},addOrRemoveOverlay:function(e){e.opened?this.addOverlay(e):this.removeOverlay(e),this.trackBackdrop()},addOverlay:function(e){var t=this._overlays.indexOf(e);if(t>=0)return void this._bringOverlayAtIndexToFront(t);var i=this._overlays.length,n=this._overlays[i-1],o=Math.max(this._getZ(n),this._minimumZ),s=this._getZ(e);if(n&&this._shouldBeBehindOverlay(e,n)){this._applyOverlayZ(n,o),i--;var r=this._overlays[i-1];o=Math.max(this._getZ(r),this._minimumZ)}o>=s&&this._applyOverlayZ(e,o),this._overlays.splice(i,0,e);var a=this.deepActiveElement;e.restoreFocusNode=this._overlayParent(a)?null:a},removeOverlay:function(e){var t=this._overlays.indexOf(e);if(-1!==t){this._overlays.splice(t,1);var i=e.restoreFocusOnClose?e.restoreFocusNode:null;e.restoreFocusNode=null,i&&Polymer.dom(document.body).deepContains(i)&&i.focus()}},currentOverlay:function(){var e=this._overlays.length-1;return this._overlays[e]},currentOverlayZ:function(){return this._getZ(this.currentOverlay())},ensureMinimumZ:function(e){this._minimumZ=Math.max(this._minimumZ,e)},focusOverlay:function(){var e=this.currentOverlay();e&&!e.transitioning&&e._applyFocus()},trackBackdrop:function(){this.backdropElement.style.zIndex=this.backdropZ()},getBackdrops:function(){for(var e=[],t=0;t<this._overlays.length;t++)this._overlays[t].withBackdrop&&e.push(this._overlays[t]);return e},backdropZ:function(){return this._getZ(this._overlayWithBackdrop())-1},_overlayWithBackdrop:function(){for(var e=0;e<this._overlays.length;e++)if(this._overlays[e].withBackdrop)return this._overlays[e]},_getZ:function(e){var t=this._minimumZ;if(e){var i=Number(e.style.zIndex||window.getComputedStyle(e).zIndex);i===i&&(t=i)}return t},_setZ:function(e,t){e.style.zIndex=t},_applyOverlayZ:function(e,t){this._setZ(e,t+2)},_overlayParent:function(e){for(;e&&e!==document.body;){if(e._manager===this)return e;e=Polymer.dom(e).parentNode||e.host}},_overlayInPath:function(e){e=e||[];for(var t=0;t<e.length;t++)if(e[t]._manager===this)return e[t]},_onCaptureClick:function(e){var t=this.currentOverlay();t&&this._overlayInPath(Polymer.dom(e).path)!==t&&t._onCaptureClick(e)},_onCaptureFocus:function(e){var t=this.currentOverlay();t&&t._onCaptureFocus(e)},_onCaptureKeyDown:function(e){var t=this.currentOverlay();t&&(Polymer.IronA11yKeysBehavior.keyboardEventMatchesKeys(e,"esc")?t._onCaptureEsc(e):Polymer.IronA11yKeysBehavior.keyboardEventMatchesKeys(e,"tab")&&t._onCaptureTab(e))},_shouldBeBehindOverlay:function(e,t){var i=e,n=t;return!i.alwaysOnTop&&n.alwaysOnTop}},Polymer.IronOverlayManager=new Polymer.IronOverlayManagerClass,function(){Polymer({is:"iron-overlay-backdrop",properties:{opened:{readOnly:!0,reflectToAttribute:!0,type:Boolean,value:!1},_manager:{type:Object,value:Polymer.IronOverlayManager}},listeners:{transitionend:"_onTransitionend"},prepare:function(){this.parentNode||Polymer.dom(document.body).appendChild(this)},open:function(){this._manager.getBackdrops().length<2&&this._setOpened(!0)},close:function(){if(0===this._manager.getBackdrops().length){var e=getComputedStyle(this),t="0s"===e.transitionDuration||0==e.opacity;this._setOpened(!1),t&&this.complete()}},complete:function(){0===this._manager.getBackdrops().length&&this.parentNode&&Polymer.dom(this.parentNode).removeChild(this)},_onTransitionend:function(e){e&&e.target===this&&this.complete()}})}(),function(){"use strict";Polymer.IronOverlayBehaviorImpl={properties:{opened:{observer:"_openedChanged",type:Boolean,value:!1,notify:!0},canceled:{observer:"_canceledChanged",readOnly:!0,type:Boolean,value:!1},withBackdrop:{observer:"_withBackdropChanged",type:Boolean},noAutoFocus:{type:Boolean,value:!1},noCancelOnEscKey:{type:Boolean,value:!1},noCancelOnOutsideClick:{type:Boolean,value:!1},closingReason:{type:Object},restoreFocusOnClose:{type:Boolean,value:!1},alwaysOnTop:{type:Boolean},_manager:{type:Object,value:Polymer.IronOverlayManager},_focusedChild:{type:Object}},listeners:{"iron-resize":"_onIronResize"},get backdropElement(){return this._manager.backdropElement},get _focusNode(){return this._focusedChild||Polymer.dom(this).querySelector("[autofocus]")||this},get _focusableNodes(){var e=["a[href]","area[href]","iframe","[tabindex]","[contentEditable=true]"],t=["input","select","textarea","button"],i=e.join(':not([tabindex="-1"]),')+':not([tabindex="-1"]),'+t.join(':not([disabled]):not([tabindex="-1"]),')+':not([disabled]):not([tabindex="-1"])',n=Polymer.dom(this).querySelectorAll(i);return this.tabIndex>=0&&n.splice(0,0,this),n.sort(function(e,t){return e.tabIndex===t.tabIndex?0:0===e.tabIndex||e.tabIndex>t.tabIndex?1:-1})},ready:function(){this.__isAnimating=!1,this.__shouldRemoveTabIndex=!1,this.__firstFocusableNode=this.__lastFocusableNode=null,this.__openChangedAsync=null,this.__onIronResizeAsync=null,this._ensureSetup()},attached:function(){this.opened&&this._openedChanged(),this._observer=Polymer.dom(this).observeNodes(this._onNodesChange)},detached:function(){Polymer.dom(this).unobserveNodes(this._observer),this._observer=null,this.opened=!1,this.withBackdrop&&this.backdropElement.close()},toggle:function(){this._setCanceled(!1),this.opened=!this.opened},open:function(){this._setCanceled(!1),this.opened=!0},close:function(){this._setCanceled(!1),this.opened=!1},cancel:function(e){var t=this.fire("iron-overlay-canceled",e,{cancelable:!0});t.defaultPrevented||(this._setCanceled(!0),this.opened=!1)},_ensureSetup:function(){this._overlaySetup||(this._overlaySetup=!0,this.style.outline="none",this.style.display="none")},_openedChanged:function(){this.opened?this.removeAttribute("aria-hidden"):this.setAttribute("aria-hidden","true"),this._overlaySetup&&(this._manager.addOrRemoveOverlay(this),this.__isAnimating=!0,this.__openChangedAsync&&window.cancelAnimationFrame(this.__openChangedAsync),this.opened?(this.withBackdrop&&this.backdropElement.prepare(),this.__openChangedAsync=window.requestAnimationFrame(function(){this.__openChangedAsync=null,this._prepareRenderOpened(),this._renderOpened()}.bind(this))):this._renderClosed())},_canceledChanged:function(){this.closingReason=this.closingReason||{},this.closingReason.canceled=this.canceled},_withBackdropChanged:function(){this.withBackdrop&&!this.hasAttribute("tabindex")?(this.setAttribute("tabindex","-1"),this.__shouldRemoveTabIndex=!0):this.__shouldRemoveTabIndex&&(this.removeAttribute("tabindex"),this.__shouldRemoveTabIndex=!1),this.opened&&(this._manager.trackBackdrop(),this.withBackdrop?(this.backdropElement.prepare(),this.async(function(){this.backdropElement.open()},1)):this.backdropElement.close())},_prepareRenderOpened:function(){this._preparePositioning(),this.refit(),this._finishPositioning(),this.noAutoFocus&&document.activeElement===this._focusNode&&this._focusNode.blur()},_renderOpened:function(){this.withBackdrop&&this.backdropElement.open(),this._finishRenderOpened()},_renderClosed:function(){this.withBackdrop&&this.backdropElement.close(),this._finishRenderClosed()},_finishRenderOpened:function(){this._applyFocus(),this.notifyResize(),this.__isAnimating=!1,this.fire("iron-overlay-opened")},_finishRenderClosed:function(){this.style.display="none",this.style.zIndex="",this._applyFocus(),this.notifyResize(),this.__isAnimating=!1,this.fire("iron-overlay-closed",this.closingReason)},_preparePositioning:function(){this.style.transition=this.style.webkitTransition="none",this.style.transform=this.style.webkitTransform="none",this.style.display=""},_finishPositioning:function(){this.style.display="none",this.scrollTop=this.scrollTop,this.style.transition=this.style.webkitTransition="",this.style.transform=this.style.webkitTransform="",this.style.display="",this.scrollTop=this.scrollTop},_applyFocus:function(){this.opened?this.noAutoFocus||this._focusNode.focus():(this._focusNode.blur(),this._focusedChild=null,this._manager.focusOverlay())},_onCaptureClick:function(e){this.noCancelOnOutsideClick||this.cancel(e)},_onCaptureFocus:function(e){if(this.withBackdrop){var t=Polymer.dom(e).path;-1===t.indexOf(this)?(e.stopPropagation(),this._applyFocus()):this._focusedChild=t[0]}},_onCaptureEsc:function(e){this.noCancelOnEscKey||this.cancel(e)},_onCaptureTab:function(e){var t=e.shiftKey,i=t?this.__firstFocusableNode:this.__lastFocusableNode,n=t?this.__lastFocusableNode:this.__firstFocusableNode;this.withBackdrop&&this._focusedChild===i&&(this._focusedChild=n)},_onIronResize:function(){this.__onIronResizeAsync&&(window.cancelAnimationFrame(this.__onIronResizeAsync),this.__onIronResizeAsync=null),this.opened&&!this.__isAnimating&&(this.__onIronResizeAsync=window.requestAnimationFrame(function(){this.__onIronResizeAsync=null,this.refit()}.bind(this)))},_onNodesChange:function(){this.opened&&!this.__isAnimating&&this.notifyResize();var e=this._focusableNodes;this.__firstFocusableNode=e[0],this.__lastFocusableNode=e[e.length-1]}},Polymer.IronOverlayBehavior=[Polymer.IronFitBehavior,Polymer.IronResizableBehavior,Polymer.IronOverlayBehaviorImpl]}(),function(){var e=null;Polymer({is:"paper-toast",behaviors:[Polymer.IronOverlayBehavior],properties:{duration:{type:Number,value:3e3},text:{type:String,value:""},noCancelOnOutsideClick:{type:Boolean,value:!0},noAutoFocus:{type:Boolean,value:!0}},listeners:{transitionend:"__onTransitionEnd"},get visible(){return console.warn("`visible` is deprecated, use `opened` instead"),this.opened},get _canAutoClose(){return this.duration>0&&this.duration!==1/0},created:function(){this._autoClose=null,Polymer.IronA11yAnnouncer.requestAvailability()},show:function(e){"string"==typeof e&&(e={text:e});for(var t in e)0===t.indexOf("_")?console.warn('The property "'+t+'" is private and was not set.'):t in this?this[t]=e[t]:console.warn('The property "'+t+'" is not valid.');this.open()},hide:function(){this.close()},center:function(){if(this.fitInto===window)this.style.bottom=this.style.left="";else{var e=this.fitInto.getBoundingClientRect();this.style.left=e.left+"px",this.style.bottom=window.innerHeight-e.bottom+"px"}},__onTransitionEnd:function(e){e&&e.target===this&&"opacity"===e.propertyName&&(this.opened?this._finishRenderOpened():this._finishRenderClosed())},_openedChanged:function(){null!==this._autoClose&&(this.cancelAsync(this._autoClose),this._autoClose=null),this.opened?(e&&e!==this&&e.close(),e=this,this.fire("iron-announce",{text:this.text}),this._canAutoClose&&(this._autoClose=this.async(this.close,this.duration))):e===this&&(e=null),Polymer.IronOverlayBehaviorImpl._openedChanged.apply(this,arguments)},_renderOpened:function(){this.classList.add("paper-toast-open")},_renderClosed:function(){this.classList.remove("paper-toast-open")},_onIronResize:function(){Polymer.IronOverlayBehaviorImpl._onIronResize.apply(this,arguments),this.opened&&(this.style.position="")}})}();