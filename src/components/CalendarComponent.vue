<template>
  <div class="object_calendar">
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="4"
      >
        <v-select
          :items="select_view"
          label="Calendário"
          dense
          v-model="calendar_view"
          :onselect="changeView()"
        ></v-select>
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="4"
      >
        <v-select
          :items="client_names"
          label="Cliente"
          dense
        ></v-select>
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="4"
      >
        <v-select
          :items="constructions_names"
          label="Obra"
          dense
        ></v-select>
      </v-col>
    </v-row>
    
    <FormCalendar :form.sync="form" :refresh.sync="refresh" :date="date_clicked" :user="user_email" />

    <CalendarWeek :options="calendarOptions" v-if="view_week" ref="calendar" />

    <CalendarDay :options="calendarOptions" v-if="view_day" ref="calendar" />

    <CalendarMonth :options="calendarOptions" v-if="view_month" ref="calendar" />

    <FullCalendar :options="calendarOptions" v-show="false" />
  </div>
</template>

<script>

import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Swal from '@/plugins/sweetalert'
import FormCalendar from '@/components/FormCalendar'
import CalendarWeek from '@/components/CalendarWeek'
import CalendarDay from '@/components/CalendarDay'
import CalendarMonth from '@/components/CalendarMonth'
import Firebase from "@/services/Firebase"
import { FirebaseMixin } from "@/mixins/FirebaseMixin"

export default {
  name: 'CalendarComponent',
  components: {
    FormCalendar, CalendarWeek, CalendarDay, CalendarMonth, FullCalendar
  },
  mixins: [FirebaseMixin],
  data () {
    return {
      user: null,
      uid: '',
      select_view: ['Dia', 'Semana', 'Mês'],
      calendar_view: '',
      clients: [],
      client_names: ['Nenhum cliente cadastrado'],
      constructions_names: ['Nenhuma obra cadastrada'],
      constructions: [],
      companies: [],
      view_week: true,
      view_day: false,
      view_month: false,
      calendarOptions: {
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
        initialView: 'timeGridWeek',
        locale: 'pt-br',
        editable: true,
        // displayEventTime: this.displayEventTime,
        allDayText: 'Dia inteiro',
        buttonText: {
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Hoje',
            list: 'Lista'
        },
        timeZone: 'UTC',
        selectable: true,
        dateClick: this.dateClick,
        // select: this.selectDate,
        events: [
        ]
      },
      form: false,
      date_clicked: '',
      task_titulo: null,
      task_cliente: null,
      task_obra: null,
      task_prioridade: null,
      task_categoria: null,
      task_observacao: null,
      particular_tasks: [],
      constructions_tasks: [],
      refresh: false,
      user_email: ''
    }
  },
  async mounted () {
    await Firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.user_email = user.email
        await this.getUser()
        await this.getObras()
        await this.getClients()
        await this.getTasks()
      }
    })
  },
  async updated () {
    if (this.refresh) {
      await this.getTasks()
      this.refresh = false
    }
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
      }
    },
    async getCompanies () {
      const response = await this.getDocumentList(Firebase.firestore(), 'Empresa', 'usuarioID', this.user_email)
      if (response.status === 'ok') {
        this.companies = response.documents
      }
    },
    async getClients () {
      await this.getCompanies()
      if (this.companies.length > 0) {
        let client_ids = []
        this.companies.map(company => {
          company.usuarioID.map(client => {
            if (client !== this.user_email) client_ids.push(client)
          })
        })
        if (client_ids.length > 0) {
          this.clients = []
          this.client_names = []
          client_ids.map(async (item) => {
            const response = await this.getDocument(Firebase.firestore(), 'Usuario', 'id', item)
            this.clients.push(response.documents[0].data)
            this.client_names.push(response.documents[0].data.nome)
          })
        }
      }
    },
    async getTasks () {
      await this.getParticularTasks()
      await this.getConstructionsTasks()
    },
    async getParticularTasks () {
      const response = await this.getDocument(Firebase.firestore(), 'AgendaParticular', 'usuarioID', this.user_email)
      if (response.status === 'ok') {
        this.particular_tasks = []
        this.calendarOptions.events = []
        response.documents.map(item => {
          this.particular_tasks.push(item.data)
          this.calendarOptions.events.push(
            {
              title: item.data.titulo,
              start: item.data.data_inicio.substr(0, 19) + 'Z',
              end: item.data.data_fim.substr(0, 19) + 'Z'
            }
          )
        })
      }
    },
    async getConstructionsTasks () {
      this.constructions_tasks = []
      this.constructions.map(async c => {
        const response = await this.getDocument(Firebase.firestore(), 'AgendaObra', 'obraID', c.id)
        console.log(response)
        if (response.status === 'ok') {
          response.documents.map(item => {
            this.constructions_tasks.push(item.data)
            this.calendarOptions.events.push(
              {
                title: item.data.titulo,
                start: item.data.data_inicio,
                end: item.data.data_fim
              }
            )
          })
        }
      })
    },
    changeView () {
      switch (this.calendar_view) {
        case 'Mês':
          this.calendarOptions.initialView = 'dayGridMonth'
          this.view_week = false
          this.view_day = false
          this.view_month = true
          break;
        case 'Dia':
          this.calendarOptions.initialView = 'timeGridDay'
          this.view_week = false
          this.view_month = false
          this.view_day = true
          break;
        default:
          this.calendarOptions.initialView = 'timeGridWeek'
          this.view_day = false
          this.view_month = false
          this.view_week = true
          break;
      }
    },
    dateClick (info) {
      this.form = true
      this.date_clicked =  info.dateStr
    },
    selectDate (info) {
      Swal.fire('selected ' + info.startStr + ' to ' + info.endStr)
    }
  }
}
</script>
<style lang="css">
.object_calendar {
  height: 100%;
}
.fc {
  height: 90%;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .object_calendar {
    height: unset;
  }
}
</style>
