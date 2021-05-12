<script>
import Functions from "@/functions/Functions";
import ResponseModal from "@/components/ResponseModal.vue";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
export default {
  name: "ModalRegisterConstruction",
  components: { ResponseModal },
  props: {
    formConstruction: Boolean,
    confirm: Boolean,
    user: String,
    clientId: String,
    company: String,
  },
  mixins: [FirebaseMixin],
  data() {
    return {
      /* eslint-disable no-mixed-spaces-and-tabs */
      outlinedColor: "#002b4b",
      cep: null,
      estado: null,
      logradouro: null,
      cidade: null,
      complemento: null,
      data: null,
      messageCep: null,
      date: "",
      dateInit: "",
      dateEnd: "",
      categoria: [
        "Residencial",
        "Reforma",
        "Comercial",
        "Restauração",
        "Criação",
      ],
      tipo_obra: null,
      firstname: "",
      nameRules: [(v) => !!v || "Nome é obrigatório"],
      email: "",
      phone: "",
      construction_category: "",
      construction_type: "",
      estimated_spend: "",
      endereco: null,
      obra: null,
      menuDateInit: null,
      menuDateEnd: null,
      modal: false,
      message: { title: "", text: "" },
      idRota: this.$globalValue,
      construction_amount: [],
    };
  },
  async mounted() {
    await this.getQuantidadeObra();
  },
  methods: {
    handleClose() {
      this.$emit("update:formConstruction", false);
    },
    async searchCep() {
      if (this.cep.length == 9) {
        const response = await Functions.searchCep(this.cep);
        this.logradouro = response.data.logradouro;
        this.cidade = response.data.localidade;
        this.estado = response.data.uf;
        this.complemento = response.data.complemento;
      }
    },
    async addAddress() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "Endereco",
        "cep",
        this.cep
      );
      if (response.status === "empty") {
        const data = {
          id: this.cep,
          cep: this.cep,
          estado: this.estado,
          cidade: this.cidade,
          rua: this.logradouro,
          complemento: this.complemento,
        };
        await this.firebaseCreate(
          Firebase.firestore(),
          "Endereco",
          this.cep,
          data
        );
      }
    },
    async addTipoObra() {
      const constructionType = this.construction_type.toLowerCase();
      const response = await this.getDocument(
        Firebase.firestore(),
        "TipoObra",
        "id",
        constructionType
      );
      if (response.status === "empty") {
        const data = {
          nome: this.construction_type,
        };
        await this.firebaseCreate(
          Firebase.firestore(),
          "TipoObra",
          constructionType,
          data
        );
      }
    },
    async addCategoriaObra() {
      const constructionCategory = this.construction_category.toLowerCase();
      const response = await this.getDocument(
        Firebase.firestore(),
        "CategoriaObra",
        "id",
        constructionCategory
      );
      if (response.status === "empty") {
        const data = {
          nome: this.construction_category,
        };
        await this.firebaseCreate(
          Firebase.firestore(),
          "CategoriaObra",
          constructionCategory,
          data
        );
      }
    },
    async addObra() {
      await this.addAddress();
      await this.addTipoObra();
      await this.addCategoriaObra();
      const data = {
        nome: this.firstname,
        enderecoID: this.cep,
        tipoObra: this.construction_type,
        categoriaObra: this.construction_category,
        empresaID: this.company,
        usuarioID: this.user,
        usuarios: this.clientId,
      };
      const response = await this.firebaseCreate(
        Firebase.firestore(),
        "Obra",
        null,
        data
      );
      console.log("resposta", response);
      await this.firebaseUpdate(
        Firebase.firestore(),
        "Obra",
        response.created_id,
        { id: response.created_id }
      );
      if (response.status === "ok") {
        await this.updateClient();
        this.obra = response.created_id;
        this.addCronogramaObra();
      }
    },
    async getQuantidadeObra() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "Obra",
        "usuarios",
        this.clientId
      );
      if (response.status === "ok") {
        response.documents.map((item) => {
          this.construction_amount.push(item.data);
        });
        console.log(this.construction_amount.length);
      }
    },
    async updateClient() {
      await this.firebaseUpdate(
        Firebase.firestore(),
        "Usuario",
        this.clientId,
        { quantidade_obra: this.construction_amount.length }
      );
    },
    async addCronogramaObra() {
      const start = new Date(this.dateInit);
      const end = new Date(this.dateEnd);
      const duration = end - start;
      const data = {
        obraID: this.obra,
        data_inicio: this.dateInit,
        data_fim: this.dateEnd,
        tempo_previsto: `${duration} ms`,
        gasto_previsto: this.estimated_spend,
      };
      const response = await this.firebaseCreate(
        Firebase.firestore(),
        "CronogramaObra",
        null,
        data
      );
      await this.firebaseUpdate(
        Firebase.firestore(),
        "CronogramaObra",
        response.created_id,
        { id: response.created_id }
      );
      if (response.status === "ok") {
        this.modal = true;
        this.message.title = "Obra cadastrada com sucesso!";
      } else {
        this.message.title = "Ocorreu um erro...";
        this.message.text = response.error;
      }
      this.$emit("update:formConstruction", false);
      this.$emit("update:confirm", false);
      this.$emit("update:refresh", true);
    },
  },
};
</script>
<template>
  <vs-dialog
    @close="handleClose"
    blur
    v-model="formConstruction"
    max-width="800px"
    prevent-close
  >
    <template #header>
      <h4 class="not-margin">Cadastrar <b>Obra</b></h4>
    </template>
    <div class="con-form">
      <v-row>
        <v-col cols="12" md="6">
          <div class="group-data-construction">
            <vs-input
              type="text"
              v-model="firstname"
              label="Nome da obra"
              required
            />

            <vs-select
              filter
              placeholder="Categoria"
              v-model="construction_category"
              required
            >
              <vs-option label="Residencial" value="Residencial">
                Residencial
              </vs-option>
              <vs-option label="Comercial" value="Comercial">
                Comercial
              </vs-option>
              <vs-option label="Institucional" value="Institucional">
                Institucional
              </vs-option>
              <vs-option label="Restauração" value="Restauração">
                Restauração
              </vs-option>
            </vs-select>

            <vs-select
              filter
              placeholder="Tipo de Obra"
              v-model="construction_type"
              required
            >
              <vs-option label="Obra do Zero" value="Obra do Zero">
                Obra do Zero
              </vs-option>
              <vs-option label="Reforma" value="Reforma">
                Reforma
              </vs-option>
              <vs-option label="Decoração" value="Decoração">
                Decoração
              </vs-option>
            </vs-select>

            <vs-input type="date" v-model="dateInit" label="Data de Início" />

            <vs-input type="date" v-model="dateEnd" label="Termino previsto" />

            <vs-input
              id="orcamento"
              v-model="estimated_spend"
              v-mask="'###.###.###,##'"
              label="Orçamento estimado"
              ><template #icon> <a>R$</a> </template></vs-input
            >
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Cep"
            required
            v-model="cep"
            v-mask="'#####-###'"
            @change="searchCep"
            @keyup="searchCep()"
          ></v-text-field>
          <v-text-field v-model="cidade" label="Cidade" required></v-text-field>
          <v-text-field v-model="estado" label="Estado" required></v-text-field>
          <v-text-field
            v-model="logradouro"
            label="Rua"
            required
          ></v-text-field>
          <v-text-field
            label="Complemento"
            required
            v-model="complemento"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <template #footer>
      <div class="footer-dialog">
        <vs-button
          :color="outlinedColor"
          block
          class="btn-primario"
          @click="addObra()"
        >
          SALVAR
        </vs-button>
      </div>
    </template>
    <ResponseModal :modal.sync="modal" :message="message" />
  </vs-dialog>
</template>

<style lang="css">
.group-data-construction {
  display: grid;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  height: 100%;
  padding-left: unset;
}

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
}
</style>
