#  <a href="https://huiyuliz.github.io/vue-ecommerce/#/" target="_blank">SōUND | 線上音樂</a>  
![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/halfpage.png)  

## 專案說明  
  使用 Vue.js 打造線上虛擬音樂平台，含線上購物、模擬結帳功能及會員後台管理頁面 ，另外串接 KKBOX Open API，可即時獲取最新歌曲排行榜，內嵌 Widget 音樂撥放小差件，可在網頁上連結歌單直接撥放音樂。版型部分使用了 Bootstrap 應用在響應式的網頁設計，設計參考了 Behance、Pinterest 和一些已上線的購物網站。  
  
  此為個人網站練習，不做任何商業應用。 
  
## 使用技術
*  Vue.js
*  Vue CLI 3
*  Vuex
*  Bootstrap
  
## 音樂情報 - 藉由串接 KKBOX Open API 來顯示各種類型的音樂榜單  
  透過申請 KKBOX 開發者網站，建立帳號後呼叫 API 來獲得 Access Token，即可取得歌手、專輯、歌曲、排行榜等資訊，打造需要的應用介面；該頁面呈現各個即時熱門榜單。
  
![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/halfchart.png)  

### 點選播放單曲 - 頁面底部顯示單曲介面  

榜單排名透過 KKBOX Open API 可從 1-100 名做切分顯示，音樂撥放介面顯示於網頁底部，可在瀏覽頁面的同時進行不同的單曲撥放。

![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/chartplaysong.png)  
    
### 點選播放全部試聽 - 顯示歌單互動視窗  

點選全部試聽後，歌單將會以 Modal 互動視窗的方式呈現。  

![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/fullplaymodal.png)  

## 實體專輯 - 購物頁面

商品用音樂類型做為區分，可以直接點選加入購物車，使用 Vuex 管理全域的購物車資訊，可同步顯示在 Navbar 的購物車下拉選單。 

![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/shoppingAll.png)  

### 商品資訊細節  

可以查看商品資訊，點選加入購物車，也能同時試聽該專輯。  

![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/shopping.png)  

## 購物車頁面 - 模擬結帳程序  
### Step 1.確認商品    

使用者選購完畢後，點選上方 Navbar 購物車前往結帳至購物車頁面，可以選擇繼續購物或刪除不需要的專輯；另外填入優惠代碼得到折扣，購物代碼顯示在上面促銷 Banner 資訊。

![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/cart.png)

### Step 2.填寫資料    

表單驗證採用了 VeeValidate 套件和 Bootstrap 的表單驗證做搭配使用。

![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/validation.png) 

### Step 3.完成訂購    

訂購完成後，將顯示模擬訂購頁面。

![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/checkout.png) 

## 後臺管理 - 產品列表、訂單列表、優惠券  

需透過登入才能進到後台管理，後臺可編輯和更新產品以及優惠券資訊，另外可讀取目前訂單的狀態。

![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/dashboard.png)

 ## 其他資訊
  <a href="https://developer.kkbox.com/#/" target="_blank">KKBOX Open API </a>  

    


