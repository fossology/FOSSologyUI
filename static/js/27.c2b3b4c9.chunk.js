(this.webpackJsonpfossologyui=this.webpackJsonpfossologyui||[]).push([[27],{102:function(e,t,n){"use strict";n.d(t,"h",(function(){return i})),n.d(t,"a",(function(){return l})),n.d(t,"e",(function(){return d})),n.d(t,"g",(function(){return f})),n.d(t,"d",(function(){return h})),n.d(t,"c",(function(){return b})),n.d(t,"f",(function(){return p})),n.d(t,"b",(function(){return j}));var o=n(103),c=n(59),r=n(50),a=n(60),s=function(){var e=c.a.users.getAll();return Object(a.a)({url:e,method:"GET",headers:{Authorization:Object(r.a)()}})},u=n(13),i=function(){return function(){var e=c.a.users.self();return Object(a.a)({url:e,method:"GET",headers:{Authorization:Object(r.a)()},addGroupName:!1})}().then((function(e){return Object(u.h)("user",e),Object(u.h)("currentGroup",e.default_group),e}))},l=function(e){return function(e){var t=c.a.users.add();return Object(a.a)({url:t,method:"POST",headers:{Authorization:Object(r.a)()},body:e})}(e).then((function(e){return e}))},d=function(){return s().then((function(e){var t=[];return e.forEach((function(e){t.push({id:null===e||void 0===e?void 0:e.id,name:null===e||void 0===e?void 0:e.name})})),t}))},f=function(e){return function(e){var t=c.a.users.getSingle(e);return Object(a.a)({url:t,method:"GET",headers:{Authorization:Object(r.a)()}})}(e).then((function(e){return e}))},h=function(e,t){return function(e,t){var n=c.a.users.edit(e);return Object(a.a)({url:n,method:"PUT",body:t,headers:{Authorization:Object(r.a)()}})}(e,t).then((function(e){return e}))},b=function(e){return function(e){var t=c.a.users.delete(e);return Object(a.a)({url:t,method:"DELETE",headers:{Authorization:Object(r.a)()}})}(e).then((function(e){return e}))},p=function(e){return function(e){var t=c.a.users.getTokens(e);return Object(a.a)({url:t,method:"GET",headers:{Authorization:Object(r.a)()}})}(e).then((function(e){return e}))},j=function(e){return Object(o.a)(e.username,e.password,e).then((function(e){return e}))}},103:function(e,t,n){"use strict";var o=n(59),c=Object({NODE_ENV:"production",PUBLIC_URL:"/FOSSologyUI",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_HTTPS:"false",REACT_APP_SERVER_URL:"localhost/repo/api/v2"}).TOKEN_NAME_LENGTH||40,r=Object({NODE_ENV:"production",PUBLIC_URL:"/FOSSologyUI",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_HTTPS:"false",REACT_APP_SERVER_URL:"localhost/repo/api/v2"}).TOKEN_SCOPE||"write",a=Object({NODE_ENV:"production",PUBLIC_URL:"/FOSSologyUI",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_HTTPS:"false",REACT_APP_SERVER_URL:"localhost/repo/api/v2"}).TOKEN_EXPIRY_DAYS||2,s=n(65),u=n(60);t.a=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=o.a.auth.tokens();return Object(u.a)({url:i,method:"POST",body:n||{username:e,password:t,token_name:Object(s.f)(c),token_scope:r,token_expire:Object(s.a)(a)},addGroupName:!1})}},236:function(e,t,n){"use strict";n.r(t);var o=n(57),c=n(52),r=n(21),a=n(0),s=n(58),u=n(53),i=n(51),l=n(102),d=n(65),f=n(1);t.default=function(){var e=Object(a.useState)({id:0,confirm:!1}),t=Object(r.a)(e,2),n=t[0],h=t[1],b=Object(a.useState)([{id:0,name:"string",disabled:!1}]),p=Object(r.a)(b,2),j=p[0],m=p[1],O=Object(a.useState)(!1),g=Object(r.a)(O,2),v=g[0],y=g[1],S=Object(a.useState)(!1),x=Object(r.a)(S,2),T=x[0],w=x[1],E=Object(a.useState)({type:"success",text:""}),_=Object(r.a)(E,2),N=_[0],C=_[1],A=n.id,k=n.confirm,D=function(e){"checkbox"===e.target.type?h(Object(c.a)(Object(c.a)({},n),{},Object(o.a)({},e.target.name,e.target.checked))):h(Object(c.a)(Object(c.a)({},n),{},Object(o.a)({},e.target.name,e.target.value)))},P=function(e){var t=e.map((function(e){return Object(c.a)(Object(c.a)({},e),{},{disabled:!("fossy"!==e.name&&"Default User"!==e.name)})}));m(t),t=t.filter((function(e){return"fossy"!==e.name&&"Default User"!==e.name})),h(Object(c.a)(Object(c.a)({},n),{},{id:t.length?t[0].id:0}))};return Object(a.useEffect)((function(){Object(l.e)().then((function(e){P(e)})).catch((function(e){Object(d.e)(e,C),w(!0)}))}),[]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(u.a,{title:"Delete A User"}),Object(f.jsxs)("div",{className:"main-container my-3",children:[T&&Object(f.jsx)(i.a,{type:N.type,setShow:w,message:N.text}),Object(f.jsx)("h1",{className:"font-size-main-heading",children:"Delete A User"}),Object(f.jsx)("br",{}),Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col-12 col-lg-8",children:[Object(f.jsxs)("p",{children:["Deleting a user removes the user entry from the FOSSology system. The user's name, account information, and password will be permanently removed. (There is no 'undo' to this delete.)",Object(f.jsx)("br",{}),"To delete a user, enter the following information:"]}),Object(f.jsxs)("form",{children:[Object(f.jsx)(i.c,{type:"select",name:"id",id:"admin-users-delete-id",onChange:D,options:j,value:A,property:"name",children:"Select the user to delete:"}),Object(f.jsx)(i.c,{type:"checkbox",checked:k,name:"confirm",id:"admin-users-delete-confirm",onChange:D,children:"Confirm user deletion"}),Object(f.jsx)(i.b,{type:"submit",onClick:function(e){e.preventDefault(),k?(y(!0),Object(l.c)(A).then((function(){C({type:"success",text:s.a.deletedUser})})).then((function(){Object(l.e)().then((function(e){P(e)}))})).catch((function(e){if(0===A){var t=new Error("Default users cannot be deleted");Object(d.e)(t,C)}else Object(d.e)(e,C)})).finally((function(){y(!1),w(!0)}))):(C({type:"danger",text:s.a.confirmDeletion}),w(!0))},className:"mt-4",children:v?Object(f.jsx)(i.d,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"}):"Delete"})]})]})})]})]})}},50:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return l}));var o=n(63),c=n(2),r=n(13),a=function(){if("undefined"!==typeof window&&Object(r.b)("token"))return!(!localStorage.getItem("user")||!localStorage.getItem("groups"));return!1},s=function(e){Object(r.e)("token"),Object(r.f)("user"),Object(r.f)("groups"),Object(r.f)("currentGroup");var t=c.a.home;e&&(t="".concat(c.a.home,"?").concat(Object(o.stringify)(e))),window.location.href=t},u=function(){return Object(r.b)("token")},i=function(){return Object(r.c)("user").name},l=function(){var e;return"admin"===(null===(e=Object(r.c)("user"))||void 0===e?void 0:e.accessLevel)}},51:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return l.a})),n.d(t,"e",(function(){return d})),n.d(t,"d",(function(){return c.a}));var o,c=n(62),r=(n(0),n(1)),a=function(e){var t=e.message,n=e.type,o=e.setShow;return Object(r.jsx)("div",{className:"main-container d-flex justify-content-end mt-3",children:Object(r.jsx)("div",{className:"alert bg-".concat(n," alert-dismissible fade show font-medium text-white alert-fix-position"),role:"alert",children:Object(r.jsxs)("div",{className:"d-flex",children:["danger"===n&&Object(r.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mr-3",children:[Object(r.jsx)("path",{d:"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z",fill:"white"}),Object(r.jsx)("path",{d:"M14.5 25H17.5V22H14.5V25ZM14.5 6V19H17.5V6H14.5Z",fill:"#DC4146"})]}),"success"===n&&Object(r.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mr-3",children:[Object(r.jsx)("path",{d:"M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z",fill:"white"}),Object(r.jsx)("path",{d:"M38 15L22 33L12 25",stroke:"#28A745",strokeWidth:"2",strokeMiterlimit:"10",strokeLinecap:"round",strokeLinejoin:"round"})]}),t,Object(r.jsx)("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close",onClick:function(){return o(!1)},children:Object(r.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]})})})},s=n(22),u=n(11).d.button(o||(o=Object(s.a)(["\n    border: none;\n    border-radius: 0.5rem;\n    padding: 0.5rem 3rem;\n    transition: all 0.5s ease-in;\n"]))),i=function(e){var t=e.type,n=e.onClick,o=e.className,c=e.children,a=e.dataDismiss,s=e.dataToggle,i=e.dataTarget,l=e.disabled,d=void 0!==l&&l;return Object(r.jsx)(u,{type:t,onClick:n,"data-toggle":s,"data-dismiss":a,"data-target":i,className:"bg-primary-color text-secondary-color font-demi text-center hover-primary-color ".concat(o),disabled:d,children:c})},l=(n(55),n(54)),d=function(e){var t=e.title;return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("button",{type:"button",className:"d-inline-block btn px-0 mt-n2","data-toggle":"tooltip","data-placement":"top",title:t,children:Object(r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle-fill text-primary-color",viewBox:"0 0 16 16",children:Object(r.jsx)("path",{d:"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"})})})})}},53:function(e,t,n){"use strict";n(0);var o=n(69),c=n(1);t.a=function(e){var t=e.title;return Object(c.jsx)(o.a,{children:Object(c.jsxs)("title",{children:[t," | FOSSology"]})})}},54:function(e,t,n){"use strict";n(0);var o=n(1);t.a=function(e){var t=e.type,n=e.name,c=e.value,r=e.id,a=e.className,s=e.onChange,u=e.children,i=e.checked,l=void 0!==i&&i,d=e.placeholder,f=void 0===d?null:d,h=e.disabled,b=void 0!==h&&h,p=e.options,j=void 0===p?null:p,m=e.multiple,O=void 0!==m&&m,g=e.property,v=e.valueProperty,y=e.noDataMessage,S=void 0===y?"No Data Found":y;return"radio"===t||"checkbox"===t?Object(o.jsxs)("div",{className:"my-0",children:[Object(o.jsx)("input",{type:t,name:n,value:c,className:a&&"mr-2 ".concat(a),onChange:s,checked:l,disabled:b,id:r}),Object(o.jsx)("label",{htmlFor:r,className:"font-medium ml-2",children:u})]}):"select"===t?Object(o.jsxs)("div",{className:"my-1 py-0",children:[u&&Object(o.jsx)("label",{htmlFor:r,className:"font-demi",children:u}),"\u2003",Object(o.jsx)("select",{name:n,className:a?"mr-2 form-control ".concat(a):"mr-2 form-control",value:c,onChange:s,multiple:O&&O,size:O?"15":"",id:r,children:j.length>0?j.map((function(e,t){return Object(o.jsx)("option",{value:v?e[v]:e.id,disabled:e.disabled,children:g?e[g]:e},e.id||t)})):Object(o.jsx)("option",{className:"font-demi",disabled:!0,children:S})})]}):Object(o.jsxs)("div",{className:"my-2",children:[Object(o.jsx)("label",{htmlFor:r,className:"font-demi",children:u}),Object(o.jsx)("input",{type:t,name:n,value:c,className:"file"===t?"ml-3 ".concat(a):"form-control ".concat(a),onChange:s,checked:l,placeholder:f,id:r})]})}},55:function(e,t,n){"use strict";n(0);var o=n(1);t.a=function(e){var t=e.src,n=e.alt,c=e.style,r=e.className,a=e.width,s=e.height,u=e.align;return Object(o.jsx)("img",{src:t,alt:n,style:c,className:r,width:a,height:s,align:u})}},58:function(e,t,n){"use strict";t.a={forbiddenResource:"Requested resource is forbidden",noGroup:"No Group Found",noFolder:"No Folder Found",noUploads:"No Uploads Found",noPageShort:"Error: Page Not Found!",noPageLong:"We could not find the page you were searching for",groupCreate:"Successfully created the group",deletedGroup:"Successfully deleted the group",deletedUser:"Successfully deleted the user",addedUser:"Successfully added the user",confirmDeletion:"Deletion not confirmed",loading:"Loading...",jobsAdded:"Your jobs have been added to job queue",createdFolder:"Successfully created the folder",deletedFolder:"Successfully deleted the folder",updatedFolderProps:"Successfully updated the folder properties",movedFolder:"Successfully moved the folder",copiedFolder:"Successfully copied the folder",unlinkedFolder:"Successfully unlinked the folder",createdLicense:"Successfully created the license",scheduleUploadDeletion:"Successfully scheduled selected uploads for deletion",selectUploadsToDelete:"Select the uploads to delete",scheduleUploadMovement:"Successfully scheduled the selected uploads movement",selectUploadsToMove:"Select the uploads to move",scheduledUploadCopy:"Successfully scheduled the selected uploads for copy",selectUploadsToCopy:"Select the uploads to copy",uploadSuccess:"Successfully uploaded the files",scheduledAnalysis:"Analysis for the file is scheduled",queuedUpload:"The upload has been queued its upload id is"}},59:function(e,t,n){"use strict";var o="".concat("http","://").concat("localhost/repo/api/v2"),c={jobs:{details:function(e){return"".concat(o,"/jobs/").concat(e)},scheduleAnalysis:function(){return"".concat(o,"/jobs")},allJobs:function(){return"".concat(o,"/jobs/all")},scheduleReport:function(){return"".concat(o,"/report")},downloadReport:function(e){return"".concat(o,"/report/").concat(e)}},auth:{tokens:function(){return"".concat(o,"/tokens")}},search:{search:function(){return"".concat(o,"/search")}},users:{self:function(){return"".concat(o,"/users/self")},getAll:function(){return"".concat(o,"/users")},getSingle:function(e){return"".concat(o,"/users/").concat(e)},delete:function(e){return"".concat(o,"/users/").concat(e)},add:function(){return"".concat(o,"/users")},edit:function(e){return"".concat(o,"/users/").concat(e)},createToken:function(){return"".concat(o,"/users/tokens")},getTokens:function(e){return"".concat(o,"/users/tokens/").concat(e)}},folders:{getAll:function(){return"".concat(o,"/folders")},getSingle:function(e){return"".concat(o,"/folders/").concat(e)},create:function(){return"".concat(o,"/folders")},read:function(e){return"".concat(o,"/folders/").concat(e)},edit:function(e){return"".concat(o,"/folders/").concat(e)},delete:function(e){return"".concat(o,"/folders/").concat(e)},move:function(e){return"".concat(o,"/folders/").concat(e)}},upload:{uploadCreate:function(){return"".concat(o,"/uploads")},getId:function(e){return"".concat(o,"/uploads/").concat(e)},getSummary:function(e){return"".concat(o,"/uploads/").concat(e,"/summary")},getLicense:function(e){return"".concat(o,"/uploads/").concat(e,"/licenses")}},browse:{get:function(){return"".concat(o,"/uploads")}},organize:{uploads:{get:function(){return"".concat(o,"/uploads")},delete:function(e){return"".concat(o,"/uploads/").concat(e)},move:function(e){return"".concat(o,"/uploads/").concat(e)},copy:function(e){return"".concat(o,"/uploads/").concat(e)}}},admin:{groups:{create:function(){return"".concat(o,"/groups")},getAll:function(){return"".concat(o,"/groups")},getAllDeletable:function(){return"".concat(o,"/groups/deletable")},delete:function(e){return"".concat(o,"/groups/").concat(e)}}},license:{get:function(){return"".concat(o,"/license")},createCandidateLicense:function(){return"".concat(o,"/license")}},info:{info:function(){return"".concat(o,"/info")},health:function(){return"".concat(o,"/health")}}};t.a=c},60:function(e,t,n){"use strict";var o=n(64),c=n(52),r=n(63),a=n(50),s=n(58),u=n(13);t.a=function e(t){var n,i,l=t.url,d=t.method,f=t.body,h=t.groupName,b=t.headers,p=void 0===b?{}:b,j=t.queryParams,m=t.isMultipart,O=void 0!==m&&m,g=t.noHeaders,v=void 0!==g&&g,y=t.addGroupName,S=void 0===y||y,x=t.retries,T=void 0===x?0:x,w=t.isFile,E=void 0!==w&&w;(n=O?new Headers(Object(c.a)({},p)):new Headers(Object(c.a)({"content-type":"application/json",accept:"application/json"},p)),E&&(n=new Headers(Object(c.a)({},p))),S)&&n.append("groupName",h||Object(u.c)("currentGroup")||(null===(i=Object(u.c)("user"))||void 0===i?void 0:i.default_group));v&&(n={});var _={method:d,headers:n,body:f},N=l;return _.body=f?O?f:JSON.stringify(f):null,j&&(N="".concat(l,"?").concat(Object(r.stringify)(j))),fetch(N,_).then((function(t){if(t.ok){var n,c=Object(o.a)(t.headers.entries());try{for(c.s();!(n=c.n()).done;){var r=n.value;"x-total-pages"===r[0]&&Object(u.h)("pages",r[1])}}catch(i){c.e(i)}finally{c.f()}return E?t:t.json()}return T>0?setTimeout((function(){e({url:l,method:d,headers:p,retries:T-1})}),1e4):t.json().then((function(e){var n={status:t.status,ok:!1,message:e.message,body:e};return 403===e.code?e.message?Object(a.e)({message:e.message}):Object(a.e)({message:s.a.forbiddenResource}):Promise.reject(n)}))}))}},65:function(e,t,n){"use strict";n.d(t,"f",(function(){return c})),n.d(t,"a",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"e",(function(){return s})),n.d(t,"d",(function(){return u})),n.d(t,"b",(function(){return i}));var o=n(64),c=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=n.length,c=0;c<e;c++)t+=n.charAt(Math.floor(Math.random()*o));return t},r=function(e){return Date.prototype.addDays=function(e){var t=new Date(this.valueOf());return t.setDate(t.getDate()+e),t},(new Date).addDays(e).toISOString().split("T")[0]},a=function(e){if(!e)return e;var t=e.split(" ");return 1===t.length?t[0].substring(0,2).toUpperCase():t.map((function(e,t){return t<3?e[0]:null})).join("").toUpperCase()},s=function(e,t){window.scrollTo({top:0}),t({type:"danger",text:e.message})},u=function(e){var t=e.match(/report\/([0-9]+)/);return null!=t?t[1]:null},i=function(e){var t,n=e.split(";"),c="download.txt",r=Object(o.a)(n);try{for(r.s();!(t=r.n()).done;){var a=t.value.trim().match(/filename="(.*)"/);if(null!=a){c=a[1];break}}}catch(s){r.e(s)}finally{r.f()}return c}}}]);
//# sourceMappingURL=27.c2b3b4c9.chunk.js.map