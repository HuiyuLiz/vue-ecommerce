(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cart_List"],{"05ae":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row justify-content-center mb-3"},e._l(e.progress,(function(t,n){return a("div",{key:n,staticClass:"col-md-3"},[a("div",{staticClass:"alert border text-secondary d-none d-md-flex justify-content-center",class:{"d-flex alert-secondary":e.step===n},attrs:{role:"alert"}},[e._v("\n      "+e._s(t)+"\n    ")])])})),0)},o=[],c=(a("c5f6"),{name:"CartProgress",props:{step:{type:Number,required:!0}},data:function(){return{progress:["1. 確認商品","2. 填寫資料","3. 完成訂購"]}},computed:{},watch:{step:function(e,t){e!==t&&this.scrollToTop()}},methods:{scrollToTop:function(){window.scrollTo(0,0)}}}),s=c,r=a("2877"),d=Object(r["a"])(s,n,o,!1,null,null,null);t["a"]=d.exports},1959:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"container-fluid px-0 "},[0===e.step?a("DiscountBanner"):e._e()],1),a("div",{staticClass:"container pt-3 pt-md-5 mt-5 pb-5"},[a("CartProgress",{attrs:{step:e.step}}),0===e.carts.length?a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"h3 text-secondary my-5 py-5"},[e._v("\n        尚未選購專輯喔!\n      ")])]):a("div",{staticClass:"row"},[0===e.step?a("div",{staticClass:"col-md-9 m-auto ",staticStyle:{"min-height":"200px"}},[a("div",{staticClass:"card text-center mb-4  border-0"},[a("div",{staticClass:"card-header bg-muted",attrs:{id:"heading"},on:{click:function(t){e.isOpen=!e.isOpen}}},[a("div",{staticClass:"mb-0 collapsed",attrs:{"data-toggle":"collapse","data-target":"#collapse","aria-expanded":"false","aria-controls":"collapse"}},[a("div",{staticClass:"d-flex align-items-center text-secondary"},[e._v("\n                購物車明細"),e.isOpen?a("i",{staticClass:"material-icons"},[e._v("\n                  arrow_drop_up\n                ")]):a("i",{staticClass:"material-icons"},[e._v("\n                  arrow_drop_down\n                ")])])])]),a("div",{staticClass:"collapse show ",attrs:{id:"collapse"}},[a("div",{staticClass:"card-body px-0"},[a("CartList",{attrs:{carts:e.carts,cart:e.cart},on:{deleteToCart:e.deleteFromCart}}),a("div",{staticClass:"mb-2 text-left small",class:{"text-success":e.isUse,"text-danger":!e.isUse}},[e._v("\n                "+e._s(e.message)+"\n              ")]),a("div",{staticClass:"input-group mb-3 input-group-sm"},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.coupon,expression:"coupon",modifiers:{trim:!0}}],staticClass:"form-control form-control-lg rounded-0",attrs:{type:"text",placeholder:"請輸入優惠碼"},domProps:{value:e.coupon},on:{input:function(t){t.target.composing||(e.coupon=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-outline-secondary rounded-0",attrs:{type:"button"},on:{click:e.useCoupon}},[e._v("\n                    套用優惠碼\n                  ")])])])],1)])]),a("div",{staticClass:"d-flex justify-content-between  mb-5"},[a("router-link",{staticClass:"btn btn-secondary w-25 w-sm-40 py-3 rounded-0",attrs:{to:{name:"shopping_List",params:{category:"all",page:1}}}},[e._v("\n            繼續購物\n          ")]),a("button",{staticClass:" btn btn-dark w-25 w-sm-40 py-3 rounded-0",on:{click:function(t){e.step++}}},[e._v("\n            下一步\n          ")])],1)]):e._e(),1===e.step?a("ValidationObserver",{ref:"form",staticClass:"col-md-9 m-auto",scopedSlots:e._u([{key:"default",fn:function(t){t.invalid;return[a("form",{on:{submit:function(t){return t.preventDefault(),e.submitOrder(t)}}},[a("CartValidate",{attrs:{postal:e.postal,index:e.index,"user-form":e.userForm,"country-index":e.countryIndex,"area-index":e.areaIndex,areas:e.areas}}),a("div",{staticClass:"d-flex justify-content-between mb-5"},[a("button",{staticClass:"btn btn-outline-dark w-25 w-sm-40 py-3  rounded-0",on:{click:function(t){t.preventDefault(),e.step--}}},[e._v("\n              上一步\n            ")]),a("button",{staticClass:"btn btn-dark w-25 w-sm-40 py-3 rounded-0"},[e._v("\n              送出訂單\n            ")])])],1)]}}],null,!1,201354525)}):e._e()],1)],1)])},o=[],c=(a("96cf"),a("3b8d")),s=(a("7f7f"),a("4ec3")),r=a("70e0"),d=a("5fa6"),i=a("3bac"),m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",{staticClass:"text-secondary text-left pl-md-4",attrs:{scope:"col ",colspan:e.colspan}},[e._v("\n          產品\n        ")]),a("th",{staticClass:"text-secondary d-none d-md-table-cell",attrs:{scope:"col"}},[e._v("\n          數量\n        ")]),a("th",{staticClass:"text-secondary text-right",attrs:{scope:"col"}},[e._v("\n          價格\n        ")])])]),a("tbody",e._l(e.carts,(function(t,n){return a("CartListItem",{key:n,tag:"tr",attrs:{item:t,colspan:e.colspan},on:{deleteToCart:e.deleteToCart}})})),1),a("tfoot",{},[a("tr",[a("td",{staticClass:"text-right text-secondary",attrs:{colspan:"4"}},[e._v("\n          商品金額\n        ")]),a("td",{staticClass:"text-right text-secondary"},[e._v("\n          "+e._s(e._f("currency")(e.cart.total))+"\n        ")])]),e._m(0),e.cart.finalTotal!==e.cart.total?a("tr",[a("td",{staticClass:"text-right text-danger font-weight-bold",attrs:{colspan:"4"}},[e._v("\n          總計\n        ")]),a("td",{staticClass:"text-right text-danger font-weight-bold"},[e._v("\n          "+e._s(e._f("currency")(e.cart.finalTotal))+"\n        ")])]):e._e()])])])},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("tr",[a("td",{staticClass:"text-right border-0 text-secondary",attrs:{colspan:"4"}},[e._v("\n          運費小計\n        ")]),a("td",{staticClass:"text-right border-0 text-secondary"},[e._v("\n          $0\n        ")])])}],u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("tr",[a("td",{staticClass:"align-middle",attrs:{colspan:e.colspan}},[a("div",{staticClass:"d-flex text-left align-items-center"},[a("div",{staticClass:"col-4 col-md-3 px-0 px-md-3"},[a("img",{staticClass:"img-fluid",attrs:{src:e.item.product.imageUrl,alt:""}})]),a("div",{staticClass:"col-8 col-md-8 d-flex flex-column pr-0"},[a("small",{staticClass:"mb-1 mb-md-3 text-secondary"},[e._v(e._s(e.item.product.title.trim().split("/")[0]))]),a("span",{staticClass:"h6 mb-0 text-secondary"},[e._v(e._s(e.item.product.title.trim().split("/")[1]))]),e.item.coupon?a("div",{staticClass:"small mt-3 text-success"},[e._v("\n          已符合折扣活動\n        ")]):e._e(),a("CountButton",{staticClass:"d-flex d-md-none",attrs:{item:e.item}}),e.item.qty>=20?a("div",{staticClass:"small my-2 mt-md-3 text-danger d-flex d-md-none"},[e._v("\n          抱歉，已達目前限購數量\n        ")]):e._e()],1)])]),a("td",{staticClass:"align-middle text-secondary d-none d-md-table-cell",staticStyle:{width:"20%"}},[a("CountButton",{staticClass:"d-none d-md-flex",attrs:{item:e.item}}),e.item.qty>=20?a("div",{staticClass:"small mt-3 text-danger"},[e._v("\n      抱歉，已達目前限購數量\n    ")]):e._e()],1),a("td",{staticClass:"align-middle text-right"},[a("div",{staticClass:"mb-3 btn-delete",staticStyle:{cursor:"pointer"},on:{click:function(t){return e.deleteToCart(e.item.id)}}},[a("span",{staticClass:"material-icons btn-delete"},[e._v("clear")])]),a("div",{staticClass:"d-flex flex-column"},[a("span",{staticClass:"mb-3 text-secondary"},[e._v(e._s(e._f("currency")(e.item.final_total)))]),a("del",{staticClass:"text-muted"},[e._v(e._s(e._f("currency")(e.item.product.origin_price*e.item.qty)))])])])])},p=[],f=(a("c5f6"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"btn-group mt-3 text-center mb-3 mb-md-0 ",attrs:{role:"group","aria-label":"Basic example"}},[a("button",{staticClass:"btn btn-outline-secondary py-2 px-2 rounded-0",class:{"disabled button-secondary":e.item.qty<=1},staticStyle:{width:"40px"},attrs:{type:"button",disabled:e.item.qty<=1},on:{click:function(t){return e.numberHandler(e.item,-1)}}},[e._v("\n    -\n  ")]),a("button",{staticClass:"btn btn-outline-secondary py-2 text-center",staticStyle:{width:"45%"},attrs:{type:"button"}},[a("span",{staticClass:"text-center"},[e._v(e._s(e.item.qty))])]),a("button",{staticClass:"btn btn-outline-secondary py-2 px-2 rounded-0",class:{"disabled button-secondary":e.item.qty>=20},staticStyle:{width:"40px"},attrs:{type:"button",disabled:e.item.qty>=20},on:{click:function(t){return e.numberHandler(e.item,1)}}},[e._v("\n    +\n  ")])])}),h=[],v={name:"CountButton",props:{item:{type:Object,required:!0}},data:function(){return{num:null,total:10,product_id:""}},methods:{numberHandler:function(e,t){this.num=this.num+t+this.total%this.total,this.product_id=e.product_id,this.addToCart(e.product_id,this.num)},addToCart:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.$store.dispatch("cart/ADD_TO_CART",{id:e,qty:t}),this.num=null}}},b=v,x=a("2877"),C=Object(x["a"])(b,f,h,!1,null,null,null),y=C.exports,_={name:"CartListItem",components:{CountButton:y},props:{item:{type:Object,required:!0},colspan:{type:Number,required:!0}},methods:{deleteToCart:function(e){this.$emit("deleteToCart",e)}}},g=_,w=Object(x["a"])(g,u,p,!1,null,null,null),k=w.exports,$={name:"CartList",components:{CartListItem:k},props:{carts:{type:Array,required:!0},cart:{type:Array,required:!0}},data:function(){return{clientWidth:null,colspan:3,breakPoint:768}},mounted:function(){this.$nextTick((function(){window.addEventListener("resize",this.getClientWidth),this.getClientWidth()}))},beforeDestroy:function(){window.removeEventListener("resize",this.getClientWidth)},methods:{deleteToCart:function(e){this.$emit("deleteToCart",e)},getClientWidth:function(){this.clientWidth=document.body.clientWidth,this.clientWidth>=this.breakPoint?this.colspan=3:this.colspan=4}}},V=$,q=Object(x["a"])(V,m,l,!1,null,null,null),F=q.exports,T=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),a("div",{staticClass:"form-group"},[a("ValidateInput",{staticClass:"classes",attrs:{text:"姓名",rules:"required",name:"username","show-label":!0},model:{value:e.userForm.user.name,callback:function(t){e.$set(e.userForm.user,"name",t)},expression:"userForm.user.name"}})],1),a("div",{staticClass:"form-group"},[a("ValidateInput",{staticClass:"classes",attrs:{text:"Email",rules:"required|email",name:"email","show-label":!0},model:{value:e.userForm.user.email,callback:function(t){e.$set(e.userForm.user,"email",t)},expression:"userForm.user.email"}})],1),a("div",{staticClass:"form-group"},[a("ValidateInput",{staticClass:"classes",attrs:{type:"tel",text:"手機號碼",rules:"required|mobile",name:"mobile","show-label":!0},model:{value:e.userForm.user.tel,callback:function(t){e.$set(e.userForm.user,"tel",t)},expression:"userForm.user.tel"}})],1),e._m(1),a("div",{staticClass:"form-group"},[a("label",{staticClass:"text-secondary",attrs:{for:"useraddress"}},[e._v("收件人地址")]),a("div",{staticClass:"form-row justify-content-center"},[a("div",{staticClass:"form-group col-md-3"},[a("ValidationProvider",{attrs:{name:"country",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.classes,o=t.errors;return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.countryIndex,expression:"countryIndex"}],staticClass:"form-control   rounded-0 mb-2",class:n,on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.countryIndex=t.target.multiple?a:a[0]}}},[a("option",{staticClass:"form-control ",attrs:{selected:"",disabled:""},domProps:{value:null}},[e._v("\n              請選擇縣市\n            ")]),e._l(e.postal,(function(t,n){return a("option",{key:t.name,staticClass:"form-control",domProps:{value:n}},[e._v("\n              "+e._s(t.name)+"\n            ")])}))],2),a("span",{staticClass:"text-danger"},[e._v(e._s(o[0]))])]}}])})],1),a("div",{staticClass:"form-group col-md-3"},[a("ValidationProvider",{attrs:{name:"zone",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.classes,o=t.errors;return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.areaIndex,expression:"areaIndex"}],staticClass:"form-control  rounded-0 mb-2",class:n,on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.areaIndex=t.target.multiple?a:a[0]}}},[a("option",{attrs:{selected:"",disabled:""},domProps:{value:null}},[e._v("\n              請選擇鄉鎮市區\n            ")]),e._l(e.areas,(function(t,n){return a("option",{key:n,domProps:{value:n}},[e._v("\n              "+e._s(t.name)+"\n            ")])}))],2),o[0]?a("span",{staticClass:"text-danger"},[e._v(e._s(o[0]))]):e._e()]}}])})],1),a("div",{staticClass:"form-group col-md-6"},[a("ValidateInput",{staticClass:"classes",attrs:{text:"地址",rules:"required",name:"address","show-label":!1},model:{value:e.userForm.user.address,callback:function(t){e.$set(e.userForm.user,"address",t)},expression:"userForm.user.address"}})],1)])]),a("hr"),a("div",{staticClass:"form-group  rounded-0 mb-5"},[a("label",{staticClass:"h5 text-secondary mt-3 mb-4 font-weight-bold title-border-decoration title-border-secondary pb-3",attrs:{for:"comment"}},[e._v("留言 (選填)")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.userForm.message,expression:"userForm.message"}],staticClass:"form-control rounded-0 mt-1",attrs:{id:"comment",name:"",cols:"30",rows:"5",placeholder:"有什麼話想對我們說呢?"},domProps:{value:e.userForm.message},on:{input:function(t){t.target.composing||e.$set(e.userForm,"message",t.target.value)}}})])])},O=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"h5 text-secondary mb-4 font-weight-bold title-border-decoration title-border-secondary pb-3"},[e._v("\n    收件人資訊 "),a("span",{staticClass:"text-danger"},[e._v(" (必填)")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"h5 text-secondary mt-5 mb-4 font-weight-bold title-border-decoration title-border-secondary pb-3"},[e._v("\n    配送資訊"),a("span",{staticClass:"text-danger"},[e._v(" (必填)")])])}],I=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ValidationProvider",{attrs:{name:e.name,rules:e.rules},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.classes,o=t.errors;return[a("label",{staticClass:"text-secondary",class:{"d-none":!e.showLabel},attrs:{for:e.name}},[e._v(e._s(e.text))]),"checkbox"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.observeValue,expression:"observeValue"}],staticClass:"form-control rounded-0 mb-2",class:n,attrs:{id:e.name,name:e.name,placeholder:"請輸入"+e.text,type:"checkbox"},domProps:{checked:Array.isArray(e.observeValue)?e._i(e.observeValue,null)>-1:e.observeValue},on:{change:function(t){var a=e.observeValue,n=t.target,o=!!n.checked;if(Array.isArray(a)){var c=null,s=e._i(a,c);n.checked?s<0&&(e.observeValue=a.concat([c])):s>-1&&(e.observeValue=a.slice(0,s).concat(a.slice(s+1)))}else e.observeValue=o}}}):"radio"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.observeValue,expression:"observeValue"}],staticClass:"form-control rounded-0 mb-2",class:n,attrs:{id:e.name,name:e.name,placeholder:"請輸入"+e.text,type:"radio"},domProps:{checked:e._q(e.observeValue,null)},on:{change:function(t){e.observeValue=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.observeValue,expression:"observeValue"}],staticClass:"form-control rounded-0 mb-2",class:n,attrs:{id:e.name,name:e.name,placeholder:"請輸入"+e.text,type:e.type},domProps:{value:e.observeValue},on:{input:function(t){t.target.composing||(e.observeValue=t.target.value)}}}),a("span",{staticClass:"text-danger"},[e._v(e._s(o[0]))])]}}])})},j=[],E={name:"ValidateInput",props:{type:{type:String,default:"text"},value:{type:[String,Number],required:!0},name:{type:String,required:!0},text:{type:String,required:!0},showLabel:{type:Boolean,default:!1},rules:{type:String,required:!0}},computed:{observeValue:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}}},L=E,P=Object(x["a"])(L,I,j,!1,null,null,null),S=P.exports,A={name:"CartList",components:{ValidateInput:S},props:{userForm:{type:Object,required:!0},index:{type:Object,required:!0},areas:{type:Array,required:!0},postal:{type:Array,required:!0}},computed:{countryIndex:{get:function(){return this.index.country},set:function(e){this.index.country=e,this.index.area=null,this.userForm.user.address=""}},areaIndex:{get:function(){return this.index.area},set:function(e){this.index.area=e}}}},N=A,R=Object(x["a"])(N,T,O,!1,null,null,null),B=R.exports,D=a("05ae"),W={name:"CartComponent",components:{CartList:F,CartValidate:B,CartProgress:D["a"],DiscountBanner:d["a"]},data:function(){return{isUse:!0,message:"",isOpen:!1,coupon:"",userForm:{user:{name:"",email:"",tel:"",address:""},message:""},isValid:!1,index:{country:null,area:null},postal:i,step:0}},computed:{countryIndex:{get:function(){return this.index.country},set:function(e){this.index.country=e,this.index.area=null,this.userForm.user.address=""}},areaIndex:{get:function(){return this.index.area},set:function(e){this.index.area=e}},currentCountry:function(){return null!==this.index.country?this.postal[this.index.country]:null},areas:function(){return null!==this.currentCountry?this.currentCountry.children:[]},currentArea:function(){return null!==this.index.area?this.areas[this.index.area].name:null},currentCode:function(){return null!==this.index.area?this.areas[this.index.area].code:null},zone:function(){return this.currentCode+" "+this.currentCountry.name+this.currentArea},carts:function(){return this.$store.state.cart?this.$store.state.cart.carts:null},cart:function(){return this.$store.state.cart?this.$store.state.cart.cart:null},finalTotal:function(){return this.cart?this.$store.state.cart.cart.finalTotal:""},total:function(){return this.cart?this.$store.state.cart.cart.total:""}},created:function(){this.getCartList()},methods:{getCartList:function(){this.$store.dispatch("cart/GET_CART_LIST")},deleteFromCart:function(e){this.$store.dispatch("cart/DELETE_FROM_CART",e)},useCoupon:function(){var e=this;this.$store.commit("loading/loading_status",!0);var t={code:this.coupon};Object(s["x"])({data:t}).then((function(t){t.data.success?(e.getCartList(),e.$store.commit("loading/loading_status",!1),e.isUse=!0,e.message=t.data.message?t.data.message:""):(e.isUse=!1,e.$store.commit("loading/loading_status",!1),e.message=t.data.message?t.data.message:"")})).catch((function(e){e instanceof ReferenceError&&r["a"].emitHandler(!1,"取得資料錯誤")}))},checkValid:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$refs.form.validate();case 2:t=e.sent,this.isValid=t;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),submitOrder:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.checkValid();case 2:if(!this.isValid){e.next=8;break}return this.userForm.user.address=this.zone+this.userForm.user.address,e.next=6,Object(s["v"])({data:this.userForm}).then((function(e){e.data.success?(t.$router.push({name:"checkout",params:{orderId:e.data.orderId}}),t.$store.commit("loading/loading_status",!1),r["a"].emitHandler(!0,e.data.message)):r["a"].emitHandler(!1,e.data.message)})).catch((function(e){e instanceof ReferenceError&&r["a"].emitHandler(!1,"取得資料錯誤")}));case 6:e.next=9;break;case 8:this.isValid=!1;case 9:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),selectZone:function(){var e=this;this.$refs.zone.filter((function(t,a){if(!t.selected)return!1;e.zone=t.value}))}}},z=W,H=(a("9c11"),Object(x["a"])(z,n,o,!1,null,null,null));t["default"]=H.exports},"3bac":function(e){e.exports=JSON.parse('[{"name":"臺北市","children":[{"name":"中正區","code":"100"},{"name":"大同區","code":"103"},{"name":"中山區","code":"104"},{"name":"松山區","code":"105"},{"name":"大安區","code":"106"},{"name":"萬華區","code":"108"},{"name":"信義區","code":"110"},{"name":"士林區","code":"111"},{"name":"北投區","code":"112"},{"name":"內湖區","code":"114"},{"name":"南港區","code":"115"},{"name":"文山區","code":"116"}]},{"name":"新北市","children":[{"name":"萬里區","code":"207"},{"name":"金山區","code":"208"},{"name":"板橋區","code":"220"},{"name":"汐止區","code":"221"},{"name":"深坑區","code":"222"},{"name":"石碇區","code":"223"},{"name":"瑞芳區","code":"224"},{"name":"平溪區","code":"226"},{"name":"雙溪區","code":"227"},{"name":"貢寮區","code":"228"},{"name":"新店區","code":"231"},{"name":"坪林區","code":"232"},{"name":"烏來區","code":"233"},{"name":"永和區","code":"234"},{"name":"中和區","code":"235"},{"name":"土城區","code":"236"},{"name":"三峽區","code":"237"},{"name":"樹林區","code":"238"},{"name":"鶯歌區","code":"239"},{"name":"三重區","code":"241"},{"name":"新莊區","code":"242"},{"name":"泰山區","code":"243"},{"name":"林口區","code":"244"},{"name":"蘆洲區","code":"247"},{"name":"五股區","code":"248"},{"name":"八里區","code":"249"},{"name":"淡水區","code":"251"},{"name":"三芝區","code":"252"},{"name":"石門區","code":"253"}]},{"name":"基隆市","children":[{"name":"仁愛區","code":"200"},{"name":"信義區","code":"201"},{"name":"中正區","code":"202"},{"name":"中山區","code":"203"},{"name":"安樂區","code":"204"},{"name":"暖暖區","code":"205"},{"name":"七堵區","code":"206"}]},{"name":"宜蘭縣","children":[{"name":"宜蘭市","code":"260"},{"name":"頭城鎮","code":"261"},{"name":"礁溪鄉","code":"262"},{"name":"壯圍鄉","code":"263"},{"name":"員山鄉","code":"264"},{"name":"羅東鎮","code":"265"},{"name":"三星鄉","code":"266"},{"name":"大同鄉","code":"267"},{"name":"五結鄉","code":"268"},{"name":"冬山鄉","code":"269"},{"name":"蘇澳鎮","code":"270"},{"name":"南澳鄉","code":"272"}]},{"name":"桃園市","children":[{"name":"中壢區","code":"320"},{"name":"平鎮區","code":"324"},{"name":"龍潭區","code":"325"},{"name":"楊梅區","code":"326"},{"name":"新屋區","code":"327"},{"name":"觀音區","code":"328"},{"name":"桃園區","code":"330"},{"name":"龜山區","code":"333"},{"name":"八德區","code":"334"},{"name":"大溪區","code":"335"},{"name":"復興區","code":"336"},{"name":"大園區","code":"337"},{"name":"蘆竹區","code":"338"}]},{"name":"新竹市","children":[{"name":"北區","code":"300"},{"name":"東區","code":"300"},{"name":"香山區","code":"300"}]},{"name":"新竹縣","children":[{"name":"竹北市","code":"302"},{"name":"湖口鄉","code":"303"},{"name":"新豐鄉","code":"304"},{"name":"新埔鎮","code":"305"},{"name":"關西鎮","code":"306"},{"name":"芎林鄉","code":"307"},{"name":"寶山鄉","code":"308"},{"name":"竹東鎮","code":"310"},{"name":"五峰鄉","code":"311"},{"name":"橫山鄉","code":"312"},{"name":"尖石鄉","code":"313"},{"name":"北埔鄉","code":"314"},{"name":"峨眉鄉","code":"315"}]},{"name":"苗栗縣","children":[{"name":"竹南鎮","code":"350"},{"name":"頭份市","code":"351"},{"name":"三灣鄉","code":"352"},{"name":"南庄鄉","code":"353"},{"name":"獅潭鄉","code":"354"},{"name":"後龍鎮","code":"356"},{"name":"通霄鎮","code":"357"},{"name":"苑裡鎮","code":"358"},{"name":"苗栗市","code":"360"},{"name":"造橋鄉","code":"361"},{"name":"頭屋鄉","code":"362"},{"name":"公館鄉","code":"363"},{"name":"大湖鄉","code":"364"},{"name":"泰安鄉","code":"365"},{"name":"銅鑼鄉","code":"366"},{"name":"三義鄉","code":"367"},{"name":"西湖鄉","code":"368"},{"name":"卓蘭鎮","code":"369"}]},{"name":"臺中市","children":[{"name":"中區","code":"400"},{"name":"東區","code":"401"},{"name":"南區","code":"402"},{"name":"西區","code":"403"},{"name":"北區","code":"404"},{"name":"北屯區","code":"406"},{"name":"西屯區","code":"407"},{"name":"南屯區","code":"408"},{"name":"太平區","code":"411"},{"name":"大里區","code":"412"},{"name":"霧峰區","code":"413"},{"name":"烏日區","code":"414"},{"name":"豐原區","code":"420"},{"name":"后里區","code":"421"},{"name":"石岡區","code":"422"},{"name":"東勢區","code":"423"},{"name":"和平區","code":"424"},{"name":"新社區","code":"426"},{"name":"潭子區","code":"427"},{"name":"大雅區","code":"428"},{"name":"神岡區","code":"429"},{"name":"大肚區","code":"432"},{"name":"沙鹿區","code":"433"},{"name":"龍井區","code":"434"},{"name":"梧棲區","code":"435"},{"name":"清水區","code":"436"},{"name":"大甲區","code":"437"},{"name":"外埔區","code":"438"},{"name":"大安區","code":"439"}]},{"name":"彰化縣","children":[{"name":"彰化市","code":"500"},{"name":"芬園鄉","code":"502"},{"name":"花壇鄉","code":"503"},{"name":"秀水鄉","code":"504"},{"name":"鹿港鎮","code":"505"},{"name":"福興鄉","code":"506"},{"name":"線西鄉","code":"507"},{"name":"和美鎮","code":"508"},{"name":"伸港鄉","code":"509"},{"name":"員林市","code":"510"},{"name":"社頭鄉","code":"511"},{"name":"永靖鄉","code":"512"},{"name":"埔心鄉","code":"513"},{"name":"溪湖鎮","code":"514"},{"name":"大村鄉","code":"515"},{"name":"埔鹽鄉","code":"516"},{"name":"田中鎮","code":"520"},{"name":"北斗鎮","code":"521"},{"name":"田尾鄉","code":"522"},{"name":"埤頭鄉","code":"523"},{"name":"溪州鄉","code":"524"},{"name":"竹塘鄉","code":"525"},{"name":"二林鎮","code":"526"},{"name":"大城鄉","code":"527"},{"name":"芳苑鄉","code":"528"},{"name":"二水鄉","code":"530"}]},{"name":"南投縣","children":[{"name":"南投市","code":"540"},{"name":"中寮鄉","code":"541"},{"name":"草屯鎮","code":"542"},{"name":"國姓鄉","code":"544"},{"name":"埔里鎮","code":"545"},{"name":"仁愛鄉","code":"546"},{"name":"名間鄉","code":"551"},{"name":"集集鎮","code":"552"},{"name":"水里鄉","code":"553"},{"name":"魚池鄉","code":"555"},{"name":"信義鄉","code":"556"},{"name":"竹山鎮","code":"557"},{"name":"鹿谷鄉","code":"558"}]},{"name":"嘉義市","children":[{"name":"東區","code":"600"},{"name":"西區","code":"600"}]},{"name":"嘉義縣","children":[{"name":"番路鄉","code":"602"},{"name":"梅山鄉","code":"603"},{"name":"竹崎鄉","code":"604"},{"name":"阿里山鄉","code":"605"},{"name":"中埔鄉","code":"606"},{"name":"大埔鄉","code":"607"},{"name":"水上鄉","code":"608"},{"name":"鹿草鄉","code":"611"},{"name":"太保市","code":"612"},{"name":"朴子市","code":"613"},{"name":"東石鄉","code":"614"},{"name":"六腳鄉","code":"615"},{"name":"新港鄉","code":"616"},{"name":"民雄鄉","code":"621"},{"name":"大林鎮","code":"622"},{"name":"溪口鄉","code":"623"},{"name":"義竹鄉","code":"624"},{"name":"布袋鎮","code":"625"}]},{"name":"雲林縣","children":[{"name":"斗南鎮","code":"630"},{"name":"大埤鄉","code":"631"},{"name":"虎尾鎮","code":"632"},{"name":"土庫鎮","code":"633"},{"name":"褒忠鄉","code":"634"},{"name":"東勢鄉","code":"635"},{"name":"臺西鄉","code":"636"},{"name":"崙背鄉","code":"637"},{"name":"麥寮鄉","code":"638"},{"name":"斗六市","code":"640"},{"name":"林內鄉","code":"643"},{"name":"古坑鄉","code":"646"},{"name":"莿桐鄉","code":"647"},{"name":"西螺鎮","code":"648"},{"name":"二崙鄉","code":"649"},{"name":"北港鎮","code":"651"},{"name":"水林鄉","code":"652"},{"name":"口湖鄉","code":"653"},{"name":"四湖鄉","code":"654"},{"name":"元長鄉","code":"655"}]},{"name":"臺南市","children":[{"name":"中西區","code":"700"},{"name":"東區","code":"701"},{"name":"南區","code":"702"},{"name":"北區","code":"704"},{"name":"安平區","code":"708"},{"name":"安南區","code":"709"},{"name":"永康區","code":"710"},{"name":"歸仁區","code":"711"},{"name":"新化區","code":"712"},{"name":"左鎮區","code":"713"},{"name":"玉井區","code":"714"},{"name":"楠西區","code":"715"},{"name":"南化區","code":"716"},{"name":"仁德區","code":"717"},{"name":"關廟區","code":"718"},{"name":"龍崎區","code":"719"},{"name":"官田區","code":"720"},{"name":"麻豆區","code":"721"},{"name":"佳里區","code":"722"},{"name":"西港區","code":"723"},{"name":"七股區","code":"724"},{"name":"將軍區","code":"725"},{"name":"學甲區","code":"726"},{"name":"北門區","code":"727"},{"name":"新營區","code":"730"},{"name":"後壁區","code":"731"},{"name":"白河區","code":"732"},{"name":"東山區","code":"733"},{"name":"六甲區","code":"734"},{"name":"下營區","code":"735"},{"name":"柳營區","code":"736"},{"name":"鹽水區","code":"737"},{"name":"善化區","code":"741"},{"name":"大內區","code":"742"},{"name":"山上區","code":"743"},{"name":"新市區","code":"744"},{"name":"安定區","code":"745"}]},{"name":"高雄市","children":[{"name":"新興區","code":"800"},{"name":"前金區","code":"801"},{"name":"苓雅區","code":"802"},{"name":"鹽埕區","code":"803"},{"name":"鼓山區","code":"804"},{"name":"旗津區","code":"805"},{"name":"前鎮區","code":"806"},{"name":"三民區","code":"807"},{"name":"楠梓區","code":"811"},{"name":"小港區","code":"812"},{"name":"左營區","code":"813"},{"name":"仁武區","code":"814"},{"name":"大社區","code":"815"},{"name":"岡山區","code":"820"},{"name":"路竹區","code":"821"},{"name":"阿蓮區","code":"822"},{"name":"田寮區","code":"823"},{"name":"燕巢區","code":"824"},{"name":"橋頭區","code":"825"},{"name":"梓官區","code":"826"},{"name":"彌陀區","code":"827"},{"name":"永安區","code":"828"},{"name":"湖內區","code":"829"},{"name":"鳳山區","code":"830"},{"name":"大寮區","code":"831"},{"name":"林園區","code":"832"},{"name":"鳥松區","code":"833"},{"name":"大樹區","code":"840"},{"name":"旗山區","code":"842"},{"name":"美濃區","code":"843"},{"name":"六龜區","code":"844"},{"name":"內門區","code":"845"},{"name":"杉林區","code":"846"},{"name":"甲仙區","code":"847"},{"name":"桃源區","code":"848"},{"name":"那瑪夏區","code":"849"},{"name":"茂林區","code":"851"},{"name":"茄萣區","code":"852"}]},{"name":"澎湖縣","children":[{"name":"馬公市","code":"880"},{"name":"西嶼鄉","code":"881"},{"name":"望安鄉","code":"882"},{"name":"七美鄉","code":"883"},{"name":"白沙鄉","code":"884"},{"name":"湖西鄉","code":"885"}]},{"name":"屏東縣","children":[{"name":"屏東市","code":"900"},{"name":"三地門鄉","code":"901"},{"name":"霧臺鄉","code":"902"},{"name":"瑪家鄉","code":"903"},{"name":"九如鄉","code":"904"},{"name":"里港鄉","code":"905"},{"name":"高樹鄉","code":"906"},{"name":"鹽埔鄉","code":"907"},{"name":"長治鄉","code":"908"},{"name":"麟洛鄉","code":"909"},{"name":"竹田鄉","code":"911"},{"name":"內埔鄉","code":"912"},{"name":"萬丹鄉","code":"913"},{"name":"潮州鎮","code":"920"},{"name":"泰武鄉","code":"921"},{"name":"來義鄉","code":"922"},{"name":"萬巒鄉","code":"923"},{"name":"崁頂鄉","code":"924"},{"name":"新埤鄉","code":"925"},{"name":"南州鄉","code":"926"},{"name":"林邊鄉","code":"927"},{"name":"東港鎮","code":"928"},{"name":"琉球鄉","code":"929"},{"name":"佳冬鄉","code":"931"},{"name":"新園鄉","code":"932"},{"name":"枋寮鄉","code":"940"},{"name":"枋山鄉","code":"941"},{"name":"春日鄉","code":"942"},{"name":"獅子鄉","code":"943"},{"name":"車城鄉","code":"944"},{"name":"牡丹鄉","code":"945"},{"name":"恆春鎮","code":"946"},{"name":"滿州鄉","code":"947"}]},{"name":"臺東縣","children":[{"name":"臺東市","code":"950"},{"name":"綠島鄉","code":"951"},{"name":"蘭嶼鄉","code":"952"},{"name":"延平鄉","code":"953"},{"name":"卑南鄉","code":"954"},{"name":"鹿野鄉","code":"955"},{"name":"關山鎮","code":"956"},{"name":"海端鄉","code":"957"},{"name":"池上鄉","code":"958"},{"name":"東河鄉","code":"959"},{"name":"成功鎮","code":"961"},{"name":"長濱鄉","code":"962"},{"name":"太麻里鄉","code":"963"},{"name":"金峰鄉","code":"964"},{"name":"大武鄉","code":"965"},{"name":"達仁鄉","code":"966"}]},{"name":"花蓮縣","children":[{"name":"花蓮市","code":"970"},{"name":"新城鄉","code":"971"},{"name":"秀林鄉","code":"972"},{"name":"吉安鄉","code":"973"},{"name":"壽豐鄉","code":"974"},{"name":"鳳林鎮","code":"975"},{"name":"光復鄉","code":"976"},{"name":"豐濱鄉","code":"977"},{"name":"瑞穗鄉","code":"978"},{"name":"萬榮鄉","code":"979"},{"name":"玉里鎮","code":"981"},{"name":"卓溪鄉","code":"982"},{"name":"富里鄉","code":"983"}]},{"name":"金門縣","children":[{"name":"金沙鎮","code":"890"},{"name":"金湖鎮","code":"891"},{"name":"金寧鄉","code":"892"},{"name":"金城鎮","code":"893"},{"name":"烈嶼鄉","code":"894"},{"name":"烏坵鄉","code":"896"}]},{"name":"連江縣","children":[{"name":"南竿鄉","code":"209"},{"name":"北竿鄉","code":"210"},{"name":"莒光鄉","code":"211"},{"name":"東引鄉","code":"212"}]}]')},"5fa6":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mb-5 discount-banner d-flex align-items-center"})},o=[],c={name:"DiscountBanner"},s=c,r=a("2877"),d=Object(r["a"])(s,n,o,!1,null,null,null);t["a"]=d.exports},"9c11":function(e,t,a){"use strict";var n=a("ed37"),o=a.n(n);o.a},ed37:function(e,t,a){}}]);
//# sourceMappingURL=Cart_List.d74a64c4.js.map