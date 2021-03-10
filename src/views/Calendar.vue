<template>
  <div class="home">
    <Drawer />
    <div class="content">
      <TopBar :email="user_email" />
      <div class="components row">
        <div class="col-12 col-sm-9 calendar">
          <CalendarComponent />
        </div>
        <FormAgendaObra :form.sync="form" :constructions="constructions" :constructions_names="constructions_names" />
        <div class="col right-col">
          <p class="title">
            Compromissos:
            <v-btn
              icon
              color="primary"
              @click="getConstructionsTasks()"
            >
              <v-icon>mdi-refresh-circle</v-icon>
            </v-btn>
          </p>
          <v-btn
            color="primary"
            class="col"
            @click="form = true"
          >
            Nova atividade da Obra
          </v-btn>
          <!-- <div class="row date">
            <p class="col">{{ today }}</p>
            <v-btn
              text
              color="primary"
              class="col"
            >
              Ver todos
            </v-btn>
          </div> -->
          <div style="margin-top: 40px">
            <v-card
              class="card-right"
              color="primary"
              v-for="task in tasks"
              :key="task.id"
            >
              <v-expansion-panels accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header style="padding-left:unset; padding-right:unset">
                    <span>{{ task.titulo }}</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content v-if="tasks[0].titulo !== 'Nenhuma atividade'">
                    <p style="text-align:left">Descrição: {{ task.descricao }}</p>
                    <p style="text-align:left; margin-top: 10px">Início: {{ task.data_inicio }}</p>
                    <p style="text-align:left; margin-top: 10px">Fim: {{ task.data_fim }}</p>
                    <p style="text-align:left; margin-top: 10px">Prioridade: {{ task.prioridade }}</p>
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

import CalendarComponent from '@/components/CalendarComponent.vue'
import Drawer from '@/components/Drawer.vue'
import TopBar from '@/components/TopBar.vue'
import FormAgendaObra from '@/components/FormAgendaObra'
import moment from '@/plugins/moment'
import Firebase from "@/services/Firebase"
import { FirebaseMixin } from "@/mixins/FirebaseMixin"

export default {
  name: 'Calendar',
  mixins: [FirebaseMixin],
  components: {
    CalendarComponent, Drawer, TopBar, FormAgendaObra
  },
  data () {
    return {
      today: '',
      user_email: '',
      username: '',
      constructions: [],
      constructions_names: [],
      tasks: [{ titulo: 'Nenhuma atividade' }],
      form: false,
    }
  },
  async mounted () {
    await Firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.user_email = user.email
        await this.getUser()
        await this.getObras()
      } else this.$router.push("/")
    })
    this.today = moment().format('ll')
  },
  methods: {
    async getUser () {
      const response = await this.getDocument(Firebase.firestore(), 'Usuario', 'email', this.user_email)
      this.username = response.documents[0].data.nome
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
        this.getConstructionsTasks()
      }
    },
    async getConstructionsTasks () {
      this.tasks = []
      this.constructions.map(async c => {
        const response = await this.getDocument(Firebase.firestore(), 'AgendaObra', 'obraID', c.id)
        if (response.status === 'ok') {
          response.documents.map(item => {
            this.tasks.push(item.data)
          })
        }
      })
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
  margin-bottom: 20px;
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
