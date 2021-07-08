import axios from 'axios'
import { getToken } from '@/utils/auth.js'

let api = `${process.env.VUE_APP_API}/`
let path = `${process.env.VUE_APP_CUSTOMER_PATH}`
let token = getToken()

const apiRequest = axios.create({
  baseURL: api,
  withCredentials: true
})

// request interceptor
apiRequest.interceptors.request.use(
  config => {
    if (token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


const postalRequest = axios.create({
  baseURL: '../assets/postal.json',
  withCredentials: true
})

// 登入登出
export const login = data => apiRequest.post('/admin/signin', data)
export const logout = data => apiRequest.post('/logout')
export const checkLogIn = data => apiRequest.post('/api/user/check')

// 管理控制台 產品 (Products)
export const createProduct = data => apiRequest.post(`/api/${path}/admin/product`, data)
export const getProductList = (page) => apiRequest.get(`/api/${path}/admin/products?page=${page}`)
export const getProductListAll = () => apiRequest.get(`/api/${path}/admin/products/all`)
export const editProduct = (data, id) => apiRequest.put(`/api/${path}/admin/product/${id}`, data)
export const deleteProduct = id => apiRequest.delete(`/api/${path}/admin/product/${id}`)

// 管理控制台 訂單 (Orders)
export const getOrders = (page) => apiRequest.get(`/api/${path}/admin/orders?page=${page}`)
export const editOrder = (data, id) => apiRequest.put(`/api/${path}/admin/order/${id}`, data)

// 管理控制台 優惠券 (Coupons)
export const createCoupon = data => apiRequest.post(`/api/${path}/admin/coupon`, data)
export const getCouponList = (page) => apiRequest.get(`/api/${path}/admin/coupons?page=${page}`)
export const editCoupon = (data, id) => apiRequest.put(`/api/${path}/admin/coupon/${id}`, data)
export const deleteCoupon = id => apiRequest.delete(`/api/${path}/admin/coupon/${id}`)
export const useCoupon = code => apiRequest.post(`/api/${path}/coupon`, code)

// 上傳圖片
export const uploadFile = (data, config) => apiRequest.post(`/api/${path}/admin/upload`, data, config)

// 客戶購物 商品列表
export const getShoppingList = (page) => apiRequest.get(`/api/${path}/products?page=${page}`)
export const getShoppingListAll = () => apiRequest.get(`/api/${path}/products/all`)
export const getProduct = (id) => apiRequest.get(`/api/${path}/product/${id}`)
export const addToCart = data => apiRequest.post(`/api/${path}/cart`, data)
export const deleteFromCart = id => apiRequest.delete(`/api/${path}/cart/${id}`)
export const getCartList = () => apiRequest.get(`/api/${path}/cart`)
export const coupon = (data) => apiRequest.post(`/api/${path}/coupon`, data)

// 結帳頁面
export const submitOrder = (data) => apiRequest.post(`/api/${path}/order`, data)
export const getOrderLists = (page) => apiRequest.get(`/api/${path}/orders?page=${page}`)
export const getOrderList = (orderId) => apiRequest.get(`/api/${path}/order/${orderId}`)
export const checkoutOrder = (orderId) => apiRequest.post(`/api/${path}/pay/${orderId}`)

// 郵遞區號
export const getPostal = () => postalRequest.get()
