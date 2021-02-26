<template>
  <div class="home">
    <Drawer />
    <div class="content">
      <TopBar />
      <div class="components row">
        <div class="col-12 col-sm-9 calendar">
          <CalendarComponent />
        </div>
        <div class="col right-col">
          <p class="title">Compromissos:</p>
          <div class="row date">
            <p class="col">{{ today }}</p>
            <v-btn
              text
              color="primary"
              class="col"
            >
              Ver todos
            </v-btn>
          </div>
          <div>
            <v-card
              class="card-right"
              color="primary"
              v-for="task in tasks"
              :key="task.id"
            >
              <v-expansion-panels accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header style="padding-left:unset; padding-right:unset">
                    <span>{{ task.title }}</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content v-if="tasks[0].title !== 'Nenhuma atividade'">
                    <p style="text-align:left">Descrição: {{ task.description }}</p>
                    <p style="text-align:left">Início: {{ task.start }}</p>
                    <p style="text-align:left">Fim: {{ task.end }}</p>
                    <p style="text-align:left">Duração: {{ task.time }}</p>
                    <p style="text-align:left">Prioridade: {{ task.priority }}</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */


// import { api, urls } from '../services/Api'
import CalendarComponent from '@/components/CalendarComponent.vue'
import Drawer from '@/components/Drawer.vue'
import TopBar from '@/components/TopBar.vue'
import moment from '@/plugins/moment'
import { AgendaObra, Obra, Usuario } from '@/models'
import Functions from '@/functions/Functions'

export default {
  name: 'Calendar',
  components: {
    CalendarComponent, Drawer, TopBar
  },
  data () {
    return {
      today: '',
      user: null,
      username: 'teste',
      constructions: [],
      tasks: [{ title: 'Nenhuma atividade' }]
    }
  },
  async created () {
    this.user = await Functions.isAuth()
    await this.getUser()
    this.today = moment().format('ll')
    await this.getConstructionsTasks()
  },
  methods: {
    async getUser () {
      const user = await Functions.wichUserId(Usuario, this.user.attributes.email)
      this.user = user.data
    },
    async getObras () {
      const response = await Functions.getByUserId(Obra, this.user.id)
      if (response.status === 'ok') this.constructions = response.data
    },
    async getConstructionsTasks () {
      await this.getObras()
      if (this.constructions.length > 0) {
        const response = await Functions.getAll(AgendaObra)
        if (response.status === 'ok') {
          this.constructions.map(construction => {
            response.data.map(item => {
              if (item.Obra.id === construction.id) {
                this.tasks.push({ title: item.titulo, description: item.descricao, priority: item.prioridade, start: item.data_inicio.substr(0, 10), end: item.data_fim.substr(0, 10) })
              }
            })
          })
        }
      }
    },
  }
}
</script>
<style lang="css">
html, body {
  overflow-y:auto;
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
  text-align: left;
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
  margin-bottom: 20px;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .right-col{
    display: none;
  }
  .calendar {
    border-right: none;
  }
}
</style>
