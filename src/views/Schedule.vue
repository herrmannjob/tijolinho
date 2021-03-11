<template>
  <div class="home">
    <Drawer />
    <div class="content">
      <TopBar :email="user_email" />
      <div class="components row">
        <div class="col-12 col-sm-5 col-md-3 left-col">
          <!-- <v-avatar
            class="avatar"
            tile
          >
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-avatar>
          <p class="username">{{ username }}</p> -->

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
            <v-btn
              color="primary"
              @click="form = true"
            >
              <v-icon
                dark
                left
              >
                mdi-plus
              </v-icon>
              Nova obra
            </v-btn>
            <v-btn
              color="primary"
              outlined
            >
              Financeiro
            </v-btn>
            <v-btn
              color="primary"
              outlined
            >
              Cronograma
            </v-btn>
          </div>
        </div>
        <div class="col-12 col-sm-7 col-md-9">
          <div class="row cards-report">
            <v-card
              elevation="2"
              shaped
              class="one-card card-passed-time"
            >
              <v-card-text class="text-center">
                <div><span class="text-primary">Tempo decorrido</span></div>
                <p class="display-1 text--primary">
                  {{ elapsed_time }} dias
                </p>
                <div>adjective</div>
              </v-card-text>
            </v-card>
            <v-card
              elevation="2"
              shaped
              class="one-card card-plan-time"
            >
              <v-card-text class="text-center">
                <div><span class="text-primary">Tempo planejado</span></div>
                <p class="display-1 text--primary">
                  {{ planned_time }} dias
                </p>
                <div>adjective</div>
              </v-card-text>
            </v-card>
            <v-card
              elevation="2"
              shaped
              class="one-card card-total-plan"
            >
              <v-card-text class="text-center">
                <div><span class="text-primary">Total planejado</span></div>
                <p class="display-1 text--primary">
                  R$ {{ planned_money }}
                </p>
                <div>adjective</div>
              </v-card-text>
            </v-card>
            <v-card
              elevation="2"
              shaped
              class="one-card card-total-spent"
            >
              <v-card-text class="text-center">
                <div><span class="text-primary">Total gasto</span></div>
                <p class="display-1 text--primary">
                  R$ {{ spent_money }}
                </p>
                <div>adjective</div>
              </v-card-text>
            </v-card>
          </div>
          <div class="row" style="padding: 10px">
            <v-btn
              color="primary"
              style="margin-bottom: 10px"
              @click="showGantt()"
            >
              Adicionar tarefa
            </v-btn>
            <v-btn
              icon
              color="primary"
              @click="reload()"
            >
              <v-icon>mdi-refresh-circle</v-icon>
            </v-btn>
            <template v-if="tasks.length">
              <Gantt :tarefas="tasks" />
            </template>
          </div>
        </div>
      </div>
    </div>
    <FormRegisterConstruction :form.sync="form" :refresh.sync="refresh" :user_id="user_email" :company="company.id" client="" />
    <FormRegisterTask :form.sync="form_task" :tasks="tasks" :task_names="task_names" :user="user_email" :cronograma_obra="cronograma_obra.id" />
  </div>
</template>

<script>
import Gantt from '@/components/Gantt.vue'
import Drawer from '@/components/Drawer.vue'
import TopBar from '@/components/TopBar.vue'
import FormRegisterConstruction from '@/components/FormRegisterConstruction'
import FormRegisterTask from '@/components/FormRegisterTask'
import Firebase from "@/services/Firebase"
import { FirebaseMixin } from "@/mixins/FirebaseMixin"

export default {
  name: 'Schedule',
  components: {
    Drawer, TopBar, Gantt, FormRegisterConstruction, FormRegisterTask
  },
  mixins: [FirebaseMixin],
  data () {
    return {
      today: new Date(),
      user: null,
      user_email: '',
      username: '',
      constructions: [],
      constructions_names: [],
      construction: {},
      cronograma_obra: {},
      tasks: [],
      task_names: [],
      selected: '',
      company: {},
      completed: 0,
      form: false,
      form_task: false,
      refresh: false,
      elapsed_time: '',
      planned_time: '',
      planned_money: '',
      spent_money: '',
      count: true
    }
  },
  async updated () {
    if (this.refresh) {
      await this.getObras()
      await this.getConstructionData()
      this.refresh = false
    }
  },
  async mounted () {
    await Firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.user_email = user.email
        await this.getUser()
        await this.getCompany()
        this.getObras()
      } else this.$router.push("/")
    })
  },
  methods: {
    reload () {
      window.location.reload()
    },
    async getUser () {
      const response = await this.getDocument(Firebase.firestore(), 'Usuario', 'email', this.user_email)
      this.username = response.documents[0].data.nome
    },
    async getCompany () {
      const response = await this.getDocumentList(Firebase.firestore(), 'Empresa', 'usuarioID', this.user_email)
      if (response.status === 'ok') {
        this.company = response.documents[0]
      }
    },
    async getObras () {
      const response = await this.getDocument(Firebase.firestore(), 'Obra', 'usuarioID', this.user_email)
      if (response.status === 'ok') {
        this.constructions = []
        this.constructions_names = []
        response.documents.map(item => {
          this.constructions.push(item.data)
          this.constructions_names.push(item.data.nome)
        })
      }
    },
    async getConstructionData () {
      if (this.selected.length && this.count) {
        const i = this.constructions_names.indexOf(this.selected)
        this.construction = this.constructions[i]
        const cronogramas = await this.getDocument(Firebase.firestore(), 'CronogramaObra', 'obraID', this.construction.id)
        const start = new Date(this.cronograma_obra.data_inicio + 'T00:00:00')
        const end = new Date(this.cronograma_obra.data_fim + 'T00:00:00')
        this.cronograma_obra = cronogramas.documents[0].data
        this.elapsed_time = ((this.today - start) / 86400000) | 0
        this.planned_time = (end - start) / 86400000 // miliseconds => day
        this.planned_money = this.cronograma_obra.gasto_previsto
        this.completed = (this.elapsed_time / this.planned_time) * 100
        await this.getTasks()
        this.count = false
      }
    },
    async getTasks () {
      const tasks = await this.getDocument(Firebase.firestore(), 'Tarefa', 'cronograma_obra', this.cronograma_obra.id)
      if (tasks.status === 'ok') {
        this.tasks = []
        tasks.documents.map(item => {
          this.tasks.push(item.data)
          this.task_names.push(item.data.name)
        })
      }
    },
    async showGantt () {
      await this.getTasks()
      this.form_task = true
    }
  },
  // computed: {
  //   tarefas: function () {
  //     if (this.tasks.length) {
  //       let tasks = []
  //       this.tasks.map(item => {
  //         tasks.push(item)
  //       })
  //       return tasks
  //     } else return []
  //   }
  // }
}
</script>
<style lang="css">
html, body {
  overflow-y: auto;
}
.home {
  display: flex;
  align-self: stretch;
  height: 100%!important;
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
.card-right {
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 60px;
}
.group-data-schedule{
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 50%;
  padding-left: unset;
}
.group-data > p {
  padding: 0;
}
.avatar {
  display: block;
  width: 65px !important;
  height: 65px !important;
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
  background-color: #F8F032 !important;
}
.card-plan-time {
  background-color: #FF0BE7 !important;
}
.card-total-plan {
  background-color: #6C63FF !important;
}
.card-total-spent {
  background-color: #3FE306 !important;
}
</style>
