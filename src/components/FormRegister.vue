<template>
  <div class="container-register">
    <div>
      <img :src="image" />
    </div>
    <div style="width:60%">
      <h3>Bem vindo ao Tijolinho!</h3>
      <h4>
        Realize seu cadastro e tenha acesso a um gereciamento de projetos de
        arquitetura e engenharia inteligente!
      </h4>
      <div class="form-container">
        <v-stepper v-model="e1" data-app style="display:grid">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              <p>Perfil</p>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">
              <p>Empresa</p>
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12" height="550px">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container style="padding-bottom:unset">
                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="Name"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                    <v-text-field
                      class="text"
                      label="Senha*"
                      v-model="password"
                      :rules="passwordRules"
                      required
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show = !show"
                      :type="show ? 'text' : 'password'"
                    ></v-text-field>
                    <v-text-field
                      class="text"
                      required
                      label="Confirme sua senha*"
                      v-model="confirm_password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show = !show"
                      :type="show ? 'text' : 'password'"
                      :rules="confirmationPasswordRules"
                    ></v-text-field>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Data de nascimento*"
                          prepend-icon="mdi-calendar"
                          aria-required="true"
                          readonly
                          required
                         :rules="passwordRules"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="date"
                        required
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                      ></v-date-picker>
                    </v-menu>
                  </v-container>
                </v-form>

                <v-btn
                  color="primary"
                  :disabled="!valid"
                  v-on="validate ? { click: () => [(e1 = 2)] } : { disabled}"
             
                >
                  PRÓXIMO
                </v-btn>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card class="mb-12" color="grey lighten-1" height="700px">
                <v-form v-model="valid">
                  <v-text-field
                    label="Empresa"
                    v-model="company"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Telefone"
                    v-model="phone"
                    hint="Apenas números (13 dígitos)"
                    placeholder="+55 84 98765 4321"
                    :rules="phone_rules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Cep"
                    required
                    v-model="cep"
                    @change="searchCep(cep)"
                    @keyup="searchCep(cep)"
                  ></v-text-field>
                    <v-select
                    v-model="estado"
                    :items="items"
                    :error-messages="errors"
                    label="Estado"
                    required
                  ></v-select>
                  <v-text-field
                    v-model="cidade"
                    label="Cidade"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="logradouro"
                    label="Rua"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Complemento"
                    v-model="complemento"
                    required
                  ></v-text-field>
                </v-form>

                <v-btn color="primary" @click="signUp(),validate" :disabled="!valid">
                ENVIAR
                </v-btn>
                <v-btn text @click="e1 = 1">
                ANTERIOR
                </v-btn>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
    </div>
    <v-dialog v-model="error_dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Ops! acontenceu um erro!
        </v-card-title>

        <v-card-text>
          Tivemos um erro :(<br />
          {{ error }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="error_dialog = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div>
      <router-link class="link-back" to="/"><v-icon class="icon-back">mdi-arrow-left</v-icon></router-link>   
    </div>
  </div>
</template>
<script>
import image from "../assets/register.png";
import Functions from "@/functions/Functions";
import Firebase from "@/services/Firebase"
import { FirebaseMixin } from "@/mixins/FirebaseMixin"
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  /* eslint-disable no-mixed-spaces-and-tabs */
  mixins: [validationMixin, FirebaseMixin],

  validations: {
    name: { required },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  data() {
    return {
      e1: 1,
      picker: new Date().toISOString().substr(0, 10),
      menu: false,
      valid: false,
      disabled: false,
      name: "",
      nameRules: [
        (v) => !!v || "Nome é obrigatório",
      ],
       passwordRules: [
        (v) => !!v || "Campo obrigatório",
      ],
      email: "",
        dateRules: [
        (v) => !!v || "Campo obrigatório",
      ],
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser um formato válido"
      ],
      confirmationPasswordRules: [
        (v) => v !== this.email || "A confirmação de senha precisa ser igual com a senha informada",
      ],
      cep: "",
      estado: "",
      logradouro: "",
      cidade: "",
      complemento: "",
      endereco: null,
      data: null,
      image: image,
      show: false,
      password: "",
      confirm_password: "",
      code: "",
      items: ["AC","AL","AP",	"AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA",	
        "PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"	],
      confirm_code: false,
      date: null,
      company: "",
      phone: "",
      phone_rules: [
        (v) => !!v || "Telefone é obrigatório",
        (v) => v.length === 13 || "Telefone com 13 dígitos - +55 84 98765 4321",
      ],
      error_dialog: false,
      error: "",
      tipo_usuario: '',
    };
  },
  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"))
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async searchCep(cep) {
      if (cep.length == 8) {
        const response = await Functions.searchCep(cep)
        this.logradouro = response.data.logradouro
        this.cidade = response.data.localidade
        this.estado = response.data.uf
      }
    },
    null_or_empty(str) {
      var v = document.getElementById(str).value
      return v == null || v == ""
    },

    async addTipoUsuario() {
      await this.firebaseCreate(Firebase.firestore(), 'TipoUsuario', 'arquiteto', { id: "arquiteto", nome: 'Arquiteto(a)' })
      const response = await this.getDocument(Firebase.firestore(), 'TipoUsuario', 'id', 'arquiteto')
      if (response.status === 'empty') await this.firebaseCreate(Firebase.firestore(), 'TipoUsuario', 'arquiteto', { id: "arquiteto", nome: 'Arquiteto(a)' })
      this.tipo_usuario = 'arquiteto'
    },

    async addUser() {
      await this.addTipoUsuario()
      const response = await this.getDocument(Firebase.firestore(), 'Usuario', 'email', this.email)
      if (response.status === 'empty') {
        const data = {
          id: this.email,
          nome: this.name,
          email: this.email,
          data_nascimento: this.date,
          TipoUsuario: this.tipo_usuario,
        }
        await this.firebaseCreate(Firebase.firestore(), 'Usuario', this.email, data)
      }
    },

    async addAddress() {
      const response = await this.getDocument(Firebase.firestore(), 'Endereco', 'cep', this.cep)
      if (response.status === 'empty') {
        const data = {
          id: this.cep,
          cep: this.cep,
          estado: this.estado,
          cidade: this.cidade,
          rua: this.logradouro,
          complemento: this.complemento,
        }
        await this.firebaseCreate(Firebase.firestore(), 'Endereco', this.cep, data)
      }
    },

    async addEmpresa() {
      const id = this.company + this.cep
      const response = await this.getDocument(Firebase.firestore(), 'Empresa', 'id', id)
      if (response.status === 'empty') {
        const data = {
          id: id,
          nome: this.company,
          telefone: this.phone,
          enderecoID: this.cep,
          usuarioID: this.email,
        }
        await this.firebaseCreate(Firebase.firestore(), 'Empresa', id, data)
      }
    },

    async signUp() {
      try {
        Firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        await this.addUser()
        if (this.company.length > 0) {
          await this.addAddress()
          await this.addEmpresa()
        }
        console.log('Usuário criado com sucesso!')
        // this.$router.push("/")
      } catch (error) {
        console.log('error: ', error)
        this.error = error.message
        this.error_dialog = true
      }
    },
  },
};
</script>
<style lang="css">
html,
body {
  overflow-y: hidden;
  background-color: white !important;
}
.container-register {
  display: flex;
  align-self: stretch;
}
p {
  font-size: 1rem;
  color: #002b4b;
}
h3,
h4 {
  color: #002b4b;
  font-family: "Comfortaa", cursive;
  text-align: center;
  margin-top: 1rem;
  margin-left: 1rem;
}
.form-container {
  display: block;
  color: #002b4b;
  font-family: "Comfortaa", cursive;
  align-self: center;
  margin-top: 3rem;
  margin-right: 3rem;
  margin-left: 3rem;
}
.icon-back {
  position: fixed;
  margin-top: 1.5rem;
  left: 0;
  color: #002b4b;
}
.v-menu__content {
  align-self: center !important;
  justify-self: center !important;
}
.link-back{
  text-decoration: none;
  color:#002b4b
}
img {
  position: relative;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body {
    overflow-x: auto;
    overflow-y: auto;
  }
  img {
    display: none;
  }
  nav {
    display: none;
  }
  [class*="space-init"] {
    width: 13rem;
    margin-top: 40px;
  }
}
</style>
