"use strict";var precacheConfig=[["165316a16ddb827df77546ccfa045065.png","165316a16ddb827df77546ccfa045065"],["1f2eb0929126273f4af7ee05aea65686.png","1f2eb0929126273f4af7ee05aea65686"],["41d0ed0683435781edf61ff99249ec12.png","41d0ed0683435781edf61ff99249ec12"],["4bdc7d1788807ec4f5862ff549ca83a3.jpg","4bdc7d1788807ec4f5862ff549ca83a3"],["82200ac02f4c607447224f90931ad0fc.png","82200ac02f4c607447224f90931ad0fc"],["8871d567325429245955f7859fbebfbe.svg","8871d567325429245955f7859fbebfbe"],["8a40da36937fc53be2d368646693ee81.png","8a40da36937fc53be2d368646693ee81"],["bundle.js","22021dd2d67fceed15d578bb58b35c03"],["cd4c3b9ab846276a3a3a1c6aa5661ab4.svg","cd4c3b9ab846276a3a3a1c6aa5661ab4"],["index.html","3c2df1a65835c54a43b041aa0aef14b6"],["main.css","2a52a1216eadaeda21bd288a2618f7fe"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,n,t,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],a=new URL(n,self.location),r=createCacheKey(a,hashParamName,t,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var a=new Request(t,{credentials:"same-origin"});return fetch(a).then(function(n){if(!n.ok)throw new Error("Request for "+t+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(t,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!n.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(n=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),n=urlsToCacheKeys.has(t));!n&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(t=new URL("/index.html",self.location).toString(),n=urlsToCacheKeys.has(t)),n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}});