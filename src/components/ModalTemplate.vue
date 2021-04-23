<script>
import ResponseModal from "@/components/ResponseModal.vue";
import reforma from "../functions/templates/reforma.json";
import reforma_zero from "../functions/templates/reforma_zero.json";
import decoracao from "../functions/templates/decoracao.json";
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
  data: () => ({
    formTask: false,
    modal: false,
    message: { title: "", code: "", text: "" },
    allCheck: false,
    selected: [],
    renovation: reforma,
    renovation_zero: reforma_zero,
    renovation_decoracao: decoracao,
    renovation_seleceted: [],
    renovation_results: [],
    items_renovation_type: ["Obra do Zero", "Reforma", "Decoração"],
    taskStatus: [
      { text: "A iniciar", value: 0 },
      { text: "Em andamento", value: 15 },
      { text: "Parado", value: 50 },
    ],
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: (v) => v.length <= 25 || "Input too long!",
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
  },
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    handleClose() {
      this.$emit("update:formTemplate", false);
    },
    getTemplate(template) {
      console.log("template: ", template);
      var _json;
      if (template == "Reforma") {
        _json = reforma;
        console.log("reforma: ", reforma);
        this.renovation_results = reforma;
        console.log("renovation_results: ", this.renovation_results);
        this.renovation_results.supertopics.forEach((result) => {
          return [
            {
              supertopicName: result.supertopicName,
            },
          ];
        });
      }
      if (template == "Obra do Zero") {
        _json = reforma_zero;
        console.log("obra zero: ", reforma_zero);
        this.renovation_results = reforma_zero;
        console.log("renovation_results: ", this.renovation_results);
        this.renovation_results.supertopics.forEach((result) => {
          console.log("result: ", result);
        });
      }
      if (template == "Decoração") {
        _json = decoracao;
        this.renovation_results = decoracao;
        console.log("decoração: ", decoracao);
        console.log("renovation_results:", this.renovation_results);
        this.renovation_results.supertopics.forEach((result) => {
          console.log("result: ", result);
        });
      }
      return _json;
    },
    getDataFromApi() {
      this.loading = true;
      this.fakeApiCall().then((data) => {
        console.log("data: ", data.items[0]);
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
        console.log("resultado: ", this.renovation_results);
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
      console.log("Dialog closed");
      this.snack = true;
      this.snackColor = "#c90e0e";
      this.snackText = "Alteração cancelada";
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
        v-model="renovation_seleceted"
        :onselect="getTemplate(renovation_seleceted)"
        label="Selecione"
      ></v-select>
      <div class="con-content row" style="margin-top: 2em">
        <v-data-table
          :headers="headers"
          :items="renovation_results.supertopics"
          :options.sync="options"
          :server-items-length="totalDesserts"
          item-key="supertopicName"
          show-select
          :loading="loading"
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
