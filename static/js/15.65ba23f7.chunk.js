(this.webpackJsonpfossologyui=this.webpackJsonpfossologyui||[]).push([[15],{247:function(e,t,r){"use strict";r.r(t);var n=r(21),o=r(0),c=r(52),a=r(61),u=r(62),i=function(){var e=a.a.info.info();return Object(u.a)({url:e,method:"GET"})},s=r(13),l=r(1);t.default=function(){var e=Object(o.useState)(Object(s.d)("fossologyVersion")||null),t=Object(n.a)(e,2),r=t[0],a=t[1],u=function(){return i().then((function(e){var t,r;return Object(c.a)(Object(c.a)({},null===e||void 0===e?void 0:e.fossology),{},{buildDate:new Date(null===e||void 0===e||null===(t=e.fossology)||void 0===t?void 0:t.buildDate).toLocaleString(),commitDate:new Date(null===e||void 0===e||null===(r=e.fossology)||void 0===r?void 0:r.commitDate).toLocaleString()})})).then((function(e){return Object(s.i)("fossologyVersion",e),a(e),e})).catch((function(){return null}))};return Object(o.useEffect)((function(){r||u()}),[]),Object(l.jsxs)("footer",{className:"primary-color-wrapper text-center font-size-small py-3",id:"footer",children:["Version: [",null===r||void 0===r?void 0:r.version,"], Branch: [",null===r||void 0===r?void 0:r.branchName,"], Commit: [","#".concat(null===r||void 0===r?void 0:r.commitHash),"] ",null===r||void 0===r?void 0:r.commitDate," built @"," ",null===r||void 0===r?void 0:r.buildDate]})}},50:function(e,t,r){"use strict";r.d(t,"d",(function(){return a})),r.d(t,"e",(function(){return u})),r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return l}));var n=r(63),o=r(2),c=r(13),a=function(){if("undefined"!==typeof window&&Object(c.b)("token"))return!(!localStorage.getItem("user")||!localStorage.getItem("groups"));return!1},u=function(e){Object(c.e)("token"),Object(c.f)("user"),Object(c.f)("groups"),Object(c.f)("currentGroup");var t=o.a.home;e&&(t="".concat(o.a.home,"?").concat(Object(n.stringify)(e))),window.location.href=t},i=function(){return Object(c.b)("token")},s=function(){return Object(c.c)("user").name},l=function(){var e;return"admin"===(null===(e=Object(c.c)("user"))||void 0===e?void 0:e.accessLevel)}},52:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(57);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}},57:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},58:function(e,t,r){"use strict";t.a={forbiddenResource:"Requested resource is forbidden",noGroup:"No Group Found",noFolder:"No Folder Found",noUploads:"No Uploads Found",noPageShort:"Error: Page Not Found!",noPageLong:"We could not find the page you were searching for",groupCreate:"Successfully created the group",deletedGroup:"Successfully deleted the group",deletedUser:"Successfully deleted the user",addedUser:"Successfully added the user",confirmDeletion:"Deletion not confirmed",loading:"Loading...",jobsAdded:"Your jobs have been added to job queue",createdFolder:"Successfully created the folder",deletedFolder:"Successfully deleted the folder",updatedFolderProps:"Successfully updated the folder properties",movedFolder:"Successfully moved the folder",copiedFolder:"Successfully copied the folder",unlinkedFolder:"Successfully unlinked the folder",createdLicense:"Successfully created the license",scheduleUploadDeletion:"Successfully scheduled selected uploads for deletion",selectUploadsToDelete:"Select the uploads to delete",scheduleUploadMovement:"Successfully scheduled the selected uploads movement",selectUploadsToMove:"Select the uploads to move",scheduledUploadCopy:"Successfully scheduled the selected uploads for copy",selectUploadsToCopy:"Select the uploads to copy",uploadSuccess:"Successfully uploaded the files",scheduledAnalysis:"Analysis for the file is scheduled",queuedUpload:"The upload has been queued its upload id is"}},61:function(e,t,r){"use strict";var n="".concat("http","://").concat("localhost/repo/api/v2"),o={jobs:{details:function(e){return"".concat(n,"/jobs/").concat(e)},scheduleAnalysis:function(){return"".concat(n,"/jobs")},allJobs:function(){return"".concat(n,"/jobs/all")},scheduleReport:function(){return"".concat(n,"/report")},downloadReport:function(e){return"".concat(n,"/report/").concat(e)}},auth:{tokens:function(){return"".concat(n,"/tokens")}},search:{search:function(){return"".concat(n,"/search")}},users:{self:function(){return"".concat(n,"/users/self")},getAll:function(){return"".concat(n,"/users")},getSingle:function(e){return"".concat(n,"/users/").concat(e)},delete:function(e){return"".concat(n,"/users/").concat(e)},add:function(){return"".concat(n,"/users")}},folders:{getAll:function(){return"".concat(n,"/folders")},getSingle:function(e){return"".concat(n,"/folders/").concat(e)},create:function(){return"".concat(n,"/folders")},read:function(e){return"".concat(n,"/folders/").concat(e)},edit:function(e){return"".concat(n,"/folders/").concat(e)},delete:function(e){return"".concat(n,"/folders/").concat(e)},move:function(e){return"".concat(n,"/folders/").concat(e)}},upload:{uploadCreate:function(){return"".concat(n,"/uploads")},getId:function(e){return"".concat(n,"/uploads/").concat(e)},getSummary:function(e){return"".concat(n,"/uploads/").concat(e,"/summary")},getLicense:function(e){return"".concat(n,"/uploads/").concat(e,"/licenses")}},browse:{get:function(){return"".concat(n,"/uploads")}},organize:{uploads:{get:function(){return"".concat(n,"/uploads")},delete:function(e){return"".concat(n,"/uploads/").concat(e)},move:function(e){return"".concat(n,"/uploads/").concat(e)},copy:function(e){return"".concat(n,"/uploads/").concat(e)}}},admin:{groups:{create:function(){return"".concat(n,"/groups")},getAll:function(){return"".concat(n,"/groups")},getAllDeletable:function(){return"".concat(n,"/groups/deletable")},delete:function(e){return"".concat(n,"/groups/").concat(e)}}},license:{get:function(){return"".concat(n,"/license")},createCandidateLicense:function(){return"".concat(n,"/license")}},info:{info:function(){return"".concat(n,"/info")},health:function(){return"".concat(n,"/health")}}};t.a=o},62:function(e,t,r){"use strict";var n=r(64),o=r(52),c=r(63),a=r(50),u=r(58),i=r(13);t.a=function e(t){var r,s,l=t.url,f=t.method,d=t.body,p=t.groupName,y=t.headers,b=void 0===y?{}:y,m=t.queryParams,v=t.isMultipart,g=void 0!==v&&v,h=t.noHeaders,j=void 0!==h&&h,x=t.addGroupName,O=void 0===x||x,S=t.retries,w=void 0===S?0:S,k=t.isFile,F=void 0!==k&&k;(r=g?new Headers(Object(o.a)({},b)):new Headers(Object(o.a)({"content-type":"application/json",accept:"application/json"},b)),F&&(r=new Headers(Object(o.a)({},b))),O)&&r.append("groupName",p||Object(i.c)("currentGroup")||(null===(s=Object(i.c)("user"))||void 0===s?void 0:s.default_group));j&&(r={});var A={method:f,headers:r,body:d},I=l;return A.body=d?g?d:JSON.stringify(d):null,m&&(I="".concat(l,"?").concat(Object(c.stringify)(m))),fetch(I,A).then((function(t){if(t.ok){var r,o=Object(n.a)(t.headers.entries());try{for(o.s();!(r=o.n()).done;){var c=r.value;"x-total-pages"===c[0]&&Object(i.h)("pages",c[1])}}catch(s){o.e(s)}finally{o.f()}return F?t:t.json()}return w>0?setTimeout((function(){e({url:l,method:f,headers:b,retries:w-1})}),1e4):t.json().then((function(e){var r={status:t.status,ok:!1,message:e.message,body:e};return 403===e.code?e.message?Object(a.e)({message:e.message}):Object(a.e)({message:u.a.forbiddenResource}):Promise.reject(r)}))}))}},63:function(e,t,r){"use strict";var n=r(67).default,o=r(71).default,c=r(78).default,a=r(72).default,u=r(82),i=r(83),s=r(84),l=r(85),f=Symbol("encodeFragmentIdentifier");function d(e){if("string"!==typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function p(e,t){return t.encode?t.strict?u(e):encodeURIComponent(e):e}function y(e,t){return t.decode?i(e):e}function b(e){return Array.isArray(e)?e.sort():"object"===typeof e?b(Object.keys(e)).sort((function(e,t){return Number(e)-Number(t)})).map((function(t){return e[t]})):e}function m(e){var t=e.indexOf("#");return-1!==t&&(e=e.slice(0,t)),e}function v(e){var t=(e=m(e)).indexOf("?");return-1===t?"":e.slice(t+1)}function g(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"===typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function h(e,t){d((t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);var r=function(e){var t;switch(e.arrayFormat){case"index":return function(e,r,n){t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===n[e]&&(n[e]={}),n[e][t[1]]=r):n[e]=r};case"bracket":return function(e,r,n){t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==n[e]?n[e]=[].concat(n[e],r):n[e]=[r]:n[e]=r};case"colon-list-separator":return function(e,r,n){t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),t?void 0!==n[e]?n[e]=[].concat(n[e],r):n[e]=[r]:n[e]=r};case"comma":case"separator":return function(t,r,n){var o="string"===typeof r&&r.includes(e.arrayFormatSeparator),c="string"===typeof r&&!o&&y(r,e).includes(e.arrayFormatSeparator);r=c?y(r,e):r;var a=o||c?r.split(e.arrayFormatSeparator).map((function(t){return y(t,e)})):null===r?r:y(r,e);n[t]=a};case"bracket-separator":return function(t,r,n){var o=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),o){var c=null===r?[]:r.split(e.arrayFormatSeparator).map((function(t){return y(t,e)}));void 0!==n[t]?n[t]=[].concat(n[t],c):n[t]=c}else n[t]=r?y(r,e):r};default:return function(e,t,r){void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=t}}}(t),n=Object.create(null);if("string"!==typeof e)return n;if(!(e=e.trim().replace(/^[?#&]/,"")))return n;var a,u=c(e.split("&"));try{for(u.s();!(a=u.n()).done;){var i=a.value;if(""!==i){var l=s(t.decode?i.replace(/\+/g," "):i,"="),f=o(l,2),p=f[0],m=f[1];m=void 0===m?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?m:y(m,t),r(y(p,t),m,n)}}}catch(k){u.e(k)}finally{u.f()}for(var v=0,h=Object.keys(n);v<h.length;v++){var j=h[v],x=n[j];if("object"===typeof x&&null!==x)for(var O=0,S=Object.keys(x);O<S.length;O++){var w=S[O];x[w]=g(x[w],t)}else n[j]=g(x,t)}return!1===t.sort?n:(!0===t.sort?Object.keys(n).sort():Object.keys(n).sort(t.sort)).reduce((function(e,t){var r=n[t];return Boolean(r)&&"object"===typeof r&&!Array.isArray(r)?e[t]=b(r):e[t]=r,e}),Object.create(null))}t.extract=v,t.parse=h,t.stringify=function(e,t){if(!e)return"";d((t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);for(var r=function(r){return t.skipNull&&(null===(n=e[r])||void 0===n)||t.skipEmptyString&&""===e[r];var n},n=function(e){switch(e.arrayFormat){case"index":return function(t){return function(r,n){var o=r.length;return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[[p(t,e),"[",o,"]"].join("")]:[[p(t,e),"[",p(o,e),"]=",p(n,e)].join("")])}};case"bracket":return function(t){return function(r,n){return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[[p(t,e),"[]"].join("")]:[[p(t,e),"[]=",p(n,e)].join("")])}};case"colon-list-separator":return function(t){return function(r,n){return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[[p(t,e),":list="].join("")]:[[p(t,e),":list=",p(n,e)].join("")])}};case"comma":case"separator":case"bracket-separator":var t="bracket-separator"===e.arrayFormat?"[]=":"=";return function(r){return function(n,o){return void 0===o||e.skipNull&&null===o||e.skipEmptyString&&""===o?n:(o=null===o?"":o,0===n.length?[[p(r,e),t,p(o,e)].join("")]:[[n,p(o,e)].join(e.arrayFormatSeparator)])}};default:return function(t){return function(r,n){return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[p(t,e)]:[[p(t,e),"=",p(n,e)].join("")])}}}}(t),o={},c=0,u=Object.keys(e);c<u.length;c++){var i=u[c];r(i)||(o[i]=e[i])}var s=Object.keys(o);return!1!==t.sort&&s.sort(t.sort),s.map((function(r){var o=e[r];return void 0===o?"":null===o?p(r,t):Array.isArray(o)?0===o.length&&"bracket-separator"===t.arrayFormat?p(r,t)+"[]":o.reduce(n(r),[]).join("&"):p(r,t)+"="+p(o,t)})).filter((function(e){return e.length>0})).join("&")},t.parseUrl=function(e,t){t=Object.assign({decode:!0},t);var r=s(e,"#"),n=o(r,2),c=n[0],a=n[1];return Object.assign({url:c.split("?")[0]||"",query:h(v(e),t)},t&&t.parseFragmentIdentifier&&a?{fragmentIdentifier:y(a,t)}:{})},t.stringifyUrl=function(e,r){r=Object.assign(n({encode:!0,strict:!0},f,!0),r);var o=m(e.url).split("?")[0]||"",c=t.extract(e.url),a=t.parse(c,{sort:!1}),u=Object.assign(a,e.query),i=t.stringify(u,r);i&&(i="?".concat(i));var s=function(e){var t="",r=e.indexOf("#");return-1!==r&&(t=e.slice(r)),t}(e.url);return e.fragmentIdentifier&&(s="#".concat(r[f]?p(e.fragmentIdentifier,r):e.fragmentIdentifier)),"".concat(o).concat(i).concat(s)},t.pick=function(e,r,o){o=Object.assign(n({parseFragmentIdentifier:!0},f,!1),o);var c=t.parseUrl(e,o),a=c.url,u=c.query,i=c.fragmentIdentifier;return t.stringifyUrl({url:a,query:l(u,r),fragmentIdentifier:i},o)},t.exclude=function(e,r,n){var o=Array.isArray(r)?function(e){return!r.includes(e)}:function(e,t){return!r(e,t)};return t.pick(e,o,n)}},64:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(23);function o(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=Object(n.a)(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var o=0,c=function(){};return{s:c,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return u=e.done,e},e:function(e){i=!0,a=e},f:function(){try{u||null==r.return||r.return()}finally{if(i)throw a}}}}},65:function(e,t,r){var n=r(68);e.exports=function(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},67:function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.__esModule=!0,e.exports.default=e.exports},68:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.__esModule=!0,e.exports.default=e.exports},71:function(e,t,r){var n=r(75),o=r(76),c=r(65),a=r(77);e.exports=function(e,t){return n(e)||o(e,t)||c(e,t)||a()},e.exports.__esModule=!0,e.exports.default=e.exports},72:function(e,t,r){var n=r(79),o=r(80),c=r(65),a=r(81);e.exports=function(e){return n(e)||o(e)||c(e)||a()},e.exports.__esModule=!0,e.exports.default=e.exports},75:function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.__esModule=!0,e.exports.default=e.exports},76:function(e,t){e.exports=function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c=[],a=!0,u=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(c.push(n.value),!t||c.length!==t);a=!0);}catch(i){u=!0,o=i}finally{try{a||null==r.return||r.return()}finally{if(u)throw o}}return c}},e.exports.__esModule=!0,e.exports.default=e.exports},77:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},78:function(e,t,r){var n=r(65);e.exports=function(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=n(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var o=0,c=function(){};return{s:c,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return u=e.done,e},e:function(e){i=!0,a=e},f:function(){try{u||null==r.return||r.return()}finally{if(i)throw a}}}},e.exports.__esModule=!0,e.exports.default=e.exports},79:function(e,t,r){var n=r(68);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.__esModule=!0,e.exports.default=e.exports},80:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},81:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},82:function(e,t,r){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,(function(e){return"%".concat(e.charCodeAt(0).toString(16).toUpperCase())}))}},83:function(e,t,r){"use strict";var n="%[a-f0-9]{2}",o=new RegExp(n,"gi"),c=new RegExp("("+n+")+","gi");function a(e,t){try{return decodeURIComponent(e.join(""))}catch(o){}if(1===e.length)return e;t=t||1;var r=e.slice(0,t),n=e.slice(t);return Array.prototype.concat.call([],a(r),a(n))}function u(e){try{return decodeURIComponent(e)}catch(n){for(var t=e.match(o),r=1;r<t.length;r++)t=(e=a(t,r).join("")).match(o);return e}}e.exports=function(e){if("string"!==typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var r={"%FE%FF":"\ufffd\ufffd","%FF%FE":"\ufffd\ufffd"},n=c.exec(e);n;){try{r[n[0]]=decodeURIComponent(n[0])}catch(t){var o=u(n[0]);o!==n[0]&&(r[n[0]]=o)}n=c.exec(e)}r["%C2"]="\ufffd";for(var a=Object.keys(r),i=0;i<a.length;i++){var s=a[i];e=e.replace(new RegExp(s,"g"),r[s])}return e}(e)}}},84:function(e,t,r){"use strict";e.exports=function(e,t){if("string"!==typeof e||"string"!==typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];var r=e.indexOf(t);return-1===r?[e]:[e.slice(0,r),e.slice(r+t.length)]}},85:function(e,t,r){"use strict";e.exports=function(e,t){for(var r={},n=Object.keys(e),o=Array.isArray(t),c=0;c<n.length;c++){var a=n[c],u=e[a];(o?-1!==t.indexOf(a):t(a,u,e))&&(r[a]=u)}return r}}}]);
//# sourceMappingURL=15.65ba23f7.chunk.js.map