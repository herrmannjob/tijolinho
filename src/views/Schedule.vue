<script>
import Gantt from "@/components/Gantt.vue";
import Drawer from "@/components/Drawer.vue";
import TopBar from "@/components/TopBar.vue";
import ModalRegisterConstruction from "@/components/ModalRegisterConstruction";
import ModalRegisterTask from "@/components/ModalRegisterTask";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";

export default {
  name: "Schedule",
  components: {
    Drawer,
    TopBar,
    Gantt,
    ModalRegisterConstruction,
    ModalRegisterTask,
  },
  mixins: [FirebaseMixin],
  data() {
    return {
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
      this.form_task = true;
    },
  },
  computed: {
    tarefas: function () {
      if (this.tasks.length) {
        let tasks = []
        this.tasks.map(item => {
          tasks.push(item)
        })
        return tasks
      } else return []
    }
  }
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
            <v-select
              :items="constructions_names"
              label="Obra"
              dense
              v-model="selected"
              :onselect="getConstructionData()"
            ></v-select>
            <v-progress-linear
              v-model="completed"
              height="25"
              v-if="selected.length"
            >
              <strong class="percentage">{{ Math.ceil(completed) }}%</strong>
            </v-progress-linear>
            <v-btn color="primary" @click="form = true">
              <v-icon dark left>
                mdi-plus
              </v-icon>
              Nova Obra
            </v-btn>
            <v-btn color="primary" @click="form_task = true">
              <v-icon dark left>
                mdi-plus
              </v-icon>
              Novo Serviço
            </v-btn>
            <v-btn color="primary" outlined>
              Financeiro
            </v-btn>
            <v-btn color="primary" outlined @click="showGantt()">
              Cronograma
            </v-btn>
          </div>
        </div>
        <div class="col-12 col-sm-7 col-md-9">
          <div class="row cards-report">
            <v-card elevation="2" shaped class="one-card card-passed-time">
              <v-card-text class="text-center">
                <div><span class="text-primary">Tempo decorrido</span></div>
                <p class="text--primary">{{ elapsed_time }} dias</p>
              </v-card-text>
            </v-card>
            <v-card elevation="2" shaped class="one-card card-plan-time">
              <v-card-text class="text-center">
                <div><span class="text-primary">Tempo planejado</span></div>
                <p class="text--primary">{{ planned_time }} dias</p>
              </v-card-text>
            </v-card>
            <v-card elevation="2" shaped class="one-card card-total-plan">
              <v-card-text class="text-center">
                <div><span class="text-primary">Total planejado</span></div>
                <p class="text--primary">R$ {{ planned_money }}</p>
              </v-card-text>
            </v-card>
            <v-card elevation="2" shaped class="one-card card-total-spent">
              <v-card-text class="text-center">
                <div><span class="text-primary">Total gasto</span></div>
                <p class="text--primary">R$ {{ spent_money }}</p>
              </v-card-text>
            </v-card>
          </div>
          <div class="row" style="padding: 10px">
            <template v-if="tasks.length">
              <Gantt :tarefas="tasks" />
            </template>
            <template v-if="tasks.length > 0">
              <v-card
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
              </v-card>
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
  height: 40%;
  padding-left: unset;
}
.group-data > p {
  padding: 0;
}
.primary {
  background-color: #2c3e50;
}
.text-primary {
  color: #2c3e50;
}
.percentage {
  color: #fafafa;
}
.text-center {
  text-align: center;
}
.cards-report {
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 40px;
  max-width: 95%;
}
.one-card {
  width: 7em;
  height: 7em;
}
.card-passed-time {
  background-color: #f8f032 !important;
}
.card-plan-time {
  background-color: #ff0be7 !important;
}
.card-total-plan {
  background-color: #6c63ff !important;
}
.card-total-spent {
  background-color: #3fe306 !important;
}
</style>
