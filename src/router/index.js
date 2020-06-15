import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: () => import(/* webpackChunkName: "home" */ '../views/Home')
      }
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        default: () => import(/* webpackChunkName: "Login" */ '../views/Login')
      }
    },
    {
      path: '/musicCharts',
      name: 'MusicCharts',
      redirect: 'musicCharts',
      components: {
        default: () => import(/* webpackChunkName: "MusicCharts" */ '../views/MusicCharts')
      },
      children: [
        {
          path: '',
          name: 'MusicChartList',
          component: () => import(/* webpackChunkName: "MusicChartList" */ '../components/Client/MusicCharts/MusicChartList')
        }, {
          path: ':chart_title',
          name: 'MusicChartDetail',
          component: () => import(/* webpackChunkName: "MusicChartDetail" */ '../components/Client/MusicCharts/MusicChartDetail')
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/productList/page/1',
      component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin'),
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
          meta: { requiresAuth: true }
        },
        {
          path: 'productList/page',
          redirect: 'productList/page/1',
          meta: { requiresAuth: true }
        },
        {
          path: 'productList/page/:page',
          name: 'productList',
          component: () => import(/* webpackChunkName: "ProductList" */ '../components/Dashboard/ProductList'),
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
          component: () => import(/* webpackChunkName: "OrderList" */ '../components/Dashboard/OrderList'),
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
          component: () => import(/* webpackChunkName: "CouponList" */ '../components/Dashboard/CouponList'),
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
      redirect: '/shopping_List/all/1',
      components: {
        default: () => import(/* webpackChunkName: "Shopping" */ '../views/Shopping')
      },
      children: [
        {
          path: '',
          redirect: 'shopping_List/all/1'
        },
        {
          path: 'shopping_List/:category/:page',
          name: 'shopping_List',
          component: () => import(/* webpackChunkName: "ShoppingCardList" */ '../components/Client/Shopping/ShoppingCardList')
        },
        {
          path: 'shopping_List/:category/:id',
          name: 'shopping_product',
          component: () => import(/* webpackChunkName: "ShoppingDetail" */ '../components/Client/Shopping/ShoppingDetail')
        },
        {
          path: '*',
          redirect: '/shopping_List/all/1',
          component: () => import(/* webpackChunkName: "ShoppingDetail" */ '../components/Client/Shopping/ShoppingDetail')
        }
      ]
    }, {
      path: '/cart',
      name: 'cart',
      redirect: 'cart/custom_order',
      components: {
        default: () => import(/* webpackChunkName: "Cart" */ '../views/Cart')
      },
      children: [
        {
          path: 'custom_order',
          name: 'custom_order',
          components: {
            default: () => import(/* webpackChunkName: "Cart_List" */ '../components/Client/Carts/Cart')
          }
        },
        {
          path: 'checkout/:orderId',
          name: 'checkout',
          component: () => import(/* webpackChunkName: "Checkout" */ '../components/Client/Carts/Checkout')
        }]
    }, {
      path: '*',
      redirect: '/'
    }],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
