import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home'
import Header from './components/Layout/Header/Header'

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
        Header: Header
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login/Login.vue')
    }, {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/productList/page/1',
      component: () => import(/* webpackChunkName: "about" */ './views/Admin/Admin.vue'),
      children: [
        {
          path: 'productList/page/:page',
          name: 'productList',
          component: () => import(/* webpackChunkName: "about" */ './components/AdminComponents/ProductList/ProductList.vue'),
          meta: { requiresAuth: true }
        }, {
          path: 'orderList/page/:page',
          name: 'orderList',
          component: () => import(/* webpackChunkName: "about" */ './components/AdminComponents/OrderList/OrderList.vue'),
          meta: { requiresAuth: true },
        }, {
          path: 'couponList/page/:page',
          name: 'couponList',
          component: () => import(/* webpackChunkName: "about" */ './components/AdminComponents/CouponList/CouponList.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/shopping',
      name: 'shopping',
      components: {
        default: () => import(/* webpackChunkName: "about" */ './views/Shopping/Shopping.vue'),
        Header: Header
      },
      children: [
        {
          path: 'shopping_List/page/:page',
          name: 'shopping_List',
          component: () => import(/* webpackChunkName: "about" */ './components/Shopping/ProductCardList/ProductCardList.vue'),
        },
        {
          path: 'shopping_List/product/:id',
          name: 'shopping_product',
          component: () => import(/* webpackChunkName: "about" */ './components/Shopping/ProductDetail/ProductDetail.vue'),
        }
      ]
    }, {
      path: '/cart',
      name: 'cart',
      redirect: 'cart/custom_order',
      components: {
        default: () => import(/* webpackChunkName: "about" */ './views/Cart/Cart.vue'),
        Header: Header
      },
      children: [
        {
          path: 'custom_order',
          name: 'custom_order',
          components: {
            default: () => import(/* webpackChunkName: "about" */ './components/Cart/CartList/CartList.vue'),
            Header: Header
          }
        },
        {
          path: 'checkout/:orderId',
          name: 'checkout',
          component: () => import(/* webpackChunkName: "about" */ './components/Cart/Checkout/Checkout.vue'),
        }]
    }, {
      path: '*',
      redirect: '/'
    }]
})

