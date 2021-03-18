<template>
  <div class="drawerBg">
    <v-card class="left-drawer desktop-card">
      <v-navigation-drawer v-model="drawer" permanent>
        <v-list dense class="icons-group">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="item.method"
          >
            <v-list-item-icon>
              <v-icon dark large>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Drawer",
  data() {
    return {
      drawer: true,
      items: [
        { icon: "mdi-calendar-month", method: this.calendar },
        { icon: "mdi-account-group", method: this.clients },
        { icon: "mdi-chart-gantt", method: this.schedule },
        { icon: "mdi-cash-100", method: this.financial },
      ],
      mini: true,
    };
  },
  methods: {
    async login() {},
    calendar() {
      this.$router.push("calendario");
    },
    clients() {
      this.$router.push("clientes");
    },
    schedule() {
      this.$router.push("planejamento");
    },
    financial() {
      this.$router.push("cotacao");
    },
  },
};
</script>
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
  max-width: 85px !important;
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
  height: 30%;
  margin-bottom: 5rem;
}

.mobile-sheet {
  display: none;
}

.mobile-card {
  display: none;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body {
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
