<script>
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
import ModalRegisterClient from "@/components/ModalRegisterClient";
import ModalEditClient from "@/components/ModalEditClient";
import ModalViewClient from "@/components/ModalViewClient";
import "@fortawesome/free-brands-svg-icons";
import Vue from "vue";
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
      clientConstructions: [],
      editedClient: {},
      singleSelect: true,
      selected: [],
      selectedClient: {},
      user_email: "",
      companies: [],
      constructions: [],
      constructions_names: [],
      nome: [],
      email: [],
      telefone: [],
      data_nascimento: [],
      nome_conjuge: [],
      data_nascimento_conjuge: [],
      TipoUsuario: [],
      idParams: "",
      formClient: false,
      formEditClient: false,
      formViewClient: false,
      urlImage: [],
      whatsapp: [],
    };
  },
  components: { ModalRegisterClient, ModalEditClient, ModalViewClient },
  async mounted() {
    await Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_email = user.email;
        // this.getClients();
        this.getObras();
      } else this.$router.push("/");
    });
  },
  methods: {
    showViewModal(id) {
      this.selectedClient = Object.assign({}, id);
      this.formViewClient = true;
    },
    showEditModal(id) {
      this.editedClient = Object.assign({}, id);
      this.formEditClient = true;
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
    rotaCronograma(client) {
      Vue.prototype.$globalValue = client;
      this.$router.push("planejamento" + "/" + client);
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
            this.urlImage.push(response.documents[0].data.foto_perfil);
            this.TipoUsuario.push(response.documents[0].data.TipoUsuario);
            this.whatsapp.push(response.documents[0].data.telefone);
          });
        }
      }
    },
    async getObras() {
      await this.getClients();
      const response = await this.getDocument(
        Firebase.firestore(),
        "Obra",
        "usuarioID",
        this.user_email
      );
      console.log("response", response.status);
      if (response.status === "ok") {
        response.documents.map((item) => {
          this.clients.forEach((client) => {
            if (item.data.usuarios === client.id) {
              this.clientConstructions.push(client);
              this.constructions.push(item.data);
              let body = {
                constructionLength: this.constructions.length.toString(),
              };
              Object.assign(client, body);
              let objeto = Object.assign(client, body);
              console.log("objeto", objeto);
              // this.constructions.push(item.data);
              this.constructions_names.push(item.data.nome);
              // console.log("this.constructions name", this.constructions_names);
            }
          });
        });
      }
    },
    linkWhatsApp(id) {
      this.clients.map((item) => {
        if (id === item.id) {
          let whatsapp = item.telefone;
          let message = "teste".split(" ").join("%20");

          var whatsappUrl =
            "https://api.whatsapp.com/send?phone=" +
            whatsapp +
            "&text=" +
            encodeURIComponent(message);

          window.open(whatsappUrl);
        }
      });
    },
    sendEmail(id) {
      this.clients.map((item) => {
        if (id === item.id) {
          let email = item.email;
          let subject = "teste";
          let body = "testando";

          var emailUrl =
            "mailto:" + email + "?subject=" + subject + "&body=" + body;

          window.open(emailUrl);
        }
      });
      window.open("mailto:herrmannjob@gmail.com?subject=teste&body=testando");
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
        @click="formClient = true"
        style="margin: 2%;"
        ><font-awesome-icon class="plus-client" :icon="['fas', 'plus']" />
        Novo Cliente
      </vs-button>
    </div>
    <ModalRegisterClient :formClient.sync="formClient"></ModalRegisterClient>
    <ModalEditClient
      :formEditClient.sync="formEditClient"
      :editedClient.sync="editedClient"
    ></ModalEditClient>
    <ModalViewClient
      :formViewClient.sync="formViewClient"
      :selectedClient.sync="selectedClient"
    ></ModalViewClient>
    <v-col>
      <v-tabs color="deep-purple accent-4" left>
        <v-tab>Em obra</v-tab>
        <v-tab>Antigos</v-tab>
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
                    <v-list-item-avatar
                      class="mr-4"
                      @click="rotaCronograma(client.nome)"
                    >
                      <v-img :src="client.foto_perfil"> </v-img>
                    </v-list-item-avatar>
                    <v-list-item-content
                      class="ml-4 mr-4"
                      @click="rotaCronograma(client.nome)"
                    >
                      <v-list-item-title>{{ client.nome }}</v-list-item-title>
                      <v-list-item-subtitle>Nome</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-content @click="rotaCronograma(client.nome)">
                      <v-list-item-title>{{ client.quantidade_obra }}</v-list-item-title>
                      <v-list-item-subtitle>Obras</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-btn
                        primary
                        icon
                        class="ml-4 mr-4"
                        @click="showViewModal(client)"
                      >
                        <v-icon>mdi-account</v-icon>
                      </v-btn>

                      <v-btn
                        primary
                        icon
                        class="mr-4"
                        @click="showEditModal(client)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>

                      <v-btn
                        primary
                        icon
                        class="mr-4"
                        @click="linkWhatsApp(client.id)"
                      >
                        <font-awesome-icon
                          class="whatsapp"
                          :icon="['fab', 'whatsapp']"
                        />
                      </v-btn>

                      <v-btn
                        primary
                        icon
                        class="mr-4"
                        @click="sendEmail(client.id)"
                      >
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
    </v-col>
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
