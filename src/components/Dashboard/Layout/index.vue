<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="col-md-2 d-none d-md-block sidebar">
        <div class="sidebar-sticky">
          <div class="nav-item font-weight-bold nav-item font-weight-bold py-md-0 text-center">
            <router-link
              to="/"
              class="nav-link">
              <h1 class="font-weight-bold mb-0 h4 text-center text-white pt-3">
                <span class="nav-logo">SōUND.</span>
              </h1>
            </router-link>
          </div>
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted mb-3">
            <span>管理員</span>
            <a
              class="d-flex align-items-center text-muted"
              href="#">
              <span data-feather="plus-circle" />
            </a>
          </h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link
                class="nav-link d-flex align-item-center"
                :to="{name:'productList',params: { page: 1 }}">
                <i class="material-icons mr-2">
                  assignment
                </i>產品列表
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link d-flex align-item-center"
                :to="{name:'orderList',params: { page: 1 }}">
                <i
                  class="material-icons mr-2">
                  shopping_cart
                </i>訂單列表
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link d-flex align-item-center"
                :to="{name:'couponList',params: { page: 1 }}">
                <i
                  class="material-icons  mr-2">
                  local_activity
                </i>優惠券
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link d-flex align-item-center"
                :to="{name:'Home'}">
                <i
                  class="material-icons  mr-2">
                  home_work
                </i>回首頁
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'DashboardLayout',
  components: {
  },
  data () {
    return {

    }
  }
}
</script>
