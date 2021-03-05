<template>
  <div class="components row">
    <div class="col-9" >
      <v-text-field
        solo
        label="Buscar Cliente"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <div style="align-items:flex-start;width:1rem">
        <v-btn
          color="primary"
          class="btn-primario"
          @click="openDialog()"
          style="margin-bottom:0.5rem; margin-left:0; margin-top:0"
        >
          <v-icon>mdi-plus</v-icon>

          <router-link class="link-client" to="/register-client"
            >NOVO CLIENTE</router-link
          >
        </v-btn>
      </div>
      <v-card max-width="900" class="mx-auto">
        <v-list-item v-for="item in itemsTitle" :key="item.title">
          <!-- <v-list-item-avatar>
            <v-list-item-title v-text="item.avatar"></v-list-item-title>
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <!-- <v-list-item-content>
            <v-list-item-title v-text="item.obras"></v-list-item-title>
          </v-list-item-content> -->
          <v-list-item-icon>
            <p>Ações</p>
          </v-list-item-icon>
        </v-list-item>
        <v-list>
          <v-list-item v-for="item in clients" :key="item.title">
            <!-- <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar> -->

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
            <!-- <v-list-item-content>
              <v-list-item-title v-text="item.obras"></v-list-item-title>
            </v-list-item-content> -->
            <v-list-item-icon>
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-list-item-icon>
            <v-list-item-icon>
              <v-icon>
                mdi-delete
              </v-icon>
            </v-list-item-icon>
            <v-list-item-icon>
              <v-icon>
                mdi-eye
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <v-divider vertical></v-divider>
    <!--Ultimos vizualizados ----- -->
    <div class="col right-col">
      <div class="row group-data">
        <p class="title">Ultimos Vizualizados:</p>
        <v-btn text color="primary" class="col">
          Ver todos
        </v-btn>
      </div>
      <div>
        <v-card
          class="card-right"
          color="primary"
          v-for="(item, i) in 3"
          :key="i"
        >
          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-avatar class="avatar" tile>
                  <v-img
                    src="https://randomuser.me/api/portraits/women/85.jpg"
                  ></v-img>
                </v-avatar>
                <span style="margin-left:5px">{{ username }}</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { api, urls } from '../services/Api'
// import { Usuario, Empresa } from '@/models'
import Functions from '@/functions/Functions'
export default {
  data() {
    return {
      today: "",
      username: "Usuário Teste",
      itemsTitle: [
        {
          title: "Nome",
          avatar: "Foto",
          obras: "Obras ativas",
          icons: "Ações",
        },
      ],
      clients: [
        {
          title: "Nenhum cliente cadastrado"
        },
      ],
      user: null,
      companies: [],
    }
  },
  async created () {
    this.user = await Functions.isAuth()
    // await this.getUser()
    // this.getClients()
  },
  methods: {
    async getUser () {
      // const user = await Functions.wichUserId(Usuario, this.user.attributes.email)
      // this.user = user.data
    },
    async getCompanies () {
      // const response = await Functions.getAll(Empresa)
      // if (response.status === 'ok') {
      //   response.data.filter(item => {
      //     if (item.usuarioID.includes(this.user.id)) this.companies.push(item)
      //   })
      // }
    },
    async getClients () {
      // await this.getCompanies()
      // const client_ids = []
      // this.companies.map(company => {
      //   company.usuarioID.filter(user_id => {
      //     if (user_id !== this.user.id) {
      //       client_ids.push(user_id)
      //     }
      //   })
      // })
      // const clients = []
      // client_ids.map(async function (id) {
      //   const response = await Functions.getById(Usuario, id)
      //   clients.push({ title: response.data.nome })
      // })
      // this.clients = clients
    },
  }
};
</script>
<style lang="css">
html,
body {
  overflow-y: auto;
}
.teste1 {
  flex: 0, 0 !important;
}
.paragrafo {
  float: inline-start;
  flex: 1 1;
}
.link-client {
  color: aliceblue;
  text-decoration: none;
}

.components {
  padding: 20px;
}
.right-col > .title {
  margin-top: 20px;
}
.card-right {
  margin-top: 5px;
  margin-bottom: 5px;
  min-height: 60px;
}
.group-data {
  align-items: flex-start;
  flex-direction: row;
  padding-left: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.group-data > p {
  padding: 0;
}
.avatar {
  display: flex;
  width: 65px !important;
  height: 65px !important;
}
</style>
