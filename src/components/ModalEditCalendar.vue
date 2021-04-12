<script>
import ResponseModal from "@/components/ResponseModal.vue";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
import moment from "@/plugins/moment";
export default {
  name: "ModalEditCalendar",
  components: { ResponseModal },
  mixins: [FirebaseMixin],
  props: {
    formEditCalendar: Boolean,
    refresh: Boolean,
    date: String,
    user: String,
    editedEvent: {},
  },
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
      title: "",
      user_email: "",
      username: "",
      id_generated: "",
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
  async mounted() {
    await Firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user_email = user.email;
        await this.getUser();
      }
    });
  },
  methods: {
    handleClose() {
      this.$emit("update:formEditCalendar", false);
      this.editedEvent = [];
    },
    close() {
      this.title = "";
      this.description = "";
      this.date_end = "";
      this.time_end = "";
      this.priority = "";
      this.$emit("update:refresh", true);
    },
    async getUser() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "Usuario",
        "email",
        this.user_email
      );
      this.username = response.documents[0].data.nome;
    },
    async update() {
      const start = moment(this.editedEvent.startDate);
      const end = moment(this.editedEvent.endDate);
      const duration = moment.duration(end.diff(start));
      const durationDays = duration.asDays();
      const data = {
        titulo: this.editedEvent.name,
        descricao: this.editedEvent.details,
        data_inicio:
          this.editedEvent.startDate +
          " " +
          this.editedEvent.startTime +
          ":00.000Z",
        data_fim:
          this.editedEvent.endDate +
          " " +
          this.editedEvent.endTime +
          ":00.000Z",
        duracao: `${durationDays} dia(s)`,
        prioridade: this.editedEvent.priority,
        usuarioID: this.user,
      };
      this.id_generated = this.editedEvent.id;
      await this.firebaseUpdate(
        Firebase.firestore(),
        "AgendaParticular",
        this.id_generated,
        data
      )
        .then(() => {
          this.modal = true;
          this.message.title = "Atividade atualizada com sucesso!";
          this.handleClose();
          this.$emit("update:formEditCalendar", false);
        })
        .catch((error) => {
          this.modal = true;
          this.message.title = "Ocorreu um erro...";
          this.message.code = error;
          this.message.text = error;
        });
      this.$emit("update:refresh", true);
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
<template>
  <vs-dialog
    @close="handleClose"
    class="modalBg"
    max-width="350px"
    v-model="formEditCalendar"
    prevent-close
  >
    <template #header>
      <h4 class="not-margin">Editar <b>Tarefa</b></h4>
    </template>
    <div class="con-form">
      <v-col cols="12" class="gridControl">
        <vs-input
          class="inputControl"
          color="#002b4b"
          border
          type="text"
          v-model="editedEvent.name"
          :rules="[rules.required]"
          label-placeholder="Atividade"
        >
        </vs-input>

        <vs-select
          class="inputControl"
          label-placeholder="Prioridade"
          :options="priority_list"
          v-model="editedEvent.priority"
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
              v-model="editedEvent.startDate"
              label="Data Inicial"
              required
              :min="today"
            />
          </template>
        </div>

        <div class="inputControl">
          <template>
            <vs-input
              type="time"
              v-model="editedEvent.startTime"
              label="Horário Inicial"
              required
            />
          </template>
        </div>

        <div class="inputControl">
          <template>
            <vs-input
              type="date"
              v-model="editedEvent.endDate"
              label="Data Final"
              required
            />
          </template>
        </div>

        <div class="inputControl">
          <template>
            <vs-input
              type="time"
              v-model="editedEvent.endTime"
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
          v-model="editedEvent.details"
          label="Observações"
        >
        </vs-input>
      </v-col>
    </div>
    <template #footer>
      <div class="footer-dialog">
        <vs-button
          :disabled="!editedEvent.name"
          class="confirmBtn"
          block
          @click="update"
        >
          Atualizar Evento
        </vs-button>
      </div>
    </template>
    <ResponseModal :modal.sync="modal" :message="message" />
  </vs-dialog>
</template>
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
