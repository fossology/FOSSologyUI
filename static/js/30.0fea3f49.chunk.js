(this.webpackJsonpfossologyui=this.webpackJsonpfossologyui||[]).push([[30],{244:function(e,t,n){"use strict";n.r(t);var c=n(54),a=n(50),o=n(22),r=n(0),s=n(53),i=n(55),l=n(85),d=n.n(l),u=n(63),h=n(51),f=n(64),p=function(e){var t=e.searchType,n=e.uploadId,c=e.filename,a=e.tag,o=e.filesizemin,r=e.filesizemax,s=e.license,i=e.copyright,l=e.page,d=e.limit,p=u.a.search.search();return Object(f.a)({url:p,method:"GET",headers:{Authorization:Object(h.a)(),searchType:t,uploadId:n,filename:c,tag:a,filesizemin:o,filesizemax:r,license:s,copyright:i,page:l,limit:d}})};p.propTypes={searchType:d.a.string,uploadId:d.a.number,filename:d.a.string,tag:d.a.string,filesizemin:d.a.number,filesizemax:d.a.number,license:d.a.string,copyright:d.a.string};var m=p,j=n(14),b=function(e){return m(e).then((function(e){var t=[];return e.forEach((function(e){t.push({uploadTreeId:e.upload.uploadTreeId,uploadName:e.upload.uploadname,folderName:e.upload.foldername,description:e.upload.description,fileName:e.filename})})),{search:t,pages:Object(j.c)("pages")}}))},g=n(1);t.default=function(){var e=Object(r.useState)({searchType:"allfiles",uploadId:"",filename:"",tag:"",filesizemin:"",filesizemax:"",license:"",copyright:"",page:1,limit:10}),t=Object(o.a)(e,2),n=t[0],l=t[1],d=Object(r.useState)(""),u=Object(o.a)(d,2),h=u[0],f=u[1],p=Object(r.useState)(),m=Object(o.a)(p,2),j=m[0],y=m[1],v=Object(r.useState)(!1),O=Object(o.a)(v,2),x=O[0],N=O[1],w=Object(r.useState)(!1),C=Object(o.a)(w,2),S=C[0],k=C[1],z=Object(r.useState)({type:"danger",text:""}),F=Object(o.a)(z,2),T=F[0],I=F[1],M=function(e){var t;"limit"===e.target.name?l(Object(a.a)(Object(a.a)({},n),{},(t={},Object(c.a)(t,e.target.name,e.target.value),Object(c.a)(t,"page",1),t))):l(Object(a.a)(Object(a.a)({},n),{},Object(c.a)({},e.target.name,e.target.value)))};return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(s.a,{title:"Search"}),Object(g.jsxs)("div",{className:"main-container my-3",children:[S&&Object(g.jsx)(i.a,{type:T.type,setShow:k,message:T.text}),Object(g.jsx)("h1",{className:"font-size-main-heading",children:"Search"}),Object(g.jsx)("br",{}),Object(g.jsx)("div",{className:"row",children:Object(g.jsxs)("div",{className:"col-lg-8 col-md-12 col-sm-12 col-12",children:[Object(g.jsxs)("form",{children:[j&&Object(g.jsx)(i.c,{name:"page",type:"select",onChange:function(e){return M(e)},options:j,property:"value",children:"Pages"}),Object(g.jsx)(i.c,{name:"limit",type:"select",onChange:function(e){return M(e)},options:[{id:10,entry:"10"},{id:25,entry:"25"},{id:50,entry:"50"},{id:100,entry:"100"}],property:"entry",children:"Show entries:"}),Object(g.jsx)(i.c,{value:"directory",name:"searchType",type:"radio",className:"mt-4",id:"search-upload-type-directory",onChange:M,checked:"directory"===n.searchType,children:"Containers only (rpms, tars, isos, etc), including directories."}),Object(g.jsx)(i.c,{value:"containers",name:"searchType",type:"radio",id:"search-upload-type-containers",onChange:M,checked:"containers"===n.searchType,children:"Containers only (rpms, tars, isos, etc), excluding directories. The filtering for license or copyright is not supported in this case."}),Object(g.jsx)(i.c,{value:"allfiles",name:"searchType",type:"radio",id:"search-upload-type-all-files",onChange:M,checked:"allfiles"===n.searchType,children:"All Files"}),Object(g.jsx)("div",{className:"font-demi mt-4",children:"You must choose one or more search criteria (not case sensitive)."}),Object(g.jsx)("div",{className:"mb-2",children:Object(g.jsx)(i.c,{value:n.uploadId,name:"uploadId",type:"text",id:"search-upload-id",onChange:M,children:"Choose upload to search into"})}),Object(g.jsx)(i.c,{value:n.filename,name:"filename",type:"text",id:"search-file-name",onChange:M,children:"Enter the filename to find:"}),Object(g.jsx)(i.c,{value:n.tag,name:"tag",type:"text",id:"search-tag",onChange:M,children:"Tag to find"}),Object(g.jsx)(i.c,{value:n.filesizemin,name:"filesizemin",type:"text",id:"search-file-size-min",placeholder:"in Bytes",onChange:M,children:"File size is \u2265"}),Object(g.jsx)(i.c,{value:n.filesizemax,name:"filesizemax",type:"text",id:"search-file-size-max",placeholder:"in Bytes",onChange:M,children:"File size is \u2264"}),Object(g.jsx)("div",{className:"font-demi mt-4",children:"You may also choose one or more optional search filters (not case sensitive)."}),Object(g.jsx)(i.c,{value:n.license,name:"license",type:"text",id:"search-license",onChange:M,children:"License"}),Object(g.jsx)(i.c,{value:n.copyright,name:"copyright",type:"text",id:"search-copyright",onChange:M,children:"Copyright"}),Object(g.jsx)(i.b,{type:"submit",onClick:function(e){e.preventDefault(),N(!0),b(n).then((function(e){f(e.search);for(var t=[],n=0;n<e.pages;n++)t.push({id:n+1,value:n+1});y(t)})).catch((function(e){I({type:"danger",text:e.message}),k(!0)})).finally((function(){N(!1)}))},className:"mt-4",children:x?Object(g.jsx)(i.d,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"}):"Search"})]}),h&&Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("h3",{className:"font-size-sub-heading mt-4",children:[h.length," files matching your search result."]}),h.map((function(e,t){var n=e.uploadTreeId,c=e.uploadName,a=e.folderName,o=e.fileName;return Object(g.jsxs)("div",{className:"box p-3 mt-2",children:[Object(g.jsxs)("div",{className:"font-demi",children:[t+1,". Folder: ",a]}),Object(g.jsxs)("div",{className:"font-medium ml-3",children:[c,"/",o]})]},n)}))]})]})})]})]})}},51:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d}));var c=n(60),a=n(2),o=n(14),r=function(){if("undefined"!==typeof window&&Object(o.b)("token"))return!(!localStorage.getItem("user")||!localStorage.getItem("groups"));return!1},s=function(e){Object(o.e)("token"),Object(o.f)("user"),Object(o.f)("groups"),Object(o.f)("currentGroup");var t=a.a.home;e&&(t="".concat(a.a.home,"?").concat(Object(c.stringify)(e))),window.location.href=t},i=function(){return Object(o.b)("token")},l=function(){return Object(o.c)("user").name},d=function(){var e;return"admin"===(null===(e=Object(o.c)("user"))||void 0===e?void 0:e.accessLevel)}},53:function(e,t,n){"use strict";n(0);var c=n(80),a=n(1);t.a=function(e){var t=e.title;return Object(a.jsx)(c.a,{children:Object(a.jsxs)("title",{children:[t," | FOSSology"]})})}},55:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d.a})),n.d(t,"e",(function(){return u})),n.d(t,"d",(function(){return a.a}));var c,a=n(58),o=(n(0),n(1)),r=function(e){var t=e.message,n=e.type,c=e.setShow;return Object(o.jsx)("div",{className:"main-container d-flex justify-content-end mt-3",children:Object(o.jsx)("div",{className:"alert bg-".concat(n," alert-dismissible fade show font-medium text-white alert-fix-position"),role:"alert",children:Object(o.jsxs)("div",{className:"d-flex",children:["danger"===n&&Object(o.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mr-3",children:[Object(o.jsx)("path",{d:"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z",fill:"white"}),Object(o.jsx)("path",{d:"M14.5 25H17.5V22H14.5V25ZM14.5 6V19H17.5V6H14.5Z",fill:"#DC4146"})]}),"success"===n&&Object(o.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mr-3",children:[Object(o.jsx)("path",{d:"M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z",fill:"white"}),Object(o.jsx)("path",{d:"M38 15L22 33L12 25",stroke:"#28A745",strokeWidth:"2",strokeMiterlimit:"10",strokeLinecap:"round",strokeLinejoin:"round"})]}),t,Object(o.jsx)("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close",onClick:function(){return c(!1)},children:Object(o.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]})})})},s=n(24),i=n(11).d.button(c||(c=Object(s.a)(["\n    border: none;\n    border-radius: 0.5rem;\n    padding: 0.5rem 3rem;\n    transition: all 0.5s ease-in;\n"]))),l=function(e){var t=e.type,n=e.onClick,c=e.className,a=e.children;return Object(o.jsx)(i,{type:t,onClick:n,className:"bg-primary-color text-secondary-color font-demi text-center hover-primary-color ".concat(c),children:a})},d=(n(56),n(57)),u=function(e){var t=e.title;return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("button",{type:"button",className:"d-inline-block btn px-0 mt-n2","data-toggle":"tooltip","data-placement":"top",title:t,children:Object(o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-info-circle-fill text-primary-color",viewBox:"0 0 16 16",children:Object(o.jsx)("path",{d:"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"})})})})}},56:function(e,t,n){"use strict";n(0);var c=n(1);t.a=function(e){var t=e.src,n=e.alt,a=e.style,o=e.className,r=e.width,s=e.height,i=e.align;return Object(c.jsx)("img",{src:t,alt:n,style:a,className:o,width:r,height:s,align:i})}},57:function(e,t,n){"use strict";n(0);var c=n(1);t.a=function(e){var t=e.type,n=e.name,a=e.value,o=e.id,r=e.className,s=e.onChange,i=e.children,l=e.checked,d=void 0!==l&&l,u=e.placeholder,h=void 0===u?null:u,f=e.disabled,p=void 0!==f&&f,m=e.options,j=void 0===m?null:m,b=e.multiple,g=void 0!==b&&b,y=e.property,v=e.valueProperty,O=e.noDataMessage,x=void 0===O?"No Data Found":O,N=e.defaultValue,w=void 0===N?null:N;return"radio"===t||"checkbox"===t?Object(c.jsxs)("div",{className:"my-0",children:[Object(c.jsx)("input",{type:t,name:n,value:a,className:r&&"mr-2 ".concat(r),onChange:s,checked:d,disabled:p,id:o}),Object(c.jsx)("label",{htmlFor:o,className:"font-medium ml-2",children:i})]}):"select"===t?Object(c.jsxs)("div",{className:"my-0 py-0",children:[i&&Object(c.jsx)("label",{htmlFor:o,className:"font-demi",children:i}),"\u2003",Object(c.jsx)("select",{name:n,className:r?"mr-2 form-control ".concat(r):"mr-2 form-control",value:a,onChange:s,multiple:g&&g,size:g?"15":"",id:o,defaultValue:w,children:j.length>0?j.map((function(e,t){return Object(c.jsx)("option",{value:v?e[v]:e.id,disabled:e.disabled,children:y?e[y]:e},e.id||t)})):Object(c.jsx)("option",{className:"font-demi",disabled:!0,children:x})})]}):Object(c.jsxs)("div",{className:"my-2",children:[Object(c.jsx)("label",{htmlFor:o,className:"font-demi",children:i}),Object(c.jsx)("input",{type:t,name:n,value:a,className:"file"===t?"ml-3 ".concat(r):"form-control ".concat(r),onChange:s,checked:d,placeholder:h,id:o})]})}},61:function(e,t,n){"use strict";t.a={forbiddenResource:"Requested resource is forbidden",noGroup:"No Group Found",noFolder:"No Folder Found",noUploads:"No Uploads Found",noPageShort:"Error: Page Not Found!",noPageLong:"We could not find the page you were searching for",groupCreate:"Successfully created the group",deletedUser:"Successfully deleted the user",confirmDeletion:"Deletion not confirmed",loading:"Loading...",jobsAdded:"Your jobs have been added to job queue",createdFolder:"Successfully created the folder",deletedFolder:"Successfully deleted the folder",updatedFolderProps:"Successfully updated the folder properties",movedFolder:"Successfully moved the folder",copiedFolder:"Successfully copied the folder",unlinkedFolder:"Successfully unlinked the folder",createdLicense:"Successfully created the license",scheduleUploadDeletion:"Successfully scheduled selected uploads for deletion",selectUploadsToDelete:"Select the uploads to delete",scheduleUploadMovement:"Successfully scheduled the selected uploads movement",selectUploadsToMove:"Select the uploads to move",scheduledUploadCopy:"Successfully scheduled the selected uploads for copy",selectUploadsToCopy:"Select the uploads to copy",uploadSuccess:"Successfully uploaded the files",scheduledAnalysis:"Analysis for the file is scheduled",queuedUpload:"The upload has been queued its upload id is"}},63:function(e,t,n){"use strict";var c="".concat("http","://").concat("localhost/repo/api/v2"),a={jobs:{details:function(e){return"".concat(c,"/jobs/").concat(e)},scheduleAnalysis:function(){return"".concat(c,"/jobs")},scheduleReport:function(){return"".concat(c,"/report")},downloadReport:function(e){return"".concat(c,"/report/").concat(e)}},auth:{tokens:function(){return"".concat(c,"/tokens")}},search:{search:function(){return"".concat(c,"/search")}},users:{self:function(){return"".concat(c,"/users/self")},getAll:function(){return"".concat(c,"/users")},getSingle:function(e){return"".concat(c,"/users/").concat(e)},delete:function(e){return"".concat(c,"/users/").concat(e)}},folders:{getAll:function(){return"".concat(c,"/folders")},getSingle:function(e){return"".concat(c,"/folders/").concat(e)},create:function(){return"".concat(c,"/folders")},read:function(e){return"".concat(c,"/folders/").concat(e)},edit:function(e){return"".concat(c,"/folders/").concat(e)},delete:function(e){return"".concat(c,"/folders/").concat(e)},move:function(e){return"".concat(c,"/folders/").concat(e)}},upload:{uploadCreate:function(){return"".concat(c,"/uploads")},getId:function(e){return"".concat(c,"/uploads/").concat(e)}},browse:{get:function(){return"".concat(c,"/uploads")}},organize:{uploads:{get:function(){return"".concat(c,"/uploads")},delete:function(e){return"".concat(c,"/uploads/").concat(e)},move:function(e){return"".concat(c,"/uploads/").concat(e)},copy:function(e){return"".concat(c,"/uploads/").concat(e)}}},admin:{groups:{create:function(){return"".concat(c,"/groups")},getAll:function(){return"".concat(c,"/groups")}}},license:{get:function(){return"".concat(c,"/license")},createCandidateLicense:function(){return"".concat(c,"/license")}},info:{info:function(){return"".concat(c,"/info")},health:function(){return"".concat(c,"/health")}}};t.a=a},64:function(e,t,n){"use strict";var c=n(62),a=n(50),o=n(60),r=n(51),s=n(61),i=n(14);t.a=function e(t){var n,l,d=t.url,u=t.method,h=t.credentials,f=void 0!==h&&h,p=t.body,m=t.groupName,j=t.headers,b=void 0===j?{}:j,g=t.queryParams,y=t.isMultipart,v=void 0!==y&&y,O=t.noHeaders,x=void 0!==O&&O,N=t.addGroupName,w=void 0===N||N,C=t.retries,S=void 0===C?0:C,k=t.isFile,z=void 0!==k&&k;(n=v?new Headers(Object(a.a)({},b)):new Headers(Object(a.a)({"content-type":"application/json",accept:"application/json"},b)),z&&(n=new Headers(Object(a.a)({},b))),w)&&n.append("groupName",m||Object(i.c)("currentGroup")||(null===(l=Object(i.c)("user"))||void 0===l?void 0:l.default_group));x&&(n={});var F={method:u,headers:n,body:p},T=d;return F.body=p?v?p:JSON.stringify(p):null,f&&(F.credentials=f),g&&(T="".concat(d,"?").concat(Object(o.stringify)(g))),fetch(T,F).then((function(t){if(t.ok){var n,a=Object(c.a)(t.headers.entries());try{for(a.s();!(n=a.n()).done;){var o=n.value;"x-total-pages"===o[0]&&Object(i.h)("pages",o[1])}}catch(l){a.e(l)}finally{a.f()}return z?t:t.json()}return S>0?setTimeout((function(){e({url:d,method:u,headers:b,retries:S-1})}),1e4):t.json().then((function(e){var n={status:t.status,ok:!1,message:e.message,body:e};return 403===e.code?e.message?Object(r.e)({message:e.message}):Object(r.e)({message:s.a.forbiddenResource}):Promise.reject(n)}))}))}}}]);
//# sourceMappingURL=30.0fea3f49.chunk.js.map