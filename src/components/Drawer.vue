<template>
    <v-card class="left-drawer">
        <v-navigation-drawer
        v-model="drawer"
        permanent
        >
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
</template>

<script>
export default {
  name: 'Drawer',
  data () {
    return {
      drawer: true,
      items: [
        { icon: 'mdi-calendar-month', method: this.calendar },
        { icon: 'mdi-account-group', method: this.clients },
        { icon: 'mdi-cash-100', method: this.financial },
      ],
      mini: true,
    }
  },
  methods: {
    async login () {
    },
    calendar () {
      console.log('calendar')
      this.$router.push('calendar')
    },
    clients () {
      console.log('clients')
      this.$router.push('calendar')
    },
    financial () {
      console.log('financial')
      this.$router.push('calendar')
    }
  }
}
</script>
<style lang="css">
html, body {
  overflow-y: hidden;
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
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body{
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
