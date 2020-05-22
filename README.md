# SōUND | 線上音樂  
![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/halfpage.png)  

## 專案說明  
此為六角學院的「 Vue 出一個電商網站 」線上課程練習，不做任何商業應用。 
    
使用 Vue.js 打造線上的音樂平台，含線上購物、模擬結帳功能及會員後台管理頁面 ，另外串接 KKBOX Open API，可即時獲取最新歌曲排行榜，內嵌 Widget 小差件，可在網頁上連結歌單並進行撥放。版型部分使用了 Bootstrap 應用在響應式的網頁設計，設計參考了 Behance、Pinterest 和一些已上線的購物網站。

### KKBOX Open API   
![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/halfchart.png)  
透過申請 KKBOX 開發者網站建立帳號，用 Axios 呼叫 KKBOX OAuth 2.0 Token API 來獲得 Access Token，即可取得歌手、專輯、歌曲、排行榜等資訊，打造需要的應用介面。

### 點選播放單曲  
![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/chartplaysong.png)  
榜單排名透過 KKBOX Open API 可從 1-100 名做切分顯示，音樂撥放介面顯示網頁底部，可同時瀏覽頁面並進行不同的單曲撥放。
    
### 點選播放全部歌單  
![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/fullplaymodal.png)  
點選撥放全部後，歌單將會以 Modal 方式呈現。  

### 購物頁面  
![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/shopping.png)  
可以觀看商品資訊，點選加入購物車，也可以試聽該專輯。  

### 購物車頁面  
![image]( https://raw.githubusercontent.com/HuiyuLiz/vue-ecommerce/master/src/assets/captureimg/cart.png)  
由於上方的 Navbar 也會顯示購物車的部分，因此用了 Vuex 管理全域的購物車。


 ## 其他資訊
  <a href="https://developer.kkbox.com/#/" target="_blank">KKBOX Open API </a>  

    


