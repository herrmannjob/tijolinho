<script>
import Drawer from "@/components/Drawer.vue";
import TopBar from "@/components/TopBar.vue";
import ModalEditClient from "@/components/ModalEditClient.vue";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
import "boxicons";

export default {
  name: "ContaUsuario",
  components: {
    Drawer,
    TopBar,
    ModalEditClient,
  },
  mixins: [FirebaseMixin],
  data() {
    return {
      color: "#002b4b",
      user: null,
      username: "",
      user_email: "",
      company: {},
      form: false,
      refresh: false,
      clients: [
        {
          title: "Nenhum cliente cadastrado",
        },
      ],
      singleSelect: true,
      selected: [],
      companies: [],
      empresa: [],
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
    };
  },
  async updated() {
    if (this.refresh) {
      await this.getClients();
      this.refresh = false;
    }
    const response = await this.getDocument(
      Firebase.firestore(),
      "Usuario",
      "email",
      this.email
    );
    this.username = response.documents[0].data.nome;
  },
  async mounted() {
    await Firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user_email = user.email;
        await this.getUser();
        await this.getCompanies();
      } else this.$router.push("/");
    });
  },
  computed: {
    name: function() {
      let initials = "";
      this.username.split(" ").map((name) => {
        initials += name[0];
      });
      return initials.substr(0, 2);
    },
  },
  methods: {
    reload() {
      window.location.reload();
    },
    async getUser() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "Usuario",
        "email",
        this.user_email
      );
      this.username = response.documents[0].data.nome;
      this.TipoUsuario = response.documents[0].data.TipoUsuario;
      this.email = response.documents[0].data.email;
      this.telefone = response.documents[0].data.telefone;
      this.data_nascimento = response.documents[0].data.data_nascimento;
      this.nome_conjuge = response.documents[0].data.nome_conjuge;
      this.data_nascimento_conjuge =
        response.documents[0].data.data_nascimento_conjuge;
    },
    async getCompanies() {
      const response = await this.getDocumentList(
        Firebase.firestore(),
        "Empresa",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        // this.companies = response.documents[0];
        // this.empresa = response.documents[0];
        response.documents.map((item) => {
          this.companies.push(item.nome);
        });
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
    atualizaDados() {
      this.editModal = true;
    },
    closeEditModal() {
      this.editModal = false;
    },
  },
};
</script>
<template>
  <div class="home">
    <Drawer />
    <div class="content">
      <TopBar :email="user_email" />
      <v-col class="container-account">
        <template>
          <div class="center grid">
            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="12"
              >
                <vs-card type="5" style="margin-top: 4em">
                  <template #title>
                    <h3>{{ username }}</h3>
                  </template>
                  <span style="color:#002b4b">{{ name }}</span>
                  <template #text>
                    <p>
                      {{ TipoUsuario }}
                    </p>
                  </template>
                </vs-card>
                <div>
                  <vs-input
                    class="input-conta"
                    primary
                    v-model="username"
                    readonly
                    label-placeholder="Nome"
                    ><template #icon>
                      <box-icon
                        color="#002b4b"
                        name="user"
                      ></box-icon> </template
                  ></vs-input>
                  <v-select
                    class="select-obra"
                    :items="companies"
                    label="Obras"
                    v-model="selected"
                    :onselect="getCompanies()"
                  ></v-select>
                  <vs-input
                    class="input-conta"
                    primary
                    v-model="nome_conjuge"
                    readonly
                    label-placeholder="Conjuge"
                    ><template #icon>
                      <box-icon
                        color="#002b4b"
                        name="user"
                      ></box-icon> </template
                  ></vs-input>
                  <vs-input
                    class="input-conta"
                    primary
                    v-model="email"
                    readonly
                    label-placeholder="E-mail"
                    ><template #icon>
                      <box-icon
                        color="#002b4b"
                        name="mail-send"
                      ></box-icon> </template
                  ></vs-input>
                  <vs-input
                    class="input-conta"
                    primary
                    v-model="data_nascimento"
                    readonly
                    label="Nascimento"
                    ><template #icon>
                      <box-icon
                        color="#002b4b"
                        name="calendar"
                      ></box-icon> </template
                  ></vs-input>
                  <vs-input
                    class="input-conta"
                    primary
                    v-model="data_nascimento_conjuge"
                    readonly
                    label="Nascimento Conjuge"
                    ><template #icon>
                      <box-icon
                        color="#002b4b"
                        name="calendar"
                      ></box-icon> </template
                  ></vs-input>
                  <vs-input
                    class="input-conta"
                    primary
                    v-model="telefone"
                    readonly
                    label-placeholder="Telefone"
                    ><template #icon>
                      <box-icon
                        color="#002b4b"
                        name="phone"
                      ></box-icon> </template
                  ></vs-input>
                  <vs-button
                    class="button-atualizar"
                    color="rgb(0,58,102)"
                    gradient
                    @click="atualizaDados()"
                  >
                    Atualizar Dados
                  </vs-button>
                </div>
              </vs-col>
            </vs-row>
          </div>
        </template>
      </v-col>
      <ModalEditClient
        v-if="editModal"
        @close="closeEditModal"
        :idParams="this.idParams"
        :firstname="this.nome"
      ></ModalEditClient>
    </div>
  </div>
</template>
<style lang="css">
html,
body {
  overflow-y: auto;
}
.home {
  display: flex;
  align-self: stretch;
  height: 100% !important;
  width: 100%;
}
.container-account {
  display: flex;
  justify-content: center !important;
  align-items: center !important;
}
.username {
  font-family: "Comfortaa", cursive;
}
.icone-account {
  color: "#002b4b" !important;
}
.input-conta {
  margin-top: 20%;
  font-family: "Comfortaa", cursive;
  width: 100%;
}
.button-atualizar {
  margin-top: 20% !important;
  font-family: "Comfortaa", cursive;
  width: 100%;
}
</style>
