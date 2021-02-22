<template>
  <div>
    <gantt-elastic :tasks="tasks" :options="options">
      <gantt-elastic-header slot="header"></gantt-elastic-header>
      <!-- <gantt-elastic-footer slot="footer"></gantt-elastic-footer> -->
    </gantt-elastic>
    <FormGantt :form.sync="form" :date="task_clicked" :user="user" />
  </div>
</template>

<script>
import GanttElastic from "gantt-elastic"
import Header from "gantt-elastic-header"
import moment from '@/plugins/moment'

import { Usuario, Tarefa } from '@/models'
import Functions from '@/functions/Functions'
import FormGantt from '@/components/FormGantt'

export default {
  name: 'Gantt',
  components: {
    ganttElasticHeader: Header,
    ganttElastic: GanttElastic,
    FormGantt
  },
  data () {
    return {
      user: null,
      tasks: [],
      options: [],
      tarefas: [],
      today: '',
      form: false,
      task_clicked: ''
    }
  },
  async created () {
    this.user = await Functions.isAuth()
    await this.getUser()
    this.today = moment().locale('en-ca').format('L')
    await this.getTasks()
    this.getOptions()

    // CHANGE GANTT HEADER
    const gantt_title = document.getElementsByClassName('gantt-elastic__header-title')
    for (let value of Object.entries(gantt_title)) { value[1].style.display = 'none' }

    const gantt_now = document.getElementsByClassName('gantt-elastic__header-btn-recenter')
    for (let value of Object.entries(gantt_now)) { value[1].style.display = 'none' }

    const gantt_options = document.getElementsByClassName('gantt-elastic__header-options')
    for (let value of Object.entries(gantt_options)) { value[1].style.width = '100%' }

    const gantt_task = document.getElementsByClassName('gantt-elastic__header-label')
    for (let value of Object.entries(gantt_task)) { if (value[1].innerText === " Task list ") value[1].style.display = 'none' }
  },
  methods: {
    async getUser () {
      const user = await Functions.wichUserId(Usuario, this.user.attributes.email)
      this.user = user.data
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
              progress: ((new Date(this.today) - start) / duration) * 100 > 100 ? 100 : ((new Date(this.today) - start) / duration) * 100,
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
          html: true,
        },
        row: {
          height: 24
        },
        calendar: {
          hour: {
            display: false,
          },
        },
        chart: {
          progress: {
            bar: false,
          },
          expander: {
            display: true,
          },
        },
        taskList: {
          expander: {
            straight: false,
          },
          columns: [
            {
              id: 1,
              label: 'Description',
              value: 'label',
              width: 120,
              expander: true,
              html: true,
              events: {
                click({ data }) {
                  this.updateTask(data)
                },
              },
            },
          ],
        }
      }
    },
    async updateTask (data) {
      this.form = true
      this.task_clicked =  data
    }
  }
}
</script>
<style lang="css">
</style>
