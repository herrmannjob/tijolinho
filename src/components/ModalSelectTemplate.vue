<script>
import ModalRegisterTask from "@/components/ModalRegisterTask.vue";
import ModalTemplate from "@/components/ModalTemplate.vue";
export default {
  name: "ModalSelectTemplate",
  components: { ModalRegisterTask, ModalTemplate },
  props: {
    formSelectTemplate: Boolean,
    user: String,
    cronograma_obra: String,
    tasks: Array,
    task_names: Array,
  },
  data: () => ({
    formTask: false,
    formTemplate: false,
  }),
  methods: {
    handleClose() {
      this.$emit("update:formSelectTemplate", false);
    },
  },
};
</script>
<template>
  <vs-dialog
    @close="handleClose"
    blur
    v-model="formSelectTemplate"
    max-width="800px"
    prevent-close
  >
    <template #header>
      <h3>
        Adicionar Tarefa
      </h3>
    </template>
    <h6>
      Escolha entre criar uma tarefa manualmente ou a partir de um template
      especialmente feito por nós!
    </h6>
    <div class="con-content row" style="margin-top: 2em">
      <vs-button @click="formTask = true">
        Criar Manualmente
      </vs-button>
      <vs-button @click="formTemplate = true">
        Escolher Template
      </vs-button>
    </div>
    <ModalRegisterTask
      :formTask.sync="formTask"
      :tasks="tasks"
      :task_names="task_names"
      :user="user"
      :cronograma_obra="cronograma_obra"
    />
    <ModalTemplate
      :formTemplate.sync="formTemplate"
      :tasks="tasks"
      :task_names="task_names"
      :user="user"
      :cronograma_obra="cronograma_obra"
    />
  </vs-dialog>
</template>
<style lang="css">
.con-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
