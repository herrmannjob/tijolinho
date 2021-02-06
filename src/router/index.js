import Vue from 'vue'
import VueRouter from 'vue-router'
import FormLogin from '../views/Login.vue'
import FormLoginAws from '../views/Login_aws.vue'
import FormRegister from'../views/Register.vue'

import FormRegisterClient from'../views/RegisterClient.vue'
import Calendar from'../views/Calendar.vue'
import * as query from '../services/querys_amplify.js'
query
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: FormLogin
  },
  {
    path: '/aws',
    name: 'Login_aws',
    component: FormLoginAws
  },
  {
    path: '/register',
    name: 'Cadastro',
    component: FormRegister
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/register-client',
    name: 'RegisterClient',
    component: FormRegisterClient
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
