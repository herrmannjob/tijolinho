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

// import { DataStore } from '@aws-amplify/datastore';
// import { AgendaObra } from '../../config/models';

export default {
  name: 'Gantt',
  components: {
    // ganttElasticHeader: {template: Header},
    ganttElastic: GanttElastic,
    // ganttElasticFooter: {template: '<span>your footer</span>'},
  },
  data () {
    return {
      tasks: null,
      options: null
    }
  },
  created () {
    this.tasks = [
      {
        id: 1,
        label: 'Make some noise',
        user:
          '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">John Doe</a>',
        start: this.getDate(-24 * 5),
        duration: 15 * 24 * 60 * 60 * 1000,
        progress: 85,
        type: 'project',
      },
      {
        id: 2,
        label: 'With great power comes great responsibility',
        user:
          '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
        parentId: 1,
        start: this.getDate(-24 * 4),
        duration: 4 * 24 * 60 * 60 * 1000,
        progress: 50,
        type: 'milestone',
        collapsed: true,
        style: {
          base: {
            fill: '#1EBC61',
            stroke: '#0EAC51',
          },
        },
      },
      {
        id: 3,
        label: 'Courage is being scared to death, but saddling up anyway.',
        user:
          '<a href="https://www.google.com/search?q=John+Wayne" target="_blank" style="color:#0077c0;">John Wayne</a>',
        parentId: 2,
        start: this.getDate(-24 * 3),
        duration: 2 * 24 * 60 * 60 * 1000,
        progress: 100,
        type: 'task',
      },
      {
        id: 4,
        label: 'Put that toy AWAY!',
        user:
          '<a href="https://www.google.com/search?q=Clark+Kent" target="_blank" style="color:#0077c0;">Clark Kent</a>',
        start: this.getDate(-24 * 2),
        duration: 2 * 24 * 60 * 60 * 1000,
        progress: 50,
        type: 'task',
        dependentOn: [3],
      },
    ]
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
          {
            id: 4,
            label: 'Type',
            value: 'type',
            width: 60,
          },
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
  },
  methods: {
    getDate (hours) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const timeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime();
      return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
    }
  }
}
</script>
