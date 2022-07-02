/*! For license information please see 7.fb79dc1c.chunk.js.LICENSE.txt */
(this.webpackJsonpfossologyui=this.webpackJsonpfossologyui||[]).push([[7,1,6,15,16],{52:function(r,t,e){"use strict";e.d(t,"a",(function(){return a}));var n=e(58);function o(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function a(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?o(Object(e),!0).forEach((function(t){Object(n.a)(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):o(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}},55:function(r,t,e){var n;!function(){"use strict";var e={}.hasOwnProperty;function o(){for(var r=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var a=typeof n;if("string"===a||"number"===a)r.push(n);else if(Array.isArray(n)){if(n.length){var i=o.apply(null,n);i&&r.push(i)}}else if("object"===a)if(n.toString===Object.prototype.toString)for(var u in n)e.call(n,u)&&n[u]&&r.push(u);else r.push(n.toString())}}return r.join(" ")}r.exports?(o.default=o,r.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(r.exports=n)}()},56:function(r,t,e){"use strict";e.d(t,"a",(function(){return i}));e(4);var n=e(0),o=e.n(n),a=o.a.createContext({});a.Consumer,a.Provider;function i(r,t){var e=Object(n.useContext)(a);return r||e[t]||t}},58:function(r,t,e){"use strict";function n(r,t,e){return t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r}e.d(t,"a",(function(){return n}))},59:function(r,t,e){"use strict";var n=e(4),o=e(8),a=e(55),i=e.n(a),u=e(0),c=e.n(u),s=e(56),f=["bsPrefix","variant","animation","size","children","as","className"],l=c.a.forwardRef((function(r,t){var e=r.bsPrefix,a=r.variant,u=r.animation,l=r.size,p=r.children,y=r.as,d=void 0===y?"div":y,v=r.className,m=Object(o.a)(r,f),b=(e=Object(s.a)(e,"spinner"))+"-"+u;return c.a.createElement(d,Object(n.a)({ref:t},m,{className:i()(v,b,l&&b+"-"+l,a&&"text-"+a)}),p)}));l.displayName="Spinner",t.a=l},62:function(r,t,e){"use strict";var n=e(65).default,o=e(73).default,a=e(79).default,i=e(74).default,u=e(83),c=e(84),s=e(85),f=e(86),l=Symbol("encodeFragmentIdentifier");function p(r){if("string"!==typeof r||1!==r.length)throw new TypeError("arrayFormatSeparator must be single character string")}function y(r,t){return t.encode?t.strict?u(r):encodeURIComponent(r):r}function d(r,t){return t.decode?c(r):r}function v(r){return Array.isArray(r)?r.sort():"object"===typeof r?v(Object.keys(r)).sort((function(r,t){return Number(r)-Number(t)})).map((function(t){return r[t]})):r}function m(r){var t=r.indexOf("#");return-1!==t&&(r=r.slice(0,t)),r}function b(r){var t=(r=m(r)).indexOf("?");return-1===t?"":r.slice(t+1)}function g(r,t){return t.parseNumbers&&!Number.isNaN(Number(r))&&"string"===typeof r&&""!==r.trim()?r=Number(r):!t.parseBooleans||null===r||"true"!==r.toLowerCase()&&"false"!==r.toLowerCase()||(r="true"===r.toLowerCase()),r}function x(r,t){p((t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);var e=function(r){var t;switch(r.arrayFormat){case"index":return function(r,e,n){t=/\[(\d*)\]$/.exec(r),r=r.replace(/\[\d*\]$/,""),t?(void 0===n[r]&&(n[r]={}),n[r][t[1]]=e):n[r]=e};case"bracket":return function(r,e,n){t=/(\[\])$/.exec(r),r=r.replace(/\[\]$/,""),t?void 0!==n[r]?n[r]=[].concat(n[r],e):n[r]=[e]:n[r]=e};case"colon-list-separator":return function(r,e,n){t=/(:list)$/.exec(r),r=r.replace(/:list$/,""),t?void 0!==n[r]?n[r]=[].concat(n[r],e):n[r]=[e]:n[r]=e};case"comma":case"separator":return function(t,e,n){var o="string"===typeof e&&e.includes(r.arrayFormatSeparator),a="string"===typeof e&&!o&&d(e,r).includes(r.arrayFormatSeparator);e=a?d(e,r):e;var i=o||a?e.split(r.arrayFormatSeparator).map((function(t){return d(t,r)})):null===e?e:d(e,r);n[t]=i};case"bracket-separator":return function(t,e,n){var o=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),o){var a=null===e?[]:e.split(r.arrayFormatSeparator).map((function(t){return d(t,r)}));void 0!==n[t]?n[t]=[].concat(n[t],a):n[t]=a}else n[t]=e?d(e,r):e};default:return function(r,t,e){void 0!==e[r]?e[r]=[].concat(e[r],t):e[r]=t}}}(t),n=Object.create(null);if("string"!==typeof r)return n;if(!(r=r.trim().replace(/^[?#&]/,"")))return n;var i,u=a(r.split("&"));try{for(u.s();!(i=u.n()).done;){var c=i.value;if(""!==c){var f=s(t.decode?c.replace(/\+/g," "):c,"="),l=o(f,2),y=l[0],m=l[1];m=void 0===m?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?m:d(m,t),e(d(y,t),m,n)}}}catch(k){u.e(k)}finally{u.f()}for(var b=0,x=Object.keys(n);b<x.length;b++){var h=x[b],j=n[h];if("object"===typeof j&&null!==j)for(var O=0,w=Object.keys(j);O<w.length;O++){var S=w[O];j[S]=g(j[S],t)}else n[h]=g(j,t)}return!1===t.sort?n:(!0===t.sort?Object.keys(n).sort():Object.keys(n).sort(t.sort)).reduce((function(r,t){var e=n[t];return Boolean(e)&&"object"===typeof e&&!Array.isArray(e)?r[t]=v(e):r[t]=e,r}),Object.create(null))}t.extract=b,t.parse=x,t.stringify=function(r,t){if(!r)return"";p((t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);for(var e=function(e){return t.skipNull&&(null===(n=r[e])||void 0===n)||t.skipEmptyString&&""===r[e];var n},n=function(r){switch(r.arrayFormat){case"index":return function(t){return function(e,n){var o=e.length;return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(i(e),null===n?[[y(t,r),"[",o,"]"].join("")]:[[y(t,r),"[",y(o,r),"]=",y(n,r)].join("")])}};case"bracket":return function(t){return function(e,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(i(e),null===n?[[y(t,r),"[]"].join("")]:[[y(t,r),"[]=",y(n,r)].join("")])}};case"colon-list-separator":return function(t){return function(e,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(i(e),null===n?[[y(t,r),":list="].join("")]:[[y(t,r),":list=",y(n,r)].join("")])}};case"comma":case"separator":case"bracket-separator":var t="bracket-separator"===r.arrayFormat?"[]=":"=";return function(e){return function(n,o){return void 0===o||r.skipNull&&null===o||r.skipEmptyString&&""===o?n:(o=null===o?"":o,0===n.length?[[y(e,r),t,y(o,r)].join("")]:[[n,y(o,r)].join(r.arrayFormatSeparator)])}};default:return function(t){return function(e,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(i(e),null===n?[y(t,r)]:[[y(t,r),"=",y(n,r)].join("")])}}}}(t),o={},a=0,u=Object.keys(r);a<u.length;a++){var c=u[a];e(c)||(o[c]=r[c])}var s=Object.keys(o);return!1!==t.sort&&s.sort(t.sort),s.map((function(e){var o=r[e];return void 0===o?"":null===o?y(e,t):Array.isArray(o)?0===o.length&&"bracket-separator"===t.arrayFormat?y(e,t)+"[]":o.reduce(n(e),[]).join("&"):y(e,t)+"="+y(o,t)})).filter((function(r){return r.length>0})).join("&")},t.parseUrl=function(r,t){t=Object.assign({decode:!0},t);var e=s(r,"#"),n=o(e,2),a=n[0],i=n[1];return Object.assign({url:a.split("?")[0]||"",query:x(b(r),t)},t&&t.parseFragmentIdentifier&&i?{fragmentIdentifier:d(i,t)}:{})},t.stringifyUrl=function(r,e){e=Object.assign(n({encode:!0,strict:!0},l,!0),e);var o=m(r.url).split("?")[0]||"",a=t.extract(r.url),i=t.parse(a,{sort:!1}),u=Object.assign(i,r.query),c=t.stringify(u,e);c&&(c="?".concat(c));var s=function(r){var t="",e=r.indexOf("#");return-1!==e&&(t=r.slice(e)),t}(r.url);return r.fragmentIdentifier&&(s="#".concat(e[l]?y(r.fragmentIdentifier,e):r.fragmentIdentifier)),"".concat(o).concat(c).concat(s)},t.pick=function(r,e,o){o=Object.assign(n({parseFragmentIdentifier:!0},l,!1),o);var a=t.parseUrl(r,o),i=a.url,u=a.query,c=a.fragmentIdentifier;return t.stringifyUrl({url:i,query:f(u,e),fragmentIdentifier:c},o)},t.exclude=function(r,e,n){var o=Array.isArray(e)?function(r){return!e.includes(r)}:function(r,t){return!e(r,t)};return t.pick(r,o,n)}},63:function(r,t,e){"use strict";e.d(t,"a",(function(){return o}));var n=e(24);function o(r,t){var e="undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!e){if(Array.isArray(r)||(e=Object(n.a)(r))||t&&r&&"number"===typeof r.length){e&&(r=e);var o=0,a=function(){};return{s:a,n:function(){return o>=r.length?{done:!0}:{done:!1,value:r[o++]}},e:function(r){throw r},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){e=e.call(r)},n:function(){var r=e.next();return u=r.done,r},e:function(r){c=!0,i=r},f:function(){try{u||null==e.return||e.return()}finally{if(c)throw i}}}}},65:function(r,t){r.exports=function(r,t,e){return t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r},r.exports.__esModule=!0,r.exports.default=r.exports},66:function(r,t,e){var n=e(69);r.exports=function(r,t){if(r){if("string"===typeof r)return n(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(r,t):void 0}},r.exports.__esModule=!0,r.exports.default=r.exports},69:function(r,t){r.exports=function(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n},r.exports.__esModule=!0,r.exports.default=r.exports},73:function(r,t,e){var n=e(76),o=e(77),a=e(66),i=e(78);r.exports=function(r,t){return n(r)||o(r,t)||a(r,t)||i()},r.exports.__esModule=!0,r.exports.default=r.exports},74:function(r,t,e){var n=e(80),o=e(81),a=e(66),i=e(82);r.exports=function(r){return n(r)||o(r)||a(r)||i()},r.exports.__esModule=!0,r.exports.default=r.exports},76:function(r,t){r.exports=function(r){if(Array.isArray(r))return r},r.exports.__esModule=!0,r.exports.default=r.exports},77:function(r,t){r.exports=function(r,t){var e=null==r?null:"undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=e){var n,o,a=[],i=!0,u=!1;try{for(e=e.call(r);!(i=(n=e.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(c){u=!0,o=c}finally{try{i||null==e.return||e.return()}finally{if(u)throw o}}return a}},r.exports.__esModule=!0,r.exports.default=r.exports},78:function(r,t){r.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},r.exports.__esModule=!0,r.exports.default=r.exports},79:function(r,t,e){var n=e(66);r.exports=function(r,t){var e="undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!e){if(Array.isArray(r)||(e=n(r))||t&&r&&"number"===typeof r.length){e&&(r=e);var o=0,a=function(){};return{s:a,n:function(){return o>=r.length?{done:!0}:{done:!1,value:r[o++]}},e:function(r){throw r},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){e=e.call(r)},n:function(){var r=e.next();return u=r.done,r},e:function(r){c=!0,i=r},f:function(){try{u||null==e.return||e.return()}finally{if(c)throw i}}}},r.exports.__esModule=!0,r.exports.default=r.exports},80:function(r,t,e){var n=e(69);r.exports=function(r){if(Array.isArray(r))return n(r)},r.exports.__esModule=!0,r.exports.default=r.exports},81:function(r,t){r.exports=function(r){if("undefined"!==typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)},r.exports.__esModule=!0,r.exports.default=r.exports},82:function(r,t){r.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},r.exports.__esModule=!0,r.exports.default=r.exports},83:function(r,t,e){"use strict";r.exports=function(r){return encodeURIComponent(r).replace(/[!'()*]/g,(function(r){return"%".concat(r.charCodeAt(0).toString(16).toUpperCase())}))}},84:function(r,t,e){"use strict";var n="%[a-f0-9]{2}",o=new RegExp(n,"gi"),a=new RegExp("("+n+")+","gi");function i(r,t){try{return decodeURIComponent(r.join(""))}catch(o){}if(1===r.length)return r;t=t||1;var e=r.slice(0,t),n=r.slice(t);return Array.prototype.concat.call([],i(e),i(n))}function u(r){try{return decodeURIComponent(r)}catch(n){for(var t=r.match(o),e=1;e<t.length;e++)t=(r=i(t,e).join("")).match(o);return r}}r.exports=function(r){if("string"!==typeof r)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof r+"`");try{return r=r.replace(/\+/g," "),decodeURIComponent(r)}catch(t){return function(r){for(var e={"%FE%FF":"\ufffd\ufffd","%FF%FE":"\ufffd\ufffd"},n=a.exec(r);n;){try{e[n[0]]=decodeURIComponent(n[0])}catch(t){var o=u(n[0]);o!==n[0]&&(e[n[0]]=o)}n=a.exec(r)}e["%C2"]="\ufffd";for(var i=Object.keys(e),c=0;c<i.length;c++){var s=i[c];r=r.replace(new RegExp(s,"g"),e[s])}return r}(r)}}},85:function(r,t,e){"use strict";r.exports=function(r,t){if("string"!==typeof r||"string"!==typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[r];var e=r.indexOf(t);return-1===e?[r]:[r.slice(0,e),r.slice(e+t.length)]}},86:function(r,t,e){"use strict";r.exports=function(r,t){for(var e={},n=Object.keys(r),o=Array.isArray(t),a=0;a<n.length;a++){var i=n[a],u=r[i];(o?-1!==t.indexOf(i):t(i,u,r))&&(e[i]=u)}return e}}}]);
//# sourceMappingURL=7.fb79dc1c.chunk.js.map