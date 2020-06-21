import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'
import { required, min, email } from 'vee-validate/dist/rules'

localize({
  en: {
    messages: {
      required: (name) => `${name} field is required`,
      email: (name) => `Please use a valid email address`,
      min: (name, { length }) =>
        `${name} field must have ${length} characters or more`
    }
  }
})

extend('min', min)
extend('email', email)
extend('required', required)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
