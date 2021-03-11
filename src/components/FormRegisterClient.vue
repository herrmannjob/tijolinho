<template>
  <div data-app>
    <h5 style="margin:1rem">Novo cliente:</h5>
    <div class="form-container-client">
      <!-- <div class="init-client">
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
      </div> -->
      <v-form v-model="valid" style="justify-self:center">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              label="Nome do cliente"
              required
            ></v-text-field>

            <v-text-field
              label="Telefone"
              v-model="phone"
              placeholder="+55 84 98765 4321"
              :rules="phone_rules"
              required>
            </v-text-field>

            <v-text-field
              v-model="email"
              :rules="email.length > 0 ? emailRules : []"
              label="E-mail (opcional)"
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
                  label="Data de Nascimento (opcional)"
                  prepend-icon="mdi-calendar"
                  readonly
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
            <v-text-field label="Nome do cônjuge (opcional)" v-model="firstnameConjuge"></v-text-field>
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
                  label="Data de Nascimento do Conjuge (opcional)"
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
          </v-col>
          <div>
            <v-btn
              elevation="2"
              depressed
              class="btn-primario btn-save"
              @click="addUser()"
            >
              <p class="button-primario">SALVAR DADOS</p>
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="voltar"
            >
              Voltar
            </v-btn>
          </div>
          <v-dialog
            v-model="confirm"
            persistent
            max-width="450"
          >
            <v-card>
              <v-card-title class="headline">
                {{ confirm_message }}
              </v-card-title>
              <v-card-text>
                Deseja vincular uma obra a esse cliente?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  class="btn-primario"
                  depressed
                  @click="form = true"
                >
                  CADASTRAR OBRA
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="confirm = false"
                >
                  Agora não
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <FormRegisterConstruction :form.sync="form" :confirm.sync="confirm" :refresh.sync="refresh" :user_id="user_email" :company="company.id" :client="client_id" />
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
import Firebase from "@/services/Firebase"
import { FirebaseMixin } from "@/mixins/FirebaseMixin"
export default {
  name: 'FormRegisterClient',
  components: { FormRegisterConstruction },
  mixins: [FirebaseMixin],
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
        (v) => !isNaN(Number(v)) || "Telefone com 13 dígitos - +55 84 98765 4321",
      ],
      lastname: "",
      nameRules: [(v) => !!v || "Nome é obrigatório"],
      email: "",
      password: "",
      emailRules: [
        (v) => /.+@.+/.test(v) || "E-mail precisa ser em um formato válido",
      ],
      tipo_usuario: null,
      user: {},
      company: {},
      client: {nome: "empty"},
      confirm: false,
      confirm_message: "Cliente cadastrado com sucesso!",
      user_email: '',
      client_id: '',
      refresh: false
    }
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
  updated () {
    if (this.refresh) {
      this.firstname = ''
      this.email = '',
      this.phone = '',
      this.dateNasc = null,
      this.firstnameConjuge = '',
      this.dateNascConj = null,
      this.refresh = false
    }
  },
  async mounted () {
    await Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user_email = user.email
        this.getCompany()
      }
      else this.$router.push("/")
    })
  },
  methods: {
    voltar () { this.$router.go(-1) },
    async getCompany () {
      const response = await this.getDocumentList(Firebase.firestore(), 'Empresa', 'usuarioID', this.user_email)
      if (response.status === 'ok') {
        this.company = response.documents[0]
      }
    },
    async updateCompany () {
      if (!this.company.usuarioID.includes(this.client_id)) {
        this.company.usuarioID.push(this.client_id)
        const data = {
          enderecoID: this.company.enderecoID,
          id: this.company.id,
          nome: this.company.nome,
          telefone: this.company.telefone,
          usuarioID: this.company.usuarioID
        }
        const response = await this.firebaseCreate(Firebase.firestore(), 'Empresa', data.id, data)
        if (response.status === 'ok') this.company = data
      }
    },
    async addTipoUsuario () {
      const response = await this.getDocument(Firebase.firestore(), 'TipoUsuario', 'id', 'cliente')
      if (response.status === 'empty') await this.firebaseCreate(Firebase.firestore(), 'TipoUsuario', 'cliente', { id: "cliente", nome: 'Cliente' })
      this.tipo_usuario = 'cliente'
    },

    async addUser () {
      await this.addTipoUsuario()
      const response = await this.getDocument(Firebase.firestore(), 'Usuario', 'email', this.email)
      if (response.status === 'empty') {
        const data = {
          nome: this.firstname,
          email: this.email,
          telefone: this.phone,
          data_nascimento: this.dateNasc,
          nome_conjuge: this.firstnameConjuge,
          data_nascimento_conjuge: this.dateNascConj,
          TipoUsuario: this.tipo_usuario,
        }
        const client = await this.firebaseCreate(Firebase.firestore(), 'Usuario', null, data)
        await this.firebaseUpdate(Firebase.firestore(), 'Usuario', client.created_id, {id: client.created_id})
        this.client_id = client.created_id
        this.confirm = true
      } else {
        this.client_id = response.documents[0].id
        this.confirm_message = `Já existe um usuário com este email ${this.email}!`
        this.confirm = true
      }
      this.updateCompany()
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
.btn-save {
  margin-top: unset;
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
  display: grid;
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
