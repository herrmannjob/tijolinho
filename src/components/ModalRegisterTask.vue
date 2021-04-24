<script>
import ResponseModal from "@/components/ResponseModal.vue";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
export default {
  name: "ModalRegisterTask",
  components: { ResponseModal },
  props: {
    formTask: Boolean,
    user: String,
    cronograma_obra: String,
    tasks: Array,
    task_names: Array,
  },
  mixins: [FirebaseMixin],
  data() {
    return {
      /* eslint-disable no-mixed-spaces-and-tabs */
      name: "",
      nameRules: [(v) => !!v || "Nome é obrigatório"],
      dateInit: "",
      dateEnd: "",
      today: new Date(),
      estimated_spend: "",
      menuDateInit: null,
      menuDateEnd: null,
      modal: false,
      message: { title: "", text: "" },
      // tasks: [],
      selected_task: "",
      status: ["A iniciar", "Em andamento", "Finalizado"],
      selected_status: "A iniciar",
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:formTask", false);
    },

    async addStatusTarefa() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "StatusTarefa",
        "nome",
        this.selected_status
      );
      if (response.status === "empty")
        await this.firebaseCreate(
          Firebase.firestore(),
          "StatusTarefa",
          this.selected_status,
          { nome: this.selected_status }
        );
    },

    addTask() {
      this.tasks.push({
        id: this.lastId++,
        label:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
        user: this.user,
        start: this.dateInit,
        duration: 1 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: "project",
      });
    },

    async addTarefa() {
      await this.addStatusTarefa();
      const i = this.task_names.indexOf(this.selected_task);
      const start = new Date(this.dateInit + "T00:00:00");
      const end = new Date(this.dateEnd + "T00:00:00");
      const planned = (end - start) / 86400000;
      const elapsed = ((this.today - start) / 86400000) | 0;
      const data = {
        name: this.name,
        usuarioID: this.user, // responsavel => Para manter o padrão
        start: this.dateInit,
        end: this.dateEnd,
        progress: (elapsed / planned) * 100,
        dependencies: this.selected_task.length ? this.tasks[i].id : null,
        status: this.selected_status,
        cronograma_obra: this.cronograma_obra,
        gasto_previsto: this.estimated_spend,
      };
      const response = await this.firebaseCreate(
        Firebase.firestore(),
        "Tarefa",
        null,
        data
      );
      await this.firebaseUpdate(
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
        this.message.text = response.error;
      }
      this.$emit("update:formTask", false);
      this.$emit("update:refresh", true);
    },
  },
};
</script>
<template>
  <vs-dialog @close="handleClose" blur v-model="formTask" max-width="800px" prevent-close>
    <template #header>
      <h4 class="not-margin">Cadastrar <b>Tarefa</b></h4>
    </template>
    <div class="con-form">
      <v-row>
        <v-col cols="12" md="6">
          <div class="group-data-task">
            <vs-input
              type="text"
              v-model="name"
              label="Nome da tarefa"
              :rules="nameRules"
              required
            />

            <div class="inputControl">
              <template>
                <vs-input
                  id="agend"
                  type="date"
                  v-model="dateInit"
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
                  v-model="dateEnd"
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
            v-model="estimated_spend"
            required
            hint="Apenas números"
          ></v-text-field>

          <v-select
            v-if="task_names.length"
            v-model="selected_task"
            :items="task_names"
            :close-on-content-click="false"
            :menu-props="{ top: true, offsetY: true }"
            label="Depende da Tarefa"
          ></v-select>

          <v-select
            v-model="selected_status"
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

<style lang="css">
.group-data-task {
  display: grid;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  height: 120%;
  padding-left: unset;
}
.inputControl {
  margin-top: 2rem;
}
.inputFinal {
  margin-bottom: 2rem;
}
.v-card {
  color: #002b4b;
  font-family: "Comfortaa", cursive;
}
.btn-secundario {
  background: white;
  width: 11rem;
  margin-left: 10px;
  margin-top: 6px;
  margin-right: 1rem;
  font-size: 12px;
  font-family: "Roboto", sans-serif;
}
.form-container-client {
  display: flex;
  flex-direction: row;
  width: 100%;
  color: #002b4b;
  font-family: "Comfortaa", cursive;
  align-self: center;
  margin-top: 1rem;
  margin-right: 0.5rem;
  margin-left: 1rem;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body {
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
