/*! For license information please see 35.8c9a2eb5.chunk.js.LICENSE.txt */
(this.webpackJsonpfossologyui=this.webpackJsonpfossologyui||[]).push([[35],{102:function(e,t,n){"use strict";n.d(t,"h",(function(){return u})),n.d(t,"a",(function(){return l})),n.d(t,"e",(function(){return d})),n.d(t,"g",(function(){return p})),n.d(t,"d",(function(){return h})),n.d(t,"c",(function(){return f})),n.d(t,"f",(function(){return m})),n.d(t,"b",(function(){return g}));var r=n(103),o=n(59),a=n(50),i=n(60),c=function(){var e=o.a.users.getAll();return Object(i.a)({url:e,method:"GET",headers:{Authorization:Object(a.a)()}})},s=n(13),u=function(){return function(){var e=o.a.users.self();return Object(i.a)({url:e,method:"GET",headers:{Authorization:Object(a.a)()},addGroupName:!1})}().then((function(e){return Object(s.h)("user",e),Object(s.h)("currentGroup",e.default_group),e}))},l=function(e){return function(e){var t=o.a.users.add();return Object(i.a)({url:t,method:"POST",headers:{Authorization:Object(a.a)()},body:e})}(e).then((function(e){return e}))},d=function(){return c().then((function(e){var t=[];return e.forEach((function(e){t.push({id:null===e||void 0===e?void 0:e.id,name:null===e||void 0===e?void 0:e.name})})),t}))},p=function(e){return function(e){var t=o.a.users.getSingle(e);return Object(i.a)({url:t,method:"GET",headers:{Authorization:Object(a.a)()}})}(e).then((function(e){return e}))},h=function(e,t){return function(e,t){var n=o.a.users.edit(e);return Object(i.a)({url:n,method:"PUT",body:t,headers:{Authorization:Object(a.a)()}})}(e,t).then((function(e){return e}))},f=function(e){return function(e){var t=o.a.users.delete(e);return Object(i.a)({url:t,method:"DELETE",headers:{Authorization:Object(a.a)()}})}(e).then((function(e){return e}))},m=function(e){return function(e){var t=o.a.users.getTokens(e);return Object(i.a)({url:t,method:"GET",headers:{Authorization:Object(a.a)()}})}(e).then((function(e){return e}))},g=function(e){return Object(r.a)(e.username,e.password,e).then((function(e){return e}))}},103:function(e,t,n){"use strict";var r=n(59),o=Object({NODE_ENV:"production",PUBLIC_URL:"/FOSSologyUI",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_HTTPS:"false",REACT_APP_SERVER_URL:"localhost/repo/api/v2"}).TOKEN_NAME_LENGTH||40,a=Object({NODE_ENV:"production",PUBLIC_URL:"/FOSSologyUI",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_HTTPS:"false",REACT_APP_SERVER_URL:"localhost/repo/api/v2"}).TOKEN_SCOPE||"write",i=Object({NODE_ENV:"production",PUBLIC_URL:"/FOSSologyUI",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_HTTPS:"false",REACT_APP_SERVER_URL:"localhost/repo/api/v2"}).TOKEN_EXPIRY_DAYS||2,c=n(65),s=n(60);t.a=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,u=r.a.auth.tokens();return Object(s.a)({url:u,method:"POST",body:n||{username:e,password:t,token_name:Object(c.f)(o),token_scope:a,token_expire:Object(c.a)(i)},addGroupName:!1})}},110:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(98);function o(){o=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function u(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(_){u=function(e,t,n){return e[t]=n}}function l(e,t,n,r){var o=t&&t.prototype instanceof h?t:h,a=Object.create(o.prototype),i=new S(r||[]);return a._invoke=function(e,t,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return C()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=x(i,n);if(c){if(c===p)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=d(e,t,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===p)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}(e,n,i),a}function d(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(_){return{type:"throw",arg:_}}}e.wrap=l;var p={};function h(){}function f(){}function m(){}var g={};u(g,i,(function(){return this}));var b=Object.getPrototypeOf,y=b&&b(b(E([])));y&&y!==t&&n.call(y,i)&&(g=y);var j=m.prototype=h.prototype=Object.create(g);function v(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function O(e,t){function o(a,i,c,s){var u=d(e[a],e,i);if("throw"!==u.type){var l=u.arg,p=l.value;return p&&"object"==Object(r.a)(p)&&n.call(p,"__await")?t.resolve(p.__await).then((function(e){o("next",e,c,s)}),(function(e){o("throw",e,c,s)})):t.resolve(p).then((function(e){l.value=e,c(l)}),(function(e){return o("throw",e,c,s)}))}s(u.arg)}var a;this._invoke=function(e,n){function r(){return new t((function(t,r){o(e,n,t,r)}))}return a=a?a.then(r,r):r()}}function x(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,x(e,t),"throw"===t.method))return p;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var r=d(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,p;var o=r.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,p):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,p)}function k(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function w(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(k,this),this.reset(!0)}function E(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,o=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:C}}function C(){return{value:void 0,done:!0}}return f.prototype=m,u(j,"constructor",m),u(m,"constructor",f),f.displayName=u(m,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===f||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,m):(e.__proto__=m,u(e,s,"GeneratorFunction")),e.prototype=Object.create(j),e},e.awrap=function(e){return{__await:e}},v(O.prototype),u(O.prototype,c,(function(){return this})),e.AsyncIterator=O,e.async=function(t,n,r,o,a){void 0===a&&(a=Promise);var i=new O(l(t,n,r,o),a);return e.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},v(j),u(j,s,"Generator"),u(j,i,(function(){return this})),u(j,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=E,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return i.type="throw",i.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),w(n),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;w(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:E(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),p}},e}},111:function(e,t,n){"use strict";function r(e,t,n,r,o,a,i){try{var c=e[a](i),s=c.value}catch(u){return void n(u)}c.done?t(s):Promise.resolve(s).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var i=e.apply(t,n);function c(e){r(i,o,a,c,s,"next",e)}function s(e){r(i,o,a,c,s,"throw",e)}c(void 0)}))}}n.d(t,"a",(function(){return o}))},237:function(e,t,n){"use strict";n.r(t);var r=n(57),o=n(110),a=n(52),i=n(111),c=n(21),s=n(0),u=n(53),l=n(51),d=n(70),p=n(93),h=n(73),f=n(102),m=n(1);t.default=function(){var e=Object(s.useState)(h.g),t=Object(c.a)(e,2),n=t[0],g=t[1],b=Object(s.useState)({pass1:"",pass2:""}),y=Object(c.a)(b,2),j=y[0],v=y[1],O=Object(s.useState)([]),x=Object(c.a)(O,2),k=x[0],w=x[1],S=Object(s.useState)(!1),E=Object(c.a)(S,2),C=E[0],_=E[1],L=Object(s.useState)({type:"success",text:""}),A=Object(c.a)(L,2),T=A[0],N=A[1],R=Object(s.useState)(!1),P=Object(c.a)(R,2),D=P[0],F=P[1],G=function(){var e=Object(i.a)(Object(o.a)().mark((function e(t){var r,i;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),setTimeout((function(){F(!1)}),2e3),j.pass1===j.pass2){e.next=7;break}N({type:"danger",text:"Passwords do not match."}),F(!0),e.next=23;break;case 7:return _(!0),e.prev=8,r=Object(a.a)(Object(a.a)({},n),{},{user_pass:j.pass1}),e.next=12,Object(f.a)(r);case 12:i=e.sent,N({type:"success",text:i.message}),F(!0),g(h.g),e.next=22;break;case 18:e.prev=18,e.t0=e.catch(8),N({type:"danger",text:e.t0.message}),F(!0);case 22:_(!1);case 23:case"end":return e.stop()}}),e,null,[[8,18]])})));return function(t){return e.apply(this,arguments)}}(),U=function(e){switch(e.target.name){case"accessLevel":g(Object(a.a)(Object(a.a)({},n),{},{defaultVisibility:e.target.value}));break;case"permission":g(Object(a.a)(Object(a.a)({},n),{},{accessLevel:e.target.value}));break;case"pass1":v(Object(a.a)(Object(a.a)({},j),{},{pass1:e.target.value}));break;case"pass2":v(Object(a.a)(Object(a.a)({},j),{},{pass2:e.target.value}));break;default:g(Object(a.a)(Object(a.a)({},n),{},Object(r.a)({},e.target.name,"checkbox"===e.target.type?e.target.checked:e.target.value)))}"checkbox"===e.target.type&&(n.agents[e.target.name]=e.target.checked,g(Object(a.a)({},n)))};return Object(s.useEffect)((function(){Object(d.e)().then((function(e){w((function(){return e.map((function(e){return{id:e.id,name:e.name,disabled:!1}}))}))})).catch((function(e){N({type:"danger",text:e.message}),F(!0)}))}),[]),Object(s.useEffect)((function(){var e=JSON.parse(localStorage.getItem("user"));e&&e.agents&&(n.agents.copyright_email_author=e.agents.copyright_email_author,n.agents.ecc=e.agents.ecc,n.agents.keyword=e.agents.keyword,n.agents.mime=e.agents.mimetype,n.agents.monk=e.agents.monk,n.agents.nomos=e.agents.nomos,n.agents.ojo=e.agents.ojo,n.agents.package=e.agents.package,n.agents.reso=e.agents.reso,n.agents.bucket=e.agents.bucket,n.agents.heritage=e.agents.heritage)}),[]),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(u.a,{title:"Add User"}),Object(m.jsxs)("div",{className:"main-container my-3",children:[D&&Object(m.jsx)(l.a,{type:T.type,setShow:F,message:T.text}),Object(m.jsx)("h1",{className:"font-size-main-heading",children:"Add A User"}),Object(m.jsx)("div",{className:"row",children:Object(m.jsx)("div",{className:"col-12 col-lg-8",children:Object(m.jsxs)("form",{children:[Object(m.jsx)(l.c,{name:"name",id:"name",type:"text",onChange:U,value:n.name,children:"Username"}),Object(m.jsx)(l.c,{name:"description",id:"description",type:"text",onChange:U,value:n.description,children:"Description, full name, contact, etc. (optional)"}),Object(m.jsx)(l.c,{name:"email",id:"email",type:"email",onChange:U,value:n.email,children:"Email address"}),Object(m.jsx)(l.c,{type:"select",name:"permission",id:"permission",onChange:U,options:h.a,property:"name",value:n.accessLevel,valueProperty:"value",children:"Access level"}),Object(m.jsx)(l.c,{type:"select",name:"rootFolderId",id:"rootFolderId",onChange:U,options:k,property:"name",value:n.rootFolderId,children:"User root folder"}),Object(m.jsx)(l.c,{name:"pass1",id:"pass1",type:"password",onChange:U,value:j.pass1,children:"Password (optional)"}),Object(m.jsx)(l.c,{name:"pass2",id:"pass2",type:"password",onChange:U,value:j.pass2,children:"Re-enter password"}),Object(m.jsx)("p",{className:"font-demi my-1",children:"E-mail Notification"}),Object(m.jsx)(l.c,{type:"checkbox",checked:n.emailNotification,name:"emailNotification",id:"emailNotification",onChange:U,children:"Check to enable email notification when upload scan completes."}),Object(m.jsx)("p",{className:"font-demi mt-1",children:"Default upload visibility"}),Object(m.jsx)(p.a,{accessLevel:n.defaultVisibility,handleChange:U}),Object(m.jsxs)("label",{htmlFor:"agents",className:"font-demi my-1",children:["Agents selected by default when uploading",Object.keys(n.agents).map((function(e){return Object(m.jsx)(l.c,{type:"checkbox",checked:n.agents[e],name:e,id:e,onChange:U,children:h.c[e]},e)}))]}),Object(m.jsx)(l.c,{type:"select",name:"defaultBucketpool",id:"defaultBucketpool",onChange:U,options:h.e,property:"name",value:n.defaultBucketpool,children:"Default bucketpool"}),Object(m.jsx)(l.b,{type:"submit",onClick:G,className:"mt-4",children:C?Object(m.jsx)(l.d,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"}):"Add User"})]})})})]})]})}},65:function(e,t,n){"use strict";n.d(t,"f",(function(){return o})),n.d(t,"a",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"e",(function(){return c})),n.d(t,"d",(function(){return s})),n.d(t,"b",(function(){return u}));var r=n(64),o=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*r));return t},a=function(e){return Date.prototype.addDays=function(e){var t=new Date(this.valueOf());return t.setDate(t.getDate()+e),t},(new Date).addDays(e).toISOString().split("T")[0]},i=function(e){if(!e)return e;var t=e.split(" ");return 1===t.length?t[0].substring(0,2).toUpperCase():t.map((function(e,t){return t<3?e[0]:null})).join("").toUpperCase()},c=function(e,t){window.scrollTo({top:0}),t({type:"danger",text:e.message})},s=function(e){var t=e.match(/report\/([0-9]+)/);return null!=t?t[1]:null},u=function(e){var t,n=e.split(";"),o="download.txt",a=Object(r.a)(n);try{for(a.s();!(t=a.n()).done;){var i=t.value.trim().match(/filename="(.*)"/);if(null!=i){o=i[1];break}}}catch(c){a.e(c)}finally{a.f()}return o}},73:function(e,t,n){"use strict";n.d(t,"w",(function(){return i})),n.d(t,"d",(function(){return c})),n.d(t,"b",(function(){return s})),n.d(t,"k",(function(){return u})),n.d(t,"o",(function(){return l})),n.d(t,"l",(function(){return d})),n.d(t,"p",(function(){return p})),n.d(t,"n",(function(){return h})),n.d(t,"i",(function(){return f})),n.d(t,"q",(function(){return m})),n.d(t,"r",(function(){return g})),n.d(t,"s",(function(){return b})),n.d(t,"u",(function(){return y})),n.d(t,"t",(function(){return j})),n.d(t,"v",(function(){return v})),n.d(t,"x",(function(){return O})),n.d(t,"f",(function(){return x})),n.d(t,"m",(function(){return k})),n.d(t,"h",(function(){return w})),n.d(t,"j",(function(){return S})),n.d(t,"a",(function(){return E})),n.d(t,"y",(function(){return C})),n.d(t,"g",(function(){return _})),n.d(t,"e",(function(){return L})),n.d(t,"c",(function(){return A}));var r,o,a=n(13),i=[{id:0,name:"open"},{id:1,name:"in progress"},{id:2,name:"closed"},{id:3,name:"rejected"}],c=[{id:0,name:"me"},{id:1,name:"unassigned"}],s=[{id:0,name:"-- select action --",reportFormat:"0",disabled:!0},{id:1,name:"Export DEP5",reportFormat:"dep5"},{id:2,name:"Export ReadMe_OSS",reportFormat:"readmeoss"},{id:3,name:"Export SPDX RDF",reportFormat:"spdx2"},{id:4,name:"Export SPDX tag:value",reportFormat:"spdx2tv"},{id:5,name:"Export Unified Report",reportFormat:"unifiedreport"}],u={type:"success",text:""},l={searchType:"allfiles",uploadId:"",filename:"",tag:"",filesizemin:"",filesizemax:"",license:"",copyright:"",page:1,limit:10},d={type:"danger",text:""},p={folderId:1,uploadDescription:"",accessLevel:"protected",ignoreScm:!1,fileInput:null},h={analysis:Object(a.a)(),decider:{nomosMonk:!1,bulkReused:!1,newScanner:!1,ojoDecider:!1},reuse:{reuseUpload:0,reuseGroup:null===(r=Object(a.c)("user"))||void 0===r?void 0:r.default_group,reuseMain:!1,reuseEnhanced:!1,reuseReport:!1,reuseCopyright:!1}},f=[{id:1,name:"Software Repository",description:"Top Folder",parent:null}],m={folder:"",editUpload:"",reportUpload:"",newLicense:"licenseCanditate",licenseInfoInFile:!0,licenseConcluded:!1,licenseDecision:!0,existingDecisions:!0,importDiscussed:!0,copyright:!1},g={folderId:1,uploadDescription:"",accessLevel:"protected",ignoreScm:!1,uploadType:"server",groupName:""},b={folderId:1,uploadDescription:"",accessLevel:"protected",ignoreScm:!1,uploadType:"url"},y={url:"",name:""},j={folderId:1,uploadDescription:"",accessLevel:"protected",ignoreScm:!1,uploadType:"vcs"},v={vcsType:"git",vcsUrl:"",vcsBranch:"",vcsName:"",vcsUsername:"",vcsPassword:""},O=[{id:"git",type:"Git"},{id:"svn",type:"SVN"}],x=[{id:10,entry:"10"},{id:25,entry:"25"},{id:50,entry:"50"},{id:100,entry:"100"}],k={analysis:Object(a.a)(),decider:{nomosMonk:!1,bulkReused:!1,newScanner:!1,ojoDecider:!1},reuse:{reuseUpload:0,reuseGroup:null===(o=Object(a.c)("user"))||void 0===o?void 0:o.default_group,reuseMain:!1,reuseEnhanced:!1,reuseReport:!1,reuseCopyright:!1}},w=[{id:1,name:"Software Repository",description:"Top Folder",parent:null}],S={allNonSlow:!1,allOperations:!1,validateFolderContents:!1,rmvGoldFiles:!1,rmvOrphanedRows:!1,rmvLogFiles:!1,normalizePriority:!1,rmvUploads:!1,rmvTokens:!1,rmvTempTables:!1,analyseDb:!1,rmvRepoFiles:!1,dbReindexing:!1,verbose:!1,rmvRepoOldFiles1:!1,rmvRepoOldFiles2:!1},E=[{id:0,name:"None (very basic, no database access)",disabled:!1,value:"none"},{id:1,name:"Read-only (read, but no writes or downloads)",disabled:!1,value:"read_only"},{id:2,name:"Read-Write (read, download, or edit information)",disabled:!1,value:"read_write"},{id:3,name:"Clearing Administrator (read, download, edit information and edit decisions)",disabled:!1,value:"clearing_admin"},{id:4,name:"Full Administrator (all access including adding and deleting users)",disabled:!1,value:"admin"}],C=[{id:0,name:"Active",disabled:!1,value:"active"},{id:1,name:"Inactive",disabled:!1,value:"inactive"}],_={name:"",user_pass:null,description:"",accessLevel:"",rootFolderId:0,emailNotification:!0,email:"",defaultVisibility:"public",defaultBucketpool:2,agents:{mime:!1,monk:!1,ojo:!1,bucket:!1,copyright_email_author:!1,ecc:!1,keyword:!1,nomos:!1,package:!1,reso:!1,heritage:!1}},L=[{id:0,name:"GPL Demo bucket pool, v1",disabled:!1}],A={bucket:"Bucket Analysis",copyright_email_author:"Copyright/Email/URL/Author Analysis",ecc:"ECC Analysis, scanning for text fragments potentially relevant for export control",keyword:"Keyword Analysis",mime:"MIME-type Analysis (Determine mimetype of every file. Not needed for licenses or buckets)",monk:"Monk License Analysis, scanning for licenses performing a text comparison",nomos:"Nomos License Analysis, scanning for licenses using regular expressions",ojo:"Ojo License Analysis, scanning for licenses using SPDX-License-Identifier",package:"Package Analysis (Parse package headers)",reso:"REUSE.Software Analysis (forces *Ojo License Analysis*)",heritage:"Software Heritage Analysis"}},88:function(e,t,n){"use strict";n.d(t,"e",(function(){return c})),n.d(t,"d",(function(){return s})),n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d}));var r=n(59),o=n(50),a=n(60),i=n(13),c=function(){return Object(i.c)("groups")},s=function(){return function(){var e=r.a.admin.groups.getAll();return Object(a.a)({url:e,method:"GET",headers:{Authorization:Object(o.a)()},addGroupName:!1})}().then((function(e){return Object(i.h)("groups",e),e}))},u=function(e){return function(e){var t=r.a.admin.groups.create();return Object(a.a)({url:t,method:"POST",headers:{Authorization:Object(o.a)(),name:e},addGroupName:!1})}(e).then((function(e){return e}))},l=function(e){return function(e){var t=r.a.admin.groups.delete(e);return Object(a.a)({url:t,method:"DELETE",headers:{Authorization:Object(o.a)()},addGroupName:!1})}(e).then((function(e){return e}))},d=function(){return function(){var e=r.a.admin.groups.getAllDeletable();return Object(a.a)({url:e,method:"GET",headers:{Authorization:Object(o.a)()},addGroupName:!1})}().then((function(e){return e}))}},93:function(e,t,n){"use strict";var r=n(0),o=n(51),a=n(1);var i=function(e){var t=e.ignoreScm,n=e.handleChange;return Object(a.jsx)("div",{id:"upload-ignore-files",className:"mt-4",children:Object(a.jsxs)(o.c,{type:"checkbox",checked:t,name:"ignoreScm",id:"upload-ignore-scm",onChange:function(e){return n(e)},children:["Ignore SCM files (Git, SVN, TFS) and files with particular Mimetype\xa0",Object(a.jsx)(o.e,{title:"Configure mimetypes from Admin-Customize-Skip MimeTypes from scanning"})]})})};var c=function(e){var t=e.accessLevel,n=e.handleChange;return Object(a.jsxs)("div",{id:"upload-access-level",children:[Object(a.jsxs)(o.c,{type:"radio",value:"private",name:"accessLevel",id:"upload-access-level-private",checked:"private"===t,onChange:function(e){return n(e)},children:["Visible only for active group\xa0",Object(a.jsx)(o.e,{title:"which is the currently selected group"})]}),Object(a.jsxs)(o.c,{type:"radio",value:"protected",name:"accessLevel",id:"upload-access-level-protected",checked:"protected"===t,onChange:function(e){return n(e)},children:["Visible for all groups\xa0",Object(a.jsx)(o.e,{title:"which are accessible by you now"})]}),Object(a.jsxs)(o.c,{type:"radio",value:"public",name:"accessLevel",id:"upload-access-level-public",checked:"public"===t,onChange:function(e){return n(e)},children:["Make Public\xa0",Object(a.jsx)(o.e,{title:"visible for all users"})]})]})},s=n(54);var u=function(e){var t=e.analysis,n=e.handleChange;return Object(a.jsxs)("div",{id:"uplod-optional-analysis",className:"mt-4",children:[Object(a.jsx)("p",{className:"font-demi",children:"Select optional analysis"}),Object(a.jsx)(s.a,{type:"checkbox",checked:t.bucket,name:"bucket",id:"upload-analysis-bucket",onChange:function(e){return n(e)},children:"Bucket Analysis"}),Object(a.jsx)(s.a,{type:"checkbox",checked:t.copyrightEmailAuthor,name:"copyrightEmailAuthor",id:"upload-analysis-copyright-email-author",onChange:function(e){return n(e)},children:"Copyright/Email/URL/Author Analysis"}),Object(a.jsx)(s.a,{type:"checkbox",checked:t.ecc,name:"ecc",id:"upload-analysis-ecc",onChange:function(e){return n(e)},children:"ECC Analysis, scanning for text fragments potentially relevant for export control"}),Object(a.jsx)(s.a,{type:"checkbox",checked:t.keyword,name:"keyword",id:"upload-analysis-keyword",onChange:function(e){return n(e)},children:"Keyword Analysis"}),Object(a.jsx)(s.a,{type:"checkbox",checked:t.mime,name:"mime",id:"upload-analysis-mime",onChange:function(e){return n(e)},children:"MIME-type Analysis (Determine mimetype of every file. Not needed for licenses or buckets)"}),Object(a.jsx)(s.a,{type:"checkbox",checked:t.monk,name:"monk",id:"upload-analysis-monk",onChange:function(e){return n(e)},children:"Monk License Analysis, scanning for licenses performing a text comparison"}),Object(a.jsx)(s.a,{type:"checkbox",checked:t.nomos,name:"nomos",id:"upload-analysis-nomos",onChange:function(e){return n(e)},children:"Nomos License Analysis, scanning for licenses using regular expressions"}),Object(a.jsx)(s.a,{type:"checkbox",checked:t.ojo,name:"ojo",id:"upload-analysis-ojo",onChange:function(e){return n(e)},children:"Ojo License Analysis, scanning for licenses using SPDX-License-Identifier"}),Object(a.jsx)(s.a,{type:"checkbox",checked:t.package,name:"package",id:"upload-analysis-package",onChange:function(e){return n(e)},children:"Package Analysis (Parse package headers)"})]})};var l=function(e){var t=e.decider,n=e.handleChange;return Object(a.jsxs)("div",{id:"upload-concluded-license-decider",className:"mt-4",children:[Object(a.jsxs)("p",{className:"font-demi",children:["Automatic Concluded License Decider,",Object(a.jsx)(o.e,{title:"only for relevant files"})," based on"]}),Object(a.jsx)(o.c,{type:"checkbox",checked:t.nomosMonk,name:"nomosMonk",id:"upload-decider-nomos-monk",onChange:function(e){return n(e)},children:"... scanners matches if all Nomos findings are within the Monk findings"}),Object(a.jsx)(o.c,{type:"checkbox",checked:t.ojoDecider,name:"ojoDecider",id:"upload-decider-ojo-decider",onChange:function(e){return n(e)},children:".. scanners matches if Ojo findings are no contradiction with other findings"}),Object(a.jsx)(o.c,{type:"checkbox",checked:t.bulkReused,name:"bulkReused",id:"upload-decider-bulk-reused",onChange:function(e){return n(e)},children:"... bulk phrases from reused packages"}),Object(a.jsx)(o.c,{type:"checkbox",checked:t.newScanner,name:"newScanner",id:"upload-decider-new-scanner",onChange:function(e){return n(e)},children:"... new scanner results, i.e., decisions were marked as work in progress if new scanner finds additional licenses"})]})},d=n(57),p=n(52),h=n(21),f=n(70),m=n(97),g=n(88),b=n(58),y=function(e){var t=e.reuse,n=e.handleChange,i=Object(r.useState)({groupList:[{id:3,name:"fossy"}],folderList:[{id:1,name:"Software Repository",description:"Top Folder",parent:null}],uploadList:[{folderId:1,uploadId:null,uploadName:"",uploadDescription:""}],reuseFolder:1}),c=Object(h.a)(i,2),s=c[0],u=c[1];Object(r.useEffect)((function(){u((function(e){return Object(p.a)(Object(p.a)({},e),{},{groupList:Object(g.e)()})}))}),[]),Object(r.useEffect)((function(){Object(f.e)(t.reuseGroup).then((function(e){u((function(t){return Object(p.a)(Object(p.a)({},t),{},{folderList:e})}))})).catch((function(){}))}),[t.reuseGroup]),Object(r.useEffect)((function(){Object(m.c)(s.reuseFolder,t.reuseGroup).then((function(e){u((function(t){return Object(p.a)(Object(p.a)({},t),{},{uploadList:e})}))})).catch((function(){}))}),[t.reuseGroup,s.reuseFolder]);return Object(a.jsxs)("div",{id:"upload-reuse",className:"mt-4",children:[Object(a.jsxs)("p",{className:"font-demi",children:["(Optional) Reuse",Object(a.jsx)(o.e,{title:"copy clearing decisions if there is the same file hash between two files"})]}),Object(a.jsx)(o.c,{type:"select",name:"reuseGroup",id:"upload-file-reuse-group",onChange:n,options:s.groupList,value:t.reuseGroup,property:"name",valueProperty:"name",noDataMessage:b.a.noGroup,children:"Select the reuse group:"}),Object(a.jsx)(o.c,{type:"select",name:"reuseFolder",id:"upload-file-reuse-folder",onChange:function(e){u((function(t){return Object(p.a)(Object(p.a)({},t),{},Object(d.a)({},e.target.name,e.target.value))}))},options:s.folderList,value:s.reuseFolder,property:"name",noDataMessage:b.a.noFolder,children:"Select the reuse folder:"}),Object(a.jsx)(o.c,{type:"select",name:"reuseUpload",id:"upload-file-reuse-upload",onChange:n,options:s.uploadList,value:parseInt(t.reuseUpload,10),property:"uploadname",valueProperty:"id",noDataMessage:b.a.noUploads,children:"Select the reuse upload:"}),Object(a.jsxs)(o.c,{type:"checkbox",checked:t.reuseEnhanced,name:"reuseEnhanced",id:"upload-file-reuse-enhanced",onChange:n,children:["Enhanced reuse (slower)",Object(a.jsx)(o.e,{title:"will copy a clearing decision if the two files differ by one line determined by a diff tool"})]}),Object(a.jsxs)(o.c,{type:"checkbox",checked:t.reuseMain,name:"reuseMain",id:"upload-file-reuse-main",onChange:n,children:["Reuse main license/s",Object(a.jsx)(o.e,{title:"will copy a main license decision if any"})]}),Object(a.jsxs)(o.c,{type:"checkbox",checked:t.reuseReport,name:"reuseReport",id:"upload-file-reuse-report",onChange:n,children:["Reuse report configuration settings",Object(a.jsx)(o.e,{title:"use to copy all the information from conf page(if any)"})]}),Object(a.jsxs)(o.c,{type:"checkbox",checked:t.reuseCopyright,name:"reuseCopyright",id:"upload-file-reuse-copyright",onChange:n,children:["Reuse edited and deactivated copyrights",Object(a.jsx)(o.e,{title:"use to copy edited and deactivated copyrights from the reused package"})]})]})};t.a=function(e){var t=e.accessLevel,n=e.ignoreScm,r=e.analysis,o=e.decider,s=e.reuse,d=e.handleChange,p=e.handleScanChange;return Object(a.jsxs)(a.Fragment,{children:[n&&Object(a.jsx)(i,{ignoreScm:n,handleChange:d}),t&&Object(a.jsx)(c,{accessLevel:t,handleChange:d}),r&&Object(a.jsx)(u,{analysis:r,handleChange:p}),o&&Object(a.jsx)(l,{decider:o,handleChange:p}),s&&Object(a.jsx)(y,{reuse:s,handleChange:p})]})}},98:function(e,t,n){"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}n.d(t,"a",(function(){return r}))}}]);
//# sourceMappingURL=35.8c9a2eb5.chunk.js.map