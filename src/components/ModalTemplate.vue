<script>
import ResponseModal from "@/components/ResponseModal.vue";
import reforma from "../functions/templates/reforma.json";
import reforma_zero from "../functions/templates/reforma_zero.json";
import decoracao from "../functions/templates/decoracao.json";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
export default {
  name: "ModalTemplate",
  components: { ResponseModal },
  props: {
    formTemplate: Boolean,
    user: String,
    cronograma_obra: String,
    tasks: Array,
    task_names: Array,
  },
  mixins: [FirebaseMixin],
  data: () => ({
    formTask: false,
    modal: false,
    message: { title: "", text: "" },
    allCheck: false,
    expanded: [],
    renovation: reforma,
    renovation_zero: reforma_zero,
    renovation_decoracao: decoracao,
    renovation_selected: [],
    renovation_results: [],
    items_renovation_type: ["Obra do Zero", "Reforma", "Decoração"],
    topicSelected: [],
    taskSelected: [],
    taskStatus: [
      { text: "A iniciar", value: "A iniciar" },
      { text: "Em andamento", value: "Em andamento" },
      { text: "Parado", value: "Parado" },
    ],
    taskProgress: [
      { text: "A iniciar", value: 0 },
      { text: "Em andamento", value: 15 },
      { text: "Parado", value: 50 },
    ],
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: (v) => v.length <= 50 || "Titulo muito grande!",
    totalDesserts: 0,
    desserts: [],
    loading: true,
    options: {},
    headers: [
      {
        text: "Tarefa",
        align: "start",
        sortable: false,
        value: "supertopicName",
      },
      { text: "Data de Início", value: "startDate" },
      { text: "Término Previsto", value: "endDate" },
      { text: "Status", value: "status" },
    ],
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    getItems() {
      this.getTopics();
    }
  },
  mounted() {
    this.getDataFromApi();
    this.getTopics();
  },
  methods: {
    handleClose() {
      this.$emit("update:formTemplate", false);
    },
    getTopics() {
      this.taskSelected.forEach((selectedResult) => {
        selectedResult.topics.forEach((topic) => {
          this.topicSelected = {
            name: topic.topicName,
            usuarioID: this.user,
            start: topic.startDate,
            end: topic.endDate,
            status: topic.status,
            cronograma_obra: this.cronograma_obra,
            progress: topic.progress,
          };
        });
      });
      console.log("getTopics: ", this.topicSelected);
    },
    getTemplate(template) {
      var _json;
      if (template == "Reforma") {
        _json = reforma;
        this.renovation_results = reforma;
      }
      if (template == "Obra do Zero") {
        _json = reforma_zero;
        this.renovation_results = reforma_zero;
      }
      if (template == "Decoração") {
        _json = decoracao;
        this.renovation_results = decoracao;
      }
      return _json;
    },
    getDataFromApi() {
      this.loading = true;
      this.fakeApiCall().then((data) => {
        this.renovation_results = data.items;
        this.totalDesserts = data.total;
        this.loading = false;
      });
    },
    fakeApiCall() {
      return new Promise((resolve) => {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;

        let items = this.getDesserts();
        const total = items.length;

        if (sortBy.length === 1 && sortDesc.length === 1) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy[0]];
            const sortB = b[sortBy[0]];

            if (sortDesc[0]) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (itemsPerPage > 0) {
          items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        }

        setTimeout(() => {
          resolve({
            items,
            total,
          });
        }, 1000);
      });
    },
    getDesserts() {
      let body = reforma;
      body.supertopics.forEach((result) => {
        this.renovation_results = result;
      });
      return [this.renovation_results];
    },
    save() {
      this.snack = true;
      this.snackColor = "#0ec940";
      this.snackText = "Alteração salva";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "#c90e0e";
      this.snackText = "Alteração cancelada";
    },
    open() {
      this.snack = true;
      this.snackColor = "#002b4b";
      this.snackText = "Alteração aberta";
    },
    close() {
      this.snack = true;
      this.snackColor = "#c90e0e";
      this.snackText = "Alteração cancelada";
    },
    async saveTemplate() {
      if (this.taskSelected.length <= 0) {
        this.modal = true;
        this.message.title = "Erro ao salvar!";
        this.message.text = `Selecione ao menos uma tarefa`;
      }
      this.taskSelected.forEach((selectedResult) => {
        if (!selectedResult.endDate) {
          this.modal = true;
          this.message.title = "Erro ao salvar!";
          this.message.text = `Término Previsto de ${selectedResult.supertopicName} não preenchido`;
        }
        if (!selectedResult.startDate) {
          this.modal = true;
          this.message.title = "Erro ao salvar!";
          this.message.text = `Data de Início de ${selectedResult.supertopicName} não preenchido`;
        }
        if (!selectedResult.status) {
          this.modal = true;
          this.message.title = "Erro ao salvar!";
          this.message.text = `Status de ${selectedResult.supertopicName} não preenchido`;
        }
        if (selectedResult.status === "A iniciar") {
          let body = {
            progress: 0,
          };
          Object.assign(selectedResult, body);
        }
        if (selectedResult.status === "Em andamento") {
          let body = {
            progress: 15,
          };
          Object.assign(selectedResult, body);
        }
        if (selectedResult.status === "Parado") {
          let body = {
            progress: 50,
          };
          Object.assign(selectedResult, body);
        }
        const data = {
          name: selectedResult.supertopicName,
          usuarioID: this.user,
          start: selectedResult.startDate,
          end: selectedResult.endDate,
          status: selectedResult.status,
          cronograma_obra: this.cronograma_obra,
          progress: selectedResult.progress,
        };
        const response = this.firebaseCreate(
          Firebase.firestore(),
          "Tarefa",
          null,
          data
        );
        this.firebaseUpdate(
          Firebase.firestore(),
          "Tarefa",
          response.created_id,
          { id: response.created_id }
        );
        if (response.status === "ok") {
          this.modal = true;
          this.message.title = "Tarefa cadastrada com sucesso!";
        } else {
          this.modal = true;
          this.message.title = "Ocorreu um erro...";
        }
        this.$emit("update:formTemplate", false);
        this.$emit("update:formSelectTemplate", false);
        this.$emit("update:refresh", true);
      });
    },
  },
};
</script>
<template>
  <vs-dialog
    @close="handleClose"
    blur
    v-model="formTemplate"
    width="auto"
    max-width="auto"
    prevent-close
  >
    <template #header>
      <h3>
        Adicionar Tarefa
      </h3>
    </template>
    <h6>
      Escolha o tipo de reforma
    </h6>
    <div class="container-center">
      <v-select
        :items="items_renovation_type"
        v-model="renovation_selected"
        :onselect="getTemplate(renovation_selected)"
        label="Selecione"
      ></v-select>
      <div class="con-content row" style="margin-top: 2em">
        <v-data-table
          :headers="headers"
          :items="renovation_results.supertopics"
          :options.sync="options"
          :server-items-length="totalDesserts"
          :expanded.sync="expanded"
          :loading="loading"
          v-model="taskSelected"
          item-key="supertopicName"
          show-select
          show-expand
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.startDate="{ item }">
            <vs-input class="input-date" type="date" v-model="item.startDate" />
          </template>
          <template v-slot:item.endDate="{ item }">
            <vs-input class="input-date" type="date" v-model="item.endDate" />
          </template>
          <template v-slot:item.status="{ item }">
            <v-select
              class="input-select"
              :items="taskStatus"
              v-model="item.status"
              outlined
            ></v-select>
          </template>
          <template v-slot:item.supertopicName="props">
            <v-edit-dialog
              :return-value.sync="props.item.supertopicName"
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              {{ props.item.supertopicName }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.supertopicName"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:expanded-item="{ headers, topicSelected }">
            <td :colspan="headers.length">{{ topicSelected }}</td>
          </template>
        </v-data-table>
        <v-snackbar
          v-model="snack"
          :timeout="3000"
          :color="snackColor"
          shaped
          top
        >
          {{ snackText }}

          <template v-slot:action="{ attrs }">
            <v-btn v-bind="attrs" text @click="snack = false">
              Fechar
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </div>
    <template #footer>
      <div class="footer-dialog">
        <vs-button block @click="saveTemplate" :disabled="!taskSelected">
          Cadastrar tarefa(s)
        </vs-button>
      </div>
    </template>
    <ResponseModal :modal.sync="modal" :message="message" />
  </vs-dialog>
</template>
<style lang="css">
.con-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container-center {
  margin: 5%;
}
.input-date {
  width: 80%;
}
.input-select {
  height: 80%;
  width: 60%;
}
</style>
