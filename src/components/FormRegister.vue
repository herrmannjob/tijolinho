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
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show = !show"
                      :type="show ? 'text' : 'password'"
                      required
                    ></v-text-field>
                    <v-text-field
                      class="text"
                      label="Confirme sua senha*"
                      v-model="password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show = !show"
                      :type="show ? 'text' : 'password'"
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
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                      ></v-date-picker>
                    </v-menu>
                  </v-container>
                </v-form>

                <v-btn
                  color="primary"
                  @click="(e1 = 2), validate"
                  :disabled="!valid"
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
                    v-model="cep_empresa"
                    @change="searchCep(cep_empresa, false)"
                    @keyup="searchCep(cep_empresa, false)"
                  ></v-text-field>
                    <v-select
                    v-model="estado_empresa"
                    :items="items"
                    :error-messages="errors"
                    label="Estado"
                    required
                  ></v-select>
                  <v-text-field
                    v-model="cidade_empresa"
                    label="Cidade"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="logradouro_empresa"
                    label="Rua"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Complemento"
                    v-model="complemento_empresa"
                    required
                  ></v-text-field>
                </v-form>

                <v-btn color="primary" @click="addAddress(false),validate" :disabled="!valid">
                ENVIAR
                </v-btn>
                <v-btn text @click="e1 = 1">
                ANTERIOR
                </v-btn>
              </v-card>

              <v-dialog v-model="confirm_code" persistent max-width="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Confirme o código de acesso:</span>
                  </v-card-title>
                  <v-card-text>
                    <span>
                      Enviamos um código de verificação em seu e-mail para confirmar sua conta.  Insira o código abaixo para continuar
                    </span>
                    <v-container>
                      <div>
                        <span>{{ email }}</span>
                        <br />
                        <v-text-field
                          label="Digite o código de acesso"
                          hint="Enviado para o email cadastrado"
                          required
                          v-model="code"
                        ></v-text-field>
                      </div>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="confirm_code = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="confirmSignUp()">
                      Confirmar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
import { Auth } from "aws-amplify";
import { DataStore } from "aws-amplify";
import { Usuario, TipoUsuario, Endereco, Empresa } from "@/models";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  /* eslint-disable no-mixed-spaces-and-tabs */
  mixins: [validationMixin],

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
      user: null,
      e1: 1,
      picker: new Date().toISOString().substr(0, 10),
      menu: false,
      endereco_empresa: null,
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      cep_empresa: "",
      estado_empresa: "",
      logradouro_empresa: "",
      cidade_empresa: "",
      complemento_empresa: "",
      endereco: null,
      cep: "",
      estado: "",
      logradouro: "",
      cidade: "",
      complemento: "",
      data: null,
      image: image,
      show: false,
      password: "",
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
      tipo_usuario: null,
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
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async searchCep(cep, user) {
      if (cep.length == 8) {
        const response = await Functions.searchCep(cep);
        if (user) {
          this.logradouro = response.data.logradouro;
          this.cidade = response.data.localidade;
          this.estado = response.data.uf;
        } else {
          this.logradouro_empresa = response.data.logradouro;
          this.cidade_empresa = response.data.localidade;
          this.estado_empresa = response.data.uf;
        }
      }
    },
    null_or_empty(str) {
      var v = document.getElementById(str).value;
      return v == null || v == "";
    },
    async addAddress(user) {
      const items = await DataStore.query(Endereco, (d) =>
        d.cep("eq", this.cep)
      );
      if (items.length === 0) {
        const data = user
          ? {
              cep: this.cep,
              estado: this.estado,
              cidade: this.cidade,
              rua: this.logradouro,
              complemento: this.complemento,
            }
          : {
              cep: this.cep_empresa,
              estado: this.estado_empresa,
              cidade: this.cidade_empresa,
              rua: this.logradouro_empresa,
              complemento: this.complemento_empresa,
            };
        const response = await Functions.putData(Endereco, data);
        if (response.status === "ok") {
          console.log("Endereço cadastrado com sucesso!");
          console.log(response);
          if (!user) {
            this.endereco_empresa = response.data;
            this.addEmpresa();
          } else {
            this.endereco = response.data;
            this.addTipoUsuario();
          }
        } else {
          console.log("erro: " + response.error.message);
        }
      } else {
        if (!user) {
          this.endereco_empresa = items[0];
          this.addEmpresa();
        } else {
          this.endereco = items[0];
          this.addTipoUsuario();
        }
      }
    },

    async addTipoUsuario() {
      const items = await DataStore.query(TipoUsuario, (d) =>
        d.nome("eq", "Arquiteto(a)")
      );
      if (items.length === 0) {
        const response = await Functions.putData(TipoUsuario, {
          nome: "Arquiteto(a)",
        });
        if (response.status === "ok") {
          console.log("TipoUsuario cadastrado com sucesso!");
          this.tipo_usuario = response.data;
          this.addUser();
        } else {
          console.log("erro: " + response.error.message);
        }
      } else {
        this.tipo_usuario = items[0];
        this.addUser();
      }
    },

    async addUser() {
      const items = await DataStore.query(Usuario, (d) =>
        d.email("eq", this.email)
      );
      if (items.length === 0) {
        this.phone = `+${this.phone.substr(0, 2)} ${this.phone.substr(
          2,
          2
        )} ${this.phone.substr(4, 5)} ${this.phone.substr(9, 4)}`;
        const response = await Functions.putData(Usuario, {
          nome: this.name,
          email: this.email,
          data_nascimento: this.date + "Z",
          Endereco: this.endereco,
          TipoUsuario: this.tipo_usuario,
        });
        if (response.status === "ok") {
          console.log("Usuário cadastrado com sucesso!");
          this.user = response.data;
          this.e1 += 1;
        } else {
          console.log("erro: " + response.error.message);
        }
      } else {
        this.user = items[0];
        this.e1 += 1;
      }
    },

    async addEmpresa() {
      const response = await Functions.putData(Empresa, {
        nome: this.company,
        telefone: this.phone,
        Endereco: this.endereco_empresa,
        usuarioID: [this.user.id],
      });
      if (response.status === "ok") {
        console.log("Empresa cadastrada com sucesso!");
        this.signUp();
      } else {
        console.log("erro: " + response.error.message);
      }
    },

    async signUp() {
      try {
        this.user = await Auth.signUp({
          username: this.email, // optional
          password: this.password,
        });
        this.confirm_code = true;
      } catch (error) {
        this.error = error;
        this.error_dialog = true;
      }
    },

    async confirmSignUp() {
      try {
        await Auth.confirmSignUp(this.email, this.code);
        this.login();
      } catch (error) {
        console.log("error confirming sign up", error);
      }
    },

    async login() {
      await Functions.login(this.email, this.password);
      this.$router.push("/");
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
