import Vue from "vue";
import VueI18n from "vue-i18n";
import zh_TW from "vee-validate/dist/locale/zh_TW.json";
import en from "vee-validate/dist/locale/en.json";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh_TW",
  messages: {
    zh_TW: {
      fields: {
        email: "信箱",
        password: "密碼",
        name: "使用者名稱",
        tel: "電話",
        address: "地址",
        comment: "留言"

      },
      validation: zh_TW.messages
    },
    en: {
      fields: {
        email: "E-mail",
        password: "Password"
      },
      validation: en.messages
    }
  }
});

export { i18n };
