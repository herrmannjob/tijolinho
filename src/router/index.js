import Vue from 'vue'
import VueRouter from 'vue-router'
import FormLogin from '../views/Login.vue'
import LoginAws from '../views/Login_aws.vue'
import FormRegister from'../views/Register.vue'
import FormRegisterClient from'../views/RegisterClient.vue'
import Calendar from'../views/Calendar.vue'
import Schedule from'../views/Schedule.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: FormLogin
  },
  {
    path: '/aws',
    name: 'LoginAws',
    component: LoginAws
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
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
