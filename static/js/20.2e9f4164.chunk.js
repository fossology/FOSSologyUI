(this.webpackJsonpfossologyui=this.webpackJsonpfossologyui||[]).push([[20],{200:function(e,t,n){"use strict";n.r(t);var r=n(99),c=n(21),o=n(0),a=n(3),s=n(52),i=n(50),l=n(96),u=n(97),d=n(64),b=n(1);t.default=function(){var e=Object(o.useState)(),t=Object(c.a)(e,2),n=t[0],f=t[1],j=Object(o.useState)(),h=Object(c.a)(j,2),p=h[0],m=h[1],O=Object(o.useState)(),v=Object(c.a)(O,2),g=v[0],y=v[1],x=Object(o.useState)(!1),w=Object(c.a)(x,2),S=w[0],N=w[1],C=Object(o.useState)(),F=Object(c.a)(C,2),k=F[0],U=F[1],D=Object(a.i)().uploadID;return Object(o.useEffect)((function(){U({type:"success",text:"Loading..."}),N(!0),D&&f(D),n?(Object(u.f)(n).then((function(e){m(e),N(!1)})).catch((function(e){Object(d.e)(e,U),N(!0)})),Object(u.e)(n,["ojo,nomos,monk"]).then((function(e){y(e),N(!1)})).catch((function(e){Object(d.e)(e,U),N(!0)}))):U({type:"danger",text:"UploadId should be an integer"})}),[n]),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(s.a,{title:"License Browser"}),Object(b.jsxs)("div",{className:"main-container my-3",children:[S&&Object(b.jsx)(i.a,{type:k.type,setShow:N,message:k.text}),Object(b.jsx)("h1",{className:"font-size-main-heading",children:"License Browser"})]}),Object(b.jsx)(l.a,{}),Object(b.jsx)("div",{className:"main-container my-4",children:Object(b.jsxs)("div",{className:"row",children:[Object(b.jsx)("div",{className:"col-12 col-lg-12 col-xl-9",children:Object(b.jsxs)("table",{className:"table table-striped text-primary-color font-size-medium table-responsive table-bordered",children:[Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{className:"font-bold font-size-sub-heading",children:[Object(b.jsx)("th",{children:"Files"}),Object(b.jsx)("th",{children:"Scanner Results"}),Object(b.jsx)("th",{children:"Edited Results"}),Object(b.jsx)("th",{children:"Clearing Status"}),Object(b.jsx)("th",{children:"Cleared/ Open/ Total"}),Object(b.jsx)("th",{children:"Actions"})]})}),Object(b.jsx)("tbody",{children:g&&g.length>0&&g.map((function(e){var t=Object(r.a)(new Set(e.findings.scanner)),n=Object(r.a)(new Set(e.findings.conclusion));return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:e.filePath}),Object(b.jsx)("td",{children:null!==t?t.map((function(e,n){return"".concat(e).concat(n+1===t.length?"":", ")})):null}),Object(b.jsx)("td",{children:null!==n?n.map((function(e,t){return"".concat(e).concat(t+1===n.length?"":", ")})):null}),Object(b.jsx)("td",{children:"-"}),Object(b.jsx)("td",{children:"-"}),Object(b.jsx)("td",{children:"-"})]},e.id)})}))})]})}),Object(b.jsx)("div",{className:"col-12 col-lg-12 col-xl-3",children:p&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("h4",{className:"font-bold font-size-sub-heading text-primary-color",children:"Summary"}),Object(b.jsx)("table",{className:"table table-bordered text-primary-color mt-3",children:Object(b.jsxs)("tbody",{children:[Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"Main License"}),Object(b.jsx)("td",{children:p.mainLicense})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"Unique Licenses"}),Object(b.jsx)("td",{children:p.uniqueLicenses})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"Unique Concluded Licenses"}),Object(b.jsx)("td",{children:p.uniqueConcludedLicenses})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"Total Concluded Licenses"}),Object(b.jsx)("td",{children:p.totalConcludedLicenses})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"Files Cleared"}),Object(b.jsx)("td",{children:p.filesCleared})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"Copyright Count"}),Object(b.jsx)("td",{children:p.copyrightCount})]})]})})]})})]})})]})}},49:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return u}));var r=n(62),c=n(2),o=n(13),a=function(){if("undefined"!==typeof window&&Object(o.b)("token"))return!(!localStorage.getItem("user")||!localStorage.getItem("groups"));return!1},s=function(e){Object(o.e)("token"),Object(o.f)("user"),Object(o.f)("groups"),Object(o.f)("currentGroup");var t=c.a.home;e&&(t="".concat(c.a.home,"?").concat(Object(r.stringify)(e))),window.location.href=t},i=function(){return Object(o.b)("token")},l=function(){return Object(o.c)("user").name},u=function(){var e;return"admin"===(null===(e=Object(o.c)("user"))||void 0===e?void 0:e.accessLevel)}},50:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return u.a})),n.d(t,"e",(function(){return d})),n.d(t,"d",(function(){return c.a}));var r,c=n(59),o=(n(0),n(1)),a=function(e){var t=e.message,n=e.type,r=e.setShow;return Object(o.jsx)("div",{className:"main-container d-flex justify-content-end mt-3",children:Object(o.jsx)("div",{className:"alert bg-".concat(n," alert-dismissible fade show font-medium text-white alert-fix-position"),role:"alert",children:Object(o.jsxs)("div",{className:"d-flex",children:["danger"===n&&Object(o.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mr-3",children:[Object(o.jsx)("path",{d:"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z",fill:"white"}),Object(o.jsx)("path",{d:"M14.5 25H17.5V22H14.5V25ZM14.5 6V19H17.5V6H14.5Z",fill:"#DC4146"})]}),"success"===n&&Object(o.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mr-3",children:[Object(o.jsx)("path",{d:"M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z",fill:"white"}),Object(o.jsx)("path",{d:"M38 15L22 33L12 25",stroke:"#28A745",strokeWidth:"2",strokeMiterlimit:"10",strokeLinecap:"round",strokeLinejoin:"round"})]}),t,Object(o.jsx)("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close",onClick:function(){return r(!1)},children:Object(o.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]})})})},s=n(22),i=n(11).d.button(r||(r=Object(s.a)(["\n    border: none;\n    border-radius: 0.5rem;\n    padding: 0.5rem 3rem;\n    transition: all 0.5s ease-in;\n"]))),l=function(e){var t=e.type,n=e.onClick,r=e.className,c=e.children;return Object(o.jsx)(i,{type:t,onClick:n,className:"bg-primary-color text-secondary-color font-demi text-center hover-primary-color ".concat(r),children:c})},u=(n(54),n(53)),d=function(e){var t=e.title;return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("button",{type:"button",className:"d-inline-block btn px-0 mt-n2","data-toggle":"tooltip","data-placement":"top",title:t,children:Object(o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle-fill text-primary-color",viewBox:"0 0 16 16",children:Object(o.jsx)("path",{d:"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"})})})})}},51:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(56);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}},52:function(e,t,n){"use strict";n(0);var r=n(67),c=n(1);t.a=function(e){var t=e.title;return Object(c.jsx)(r.a,{children:Object(c.jsxs)("title",{children:[t," | FOSSology"]})})}},53:function(e,t,n){"use strict";n(0);var r=n(1);t.a=function(e){var t=e.type,n=e.name,c=e.value,o=e.id,a=e.className,s=e.onChange,i=e.children,l=e.checked,u=void 0!==l&&l,d=e.placeholder,b=void 0===d?null:d,f=e.disabled,j=void 0!==f&&f,h=e.options,p=void 0===h?null:h,m=e.multiple,O=void 0!==m&&m,v=e.property,g=e.valueProperty,y=e.noDataMessage,x=void 0===y?"No Data Found":y;return"radio"===t||"checkbox"===t?Object(r.jsxs)("div",{className:"my-0",children:[Object(r.jsx)("input",{type:t,name:n,value:c,className:a&&"mr-2 ".concat(a),onChange:s,checked:u,disabled:j,id:o}),Object(r.jsx)("label",{htmlFor:o,className:"font-medium ml-2",children:i})]}):"select"===t?Object(r.jsxs)("div",{className:"my-0 py-0",children:[i&&Object(r.jsx)("label",{htmlFor:o,className:"font-demi",children:i}),"\u2003",Object(r.jsx)("select",{name:n,className:a?"mr-2 form-control ".concat(a):"mr-2 form-control",value:c,onChange:s,multiple:O&&O,size:O?"15":"",id:o,children:p.length>0?p.map((function(e,t){return Object(r.jsx)("option",{value:g?e[g]:e.id,disabled:e.disabled,children:v?e[v]:e},e.id||t)})):Object(r.jsx)("option",{className:"font-demi",disabled:!0,children:x})})]}):Object(r.jsxs)("div",{className:"my-2",children:[Object(r.jsx)("label",{htmlFor:o,className:"font-demi",children:i}),Object(r.jsx)("input",{type:t,name:n,value:c,className:"file"===t?"ml-3 ".concat(a):"form-control ".concat(a),onChange:s,checked:u,placeholder:b,id:o})]})}},54:function(e,t,n){"use strict";n(0);var r=n(1);t.a=function(e){var t=e.src,n=e.alt,c=e.style,o=e.className,a=e.width,s=e.height,i=e.align;return Object(r.jsx)("img",{src:t,alt:n,style:c,className:o,width:a,height:s,align:i})}},56:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},57:function(e,t,n){"use strict";t.a={forbiddenResource:"Requested resource is forbidden",noGroup:"No Group Found",noFolder:"No Folder Found",noUploads:"No Uploads Found",noPageShort:"Error: Page Not Found!",noPageLong:"We could not find the page you were searching for",groupCreate:"Successfully created the group",deletedUser:"Successfully deleted the user",addedUser:"Successfully added the user",confirmDeletion:"Deletion not confirmed",loading:"Loading...",jobsAdded:"Your jobs have been added to job queue",createdFolder:"Successfully created the folder",deletedFolder:"Successfully deleted the folder",updatedFolderProps:"Successfully updated the folder properties",movedFolder:"Successfully moved the folder",copiedFolder:"Successfully copied the folder",unlinkedFolder:"Successfully unlinked the folder",createdLicense:"Successfully created the license",scheduleUploadDeletion:"Successfully scheduled selected uploads for deletion",selectUploadsToDelete:"Select the uploads to delete",scheduleUploadMovement:"Successfully scheduled the selected uploads movement",selectUploadsToMove:"Select the uploads to move",scheduledUploadCopy:"Successfully scheduled the selected uploads for copy",selectUploadsToCopy:"Select the uploads to copy",uploadSuccess:"Successfully uploaded the files",scheduledAnalysis:"Analysis for the file is scheduled",queuedUpload:"The upload has been queued its upload id is"}},59:function(e,t,n){"use strict";var r=n(4),c=n(8),o=n(55),a=n.n(o),s=n(0),i=n.n(s),l=n(58),u=["bsPrefix","variant","animation","size","children","as","className"],d=i.a.forwardRef((function(e,t){var n=e.bsPrefix,o=e.variant,s=e.animation,d=e.size,b=e.children,f=e.as,j=void 0===f?"div":f,h=e.className,p=Object(c.a)(e,u),m=(n=Object(l.a)(n,"spinner"))+"-"+s;return i.a.createElement(j,Object(r.a)({ref:t},p,{className:a()(h,m,d&&m+"-"+d,o&&"text-"+o)}),b)}));d.displayName="Spinner",t.a=d},60:function(e,t,n){"use strict";var r="".concat("http","://").concat("localhost/repo/api/v2"),c={jobs:{details:function(e){return"".concat(r,"/jobs/").concat(e)},scheduleAnalysis:function(){return"".concat(r,"/jobs")},allJobs:function(){return"".concat(r,"/jobs/all")},scheduleReport:function(){return"".concat(r,"/report")},downloadReport:function(e){return"".concat(r,"/report/").concat(e)}},auth:{tokens:function(){return"".concat(r,"/tokens")}},search:{search:function(){return"".concat(r,"/search")}},users:{self:function(){return"".concat(r,"/users/self")},getAll:function(){return"".concat(r,"/users")},getSingle:function(e){return"".concat(r,"/users/").concat(e)},delete:function(e){return"".concat(r,"/users/").concat(e)},add:function(){return"".concat(r,"/users")}},folders:{getAll:function(){return"".concat(r,"/folders")},getSingle:function(e){return"".concat(r,"/folders/").concat(e)},create:function(){return"".concat(r,"/folders")},read:function(e){return"".concat(r,"/folders/").concat(e)},edit:function(e){return"".concat(r,"/folders/").concat(e)},delete:function(e){return"".concat(r,"/folders/").concat(e)},move:function(e){return"".concat(r,"/folders/").concat(e)}},upload:{uploadCreate:function(){return"".concat(r,"/uploads")},getId:function(e){return"".concat(r,"/uploads/").concat(e)},getSummary:function(e){return"".concat(r,"/uploads/").concat(e,"/summary")},getLicense:function(e){return"".concat(r,"/uploads/").concat(e,"/licenses")}},browse:{get:function(){return"".concat(r,"/uploads")}},organize:{uploads:{get:function(){return"".concat(r,"/uploads")},delete:function(e){return"".concat(r,"/uploads/").concat(e)},move:function(e){return"".concat(r,"/uploads/").concat(e)},copy:function(e){return"".concat(r,"/uploads/").concat(e)}}},admin:{groups:{create:function(){return"".concat(r,"/groups")},getAll:function(){return"".concat(r,"/groups")}}},license:{get:function(){return"".concat(r,"/license")},createCandidateLicense:function(){return"".concat(r,"/license")}},info:{info:function(){return"".concat(r,"/info")},health:function(){return"".concat(r,"/health")}}};t.a=c},61:function(e,t,n){"use strict";var r=n(63),c=n(51),o=n(62),a=n(49),s=n(57),i=n(13);t.a=function e(t){var n,l,u=t.url,d=t.method,b=t.body,f=t.groupName,j=t.headers,h=void 0===j?{}:j,p=t.queryParams,m=t.isMultipart,O=void 0!==m&&m,v=t.noHeaders,g=void 0!==v&&v,y=t.addGroupName,x=void 0===y||y,w=t.retries,S=void 0===w?0:w,N=t.isFile,C=void 0!==N&&N;(n=O?new Headers(Object(c.a)({},h)):new Headers(Object(c.a)({"content-type":"application/json",accept:"application/json"},h)),C&&(n=new Headers(Object(c.a)({},h))),x)&&n.append("groupName",f||Object(i.c)("currentGroup")||(null===(l=Object(i.c)("user"))||void 0===l?void 0:l.default_group));g&&(n={});var F={method:d,headers:n,body:b},k=u;return F.body=b?O?b:JSON.stringify(b):null,p&&(k="".concat(u,"?").concat(Object(o.stringify)(p))),fetch(k,F).then((function(t){if(t.ok){var n,c=Object(r.a)(t.headers.entries());try{for(c.s();!(n=c.n()).done;){var o=n.value;"x-total-pages"===o[0]&&Object(i.h)("pages",o[1])}}catch(l){c.e(l)}finally{c.f()}return C?t:t.json()}return S>0?setTimeout((function(){e({url:u,method:d,headers:h,retries:S-1})}),1e4):t.json().then((function(e){var n={status:t.status,ok:!1,message:e.message,body:e};return 403===e.code?e.message?Object(a.e)({message:e.message}):Object(a.e)({message:s.a.forbiddenResource}):Promise.reject(n)}))}))}},63:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(23);function c(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=Object(r.a)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var c=0,o=function(){};return{s:o,n:function(){return c>=e.length?{done:!0}:{done:!1,value:e[c++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,i=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){i=!0,a=e},f:function(){try{s||null==n.return||n.return()}finally{if(i)throw a}}}}},64:function(e,t,n){"use strict";n.d(t,"f",(function(){return c})),n.d(t,"a",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"e",(function(){return s})),n.d(t,"d",(function(){return i})),n.d(t,"b",(function(){return l}));var r=n(63),c=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,c=0;c<e;c++)t+=n.charAt(Math.floor(Math.random()*r));return t},o=function(e){return Date.prototype.addDays=function(e){var t=new Date(this.valueOf());return t.setDate(t.getDate()+e),t},(new Date).addDays(e).toISOString().split("T")[0]},a=function(e){if(!e)return e;var t=e.split(" ");return 1===t.length?t[0].substring(0,2).toUpperCase():t.map((function(e,t){return t<3?e[0]:null})).join("").toUpperCase()},s=function(e,t){window.scrollTo({top:0}),t({type:"danger",text:e.message})},i=function(e){var t=e.match(/report\/([0-9]+)/);return null!=t?t[1]:null},l=function(e){var t,n=e.split(";"),c="download.txt",o=Object(r.a)(n);try{for(o.s();!(t=o.n()).done;){var a=t.value.trim().match(/filename="(.*)"/);if(null!=a){c=a[1];break}}}catch(s){o.e(s)}finally{o.f()}return c}},96:function(e,t,n){"use strict";n(0);var r=n(3),c=n(24),o=n(234),a=n(2),s=n(49),i=n(1);t.a=function(){var e=Object(r.h)();return Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)(o.a,{expand:"lg",className:"py-0 pl-0 mt-3 bg-browse-uploads-header",children:[Object(i.jsx)(o.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(i.jsx)(o.a.Collapse,{id:"basic-navbar-nav",children:Object(i.jsx)("div",{className:"ml-auto py-2",children:Object(s.d)()&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(c.b,{to:a.a.browseUploads.softwareHeritage,className:e.pathname===a.a.browseUploads.softwareHeritage?"active-browse-nav-item browse-uploads-nav-item":"browse-uploads-nav-item",children:"Software Heritage"}),Object(i.jsx)(c.b,{to:"".concat(a.a.browseUploads.licenseBrowser,"/uploadID=:uploadID"),className:e.pathname.includes(a.a.browseUploads.licenseBrowser)?"active-browse-nav-item browse-uploads-nav-item":"browse-uploads-nav-item",children:"License Browser"}),Object(i.jsx)(c.b,{to:a.a.browseUploads.fileBrowser,className:e.pathname===a.a.browseUploads.fileBrowser?"active-browse-nav-item browse-uploads-nav-item":"browse-uploads-nav-item",children:"File Browser"}),Object(i.jsx)(c.b,{to:a.a.browseUploads.copyright,className:e.pathname===a.a.browseUploads.copyright?"active-browse-nav-item browse-uploads-nav-item":"browse-uploads-nav-item",children:"Copyright Browser"}),Object(i.jsx)(c.b,{to:a.a.browseUploads.ecc,className:e.pathname===a.a.browseUploads.ecc?"active-browse-nav-item browse-uploads-nav-item":"browse-uploads-nav-item",children:"ECC"})]})})})]})})}},97:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"c",(function(){return d})),n.d(t,"b",(function(){return b})),n.d(t,"d",(function(){return f})),n.d(t,"f",(function(){return j})),n.d(t,"e",(function(){return h}));var r=n(51),c=n(9),o=n.n(c),a=n(60),s=n(49),i=n(61),l=function(e,t,n,r,c){var o=a.a.upload.uploadCreate(),l=new FormData;return c&&l.append("fileInput",c,null===c||void 0===c?void 0:c.name),Object(i.a)({url:o,method:"POST",isMultipart:!0,headers:{Authorization:Object(s.a)(),folderId:e,uploadDescription:t,public:n,ignoreScm:r,uploadType:""},body:l})};l.propTypes={folderId:o.a.number,uploadDescription:o.a.string,accessLevel:o.a.string,ignoreScm:o.a.bool,fileInput:o.a.string};var u=function(e){var t=e.folderId,n=e.uploadDescription,r=e.accessLevel,c=e.ignoreScm,o=e.fileInput;return l(t,n,r,c,o).then((function(e){return e}))},d=function(e,t){return function(e,t){var n=a.a.upload.uploadCreate();return Object(i.a)({url:n,method:"POST",headers:Object(r.a)(Object(r.a)({},e),{},{Authorization:Object(s.a)()}),body:t})}(e,t).then((function(e){return e}))},b=function(e,t){return function(e,t){var n=a.a.upload.uploadCreate();return Object(i.a)({url:n,method:"POST",headers:Object(r.a)(Object(r.a)({},e),{},{Authorization:Object(s.a)()}),body:t})}(e,t).then((function(e){return e}))},f=function(e,t){return function(e,t){var n=a.a.upload.getId(e);return Object(i.a)({url:n,method:"GET",retries:t,headers:{Authorization:Object(s.a)()}})}(e,t).then((function(e){return e}))},j=function(e){return function(e){var t=a.a.upload.getSummary(e);return Object(i.a)({url:t,method:"GET",headers:{Authorization:Object(s.a)()}})}(e).then((function(e){return e}))},h=function(e,t){return function(e,t){var n=a.a.upload.getLicense(e);return Object(i.a)({url:n,method:"GET",headers:{Authorization:Object(s.a)()},queryParams:{agent:t}})}(e,t).then((function(e){return e}))}},99:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(16);var c=n(23);function o(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=20.2e9f4164.chunk.js.map