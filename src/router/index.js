import Vue from "vue";
import VueRouter from "vue-router";
import ModalLogin from "../views/Login.vue";
import LoginAws from "../views/Login_aws.vue";
import ModalRegister from "../views/Register.vue";
import ListClient from "../views/Client.vue";
import ModalRegisterClient from "../views/RegisterClient.vue";
import Calendar from "../views/Calendar.vue";
import Schedule from "../views/Schedule.vue";
import ResetLogin from "../views/ResetLogin.vue";
import ContaUsuario from "../views/ContaUsuario.vue";
import Configuracoes from "../views/Configuracoes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: ModalLogin,
  },
  {
    path: "/aws",
    name: "LoginAws",
    component: LoginAws,
  },
  {
    path: "/clientes",
    name: "ListClient",
    component: ListClient,
  },
  {
    path: "/registro",
    name: "Cadastro",
    component: ModalRegister,
  },
  {
    path: "/calendario",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/registro-cliente",
    name: "RegisterClient",
    component: ModalRegisterClient,
  },
  {
    path: "/planejamento/:id",
    name: "Schedule",
    component: Schedule,
  },
  {
    path: "/resetar",
    name: "ResetLogin",
    component: ResetLogin,
  },
  {
    path: "/conta",
    name: "ContaUsuario",
    component: ContaUsuario,
  },
  {
    path: "/configuracoes",
    name: "Configuracoes",
    component: Configuracoes,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
