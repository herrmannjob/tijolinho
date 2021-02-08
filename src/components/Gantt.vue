<template>
  <v-container fluid>
    <FullCalendar :options="calendarOptions" />
  </v-container>
</template>

<script>

import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
// import Swal from '@/plugins/sweetalert'

// import { DataStore } from '@aws-amplify/datastore';
// import { AgendaObra } from '../../config/models';

export default {
  name: 'Gantt',
  components: {
    FullCalendar
  },
  data () {
    return {
      items: ['Dia', 'Semana', 'Mês'],
      calendar_view: '',
      calendarOptions: {
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
        initialView: 'timeGridDay',
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
        // dateClick: this.dateClick,
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
      // task_titulo: null,
      // task_cliente: null,
      // task_obra: null,
      // task_prioridade: null,
      // task_categoria: null,
      // task_observacao: null
    }
  },
  created () {
  },
  methods: {
    // dateClick () {
    //   // const obra = await DataStore.save(
    //   //   new AgendaObra({
    //   //     "Obra": info.dateStr,
    //   //     "titulo": "Lorem ipsum dolor sit amet",
    //   //     "descricao": "Lorem ipsum dolor sit amet",
    //   //     "data_inicio": "1970-01-01Z",
    //   //     "data_fim": "1970-01-01Z",
    //   //     "duracao": "Lorem ipsum dolor sit amet"
    //   //   })
    //   // )
    //   // console.log(obra)
    //   Swal.fire({
    //     title: 'Nova tarefa:',
    //     input: 'text',
    //     inputLabel: 'Digite o título:',
    //     inputValue: '',
    //     showCancelButton: true,
    //     inputValidator: (value) => {
    //       if (!value) {
    //         return 'Digite o título!'
    //       } else this.task_titulo = value
    //     }
    //   })
      
    // },
    // selectDate (info) {
    //   Swal.fire('selected ' + info.startStr + ' to ' + info.endStr)
    // }
  }
}
</script>
