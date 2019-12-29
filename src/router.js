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
        default: () => import(/* webpackChunkName: "login" */ './views/Login/Login.vue'),
        Header: Header,
        Footer: Footer
      }
    }, {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/productList/page/1',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin/Admin.vue'),
      meta: { requiresAuth: true },
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
          component: () => import(/* webpackChunkName: "productList" */ './components/AdminComponents/ProductList/ProductList.vue'),
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
          component: () => import(/* webpackChunkName: "orderList" */ './components/AdminComponents/OrderList/OrderList.vue'),
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
          component: () => import(/* webpackChunkName: "couponList" */ './components/AdminComponents/CouponList/CouponList.vue'),
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
      redirect: '/hopping_List/page/1',
      components: {
        default: () => import(/* webpackChunkName: "shopping" */ './views/Shopping/Shopping.vue'),
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
          component: () => import(/* webpackChunkName: "shopping_List" */ './components/Shopping/ProductCardList/ProductCardList.vue'),
        },
        {
          path: 'shopping_List/product/:id',
          name: 'shopping_product',
          component: () => import(/* webpackChunkName: "shopping_product" */ './components/Shopping/ProductDetail/ProductDetail.vue'),
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
        default: () => import(/* webpackChunkName: "cart" */ './views/Cart/Cart.vue'),
        Header: Header,
        Footer: Footer
      },
      children: [
        {
          path: 'custom_order',
          name: 'custom_order',
          components: {
            default: () => import(/* webpackChunkName: "custom_order" */ './components/CartComponents/Cart/Cart.vue'),
            Header: Header,
            Footer: Footer
          }
        },
        {
          path: 'checkout/:orderId',
          name: 'checkout',
          component: () => import(/* webpackChunkName: "checkout" */ './components/CartComponents/Checkout/Checkout.vue'),
        }]
    }, {
      path: '*',
      redirect: '/'
    }]
})

