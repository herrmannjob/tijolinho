<script>
import Gantt from "@/components/Gantt.vue";
import FinancialComponent from "@/components/FinancialComponent.vue";
import Drawer from "@/components/Drawer.vue";
import TopBar from "@/components/TopBar.vue";
import ModalRegisterConstruction from "@/components/ModalRegisterConstruction";
import ModalSelectTemplate from "@/components/ModalSelectTemplate";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
import "boxicons";
const db = Firebase.firestore();
export default {
  name: "Schedule",
  components: {
    Drawer,
    TopBar,
    Gantt,
    FinancialComponent,
    ModalRegisterConstruction,
    ModalSelectTemplate,
  },
  mixins: [FirebaseMixin],
  data() {
    return {
      showFinancialComponent: false,
      showGanttTask: false,
      today: new Date(),
      user: null,
      user_email: "",
      username: "",
      clients: [],
      companies: [],
      constructions: [],
      constructions_names: [],
      constructions_id: [],
      construction: {},
      construction_id: null,
      cronograma_obra: {},
      tasks: [],
      task_names: [],
      selected: "",
      company: {},
      completed: 0,
      formConstruction: false,
      formSelectTemplate: false,
      refresh: false,
      elapsed_time: "",
      planned_time: "",
      planned_money: "",
      spent_money: null,
      total_value: [],
      count: true,
      mode: "week",
      urlImage: "",
      idRota: "",
      loading: false,
      post: null,
      error: null,
      clientInfo: [],
      clientId: "",
    };
  },
  async updated() {
    if (this.refresh) {
      await this.getObras();
      await this.getConstructionData();
      this.refresh = false;
    }
  },
  async mounted() {
    await Firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.idRota = this.$router.path;
        this.user_email = user.email;
        await this.getUser();
        await this.getCompanies();
        await this.getClients();
        await this.getCompany();
        await this.getObras();
      } else this.$router.push("/");
    });
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
    async getCompany() {
      const response = await this.getDocumentList(
        Firebase.firestore(),
        "Empresa",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.company = response.documents[0];
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
            this.idRota = this.$route.params.id;
            this.clients.map((cliente) => {
              if (this.idRota === cliente.nome) {
                this.urlImage = cliente.foto_perfil;
                this.clientInfo = cliente;
                this.clientId = cliente.id;
              }
            });
          });
        }
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
        response.documents.map((item) => {
          if (item.data.usuarios === this.clientId) {
            this.constructions.push(item.data);
            this.constructions_names.push(item.data.nome);
            this.construction_id = item.data.id;
            this.constructions_id.push(item.data.id);
          }
        });
      }
    },
    async getObraSelecionada() {
      if (this.selected.length && this.count) {
        const i = this.constructions_names.indexOf(this.selected);
        this.construction = this.constructions[i];
      }
    },
    async getConstructionData() {
      if (this.selected.length && this.count) {
        const i = this.constructions_names.indexOf(this.selected);
        this.construction = this.constructions[i];
        const cronogramas = await this.getDocument(
          Firebase.firestore(),
          "CronogramaObra",
          "obraID",
          this.construction.id
        );
        const start = new Date(this.cronograma_obra.data_inicio + "T00:00:00");
        const end = new Date(this.cronograma_obra.data_fim + "T00:00:00");
        this.cronograma_obra = cronogramas.documents[0].data;
        this.elapsed_time = ((this.today - start) / 86400000) | 0;
        this.planned_time = (end - start) / 86400000; // miliseconds => day
        this.planned_money = this.cronograma_obra.gasto_previsto;
        this.completed = (this.elapsed_time / this.planned_time) * 100;
        this.spent_money = this.cronograma_obra.gasto_total;
        await this.getTasks();
        this.count = false;
      }
    },
    async getTarefasOrderby() {
      var collectionTarefa = db
        .collection("Tarefa")
        .where("cronograma_obra", "==", "" + this.cronograma_obra.id);
      try {
        var listTarefas = await collectionTarefa.get();
        var tarefas = [];
        listTarefas.forEach((doc) => {
          tarefas.push(doc.data());
        });
        tarefas = tarefas.slice(0);
        tarefas.sort(function(a, b) {
          return new Date("" + a.start) - new Date("" + b.start);
        });
        return tarefas;
      } catch (err) {
        console.log("Error getting documents", err);
        return;
      }
    },
    async getTasks() {
      const taskName = await this.getDocument(
        Firebase.firestore(),
        "Tarefa",
        "cronograma_obra",
        this.cronograma_obra.id
      );
      if (taskName != undefined) {
        taskName.documents.map((item) => {
          this.task_names.push(item.data.name);
        });
      }
      const tasks = await this.getTarefasOrderby();
      if (tasks != undefined) {
        this.tasks = tasks;
      }
    },
    async showGantt() {
      await this.getTasks();
      this.showGanttTask = true;
      this.showFinancialComponent = false;
    },
    showFinancial() {
      this.showFinancialComponent = true;
      this.showGanttTask = false;
    },
    demoViewMode(viewMode) {
      this.mode = viewMode;
    },
  },
  computed: {
    tarefas: function() {
      if (this.tasks.length) {
        let tasks = [];
        this.tasks.map((item) => {
          tasks.push(item);
        });
        return tasks;
      } else return [];
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
        <div class="col-12 col-sm-5 col-md-3 left-col">
          <v-avatar class="profile-avatar">
            <v-img :src="this.urlImage"></v-img>
          </v-avatar>
          <p class="username">{{ $route.params.id }}</p>

          <div class="group-data-schedule" data-app>
            <template lang="html">
              <div class="centerx row adicionar-obra">
                <vs-button
                  @click="formConstruction = true"
                  color="#002b4b"
                  border
                  icon
                  class="btn-primary-sm"
                  ><box-icon name="plus"></box-icon
                ></vs-button>

                <v-select
                  class="select-obra"
                  :items="constructions_names"
                  label="Obra"
                  v-model="selected"
                  :onselect="getConstructionData()"
                ></v-select>
              </div>
            </template>

            <v-progress-linear
              v-model="completed"
              height="25"
              v-if="showGanttTask == true"
              class="progress-schedule"
            >
              <strong class="percentage">{{ Math.ceil(completed) }}%</strong>
            </v-progress-linear>
            <vs-button
              v-if="selected.length"
              class="btn-primary-lg"
              color="#002b4b"
              border
              @click="showGantt()"
            >
              Cronograma
            </vs-button>
            <vs-button
              v-if="selected.length"
              class="btn-primary-lg"
              color="#002b4b"
              border
              @click="showFinancial()"
            >
              Financeiro
            </vs-button>
            <div class="row cards-report">
              <v-card elevation="2" shaped class="one-card card-color">
                <v-card-text class="text-center">
                  <div><span class="text-card">Tempo planejado</span></div>
                  <p class="text-content">{{ planned_time }} dias</p>
                </v-card-text>
              </v-card>
              <v-card elevation="2" shaped class="one-card card-color">
                <v-card-text class="text-center">
                  <div><span class="text-card">Tempo decorrido</span></div>
                  <p class="text-content">{{ elapsed_time }} dias</p>
                </v-card-text>
              </v-card>
            </div>
            <div class="row cards-report">
              <v-card elevation="2" shaped class="one-card card-color">
                <v-card-text class="text-center">
                  <div><span class="text-card">Total planejado</span></div>
                  <p class="text-content">R$ {{ planned_money }}</p>
                </v-card-text>
              </v-card>
              <v-card elevation="2" shaped class="one-card card-color">
                <v-card-text class="text-center">
                  <div><span class="text-card">Total gasto</span></div>
                  <p class="text-content">R$ {{ spent_money }}</p>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-7 col-md-9">
          <div style="padding: 10px">
            <template v-if="showFinancialComponent == true">
              <FinancialComponent
                :user="user_email"
                :obraID="this.construction.id"
              />
            </template>
            <div class="group-data-gantt">
              <vs-button
                v-if="showGanttTask == true"
                class="btn-primary-md"
                color="#002b4b"
                gradient
                @click="formSelectTemplate = true"
              >
                Novo Serviço
              </vs-button>
              <vs-button
                v-if="showGanttTask == true"
                color="#002b4b"
                border
                @click="demoViewMode('day')"
                >Dia</vs-button
              >
              <vs-button
                v-if="showGanttTask == true"
                color="#002b4b"
                border
                @click="demoViewMode('week')"
                >Semana</vs-button
              >
              <vs-button
                v-if="showGanttTask == true"
                color="#002b4b"
                border
                @click="demoViewMode('month')"
                >Mês</vs-button
              >
            </div>
            <template v-if="showGanttTask == true && tasks.length">
              <Gantt
                :tarefas="tasks"
                :view-mode="mode"
                :nome_tarefas="task_names"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
    <ModalRegisterConstruction
      :formConstruction.sync="formConstruction"
      :refresh.sync="refresh"
      :user="user_email"
      :clientId="clientId"
      :company="company.id"
    />
    <ModalSelectTemplate
      :formSelectTemplate.sync="formSelectTemplate"
      :tasks="tasks"
      :task_names="task_names"
      :user="user_email"
      :cronograma_obra="cronograma_obra.id"
    />
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
.group-data-gantt {
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: center;
  margin-bottom: 1%;
}
.profile-avatar {
  height: 112px !important;
  min-width: 112px !important;
  width: 112px !important;
}
.content {
  width: 100%;
}
.components {
  height: 100%;
}
.left-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: lightgray 0.1px solid;
}
.left-col > .username {
  margin-top: 20px;
}
.username {
  font-family: "Comfortaa", cursive;
}
.card-right {
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 60px;
}
.group-data-schedule {
  display: grid;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: center;
  height: 60%;
  padding-left: unset;
  margin-right: 1%;
}
.group-data > p {
  padding: 0;
}
.text-card {
  color: #fafafa !important;
}
.text-center {
  text-align: center;
  color: #fafafa !important;
}
.text-content {
  color: white;
}
.percentage {
  color: #fafafa;
}
.cards-report {
  justify-content: space-around;
  margin-top: 20px;
}
.one-card {
  width: 8em;
  height: 6em;
}
.card-color {
  background-color: #002b4b !important;
}
.btn-primary-sm {
  font-family: "Comfortaa", cursive;
  height: 40%;
  max-height: 40px;
  margin-left: 1.45em !important;
  padding-bottom: 1%;
}
.btn-primary-lg {
  height: 50px !important;
  max-height: 55%;
}
.btn-primary-md {
  margin-right: 15% !important;
}
.vs-button {
  font-family: "Comfortaa", cursive !important;
  text-transform: uppercase !important;
}
.select-obra {
  width: 62% !important;
  margin-left: 2%;
}
.adicionar-obra {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.progress-schedule {
  border-radius: 10px;
  max-width: 250px;
  margin-left: 1.1%;
}

@media only screen and (max-height: 850px) {
  /* For mobile phones: */

  .group-data-schedule {
    display: grid;
    flex-direction: column;
    align-items: space-evenly;
    justify-content: center;
    height: 70%;
    padding-left: unset;
    margin-right: 1%;
  }

  .btn-primary-sm {
    padding-bottom: 0 !important;
  }

  .cards-report {
    margin-top: 0;
  }

  .profile-avatar {
    height: 80px !important;
    min-width: 80px !important;
    width: 80px !important;
  }
}

@media only screen and (max-height: 700px) {
  /* For mobile phones: */

  .group-data-schedule {
    display: grid;
    flex-direction: column;
    align-items: space-evenly;
    justify-content: center;
    height: 90%;
    padding-left: unset;
    margin-right: 1%;
  }

  .btn-primary-sm {
    padding-bottom: 0 !important;
  }

  .cards-report {
    margin-top: 0;
  }

  .profile-avatar {
    height: 70px !important;
    min-width: 70px !important;
    width: 70px !important;
  }
}
</style>
