(this.webpackJsonpfossologyui=this.webpackJsonpfossologyui||[]).push([[39],{103:function(e,a,t){"use strict";var r=function(){};e.exports=r},109:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(){for(var e=arguments.length,a=Array(e),t=0;t<e;t++)a[t]=arguments[t];function r(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];var s=null;return a.forEach((function(e){if(null==s){var a=e.apply(void 0,t);null!=a&&(s=a)}})),s}return(0,l.default)(r)};var r,s=t(116),l=(r=s)&&r.__esModule?r:{default:r};e.exports=a.default},112:function(e,a,t){"use strict";t.d(a,"a",(function(){return m}));var r=t(4),s=t(8),l=t(55),i=t.n(l),o=/-(.)/g;var n=t(0),c=t.n(n),d=t(56),f=["className","bsPrefix","as"],u=function(e){return e[0].toUpperCase()+(a=e,a.replace(o,(function(e,a){return a.toUpperCase()}))).slice(1);var a};function m(e,a){var t=void 0===a?{}:a,l=t.displayName,o=void 0===l?u(e):l,n=t.Component,m=t.defaultProps,b=c.a.forwardRef((function(a,t){var l=a.className,o=a.bsPrefix,u=a.as,m=void 0===u?n||"div":u,b=Object(s.a)(a,f),v=Object(d.a)(o,e);return c.a.createElement(m,Object(r.a)({ref:t,className:i()(l,v)},b))}));return b.defaultProps=m,b.displayName=o,b}},116:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e){function a(a,t,r,s,l,i){var o=s||"<<anonymous>>",n=i||r;if(null==t[r])return a?new Error("Required "+l+" `"+n+"` was not specified in `"+o+"`."):null;for(var c=arguments.length,d=Array(c>6?c-6:0),f=6;f<c;f++)d[f-6]=arguments[f];return e.apply(void 0,[t,r,o,l,n].concat(d))}var t=a.bind(null,!1);return t.isRequired=a.bind(null,!0),t},e.exports=a.default},153:function(e,a,t){"use strict";var r=t(4),s=t(8),l=t(55),i=t.n(l),o=t(0),n=t.n(o),c=t(56),d=["bsPrefix","className","as"],f=["xl","lg","md","sm","xs"],u=n.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.className,o=e.as,u=void 0===o?"div":o,m=Object(s.a)(e,d),b=Object(c.a)(t,"col"),v=[],p=[];return f.forEach((function(e){var a,t,r,s=m[e];if(delete m[e],"object"===typeof s&&null!=s){var l=s.span;a=void 0===l||l,t=s.offset,r=s.order}else a=s;var i="xs"!==e?"-"+e:"";a&&v.push(!0===a?""+b+i:""+b+i+"-"+a),null!=r&&p.push("order"+i+"-"+r),null!=t&&p.push("offset"+i+"-"+t)})),v.length||v.push(b),n.a.createElement(u,Object(r.a)({},m,{ref:a,className:i.a.apply(void 0,[l].concat(v,p))}))}));u.displayName="Col",a.a=u},197:function(e,a,t){"use strict";var r=t(4),s=t(8),l=t(55),i=t.n(l),o=t(0),n=t.n(o),c=t(56),d=["bsPrefix","className","noGutters","as"],f=["xl","lg","md","sm","xs"],u=n.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.className,o=e.noGutters,u=e.as,m=void 0===u?"div":u,b=Object(s.a)(e,d),v=Object(c.a)(t,"row"),p=v+"-cols",x=[];return f.forEach((function(e){var a,t=b[e];delete b[e];var r="xs"!==e?"-"+e:"";null!=(a=null!=t&&"object"===typeof t?t.cols:t)&&x.push(""+p+r+"-"+a)})),n.a.createElement(m,Object(r.a)({ref:a},b,{className:i.a.apply(void 0,[l,v,o&&"no-gutters"].concat(x))}))}));u.displayName="Row",u.defaultProps={noGutters:!1},a.a=u},234:function(e,a,t){"use strict";var r=t(4),s=t(8),l=t(55),i=t.n(l),o=t(0),n=t.n(o),c=(t(109),t(9)),d=t.n(c),f=["as","className","type","tooltip"],u={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},m=n.a.forwardRef((function(e,a){var t=e.as,l=void 0===t?"div":t,o=e.className,c=e.type,d=void 0===c?"valid":c,u=e.tooltip,m=void 0!==u&&u,b=Object(s.a)(e,f);return n.a.createElement(l,Object(r.a)({},b,{ref:a,className:i()(o,d+"-"+(m?"tooltip":"feedback"))}))}));m.displayName="Feedback",m.propTypes=u;var b=m,v=n.a.createContext({controlId:void 0}),p=t(56),x=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],O=n.a.forwardRef((function(e,a){var t=e.id,l=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,f=e.type,u=void 0===f?"checkbox":f,m=e.isValid,b=void 0!==m&&m,O=e.isInvalid,j=void 0!==O&&O,y=e.isStatic,N=e.as,P=void 0===N?"input":N,h=Object(s.a)(e,x),w=Object(o.useContext)(v),E=w.controlId,C=w.custom?[c,"custom-control-input"]:[l,"form-check-input"],I=C[0],F=C[1];return l=Object(p.a)(I,F),n.a.createElement(P,Object(r.a)({},h,{ref:a,type:u,id:t||E,className:i()(d,l,b&&"is-valid",j&&"is-invalid",y&&"position-static")}))}));O.displayName="FormCheckInput";var j=O,y=["bsPrefix","bsCustomPrefix","className","htmlFor"],N=n.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.bsCustomPrefix,c=e.className,d=e.htmlFor,f=Object(s.a)(e,y),u=Object(o.useContext)(v),m=u.controlId,b=u.custom?[l,"custom-control-label"]:[t,"form-check-label"],x=b[0],O=b[1];return t=Object(p.a)(x,O),n.a.createElement("label",Object(r.a)({},f,{ref:a,htmlFor:d||m,className:i()(c,t)}))}));N.displayName="FormCheckLabel";var P=N,h=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],w=n.a.forwardRef((function(e,a){var t=e.id,l=e.bsPrefix,c=e.bsCustomPrefix,d=e.inline,f=void 0!==d&&d,u=e.disabled,m=void 0!==u&&u,x=e.isValid,O=void 0!==x&&x,y=e.isInvalid,N=void 0!==y&&y,w=e.feedbackTooltip,E=void 0!==w&&w,C=e.feedback,I=e.className,F=e.style,g=e.title,k=void 0===g?"":g,R=e.type,V=void 0===R?"checkbox":R,L=e.label,T=e.children,S=e.custom,M=e.as,_=void 0===M?"input":M,z=Object(s.a)(e,h),A="switch"===V||S,G=A?[c,"custom-control"]:[l,"form-check"],q=G[0],J=G[1];l=Object(p.a)(q,J);var U=Object(o.useContext)(v).controlId,B=Object(o.useMemo)((function(){return{controlId:t||U,custom:A}}),[U,A,t]),D=A||null!=L&&!1!==L&&!T,H=n.a.createElement(j,Object(r.a)({},z,{type:"switch"===V?"checkbox":V,ref:a,isValid:O,isInvalid:N,isStatic:!D,disabled:m,as:_}));return n.a.createElement(v.Provider,{value:B},n.a.createElement("div",{style:F,className:i()(I,l,A&&"custom-"+V,f&&l+"-inline")},T||n.a.createElement(n.a.Fragment,null,H,D&&n.a.createElement(P,{title:k},L),(O||N)&&n.a.createElement(b,{type:O?"valid":"invalid",tooltip:E},C))))}));w.displayName="FormCheck",w.Input=j,w.Label=P;var E=w,C=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],I=n.a.forwardRef((function(e,a){var t=e.id,l=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,f=e.isValid,u=e.isInvalid,m=e.lang,b=e.as,x=void 0===b?"input":b,O=Object(s.a)(e,C),j=Object(o.useContext)(v),y=j.controlId,N=j.custom?[c,"custom-file-input"]:[l,"form-control-file"],P=N[0],h=N[1];return l=Object(p.a)(P,h),n.a.createElement(x,Object(r.a)({},O,{ref:a,id:t||y,type:"file",lang:m,className:i()(d,l,f&&"is-valid",u&&"is-invalid")}))}));I.displayName="FormFileInput";var F=I,g=["bsPrefix","bsCustomPrefix","className","htmlFor"],k=n.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.bsCustomPrefix,c=e.className,d=e.htmlFor,f=Object(s.a)(e,g),u=Object(o.useContext)(v),m=u.controlId,b=u.custom?[l,"custom-file-label"]:[t,"form-file-label"],x=b[0],O=b[1];return t=Object(p.a)(x,O),n.a.createElement("label",Object(r.a)({},f,{ref:a,htmlFor:d||m,className:i()(c,t),"data-browse":f["data-browse"]}))}));k.displayName="FormFileLabel";var R=k,V=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],L=n.a.forwardRef((function(e,a){var t=e.id,l=e.bsPrefix,c=e.bsCustomPrefix,d=e.disabled,f=void 0!==d&&d,u=e.isValid,m=void 0!==u&&u,x=e.isInvalid,O=void 0!==x&&x,j=e.feedbackTooltip,y=void 0!==j&&j,N=e.feedback,P=e.className,h=e.style,w=e.label,E=e.children,C=e.custom,I=e.lang,g=e["data-browse"],k=e.as,L=void 0===k?"div":k,T=e.inputAs,S=void 0===T?"input":T,M=Object(s.a)(e,V),_=C?[c,"custom"]:[l,"form-file"],z=_[0],A=_[1];l=Object(p.a)(z,A);var G=Object(o.useContext)(v).controlId,q=Object(o.useMemo)((function(){return{controlId:t||G,custom:C}}),[G,C,t]),J=null!=w&&!1!==w&&!E,U=n.a.createElement(F,Object(r.a)({},M,{ref:a,isValid:m,isInvalid:O,disabled:f,as:S,lang:I}));return n.a.createElement(v.Provider,{value:q},n.a.createElement(L,{style:h,className:i()(P,l,C&&"custom-file")},E||n.a.createElement(n.a.Fragment,null,C?n.a.createElement(n.a.Fragment,null,U,J&&n.a.createElement(R,{"data-browse":g},w)):n.a.createElement(n.a.Fragment,null,J&&n.a.createElement(R,null,w),U),(m||O)&&n.a.createElement(b,{type:m?"valid":"invalid",tooltip:y},N))))}));L.displayName="FormFile",L.Input=F,L.Label=R;var T=L,S=(t(103),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),M=n.a.forwardRef((function(e,a){var t,l,c=e.bsPrefix,d=e.bsCustomPrefix,f=e.type,u=e.size,m=e.htmlSize,b=e.id,x=e.className,O=e.isValid,j=void 0!==O&&O,y=e.isInvalid,N=void 0!==y&&y,P=e.plaintext,h=e.readOnly,w=e.custom,E=e.as,C=void 0===E?"input":E,I=Object(s.a)(e,S),F=Object(o.useContext)(v).controlId,g=w?[d,"custom"]:[c,"form-control"],k=g[0],R=g[1];if(c=Object(p.a)(k,R),P)(l={})[c+"-plaintext"]=!0,t=l;else if("file"===f){var V;(V={})[c+"-file"]=!0,t=V}else if("range"===f){var L;(L={})[c+"-range"]=!0,t=L}else if("select"===C&&w){var T;(T={})[c+"-select"]=!0,T[c+"-select-"+u]=u,t=T}else{var M;(M={})[c]=!0,M[c+"-"+u]=u,t=M}return n.a.createElement(C,Object(r.a)({},I,{type:f,size:m,ref:a,readOnly:h,id:b||F,className:i()(x,t,j&&"is-valid",N&&"is-invalid")}))}));M.displayName="FormControl";var _=Object.assign(M,{Feedback:b}),z=["bsPrefix","className","children","controlId","as"],A=n.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.className,c=e.children,d=e.controlId,f=e.as,u=void 0===f?"div":f,m=Object(s.a)(e,z);t=Object(p.a)(t,"form-group");var b=Object(o.useMemo)((function(){return{controlId:d}}),[d]);return n.a.createElement(v.Provider,{value:b},n.a.createElement(u,Object(r.a)({},m,{ref:a,className:i()(l,t)}),c))}));A.displayName="FormGroup";var G=A,q=t(153),J=["as","bsPrefix","column","srOnly","className","htmlFor"],U=n.a.forwardRef((function(e,a){var t=e.as,l=void 0===t?"label":t,c=e.bsPrefix,d=e.column,f=e.srOnly,u=e.className,m=e.htmlFor,b=Object(s.a)(e,J),x=Object(o.useContext)(v).controlId;c=Object(p.a)(c,"form-label");var O="col-form-label";"string"===typeof d&&(O=O+" "+O+"-"+d);var j=i()(u,c,f&&"sr-only",d&&O);return m=m||x,d?n.a.createElement(q.a,Object(r.a)({ref:a,as:"label",className:j,htmlFor:m},b)):n.a.createElement(l,Object(r.a)({ref:a,className:j,htmlFor:m},b))}));U.displayName="FormLabel",U.defaultProps={column:!1,srOnly:!1};var B=U,D=["bsPrefix","className","as","muted"],H=n.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.className,o=e.as,c=void 0===o?"small":o,d=e.muted,f=Object(s.a)(e,D);return t=Object(p.a)(t,"form-text"),n.a.createElement(c,Object(r.a)({},f,{ref:a,className:i()(l,t,d&&"text-muted")}))}));H.displayName="FormText";var K=H,Q=n.a.forwardRef((function(e,a){return n.a.createElement(E,Object(r.a)({},e,{ref:a,type:"switch"}))}));Q.displayName="Switch",Q.Input=E.Input,Q.Label=E.Label;var W=Q,X=t(112),Y=["bsPrefix","inline","className","validated","as"],Z=Object(X.a)("form-row"),$=n.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.inline,o=e.className,c=e.validated,d=e.as,f=void 0===d?"form":d,u=Object(s.a)(e,Y);return t=Object(p.a)(t,"form"),n.a.createElement(f,Object(r.a)({},u,{ref:a,className:i()(o,c&&"was-validated",l&&t+"-inline")}))}));$.displayName="Form",$.defaultProps={inline:!1},$.Row=Z,$.Group=G,$.Control=_,$.Check=E,$.File=T,$.Switch=W,$.Label=B,$.Text=K;a.a=$}}]);
//# sourceMappingURL=39.b5a80331.chunk.js.map