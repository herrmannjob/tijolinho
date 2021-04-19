<template>
  <div style="width:100%">
    <svg ref="gantt" />
    <ModalGantt
      :formGantt.sync="formGantt"
      :selectedTask.sync="selectedTask"
      :tasks="tasks"
      :task_names="task_names"
    />
  </div>
</template>

<script>
import Gantt from "frappe-gantt";
import moment from "@/plugins/moment";
import ModalGantt from "@/components/ModalGantt";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";

export default {
  name: "Gantt",
  components: { ModalGantt },
  props: {
    nome_tarefas: Array,
    tarefas: Array,
    viewMode: {
      type: String,
      required: false,
      default: "Month",
    },
  },
  mixins: [FirebaseMixin],
  data() {
    return {
      gantt: {},
      viewModeOptions: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
      tasks: this.tarefas,
      formGantt: false,
      selectedTask: {},
      task_names: this.nome_tarefas,
      idTask: "",
    };
  },
  watch: {
    viewMode() {
      this.updateViewMode();
    },

    tasks() {
      this.updateTasks();
      this.modalOpen();
    },
  },
  mounted() {
    this.setupGanttChart();
    moment.locale("pt-br");
    this.today = moment().format("LL");
    this.hoje = moment()
      .format()
      .substr(0, 10);
  },
  methods: {
    async updateTaskProgress(task, progress) {
      this.tasks.map(async (tarefa) => {
        if (tarefa.id === task.id) {
          await this.firebaseUpdate(Firebase.firestore(), "Tarefa", tarefa.id, {
            progress: progress,
          });
        }
      });
      this.$emit("update:refresh", true);
    },
    async updateTaskDate(task, start, end) {
      this.tasks.map(async (tarefa) => {
        let startAmerican = moment(start).format("YYYY-MM-DD");
        let endAmerican = moment(end).format("YYYY-MM-DD");
        if (tarefa.id === task.id) {
          await this.firebaseUpdate(Firebase.firestore(), "Tarefa", tarefa.id, {
            start: startAmerican,
            end: endAmerican,
          });
        }
      });
      this.$emit("update:refresh", true);
    },
    setupGanttChart() {
      this.gantt = new Gantt(this.$refs.gantt, this.tasks, {
        on_click: (task) => {
          this.modalOpen(task);
          this.$emit("task-updated", task);
        },

        on_date_change: (task, start, end) => {
          this.$emit("task-date-updated", { task, start, end });
          this.updateTaskDate(task, start, end);
        },

        on_progress_change: (task, progress) => {
          this.$emit("task-progress-updated", { task, progress });
          this.updateTaskProgress(task, progress);
        },

        on_view_change: (mode) => {
          this.$emit("view-mode-updated", mode);
        },
      });
      this.updateTaskProgress();
      this.updateTaskDate();
      this.updateTasks();
      this.updateViewMode();
    },

    updateViewMode() {
      this.gantt.change_view_mode(
        this.viewMode[0].toUpperCase() + this.viewMode.substring(1)
      );
    },

    updateTasks() {
      this.gantt.refresh(this.tasks);
    },

    modalOpen(task) {
      this.selectedTask = task;
      this.formGantt = true;
    },
  },
};
</script>

<style lang="scss">
@import "~frappe-gantt/dist/frappe-gantt.css";
</style>
