<template>
  <div class="home">
    <Drawer />
    <div class="content">
      <TopBar />
      <div class="components row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 left-col">
          <v-avatar
            class="avatar"
            tile
          >
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-avatar>
          <p class="username">{{ username }}</p>

          <div class="group-data-schedule" data-app>
            <v-select
              :items="constructions_names"
              label="Obra"
              dense
              v-model="construction"
            ></v-select>
            <v-progress-linear
              v-model="completed"
              height="25"
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
        <div class="col-12 col-sm-6 col-md-8 col-lg-9">
          <div class="row cards-report">
            <v-card
              elevation="2"
              shaped
              class="one-card card-passed-time"
            >
              <v-card-text class="text-center">
                <div><span class="text-primary">Tempo decorrido</span></div>
                <p class="display-1 text--primary">
                  87 dias
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
                  87 dias
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
                  87 dias
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
                  87 dias
                </p>
                <div>adjective</div>
              </v-card-text>
            </v-card>
          </div>
          <div class="row">
            <Gantt />
          </div>
        </div>
      </div>
    </div>
    <FormRegisterConstruction :form.sync="form" />
  </div>
</template>

<script>
import Gantt from '@/components/Gantt.vue'
import Drawer from '@/components/Drawer.vue'
import TopBar from '@/components/TopBar.vue'
// import moment from '@/plugins/moment'
import { DataStore } from 'aws-amplify'
import { Usuario, Obra } from '@/models'
import Functions from '@/functions/Functions'
import FormRegisterConstruction from '@/components/FormRegisterConstruction'

export default {
  name: 'Schedule',
  components: {
    Drawer, TopBar, Gantt, FormRegisterConstruction
  },
  data () {
    return {
      today: '',
      user: null,
      user_email: '',
      username: '',
      constructions_names: [],
      construction: '',
      completed: 25,
      form: false
    }
  },
  async created () {
    this.user = await Functions.isAuth()
    this.user_email = this.user.attributes.email
    const user = await DataStore.query(Usuario, data => data.email("eq", this.user_email))
    if (user.length > 0) this.username = user[0].nome
    await this.getUser()
    this.getObras()
  },
  methods: {
    async getUser () {
      const user = await Functions.wichUserId(Usuario, this.user.attributes.email)
      this.user = user.data
    },
    async getObras () {
      const response = await Functions.getById(Obra, this.user.id)
      if (response.status === 'ok') {
        this.constructions_names = []
        response.data.map(obra => { this.constructions_names.push(obra.nome) })
      }
    },
  }
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
