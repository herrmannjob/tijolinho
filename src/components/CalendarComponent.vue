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

import { Obra, Usuario, Tarefa } from '@/models'
import Functions from '@/functions/Functions'

export default {
  name: 'CalendarComponent',
  components: {
    FormCalendar, CalendarWeek, CalendarDay, CalendarMonth, FullCalendar
  },
  data () {
    return {
      user: null,
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
    async getObras () {
      const response = await Functions.getById(Obra, this.user.username)
      if (response.status === 'ok') this.constructions = response.data
    },
    async getClients () {
      const response = await Functions.getAll(Usuario)
      if (response.status === 'ok') this.clients = response.data
    },
    async getTasks () {
      const response = await Functions.getAll(Tarefa)
      if (response.status === 'ok') this.calendarOptions.events = response.data
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
