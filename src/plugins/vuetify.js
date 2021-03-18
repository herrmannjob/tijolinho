import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import en from "vuetify/src/locale/en.ts";
import pt from "vuetify/src/locale/pt.ts";
import es from "vuetify/src/locale/es.ts";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#b0bec5",
        anchor: "#8c9eff",
      },
    },
  },
  lang: {
    locales: { en, pt, es },
    current: "pt",
  },
});
