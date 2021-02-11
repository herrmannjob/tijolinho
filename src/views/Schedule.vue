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

          <div class="group-data" data-app>
            <v-select
              :items="tasks"
              label="Obra"
              dense
              v-model="build"
            ></v-select>
            <v-progress-linear
              v-model="completed"
              height="25"
            >
              <strong class="percentage">{{ Math.ceil(completed) }}%</strong>
            </v-progress-linear>
            <v-btn
              color="primary"
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
              class="one-card"
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
              class="one-card"
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
              class="one-card"
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
              class="one-card"
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
  </div>
</template>

<script>
// import { api, urls } from '../services/Api''
import Gantt from '@/components/Gantt.vue'
import Drawer from '@/components/Drawer.vue'
import TopBar from '@/components/TopBar.vue'
// import moment from '@/plugins/moment'

export default {
  name: 'Schedule',
  components: {
    Drawer, TopBar, Gantt
  },
  data () {
    return {
      today: '',
      username: 'Usuário Teste',
      tasks: ['Reforma de studio', 'Construção do escritório'],
      build: '',
      completed: 25
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="css">
html, body {
  overflow-y: hidden;
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
.group-data {
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
  margin-bottom: 20px;
  max-width: 95%;
}
.one-card {
  width: 7em;
  height: 7em;
}
</style>
