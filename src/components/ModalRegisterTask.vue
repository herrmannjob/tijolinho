<script>
import ResponseModal from "@/components/ResponseModal.vue";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
export default {
  name: "ModalRegisterTask",
  components: { ResponseModal },
  props: {
    form: Boolean,
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
      status: ["A iniciar", "Em andamento", "Parado", "Finalizado"],
      selected_status: "A iniciar",
    };
  },
  methods: {
    close() {
      this.name = "";
      this.dateInit = "";
      this.dateEnd = "";
      this.estimated_spend = "";
      this.$emit("update:form", false);
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
        this.message.title = "Tarefa cadastrada com sucesso!";
      } else {
        this.message.title = "Ocorreu um erro...";
        this.message.text = response.error;
      }
      this.modal = true;
      this.$emit("update:form", false);
      this.$emit("update:refresh", true);
    },
  },
};
</script>
<template>
  <v-dialog v-model="form" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Cadastrar Tarefa</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nome da tarefa"
                :close-on-content-click="false"
                required
              ></v-text-field>

              <v-menu
                ref="menuInit"
                v-model="menuDateInit"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateInit"
                    label="Data de inicio"
                    readonly
                    required
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="pickerInit"
                  v-model="dateInit"
                  min="1950-01-01"
                ></v-date-picker>
              </v-menu>

              <v-menu
                ref="menuEnd"
                v-model="menuDateEnd"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateEnd"
                    label="Termino previsto"
                    readonly
                    required
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="pickerEnd"
                  v-model="dateEnd"
                  :min="dateInit"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Gasto estimado"
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
                label="Depende de..."
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
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          depressed
          class="btn-primario"
          @click="addTarefa()"
        >
          SALVAR
        </v-btn>
        <v-btn color="primary" text @click="close">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
    <ResponseModal :modal.sync="modal" :message="message" />
  </v-dialog>
</template>

<style lang="css">
.btn-container-client {
  width: 11rem;
  display: flex;
  flex-direction: row;
  margin: auto;
  align-items: flex-end;
  margin-top: 2rem;
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
.v-text-field .v-input__control {
  color: #002b4b;
  width: 15rem;
  margin: inherit;
}
.return {
  color: #002b4b !important;
  margin: 0;
  text-decoration: none;
  margin-left: 30rem;
}
.v-menu__content {
  align-self: center !important;
  justify-self: center !important;
}
.init-client {
  width: 8rem;
  margin-top: 1rem;
  background-color: white;
}
.middle-client {
  width: 1rem;
  font-weight: bold;
  margin-left: 16rem;
  text-decoration: none;
}
.end-client {
  width: 1rem;
  margin-left: 2.5rem;
  margin-top: 1.7rem;
}
.img-radius:hover .teste {
  transform: rotateY(0deg);
}
.card {
  position: relative;
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;
  text-align: center;
  border-radius: 50%;
  line-height: 5rem;
  color: #f3eff5;
  transform-style: preserve-3d;
}
.side {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  backface-visibility: hidden;
  transition: transform 0.5s ease-in-out;
}

.side--front {
  background: #002b4b;
  font-size: 3px;
}

.side--back {
  background: white;
  font-size: 8px;
  align-items: baseline;
  transform: rotateY(180deg);
}

.card:hover .side--front {
  transform: rotateY(-180deg);
}

.card:hover .side--back {
  transform: rotateY(0deg);
}

.card:hover .facebook {
  transform: rotateY(0deg);
  background: #00457a;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body {
    overflow-x: auto;
    overflow-y: auto;
  }
  .form-container-client {
    display: block;
    flex-direction: column;
  }
  .btn-container-client {
    display: flex;
    flex-direction: column;
  }
  .middle-client {
    display: none;
  }
  .v-picker {
    border-radius: 4px;
    contain: layout style;
    display: inline-flex;
    flex-direction: column;
    font-size: 1rem;
    vertical-align: center;
    position: relative;
  }
}
</style>
