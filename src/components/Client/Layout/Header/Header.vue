<template>
  <div
    class="navbar navbar-expand-md p-0 sticky-top "
    :class="{'bg-white border-dark-bottom':scrollPosition>30,'bg-dark border-dark-bottom':scrollRouterCheck}">
    <div class="container-fluid d-flex justify-content-between">
      <button
        class="navbar-toggler border-0  pl-3"
        type="button"
        data-toggle="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="isToggle=!isToggle">
        <div
          class="bar"
          :class="{'scrolled':scrollPosition>30,'active':isToggle}" />
        <div
          class="mt-2 bar"
          :class="{'scrolled':scrollPosition>30,'active':isToggle}" />
      </button>
      <div class="nav-item font-weight-bold nav-item font-weight-bold py-md-0 text-center">
        <router-link
          to="/"
          class="nav-link">
          <h1 class="font-weight-bold mb-0  h4 text-center">
            <span
              class="nav-logo"
              :class="{'scrolled':scrollPosition>30}">SōUND.</span>
          </h1>
        </router-link>
      </div>
      <!--============== mobile cart icon ==============-->
      <div class="d-flex mr-2">
        <router-link
          class="nav-link text-dark d-flex d-md-none align-items-center  py-3 "
          to="/login">
          <i
            class="material-icons material-icons-middle "
            :class="{'scrolled':scrollPosition>30}">
            person
          </i>
        </router-link>
        <router-link
          id="cartDropdown"
          :to="{name:'cart'}"
          before-appear
          class="nav-link text-dark px-4 d-flex d-md-none align-items-center py-3 "
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          <div class="cart-icon">
            <i
              class="material-icons material-icons-middle "
              :class="{'scrolled':scrollPosition>30}">shopping_cart</i>
            <div
              v-if="carts.length>0"
              class="btn-notice" />
          </div>
        </router-link>
      </div>

      <div
        class="nav-menu "
        :class="{'active':isToggle,'scrolled':scrollPosition>30}">
        <div
          class="nav-menu-background d-md-none"
          :class="{'d-flex':isToggle,'d-none':!isToggle}">
          SōUND.
        </div>
        <ul class="navbar-nav mr-md-auto">
          <li
            class="nav-item font-weight-bold"
            @click="isToggle=!isToggle">
            <router-link
              :to="{name:'MusicCharts'}"
              class="nav-link px-3">
              音樂情報
            </router-link>
          </li>
          <li class="nav-item font-weight-bold dropdown">
            <a
              id="dropdownMenuButton"
              class="nav-link  px-3 dropdown-toggle cursor-pointer"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">實體專輯<span
                class="material-icons  position-absolute ml-2"
                :class="{'scrolled':scrollPosition>30}">
                keyboard_arrow_down
              </span></a>
            <div
              class="dropdown-menu text-center blur mt-0"
              aria-labelledby="dropdownMenuButton"
              style="transform: translateY(2.75px)"
              @click="isToggle=!isToggle">
              <div>
                <router-link
                  :to="{name:'shopping_List',params: { category:'all' ,page: 1 }}"
                  class="dropdown-item py-3 h6">
                  All
                </router-link>
              </div>
              <div
                v-for="category in categories"
                :key="category">
                <router-link
                  :to="{name:'shopping_List',params: {category:category ,page: 1 }}"
                  class="dropdown-item py-3 h6">
                  {{ category }}
                </router-link>
              </div>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li
            v-if="isAuthenticated"
            class="nav-item font-weight-bold d-none d-md-block"
            @click="isToggle=!isToggle">
            <router-link
              class="nav-link  px-3"
              to="/admin">
              <span
                class="material-icons material-icons-middle"
                :class="{'scrolled':scrollPosition>30}">
                manage_accounts
              </span>
            </router-link>
          </li>
          <li
            v-if="!isAuthenticated"
            class="nav-item font-weight-bold d-none d-md-block"
            @click="isToggle=!isToggle">
            <router-link
              class="nav-link  px-3"
              to="/login">
              <span
                class="material-icons material-icons-middle"
                :class="{'scrolled':scrollPosition>30}">
                person
              </span>
            </router-link>
          </li>
          <li class="nav-item font-weight-bold dropdown d-none d-md-block drop-hover px-3">
            <a
              id="cartDropdown"
              :to="{name:'cart'}"
              before-appear
              class="nav-link d-flex align-items-center"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <div class="cart-icon">
                <i
                  class="material-icons ml-2"
                  :class="{'scrolled':scrollPosition>30}">shopping_cart</i>
                <div
                  v-if="carts.length>0"
                  class="btn-notice" />
              </div>

            </a>
            <div
              class="dropdown-menu dropdown-menu-right dropdown-menu-min-width px-3 blur mt-0 py-4"
              aria-labelledby="cartDropdown">
              <table
                v-if="carts.length>0"
                class="table">
                <thead>
                  <th class="text-secondary">
                    商品名稱
                  </th>
                  <th class="text-secondary text-center">
                    數量
                  </th>
                  <th class="text-secondary text-right">
                    單價
                  </th>
                  <th
                    class="text-secondary px-3"
                    style="width:20%" />
                </thead>
                <tbody>
                  <tr
                    v-for="(item,index) in carts"
                    :key="index">
                    <td class="align-middle ">
                      <div class="d-flex text-center align-items-center">
                        <div class="d-flex flex-column">
                          <p class="small text-secondary mb-0 text-left">
                            {{ item.product.title.trim().split('/')[0] }}
                          </p>
                          <span
                            class=" mb-0 text-secondary text-left">{{ item.product.title.trim().split('/')[1] }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-secondary text-center">
                      {{ item.qty }}
                    </td>
                    <td class="align-middle text-center text-right text-secondary">
                      <span style="float: right;">{{ item.final_total|currency }}</span>
                    </td>
                    <td class="align-middle">
                      <div
                        class="btn-delete"
                        style="cursor:pointer"
                        @click="deleteFromCart(item.id)">
                        <span class="material-icons btn-delete pt-2 px-3">clear</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h4
                v-else
                class="text-secondary text-center py-4">
                目前購物車是空的！
              </h4>
              <router-link
                v-if="carts.length>0"
                :to="{name:'cart'}"
                class="btn btn-dark btn-block py-3 w-50 float-right rounded-0 pointer"
                href="#">
                前往結帳
              </router-link>
              <router-link
                v-else
                class="btn btn-secondary btn-block py-3 w-50 float-right rounded-0 pointer"
                :to="{name:'shopping_List', params:{ category:'all' , page: 1 }}">
                繼續購物
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppHeader',
  components: {

  },
  data () {
    return {
      isToggle: false,
      scrollPosition: null
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    carts () {
      return this.$store.state.cart.carts
    },
    cart () {
      return this.$store.state.cart.cart
    },
    final_total () {
      return this.cart ? this.$store.state.cart.final_total : ''
    },
    total () {
      return this.cart ? this.$store.state.cart.total : ''
    },
    currentRouter () {
      return this.$route.name
    },
    scrollRouterCheck () {
      return this.currentRouter !== 'Home' || this.scrollPosition > 30
    },
    categories () {
      return this.$store.getters.categories
    }
  },
  created () {
    this.getCartList()
    this.$store.dispatch('GET_CATEGORIES')
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    getCartList () {
      this.$store.dispatch('cart/GET_CART_LIST')
    },
    deleteFromCart (id) {
      this.$store.dispatch('cart/DELETE_FROM_CART', id)
    },
    updateScroll () {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>
