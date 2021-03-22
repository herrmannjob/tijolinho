<template>
  <v-dialog max-width="400px" v-model="form" persistent>
    <v-card>
      <v-btn class="closeBtn" color="blue darken-1" text @click="close">
        Fechar
      </v-btn>
      <!-- <v-card-title>
        <span class="headline">Nova atividade:</span>
      </v-card-title> -->
      <v-card-text>
        <v-col cols="12">
          <v-text-field
            class="atividadeField"
            placeholder="Atividade*"
            :rules="[rules.required]"
            v-model="title"
          ></v-text-field>

          <v-select
            :items="priority_list"
            v-model="priority"
            label="Prioridade"
            dense
          ></v-select>

          <!-- <v-menu
            ref="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateStart.date"
                label="Início"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="dateStart.date"
              min="1950-01-01"
            ></v-date-picker>
          </v-menu> -->

          <v-menu
            ref="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="dateStart.time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateStart.time"
                label="Horário inicial"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="dateStart.time"
              @click:minute="$refs.menu.save(dateStart.time)"
              full-width
            ></v-time-picker>
          </v-menu>

          <!-- <v-menu
            ref="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateEnd.date"
                label="Término"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="dateEnd.date"
              min="1950-01-01"
            ></v-date-picker>
          </v-menu> -->

          <v-menu
            ref="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time_end"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateEnd.time"
                label="Horário final"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="dateEnd.time"
              @click:minute="$refs.menu.save(dateEnd.time)"
              full-width
            ></v-time-picker>
          </v-menu>
          <v-textarea color="teal" v-model="description">
            <template v-slot:label>
              <div>
                Observações:
              </div>
            </template>
          </v-textarea>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer>
          <v-btn class="confirmBtn" color="primary" @click="save">
            Editar Evento
          </v-btn>
        </v-spacer>
      </v-card-actions>
    </v-card>
    <ResponseModal :modal.sync="modal" :message="message" />
  </v-dialog>
</template>

<script>
// import { AgendaParticular } from '@/models'
// import Functions from '@/functions/Functions'
import ResponseModal from "@/components/ResponseModal.vue";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
export default {
  name: "ModalCalendar",
  components: { ResponseModal },
  mixins: [FirebaseMixin],
  props: {
    form: Boolean,
    refresh: Boolean,
    date: String,
    user: String,
  },
  data() {
    return {
      title: "",
      description: "",
      date_end: "",
      time_end: "",
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
    };
  },
  mounted() {},
  methods: {
    close() {
      this.title = "";
      this.description = "";
      this.date_end = "";
      this.time_end = "";
      this.priority = "";
      this.$emit("update:form", false);
      this.$emit("update:refresh", true);
    },
    async save() {
      const start = new Date(this.date);
      const end = new Date(
        this.dateEnd.date + "T" + this.dateEnd.time + ":00Z"
      );
      const duration = (end - start) / 1000 / 60 / 60 / 24;
      const data = {
        titulo: this.title,
        descricao: this.description,
        data_inicio:
          this.dateStart.date + "T" + this.dateStart.time + ":00.000Z",
        data_fim: this.dateEnd.date + "T" + this.dateEnd.time + ":00.000Z",
        duracao: `${duration} dia(s)`,
        prioridade: this.priority,
        usuarioID: this.user,
      };
      const response = await this.firebaseCreate(
        Firebase.firestore(),
        "AgendaParticular",
        null,
        data
      );
      console.log(response);
      if (response.status === "ok") {
        this.$emit("update:form", false);
        this.$emit("update:refresh", true);
        this.message.title = "Atividade cadastrada com sucesso!";
      } else {
        this.message.title = "Ocorreu um erro...";
        this.message.code = response.message.code;
        this.message.text = response.message;
      }
      this.modal = true;
    },
  },
  computed: {
    dateStart: function() {
      return { date: this.date.substr(0, 10), time: this.date.substr(11, 5) };
    },
    dateEnd: function() {
      const time = this.date.substr(11, 5);
      let day = (parseInt(time.substr(0, 2)) + 1).toString();
      if (day.length === 1) day = "0" + day;
      return { date: this.date.substr(0, 10), time: day + time.substr(2) };
    },
  },
};
</script>
<style lang="css">
.theme--light.v-messages {
  display: flex !important;
  color: red;
}

#input-56 {
  color: #004f8b !important;
  text-transform: uppercase;
  font-weight: bold;
}

.closeBtn {
  width: 200px;
}
.confirmBtn {
  margin-bottom: 2% !important;
  width: 200px;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body {
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
