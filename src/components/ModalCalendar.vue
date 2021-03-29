<template>
  <vs-dialog class="modalBg" max-width="350px" v-model="form" prevent-close>
    <div class="con-form">
      <v-col cols="12" class="gridControl">
        <vs-input
          class="inputControl"
          color="#002b4b"
          border
          type="text"
          v-model="title"
          :rules="[rules.required]"
          label-placeholder="Atividade"
        >
        </vs-input>

        <vs-select
          class="inputControl"
          label-placeholder="Prioridade"
          :options="priority_list"
          v-model="priority"
        >
          <vs-option label="Baixa" value="Baixa">
            Baixa
          </vs-option>
          <vs-option label="Média" value="Média">
            Média
          </vs-option>
          <vs-option label="Alta" value="Alta">
            Alta
          </vs-option>
        </vs-select>

        <div class="inputControl">
          <template>
            <vs-input
              id="agend"
              type="date"
              v-model="dateStart.date"
              label="Data Inicial"
              required
            />
          </template>
        </div>

        <div class="inputControl">
          <template>
            <vs-input
              type="time"
              v-model="dateStart.time"
              label="Horário Inicial"
              required
            />
          </template>
        </div>

        <div class="inputControl">
          <template>
            <vs-input
              type="date"
              v-model="dateEnd.date"
              label="Data Final"
              required
            />
          </template>
        </div>

        <div class="inputControl">
          <template>
            <vs-input
              type="time"
              v-model="dateEnd.time"
              label="Horário Final"
              required
            />
          </template>
        </div>

        <vs-input
          class="inputControl"
          color="#002b4b"
          border
          type="text"
          v-model="description"
          label="Observações"
        >
        </vs-input>
      </v-col>
    </div>
    <template #footer>
      <div class="footer-dialog">
        <vs-button :disabled="!title" class="confirmBtn" block @click="save">
          Criar Evento
        </vs-button>
      </div>
    </template>
    <ResponseModal :modal.sync="modal" :message="message" />
  </vs-dialog>
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
        pastDate: function() {
          var agendamento = document
            .getElementById("#agend")
            .val()
            .split("T");
          agendamento = new Date(agendamento[0]).setHours(24);
          var hoje = new Date();
          if (agendamento <= hoje) {
            alert("Por favor, insira uma data válida!");
          }
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
        this.dateEnd.date + " " + this.dateEnd.time + ":00Z"
      );
      const duration = (end - start) / 1000 / 60 / 60 / 24;
      const data = {
        titulo: this.title,
        descricao: this.description,
        data_inicio:
          this.dateStart.date + " " + this.dateStart.time + ":00.000Z",
        data_fim: this.dateEnd.date + " " + this.dateEnd.time + ":00.000Z",
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
.modalBg {
  position: absolute;
  bottom: 0;
  right: 0;
}

.theme--light.v-messages {
  display: flex !important;
  color: red;
}

#input-56 {
  color: #004f8b !important;
  text-transform: uppercase;
  font-weight: bold;
}

.inputControl {
  max-width: 200px !important;
  color: "#002b4b";
  font-weight: bold;
}

.gridControl {
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 70%;
  padding-left: unset;
}

.closeBtn {
  width: 200px;
}
.confirmBtn {
  margin-bottom: 2% !important;
  width: 200px;
  background-color: #004f8b !important;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body {
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
