import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import SchedulerComponent from "./components/SchedulerComponent.vue";
import VueFlexLayout from "@jporto/vue-flex-layout";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuesax from '../node_modules/vuesax'
import "vuesax/dist/vuesax.css";
import 'material-icons/iconfont/material-icons.css';
import 'boxicons';

Vue.use(Vuesax);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueFlexLayout);

export { SchedulerComponent };
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
