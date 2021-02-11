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
              <v-card class="mb-12" height="380px">
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
                  <v-text-field label="Empresa" v-model="company" required></v-text-field>
                  <v-text-field label="Telefone" v-model="phone" required></v-text-field>
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
              <v-card class="mb-12" color="grey lighten-1" height="350px">
                <v-form v-model="valid">
                  <v-text-field label="Rua" required></v-text-field>
                  <v-text-field label="Bairro" required></v-text-field>
                  <v-select :items="items" label="Estado" dense></v-select>
                  <v-select :items="items" label="Cidade" dense></v-select>
                </v-form>

                <v-btn color="primary" @click="signUp">
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
    <v-dialog
      v-model="error_dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Erro
        </v-card-title>

        <v-card-text>
          Tivemos um erro :(<br>
          {{ error }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="error_dialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import image from "../assets/register.png";
import { Auth  } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore';
import { Usuario } from '@/models';
export default {
  data() {
    return {
      user: null,
      e1: 1,
      picker: new Date().toISOString().substr(0, 10),
      menu: false,
      items: ["MG", "PA", "PB", "PR", "PE"],
      image: image,
      valid: false,
      show: false,
      lastname: "",
      nameRules: [(v) => !!v || "Nome é obrigatório"],
      firstname: "",
      email: "",
      password: "",
      date: null,
      company: '',
      phone: '',
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+/.test(v) || "E-mail precisa ser em um formato válido",
      ],
      error_dialog: false,
      error: ''
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
    async signUp () {
      try {
        this.user = await Auth.signUp({
          username: this.email,          // optional
          password: this.password
        })
        this.addUser()
      } catch (error) {
        this.error = error
        this.error_dialog = true
      }
    },
    async addUser () {
      try {
        await DataStore.save(
          new Usuario({
            "nome": this.firstname,
            "email": this.email,
            "telefone": this.phone,
            "data_nascimento": this.date
          })
        )
        this.$router.push('calendar')
      } catch (error) {
        this.error = error
        this.error_dialog = true
      }
    }
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
  p {
    font-size: 4px;
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
