<script>
import image from "../assets/register.png";
import Functions from "@/functions/Functions";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import ResponseModal from "@/components/ResponseModal.vue";
export default {
  /* eslint-disable no-mixed-spaces-and-tabs */
  mixins: [validationMixin, FirebaseMixin],
  components: { ResponseModal },
  data() {
    return {
      message: { title: "", text: "" },
      genders: ["Masculino", "Feminino", "Não Binário", "Outro"],
      e1: 1,
      picker: new Date().toISOString().substr(0, 10),
      menu: false,
      valid: false,
      disabled: false,
      name: "",
      nameRules: [(v) => !!v || "Nome é obrigatório"],
      passwordRules: [(v) => !!v || "Campo obrigatório"],
      email: "",
      dateRules: [(v) => !!v || "Campo obrigatório"],
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser um formato válido",
      ],
      confirmationPasswordRules: [
        (v) => !!v || "Informe a confirmação da senha",
        (v) =>
          v == this.user.password ||
          "A confirmação de senha precisa ser igual com a senha informada",
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
      code: "",
      items: [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
      ],
      confirm_code: false,
      date: null,
      cep_rules: [(v) => !!v || "CEP é obrigatório"],
      company_rules: [(v) => !!v || "Empresa é obrigatória"],
      company: "",
      phone: "",
      phone_rules: [(v) => !!v || "Telefone é obrigatório"],
      error_dialog: false,
      error: "",
      tipo_usuario: "",
      user: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  validations: {
    user: {
      fullName: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs("password") },
      select: { required },
      checkbox: {
        checked(val) {
          return val;
        },
      },
    },
  },
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) this.$router.push("/calendario");
    });
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
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async searchCep(cep) {
      if (cep.length == 9) {
        const response = await Functions.searchCep(cep);
        this.logradouro = response.data.logradouro;
        this.cidade = response.data.localidade;
        this.estado = response.data.uf;
      }
    },
    null_or_empty(str) {
      var v = document.getElementById(str).value;
      return v == null || v == "";
    },

    async addTipoUsuario() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "TipoUsuario",
        "id",
        "arquiteto"
      );
      if (response.status === "empty")
        await this.firebaseCreate(
          Firebase.firestore(),
          "TipoUsuario",
          "arquiteto",
          { id: "arquiteto", nome: "Arquiteto(a)" }
        );
      this.tipo_usuario = "arquiteto";
    },

    async addUser() {
      await this.addTipoUsuario();
      const response = await this.getDocument(
        Firebase.firestore(),
        "Usuario",
        "email",
        this.user.email
      );
      if (response.status === "empty") {
        const data = {
          id: this.user.email,
          nome: this.user.fullName,
          email: this.user.email,
          data_nascimento: this.user.date,
          TipoUsuario: this.tipo_usuario,
        };
        await this.firebaseCreate(
          Firebase.firestore(),
          "Usuario",
          this.user.email,
          data
        );
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

    async addEmpresa() {
      const id = this.company + this.cep;
      const response = await this.getDocument(
        Firebase.firestore(),
        "Empresa",
        "id",
        id
      );
      if (response.status === "empty") {
        const data = {
          id: id,
          nome: this.company,
          telefone: this.phone,
          enderecoID: this.cep,
          usuarioID: [this.user.email],
        };
        await this.firebaseCreate(Firebase.firestore(), "Empresa", id, data);
      }
    },

    async signUp() {
      try {
        Firebase.auth().createUserWithEmailAndPassword(
          this.user.email,
          this.password
        );
        await this.addUser();
        if (this.company.length > 0) {
          await this.addAddress();
          await this.addEmpresa();
        }
        console.log("Usuário criado com sucesso!");
        // this.$router.push("/")
      } catch (error) {
        console.log("error: ", error);
        this.error = error.message;
        this.error_dialog = true;
      }
    },
  },
};
</script>
<template>
  <div class="container-register">
    <div>
      <img :src="image" />
    </div>
    <div class="card-register">
      <h3>Bem vindo ao Gaia!</h3>
      <h4>
        Realize seu cadastro e tenha acesso a um gereciamento de projetos de
        arquitetura e engenharia inteligente!
      </h4>
      <div class="form-container form-container-scrollable">
        <v-stepper v-model="e1" data-app style="display:grid">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              <p style="margin-left: 10px !important">Perfil</p>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">
              <p style="margin-left: 10px !important">Empresa</p>
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12" height="550px">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container style="padding-bottom:unset">
                    <v-text-field
                      v-model="user.fullName"
                      :rules="nameRules"
                      label="Nome completo"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="user.email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                    <v-text-field
                      class="text"
                      label="Senha"
                      v-model="user.password"
                      :rules="passwordRules"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show = !show"
                      :type="show ? 'text' : 'password'"
                      required
                    ></v-text-field>
                    <v-text-field
                      class="text"
                      label="Confirme sua senha"
                      v-model="user.confirmPassword"
                      :rules="confirmationPasswordRules"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show = !show"
                      :type="show ? 'text' : 'password'"
                      required
                    ></v-text-field>
                  </v-container>
                </v-form>
                <v-btn
                  class="btn-nextPage"
                  color="primary"
                  align="center"
                  :disabled="
                    !valid ||
                      !user.fullName ||
                      !user.email ||
                      !user.password ||
                      !user.confirmPassword
                  "
                  v-on="validate ? { click: () => [(e1 = 2)] } : { disabled }"
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
                    :rules="company_rules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Telefone"
                    v-model="phone"
                    v-mask="'(##) #####-####'"
                    placeholder="11 98765 4321"
                    :rules="phone_rules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Cep"
                    v-model="cep"
                    v-mask="'#####-###'"
                    @change="searchCep(cep)"
                    @keyup="searchCep(cep)"
                    :rules="cep_rules"
                    required
                  ></v-text-field>
                  <v-row align="center" class="cidadeEstado">
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-text-field
                        v-model="cidade"
                        label="Cidade"
                        required
                      ></v-text-field>
                    </v-col>
                    <span class="labelText">Estado:</span>
                    <v-col class="d-flex" cols="12" sm="4">
                      <v-select
                        v-model="estado"
                        :items="items"
                        :error-messages="errors"
                        placeholder="UF"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>

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

                <v-btn
                  class="btn-nextPage"
                  color="primary"
                  @click="signUp(), validate"
                  :disabled="!valid || !company || !phone || !cep"
                >
                  ENVIAR
                </v-btn>
                <v-btn class="btn-previousPage" text @click="e1 = 1">
                  ANTERIOR
                </v-btn>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
    </div>
    <ResponseModal :modal.sync="modal" :message="message" />
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
      <router-link class="link-back" to="/"
        ><v-icon class="icon-back">mdi-arrow-left</v-icon></router-link
      >
    </div>
  </div>
