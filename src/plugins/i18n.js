import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhTW from 'vee-validate/dist/locale/zh_TW.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_TW',
  messages: {
    zh_TW: {
      fields: {
        email: '信箱',
        password: '密碼',
        username: '姓名',
        tel: '電話',
        address: '地址',
        comment: '留言',
        country: '縣市',
        zone: '鄉鎮[市]區',
        mobile: '手機'
      },
      validation: zhTW.messages
    }
  },
  silentTranslationWarn: true
})

export { i18n }
