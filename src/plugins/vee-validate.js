import { extend, configure, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email, min, between, numeric } from "vee-validate/dist/rules";
import { i18n } from "./i18n.js";

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`);
    return i18n.t(`validation.${values._rule_}`, values);
  },
  classes: {
    valid: 'is-valid', // one class
    invalid: 'is-invalid' // multiple classes
  }
});

export default {
  install(Vue) {
    Vue.component('ValidationObserver', ValidationObserver)
    Vue.component('ValidationProvider', ValidationProvider)

    extend("required", required);
    extend("email", email);
    extend("min", min);
    extend("between", between);
    extend("numeric", numeric);
    extend("mobile", {
      message: "手機格式錯誤",
      validate: value => value.length === 10 && /^09\d{8}$/.test(value)
    });
  }
}




