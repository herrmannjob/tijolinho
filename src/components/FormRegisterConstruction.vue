<template>
  <v-dialog v-model="form" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Cadastrar Obra</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                label="Nome"
                :close-on-content-click="false"
                required
              ></v-text-field>
              <v-select
                v-model="category"
                :items="categoria"
                :close-on-content-click="false"
                :menu-props="{ top: true, offsetY: true }"
                label="Categoria"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-menu
                ref="menuInit"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateInit"
                    label="Data de inicio"
                    prepend-icon="mdi-calendar"
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
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateEnd"
                    label="Termino previsto"
                    prepend-icon="mdi-calendar"
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
              <v-text-field
                label="Gasto estimado"
                v-model="estimated_spend"
                required
                hint="Apenas números"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Cep"
                required
                v-model="cep"
                @change="searchCep"
                @keyup="searchCep()"
              ></v-text-field>
              <v-text-field
                v-model="cidade"
                label="Cidade"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="estado"
                label="Estado"
                required
              ></v-text-field>
              <v-text-field
                v-model="logradouro"
                label="Rua"
                required
              ></v-text-field>
              <v-text-field label="Complemento" required v-model="complemento"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">
          Cancelar
        </v-btn>
        <v-btn color="blue darken-1" text @click="addObra()">
          SALVAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Functions from '@/functions/Functions'
import { DataStore } from 'aws-amplify'
import { TipoObra, Endereco, Obra, CronogramaObra } from '@/models'
export default {
  name: 'FormRegisterConstruction',
  props: {
    form: Boolean,
    user_id: String,
    company: Object,
    client: Object
  },
  data() {
    return {
      /* eslint-disable no-mixed-spaces-and-tabs */
      cep: null,
      estado: null,
      logradouro: null,
      cidade: null,
      complemento: null,
      data: null,
      messageCep: null,
      date: '',
      dateInit: '',
      dateEnd: '',
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
      category: "",
      estimated_spend: "",
      endereco: null,
      obra: null,
    };
  },
  methods: {
    close () {
      this.$emit('update:form', false)
    },
    async searchCep() {
      if (this.cep.length == 8) {
        const response = await Functions.searchCep(this.cep)
        this.logradouro = response.data.logradouro
        this.cidade = response.data.localidade
        this.estado = response.data.uf
        this.complemento = response.data.complemento
      }
    },
    async addAddress () {
      const items = await DataStore.query(Endereco, d => d.cep("eq", this.cep))
      if (items.length === 0) {
        const data = {
          "cep": this.cep,
          "estado": this.estado,
          "cidade": this.cidade,
          "rua": this.logradouro,
          "complemento": this.complemento
        }
        const response = await Functions.putData(Endereco, data)
        if (response.status === 'ok') {
          console.log("Endereço cadastrado com sucesso!")
          this.endereco = response.data
        } else {
          console.log("erro: " + response.error.message)
        }
      } else this.endereco = items[0]
    },
    async addTipoObra () {
      const items = await DataStore.query(TipoObra, d => d.nome("eq", this.category))
      if (items.length === 0) {
        const response = await Functions.putData(TipoObra, {
          "nome": this.category,
        })
        if (response.status === 'ok') {
          console.log("TipoObra cadastrado com sucesso!")
          this.tipo_obra = response.data
        } else {
          console.log("erro: " + response.error.message)
        }
      } else {
        this.tipo_obra = items[0]
      }
    },
    async addObra () {
      await this.addAddress()
      await this.addTipoObra()
      const response = await DataStore.save(
        new Obra({
          "nome": this.firstname,
          "Endereco": this.endereco,
          "TipoObra": this.tipo_obra,
          "Empresa": this.company,
          "usuarioID": this.user_id,
          "Usuarios": this.client.nome === "empty" ? [] : [this.client]
        })
      )
      if (response.status === 'ok') {
        console.log("Obra cadastrada com sucesso!")
        this.obra = response.data
        this.addCronogramaObra()
      } else {
        console.log("erro: " + response.error.message)
      }
    },
    async addCronogramaObra () {
      const start = new Date(this.dateInit)
      const end = new Date(this.dateEnd)
      const duration = end - start
      const response = await DataStore.save(
        new CronogramaObra({
          "Obra_": this.obra,
          "data_inicio": this.dateInit + 'Z',
          "data_fim": this.dateEnd + 'Z',
          "tempo_previsto": duration,
          "gasto_previsto": this.estimated_spend
        })
      )
      if (response.status === 'ok') {
        console.log("CronogramaObra cadastrado com sucesso!")
      } else {
        console.log("erro: " + response.error.message)
      }
    },
  },
}
</script>
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
