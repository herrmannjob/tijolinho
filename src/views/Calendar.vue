<script>
import SchedulerComponent from "@/components/SchedulerComponent.vue";
import Drawer from "@/components/Drawer.vue";
import TopBar from "@/components/TopBar.vue";
import ModalAgendaObra from "@/components/ModalAgendaObra";
import moment from "@/plugins/moment";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";

export default {
  name: "Calendar",
  mixins: [FirebaseMixin],
  components: {
    SchedulerComponent,
    Drawer,
    TopBar,
    ModalAgendaObra,
  },
  data() {
    return {
      items: [
        {
          prioridade: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          titulo: "Maria Julia",
          descricao: "Entrega de Cimento",
          data_inicio: "9h",
          data_fim: "11h",
        },
        {
          prioridade: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          titulo: "Gabriel Herrmann",
          descricao: "Entrega de Pisos",
          data_inicio: "9h",
          data_fim: "11h",
        },
      ],
      today: "",
      user_email: "",
      username: "",
      constructions: [],
      constructions_names: [],
      tasks: [{ name: "Nenhuma atividade" }],
      form: false,
    };
  },
  async mounted() {
    await Firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user_email = user.email;
        await this.getUser();
        await this.getObras();
      } else this.$router.push("/");
    });
    this.today = moment().format("ll");
  },
  methods: {
    async getUser() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "Usuario",
        "email",
        this.user_email
      );
      this.username = response.documents[0].data.nome;
    },
    async getClients() {
      await this.getCompanies();
      if (this.companies.length > 0) {
        let client_ids = [];
        this.companies.map((company) => {
          company.usuarioID.map((client) => {
            if (client !== this.user_email) client_ids.push(client);
          });
        });
        if (client_ids.length > 0) {
          this.clients = [];
          this.client_names = [];
          client_ids.map(async (item) => {
            const response = await this.getDocument(
              Firebase.firestore(),
              "Usuario",
              "id",
              item
            );
            this.clients.push(response.documents[0].data);
            this.client_names.push(response.documents[0].data.nome);
          });
        }
      }
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
    async getObras() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "Obra",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.constructions = [];
        this.constructions_names = [];
        response.documents.map((item) => {
          this.constructions.push(item.data);
          this.constructions_names.push(item.data.nome);
        });
        this.getConstructionsTasks();
      }
    },
    async getTasks() {
      this.tasks = [];
      this.constructions.map(async (c) => {
        const response = await this.getDocument(
          Firebase.firestore(),
          "AgendaObra",
          "obraID",
          c.id
        );
        if (response.status === "ok") {
          response.documents.map((item) => {
            this.tasks.push(item.data);
          });
        }
      });
    },
    async getAllTasks() {
      await this.getParticularTasks();
      await this.getConstructionsTasks();
    },

    async getConstructionsTasks() {
      this.constructions_tasks = [];
      this.constructions.map(async (c) => {
        const response = await this.getDocument(
          Firebase.firestore(),
          "AgendaObra",
          "obraID",
          c.id
        );
        if (response.status === "ok") {
          response.documents.map((item) => {
            this.constructions_tasks.push(item.data);
            this.calendarOptions.events.push({
              title: item.data.titulo,
              start: item.data.data_inicio,
              end: item.data.data_fim,
            });
          });
        }
      });
    },
    async getParticularTasks() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "AgendaParticular",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.particular_tasks = [];
        this.calendarOptions.events = [];
        response.documents.map((item) => {
          this.particular_tasks.push(item.data);
          this.calendarOptions.events.push({
            title: item.data.titulo,
            start: item.data.data_inicio.substr(0, 19) + "Z",
            end: item.data.data_fim.substr(0, 19) + "Z",
          });
        });
      }
    },
  },
};
</script>
<template>
  <div class="home">
    <Drawer />
    <div class="content">
      <TopBar :email="user_email" />
      <div class="components row">
        <div class="col-12 col-sm-9 calendar">
          <SchedulerComponent />
        </div>
        <ModalAgendaObra
          :form.sync="form"
          :constructions="constructions"
          :constructions_names="constructions_names"
        />
        <div class="col right-col">
          <p class="title">
            Compromissos
          </p>
          <div class="row date">
            <p class="col">Hoje {{ today }}</p>
          </div>

          <div>
            <v-container>
              <v-row dense>
                <v-col v-for="task in tasks" :key="task">
                  <v-card shaped :color="task.prioridade" dark>
                    <v-col>
                      <v-card-subtitle v-text="task.name"> </v-card-subtitle>
                      <v-card-text style="text-align:center;">
                        Início: {{ task.start }} - Fim: {{ task.end }}
                      </v-card-text>
                    </v-col>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <!-- <v-card
              class="card-right"
              color="primary"
              v-for="task in tasks"
              :key="task.id"
            >
              <v-expansion-panels accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    style="padding-left:unset; padding-right:unset"
                  >
                    <span>{{ task.name }}</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content
                    v-if="tasks[0].name !== 'Nenhuma atividade'"
                  >
                    <p style="text-align:left">
                      Descrição: {{ task.descricao }}
                    </p>
                    <p style="text-align:left; margin-top: 10px">
                      Início: {{ task.start }}
                    </p>
                    <p style="text-align:left; margin-top: 10px">
                      Fim: {{ task.end }}
                    </p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card> -->
          </div>
        </div>
      </div>
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
.content {
  width: 100%;
}
.calendar {
  border-right: lightgray 0.1px solid;
}
.components {
  height: calc(100vh - 60px) !important;
  width: calc(100vw - 80px);
  padding: unset;
  padding-left: 20px;
  padding-top: 20px;
  flex-wrap: unset;
}
.right-col {
  overflow-y: -moz-hidden-unscrollable;
}
.right-col > .title {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.title {
  font-weight: bold;
}

.card-right {
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: unset !important;
}
.group-data {
  align-items: center;
  padding-left: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.group-data > p {
  padding: 0;
}
.avatar {
  display: block;
  width: 65px !important;
  height: 65px !important;
}
.date {
  align-items: center;
  margin-top: 20px;
}

@media only screen and (min-width: 769px) and (max-width: 1024px) {
  /* For mobile phones: */

  .col-sm-9 {
    flex: 0 !important;
    max-width: 100% !important;
  }

  .calendar {
    flex: 100% !important;
    max-width: 100% !important;
  }
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .right-col {
    flex-direction: row;
    display: block !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .col-sm-9 .col-12 .calendar {
    /* position: absolute; */
    flex: 100% !important;
    max-width: 100% !important;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 !important;
    padding: 0 !important;
  }

  .col-12 {
    flex: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .calendar {
    margin: 0 !important;
    padding: 0 !important;
    flex: 100% !important;
    max-width: 100% !important;
  }
  .row {
    margin: 0 !important;
  }
  .components {
    padding: 0 !important;
  }
}
</style>
