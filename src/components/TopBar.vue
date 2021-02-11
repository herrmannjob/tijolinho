<template>
  <v-app-bar>
    <v-spacer class="space"></v-spacer>
    <div class="top-items">
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
      </v-list-item-avatar>
      
      <span class="top-menu">
        {{ username }}
        <v-icon>mdi-chevron-down</v-icon>
      </span>
    </div>
  </v-app-bar>
</template>

<script>
// import { api, urls } from '../services/Api'
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth  } from 'aws-amplify'
export default {
  name: 'TopBar',
  components: {
  },
  data () {
    return {
      username: 'Usuário Teste',
      signedIn: false
    }
  },
  async beforeCreate() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
      this.signedIn = true
      this.$router.push('calendar')
    } catch (error) {
      console.log('erro: ', error)
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      console.log('info: ', info)
      if (info === 'signedIn') {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    });
  },
  methods: {
    async login () {
    }
  }
}
</script>
<style lang="css">
html, body {
  overflow-y: hidden;
}
.top-items {
  min-width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top-menu {
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body{
    overflow-x: auto;
    overflow-y: auto;
  }
  .space {
    display: none;
  }
}
</style>
