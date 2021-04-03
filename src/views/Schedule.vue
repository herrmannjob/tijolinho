<script>
import Gantt from "@/components/Gantt.vue";
import FinancialComponent from "@/components/FinancialComponent.vue";
import Drawer from "@/components/Drawer.vue";
import TopBar from "@/components/TopBar.vue";
import ModalRegisterConstruction from "@/components/ModalRegisterConstruction";
import ModalRegisterTask from "@/components/ModalRegisterTask";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
import "boxicons";
import NewGantt from "@/components/NewGantt";

export default {
  name: "Schedule",
  components: {
    Drawer,
    TopBar,
    Gantt,
    FinancialComponent,
    ModalRegisterConstruction,
    ModalRegisterTask,
    NewGantt,
  },
  mixins: [FirebaseMixin],
  data() {
    return {
      active: 0,
      showFinancialComponent: false,
      showGanttTask: false,
      outlinedColor: "#002b4b",
      gradientColor: "#00467a",
      today: new Date(),
      user: null,
      user_email: "",
      username: "",
      constructions: [],
      constructions_names: [],
      construction: {},
      cronograma_obra: {},
      tasks: [],
      task_names: [],
      selected: "",
      company: {},
      completed: 0,
      form: false,
      form_task: false,
      refresh: false,
      elapsed_time: "",
      planned_time: "",
      planned_money: "",
      spent_money: "",
      count: true,
      mode: "week",
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
        this.user_email = user.email;
        await this.getUser();
        await this.getCompany();
        this.getObras();
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
        await this.getTasks();
        this.count = false;
      }
    },
    async getTasks() {
      const tasks = await this.getDocument(
        Firebase.firestore(),
        "Tarefa",
        "cronograma_obra",
        this.cronograma_obra.id
      );
      if (tasks.status === "ok") {
        this.tasks = [];
        tasks.documents.map((item) => {
          this.tasks.push(item.data);
          this.task_names.push(item.data.name);
        });
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
          <v-avatar size="112">
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-avatar>
          <p class="username">{{ username }}</p>

          <div class="group-data-schedule" data-app>
            <template lang="html">
              <div class="centerx row adicionar-obra">
                <vs-button
                  @click="form = true"
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
              @click="showFinancial()"
            >
              Financeiro
            </vs-button>
            <vs-button
              v-if="selected.length"
              class="btn-primary-lg"
              color="#002b4b"
              border
              @click="showGantt()"
            >
              Cronograma
            </vs-button>
            <div class="row cards-report">
              <v-card elevation="2" shaped class="one-card card-color">
                <v-card-text class="text-center">
                  <div><span class="text-card">Tempo decorrido</span></div>
                  <p class="text-content">{{ elapsed_time }} dias</p>
                </v-card-text>
              </v-card>
              <v-card elevation="2" shaped class="one-card card-color">
                <v-card-text class="text-center">
                  <div><span class="text-card">Tempo planejado</span></div>
                  <p class="text-content">{{ planned_time }} dias</p>
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
              <FinancialComponent />
            </template>
            <!-- <vs-button
              v-if="showGanttTask == true"
              class="btn-primary-lg"
              color="#002b4b"
              gradient
              @click="form_task = true"
            >
              Novo Serviço
            </vs-button> -->
            <template v-if="showGanttTask == true && tasks.length">
              <Gantt :tarefas="tasks" :view-mode="mode" />
            </template>
            <vs-button
              v-if="showGanttTask == true"
              color="#002b4b"
              gradient
              @click="form_task = true"
              >Adiciona</vs-button
            >
            <!-- <vs-button
              v-if="showGanttTask == true"
              color="#002b4b"
              gradient
              @click="demoViewMode('day')"
              >Dia</vs-button
            >
            <vs-button
              v-if="showGanttTask == true"
              color="#002b4b"
              gradient
              @click="demoViewMode('week')"
              >Semana</vs-button
            >
            <vs-button
              v-if="showGanttTask == true"
              color="#002b4b"
              gradient
              @click="demoViewMode('month')"
              >Mês</vs-button
            > -->
            <template v-if="showGanttTask == true">
              <NewGantt :tarefas="tasks" />
            </template>
            <template v-if="tasks.length > 0">
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
                      <span>{{ task.titulo }}</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content
                      v-if="tasks[0].titulo !== 'Nenhuma atividade'"
                    >
                      <p style="text-align:left">
                        Descrição: {{ task.descricao }}
                      </p>
                      <p style="text-align:left; margin-top: 10px">
                        Início: {{ task.data_inicio }}
                      </p>
                      <p style="text-align:left; margin-top: 10px">
                        Fim: {{ task.data_fim }}
                      </p>
                      <p style="text-align:left; margin-top: 10px">
                        Prioridade: {{ task.prioridade }}
                      </p>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card> -->
            </template>
          </div>
        </div>
      </div>
    </div>
    <ModalRegisterConstruction
      :form.sync="form"
      :refresh.sync="refresh"
      :user_id="user_email"
      :company="company.id"
      client=""
    />
    <ModalRegisterTask
      :form.sync="form_task"
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
.primary {
  background-color: #2c3e50;
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
</style>
