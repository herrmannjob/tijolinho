<template>
  <gantt-elastic :tasks="tasks" :options="options">
    <!-- <gantt-elastic-header slot="header"></gantt-elastic-header>
    <gantt-elastic-footer slot="footer"></gantt-elastic-footer> -->
  </gantt-elastic>
</template>

<script>
import GanttElastic from "gantt-elastic"
// import Header from "gantt-elastic-header"
import moment from '@/plugins/moment'

import { Tarefa } from '@/models'
import Functions from '@/functions/Functions'

export default {
  name: 'Gantt',
  components: {
    // ganttElasticHeader: {template: Header},
    ganttElastic: GanttElastic,
    // ganttElasticFooter: {template: '<span>your footer</span>'},
  },
  data () {
    return {
      tasks: [],
      options: [],
      tarefas: []
    }
  },
  async created () {
    await this.getTasks()
    this.getOptions()
  },
  methods: {
    getDate (hours) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const timeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime();
      return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
    },
    async getTasks () {
      const response = await Functions.getAll(Tarefa)
      if (response.status === 'ok') {
        response.data.map(item => {
          const start = new Date(item.data_inicio.substr(0, 10))
          const end = new Date(item.data_fim.substr(0, 10))
          const duration = end - start
          this.tasks.push(
            {
              id: item.id,
              label: item.nome_tarefa,
              user:
                `<a href="#" target="_blank" style="color:#0077c0;">${item.Responsavel.nome}</a>`,
              start: item.data_inicio.substr(0, 10),
              duration: duration,
              progress: 85,
              type: 'task',
              parentId: item.TarefaOrigem ? item.TarefaOrigem.id : null,
              // dependentOn: null,
            },
          )
        })
      }
    },
    getOptions () {
      this.options = {
        maxRows: 100,
        maxHeight: 300,
        title: {
          label: 'Your project title as html (link or whatever...)',
          html: false,
        },
        row: {
          height: 24,
        },
        calendar: {
          hour: {
            display: false,
          },
        },
        chart: {
          progress: {
            bar: true,
          },
          expander: {
            display: true,
          },
        },
        taskList: {
          expander: {
            straight: true,
          },
          columns: [
            // {
            //   id: 1,
            //   label: 'ID',
            //   value: 'id',
            //   width: 35,
            // },
            {
              id: 2,
              label: 'Description',
              value: 'label',
              width: 120,
              expander: true,
              html: true,
              events: {
                click({ data }) {
                  alert('description clicked!\n' + data.label);
                },
              },
            },
            {
              id: 3,
              label: 'Assigned to',
              value: 'user',
              width: 100,
              html: true,
            },
            {
              id: 3,
              label: 'Start',
              value: (task) => moment(task.start).format('YYYY-MM-DD'),
              width: 78,
            },
            // {
            //   id: 4,
            //   label: 'Type',
            //   value: 'type',
            //   width: 60,
            // },
            {
              id: 5,
              label: '%',
              value: 'progress',
              width: 35,
              style: {
                'task-list-header-label': {
                  'text-align': 'center',
                  width: '100%',
                },
                'task-list-item-value-container': {
                  'text-align': 'center',
                  width: '100%',
                },
              },
            },
          ],
        }
      }
    }
  }
}
</script>
