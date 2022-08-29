(this.webpackJsonpfossologyui=this.webpackJsonpfossologyui||[]).push([[30],{224:function(e,t,n){"use strict";n.r(t);var c=n(57),o=n(52),r=n(21),a=n(0),i=n(58),s=n(53),u=n(51),l=n(70),d=n(66),f=n(1);t.default=function(){var e=Object(a.useState)({name:"",description:"",id:1}),t=Object(r.a)(e,2),n=t[0],h=t[1],p=Object(a.useState)([{id:1,name:"Software Repository",description:"Top Folder",parent:null}]),b=Object(r.a)(p,2),m=b[0],j=b[1],g=Object(a.useState)(!1),O=Object(r.a)(g,2),v=O[0],y=O[1],x=Object(a.useState)(!1),w=Object(r.a)(x,2),S=w[0],N=w[1],C=Object(a.useState)({type:"success",text:""}),F=Object(r.a)(C,2),k=F[0],D=F[1],A=n.name,T=n.description,z=n.id,M=function(e){h(Object(o.a)(Object(o.a)({},n),{},Object(c.a)({},e.target.name,e.target.value)))};return Object(a.useEffect)((function(){Object(l.e)().then((function(e){j(e)})).catch((function(e){Object(d.e)(e,D),N(!0)}))}),[]),Object(a.useEffect)((function(){Object(l.f)(z).then((function(e){h(e)})).catch((function(e){Object(d.e)(e,D),N(!0)}))}),[z]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(s.a,{title:"Edit Folder Properties"}),Object(f.jsxs)("div",{className:"main-container my-3",children:[S&&Object(f.jsx)(u.a,{type:k.type,setShow:N,message:k.text}),Object(f.jsx)("h1",{className:"font-size-main-heading",children:"Edit Folder Properties"}),Object(f.jsx)("br",{}),Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-12 col-lg-8",children:[Object(f.jsx)("p",{children:"The folder properties that can be changed are the folder name and description. First select the folder to edit. Then enter the new values. If no value is entered, then the corresponding field will not be changed."}),Object(f.jsxs)("form",{children:[Object(f.jsx)(u.c,{type:"select",name:"id",id:"organize-folder-edit-id",onChange:M,options:m,value:z,property:"name",children:"Select the folder to edit:"}),Object(f.jsx)(u.c,{type:"text",name:"name",id:"organize-folder-edit-name",onChange:M,placeholder:"Folder name",value:A,children:"Change the folder name:"}),Object(f.jsx)(u.c,{type:"text",name:"description",id:"organize-folder-edit-description",onChange:M,placeholder:"Folder description",value:T,children:"Change the folder description:"}),Object(f.jsx)(u.b,{type:"submit",onClick:function(e){e.preventDefault(),y(!0),Object(l.d)(n).then((function(){D({type:"success",text:i.a.updatedFolderProps})})).catch((function(e){Object(d.e)(e,D)})).finally((function(){y(!1),N(!0)}))},className:"mt-4",children:v?Object(f.jsx)(u.d,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"}):"Edit"})]})]})})]})]})}},50:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"e",(function(){return i})),n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return l}));var c=n(63),o=n(2),r=n(13),a=function(){if("undefined"!==typeof window&&Object(r.b)("token"))return!(!localStorage.getItem("user")||!localStorage.getItem("groups"));return!1},i=function(e){Object(r.e)("token"),Object(r.f)("user"),Object(r.f)("groups"),Object(r.f)("currentGroup");var t=o.a.home;e&&(t="".concat(o.a.home,"?").concat(Object(c.stringify)(e))),window.location.href=t},s=function(){return Object(r.b)("token")},u=function(){return Object(r.c)("user").name},l=function(){var e;return"admin"===(null===(e=Object(r.c)("user"))||void 0===e?void 0:e.accessLevel)}},51:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return l.a})),n.d(t,"e",(function(){return d})),n.d(t,"d",(function(){return o.a}));var c,o=n(60),r=(n(0),n(1)),a=function(e){var t=e.message,n=e.type,c=e.setShow;return Object(r.jsx)("div",{className:"main-container d-flex justify-content-end mt-3",children:Object(r.jsx)("div",{className:"alert bg-".concat(n," alert-dismissible fade show font-medium text-white alert-fix-position"),role:"alert",children:Object(r.jsxs)("div",{className:"d-flex",children:["danger"===n&&Object(r.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mr-3",children:[Object(r.jsx)("path",{d:"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z",fill:"white"}),Object(r.jsx)("path",{d:"M14.5 25H17.5V22H14.5V25ZM14.5 6V19H17.5V6H14.5Z",fill:"#DC4146"})]}),"success"===n&&Object(r.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mr-3",children:[Object(r.jsx)("path",{d:"M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z",fill:"white"}),Object(r.jsx)("path",{d:"M38 15L22 33L12 25",stroke:"#28A745",strokeWidth:"2",strokeMiterlimit:"10",strokeLinecap:"round",strokeLinejoin:"round"})]}),t,Object(r.jsx)("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close",onClick:function(){return c(!1)},children:Object(r.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]})})})},i=n(22),s=n(11).d.button(c||(c=Object(i.a)(["\n    border: none;\n    border-radius: 0.5rem;\n    padding: 0.5rem 3rem;\n    transition: all 0.5s ease-in;\n"]))),u=function(e){var t=e.type,n=e.onClick,c=e.className,o=e.children,a=e.dataDismiss,i=e.dataToggle,u=e.dataTarget,l=e.disabled,d=void 0!==l&&l;return Object(r.jsx)(s,{type:t,onClick:n,"data-toggle":i,"data-dismiss":a,"data-target":u,className:"bg-primary-color text-secondary-color font-demi text-center hover-primary-color ".concat(c),disabled:d,children:o})},l=(n(55),n(54)),d=function(e){var t=e.title;return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("button",{type:"button",className:"d-inline-block btn px-0 mt-n2","data-toggle":"tooltip","data-placement":"top",title:t,children:Object(r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle-fill text-primary-color",viewBox:"0 0 16 16",children:Object(r.jsx)("path",{d:"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"})})})})}},53:function(e,t,n){"use strict";n(0);var c=n(69),o=n(1);t.a=function(e){var t=e.title;return Object(o.jsx)(c.a,{children:Object(o.jsxs)("title",{children:[t," | FOSSology"]})})}},54:function(e,t,n){"use strict";n(0);var c=n(1);t.a=function(e){var t=e.type,n=e.name,o=e.value,r=e.id,a=e.className,i=e.onChange,s=e.children,u=e.checked,l=void 0!==u&&u,d=e.placeholder,f=void 0===d?null:d,h=e.disabled,p=void 0!==h&&h,b=e.options,m=void 0===b?null:b,j=e.multiple,g=void 0!==j&&j,O=e.property,v=e.valueProperty,y=e.noDataMessage,x=void 0===y?"No Data Found":y;return"radio"===t||"checkbox"===t?Object(c.jsxs)("div",{className:"my-0",children:[Object(c.jsx)("input",{type:t,name:n,value:o,className:a&&"mr-2 ".concat(a),onChange:i,checked:l,disabled:p,id:r}),Object(c.jsx)("label",{htmlFor:r,className:"font-medium ml-2",children:s})]}):"select"===t?Object(c.jsxs)("div",{className:"my-0 py-0",children:[s&&Object(c.jsx)("label",{htmlFor:r,className:"font-demi",children:s}),"\u2003",Object(c.jsx)("select",{name:n,className:a?"mr-2 form-control ".concat(a):"mr-2 form-control",value:o,onChange:i,multiple:g&&g,size:g?"15":"",id:r,children:m.length>0?m.map((function(e,t){return Object(c.jsx)("option",{value:v?e[v]:e.id,disabled:e.disabled,children:O?e[O]:e},e.id||t)})):Object(c.jsx)("option",{className:"font-demi",disabled:!0,children:x})})]}):Object(c.jsxs)("div",{className:"my-2",children:[Object(c.jsx)("label",{htmlFor:r,className:"font-demi",children:s}),Object(c.jsx)("input",{type:t,name:n,value:o,className:"file"===t?"ml-3 ".concat(a):"form-control ".concat(a),onChange:i,checked:l,placeholder:f,id:r})]})}},55:function(e,t,n){"use strict";n(0);var c=n(1);t.a=function(e){var t=e.src,n=e.alt,o=e.style,r=e.className,a=e.width,i=e.height,s=e.align;return Object(c.jsx)("img",{src:t,alt:n,style:o,className:r,width:a,height:i,align:s})}},58:function(e,t,n){"use strict";t.a={forbiddenResource:"Requested resource is forbidden",noGroup:"No Group Found",noFolder:"No Folder Found",noUploads:"No Uploads Found",noPageShort:"Error: Page Not Found!",noPageLong:"We could not find the page you were searching for",groupCreate:"Successfully created the group",deletedGroup:"Successfully deleted the group",deletedUser:"Successfully deleted the user",addedUser:"Successfully added the user",confirmDeletion:"Deletion not confirmed",loading:"Loading...",jobsAdded:"Your jobs have been added to job queue",createdFolder:"Successfully created the folder",deletedFolder:"Successfully deleted the folder",updatedFolderProps:"Successfully updated the folder properties",movedFolder:"Successfully moved the folder",copiedFolder:"Successfully copied the folder",unlinkedFolder:"Successfully unlinked the folder",createdLicense:"Successfully created the license",scheduleUploadDeletion:"Successfully scheduled selected uploads for deletion",selectUploadsToDelete:"Select the uploads to delete",scheduleUploadMovement:"Successfully scheduled the selected uploads movement",selectUploadsToMove:"Select the uploads to move",scheduledUploadCopy:"Successfully scheduled the selected uploads for copy",selectUploadsToCopy:"Select the uploads to copy",uploadSuccess:"Successfully uploaded the files",scheduledAnalysis:"Analysis for the file is scheduled",queuedUpload:"The upload has been queued its upload id is"}},61:function(e,t,n){"use strict";var c="".concat("http","://").concat("localhost/repo/api/v2"),o={jobs:{details:function(e){return"".concat(c,"/jobs/").concat(e)},scheduleAnalysis:function(){return"".concat(c,"/jobs")},allJobs:function(){return"".concat(c,"/jobs/all")},scheduleReport:function(){return"".concat(c,"/report")},downloadReport:function(e){return"".concat(c,"/report/").concat(e)}},auth:{tokens:function(){return"".concat(c,"/tokens")}},search:{search:function(){return"".concat(c,"/search")}},users:{self:function(){return"".concat(c,"/users/self")},getAll:function(){return"".concat(c,"/users")},getSingle:function(e){return"".concat(c,"/users/").concat(e)},delete:function(e){return"".concat(c,"/users/").concat(e)},add:function(){return"".concat(c,"/users")}},folders:{getAll:function(){return"".concat(c,"/folders")},getSingle:function(e){return"".concat(c,"/folders/").concat(e)},create:function(){return"".concat(c,"/folders")},read:function(e){return"".concat(c,"/folders/").concat(e)},edit:function(e){return"".concat(c,"/folders/").concat(e)},delete:function(e){return"".concat(c,"/folders/").concat(e)},move:function(e){return"".concat(c,"/folders/").concat(e)}},upload:{uploadCreate:function(){return"".concat(c,"/uploads")},getId:function(e){return"".concat(c,"/uploads/").concat(e)},getSummary:function(e){return"".concat(c,"/uploads/").concat(e,"/summary")},getLicense:function(e){return"".concat(c,"/uploads/").concat(e,"/licenses")}},browse:{get:function(){return"".concat(c,"/uploads")}},organize:{uploads:{get:function(){return"".concat(c,"/uploads")},delete:function(e){return"".concat(c,"/uploads/").concat(e)},move:function(e){return"".concat(c,"/uploads/").concat(e)},copy:function(e){return"".concat(c,"/uploads/").concat(e)}}},admin:{groups:{create:function(){return"".concat(c,"/groups")},getAll:function(){return"".concat(c,"/groups")},getAllDeletable:function(){return"".concat(c,"/groups/deletable")},delete:function(e){return"".concat(c,"/groups/").concat(e)}}},license:{get:function(){return"".concat(c,"/license")},createCandidateLicense:function(){return"".concat(c,"/license")}},info:{info:function(){return"".concat(c,"/info")},health:function(){return"".concat(c,"/health")}}};t.a=o},62:function(e,t,n){"use strict";var c=n(64),o=n(52),r=n(63),a=n(50),i=n(58),s=n(13);t.a=function e(t){var n,u,l=t.url,d=t.method,f=t.body,h=t.groupName,p=t.headers,b=void 0===p?{}:p,m=t.queryParams,j=t.isMultipart,g=void 0!==j&&j,O=t.noHeaders,v=void 0!==O&&O,y=t.addGroupName,x=void 0===y||y,w=t.retries,S=void 0===w?0:w,N=t.isFile,C=void 0!==N&&N;(n=g?new Headers(Object(o.a)({},b)):new Headers(Object(o.a)({"content-type":"application/json",accept:"application/json"},b)),C&&(n=new Headers(Object(o.a)({},b))),x)&&n.append("groupName",h||Object(s.c)("currentGroup")||(null===(u=Object(s.c)("user"))||void 0===u?void 0:u.default_group));v&&(n={});var F={method:d,headers:n,body:f},k=l;return F.body=f?g?f:JSON.stringify(f):null,m&&(k="".concat(l,"?").concat(Object(r.stringify)(m))),fetch(k,F).then((function(t){if(t.ok){var n,o=Object(c.a)(t.headers.entries());try{for(o.s();!(n=o.n()).done;){var r=n.value;"x-total-pages"===r[0]&&Object(s.h)("pages",r[1])}}catch(u){o.e(u)}finally{o.f()}return C?t:t.json()}return S>0?setTimeout((function(){e({url:l,method:d,headers:b,retries:S-1})}),1e4):t.json().then((function(e){var n={status:t.status,ok:!1,message:e.message,body:e};return 403===e.code?e.message?Object(a.e)({message:e.message}):Object(a.e)({message:i.a.forbiddenResource}):Promise.reject(n)}))}))}},66:function(e,t,n){"use strict";n.d(t,"f",(function(){return o})),n.d(t,"a",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"e",(function(){return i})),n.d(t,"d",(function(){return s})),n.d(t,"b",(function(){return u}));var c=n(64),o=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=n.length,o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*c));return t},r=function(e){return Date.prototype.addDays=function(e){var t=new Date(this.valueOf());return t.setDate(t.getDate()+e),t},(new Date).addDays(e).toISOString().split("T")[0]},a=function(e){if(!e)return e;var t=e.split(" ");return 1===t.length?t[0].substring(0,2).toUpperCase():t.map((function(e,t){return t<3?e[0]:null})).join("").toUpperCase()},i=function(e,t){window.scrollTo({top:0}),t({type:"danger",text:e.message})},s=function(e){var t=e.match(/report\/([0-9]+)/);return null!=t?t[1]:null},u=function(e){var t,n=e.split(";"),o="download.txt",r=Object(c.a)(n);try{for(r.s();!(t=r.n()).done;){var a=t.value.trim().match(/filename="(.*)"/);if(null!=a){o=a[1];break}}}catch(i){r.e(i)}finally{r.f()}return o}},70:function(e,t,n){"use strict";n.d(t,"e",(function(){return i})),n.d(t,"f",(function(){return s})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return l})),n.d(t,"d",(function(){return d})),n.d(t,"g",(function(){return f})),n.d(t,"a",(function(){return h}));var c=n(61),o=n(50),r=n(62),a=function(e,t,n){var a=c.a.folders.move(t);return Object(r.a)({url:a,method:"PUT",headers:{Authorization:Object(o.a)(),parent:e,action:n}})},i=function(e){return function(e){var t=c.a.folders.getAll();return Object(r.a)({url:t,method:"GET",headers:{Authorization:Object(o.a)()},groupName:e})}(e).then((function(e){return e}))},s=function(e){return function(e){var t=c.a.folders.getSingle(e);return Object(r.a)({url:t,method:"GET",headers:{Authorization:Object(o.a)()}})}(e).then((function(e){return e}))},u=function(e){return function(e){var t=c.a.folders.delete(e);return Object(r.a)({url:t,method:"DELETE",headers:{Authorization:Object(o.a)()}})}(e.id).then((function(e){return e}))},l=function(e){return function(e,t,n){var a=c.a.folders.create();return Object(r.a)({url:a,method:"POST",headers:{Authorization:Object(o.a)(),parentFolder:e,folderName:t,folderDescription:n}})}(e.parentFolder,e.folderName,e.folderDescription).then((function(e){return e}))},d=function(e){return function(e,t,n){var a=c.a.folders.edit(n);return Object(r.a)({url:a,method:"PATCH",headers:{Authorization:Object(o.a)(),name:e,description:t}})}(e.name,e.description,e.id).then((function(e){return e}))},f=function(e){var t=e.parent,n=e.id;return a(t,n,"move").then((function(e){return e}))},h=function(e){var t=e.parent,n=e.id;return a(t,n,"copy").then((function(e){return e}))}}}]);
//# sourceMappingURL=30.aee48ff5.chunk.js.map