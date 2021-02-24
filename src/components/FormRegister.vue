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
              <p>Localização</p>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 3" step="3">
              <p>Empresa</p>
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
              <v-card class="mb-12" color="grey lighten-1" height="450px">
                <v-form v-model="valid">
                  <v-text-field
                    label="Cep"
                    required
                    v-model="cep"
                    @change="searchCep(cep, true)"
                    @keyup="searchCep(cep, true)"
                  ></v-text-field>
                      <v-text-field
                    v-model="estado"
                    label="Estado"
                    required
                  ></v-text-field>
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
                 <v-text-field label="Complemento" v-model="complemento" required></v-text-field>
                </v-form>
                <v-btn color="primary" @click="addAddress(true)">

                  SALVAR
                </v-btn>
                <v-btn text>
                  CANCELAR
                </v-btn>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card class="mb-12" color="grey lighten-1" height="700px">
                <v-form v-model="valid">

                  <v-text-field label="Empresa" v-model="company" required></v-text-field>
                  <v-text-field label="Telefone" v-model="phone" hint="Apenas números (13 dígitos)" placeholder="+55 84 98765 4321" :rules="phone_rules" required></v-text-field>
                  <v-text-field
                    label="Cep"
                    required
                    v-model="cep_empresa"
                    @change="searchCep(cep_empresa, false)"
                    @keyup="searchCep(cep_empresa, false)"
                  ></v-text-field>
                      <v-text-field
                    v-model="estado_empresa"
                    label="Estado"
                    required
                  ></v-text-field>
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
                 <v-text-field label="Complemento" v-model="complemento_empresa" required></v-text-field>
                </v-form>

                <v-btn color="primary" @click="addAddress(false)">
                  PRÓXIMO
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
import image from "../assets/register.png"
import Functions from '@/functions/Functions'
import { Auth  } from 'aws-amplify'
import { Usuario, TipoUsuario, Endereco, Empresa } from '@/models'
export default {
  /* eslint-disable no-mixed-spaces-and-tabs */
  data() {
    return {
      user: null,
      e1: 1,
      picker: new Date().toISOString().substr(0, 10),
      menu: false,
      endereco_empresa: null,
      cep_empresa: '',
      estado_empresa: '',
      logradouro_empresa: '',
      cidade_empresa: '',
      complemento_empresa: '',
      endereco: null,
      cep: '',
      estado: '',
      logradouro: '',
      cidade: '',
      complemento: '',
      
      data: null,
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
      phone_rules: [
        (v) => !!v || "Telefone é obrigatório",
        (v) => v.length === 13 || "Telefone com 13 dígitos - +55 84 98765 4321",
      ],
      error_dialog: false,
      error: '',
      tipo_usuario: null,
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    async searchCep(cep, user) {
      if (cep.length == 8) {
        const response = await Functions.searchCep(cep)
        if (user) { 
          this.logradouro = response.data.logradouro
          this.cidade = response.data.localidade
          this.estado = response.data.uf
        } else {
          this.logradouro_empresa = response.data.logradouro
          this.cidade_empresa = response.data.localidade
          this.estado_empresa = response.data.uf
        }
      }
    },

    async addAddress (user) {
      const data = user ? 
      {
        "cep": this.cep,
        "estado": this.estado,
        "cidade": this.cidade,
        "rua": this.logradouro,
        "complemento": this.complemento
      } :
      {
        "cep": this.cep_empresa,
        "estado": this.estado_empresa,
        "cidade": this.cidade_empresa,
        "rua": this.logradouro_empresa,
        "complemento": this.complemento_empresa
      }
      const response = await Functions.putData(Endereco, data)
      if (response.status === 'ok') {
        console.log("Endereço cadastrado com sucesso!")
        console.log(response)
        if (!user) {
          this.endereco_empresa = response.data
          this.addEmpresa()
        } else {
          this.endereco = response.data
          this.addTipoUsuario()
        }
      } else {
        console.log("erro: " + response.error.message)
      }
    },

    async addTipoUsuario () {
      const response = await Functions.putData(TipoUsuario, {
        "nome": "Funcionário",
      })
      if (response.status === 'ok') {
        console.log("TipoUsuario cadastrado com sucesso!")
        this.tipo_usuario = response.data
        this.addUser()
      } else {
        console.log("erro: " + response.error.message)
      }
    },

    async addUser () {
      this.phone = `+${this.phone.substr(0,2)} ${this.phone.substr(2,2)} ${this.phone.substr(4,5)} ${this.phone.substr(9,4)}`
      const response = await Functions.putData(Usuario, {
        "nome": this.firstname,
        "email": this.email,
        "data_nascimento": this.date + 'Z',
        "Endereco": this.endereco,
        "TipoUsuario": this.tipo_usuario,

      })
      if (response.status === 'ok') {
        console.log("Usuário cadastrado com sucesso!")
        this.user = response.data
        this.el = this.el + 1
      } else {
        console.log("erro: " + response.error.message)
      }
    },

    async addEmpresa () {
      const response = await Functions.putData(Empresa, {
        "nome": this.company,
        "telefone": this.phone,
        "Endereco": this.endereco_empresa,
        "usuarioID": [this.user.id]
      })
      if (response.status === 'ok') {
        console.log("Empresa cadastrada com sucesso!")
        this.signUp()
      } else {
        console.log("erro: " + response.error.message)
      }
    },

    async signUp () {
      try {
        this.user = await Auth.signUp({
          username: this.email,          // optional
          password: this.password
        })
        this.$router.push('/')
      } catch (error) {
        this.error = error
        this.error_dialog = true
      }
    },
    // async resendConfirmationCode() {
    //   try {
    //     await Auth.resendSignUp(this.email)
    //     console.log('code resent successfully')
    //     this.addUser()
    //   } catch (error) {
    //     this.error = error
    //     this.error_dialog = true
    //   }
    // },
    
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
