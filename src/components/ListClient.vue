<template>
  <div class="components row list-clients">
    <v-btn
      type="button"
      color="primary"
      class="btn-primario"
      @click="showModal()"
      style="margin: 2%;"
    >
      <v-icon style="margin-right: 5%;">mdi-plus</v-icon>
      Novo Cliente
    </v-btn>
    <ModalRegisterClient
      v-show="isModalVisible"
      @close="closeModal"
    ></ModalRegisterClient>
    <v-col>
      <v-tabs color="deep-purple accent-4" left>
        <v-tab>Ativos</v-tab>
        <v-tab>Inativos</v-tab>
        <v-tab>Histórico</v-tab>

        <v-tab-item v-for="n in 3" :key="n">
          <v-container fluid>
            <v-row v-for="i in 6" :key="i">
              <v-card max-width="100%" class="fill-width" style="margin-bottom: 1.5%;">
                <v-list two-line>
                  <v-list-item>
                    <v-list-item-avatar class="mr-4">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/lists/ali.png"
                      >
                      </v-img>
                    </v-list-item-avatar>
                    <v-list-item-content class="ml-4 mr-4">
                      <v-list-item-title>Gabriel</v-list-item-title>
                      <v-list-item-subtitle>Nome</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-title>3</v-list-item-title>
                      <v-list-item-subtitle>Obras</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-btn primary icon class="ml-4 mr-4">
                        <v-icon>mdi-account</v-icon>
                      </v-btn>

                      <v-btn primary icon class="mr-4">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>

                      <v-btn primary icon class="mr-4">
                        <v-icon>mdi-phone-plus</v-icon>
                      </v-btn>

                      <v-btn primary icon class="mr-4">
                        <v-icon>mdi-email</v-icon>
                      </v-btn>

                      <v-btn primary icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-col>

    <!-- <v-data-iterator> </v-data-iterator> -->
  </div>
</template>

<script>
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
import ModalRegisterClient from "@/components/ModalRegisterClient";
export default {
  mixins: [FirebaseMixin],
  data() {
    return {
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
      isModalVisible: false,
    };
  },
  components: { ModalRegisterClient },
  async mounted() {
    await Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_email = user.email;
        this.getClients();
      } else this.$router.push("/");
    });
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    filter(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleLowerCase()
          .indexOf(search.toLocaleLowerCase()) !== -1
      );
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
          });
        }
      }
    },
  },

  computed: {
    headers() {
      return [
        {
          text: "Nome",
          align: "start",
          value: "nome",
        },
        {
          text: "Telefone",
          value: "telefone",
        },
        {
          text: "Email",
          value: "email",
        },
      ];
    },
  },
};
</script>
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

@media only screen and (max-width: 768px) {
  .btn-primario .btn-cliente {
    margin: 5%;
  }

  /* .btn-primario {
    max-width: 120px;
  } */
}
</style>
