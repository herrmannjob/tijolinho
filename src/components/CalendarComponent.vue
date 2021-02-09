<template>
  <v-container fluid>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="4"
      >
        <v-select
          :items="items"
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
          :items="items"
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
          :items="items"
          label="Obra"
          dense
        ></v-select>
      </v-col>
    </v-row>
    
    <FormCalendar :form.sync="form" :date="date_clicked" />

    <FullCalendar :options="calendarOptions" />
  </v-container>
</template>

<script>

import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Swal from '@/plugins/sweetalert'
import FormCalendar from '@/components/FormCalendar'

// import { DataStore } from '@aws-amplify/datastore';
// import { AgendaObra } from '../../config/models';

export default {
  name: 'CalendarComponent',
  components: {
    FullCalendar, FormCalendar
  },
  data () {
    return {
      items: ['Dia', 'Semana', 'Mês'],
      calendar_view: '',
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
  created () {
  },
  methods: {
    changeView () {
      switch (this.calendar_view) {
        case 'Mês':
          // this.calendarOptions.initialView = 'dayGridMonth'
          // this.fullCalendar('changeView', 'dayGridMonth')
          break;
        case 'Dia':
          // $('#calendar').fullCalendar( 'changeView', 'timeGridDay');
          // this.calendarOptions.initialView = 'timeGridDay'
          // this.fullCalendar('changeView', 'timeGridDay')
          break;
        default:
          // document.getElementById('calendar').fullCalendar( 'changeView', 'timeGridWeek');
          // this.calendarOptions.initialView = 'timeGridWeek'
          // this.fullCalendar('changeView', 'timeGridWeek')
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