</template>
<style lang="css">
html,
.v-picker {
  width: 100% !important;
}
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
.link-back {
  text-decoration: none;
  color: #002b4b;
}
img {
  position: relative;
}

.labelText {
  align-items: center !important;
  justify-content: center !important;
  margin: 2.5em 0.2em 0 2.5em;
}

.card-register {
  width: 60%;
}

.btn-previousPage {
  margin-top: 10rem;
  float: left;
}

.btn-nextPage {
  margin-top: 10rem;
  float: right;
}

@media only screen and (width: 768px) and (min-height: 1024px) {
  /* For mobile phones: */
  #app {
    background-image: url("../assets/register.png");
  }
  .card-register {
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
  }
  .container {
    padding: 0;
  }
  .link-back {
    position: absolute;
    left: 28rem;
    top: 6rem;
  }
  .form-container {
    margin-bottom: 3rem;
    height: auto;
    overflow-y: auto;
  }
  .cidadeEstado {
    width: 110%;
  }

  .labelText {
    display: none;
    margin: 0;
  }

  body {
    overflow-x: auto;
    overflow-y: auto;
  }

  h3,
  h4 {
    font-family: "Comfortaa", cursive;
    text-align: center;
    margin: 1rem 1rem 0 1rem;
  }
  nav {
    display: none;
  }
  [class*="space-init"] {
    width: 13rem;
    margin-top: 40px;
  }
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */

  .card-register {
    width: 100% !important;
  }
  .container {
    padding: 0;
  }
  i {
    color: #ffffff !important;
    display: flex;
  }
  .link-back {
    position: absolute;
    left: 3rem;
    top: 6rem;
  }
  .form-container {
    margin-bottom: 3rem;
    height: 550px;
    overflow-y: auto;
  }

  .v-stepper__content {
    max-height: 555px;
    overflow-y: auto;
  }

  body {
    overflow-x: auto;
    overflow-y: auto;
  }

  h3,
  h4 {
    color: #ffffff;
    font-family: "Comfortaa", cursive;
    text-align: center;
    margin: 1rem 1rem 0 1rem;
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
