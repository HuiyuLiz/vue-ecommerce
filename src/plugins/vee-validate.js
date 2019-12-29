import { extend, configure } from "vee-validate";
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

// Install required rule and message.
extend("required", required);

// Install email rule and message.
extend("email", email);

// Install min rule and message.
extend("min", min);

extend("between", between);
extend("numeric", numeric);





