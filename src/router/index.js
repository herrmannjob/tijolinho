import Vue from 'vue'
import VueRouter from 'vue-router'
import ModalLogin from '../views/Login.vue'
import LoginAws from '../views/Login_aws.vue'
import ModalRegister from'../views/Register.vue'
import ListClient from'../views/Client.vue'
import ModalRegisterClient from'../views/RegisterClient.vue'
import Calendar from'../views/Calendar.vue'
import Schedule from'../views/Schedule.vue'
import ResetLogin from'../views/ResetLogin.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: ModalLogin
  },
  {
    path: '/aws',
    name: 'LoginAws',
    component: LoginAws
  },
  {
    path: '/clientes',
    name: 'ListClient',
    component:ListClient
  },
  {
    path: '/registro',
    name: 'Cadastro',
    component: ModalRegister
  },
  {
    path: '/calendario',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/registro-cliente',
    name: 'RegisterClient',
    component: ModalRegisterClient
  },
  {
    path: '/planejamento',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/resetar',
    name: 'ResetLogin',
    component: ResetLogin
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
