<template>
  <div data-app>
    <h5 style="margin:1rem">Código do cliente:</h5>
    <div class="form-container-client">
      <div class="init-client">
        <v-flex
          xs12
          class="text-xs-center text-sm-center text-md-center text-lg-center"
        >
          <img :src="imageUrl" height="150" v-if="imageUrl" />
          <div @click="pickFile" class="card">
            <div class="side side--front ">
              <v-icon class="teste">mdi-image</v-icon>
            </div>
            <div class="side facebook side--back">Add Image</div>
            <input
              class="card"
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />
          </div>
        </v-flex>
      </div>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              label="Nome"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-menu
              ref="menuNasc"
              v-model="menuNasc"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateNasc"
                  label="Data de Nascimento"
                  prepend-icon="mdi-calendar"
                  readonly
                  required
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="pickerNasc"
                v-model="dateNasc"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="saveNasc"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field label="Conjuge" required v-model="firstnameConjuge"></v-text-field>
            <v-menu
              ref="menuNascConj"
              v-model="menuNascConj"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateNascConj"
                  label="Data de Nascimento do Conjuge"
                  prepend-icon="mdi-calendar"
                  readonly
                  required
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="pickerNascConj"
                v-model="dateNascConj"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="saveNascConj"
              ></v-date-picker>
            </v-menu>
            <v-text-field label="Telefone" v-model="phone" hint="Apenas números (13 dígitos)" placeholder="+55 84 98765 4321" :rules="phone_rules" required></v-text-field>
          </v-col>
          <div>
            <v-btn
              elevation="2"
              depressed
              class="btn-primario"
              @click="addUser()"
            >
              <p class="button-primario">SALVAR DADOS</p>
            </v-btn>
          </div>
          <v-btn
            color="primary"
            class="btn-secundario"
            outlined
            @click="form = true"
          >
            CADASTRAR OBRA
          </v-btn>
          <FormRegisterConstruction :form.sync="form" :user_id="user.id" :company="company" :client="client" />
        </v-row>
      </v-form>

      <div class="middle-client">
        <router-link class="return" to="/">
          <v-icon class="return">mdi-arrow-left</v-icon></router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import image from "../assets/register.png"
import FormRegisterConstruction from '@/components/FormRegisterConstruction'
import Functions from '@/functions/Functions'
import { DataStore } from 'aws-amplify'
import { Usuario, TipoUsuario, Empresa } from '@/models'
export default {
  name: 'FormRegisterClient',
  components: { FormRegisterConstruction },
  data() {
    return {
      /* eslint-disable no-mixed-spaces-and-tabs */
      title: "Image Upload",
      form: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      cep: null,
      estado: null,
      logradouro: null,
      cidade: null,
      data: null,
      messageCep: null,
      date: null,
      dateInit: null,
      dateEnd: null,
      dateNasc: null,
      dateNascConj: null,
      e1: 1,
      picker: new Date().toISOString().substr(0, 10),
      pickerInit: new Date().toISOString().substr(0, 10),
      pickerEnd: new Date().toISOString().substr(0, 10),
      pickerNasc: new Date().toISOString().substr(0, 10),
      pickerNascConj: new Date().toISOString().substr(0, 10),
      menu: false,
      menuInit: false,
      menuEnd: false,
      menuNasc: false,
      menuNascConj: false,
      categoria: [
        "Residencial",
        "Reforma",
        "Comercial",
        "Restauração",
        "Criação",
      ],
      image: image,
      valid: false,
      show: false,
      firstname: "",
      firstnameConjuge: "",
      phone: "",
      phone_rules: [
        (v) => !!v || "Telefone é obrigatório",
        (v) => v.length === 13 || "Telefone com 13 dígitos - +55 84 98765 4321",
      ],
      lastname: "",
      nameRules: [(v) => !!v || "Nome é obrigatório"],
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+/.test(v) || "E-mail precisa ser em um formato válido",
      ],
      tipo_usuario: null,
      user: null,
      company: null,
      client: {nome: "empty"}
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    menuInit(val) {
      val && setTimeout(() => (this.$refs.pickerInit.activePicker = "YEAR"));
    },
    menuEnd(val) {
      val && setTimeout(() => (this.$refs.pickerEnd.activePicker = "YEAR"));
    },
    menuNasc(val) {
      val && setTimeout(() => (this.$refs.pickerNasc.activePicker = "YEAR"));
    },
    menuNascConj(val) {
      val &&
        setTimeout(() => (this.$refs.pickerNascConj.activePicker = "YEAR"));
    },
  },
  async created () {
    this.user = await Functions.isAuth()
    await this.getUser()
    this.getCompany()
  },
  methods: {
    async getUser () {
      const user = await Functions.wichUserId(Usuario, this.user.attributes.email)
      this.user = user.data
    },
    async getCompany () {
      const response = await Functions.getAll(Empresa)
      if (response.status === 'ok') {
        const company = []
        response.data.filter(item => {
          if (item.usuarioID.includes(this.user.id)) company.push(item)
        })
        this.company = company[0]
      }
    },
    async updateCompany () {
      const empresa = this.company
      const empresa_clientes = empresa.usuarioID
      const response = await DataStore.save(
        Empresa.copyOf(empresa, updated => {
          updated.usuarioID = empresa_clientes.concat([this.client.id])
        })
      )
      console.log(response)
    },
    async addTipoUsuario () {
      const items = await DataStore.query(TipoUsuario, d => d.nome("eq", "Cliente"))
      if (items.length === 0) {
        const response = await Functions.putData(TipoUsuario, {
          "nome": "Cliente",
        })
        if (response.status === 'ok') {
          console.log("TipoUsuario cadastrado com sucesso!")
          this.tipo_usuario = response.data
        } else {
          console.log("erro: " + response.error.message)
        }
      } else {
        this.tipo_usuario = items[0]
      }
    },

    async addUser () {
      await this.addTipoUsuario()
      const items = await DataStore.query(Usuario, d => d.email("eq", this.email))
      if (items.length === 0) {
        this.phone = `+${this.phone.substr(0,2)} ${this.phone.substr(2,2)} ${this.phone.substr(4,5)} ${this.phone.substr(9,4)}`
        const response = await Functions.putData(Usuario, {
          "nome": this.firstname,
          "email": this.email,
          "telefone": this.phone,
          "data_nascimento": this.dateNasc + 'Z',
          "nome_conjuge": this.firstnameConjuge,
          "data_nascimento_conjuge": this.dateNascConj + 'Z',
          "TipoUsuario": this.tipo_usuario,
        })
        if (response.status === 'ok') {
          console.log("Usuário cadastrado com sucesso!")
          this.client = response.data
          this.updateCompany()
        } else {
          console.log("erro: " + response.error.message)
        }
      } else {
        console.log('email já cadastrado!')
        this.client = items[0]
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    saveInit(dateInit) {
      this.$refs.menuInit.save(dateInit);
    },
    saveEnd(dateEnd) {
      this.$refs.menuEnd.save(dateEnd);
    },
    saveNasc(dateNasc) {
      this.$refs.menuNasc.save(dateNasc);
    },
    saveNascConj(dateNascConj) {
      this.$refs.menuNascConj.save(dateNascConj);
    },
    pickFile() {
      this.$refs.image.click();
    },
    closeMyDialog() {
      this.dialog = false;
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
  },
};
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
