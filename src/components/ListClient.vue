<template>
  <div class="components row list-clients">
    <div class="btn-list">
      <v-btn
        color="primary"
        class="btn-primario"
        @click="openDialog()"
        style="margin-bottom:0.5rem; margin-left:0; margin-top:0"
      >
        <v-icon>mdi-plus</v-icon>
        <router-link class="link-client" to="/register-client">NOVO CLIENTE</router-link>
      </v-btn>
      <v-btn text>
        Histórico
      </v-btn>
    </div>
    <v-data-table
      v-model="selected"
      :single-select="singleSelect"
      show-select
      :headers="headers"
      :items="clients"
      item-key="id"
      class="elevation-1"
      :search="search"
      :custom-filter="filter"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Buscar cliente"
          class="mx-4"
        ></v-text-field>
      </template>
      
    </v-data-table>

    <v-speed-dial
      v-if="selected.length"
      v-model="fab"
      bottom
      right
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import Firebase from "@/services/Firebase"
import { FirebaseMixin } from "@/mixins/FirebaseMixin"
export default {
  mixins: [FirebaseMixin],
  data() {
    return {
      today: "",
      search: '',
      clients: [
        {
          title: "Nenhum cliente cadastrado"
        },
      ],
      singleSelect: true,
      selected: [],
      user_email: '',
      companies: [],
    }
  },
  async mounted () {
    await Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user_email = user.email
        this.getClients()
      }
      else this.$router.push("/")
    })
  },
  
  methods: {
    filter (value, search) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
    },
    async getCompanies () {
      const response = await this.getDocumentList(Firebase.firestore(), 'Empresa', 'usuarioID', this.user_email)
      if (response.status === 'ok') {
        this.companies = response.documents
      }
    },
    async getClients () {
      await this.getCompanies()
      if (this.companies.length > 0) {
        let client_ids = []
        this.companies.map(company => {
          company.usuarioID.map(client => {
            if (client !== this.user_email) client_ids.push(client)
          })
        })
        if (client_ids.length > 0) {
          this.clients = []
          client_ids.map(async (item) => {
            const response = await this.getDocument(Firebase.firestore(), 'Usuario', 'id', item)
            this.clients.push(response.documents[0].data)
          })
        }
      }
    },
  },

  computed: {
    headers () {
      return [
        {
          text: 'Nome',
          align: 'start',
          value: 'nome',
        },
        {
          text: 'Telefone',
          value: 'telefone',
        },
        {
          text: 'Email',
          value: 'email'
        }
      ]
    },
  },
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
.btn-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.list-clients {
  flex-direction: column !important;
}
.v-speed-dial {
  position: absolute !important;
}
</style>
