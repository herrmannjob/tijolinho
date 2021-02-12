<template>
  <div class="container-register">
    <div>
      <img :src="image" />
    </div>
    <div>
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
            <v-stepper-step :complete="e1 > 2" step="2">
              <p>Empresa</p>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 3" step="3">
              <p>Localização</p>
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12" height="400px">
                <v-form v-model="valid">
                  <v-container style="padding-bottom:unset">
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
                    <v-text-field
                      class="text"
                      label="Senha"
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
                          label="Data de nascimento"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </v-container>
                </v-form>

                <v-btn color="primary" @click="e1 = 2">
                  PRÓXIMO
                </v-btn>
                <v-btn text>
                  CANCELAR
                </v-btn>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card class="mb-12" color="grey lighten-1" height="350px">
                <v-form v-model="valid">
                  <v-text-field label="Empresa" required></v-text-field>
                  <v-text-field label="Telefone" required></v-text-field>
                </v-form>

                <v-btn color="primary" @click="e1 = 3">
                  PRÓXIMO
                </v-btn>
                <v-btn text>
                  CANCELAR
                </v-btn>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card class="mb-12" color="grey lighten-1" height="450px">
                <v-form v-model="valid">
                  <v-text-field
                    label="Cep"
                    required
                    v-model="cep"
                    @change="searchCep"
                    @keyup="searchCep()"
                  ></v-text-field>
                  <v-text-field label="Complemento" required></v-text-field>
                  <v-text-field
                    v-model="logradouro"
                    label="Rua"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="cidade"
                    label="Cidade"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="estado"
                    label="Estado"
                    required
                  ></v-text-field>
                </v-form>
                <v-btn color="primary" @click="e1 = 1">
                  SALVAR
                </v-btn>
                <v-btn text>
                  CANCELAR
                </v-btn>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
    </div>
  </div>
</template>
<script>
import image from "../assets/register.png";
import axios from "axios";

export default {
  /* eslint-disable no-mixed-spaces-and-tabs */
  data() {
    return {
      date: null,
      e1: 1,
      picker: new Date().toISOString().substr(0, 10),
      menu: false,
      cep: null,
      estado: null,
      logradouro: null,
      cidade: null,
      data: null,
      image: image,
      valid: false,
      show: false,
      firstname: "",
      lastname: "",
      nameRules: [(v) => !!v || "Nome é obrigatório"],
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+/.test(v) || "E-mail precisa ser em um formato válido",
      ],
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    searchCep() {
      if (this.cep.length == 8) {
        axios
          .get(`https://viacep.com.br/ws/${this.cep}/json/`)
          .then((response) => (this.data = response.data))
          .catch((error) => console.log(error));
        console.log("rua", this.data);
        this.logradouro = this.data.logradouro;
        this.cidade = this.data.localidade;
        this.estado = this.data.uf;
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
.v-menu__content {
  align-self: center !important;
  justify-self: center !important;
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
