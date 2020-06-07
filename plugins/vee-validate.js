import Vue from 'vue'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', required)

Vue.component('ValidationProvider', ValidationProvider)
