(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ProductList"],{"0ea1":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"col-md-9 ml-sm-auto col-lg-10 px-4",attrs:{role:"mail"}},[e("div",{staticClass:"btn btn-primary mt-5 mb-3 float-right font-weight-bold d-flex align-item-center",on:{click:function(a){return t.openModal(!0)}}},[t._v("\n    新增產品\n    "),e("i",{staticClass:"material-icons ml-2"},[t._v("add")])]),e("div",{staticClass:"table-responsive mt-5"},[e("table",{staticClass:"table table-hover table-striped table-bordered table-sm mb-4 text-center rwd-table"},[t._m(0),e("tbody",t._l(t.products,(function(a){return e("tr",{key:a.id},[e("td",{staticClass:"align-middle",attrs:{"data-th":"分類"}},[t._v("\n            "+t._s(a.category)+"\n          ")]),e("td",{staticClass:"align-middle",attrs:{"data-th":"歌手/專輯"}},[t._v("\n            "+t._s(a.title)+"\n          ")]),e("td",{staticClass:"align-middle p-3",attrs:{"data-th":"商品照片"}},[e("div",{staticClass:"img-thumb background-cover",style:{backgroundImage:"url("+a.imageUrl+")"}})]),e("td",{staticClass:"align-middle",attrs:{"data-th":"是否啟用"}},[t._v("\n            "+t._s(1===a.is_enabled?"啟用":"未啟用")+"\n          ")]),e("td",{staticClass:"text-right pr-3 align-middle",attrs:{"data-th":"原價"}},[t._v("\n            "+t._s(t._f("currency")(a.origin_price))+"\n          ")]),e("td",{staticClass:"text-right pr-3 align-middle",attrs:{"data-th":"售價"}},[t._v("\n            "+t._s(t._f("currency")(a.price))+"\n          ")]),e("td",{staticClass:"align-middle",attrs:{"data-th":"編輯"}},[e("button",{staticClass:"btn btn-outline-secondary btn-sm ",attrs:{type:"button"},on:{click:function(e){return t.openModal(!1,a)}}},[t._v("\n              編輯\n            ")])]),e("td",{staticClass:"align-middle",attrs:{"data-th":"編輯"}},[e("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return t.openDelModal(a)}}},[t._v("\n              刪除\n            ")])])])})),0)])]),e("Pagination",{attrs:{pagination:t.pagination},on:{getPage:t.getProducts}}),e("div",{staticClass:"modal fade",attrs:{id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"productModal","aria-hidden":"true","data-backdrop":"static"}},[e("div",{staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[e("div",{staticClass:"modal-content border-0"},[t._m(1),e("div",{staticClass:"modal-body"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-4"},[t._m(2),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"customFile"}},[t._v("\n                  或 上傳圖片\n                  "),t.fileUploadLoading?e("i",{staticClass:"fas fa-spinner fa-spin"}):t._e()]),t._m(3),e("input",{ref:"files",staticClass:"form-control",attrs:{id:"customFile",type:"file",name:"file-to-upload"},on:{change:t.uploadFile}})]),e("img",{staticClass:"img-fluid",attrs:{src:t.tempProduct.imageUrl,alt:""}})]),e("div",{staticClass:"col-sm-8"},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"title"}},[t._v("標題")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.tempProduct.title,expression:"tempProduct.title",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{id:"title",type:"text",placeholder:"請輸入標題"},domProps:{value:t.tempProduct.title},on:{input:function(a){a.target.composing||t.$set(t.tempProduct,"title",a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group col-md-6"},[e("label",{attrs:{for:"category"}},[t._v("分類")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.tempProduct.category,expression:"tempProduct.category",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{id:"category",type:"text",placeholder:"請輸入分類"},domProps:{value:t.tempProduct.category},on:{input:function(a){a.target.composing||t.$set(t.tempProduct,"category",a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})]),e("div",{staticClass:"form-group col-md-6"},[e("label",{attrs:{for:"price"}},[t._v("單位")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.unit,expression:"tempProduct.unit"}],staticClass:"form-control",attrs:{id:"unit",type:"unit",placeholder:"請輸入單位"},domProps:{value:t.tempProduct.unit},on:{input:function(a){a.target.composing||t.$set(t.tempProduct,"unit",a.target.value)}}})])]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group col-md-6"},[e("label",{attrs:{for:"origin_price"}},[t._v("原價")]),e("input",{directives:[{name:"model",rawName:"v-model.number",value:t.tempProduct.origin_price,expression:"tempProduct.origin_price",modifiers:{number:!0}}],staticClass:"form-control",attrs:{id:"origin_price",type:"number",placeholder:"請輸入原價"},domProps:{value:t.tempProduct.origin_price},on:{input:function(a){a.target.composing||t.$set(t.tempProduct,"origin_price",t._n(a.target.value))},blur:function(a){return t.$forceUpdate()}}})]),e("div",{staticClass:"form-group col-md-6"},[e("label",{attrs:{for:"price"}},[t._v("售價")]),e("input",{directives:[{name:"model",rawName:"v-model.number",value:t.tempProduct.price,expression:"tempProduct.price",modifiers:{number:!0}}],staticClass:"form-control",attrs:{id:"price",type:"number",placeholder:"請輸入售價"},domProps:{value:t.tempProduct.price},on:{input:function(a){a.target.composing||t.$set(t.tempProduct,"price",t._n(a.target.value))},blur:function(a){return t.$forceUpdate()}}})])]),e("hr"),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"description"}},[t._v("產品描述")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.description,expression:"tempProduct.description"}],staticClass:"form-control",attrs:{id:"description",type:"text",placeholder:"請輸入產品描述"},domProps:{value:t.tempProduct.description},on:{input:function(a){a.target.composing||t.$set(t.tempProduct,"description",a.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"content"}},[t._v("說明內容")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.content,expression:"tempProduct.content"}],staticClass:"form-control",attrs:{id:"content",type:"text",placeholder:"請輸入產品說明內容"},domProps:{value:t.tempProduct.content},on:{input:function(a){a.target.composing||t.$set(t.tempProduct,"content",a.target.value)}}})]),e("div",{staticClass:"form-group"},[e("div",{staticClass:"form-check"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.is_enabled,expression:"tempProduct.is_enabled"}],staticClass:"form-check-input",attrs:{id:"is_enabled",type:"checkbox","true-value":1,"false-value":0},domProps:{checked:Array.isArray(t.tempProduct.is_enabled)?t._i(t.tempProduct.is_enabled,null)>-1:t._q(t.tempProduct.is_enabled,1)},on:{change:function(a){var e=t.tempProduct.is_enabled,s=a.target,i=s.checked?1:0;if(Array.isArray(e)){var o=null,r=t._i(e,o);s.checked?r<0&&t.$set(t.tempProduct,"is_enabled",e.concat([o])):r>-1&&t.$set(t.tempProduct,"is_enabled",e.slice(0,r).concat(e.slice(r+1)))}else t.$set(t.tempProduct,"is_enabled",i)}}}),e("label",{staticClass:"form-check-label",attrs:{for:"is_enabled"}},[t._v("是否啟用")])])])])])]),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n            取消\n          ")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.createProduct}},[t._v("\n            確認\n          ")])])])])]),e("div",{staticClass:"modal fade",attrs:{id:"delProductModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content border-0"},[t._m(4),e("div",{staticClass:"modal-body"},[t._v("\n          是否刪除 "),e("strong",{staticClass:"text-danger"},[t._v(t._s(t.tempProduct.title))]),t._v(" 商品(刪除後將無法恢復)。\n        ")]),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n            取消\n          ")]),e("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(a){return t.deleteProduct(t.tempProduct.id)}}},[t._v("\n            確認刪除\n          ")])])])])])],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",{},[e("tr",[e("th",{staticClass:"py-3 font-weight-bold"},[t._v("\n            分類\n          ")]),e("th",{staticClass:"py-3 font-weight-bold",staticStyle:{width:"20%"}},[t._v("\n            歌手/專輯\n          ")]),e("th",{staticClass:"py-3 font-weight-bold",staticStyle:{width:"8%"}},[t._v("\n            商品照片\n          ")]),e("th",{staticClass:"py-3 font-weight-bold"},[t._v("\n            是否啟用\n          ")]),e("th",{staticClass:"py-3 font-weight-bold",staticStyle:{width:"15%"}},[t._v("\n            原價\n          ")]),e("th",{staticClass:"py-3 font-weight-bold",staticStyle:{width:"15%"}},[t._v("\n            售價\n          ")]),e("th",{staticClass:"py-3 font-weight-bold",staticStyle:{width:"8%"}},[t._v("\n            編輯\n          ")]),e("th",{staticClass:"py-3 font-weight-bold",staticStyle:{width:"8%"}},[t._v("\n            刪除\n          ")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-secondary text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"productModal"}},[e("span",[t._v("新增產品")])]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{staticClass:"text-white",attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"image"}},[t._v("輸入圖片網址")]),e("input",{staticClass:"form-control",attrs:{id:"image",type:"text",placeholder:"請輸入圖片連結"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("label",{staticClass:"form-control d-flex align-items-center",attrs:{for:"customFile"}},[e("i",{staticClass:"material-icons mr-2"},[t._v("cloud_upload")]),t._v(" 選擇檔案\n                ")])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-danger text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[e("span",[t._v("刪除產品")])]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],o=(e("a481"),e("4ec3")),r=e("1157"),n=e.n(r),l=e("2fd4"),c=e("70e0"),d={name:"ProductList",components:{Pagination:l["a"]},data:function(){return{products:[],tempProduct:{},pagination:{},isNew:!1,fileUploadLoading:!1,page:0}},watch:{$route:function(t,a){this.page=parseInt(t.params.page),(this.page>this.pagination.total_pages||this.page<=0)&&(this.page=1),this.getProducts(this.page)}},created:function(){},mounted:function(){this.page=parseInt(this.$route.params.page),this.getProducts()},methods:{openModal:function(t,a){n()("#productModal").modal("show"),t?(this.tempProduct={},this.isNew=!0):(this.tempProduct=Object.assign({},a),this.isNew=!1)},openDelModal:function(t){this.tempProduct=t,n()("#delProductModal").modal("show")},dataResponse:function(t){t?(this.getProducts(),n()("#productModal").modal("hide")):c["a"].emitHandler(!1,"新增商品失敗")},createProduct:function(){var t=this;this.isNew?Object(o["e"])({data:this.tempProduct}).then((function(a){t.dataResponse(a.data.success),c["a"].emitHandler(!0,a.data.message)})):Object(o["k"])({data:this.tempProduct},this.tempProduct.id).then((function(a){t.dataResponse(a.data.success),c["a"].emitHandler(!0,a.data.message)}))},getProductList:function(t){var a=this;this.$store.commit("loading/loading_status",!0),Object(o["q"])(t).then((function(e){!0===e.data.success?(e.data.products||e.data.pagination)&&(a.products=e.data.products,a.pagination=e.data.pagination,a.$router.push({name:"productList",params:{page:t}}),a.$store.commit("loading/loading_status",!1)):a.$router.replace("/login")})).catch((function(t){(t||t instanceof ReferenceError)&&c["a"].emitHandler(!1,"取得資料錯誤")}))},getProducts:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.getProductList(t),this.$router.push({name:"productList",params:{page:t}})},deleteProduct:function(t){var a=this;Object(o["h"])(t).then((function(t){t.data.success?(c["a"].emitHandler(!0,t.data.message),a.tempProduct={},a.getProducts(),n()("#delProductModal").modal("hide")):c["a"].emitHandler(!1,t.data.message)})).catch((function(t){(t||t instanceof ReferenceError)&&c["a"].emitHandler(!1,"取得資料錯誤")}))},uploadFile:function(){var t=this;this.fileUploadLoading=!0;var a=this.$refs.files.files[0],e=new FormData;e.append("file-to-upload",a);var s={headers:{"Content-type":"multipart/form-data"}};Object(o["w"])(e,s).then((function(a){a.data.success?(t.tempProduct.imageUrl=a.data.imageUrl,t.$set(t.tempProduct,t.tempProduct.imageUrl),t.fileUploadLoading=!1):(c["a"].emitHandler(!1,a.data.message),t.fileUploadLoading=!1)})).catch((function(t){(t||t instanceof ReferenceError)&&c["a"].emitHandler(!1,"取得資料錯誤")}))}}},u=d,p=e("2877"),m=Object(p["a"])(u,s,i,!1,null,null,null);a["default"]=m.exports},"2fd4":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("nav",{attrs:{"aria-label":"Page navigation example"}},[e("ul",{staticClass:"pagination d-flex justify-content-center justify-content-md-end"},[e("li",{staticClass:"page-item",class:{"disabled not-allowed":!t.pagination.has_pre}},[e("a",{staticClass:"page-link px-3",class:{"disabled not-allowed":!t.pagination.has_pre},attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){return t.getPage(t.pagination.current_page-1)}}},[e("span",{class:{"text-secondary":!t.pagination.has_next},attrs:{"aria-hidden":"true"}},[e("span",{staticClass:"material-icons material-icons-middle pt-1"},[t._v("chevron_left")])]),e("span",{staticClass:"sr-only"},[t._v("Previous")])])]),t._l(t.pagination.total_pages,(function(a){return e("li",{key:a,staticClass:"page-item",class:{active:t.pagination.current_page===a},on:{click:function(e){return t.getPage(a)}}},[e("a",{staticClass:"page-link px-3",attrs:{href:"#"}},[t._v(t._s(a))])])})),e("li",{staticClass:"page-item",class:{"disabled not-allowed":!t.pagination.has_next}},[e("a",{staticClass:"page-link px-3 align-middle",class:{"disabled not-allowed":t.pagination.has_next},attrs:{href:"#","aria-label":"Next"},on:{click:function(a){return t.getPage(t.pagination.current_page+1)}}},[t._m(0),e("span",{staticClass:"sr-only"},[t._v("Next")])])])],2)])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("span",{attrs:{"aria-hidden":"true"}},[e("span",{staticClass:"material-icons material-icons-middle pt-1"},[t._v("chevron_right")])])}],o={name:"Pagination",props:{pagination:{type:Object,required:!0}},methods:{getPage:function(t){this.$emit("getPage",t)}}},r=o,n=e("2877"),l=Object(n["a"])(r,s,i,!1,null,null,null);a["a"]=l.exports}}]);
//# sourceMappingURL=ProductList.4aeea01c.js.map