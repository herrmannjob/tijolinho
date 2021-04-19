<template>
  <vs-dialog
    @close="handleClose"
    blur
    v-model="formGantt"
    max-width="800px"
    prevent-close
  >
    <template #header>
      <h4 class="not-margin">Atualizar <b>{{ selectedTask.name }}</b></h4>
    </template>
    <div class="con-form">
      <v-row>
        <v-col cols="12" md="6">
          <div class="group-data-task">
            <vs-input
              type="text"
              v-model="selectedTask.name"
              label="Nome da tarefa"
              :rules="nameRules"
              required
            />

            <div class="inputControl">
              <template>
                <vs-input
                  id="agend"
                  type="date"
                  v-model="selectedTask.start"
                  label="Data de Início"
                  required
                  :min="today"
                />
              </template>
            </div>

            <div class="inputControl inputFinal">
              <template>
                <vs-input
                  id="agend"
                  type="date"
                  v-model="selectedTask.end"
                  label="Término previsto"
                  required
                  :min="today"
                />
              </template>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Orçamento estimado"
            v-model="selectedTask.gasto_previsto"
            required
            hint="Apenas números"
          ></v-text-field>

          <v-select
            v-if="task_names.length"
            v-model="selectedTask.dependencies"
            :items="task_names"
            :close-on-content-click="false"
            :menu-props="{ top: true, offsetY: true }"
            label="Depende da Tarefa"
          ></v-select>

          <v-select
            v-model="selectedTask.Status"
            :items="status"
            :close-on-content-click="false"
            :menu-props="{ top: true, offsetY: true }"
            label="Status"
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <template #footer>
      <div class="footer-dialog">
        <vs-button block class="btn-primario" @click="addTarefa()">
          SALVAR
        </vs-button>
      </div>
    </template>
    <ResponseModal :modal.sync="modal" :message="message" />
  </vs-dialog>
</template>

<script>
import ResponseModal from "@/components/ResponseModal.vue";
export default {
  name: "ModalGantt",
  components: { ResponseModal },
  props: {
    selectedTask: {},
    formGantt: Boolean,
    tasks: Array,
    task_names: Array,
  },
  data() {
    return {
      title: "",
      description: "",
      end_date: "",
      modal: false,
      message: { title: "", code: "", text: "" },
      selected_task: "",
      status: ["A iniciar", "Em andamento", "Finalizado"],
      selected_status: "A iniciar",
    };
  },
  created() {},
  methods: {
    handleClose() {
      this.$emit("update:formGantt", false);
    },
    async save() {
      // const start = new Date(this.date)
      // const end = new Date(this.end_date)
      // const duration = (end - start) / 1000 / 60 / 60 / 24
      // const response = await Functions.putData(AgendaParticular, {
      //   "titulo": this.title,
      //   "descricao": this.description,
      //   "data_inicio": this.date + 'Z',
      //   "data_fim": this.end_date + 'Z',
      //   "duracao": `${duration} dia(s)`,
      //   "Usuario": this.user
      // })
      // if (response.status === 'ok') {
      //   this.message.title = "Atividade cadastrada com sucesso!"
      // } else {
      //   this.message.title = "Ocorreu um erro..."
      //   this.message.code = response.error.code
      //   this.message.text = response.error.message
      // }
      // this.modal = true
    },
  },
};
</script>
<style lang="css">
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body {
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
