<script>
// import Vue from "vue";
// import vueResponsive from "vue-responsive";
// Vue.directive("responsive", vueResponsive);
export default {
  name: "Drawer",
  data() {
    return {
      drawer: true,
      mini: true,
    };
  },
  methods: {
    async login() {},
  },
};
</script>

<template>
  <div class="drawerBg">
    <v-card class="left-drawer desktop-card">
      <v-navigation-drawer v-model="drawer" permanent>
        <v-list dense class="icons-group">
          <v-list-item v-responsive="['hidden-all', 'xs', 'sm', 'md']">
            <router-link to="/calendario"
              ><v-icon dark>mdi-calendar-month</v-icon></router-link
            >
          </v-list-item>
          <v-list-item v-responsive="['hidden-all', 'lg', 'xl']">
            <router-link to="/calendario"
              ><v-icon dark large>mdi-calendar-month</v-icon></router-link
            >
          </v-list-item>
          <v-list-item v-responsive="['hidden-all', 'xs', 'sm', 'md']">
            <router-link to="/clientes"
              ><v-icon dark>mdi-account-group</v-icon></router-link
            >
          </v-list-item>
          <v-list-item v-responsive="['hidden-all', 'lg', 'xl']">
            <router-link to="/clientes"
              ><v-icon dark large>mdi-account-group</v-icon></router-link
            >
          </v-list-item>
          <v-list-item v-responsive="['hidden-all', 'xs', 'sm', 'md']">
            <router-link to="/cotacao"
              ><v-icon dark>mdi-cash-100</v-icon></router-link
            >
          </v-list-item>
          <v-list-item v-responsive="['hidden-all', 'lg', 'xl']">
            <router-link to="/cotacao"
              ><v-icon dark large>mdi-cash-100</v-icon></router-link
            >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<style lang="css">
html,
body {
  overflow-y: auto !important;
  height: 200vh;
  width: 100vw !important;
}
.left-drawer {
  height: 100vh;
}
.v-navigation-drawer {
  background-color: #002b4b !important;
  color: white !important;
  border-radius: 0 !important;
  max-width: 80px !important;
  align-items: center;
}
.v-navigation-drawer__content {
  display: flex;
  width: 100%;
  justify-content: center;
}

.icons-group {
  align-self: center !important;
  width: 100%;
  justify-content: center;
  display: flex !important;
  flex-direction: column !important;
  height: 30%;
}

/* .icons-group {
  align-self: center !important;
  width: 100%;
  justify-content: center;
  display: grid !important;
  height: 30%;
} */

.mobile-sheet {
  display: none;
}

.mobile-card {
  display: none;
}
@media only screen and (max-height: 850px) {
  /* For mobile phones: */
  body {
    overflow-x: auto;
    overflow-y: auto !important;
    height: 200vh;
    width: 100vw !important;
  }
  .left-drawer {
    height: 100vh;
  }
  .v-navigation-drawer {
    background-color: #002b4b !important;
    color: white !important;
    border-radius: 0 !important;
    max-width: 30px !important;
    align-items: center;
  }
  .v-navigation-drawer__content {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .icons-group {
    align-self: center !important;
    width: 100%;
    justify-content: center;
    display: grid !important;
    height: 40%;
  }
}
</style>
