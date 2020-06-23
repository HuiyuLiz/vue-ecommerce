<template>
  <div
    role="mail"
    class="col-md-9 ml-sm-auto col-lg-10 px-4">
    <div
      class="btn btn-primary mt-5 mb-3 float-right font-weight-bold d-flex align-item-center"
      @click="openModal(true)">
      新增產品
      <i class="material-icons ml-2">add</i>
    </div>
    <div class="table-responsive mt-5">
      <table class="table table-hover table-striped table-bordered table-sm mb-4 text-center rwd-table">
        <thead class="">
          <tr>
            <th class="py-3 font-weight-bold">
              分類
            </th>
            <th
              class="py-3 font-weight-bold"
              style="width:20%">
              歌手/專輯
            </th>
            <th
              class="py-3 font-weight-bold"
              style="width:8%">
              商品照片
            </th>
            <th class="py-3 font-weight-bold">
              是否啟用
            </th>
            <th
              class="py-3 font-weight-bold"
              style="width:15%">
              原價
            </th>
            <th
              class="py-3 font-weight-bold"
              style="width:15%">
              售價
            </th>
            <th
              class="py-3 font-weight-bold"
              style="width:8%">
              編輯
            </th>
            <th
              class="py-3 font-weight-bold"
              style="width:8%">
              刪除
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in products"
            :key="item.id">
            <td
              class="align-middle"
              data-th="分類">
              {{ item.category }}
            </td>
            <td
              class="align-middle"
              data-th="歌手/專輯">
              {{ item.title }}
            </td>
            <td
              class="align-middle p-3"
              data-th="商品照片">
              <div
                class="img-thumb background-cover"
                :style="{backgroundImage:`url(${item.imageUrl})`}" />
            </td>
            <td
              class="align-middle"
              data-th="是否啟用">
              {{ item.is_enabled===1?"啟用":"未啟用" }}
            </td>
            <td
              class="text-right pr-3 align-middle"
              data-th="原價">
              {{ item.origin_price | currency }}
            </td>
            <td
              class="text-right pr-3 align-middle"
              data-th="售價">
              {{ item.price | currency }}
            </td>

            <td
              class="align-middle"
              data-th="編輯">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm "
                @click="openModal(false,item)">
                編輯
              </button>
            </td>
            <td
              class="align-middle"
              data-th="編輯">
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="openDelModal(item)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      :pagination="pagination"
      @getPage="getProducts" />
    <!-- 新增產品 Modal -->
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModal"
      aria-hidden="true"
      data-backdrop="static">
      <div
        class="modal-dialog modal-lg"
        role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-secondary text-white">
            <h5
              id="productModal"
              class="modal-title">
              <span>新增產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span
                aria-hidden="true"
                class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    id="image"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i
                      v-if="fileUploadLoading"
                      class="fas fa-spinner fa-spin" />
                  </label>
                  <label
                    for="customFile"
                    class="form-control d-flex align-items-center">
                    <i class="material-icons mr-2">cloud_upload</i> 選擇檔案
                  </label>
                  <input
                    id="customFile"
                    ref="files"
                    type="file"
                    class="form-control"
                    name="file-to-upload"
                    @change="uploadFile">
                </div>

                <img
                  :src="tempProduct.imageUrl"
                  class="img-fluid"
                  alt>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    id="title"
                    v-model.trim="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      id="category"
                      v-model.trim="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="unit"
                      class="form-control"
                      placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      id="origin_price"
                      v-model.number="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      id="price"
                      v-model.number="tempProduct.price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述" />
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    id="content"
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品說明內容" />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0">
                    <label
                      class="form-check-label"
                      for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="createProduct">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除商品 Modal -->
    <div
      id="delProductModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div
        class="modal-dialog"
        role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct(tempProduct.id)">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getProductList,
  createProduct,
  editProduct,
  deleteProduct,
  uploadFile
} from '@/api/api'
import $ from 'jquery'
import Pagination from '@/components/UIComponents/Pagination/Pagination'
import { EventBus } from '@/eventBus/eventBus'

export default {
  name: 'ProductList',
  components: {
    Pagination
  },
  data () {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
      fileUploadLoading: false,
      page: 0
    }
  },
  watch: {
    $route (to, from) {
      this.page = parseInt(to.params.page)
      if (this.page > this.pagination.total_pages || this.page <= 0) {
        this.page = 1
      }
      this.getProducts(this.page)
    }
  },
  created: function () {

  },
  mounted () {
    this.page = parseInt(this.$route.params.page)
    this.getProducts()
  },
  methods: {
    openModal (isNew, item) {
      $('#productModal').modal('show')
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
    },
    openDelModal (item) {
      this.tempProduct = item
      $('#delProductModal').modal('show')
    },
    dataResponse (success) {
      if (success) {
        this.getProducts()
        $('#productModal').modal('hide')
      } else {
        EventBus.emitHandler(false, '新增商品失敗')
      }
    },

    createProduct () {
      if (this.isNew) {
        createProduct({ data: this.tempProduct }).then(res => {
          this.dataResponse(res.data.success)
          EventBus.emitHandler(true, res.data.message)
        })
      } else {
        editProduct({ data: this.tempProduct }, this.tempProduct.id).then(
          res => {
            this.dataResponse(res.data.success)
            EventBus.emitHandler(true, res.data.message)
          }
        )
      }
    },
    getProductList (page) {
      this.$store.commit('loading/loading_status', true)
      getProductList(page)
        .then(res => {
          if (res.data.success === true) {
            if (res.data.products || res.data.pagination) {
              this.products = res.data.products
              this.pagination = res.data.pagination
              this.$router.push({
                name: 'productList',
                params: { page: page }
              })
              this.$store.commit('loading/loading_status', false)
            }
          } else {
            this.$router.replace('/login')
          }
        })
        .catch(error => {
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    },
    getProducts (page = 1) {
      this.getProductList(page)
      this.$router.push({ name: 'productList', params: { page: page } })
    },
    deleteProduct (id) {
      deleteProduct(id)
        .then(res => {
          if (res.data.success) {
            EventBus.emitHandler(true, res.data.message)
            this.tempProduct = {}
            this.getProducts()
            $('#delProductModal').modal('hide')
          } else {
            EventBus.emitHandler(false, res.data.message)
          }
        })
        .catch(error => {
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    },
    uploadFile () {
      this.fileUploadLoading = true
      let file = this.$refs.files.files[0]
      let formData = new FormData()
      formData.append('file-to-upload', file)
      let config = {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }
      uploadFile(formData, config)
        .then(res => {
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl
            this.$set(this.tempProduct, this.tempProduct.imageUrl)
            this.fileUploadLoading = false
          } else {
            EventBus.emitHandler(false, res.data.message)
            this.fileUploadLoading = false
          }
        })
        .catch(error => {
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    }
  }
}
</script>
