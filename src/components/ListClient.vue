<script>
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
import ModalRegisterClient from "@/components/ModalRegisterClient";
import ModalEditClient from "@/components/ModalEditClient";
import "@fortawesome/free-brands-svg-icons";
export default {
  mixins: [FirebaseMixin],
  data() {
    return {
      outlinedColor: "#002b4b",
      gradientColor: "#00467a",
      today: "",
      search: "",
      clients: [
        {
          title: "Nenhum cliente cadastrado",
        },
      ],
      singleSelect: true,
      selected: [],
      user_email: "",
      companies: [],
      editModal: false,
      registerModal: false,
      nome: [],
      email: [],
      telefone: [],
      data_nascimento: [],
      nome_conjuge: [],
      data_nascimento_conjuge: [],
      TipoUsuario: [],
      idParams: "",
      active: false,
    };
  },
  components: { ModalRegisterClient, ModalEditClient },
  async mounted() {
    await Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_email = user.email;
        this.getClients();
      } else this.$router.push("/");
    });
  },
  methods: {
    showEditModal(id) {
      this.idParams = id;
      this.editModal = true;
    },
    closeEditModal() {
      this.editModal = false;
    },
    linkWhatsApp() {
      let number = 5551980478617;
      let message = "teste".split(" ").join("%20");

      var url =
        "https://api.whatsapp.com/send?phone=" +
        number +
        "&text=" +
        encodeURIComponent(message);

      window.open(url);
    },
    sendEmail() {
      window.open("mailto:herrmannjob@gmail.com?subject=teste&body=testando");
    },
    async getCompanies() {
      const response = await this.getDocumentList(
        Firebase.firestore(),
        "Empresa",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.companies = response.documents;
      }
    },
    rotaCronograma() {
      this.$router.push("planejamento");
    },
    async getClients() {
      await this.getCompanies();
      if (this.companies.length) {
        let client_ids = [];
        this.companies.map((company) => {
          company.usuarioID.map((client) => {
            if (client !== this.user_email) client_ids.push(client);
          });
        });
        if (client_ids.length) {
          this.clients = [];
          client_ids.map(async (item) => {
            const response = await this.getDocument(
              Firebase.firestore(),
              "Usuario",
              "id",
              item
            );
            this.clients.push(response.documents[0].data);
            this.nome.push(response.documents[0].data.nome);
            this.TipoUsuario.push(response.documents[0].data.TipoUsuario);
          });
        }
      }
    },
  },
};
</script>

<template>
  <div class="components row list-clients">
    <div>
      <vs-button
        :color="outlinedColor"
        class="btn-primary-extra-lg"
        @click="active = !active"
        style="margin: 2%;"
        ><font-awesome-icon class="plus-client" :icon="['fas', 'plus']" />
        Novo Cliente
      </vs-button>
    </div>
    <ModalRegisterClient :active.sync="active"></ModalRegisterClient>
    <v-col>
      <v-tabs color="deep-purple accent-4" left>
        <v-tab>Ativos</v-tab>
        <v-tab>Inativos</v-tab>

        <v-tab-item v-for="n in 2" :key="n">
          <v-container fluid>
            <v-row v-for="(client, index) in clients" :key="index">
              <v-card
                max-width="100%"
                class="fill-width each-card"
                style="margin-bottom: 1.5%;"
              >
                <v-list two-line class="list-clients">
                  <v-list-item>
                    <v-list-item-avatar class="mr-4" @click="rotaCronograma()">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/lists/ali.png"
                      >
                      </v-img>
                    </v-list-item-avatar>
                    <v-list-item-content
                      class="ml-4 mr-4"
                      @click="rotaCronograma()"
                    >
                      <v-list-item-title>{{ client.nome }}</v-list-item-title>
                      <v-list-item-subtitle>Nome</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-content @click="rotaCronograma()">
                      <v-list-item-title>{{ client.email }}</v-list-item-title>
                      <v-list-item-subtitle>Obras</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-btn primary icon class="ml-4 mr-4">
                        <v-icon>mdi-account</v-icon>
                      </v-btn>

                      <v-btn
                        primary
                        icon
                        class="mr-4"
                        @click="showEditModal(client.id)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>

                      <v-btn primary icon class="mr-4" @click="linkWhatsApp()">
                        <font-awesome-icon
                          class="whatsapp"
                          :icon="['fab', 'whatsapp']"
                        />
                      </v-btn>

                      <v-btn primary icon class="mr-4" @click="sendEmail()">
                        <v-icon>mdi-email</v-icon>
                      </v-btn>

                      <!-- <v-btn primary icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn> -->
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
      <ModalEditClient
        v-show="editModal"
        @close="closeEditModal"
        :idParams="this.idParams"
        :firstname="this.nome"
      ></ModalEditClient>
    </v-col>

    <!-- <v-data-iterator> </v-data-iterator> -->
  </div>
</template>

<style lang="css">
html,
body {
  overflow-y: auto;
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
.btn-primary-extra-lg {
  font-family: "Comfortaa", cursive;
  width: 20%;
}
.each-card {
  width: 100%;
}

.whatsapp {
  font-weight: bold !important;
  font-size: 20px;
}

.plus-client {
  margin-right: 4%;
}
/* .list-clients {
  min-height: 48px !important;
} */
@media only screen and (max-width: 768px) {
  .btn-primario .btn-cliente {
    margin: 5%;
  }

  /* .btn-primario {
    max-width: 120px;
  } */
}
</style>
