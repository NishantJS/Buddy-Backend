"use strict";(self.webpackChunkbuddyshop=self.webpackChunkbuddyshop||[]).push([[591],{1591:function(e,n,t){t.r(n),t.d(n,{default:function(){return j}});var a=t(1413),r=t(5861),s=t(885),i=t(7757),l=t.n(i),o=t(2791),d=t(5118),u=[{name:"full_name",type:"text",options:{minLength:{value:3,message:"full name length should be more than 3"},maxLength:{value:30,message:"full name length should not be more than 30"},required:"Please provide your full name",pattern:{value:/^[a-zA-z]+([\s][a-zA-Z]+)+$/,message:"Invalid Input"}}},{name:"line1",type:"text",options:{minLength:{value:3,message:"line1 length should be more than 3"},maxLength:{value:30,message:"line1 length should not be more than 30"},required:"Please provide your room no, building name",pattern:{value:/^[a-zA-z0-9]+([\s][a-zA-Z0-9]+)+$/,message:"Invalid Input"}}},{name:"line2",type:"text",options:{minLength:{value:3,message:"line2 length should be more than 3"},maxLength:{value:30,message:"line2 length should not be more than 30"},required:"Please provide your room no, building name",pattern:{value:/^[a-zA-z0-9]+([\s][a-zA-Z0-9]+)+$/,message:"Invalid Input"}}},{name:"phone",type:"number",options:{required:"Please provide your primary mobile number",pattern:{value:/[6-9]{1}[0-9]{9}$/,message:"Only provide 10 digit mobile number without country code and no special characters."}}},{name:"pin",type:"number",options:{required:"Please provide your pin-code",pattern:{value:/[1-9]{1}[0-9]{5}$/,message:"Only provide 6 digit pincode without special characters."}}},{name:"city",type:"text",options:{minLength:{value:3,message:"city length should be more than 3"},maxLength:{value:20,message:"city length should not be more than 20"},required:"Please provide your city or district name"},disabled:!0},{name:"state",type:"text",options:{minLength:{value:3,message:"state length should be more than 3"},maxLength:{value:20,message:"state length should not be more than 20"},required:"Please provide your state name"},disabled:!0},{name:"isPrimary",type:"checkbox",value:"Default Address"}],c=t(9434),p=t(4569),h=t.n(p),m=t(6612),v=t(741),f=t(184),g=function(e){var n,t=e.data,a=e.dispatch,r=e.isSeller;return null===(n=t.address)||void 0===n?void 0:n.map((function(e){return(0,f.jsxs)("address",{children:[(0,f.jsxs)("h3",{children:[null===e||void 0===e?void 0:e.full_name," ",(null===e||void 0===e?void 0:e.isPrimary)&&(0,f.jsx)("span",{className:"primary",children:"Default address"})]}),(0,f.jsxs)("span",{children:[null===e||void 0===e?void 0:e.line1,", ",null===e||void 0===e?void 0:e.line2]}),(0,f.jsxs)("span",{children:[null===e||void 0===e?void 0:e.city,", ",null===e||void 0===e?void 0:e.state]}),(0,f.jsx)("span",{children:null===e||void 0===e?void 0:e.pin}),null===e||void 0===e?void 0:e.phone.join(", "),(0,f.jsx)("span",{className:"delete",onClick:function(){return n=e._id,void a((0,v.Io)(n,r));var n},children:"\ud83d\uddd9"})]},e.full_name+(null===e||void 0===e?void 0:e.line1))}))},y=function(e){var n=e.handler;return(0,f.jsx)("button",{onClick:n,children:"Add Address"})},x=function(e){var n=e.handler,t=e.dispatch,s=e.isSeller,i=(0,d.cI)(),o=i.register,c=i.handleSubmit,p=i.formState.errors,g=i.setValue,y=function(){var e=(0,r.Z)(l().mark((function e(r){var i,o,d;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h().post("/".concat(s?"seller":"user","/address/add"),(0,a.Z)({},r),{validateStatus:function(){return!0}});case 2:o=e.sent,d={full_name:r.full_name,line1:r.line1,line2:r.line2,state:r.state,city:r.city,phone:[r.phone],pin:r.pin,isPrimary:r.isPrimary},null!==o&&void 0!==o&&null!==(i=o.data)&&void 0!==i&&i.error||t((0,v.y$)({address:d,isSeller:s})),n();case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),x=function(){var e=(0,r.Z)(l().mark((function e(n){var a,r,s,i,o,d,u,c,p;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=function(){g("city",""),g("state","")},(s=null===n||void 0===n||null===(a=n.target)||void 0===a?void 0:a.value)&&!isNaN(parseInt(s))){e.next=5;break}return r(),e.abrupt("return");case 5:if(i=/[1-9]{1}[0-9]{5}$/,o=parseInt(s),i.test(s)){e.next=10;break}return r(),e.abrupt("return");case 10:return e.next=12,h().get("https://api.postalpincode.in/pincode/".concat(o));case 12:if(d=e.sent,"Error"!==(u=d.data)[0].Status&&"Delivery"===u[0].PostOffice[0].DeliveryStatus){e.next=18;break}return t((0,m.f)({message:"Sorry! Address is not available for deleivery yet!",color:"danger"})),r(),e.abrupt("return");case 18:c=u[0].PostOffice[0],p="NA"!==c.Block?c.Block:c.District,g("city",p),g("state",c.State);case 22:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,f.jsxs)("form",{onSubmit:c(y),children:[null===u||void 0===u?void 0:u.map((function(e){var n=e.name,t=e.value,r=void 0===t?"":t,s=e.type,i=e.options,l=e.disabled,d=void 0!==l&&l;return(0,f.jsxs)("div",{children:[(0,f.jsxs)("label",{children:[r||n,(0,f.jsx)("input",(0,a.Z)((0,a.Z)({name:n,type:s,"aria-invalid":p[n]?"true":"false"},o(n,(0,a.Z)({},i))),{},{disabled:d,onChange:function(e){return"pin"===n?x(e):{}}}))]}),p[n]&&(0,f.jsx)("span",{className:"error",children:p[n].message})]},"".concat(n).concat(r))})),(0,f.jsx)("input",{type:"submit"})]})},b=function(e){var n=e.isSeller,t=(0,c.v9)((function(e){return e.auth[n?"seller":"user"]})),a=(0,o.useState)((function(){return!1})),r=(0,s.Z)(a,2),i=r[0],l=r[1],d=(0,c.I0)(),u=function(){var e;(null===t||void 0===t||null===(e=t.address)||void 0===e?void 0:e.length)>3?d((0,m.f)({message:"Address length exceeds! Please delete any one address to add this",color:"danger"})):l((function(e){return!e}))};return(0,f.jsx)("div",{className:"add_address",id:"address",children:i?(0,f.jsx)(x,{handler:u,dispatch:d,isSeller:n}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{className:"list",children:(0,f.jsx)(g,{data:t,dispatch:d,isSeller:n})}),(0,f.jsx)(y,{handler:u})]})})},j=function(e){var n=e.isSeller;return(0,f.jsx)("section",{className:"profile",children:(0,f.jsx)(b,{isSeller:n})})}}}]);
//# sourceMappingURL=591.614260e2.chunk.js.map