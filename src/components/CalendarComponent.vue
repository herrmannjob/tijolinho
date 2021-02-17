<template>
  <v-container fluid>
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
          :items="clients"
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
          :items="constructions"
          label="Obra"
          dense
        ></v-select>
      </v-col>
    </v-row>
    
    <FormCalendar :form.sync="form" :date="date_clicked" />

    <CalendarWeek :options="calendarOptions" v-if="view_week" ref="calendar" />

    <CalendarDay :options="calendarOptions" v-if="view_day" ref="calendar" />

    <CalendarMonth :options="calendarOptions" v-if="view_month" ref="calendar" />

    <FullCalendar :options="calendarOptions" v-show="false" />
  </v-container>
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

import { Obra, Usuario, Tarefa, Empresa } from '@/models'
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
      clients: ['Nenhum cliente cadastrado'],
      constructions: ['Nenhuma obra cadastrada'],
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
      task_observacao: null
    }
  },
  async created () {
    this.user = await Functions.isAuth()
    await this.getUserId()
    this.getObras()
    this.getTasks()
    // this.getClients()
  },
  // updated () { this.refreshEvents() },
  methods: {
    refreshEvents () {
      console.log('refresh')
      this.$refs.calendar.$emit('refetch-events')
    },
    async getUserId () {
      const user_id = await Functions.wichUserId(Usuario, this.user.attributes.email)
      this.uid = user_id.data
    },
    async getObras () {
      const response = await Functions.getById(Obra, this.uid)
      if (response.status === 'ok') {
        this.constructions = []
        response.data.map(obra => { this.constructions.push(obra.nome) })
      }
    },
    async getClients () {
      const empresas = await Functions.getById(Empresa, this.uid)
      console.log(empresas)
      // const response = await Functions.getAll(Usuario)
      // if (response.status === 'ok') this.clients = response.data
    },
    async getTasks () {
      const response = await Functions.getAll(Tarefa)
      console.log(response)
      if (response.status === 'ok') {
        response.data.map(item => {this.calendarOptions.events.push({ title: item.nome_tarefa, start: item.data_inicio.substr(0, 10), end: item.data_fim.substr(0, 10) })})
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
