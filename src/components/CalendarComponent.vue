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
    
    <FormCalendar :form.sync="form" :refresh.sync="refresh" :date="date_clicked" :user="user" />

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

import { Obra, Usuario, Empresa, AgendaParticular, AgendaObra } from '@/models'
import Functions from '@/functions/Functions'

export default {
  name: 'CalendarComponent',
  components: {
    FormCalendar, CalendarWeek, CalendarDay, CalendarMonth, FullCalendar
  },
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
      refresh: false
    }
  },
  async updated () {
    if (this.refresh) {
      await this.getTasks()
      this.refresh = false
    }
  },
  async created () {
    this.user = await Functions.isAuth()
    await this.getUser()
    await this.getObras()
    this.getTasks()
    this.getClients()
  },
  // updated () { this.refreshEvents() },
  methods: {
    async getUser () {
      const user = await Functions.wichUserId(Usuario, this.user.attributes.email)
      this.user = user.data
    },
    async getObras () {
      const response = await Functions.getByUserId(Obra, this.user.id)
      if (response.status === 'ok') {
        this.constructions = response.data
        this.constructions_names = []
        response.data.map(obra => { this.constructions_names.push(obra.nome) })
      }
    },
    async getCompanies () {
      const response = await Functions.getAll(Empresa)
      if (response.status === 'ok') {
        response.data.filter(item => {
          if (item.usuarioID.includes(this.user.id)) this.companies.push(item)
        })
      }
    },
    async getClients () {
      await this.getCompanies()
      const client_ids = []
      this.companies.map(company => {
        company.usuarioID.filter(user_id => {
          if (user_id !== this.user.id) {
            client_ids.push(user_id)
            this.client_names = []
          }
        })
      })
      client_ids.map(async function (id) {
        const response = await Functions.getById(Usuario, id)
        this.clients.push(response.data)
        this.client_names.push(response.data.nome)
      })
    },
    async getTasks () {
      await this.getParticularTasks()
      await this.getConstructionsTasks()
    },
    async getParticularTasks () {
      const response = await Functions.getAll(AgendaParticular)
      if (response.status === 'ok') {
        response.data.filter(item => {
          if (item.Usuario.id === this.user.id) {
            this.particular_tasks.push(item)
            this.calendarOptions.events.push(
              {
                title: item.titulo,
                start: item.data_inicio.substr(0, 19) + 'Z',
                end: item.data_fim.substr(0, 19) + 'Z'
              }
            )
          }
        })
      }
    },
    async getConstructionsTasks () {
      await this.getObras()
      if (this.constructions.length > 0) {
        const response = await Functions.getAll(AgendaObra)
        if (response.status === 'ok') {
          this.constructions.map(construction => {
            response.data.map(item => {
              if (item.Obra.id === construction.id) {
                this.constructions_tasks.push(item)
                this.calendarOptions.events.push({ title: item.titulo, start: item.data_inicio.substr(0, 10), end: item.data_fim.substr(0, 10) })
              }
            })
          })
        }
      }
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
