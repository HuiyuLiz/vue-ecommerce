<template>
  <div class="container pt-3 pt-md-5 mt-5 pb-5">
    <div ref="isCheck" />
    <CartProgress :step="step" />
    <div
      v-if="order.is_paid"
      class="container  mb-3"
    >
      <div class="row">
        <div
          class="col-md-9 m-auto px-0 d-flex flex-column justify-content-center align-items-center px-3 p-md-0 checkout-banner"
        >
          >
          <h1 class="text-white text-center">
            <h3 class="h2 mb-0">
              找音樂嗎？
            </h3>
            <span class="h4">一起聆聽最新的流行歌曲!</span>
          </h1>
          <router-link
            class="btn btn-light btn-block mt-3 py-3 rounded-0  btn-max-width font-weight-bold mt-4"
            :to="{name:'shopping_List', params:{ category:'Top Hits' , page: 1 }}"
          >
            更多資訊
          </router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <div
        v-if="order!==null"
        class="row mb-3"
      >
        <div class="col-md-9 m-auto px-0">
          <form
            class="m-auto"
            @submit.prevent="checkoutOrder"
          >
            <div
              id="accordion"
              class="accordion"
            >
              <div class="card">
                <div
                  id="headingOne"
                  class="card-header"
                >
                  <div class="mb-0">
                    <a
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div class="d-flex align-items-center text-secondary">
                        購物車明細
                        <i class="material-icons">arrow_drop_down</i>
                      </div>
                    </a>
                  </div>
                </div>

                <div
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div
                    v-if="order.products"
                    class="card-body px-0"
                  >
                    <CheckListItem
                      v-if="order!==null"
                      :carts="order.products"
                      :cart="order"
                    />
                  </div>
                </div>
              </div>
              <div class="card card border-0">
                <div
                  id="headingTwo"
                  class="card-header"
                >
                  <div class="mb-0">
                    <a
                      class="text-secondary collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <div class="d-flex align-items-center text-secondary">
                        取貨人資訊
                        <i class="material-icons">arrow_drop_down</i>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  id="collapseTwo"
                  class="show"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div
                    v-if="user!==null"
                    class="card-body px-0"
                  >
                    <table class="table">
                      <tbody class="text-secondary">
                        <tr>
                          <th
                            scope="row"
                            class="font-weight-normal"
                          >
                            Email
                          </th>
                          <td colspan="3">
                            {{ user.email }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            姓名
                          </th>
                          <td colspan="3">
                            {{ user.name }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            收件人電話
                          </th>
                          <td colspan="3">
                            {{ user.tel }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            收件人地址
                          </th>
                          <td colspan="3">
                            {{ user.address }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            訂單編號
                          </th>
                          <td
                            v-if="order!==null"
                            colspan="3"
                            class="text-secondary"
                          >
                            {{ order.is_paid? orderId :"尚未成立訂單" }}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            付款狀態
                          </th>
                          <td
                            v-if="order!==null"
                            colspan="3"
                            :class="{'text-danger':!order.is_paid,'text-success':order.is_paid}"
                          >
                            {{ order.is_paid?" 親愛的顧客您好，已付款完成，感謝訂購。":"尚未付款" }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="order!==null"
              class="text-right mt-3 mb-5"
            >
              <div class="d-flex justify-content-between  mb-5">
                <router-link
                  class="btn btn-secondary  py-3 rounded-0  w-25 w-sm-40 "
                  :to="{name:'shopping_List', params:{ category:'all' , page: 1 }}"
                >
                  繼續購物
                </router-link>
                <CustomButton
                  v-if="!order.is_paid"
                  custom-class="btn-danger"
                  class=" w-25 w-sm-40"
                  text="確認付款"
                />
                <CustomButton
                  v-else
                  custom-class="btn-success"
                  text="訂單完成"
                  :disabled="order.is_paid"
                  class=" w-25 w-sm-40"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
