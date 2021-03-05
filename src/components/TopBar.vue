<template>
  <v-app-bar>
    <v-spacer class="space"></v-spacer>
    <Seed v-if="false" />
    <div class="top-items">
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <!-- <v-list-item-avatar style="margin-right:10px">
        <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
      </v-list-item-avatar> -->
      
      <span class="top-menu">
        <v-menu
          bottom
          offset-y
          class="extend_menu"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2"
              fab
              small
              color="#002b4b"
              v-bind="attrs"
              v-on="on"
            >
              <span style="color:white">{{ name }}</span>
            </v-btn>
          </template>
          <v-list>
            <div class="extend_icon_name">
              <v-btn
                class="mx-2"
                fab
                small
                color="#002b4b"
              >
                <span style="color:white">{{ name }}</span>
              </v-btn>
              <div class="extend_name_email">
                <strong>{{ username }}</strong>
                <span style="color:gray">{{ user_email }}</span>
              </div>
            </div>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="(option, i) in user_options"
              :key="i"
              @click="() => {}"
            >
              <v-list-item-title>{{ option.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item style="display:contents">
              <v-btn
                outlined
                @click="logout"
              >
                Sair
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
        
      </span>
    </div>

    <v-dialog
      v-model="error_dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Erro
        </v-card-title>

        <v-card-text>
          Tivemos um erro :(<br>
          {{ error }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="error_dialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
// import { api, urls } from '../services/Api'
// import { AmplifyEventBus } from 'aws-amplify-vue'
// import { Auth  } from 'aws-amplify'
// import Functions from '@/functions/Functions'
// import { DataStore } from 'aws-amplify'
// import { Usuario } from '@/models'
import Seed from '@/components/Seed'
export default {
  name: 'TopBar',
  components: {
    Seed
  },
  data () {
    return {
      user: null,
      username: 'Usuário Teste',
      user_email: 'usuario@teste.com',
      user_options: [
        {
          title: 'Conta',
        },
        {
          title: 'Configurações',
        }
      ],
      signedIn: false,
      error_dialog: false,
      error: ''
    }
  },
  computed: {
    name: function () {
      let initials = ''
      this.username.split(" ").map(name => {
        initials += name[0]
      })
      return initials.substr(0, 2)
    }
  },
  async beforeCreate() {
    // try {
    //   this.user = await Functions.isAuth()
    //   this.signedIn = true
    //   this.user_email = this.user.attributes.email
    //   // const user = await DataStore.query(Usuario, data => data.email("eq", this.user_email))
    //   // if (user.length > 0) this.username = user[0].nome
    // } catch (error) {
    //   this.signedIn = false
    //   this.user = null
    //   this.$router.push('/')
    // }
    // AmplifyEventBus.$on('authState', info => {
    //   console.log('info: ', info)
    //   if (info === 'signedIn') {
    //     this.signedIn = true
    //   } else {
    //     this.signedIn = false
    //   }
    // });
  },
  methods: {
    // async logout () {
    //   try {
    //     await Auth.signOut()
    //     this.$router.push('/')
    //   } catch (error) {
    //     this.error = error
    //     this.error_dialog = true
    //   }
    // }
  }
}
</script>
<style lang="css">
html, body {
 overflow-y: auto!important;
 height:100vh;
 width: 100vw !important;}
 
.top-items {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top-menu {
  display: flex;
  align-items: center;
}
.v-menu__content {
  width: 200px;
  top: 48px;
  left: 750px;
  transform-origin: left top 0px;
  z-index: 8;
}
.extend_icon_name {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}
.extend_name_email {
  display: flex;
  flex-direction: column;
  align-items: baseline;
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
