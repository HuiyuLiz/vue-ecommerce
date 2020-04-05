<template>
  <div class="container pt-3 pt-md-5 mt-5 pb-5">
    <CartProgress :step="step"></CartProgress>
    <div class="container">
      <div class="row mb-3" v-if="order.is_paid">
        <div class="col-md-9 m-auto">
          <h6 class="h6 text-left text-secondary">
            親愛的顧客您好，感謝您的訂購，訂單編號為
            <span class="text-danger">{{orderId}}</span>。
          </h6>
        </div>
      </div>
      <div class="row mb-3" v-if="order!==null">
        <div class="col-md-9 m-auto px-0">
          <form class="m-auto" @submit.prevent="checkoutOrder">
            <div class="accordion" id="accordion">
              <div class="card">
                <div class="card-header" id="headingOne">
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
                  <div class="card-body px-0">
                    <CheckListItem v-if="order!==null" :carts="order.products" :cart="order"></CheckListItem>
                  </div>
                </div>
              </div>
              <div class="card card border-0">
                <div class="card-header" id="headingTwo">
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
                  <div class="card-body px-0" v-if="user!==null">
                    <table class="table">
                      <tbody class="text-secondary">
                        <tr>
                          <th scope="row">Email</th>
                          <td colspan="3">{{user.email}}</td>
                        </tr>
                        <tr>
                          <th scope="row">姓名</th>
                          <td colspan="3">{{user.name}}</td>
                        </tr>
                        <tr>
                          <th scope="row">收件人電話</th>
                          <td colspan="3">{{user.tel}}</td>
                        </tr>
                        <tr>
                          <th scope="row">收件人地址</th>
                          <td colspan="3">{{user.address}}</td>
                        </tr>
                        <tr>
                          <th scope="row">付款狀態</th>
                          <td
                            v-if="order!==null"
                            colspan="3"
                            :class="{'text-danger':!order.is_paid,'text-success':order.is_paid}"
                          >{{order.is_paid?"付款完成":"尚未付款"}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-right mt-3 mb-5" v-if="order!==null">
              <button class="btn btn-danger btn-block" v-if="!order.is_paid">確認付款</button>
              <button
                class="btn btn-success btn-block"
                v-else="order.is_paid"
                :disabled="order.is_paid"
              >訂單完成</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

