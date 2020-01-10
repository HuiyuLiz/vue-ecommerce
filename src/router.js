import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        Header: Header,
        Footer: Footer
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: () => import(/* webpackChunkName: "Login" */ './views/Login/Login.vue'),
        Header: Header,
        Footer: Footer
      }
    },
    {
      path: '/musicCharts',
      name: 'MusicCharts',
      redirect: 'musicCharts/chart',
      components: {
        default: () => import(/* webpackChunkName: "MusicCharts" */ './views/MusicCharts/MusicCharts.vue'),
        Header: Header,
        Footer: Footer
      },
      children: [
        {
          path: 'chart',
          name: 'MusicChartList',
          component: () => import(/* webpackChunkName: "MusicChartDetail" */ './components/MusicCharts/MusicChartList.vue'),
        }, {
          path: 'chart/:chart_id',
          name: 'MusicChartDetail',
          component: () => import(/* webpackChunkName: "MusicChartDetail" */ './components/MusicCharts/MusicChartDetail.vue'),
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/productList/page/1',
      component: () => import(/* webpackChunkName: "Admin" */ './views/Admin/Admin.vue'),
      meta: { requiresAuth: true },
      beforeRouteEnter(to, from, next) {
        console.log(to, from)
        next()
      },
      children: [
        {
          path: '',
          redirect: 'productList/page/1',
          meta: { requiresAuth: true }
        },
        {
          path: 'productList',
          redirect: 'productList/page/1',
          meta: { requiresAuth: true },
        },
        {
          path: 'productList/page',
          redirect: 'productList/page/1',
          meta: { requiresAuth: true }
        },
        {
          path: 'productList/page/:page',
          name: 'productList',
          component: () => import(/* webpackChunkName: "ProductList" */ './components/AdminComponents/ProductList/ProductList.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orderList',
          redirect: 'orderList/page/1',
          meta: { requiresAuth: true }
        },
        {
          path: 'orderList/page',
          redirect: 'orderList/page/1',
          meta: { requiresAuth: true }
        },
        {
          path: 'orderList/page/:page',
          name: 'orderList',
          component: () => import(/* webpackChunkName: "OrderList" */ './components/AdminComponents/OrderList/OrderList.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'couponList',
          redirect: 'couponList/page/1',
          meta: { requiresAuth: true }
        },
        {
          path: 'couponList/page',
          redirect: 'couponList/page/1',
          meta: { requiresAuth: true }
        },
        {
          path: 'couponList/page/:page',
          name: 'couponList',
          component: () => import(/* webpackChunkName: "CouponList" */ './components/AdminComponents/CouponList/CouponList.vue'),
          meta: { requiresAuth: true }
        }, {
          path: '*',
          redirect: 'productList/page/1',
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/shopping',
      name: 'shopping',
      redirect: '/shopping_List/page/1',
      components: {
        default: () => import(/* webpackChunkName: "Shopping" */ './views/Shopping/Shopping.vue'),
        Header: Header,
        Footer: Footer
      },
      children: [
        {
          path: '',
          redirect: 'shopping_List/page/1'
        },
        {
          path: 'shopping_List/page/:page',
          name: 'shopping_List',
          component: () => import(/* webpackChunkName: "ProductCardList" */ './components/Shopping/ProductCardList/ProductCardList.vue'),
        },
        {
          path: 'shopping_List/product/:id',
          name: 'shopping_product',
          component: () => import(/* webpackChunkName: "ProductDetail" */ './components/Shopping/ProductDetail/ProductDetail.vue'),
        }, {
          path: '*',
          redirect: 'shopping_List/page/1'
        }
      ]
    }, {
      path: '/cart',
      name: 'cart',
      redirect: 'cart/custom_order',
      components: {
        default: () => import(/* webpackChunkName: "Cart" */ './views/Cart/Cart.vue'),
        Header: Header,
        Footer: Footer
      },
      children: [
        {
          path: 'custom_order',
          name: 'custom_order',
          components: {
            default: () => import(/* webpackChunkName: "Cart_List" */ './components/CartComponents/Cart/Cart.vue'),
            Header: Header,
            Footer: Footer
          }
        },
        {
          path: 'checkout/:orderId',
          name: 'checkout',
          component: () => import(/* webpackChunkName: "Checkout" */ './components/CartComponents/Checkout/Checkout.vue'),
        }]
    }, {
      path: '*',
      redirect: '/'
    }]
})

