(this.webpackJsonpfossologyui=this.webpackJsonpfossologyui||[]).push([[38],{235:function(e,t,n){"use strict";n.r(t);var c=n(21),o=n(0),r=n(58),a=n(53),s=n(51),u=n(88),i=n(1);t.default=function(){var e=Object(o.useState)(""),t=Object(c.a)(e,2),n=t[0],l=t[1],d=Object(o.useState)(!1),f=Object(c.a)(d,2),h=f[0],p=f[1],m=Object(o.useState)(!1),b=Object(c.a)(m,2),j=b[0],g=b[1],v=Object(o.useState)({type:"success",text:""}),O=Object(c.a)(v,2),y=O[0],x=O[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(a.a,{title:"Add Group"}),Object(i.jsxs)("div",{className:"main-container my-3",children:[j&&Object(i.jsx)(s.a,{type:y.type,setShow:g,message:y.text}),Object(i.jsx)("h1",{className:"font-size-main-heading",children:"Add Group"}),Object(i.jsx)("br",{}),Object(i.jsx)("div",{className:"row",children:Object(i.jsx)("div",{className:"col-12 col-lg-8",children:Object(i.jsxs)("form",{children:[Object(i.jsx)(s.c,{type:"text",name:"name",id:"admin-group-add-name",onChange:function(e){l(e.target.value)},placeholder:"Group name",value:n,children:"Enter the groupname:"}),Object(i.jsx)(s.b,{type:"submit",onClick:function(e){e.preventDefault(),p(!0),Object(u.a)(n).then((function(){x({type:"success",text:r.a.groupCreate})})).catch((function(e){x({type:"danger",text:e.message})})).finally((function(){p(!1),g(!0)}))},className:"mt-4",children:h?Object(i.jsx)(s.d,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"}):"Add"})]})})})]})]})}},50:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return l}));var c=n(63),o=n(2),r=n(13),a=function(){if("undefined"!==typeof window&&Object(r.b)("token"))return!(!localStorage.getItem("user")||!localStorage.getItem("groups"));return!1},s=function(e){Object(r.e)("token"),Object(r.f)("user"),Object(r.f)("groups"),Object(r.f)("currentGroup");var t=o.a.home;e&&(t="".concat(o.a.home,"?").concat(Object(c.stringify)(e))),window.location.href=t},u=function(){return Object(r.b)("token")},i=function(){return Object(r.c)("user").name},l=function(){var e;return"admin"===(null===(e=Object(r.c)("user"))||void 0===e?void 0:e.accessLevel)}},51:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return l.a})),n.d(t,"e",(function(){return d})),n.d(t,"d",(function(){return o.a}));var c,o=n(62),r=(n(0),n(1)),a=function(e){var t=e.message,n=e.type,c=e.setShow;return Object(r.jsx)("div",{className:"main-container d-flex justify-content-end mt-3",children:Object(r.jsx)("div",{className:"alert bg-".concat(n," alert-dismissible fade show font-medium text-white alert-fix-position"),role:"alert",children:Object(r.jsxs)("div",{className:"d-flex",children:["danger"===n&&Object(r.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mr-3",children:[Object(r.jsx)("path",{d:"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z",fill:"white"}),Object(r.jsx)("path",{d:"M14.5 25H17.5V22H14.5V25ZM14.5 6V19H17.5V6H14.5Z",fill:"#DC4146"})]}),"success"===n&&Object(r.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mr-3",children:[Object(r.jsx)("path",{d:"M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z",fill:"white"}),Object(r.jsx)("path",{d:"M38 15L22 33L12 25",stroke:"#28A745",strokeWidth:"2",strokeMiterlimit:"10",strokeLinecap:"round",strokeLinejoin:"round"})]}),t,Object(r.jsx)("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close",onClick:function(){return c(!1)},children:Object(r.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]})})})},s=n(22),u=n(11).d.button(c||(c=Object(s.a)(["\n    border: none;\n    border-radius: 0.5rem;\n    padding: 0.5rem 3rem;\n    transition: all 0.5s ease-in;\n"]))),i=function(e){var t=e.type,n=e.onClick,c=e.className,o=e.children,a=e.dataDismiss,s=e.dataToggle,i=e.dataTarget,l=e.disabled,d=void 0!==l&&l;return Object(r.jsx)(u,{type:t,onClick:n,dataDismiss:a,dataToggle:s,dataTarget:i,className:"bg-primary-color text-secondary-color font-demi text-center hover-primary-color ".concat(c),disabled:d,children:o})},l=(n(55),n(54)),d=function(e){var t=e.title;return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("button",{type:"button",className:"d-inline-block btn px-0 mt-n2","data-toggle":"tooltip","data-placement":"top",title:t,children:Object(r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle-fill text-primary-color",viewBox:"0 0 16 16",children:Object(r.jsx)("path",{d:"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"})})})})}},53:function(e,t,n){"use strict";n(0);var c=n(69),o=n(1);t.a=function(e){var t=e.title;return Object(o.jsx)(c.a,{children:Object(o.jsxs)("title",{children:[t," | FOSSology"]})})}},54:function(e,t,n){"use strict";n(0);var c=n(1);t.a=function(e){var t=e.type,n=e.name,o=e.value,r=e.id,a=e.className,s=e.onChange,u=e.children,i=e.checked,l=void 0!==i&&i,d=e.placeholder,f=void 0===d?null:d,h=e.disabled,p=void 0!==h&&h,m=e.options,b=void 0===m?null:m,j=e.multiple,g=void 0!==j&&j,v=e.property,O=e.valueProperty,y=e.noDataMessage,x=void 0===y?"No Data Found":y;return"radio"===t||"checkbox"===t?Object(c.jsxs)("div",{className:"my-0",children:[Object(c.jsx)("input",{type:t,name:n,value:o,className:a&&"mr-2 ".concat(a),onChange:s,checked:l,disabled:p,id:r}),Object(c.jsx)("label",{htmlFor:r,className:"font-medium ml-2",children:u})]}):"select"===t?Object(c.jsxs)("div",{className:"my-1 py-0",children:[u&&Object(c.jsx)("label",{htmlFor:r,className:"font-demi",children:u}),"\u2003",Object(c.jsx)("select",{name:n,className:a?"mr-2 form-control ".concat(a):"mr-2 form-control",value:o,onChange:s,multiple:g&&g,size:g?"15":"",id:r,children:b.length>0?b.map((function(e,t){return Object(c.jsx)("option",{value:O?e[O]:e.id,disabled:e.disabled,children:v?e[v]:e},e.id||t)})):Object(c.jsx)("option",{className:"font-demi",disabled:!0,children:x})})]}):Object(c.jsxs)("div",{className:"my-2",children:[Object(c.jsx)("label",{htmlFor:r,className:"font-demi",children:u}),Object(c.jsx)("input",{type:t,name:n,value:o,className:"file"===t?"ml-3 ".concat(a):"form-control ".concat(a),onChange:s,checked:l,placeholder:f,id:r})]})}},55:function(e,t,n){"use strict";n(0);var c=n(1);t.a=function(e){var t=e.src,n=e.alt,o=e.style,r=e.className,a=e.width,s=e.height,u=e.align;return Object(c.jsx)("img",{src:t,alt:n,style:o,className:r,width:a,height:s,align:u})}},58:function(e,t,n){"use strict";t.a={forbiddenResource:"Requested resource is forbidden",noGroup:"No Group Found",noFolder:"No Folder Found",noUploads:"No Uploads Found",noPageShort:"Error: Page Not Found!",noPageLong:"We could not find the page you were searching for",groupCreate:"Successfully created the group",deletedGroup:"Successfully deleted the group",deletedUser:"Successfully deleted the user",addedUser:"Successfully added the user",confirmDeletion:"Deletion not confirmed",loading:"Loading...",jobsAdded:"Your jobs have been added to job queue",createdFolder:"Successfully created the folder",deletedFolder:"Successfully deleted the folder",updatedFolderProps:"Successfully updated the folder properties",movedFolder:"Successfully moved the folder",copiedFolder:"Successfully copied the folder",unlinkedFolder:"Successfully unlinked the folder",createdLicense:"Successfully created the license",scheduleUploadDeletion:"Successfully scheduled selected uploads for deletion",selectUploadsToDelete:"Select the uploads to delete",scheduleUploadMovement:"Successfully scheduled the selected uploads movement",selectUploadsToMove:"Select the uploads to move",scheduledUploadCopy:"Successfully scheduled the selected uploads for copy",selectUploadsToCopy:"Select the uploads to copy",uploadSuccess:"Successfully uploaded the files",scheduledAnalysis:"Analysis for the file is scheduled",queuedUpload:"The upload has been queued its upload id is"}},59:function(e,t,n){"use strict";var c="".concat("http","://").concat("localhost/repo/api/v2"),o={jobs:{details:function(e){return"".concat(c,"/jobs/").concat(e)},scheduleAnalysis:function(){return"".concat(c,"/jobs")},allJobs:function(){return"".concat(c,"/jobs/all")},scheduleReport:function(){return"".concat(c,"/report")},downloadReport:function(e){return"".concat(c,"/report/").concat(e)}},auth:{tokens:function(){return"".concat(c,"/tokens")}},search:{search:function(){return"".concat(c,"/search")}},users:{self:function(){return"".concat(c,"/users/self")},getAll:function(){return"".concat(c,"/users")},getSingle:function(e){return"".concat(c,"/users/").concat(e)},delete:function(e){return"".concat(c,"/users/").concat(e)},add:function(){return"".concat(c,"/users")},edit:function(e){return"".concat(c,"/users/").concat(e)},createToken:function(){return"".concat(c,"/users/tokens")},getTokens:function(e){return"".concat(c,"/users/tokens/").concat(e)}},folders:{getAll:function(){return"".concat(c,"/folders")},getSingle:function(e){return"".concat(c,"/folders/").concat(e)},create:function(){return"".concat(c,"/folders")},read:function(e){return"".concat(c,"/folders/").concat(e)},edit:function(e){return"".concat(c,"/folders/").concat(e)},delete:function(e){return"".concat(c,"/folders/").concat(e)},move:function(e){return"".concat(c,"/folders/").concat(e)}},upload:{uploadCreate:function(){return"".concat(c,"/uploads")},getId:function(e){return"".concat(c,"/uploads/").concat(e)},getSummary:function(e){return"".concat(c,"/uploads/").concat(e,"/summary")},getLicense:function(e){return"".concat(c,"/uploads/").concat(e,"/licenses")}},browse:{get:function(){return"".concat(c,"/uploads")}},organize:{uploads:{get:function(){return"".concat(c,"/uploads")},delete:function(e){return"".concat(c,"/uploads/").concat(e)},move:function(e){return"".concat(c,"/uploads/").concat(e)},copy:function(e){return"".concat(c,"/uploads/").concat(e)}}},admin:{groups:{create:function(){return"".concat(c,"/groups")},getAll:function(){return"".concat(c,"/groups")},getAllDeletable:function(){return"".concat(c,"/groups/deletable")},delete:function(e){return"".concat(c,"/groups/").concat(e)}},maintenance:{create:function(){return"".concat(c,"/maintenance")}},license:{get:function(){return"".concat(c,"/license")},createCandidateLicense:function(){return"".concat(c,"/license")}},info:{info:function(){return"".concat(c,"/info")},health:function(){return"".concat(c,"/health")}}}};t.a=o},60:function(e,t,n){"use strict";var c=n(64),o=n(52),r=n(63),a=n(50),s=n(58),u=n(13);t.a=function e(t){var n,i,l=t.url,d=t.method,f=t.body,h=t.groupName,p=t.headers,m=void 0===p?{}:p,b=t.queryParams,j=t.isMultipart,g=void 0!==j&&j,v=t.noHeaders,O=void 0!==v&&v,y=t.addGroupName,x=void 0===y||y,N=t.retries,w=void 0===N?0:N,S=t.isFile,k=void 0!==S&&S;(n=g?new Headers(Object(o.a)({},m)):new Headers(Object(o.a)({"content-type":"application/json",accept:"application/json"},m)),k&&(n=new Headers(Object(o.a)({},m))),x)&&n.append("groupName",h||Object(u.c)("currentGroup")||(null===(i=Object(u.c)("user"))||void 0===i?void 0:i.default_group));O&&(n={});var C={method:d,headers:n,body:f},F=l;return C.body=f?g?f:JSON.stringify(f):null,b&&(F="".concat(l,"?").concat(Object(r.stringify)(b))),fetch(F,C).then((function(t){if(t.ok){var n,o=Object(c.a)(t.headers.entries());try{for(o.s();!(n=o.n()).done;){var r=n.value;"x-total-pages"===r[0]&&Object(u.h)("pages",r[1])}}catch(i){o.e(i)}finally{o.f()}return k?t:t.json()}return w>0?setTimeout((function(){e({url:l,method:d,headers:m,retries:w-1})}),1e4):t.json().then((function(e){var n={status:t.status,ok:!1,message:e.message,body:e};return 403===e.code?e.message?Object(a.e)({message:e.message}):Object(a.e)({message:s.a.forbiddenResource}):Promise.reject(n)}))}))}},88:function(e,t,n){"use strict";n.d(t,"e",(function(){return s})),n.d(t,"d",(function(){return u})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d}));var c=n(59),o=n(50),r=n(60),a=n(13),s=function(){return Object(a.c)("groups")},u=function(){return function(){var e=c.a.admin.groups.getAll();return Object(r.a)({url:e,method:"GET",headers:{Authorization:Object(o.a)()},addGroupName:!1})}().then((function(e){return Object(a.h)("groups",e),e}))},i=function(e){return function(e){var t=c.a.admin.groups.create();return Object(r.a)({url:t,method:"POST",headers:{Authorization:Object(o.a)(),name:e},addGroupName:!1})}(e).then((function(e){return e}))},l=function(e){return function(e){var t=c.a.admin.groups.delete(e);return Object(r.a)({url:t,method:"DELETE",headers:{Authorization:Object(o.a)()},addGroupName:!1})}(e).then((function(e){return e}))},d=function(){return function(){var e=c.a.admin.groups.getAllDeletable();return Object(r.a)({url:e,method:"GET",headers:{Authorization:Object(o.a)()},addGroupName:!1})}().then((function(e){return e}))}}}]);
//# sourceMappingURL=38.ab7e4e6b.chunk.js.map