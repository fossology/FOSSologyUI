(this.webpackJsonpfossologyui=this.webpackJsonpfossologyui||[]).push([[9],{14:function(e,n,t){"use strict";t.d(n,"g",(function(){return a})),t.d(n,"e",(function(){return i})),t.d(n,"b",(function(){return l})),t.d(n,"h",(function(){return c})),t.d(n,"c",(function(){return u})),t.d(n,"f",(function(){return s})),t.d(n,"a",(function(){return d})),t.d(n,"d",(function(){return m})),t.d(n,"i",(function(){return h}));var o=t(13),r=t.n(o),a=function(e,n){"undefined"!==window&&r.a.set(e,n,{expires:1,sameSite:"strict",secure:!0})},i=function(e){"undefined"!==window&&r.a.remove(e,{expires:1})},l=function(e){return"undefined"!==window?r.a.get(e):null},c=function(e,n){"undefined"!==typeof window&&localStorage.setItem(e,JSON.stringify(n))},u=function(e){return"undefined"!==typeof window?JSON.parse(localStorage.getItem(e)):null},s=function(e){"undefined"!==typeof window&&localStorage.removeItem(e)},d=function(){var e;if(null===(e=u("user"))||void 0===e?void 0:e.agents){var n,t=null===(n=u("user"))||void 0===n?void 0:n.agents;return t.copyrightEmailAuthor=t.copyright_email_author,delete t.copyright_email_author,t.mime=t.mimetype,delete t.mimetype,t}return{bucket:!1,copyrightEmailAuthor:!1,ecc:!1,keyword:!1,mime:!1,monk:!1,nomos:!1,ojo:!1,package:!1}},m=function(e){return"undefined"!==typeof window?JSON.parse(sessionStorage.getItem(e)):null},h=function(e,n){"undefined"!==typeof window&&sessionStorage.setItem(e,JSON.stringify(n))}},17:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return s}));var o=t(22),r=t(0),a=t.n(r),i=t(14),l=t(1),c={theme:Object(i.c)("theme")||"light"},u=a.a.createContext(c),s=function(e){var n=e.children,t=Object(r.useState)(c),a=Object(o.a)(t,2),s=a[0],d=a[1];return Object(l.jsx)(u.Provider,{value:{state:s,setTheme:function(e){d({theme:e}),Object(i.h)("theme",e)}},children:n})}},2:function(e,n,t){"use strict";n.a={home:"/",login:"/login",search:"/search",browse:"/browse",upload:{file:"/upload/file",server:"/upload/server",url:"/upload/url",vcs:"/upload/vcs",report:"/upload/report",instructions:"/upload/instructions",oneShotAnalysis:"/upload/oneShotAnalysis",oneShotCopyright:"/upload/oneShotCopyright",oneShotMonk:"/upload/oneShotMonk"},jobs:{myRecentJobs:"/jobs/myRecentJobs",allRecentJobs:"/jobs/allRecentJobs",scheduleAgents:"/jobs/scheduleAgents"},organize:{folders:{create:"/organize/folders/create",delete:"/organize/folders/delete",edit:"/organize/folders/edit",move:"/organize/folders/move",unlinkContent:"/organize/folders/unlinkContent"},licenses:{create:"/organize/license/create",candidate:"/organize/license/candidate"},uploads:{delete:"/organize/uploads/delete",edit:"/organize/uploads/edit",move:"/organize/uploads/move"}},help:{overview:"/help/overview",licenseBrowser:"/help/licenseBrowser",about:"/help/about",thirdPartyLicenses:"/help/thirdPartyLicenses",thirdPartyLicensesHTML:"/thirdPartyLicenses.html"},admin:{group:{create:"/admin/group/create",delete:"/admin/group/delete"},users:{delete:"/admin/users/delete"},license:{create:"/admin/license/create",selectLicense:"/admin/selectLicense",licenseCSV:"/licenseCSV/fossology-license-export.csv"}},browseUploads:{softwareHeritage:"/browse/softwareHeritage",licenseBrowser:"/browse/licenseBrowser",fileBrowser:"/browse/fileBrowser",copyright:"/browse/copyright",ecc:"/browse/ecc"}}},45:function(e,n,t){},47:function(e,n,t){"use strict";t.r(n);var o,r=t(0),a=t.n(r),i=t(26),l=t.n(i),c=t(11),u={primaryColor:"#DC3545",secondaryColor:"#A93232",tertiaryColor:"#E5E5E5",body:"#FFFFFF",text:"#212121",primaryText:"#212121",secondaryText:"#FFFFFF",hoverBackgroundColor:"#A93232"},s={primaryColor:"#525252",secondaryColor:"#212121",tertiaryColor:"#E5E5E5",body:"#212121",text:"#212121",primaryText:"#FFFFFF",secondaryText:"#FFFFFF",toggleBorder:"#6B8096",hoverBackgroundColor:"#212121"},d=t(17),m=t(2),h=t(25),p=t(3),b=t(1),f=a.a.lazy((function(){return Promise.all([t.e(1),t.e(2),t.e(5),t.e(6),t.e(59)]).then(t.bind(null,196))})),x=a.a.lazy((function(){return Promise.all([t.e(1),t.e(2),t.e(5),t.e(6),t.e(58)]).then(t.bind(null,203))})),j=a.a.lazy((function(){return Promise.all([t.e(1),t.e(2),t.e(5),t.e(6),t.e(57)]).then(t.bind(null,204))})),y=a.a.lazy((function(){return Promise.all([t.e(0),t.e(19),t.e(8),t.e(54)]).then(t.bind(null,241))})),g=a.a.lazy((function(){return Promise.all([t.e(0),t.e(21),t.e(30)]).then(t.bind(null,244))})),O=a.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(12),t.e(27)]).then(t.bind(null,247))})),z=a.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(45)]).then(t.bind(null,206))})),w=a.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(44)]).then(t.bind(null,207))})),v=a.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(43)]).then(t.bind(null,208))})),P=a.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(29),t.e(35)]).then(t.bind(null,242))})),C=a.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(42)]).then(t.bind(null,209))})),F=a.a.lazy((function(){return Promise.all([t.e(0),t.e(47)]).then(t.bind(null,248))})),k=a.a.lazy((function(){return Promise.all([t.e(0),t.e(46)]).then(t.bind(null,245))})),S=a.a.lazy((function(){return Promise.all([t.e(0),t.e(51)]).then(t.bind(null,210))})),T=a.a.lazy((function(){return Promise.all([t.e(0),t.e(41)]).then(t.bind(null,211))})),B=a.a.lazy((function(){return Promise.all([t.e(0),t.e(4),t.e(3),t.e(37)]).then(t.bind(null,212))})),J=a.a.lazy((function(){return Promise.all([t.e(0),t.e(3),t.e(20)]).then(t.bind(null,213))})),L=a.a.lazy((function(){return Promise.all([t.e(0),t.e(4),t.e(3),t.e(39)]).then(t.bind(null,214))})),A=a.a.lazy((function(){return Promise.all([t.e(0),t.e(4),t.e(3),t.e(38)]).then(t.bind(null,215))})),E=a.a.lazy((function(){return Promise.all([t.e(0),t.e(28)]).then(t.bind(null,216))})),I=a.a.lazy((function(){return Promise.all([t.e(0),t.e(48)]).then(t.bind(null,217))})),U=a.a.lazy((function(){return Promise.all([t.e(0),t.e(32)]).then(t.bind(null,218))})),M=a.a.lazy((function(){return Promise.all([t.e(0),t.e(33)]).then(t.bind(null,219))})),R=a.a.lazy((function(){return Promise.all([t.e(0),t.e(34)]).then(t.bind(null,220))})),H=a.a.lazy((function(){return Promise.all([t.e(0),t.e(52)]).then(t.bind(null,221))})),N=a.a.lazy((function(){return Promise.all([t.e(0),t.e(53)]).then(t.bind(null,222))})),_=a.a.lazy((function(){return Promise.all([t.e(0),t.e(22),t.e(3),t.e(36)]).then(t.bind(null,223))})),D=a.a.lazy((function(){return Promise.all([t.e(0),t.e(14)]).then(t.bind(null,224))})),V=a.a.lazy((function(){return Promise.all([t.e(0),t.e(13)]).then(t.bind(null,225))})),q=a.a.lazy((function(){return Promise.all([t.e(0),t.e(15)]).then(t.bind(null,226))})),G=a.a.lazy((function(){return Promise.all([t.e(0),t.e(16)]).then(t.bind(null,227))})),K=a.a.lazy((function(){return Promise.all([t.e(0),t.e(17)]).then(t.bind(null,228))})),Q=a.a.lazy((function(){return Promise.all([t.e(0),t.e(7),t.e(55)]).then(t.bind(null,229))})),W=a.a.lazy((function(){return Promise.all([t.e(0),t.e(7),t.e(56)]).then(t.bind(null,230))})),X=a.a.lazy((function(){return Promise.all([t.e(0),t.e(4),t.e(3),t.e(49)]).then(t.bind(null,231))})),Y=a.a.lazy((function(){return Promise.all([t.e(0),t.e(3),t.e(24)]).then(t.bind(null,232))})),Z=a.a.lazy((function(){return Promise.all([t.e(0),t.e(3),t.e(26)]).then(t.bind(null,233))})),$=a.a.lazy((function(){return Promise.all([t.e(0),t.e(18)]).then(t.bind(null,234))})),ee=a.a.lazy((function(){return Promise.all([t.e(0),t.e(8),t.e(25)]).then(t.bind(null,235))})),ne=a.a.lazy((function(){return Promise.all([t.e(0),t.e(31)]).then(t.bind(null,236))})),te=a.a.lazy((function(){return Promise.all([t.e(0),t.e(50)]).then(t.bind(null,237))})),oe=a.a.lazy((function(){return t.e(40).then(t.bind(null,249))})),re=a.a.lazy((function(){return t.e(23).then(t.bind(null,246))})),ae=function(){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(h.a,{basename:"/FOSSologyUI",children:Object(b.jsxs)(p.d,{children:[Object(b.jsx)(f,{exact:!0,path:m.a.home,component:y}),Object(b.jsx)(x,{exact:!0,path:m.a.search,component:g}),Object(b.jsx)(x,{exact:!0,path:m.a.browse,component:O}),Object(b.jsx)(x,{exact:!0,path:m.a.browseUploads.softwareHeritage,component:z}),Object(b.jsx)(x,{exact:!0,path:m.a.browseUploads.licenseBrowser,component:w}),Object(b.jsx)(x,{exact:!0,path:m.a.browseUploads.fileBrowser,component:v}),Object(b.jsx)(x,{exact:!0,path:m.a.browseUploads.copyright,component:P}),Object(b.jsx)(x,{exact:!0,path:m.a.browseUploads.ecc,component:C}),Object(b.jsx)(f,{exact:!0,path:m.a.help.about,component:F}),Object(b.jsx)(f,{exact:!0,path:m.a.help.overview,component:k}),Object(b.jsx)(f,{exact:!0,path:m.a.help.licenseBrowser,component:S}),Object(b.jsx)(f,{exact:!0,path:m.a.help.thirdPartyLicenses,component:T}),Object(b.jsx)(x,{exact:!0,path:m.a.upload.file,component:B}),Object(b.jsx)(x,{exact:!0,path:m.a.upload.server,component:J}),Object(b.jsx)(x,{exact:!0,path:m.a.upload.url,component:A}),Object(b.jsx)(x,{exact:!0,path:m.a.upload.vcs,component:L}),Object(b.jsx)(x,{exact:!0,path:m.a.upload.report,component:E}),Object(b.jsx)(f,{exact:!0,path:m.a.upload.instructions,component:I}),Object(b.jsx)(f,{exact:!0,path:m.a.upload.oneShotAnalysis,component:U}),Object(b.jsx)(f,{exact:!0,path:m.a.upload.oneShotCopyright,component:M}),Object(b.jsx)(f,{exact:!0,path:m.a.upload.oneShotMonk,component:R}),Object(b.jsx)(x,{exact:!0,path:m.a.jobs.allRecentJobs,component:H}),Object(b.jsx)(x,{exact:!0,path:m.a.jobs.myRecentJobs,component:N}),Object(b.jsx)(x,{exact:!0,path:m.a.jobs.scheduleAgents,component:_}),Object(b.jsx)(x,{exact:!0,path:m.a.organize.folders.delete,component:D}),Object(b.jsx)(x,{exact:!0,path:m.a.organize.folders.create,component:V}),Object(b.jsx)(x,{exact:!0,path:m.a.organize.folders.edit,component:q}),Object(b.jsx)(x,{exact:!0,path:m.a.organize.folders.move,component:G}),Object(b.jsx)(x,{exact:!0,path:m.a.organize.folders.unlinkContent,component:K}),Object(b.jsx)(x,{exact:!0,path:m.a.organize.licenses.candidate,component:Q}),Object(b.jsx)(x,{exact:!0,path:m.a.organize.licenses.create,component:W}),Object(b.jsx)(x,{exact:!0,path:m.a.organize.uploads.edit,component:X}),Object(b.jsx)(x,{exact:!0,path:m.a.organize.uploads.move,component:Y}),Object(b.jsx)(x,{exact:!0,path:m.a.organize.uploads.delete,component:Z}),Object(b.jsx)(j,{exact:!0,path:m.a.admin.group.create,component:$}),Object(b.jsx)(j,{exact:!0,path:m.a.admin.license.create,component:ne}),Object(b.jsx)(j,{exact:!0,path:m.a.admin.license.selectLicense,component:te}),Object(b.jsx)(j,{exact:!0,path:m.a.admin.users.delete,component:ee}),Object(b.jsx)(p.b,{path:"*",children:Object(b.jsx)(f,{component:oe})})]})}),Object(b.jsx)(re,{})]})},ie=(t(43),t(44),t(45),t(24)),le=Object(c.c)(o||(o=Object(ie.a)(["\n  body {\n    background: ",";\n    color: ",";\n    margin: 0;\n    padding: 0;\n    font-family: Mulish-regular;\n  }\n  .bg-primary-color{\n    background: ",";\n  }\n  .primary-color-wrapper{\n    background: ",";\n    padding: 0.6rem 1rem;\n    color: ",";\n  }\n  .text-primary-color{\n    color: ",";\n  }\n  .text-secondary-color{\n    color: ",";\n  }\n  .navbar-light .navbar-nav .nav-link{\n    color: ",";\n    margin-left: 0.5rem;\n    margin-right: 0.5rem;\n    &:hover{\n      background: ",";\n      color: ",";\n      font-weight: 900;\n    }\n    &:focus{\n      color: ",";\n    }\n    &:active{\n      color: ",";\n    }\n  }\n  .bg-browse-uploads-header{\n    background: ",";\n  }\n  .browse-uploads-nav-item{\n    color: ",";\n    margin-left: 0.5rem;\n    margin-right: 0.5rem;\n    padding: 0.6rem;\n    &:hover{\n      color: ",";\n      font-weight: 900;\n      text-decoration: none;\n    }\n  }\n  .active-browse-nav-item{\n    border-bottom: 0.15rem "," solid;\n    font-weight: 900;\n  }\n  .dropdown-item{\n    color: ",";\n    &:hover:{\n      background: ",";\n      color: ",";\n    }\n  }\n  .box{\n    background: ",";\n    margin: 1rem 0rem;\n    padding: 1.5rem;\n    box-shadow: 2px 2px 6px rgba(0,0,0,0.2);\n    transition: all 0.25s linear;\n    &:hover{\n      box-shadow: 5px 5px 10px rgba(0,0,0,0.2);\n    }\n  }\n  .hover-primary-color{\n    &:hover{\n      background: ",";\n    }\n  }\n  .btn{\n    box-shadow: none;\n    padding: 0rem 1.5rem;\n    &:focus{\n      box-shadow: none;\n    }\n  }\n  pre{\n    color: ",";\n  }\n  .candidate-license-text textarea:disabled{\n    background: transparent;\n    color: ",";\n  }\n  .active-nav-item{\n    border-bottom: 0.15rem "," solid;\n  }\n  .dropdown-item:hover, .dropdown-item:focus{\n    color: ",";\n    background: ",";\n  }\n  .dropdown-item.active {\n    background-color: ",";\n  }\n}"])),(function(e){return e.theme.body}),(function(e){return e.theme.primaryText}),(function(e){return e.theme.primaryColor}),(function(e){return e.theme.primaryColor}),(function(e){return e.theme.secondaryText}),(function(e){return e.theme.primaryText}),(function(e){return e.theme.secondaryText}),(function(e){return e.theme.secondaryText}),(function(e){return e.theme.secondaryColor}),(function(e){return e.theme.secondaryText}),(function(e){return e.theme.secondaryText}),(function(e){return e.theme.secondaryText}),(function(e){return e.theme.tertiaryColor}),(function(e){return e.theme.text}),(function(e){return e.theme.text}),(function(e){return e.theme.primaryText}),(function(e){return e.theme.text}),(function(e){return e.theme.primaryColor}),(function(e){return e.theme.text}),(function(e){return e.theme.body}),(function(e){return e.theme.hoverBackgroundColor}),(function(e){return e.theme.primaryText}),(function(e){return e.theme.primaryText}),(function(e){return e.theme.secondaryText}),(function(e){return e.theme.secondaryText}),(function(e){return e.theme.primaryColor}),(function(e){return e.theme.secondaryColor}));function ce(){var e=Object(r.useContext)(d.a).state;return Object(b.jsxs)(c.b,{theme:"light"===e.theme?u:s,children:[Object(b.jsx)(le,{}),Object(b.jsx)(ae,{})]})}var ue=function(){return Object(b.jsx)(d.b,{children:Object(b.jsx)(ce,{})})},se=function(e){e&&e instanceof Function&&t.e(60).then(t.bind(null,238)).then((function(n){var t=n.getCLS,o=n.getFID,r=n.getFCP,a=n.getLCP,i=n.getTTFB;t(e),o(e),r(e),a(e),i(e)}))};l.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(r.Suspense,{fallback:Object(b.jsx)("div",{children:"Loading... "}),children:Object(b.jsx)(ue,{})})}),document.getElementById("root")),se()}},[[47,10,11]]]);
//# sourceMappingURL=main.506c393d.chunk.js.map