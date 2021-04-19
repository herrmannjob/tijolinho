<script>
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";

export default {
  name: "FinancialComponent",
  mixins: [FirebaseMixin],
  props: {
    user: String,
    obraID: String,
  },
  data: () => ({
    items_forma_pagamento: ['Transferencia/Pix', 'Boleto', 'Cartão', 'Cheque'],
    items_tipo_pagamento: ['A vista', 'Parcelado', 'Sinal + Parcelas', 'Sinal + Ao finalizar'],
    outlinedColor: "#002b4b",
    client_names: [],
    clients: [],
    companies: [],
    constructions: [],
    constructions_names: [],
    end: "",
    endMenu: false,
    extendOriginal: null,
    form: false,
    parcelas: "",
    ready: false,
    refresh: false,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    start: "",
    startMenu: false,
    user_email: "",
    value: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Serviço",
        align: "start",
        sortable: false,
        value: "servico",
      },
      { text: "Fornecedor", value: "fornecedor" },
      { text: "Valor", value: "valor_total" },
      { text: "Forma de Pagamento", value: "forma_pagamento" },
      { text: "Pagamento", value: "pagamento" },
      { text: "Parcelas", value: "parcelas" },
      { text: "Vencimento da Parcela", value: "data_vencimento" },
      { text: "Data do Fechamento do Pedido", value: "data_fechamento" },
      { text: "Data da Entrega do Produto", value: "data_entrega" },
      { text: "Anexos", value: "anexos" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    orcamentos: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    spent_money: null,
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Item" : "Editar Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getFinances();
  },

  async mounted() {
    await Firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user_email = user.email;
        await this.getUser();
        await this.getClients();
      }
    });
  },
  async updated() {
    if (this.refresh) {
      await this.getFinances();
      this.refresh = false;
    }
  },
  methods: {
    async getUser() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "Usuario",
        "email",
        this.user_email
      );
      this.username = response.documents[0].data.nome;
    },

    async getClients() {
      await this.getCompanies();
      if (this.companies.length > 0) {
        let client_ids = [];
        this.companies.map((company) => {
          company.usuarioID.map((client) => {
            if (client !== this.user_email) client_ids.push(client);
          });
        });
        if (client_ids.length > 0) {
          this.clients = [];
          this.client_names = [];
          client_ids.map(async (item) => {
            const response = await this.getDocument(
              Firebase.firestore(),
              "Usuario",
              "id",
              item
            );
            this.clients.push(response.documents[0].data);
            this.client_names.push(response.documents[0].data.nome);
          });
        }
      }
    },
    async getCompanies() {
      const response = await this.getDocumentList(
        Firebase.firestore(),
        "Empresa",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.companies = response.documents;
      }
    },
    async getFinances() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "Financeiro",
        "obraID",
        this.obraID
      );
      if (response.status === "ok") {
        response.documents.map((item) => {
          this.orcamentos.push(item.data);
        });
      }
    },

    async getCronograma() {
      const cronogramas = await this.getDocument(
        Firebase.firestore(),
        "CronogramaObra",
        "obraID",
        this.construction.id
      );
      this.cronograma_obra = cronogramas.documents[0].data;
      this.spent_money = parseInt(this.cronograma_obra.gasto_total);
    },

    editItem(item) {
      this.editedIndex = this.orcamentos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.orcamentos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.orcamentos.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.orcamentos[this.editedIndex], this.editedItem);
      } else {
        this.orcamentos.push(this.editedItem);
      }
      const data = {
        servico: this.editedItem.servico,
        data_fechamento: this.editedItem.data_fechamento,
        data_entrega: this.editedItem.data_entrega,
        fornecedor: this.editedItem.fornecedor,
        anexos: this.editedItem.anexos,
        valor_total: this.editedItem.valor_total,
        forma_pagamento: this.editedItem.forma_pagamento,
        pagamento: this.editedItem.pagamento,
        parcelas: this.editedItem.parcelas,
        data_vencimento: this.editedItem.data_vencimento,
        usuarioID: this.user,
        obraID: this.obraID,
      };
      const response = await this.firebaseCreate(
        Firebase.firestore(),
        "Financeiro",
        null,
        data
      );
      await this.firebaseUpdate(
        Firebase.firestore(),
        "Financeiro",
        response.created_id,
        { id: response.created_id }
      );
      console.log("resposta salvar", response);
      await this.saveCronograma();
      this.close();
    },
    async saveCronograma() {
      const data = parseInt(this.editedItem.gasto_total) + this.spent_money;
      const response = await this.firebaseUpdate(
        Firebase.firestore(),
        "Financeiro",
        this.obraID,
        { gasto_total: data }
      );
      console.log("resposta salvar", response);
    },
  },
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="orcamentos"
    sort-by="data_fechamento"
    class="elevation-1"
    item-key="name"
    show-expand
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="toolbar-text">Minhas Finanças</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <vs-button
              :color="outlinedColor"
              type="gradient"
              class="mb-2 button-font"
              v-bind="attrs"
              v-on="on"
            >
              Novo Item
            </vs-button>
          </template>
          <vs-dialog v-model="dialog" max-width="800px" prevent-close>
            <template #header>
              <h4 class="not-margin">{{ formTitle }}</h4>
            </template>
            <v-container class="container-financial">
              <v-row>
                <v-col cols="12" sm="6">
                  <div class="group-data-item">
                    <vs-input
                      type="text"
                      v-model="editedItem.servico"
                      label="Serviço"
                      required
                    />
                    <vs-input
                      type="date"
                      v-model="editedItem.data_fechamento"
                      label="Data do Fechamento do Pedido"
                    />
                    <vs-input
                      type="date"
                      v-model="editedItem.data_entrega"
                      label="Data da Entrega do Produto"
                    />
                    <vs-input
                      type="text"
                      v-model="editedItem.fornecedor"
                      label="Fornecedor"
                      required
                    />
                    <vs-input
                      type="text"
                      v-model="editedItem.anexos"
                      label="Anexos"
                      required
                    />
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="group-data-item">
                    <vs-input
                      v-model="editedItem.valor_total"
                      v-mask="'###.###.###,##'"
                      label="Valor"
                      required
                      ><template #icon> <a>R$</a> </template></vs-input
                    >
                    <v-select :items="items_forma_pagamento" v-model="editedItem.forma_pagamento" label="Forma de Pagamento"></v-select>
                    <v-select :items="items_tipo_pagamento" v-model="editedItem.pagamento" label="Pagamento"></v-select>
                    <!-- <vs-select
                      filter
                      placeholder="Forma de Pagamento"
                      v-model="editedItem.forma_pagamento"
                    >
                      <vs-option
                        label="Transferencia/Pix"
                        value="Transferencia/Pix"
                      >
                        Transferencia/Pix
                      </vs-option>
                      <vs-option label="Boleto" value="Boleto">
                        Boleto
                      </vs-option>
                      <vs-option label="Cartão" value="Cartão">
                        Cartão
                      </vs-option>
                      <vs-option label="Cheque" value="Cheque">
                        Cheque
                      </vs-option>
                    </vs-select> -->
                    <!-- <vs-select
                      filter
                      placeholder="Pagamento"
                      v-model="editedItem.pagamento"
                    >
                      <vs-option label="A vista" value="A vista">
                        A vista
                      </vs-option>
                      <vs-option label="Parcelado" value="Parcelado">
                        Parcelado
                      </vs-option>
                      <vs-option
                        label="Sinal + Parcelas"
                        value="Sinal + Parcelas"
                      >
                        Sinal + Parcelas
                      </vs-option>
                      <vs-option
                        label="Sinal + Ao finalizar"
                        value="Sinal + Ao finalizar"
                      >
                        Sinal + Ao finalizar
                      </vs-option>
                    </vs-select> -->
                    <vs-input
                      v-if="
                        editedItem.pagamento == 'Parcelado' ||
                          editedItem.pagamento == 'Sinal + Parcelas'
                      "
                      type="number"
                      placeholder="Máx 24 parcelas"
                      v-mask="'##'"
                      :max="24"
                      v-model="editedItem.parcelas"
                      label="Parcelas"
                      required
                    />
                    <vs-input
                      type="date"
                      v-model="editedItem.data_vencimento"
                      label="Vencimento da Parcela"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Salvar
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </vs-dialog>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Você realmente quer excluir este item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Não</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Sim</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-if="parcelas > 1" v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">More info about {{ item.name }}</td>
    </template>
  </v-data-table>
</template>

<style scoped lang="scss">
.group-data-item {
  display: grid;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  height: 180%;
  padding-left: unset;
}
.container-financial {
  padding: 30px;
  padding-bottom: 200px;
}
.toolbar-text {
  font-family: "Comfortaa", cursive;
}
.button-font {
  font-family: "Comfortaa", cursive !important;
  font-size: 14px;
  width: 15%;
}
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: "";
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
.menu-flex {
  display: flex;
}

.v-event-draggable {
  padding-left: 6px;
  color: white;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: "";
  }

  &:hover::after {
    display: block;
  }
}

@media only screen and (max-width: 1000px) {
  .button-font {
    font-family: "Comfortaa", cursive !important;
  }
}

@media only screen and (max-width: 768px) {
}

@media only screen and (max-height: 700px) {
  .button-font {
    width: 20%;
  }
}
</style>
