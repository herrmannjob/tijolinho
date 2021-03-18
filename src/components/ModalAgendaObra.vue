<template>
  <v-dialog max-width="600px" v-model="form" persistent>
    <button>
      Fechar
    </button>
    <v-card>
      <v-card-title>
        <span class="headline">Nova atividade:</span>
      </v-card-title>
      <v-card-text>
        <v-col cols="12">
          <v-select
            :items="constructions_names"
            v-model="selected"
            label="Obra"
            dense
          ></v-select>

          <v-text-field
            label="Atividade*"
            :rules="[rules.required]"
            v-model="title"
          ></v-text-field>

          <v-textarea color="teal" v-model="description">
            <template v-slot:label>
              <div>
                Observalções
              </div>
            </template>
          </v-textarea>

          <v-select
            :items="priority_list"
            v-model="priority"
            label="Prioridade"
            dense
          ></v-select>

          <v-menu
            ref="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date_start"
                label="Início"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="date_start"
              min="1950-01-01"
            ></v-date-picker>
          </v-menu>

          <v-menu
            ref="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date_end"
                label="Término"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="date_end"
              :min="date_start"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Fechar
          </v-btn>
          <v-btn color="primary" @click="save">
            Salvar
          </v-btn>
        </v-spacer>
      </v-card-actions>
    </v-card>
    <ResponseModal :modal.sync="modal" :message="message" />
  </v-dialog>
</template>

<script>
import ResponseModal from "@/components/ResponseModal.vue";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
export default {
  name: "ModalAgendaObra",
  components: { ResponseModal },
  mixins: [FirebaseMixin],
  props: {
    form: Boolean,
    constructions: Array,
    constructions_names: Array,
  },
  data() {
    return {
      title: "",
      description: "",
      date_start: "",
      date_end: "",
      priority_list: ["Alta", "Média", "Baixa"],
      priority: "",
      modal: false,
      message: { title: "", code: "", text: "" },
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      selected: "",
    };
  },
  methods: {
    close() {
      this.title = "";
      this.description = "";
      this.date_start = "";
      this.date_end = "";
      this.priority = "";
      this.selected = "";
      this.$emit("update:form", false);
      this.$emit("update:refresh", true);
    },
    async save() {
      if (this.selected.length > 0) {
        const i = this.constructions_names.indexOf(this.selected);
        const id = this.constructions[i].id;
        const start = new Date(this.date_start + "Z");
        const end = new Date(this.date_end + "Z");
        const duration = (end - start) / 1000 / 60 / 60 / 24;
        const data = {
          titulo: this.title,
          descricao: this.description,
          data_inicio: this.date_start,
          data_fim: this.date_end,
          duracao: `${duration} dia(s)`,
          prioridade: this.priority,
          obraID: id,
        };
        const response = await this.firebaseCreate(
          Firebase.firestore(),
          "AgendaObra",
          null,
          data
        );
        await this.firebaseUpdate(
          Firebase.firestore(),
          "AgendaObra",
          response.created_id,
          { id: response.created_id }
        );
        if (response.status === "ok") {
          this.$emit("update:form", false);
          this.message.title = "Atividade cadastrada com sucesso!";
        } else {
          this.message.title = "Ocorreu um erro...";
          this.message.code = response.message.code;
          this.message.text = response.message;
        }
      } else {
        this.message.title = "Ocorreu um erro...";
        this.message.text = "Você esqueceu de escolher a obra";
      }
      this.modal = true;
    },
  },
};
</script>
<style lang="css">
.theme--light.v-messages {
  display: flex !important;
  color: red;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body {
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
