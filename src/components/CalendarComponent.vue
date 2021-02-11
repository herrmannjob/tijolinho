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

    <CalendarWeek :options="calendarOptions" v-if="view_week" />

    <CalendarDay :options="calendarOptions" v-if="view_day" />

    <CalendarMonth :options="calendarOptions" v-if="view_month" />

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

import { DataStore, Predicates } from 'aws-amplify'
import { Obra, Usuario } from '@/models'
import { Auth  } from 'aws-amplify'

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
          {
              title: 'Reunião com Edu',
              start: '2021-02-02T10:00:00',
              end: '2021-02-02T11:00:00',
          },
          {
              title: 'Tijolinho',
              start: '2021-02-03T18:00:00',
              end: '2021-02-03T18:20:00',
          },
          {
              title: 'BCH237',
              start: '2021-02-05T10:30:00',
              end: '2021-02-05T11:30:00',
              extendedProps: {
                  department: 'BioChemistry'
              },
              description: 'Lecture'
          }
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
    this.user = await Auth.currentAuthenticatedUser()
    this.getObras()
    this.getClients()
  },
  methods: {
    async getObras () {
      try {
        const obras = await DataStore.query(Obra, data => data.usuarioID("eq", this.user.username))
        console.log(obras)
        if (obras.length > 0) {
          this.constructions = []
          obras.map(obra => {
            this.constructions.push(obra.nome)
          })
        }
      } catch (error) {
        console.log("Error: ", error)
      }
    },
    async getClients () {
      try {
        const clientes = await DataStore.query(Usuario, Predicates.ALL  )
        if (clientes.length > 0) {
          this.clients = []
          clientes.map(cliente => {
            this.clients.push(cliente.nome)
          })
        }
      } catch (error) {
        console.log("Error: ", error)
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
