"use strict";(self.webpackChunkbuddyshop=self.webpackChunkbuddyshop||[]).push([[653],{2653:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var r=n(885),s=n(2791),a=n(184),i=function(e){var t=e.step,n=void 0===t?0:t;return(0,a.jsx)("ol",{className:"stepper",children:["Meta","Sizes","Review","Images"].map((function(e,t){return(0,a.jsx)("li",{className:"stepper__item ".concat(n>t?"visited":""," ").concat(n===t?"current":""),"data-index":t+1,children:(0,a.jsx)("h6",{className:"stepper__title",children:e})},e)}))})},o=n(4942),l=n(1413),d=n(2982),u=n(5118),c=function(e){var t=e.prevStep,n=void 0!==t&&t,r=e.nextStep,s=void 0!==r&&r,i=e.handleSubmit,o=void 0!==i&&i;return(0,a.jsxs)("div",{className:"switcher",children:[n&&(0,a.jsx)("button",{onClick:n,children:"Previous Step"}),s&&(0,a.jsx)("button",{onClick:s,children:"Next Step"}),o&&(0,a.jsx)("button",{onClick:o,children:"Submit"})]})},v={value:/^[0-9]+$/,message:"Invalid Input, Only numbers are valid."},p=[{name:"size",type:"text",options:{minLength:{value:1,message:"size should not be empty."},maxLength:{value:10,message:"size length should not be more than 10."},required:"Please provide size name.",pattern:{value:/^[A-Za-z0-9_-]+$/,message:"Invalid Input, Only single word with '_' or '-' symbols are valid"}}},{name:"allowed",type:"number",options:{pattern:v,required:"Please provide allowed items per transaction",max:{value:99,message:"Max 99 products are allowed to be purchased for a single transaction"},min:{value:1,message:"Customer should be able to add at least 1 item"}}},{name:"stock",type:"number",options:{pattern:v,required:"Please provide total stock items you have for selling",max:{value:99999,message:"Max 99999 products are allowed to add as stock"},min:{value:1,message:"You should have at least 1 item in stock."}}},{name:"price",type:"number",options:{pattern:v,required:"Please provide price you are providing for this product.",max:{value:999999,message:"If you want to sell an IPhone this is not the place."},min:{value:1,message:"If you want to sell it for free, contact me I will accept everything."}}},{name:"retail_price",type:"number",options:{pattern:v,required:"Please provide retail price for this product. Here you can add MRP for the product.",max:{value:999999,message:"Tooooooooooo costly\ud83e\udd75"},min:{value:1,message:"Tooooooooooooo cheap\ud83d\ude2f"}}}],m=function(e){var t=e.register,n=e.errors;return null===p||void 0===p?void 0:p.map((function(e){var r=e.name,s=e.type,i=e.options;return(0,a.jsxs)("div",{children:[" ",(0,a.jsxs)("label",{children:[r,(0,a.jsx)("input",(0,l.Z)({name:r,type:s,"aria-invalid":n[r]?"true":"false"},t(r,(0,l.Z)({},i))))]}),n[r]&&(0,a.jsx)("span",{className:"error",children:n[r].message})]},r)}))},h=function(e){var t=e.sizes,n=e.handler,r=void 0!==n&&n;return null===t||void 0===t?void 0:t.map((function(e){var t=e.allowed,n=e.price,s=e.retail_price,i=e.size,o=e.stock;return(0,a.jsxs)("div",{className:"size_list_item",children:[(0,a.jsx)("h3",{children:i}),(0,a.jsxs)("h4",{children:[(0,a.jsxs)("span",{children:["Allowed: ",t]}),(0,a.jsxs)("span",{children:["Stock: ",o]})]}),(0,a.jsxs)("h4",{children:[(0,a.jsxs)("span",{children:["Price: ",n]}),(0,a.jsxs)("span",{children:["MRP: ",s]})]}),r&&(0,a.jsx)("div",{className:"delete",onClick:function(){return r(i)},children:"\u2716"})]},i)}))},g=function(e){var t=e.toggle,n=e.sizes,r=e.deleteSize;return(0,a.jsxs)("div",{children:[(0,a.jsx)(h,{sizes:n,handler:r}),(0,a.jsx)("button",{onClick:t,children:"Add Size"})]})},f=n(9434),x=n(6612),j=function(e){var t=e.prevStep,n=e.nextStep,i=e.updateSizes,o=e.data,l=(0,u.cI)(),v=l.register,p=l.handleSubmit,h=l.formState.errors,j=l.reset,b=(0,f.I0)(),y=(0,s.useState)((function(){return o})),S=(0,r.Z)(y,2),z=S[0],w=S[1],N=(0,s.useState)((function(){return!(z.length<1)})),I=(0,r.Z)(N,2),Z=I[0],k=I[1],_=function(){k((function(e){return!e}))};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("form",{children:Z?(0,a.jsx)(g,{toggle:_,sizes:z,deleteSize:function(e){w((function(t){return t.filter((function(t){return(null===t||void 0===t?void 0:t.size)!==e}))}))}}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(m,{register:v,errors:h}),(0,a.jsxs)("div",{className:"secondary_buttons",children:[(0,a.jsx)("button",{className:"cancel",onClick:function(){j(),_()},children:"Cancel"}),(0,a.jsx)("button",{onClick:p((function(e){if(console.log(e),!Z)return z.filter((function(t){return t.size===e.size})).length?(b((0,x.f)({message:"Size with the same name already exists",color:"danger"})),void j({size:""})):(j(),t=e,w((function(e){return[].concat((0,d.Z)(e),[t])})),void _());var t})),children:"Add Size"})]})]})}),(0,a.jsx)(c,{prevStep:t,nextStep:function(){Z?z.length<1?b((0,x.f)({message:"Please add at least one size",color:"danger"})):(i(z,"sizes"),n()):b((0,x.f)({message:"Please add the size first or cancel before proceeding to next step",color:"danger"}))}})]})},b=function(e){var t=e.errors,n=e.register,r=e.options;return(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{children:["Title",(0,a.jsx)("input",(0,l.Z)({name:"title",type:"text","aria-invalid":t.title?"true":"false"},n("title",(0,l.Z)({},r(!0,3,30,"Title")))))]}),t.title&&(0,a.jsx)("span",{className:"error",children:t.title.message})]})},y=function(e){var t=e.updateMeta,n=e.nextStep,r=e.step,s=e.data,i=(0,u.cI)({defaultValues:s}),o=i.register,d=i.handleSubmit,v=i.formState.errors,p=(0,f.v9)((function(e){return e.auth.seller.products})),m=(0,f.I0)(),h=function(e,t,n,r){var s={};return e&&(s.pattern={value:/^[a-zA-z0-9]+([\s][a-zA-Z0-9]+)+$/,message:"Invalid Input! Title should be multi-word with no special characters"}),t&&(s.minLength={value:t,message:"Length should be more than ".concat(t)}),n&&(s.maxLength={value:n,message:"Length should not be more than ".concat(n)}),r&&(s.required="".concat(r," field is required")),s};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("form",{children:[(0,a.jsx)(b,{errors:v,register:o,options:h}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{children:["Description",(0,a.jsx)("textarea",(0,l.Z)((0,l.Z)({},o("description",(0,l.Z)({},h(!1,50,300,"Description")))),{},{rows:3}))]}),v.description&&(0,a.jsx)("span",{className:"error",children:v.description.message})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{children:["Category",(0,a.jsxs)("select",(0,l.Z)((0,l.Z)({},o("category",{required:"category is required field"})),{},{children:[(0,a.jsx)("option",{value:"Dog",children:"Dog"}),(0,a.jsx)("option",{value:"Cat",children:"Cat"})]}))]}),v.category&&(0,a.jsx)("span",{className:"error",children:v.category.message})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{children:["Sub-Category",(0,a.jsxs)("select",(0,l.Z)((0,l.Z)({},o("sub_category",{required:"sub category is required field"})),{},{children:[(0,a.jsx)("option",{value:"Food",children:"Food"}),(0,a.jsx)("option",{value:"Treats",children:"Treats"}),(0,a.jsx)("option",{value:"Health",children:"Health"}),(0,a.jsx)("option",{value:"Toys",children:"Toys"}),(0,a.jsx)("option",{value:"Grooming",children:"Grooming"})]}))]}),v.sub_category&&(0,a.jsx)("span",{className:"error",children:v.sub_category.message})]})]}),(0,a.jsx)(c,{step:r,nextStep:d((function(e){p.filter((function(t){return t.title===e.title})).length?m((0,x.f)({message:"Product with same name already uploaded! Either edit it or add different product!",color:"danger"})):(t(e,"meta"),n())}))})]})},S=n(5861),z=n(7757),w=n.n(z),N=n(8737),I=n(4569),Z=n.n(I),k=function(e){var t=e.image,n=e.upload,i=void 0!==n&&n,o=e.index,l=e.removeHandler,d=(0,s.useState)((function(){return i})),u=(0,r.Z)(d,1)[0],c=!(null===t||void 0===t||!t.name)&&URL.createObjectURL(t),v=(0,s.useRef)(null);return(0,s.useEffect)((function(){var e=v.current;if(e){var t=function(){return null===e||void 0===e?void 0:e.classList.add("dragging")},n=function(){return null===e||void 0===e?void 0:e.classList.remove("dragging")};return null===e||void 0===e||e.addEventListener("dragstart",t),null===e||void 0===e||e.addEventListener("dragend",n),function(){null===e||void 0===e||e.removeEventListener("dragstart",t),null===e||void 0===e||e.removeEventListener("dragend",n),c&&URL.revokeObjectURL(c)}}})),(0,a.jsxs)("li",{draggable:!0,ref:v,className:"draggable","data-index":o,children:[(0,a.jsx)("img",{src:c,alt:t.name,width:150,height:100}),(0,a.jsxs)("div",{className:"content",children:[(0,a.jsx)("span",{className:"name",title:null===t||void 0===t?void 0:t.name,children:null===t||void 0===t?void 0:t.name}),u&&(0,a.jsx)("span",{children:"Uploading"}),u?(0,a.jsx)("div",{className:"progress-bar",children:(0,a.jsx)("progress",{value:20,max:100})}):(0,a.jsxs)("div",{className:"size_and_remove",children:[(0,a.jsx)("span",{className:"size",children:Intl.NumberFormat("en",{style:"unit",unit:"kilobyte",notation:"compact"}).format((null===t||void 0===t?void 0:t.size)/1024)}),(0,a.jsx)("span",{onClick:function(){return l(o)},children:"Remove"})]})]})]})},_=function(e){var t=e.images,n=e.removeImage,r=e.moveImages,i=(0,s.useRef)(null);return(0,s.useEffect)((function(){var e=i.current;if(e){var n,s=function(s){var a;null===s||void 0===s||s.preventDefault();var i=null===(a=n)||void 0===a?void 0:a.dataset.index,o=function(t){var n,r=(0,d.Z)(e.querySelectorAll(".draggable:not(.dragging)"));return null===r||void 0===r||null===(n=r.reduce((function(e,n){var r=n.getBoundingClientRect(),s=t-r.top-r.height/2;return s<0&&s>e.offset?{offset:s,element:n}:e}),{offset:Number.NEGATIVE_INFINITY}))||void 0===n?void 0:n.element}(s.clientY),l=null===o||void 0===o?void 0:o.dataset.index;i&&l&&i!==l&&r(t,l,i)},a=function(){return n=e.getElementsByClassName("dragging")[0]};return null===e||void 0===e||e.addEventListener("dragstart",a),null===e||void 0===e||e.addEventListener("dragend",s),function(){null===e||void 0===e||e.removeEventListener("dragstart",a),null===e||void 0===e||e.removeEventListener("dragend",s)}}}),[t,r]),(0,a.jsx)("div",{className:"uploaded-area",children:(0,a.jsx)("ol",{ref:i,children:t.map((function(e,t){return(0,a.jsx)(k,{image:e,removeHandler:n,index:t},null===e||void 0===e?void 0:e.name)}))})})},L=function(){return(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{d:"M18.42 8.22a7 7 0 0 0-13.36 1.89A4 4 0 0 0 6 18a1 1 0 0 0 0-2 2 2 0 0 1 0-4 1 1 0 0 0 1-1 5 5 0 0 1 9.73-1.61 1 1 0 0 0 .78.67 3 3 0 0 1 .24 5.84 1 1 0 0 0 .5 1.94 5 5 0 0 0 .17-9.62zm-5.71 2.07a1 1 0 0 0-.33-.21 1 1 0 0 0-.76 0 1 1 0 0 0-.33.21l-3 3a1 1 0 0 0 1.42 1.42l1.29-1.3V19a1 1 0 0 0 2 0v-5.59l1.29 1.3a1 1 0 1 0 1.42-1.42z"})})},C=(0,s.memo)(L),E=function(e){var t=e.images,n=e.addMessage,r=e.updateImages,s=function(e){null===e||void 0===e||e.preventDefault();var s=function(e){return t.some((function(t){return t.name===e.name&&t.size===e.size}))},a=(null===e||void 0===e?void 0:e.dataTransfer)||!1,i=a?a.files:e.target.files,o=null===i||void 0===i?void 0:i.length;o+(null===t||void 0===t?void 0:t.length)>3&&(o=3,n("Image limit exceeds! Please select less than 3 Images!"));for(var l=[],d=0;d<o;d++){var u;"image/png"!==(null===(u=i[d])||void 0===u?void 0:u.type)?n("Unsupported file type! Please only use PNG transparent images"):s(i[d])?n("Image already Added"):null===l||void 0===l||l.push(i[d])}l&&r(l)};return(0,a.jsxs)("form",{className:"image_form",onDragOver:function(e){return null===e||void 0===e?void 0:e.preventDefault()},onDrop:s,children:[(0,a.jsxs)("label",{htmlFor:"images_input",children:[(0,a.jsx)(C,{}),(0,a.jsx)("h3",{children:"Browse files to upload or drag here"})]}),(0,a.jsx)("input",{type:"file",id:"images_input",onChange:s,accept:".png",multiple:!0})]})},P=n(6871),F=function(e){var t=e.prevStep,n=e.state,i=(0,s.useState)((function(){return[]})),o=(0,r.Z)(i,2),l=o[0],u=o[1],v=(0,f.I0)(),p=(0,P.s0)(),m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"danger";v((0,x.f)({message:e,color:t}))},h=function(){var e=(0,S.Z)(w().mark((function e(){var t,r,s,a,i;return w().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=new FormData,s={headers:{"content-type":"multipart/form-data"},validateStatus:function(){return!0}},null===l||void 0===l||l.forEach((function(e){return r.append("product_image",e)})),null===(t=Object.keys(n.meta))||void 0===t||t.forEach((function(e){return r.append(e,n.meta[e])})),r.append("sizes",JSON.stringify(n.sizes)),e.next=8,Z().post("/seller/product/add",r,s);case 8:if(a=e.sent,!(i=a.data).error){e.next=12;break}throw new Error(i.data);case 12:v((0,N.g)({id:i.product._id,title:i.product.title})),m(i.data,"success"),p("/dashboard"),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(0),console.log(e.t0),m((null===e.t0||void 0===e.t0?void 0:e.t0.message)||"File upload failed! Please try again!");case 21:case"end":return e.stop()}}),e,null,[[0,17]])})));return function(){return e.apply(this,arguments)}}();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"wrapper",children:[(0,a.jsx)(E,{images:l,addMessage:m,updateImages:function(e){u((function(t){return[].concat((0,d.Z)(t),(0,d.Z)(e))}))}}),(0,a.jsx)(_,{images:l,removeImage:function(e){u((function(t){return t.filter((function(t,n){return n!==e}))}))},moveImages:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0,r=l[n];u((function(){var s=(0,d.Z)(e);return s.splice(n,1),[].concat((0,d.Z)(s.slice(0,t)),[r],(0,d.Z)(s.slice(t)))}))}})]}),(0,a.jsx)(c,{prevStep:t,handleSubmit:h})]})},q=function(e){var t=e.prevStep,n=e.nextStep,r=e.data,s=r.meta,i=r.sizes;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("dl",{children:(0,a.jsx)(T,{data:s})}),(0,a.jsx)("div",{children:(0,a.jsx)(h,{sizes:i})}),(0,a.jsx)(c,{nextStep:n,prevStep:t})]})},T=function(e){var t,n=e.data;return null===(t=Object.keys(n))||void 0===t?void 0:t.map((function(e){return(0,a.jsxs)(s.Fragment,{children:[(0,a.jsx)("dt",{children:e}),(0,a.jsx)("dd",{children:n[e]})]},e)}))},R=function(e){var t=e.step,n=e.nextStep,i=e.prevStep,d=(0,s.useState)({meta:{title:"",description:"",category:"",sub_category:""},sizes:[]}),u=(0,r.Z)(d,2),c=u[0],v=u[1],p=function(e,t){v((function(n){return(0,l.Z)((0,l.Z)({},n),{},(0,o.Z)({},t,e))}))};switch(t){case 0:return(0,a.jsx)(y,{nextStep:n,data:c.meta,updateMeta:p});case 1:return(0,a.jsx)(j,{prevStep:i,nextStep:n,data:c.sizes,updateSizes:p});case 2:return(0,a.jsx)(q,{prevStep:i,nextStep:n,data:c});case 3:return(0,a.jsx)(F,{prevStep:i,state:c});default:return(0,a.jsx)(y,{nextStep:n})}},A=function(){var e=(0,s.useState)((function(){return 0})),t=(0,r.Z)(e,2),n=t[0],o=t[1];return(0,a.jsxs)("section",{className:"product_form",children:[(0,a.jsx)(i,{step:n}),(0,a.jsx)(R,{prevStep:function(){n<=0||o((function(e){return e-1}))},nextStep:function(){n>=3||o((function(e){return e+1}))},step:n})]})}}}]);
//# sourceMappingURL=653.505950ff.chunk.js.map