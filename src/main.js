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
import Vuesax from "../node_modules/vuesax";
import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";
import "boxicons";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { fab, faWhatsapp, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUserSecret, fas } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";
import $ from "jquery";
import VueJquery from "vue-jquery";
import responsive from "vue-responsive";
import firebase from "./services/Firebase";
import money from "v-money";
import VueCurrencyInput from "vue-currency-input";
import VueTheMask from "vue-the-mask";
// import VueMask from "vue-jquery-mask";
import VueMask from 'v-mask'

export const db = firebase.firestore();

library.add(fab, fas, faWhatsapp, faTwitter, faUserSecret, faComment);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);
const pluginOptions = {
  /* see config reference */
  globalOptions: { currency: "BRL" },
};

Vue.use(VueMask);
Vue.use(VueTheMask);
Vue.use(VueCurrencyInput, pluginOptions);
Vue.use(money, { precision: 4 });
Vue.use(responsive);
Vue.use($);
Vue.use(VueJquery);
Vue.use(dayjs);
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
