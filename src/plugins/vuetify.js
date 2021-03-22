import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import en from "vuetify/src/locale/en.ts";
import pt from "vuetify/src/locale/pt.ts";
import es from "vuetify/src/locale/es.ts";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { en, pt, es },
    current: "pt",
  },
});
