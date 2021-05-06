(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["OrderList"],{2671:function(t,e,a){"use strict";var s=a("4ab2"),r=a.n(s);r.a},"2fd4":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{attrs:{"aria-label":"Page navigation example"}},[a("ul",{staticClass:"pagination d-flex justify-content-center justify-content-md-end"},[a("li",{staticClass:"page-item",class:{"disabled not-allowed":!t.pagination.has_pre}},[a("a",{staticClass:"page-link px-3",class:{"disabled not-allowed":!t.pagination.has_pre},attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){return t.getPage(t.pagination.current_page-1)}}},[a("span",{class:{"text-secondary":!t.pagination.has_next},attrs:{"aria-hidden":"true"}},[a("span",{staticClass:"material-icons material-icons-middle pt-1"},[t._v("chevron_left")])]),a("span",{staticClass:"sr-only"},[t._v("Previous")])])]),t._l(t.pagination.total_pages,(function(e){return a("li",{key:e,staticClass:"page-item",class:{active:t.pagination.current_page===e},on:{click:function(a){return t.getPage(e)}}},[a("a",{staticClass:"page-link px-3",attrs:{href:"#"}},[t._v(t._s(e))])])})),a("li",{staticClass:"page-item",class:{"disabled not-allowed":!t.pagination.has_next}},[a("a",{staticClass:"page-link px-3 align-middle",class:{"disabled not-allowed":t.pagination.has_next},attrs:{href:"#","aria-label":"Next"},on:{click:function(e){return t.getPage(t.pagination.current_page+1)}}},[t._m(0),a("span",{staticClass:"sr-only"},[t._v("Next")])])])],2)])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{attrs:{"aria-hidden":"true"}},[a("span",{staticClass:"material-icons material-icons-middle pt-1"},[t._v("chevron_right")])])}],i={name:"Pagination",props:{pagination:{type:Object,required:!0}},methods:{getPage:function(t){this.$emit("getPage",t)}}},n=i,o=a("2877"),l=Object(o["a"])(n,s,r,!1,null,null,null);e["a"]=l.exports},"4ab2":function(t,e,a){},b51f:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-9 ml-sm-auto col-lg-10 px-4",attrs:{role:"main"}},[a("tr",{staticClass:"table-responsive mt-5"},[a("table",{staticClass:"table table-hover table-striped table-bordered table-sm mb-4 text-center"},[t._m(0),a("tbody",t._l(t.orders,(function(e){return a("tr",{key:e.id},[a("td",{staticClass:"align-middle"},[a("div",[t._v(t._s(e.id)+" ")]),a("div",{staticClass:"mt-1 small"},[t._v("\n              "+t._s(t._f("dateFormat")(e.create_at))+"\n            ")])]),a("td",{staticClass:"text-left",attrs:{rowspan:"1"}},[a("ul",{staticClass:"px-2"},[a("li",[t._v("地址 : "+t._s(e.user.address))]),a("li",[t._v("信箱 : "+t._s(e.user.email))]),a("li",[t._v("姓名 : "+t._s(e.user.name))]),a("li",[t._v("電話 : "+t._s(e.user.tel))])])]),a("td",{staticClass:"text-left align-middle"},[a("ul",{staticClass:"pl-2"},t._l(e["products"],(function(e){return a("li",{key:e.id},[e.qty>0?a("small",[t._v(t._s(e.product.title)+" - 數量 : "+t._s(e.qty)+t._s(e.unit))]):t._e()])})),0)]),a("td",{staticClass:"text-right pr-3 align-middle"},[t._v("\n            "+t._s(t._f("currency")(e.total))+"\n          ")]),a("td",{staticClass:"text-center align-middle"},[t._v("\n            "+t._s("credit_card"===e.payment_method?"信用卡":"到店付款")+"\n          ")]),a("td",{staticClass:"align-middle font-weight-bold",class:{"text-success":e.is_paid}},[t._v("\n            "+t._s(e.is_paid?"已付款":"尚未付款")+"\n          ")]),a("td",{staticClass:"text-center align-middle"},[a("small",[t._v(t._s(e.message))])]),a("td",{staticClass:"align-middle"},[a("button",{staticClass:"btn btn-outline-secondary btn-sm",attrs:{type:"button"},on:{click:function(a){return t.openModal(e)}}},[t._v("\n              編輯\n            ")])])])})),0)])]),a("Pagination",{attrs:{pagination:t.pagination},on:{getPage:t.getOrders}}),a("div",{staticClass:"modal fade",attrs:{id:"ordermodal",tabindex:"-1",role:"dialog","aria-labelledby":"ordermodal","aria-hidden":"true","data-backdrop":"static"}},[a("div",{staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[t._m(1),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12"},[a("div",{staticClass:"d-flex justify-content-between align-items-center"},[a("div",{staticClass:"h4 font-weight-bold"},[t._v("\n                  用戶資料\n                ")]),a("small",{},[t._v(t._s(t._f("dateFormat")(t.tempOrder.create_at)))])]),a("div",{staticClass:"form-row"},[a("div",{staticClass:" form-group col-md-12"},[a("label",{attrs:{for:"title"}},[t._v("名稱")]),t.tempOrder.user?a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.name,expression:"tempOrder.user.name"}],staticClass:"form-control",attrs:{id:"title",type:"text",placeholder:"請用戶名稱"},domProps:{value:t.tempOrder.user.name},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"name",e.target.value)}}}):t._e()])]),a("div",{staticClass:"form-row"},[a("div",{staticClass:" form-group col-md-6"},[a("label",{attrs:{for:"price"}},[t._v("E-mail")]),t.tempOrder.user?a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.email,expression:"tempOrder.user.email"}],staticClass:"form-control",attrs:{id:"unit",type:"unit",placeholder:"請輸入 E-mail"},domProps:{value:t.tempOrder.user.email},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"email",e.target.value)}}}):t._e()]),a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"origin_price"}},[t._v("連絡電話")]),t.tempOrder.user?a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.tel,expression:"tempOrder.user.tel"}],staticClass:"form-control",attrs:{id:"origin_price",type:"text",placeholder:"請輸入電話"},domProps:{value:t.tempOrder.user.tel},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"tel",e.target.value)}}}):t._e()])]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-12"},[a("label",{attrs:{for:"category"}},[t._v("地址")]),t.tempOrder.user?a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.address,expression:"tempOrder.user.address"}],staticClass:"form-control",attrs:{id:"category",type:"text",placeholder:"請輸入地址"},domProps:{value:t.tempOrder.user.address},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"address",e.target.value)}}}):t._e()])]),a("hr"),a("div",{staticClass:"form-group"},[a("div",{staticClass:"h4 font-weight-bold"},[t._v("\n                  訂購商品\n                ")]),t._l(t.tempOrder.products,(function(e,s){return a("div",{key:s,staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-8"},[0===s?a("label",{attrs:{for:e.product_id}},[t._v("產品ID:")]):t._e(),a("input",{directives:[{name:"model",rawName:"v-model",value:e.product_id,expression:"item.product_id"}],staticClass:" form-control mb-3",attrs:{id:e.product_id,type:"text",placeholder:"數量",min:"0",max:"10"},domProps:{value:e.product_id},on:{input:function(a){a.target.composing||t.$set(e,"product_id",a.target.value)}}})]),a("div",{staticClass:"form-group col-md-2"},[0===s?a("label",{attrs:{for:"unit"}},[t._v("數量")]):t._e(),a("input",{directives:[{name:"model",rawName:"v-model",value:e.qty,expression:"item.qty"}],staticClass:" form-control mb-3",attrs:{id:"unit",type:"number",placeholder:"數量",min:"0",max:"10"},domProps:{value:e.qty},on:{input:function(a){a.target.composing||t.$set(e,"qty",a.target.value)}}})]),a("div",{staticClass:"form-group col-md-2"},[0===s?a("label",{attrs:{for:""}},[t._v("刪除")]):t._e(),a("button",{staticClass:"form-control btn btn-danger",attrs:{type:"button"},on:{click:function(t){e.qty=0}}},[t._v("\n                      刪除\n                    ")])])])}))],2),a("hr"),a("div",{staticClass:"form-group"},[a("div",{staticClass:"d-flex align-items-center"},[a("div",{staticClass:"h3 font-weight-bold"},[t._v("\n                    付款狀態\n                  ")]),a("div",{staticClass:"form-check mb-1 ml-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.is_paid,expression:"tempOrder.is_paid"}],staticClass:"form-check-input",attrs:{id:"is_enabled",type:"checkbox"},domProps:{checked:Array.isArray(t.tempOrder.is_paid)?t._i(t.tempOrder.is_paid,null)>-1:t.tempOrder.is_paid},on:{change:function(e){var a=t.tempOrder.is_paid,s=e.target,r=!!s.checked;if(Array.isArray(a)){var i=null,n=t._i(a,i);s.checked?n<0&&t.$set(t.tempOrder,"is_paid",a.concat([i])):n>-1&&t.$set(t.tempOrder,"is_paid",a.slice(0,n).concat(a.slice(n+1)))}else t.$set(t.tempOrder,"is_paid",r)}}}),a("label",{staticClass:"form-check-label",attrs:{for:"is_enabled"}},[t._v("是否付款")])])]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"payment"}},[t._v("付款方式")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.payment_method,expression:"tempOrder.payment_method"}],staticClass:"custom-select mr-sm-2 custom-select mr-sm-2 form-control",attrs:{id:"payment",name:"payment"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.tempOrder,"payment_method",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"credit_card"}},[t._v("\n                        信用卡\n                      ")]),a("option",{attrs:{value:"cod"}},[t._v("\n                        貨到付款\n                      ")])])]),a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"total"}},[t._v("總計")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.total,expression:" tempOrder.total"}],staticClass:"form-control mb-3",attrs:{id:"total",type:" unit"},domProps:{value:t.tempOrder.total},on:{input:function(e){e.target.composing||t.$set(t.tempOrder,"total",e.target.value)}}})])])]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"description"}},[t._v("備註說明")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.message,expression:"tempOrder.message"}],staticClass:"form-control",attrs:{id:"description",type:"text",placeholder:"請輸入產品描述"},domProps:{value:t.tempOrder.message},on:{input:function(e){e.target.composing||t.$set(t.tempOrder,"message",e.target.value)}}})])])])]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n            取消\n          ")]),a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.editOrder}},[t._v("\n            確認\n          ")])])])])])],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{staticClass:"py-3"},[t._v("\n            訂單 | 日期\n          ")]),a("th",{staticClass:"py-3"},[t._v("\n            用戶資料\n          ")]),a("th",{staticClass:"py-3"},[t._v("\n            訂購資訊\n          ")]),a("th",{staticClass:"py-3"},[t._v("\n            應繳金額總計\n          ")]),a("th",{staticClass:"py-3"},[t._v("\n            付款方式\n          ")]),a("th",{staticClass:"py-3"},[t._v("\n            是否付款\n          ")]),a("th",{staticClass:"py-3"},[t._v("\n            備註說明\n          ")]),a("th",{staticClass:"py-3"},[t._v("\n            編輯訂單\n          ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header bg-secondary text-white"},[a("h5",{staticClass:"modal-title",attrs:{id:"ordermodal"}},[a("span",[t._v("修改訂單")])]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{staticClass:"text-white",attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],i=a("4ec3"),n=a("2fd4"),o=a("1157"),l=a.n(o),d=a("70e0"),c={name:"OrderList",components:{Pagination:n["a"]},data:function(){return{orders:[],tempOrder:{},pagination:{},isNew:!1,page:0}},watch:{$route:function(t,e){this.page=parseInt(t.params.page),(this.page>this.pagination.total_pages||this.page<=0)&&(this.page=1),this.getOrders(this.page)}},mounted:function(){this.page=parseInt(this.$route.params.page),this.getOrderList()},methods:{getOrderList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.$store.commit("loading/loading_status",!0),Object(i["o"])(e).then((function(e){e.data.success?(e.data.orders?t.orders=e.data.orders:t.orders=[],e.data.pagination?t.pagination=e.data.pagination:t.pagination=[],t.$store.commit("loading/loading_status",!1)):d["a"].emitHandler(!1,"取得訂單失敗")})).catch((function(t){(t||t instanceof ReferenceError)&&d["a"].emitHandler(!1,"取得資料錯誤")}))},getOrders:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.getOrderList(t),this.$router.push({name:"orderList",params:{page:t}})},openModal:function(t){l()("#ordermodal").modal("show"),this.tempOrder=Object.assign({},t),this.tempOrder.create_at=Math.floor(Date.now()/1e3)},editOrder:function(){var t=this;Object(i["j"])({data:this.tempOrder},this.tempOrder.id).then((function(e){e.data.success?(t.getOrderList(),l()("#ordermodal").modal("hide"),d["a"].emitHandler(!0,e.data.message)):d["a"].emitHandler(!1,e.data.message)})).catch((function(t){(t||t instanceof ReferenceError)&&d["a"].emitHandler(!1,"取得資料錯誤")}))}}},m=c,p=(a("2671"),a("2877")),u=Object(p["a"])(m,s,r,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=OrderList.89709208.js.map