<template>
  <div class="container-login" style="overflow:hidden!important">
    <div class="space-init">
      <v-form>
        <v-container>
          <v-row style="justify-content:right">
            <v-col>
              <v-text-field
                class="text"
                style="color:#002B4B"
                label="Login"
                v-model="email"
              ></v-text-field>
              <v-text-field
                class="text"
                label="Senha"
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                :type="show ? 'text' : 'password'"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <div class="btn-container">
              <v-btn
                elevation="2"
                depressed
                class="btn-primario"
                @click="login"
              >
                <p class="button-primario">Entrar</p>
              </v-btn>
              <br />
              <v-btn class="m2" outlined @click="loginCognito">
                <p class="button-secundario">LOGIN COM COGNITO</p>
              </v-btn>
            </div>
          </v-row>
        </v-container>
      </v-form>
    </div>
    <div class="space-middle">
      <router-link class="link" to="/register">CADASTRAR</router-link>
    </div>
    <div class="space-end">
      <v-carousel :show-arrows="false" width="100%" cycle height="100%">
        <v-carousel-item
          class="img"
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <v-dialog
      v-model="showError"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">
          Ocorreu um erro...
        </v-card-title>
        <v-card-text v-if="error.code" style="text-align:left">
          Código: {{ error.code }}
        </v-card-text>
        <v-card-text style="text-align:left">
          Mensagem: {{ error.message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="showError = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { Auth } from 'aws-amplify'
export default {
  name: "FormLogin",
  data() {
    return {
      email: "",
      password: "",
      showError: false,
      error: '',
      show: false,
      items: [
      {
        src: require("../assets/slideOne.svg"),
        },
      {
        src: require("../assets/slideTwo.svg"),
        },
        {
          src: require("../assets/slideThree.svg"),
        },
      ],
      myStyle:{
        backgroundColor:"black" 
      }
    };
  },
     
  methods: {
    async login () {
      try {
        const user = await Auth.signIn(this.email, this.password)
        console.log('user: ', user)
        this.$router.push('calendar')
      } catch (error) {
        this.error = error
        this.showError = true
      }
    },
    // async resendConfirmationCode(username) {
    //   try {
    //     await Auth.resendSignUp(username);
    //     console.log('code resent successfully');
    //   } catch (err) {
    //     console.log('error resending code: ', err);
    //   }
    // },
    loginCognito () { this.$router.push('aws') }
  },
};
</script>

<style lang="css">
body {
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: #002b4b;
}

.container-login {
  display: flex;
  align-self: stretch;
  height: 100% !important;
  width:100%;
  background-color: white;
}
.text {
  color: #002b4b;
  font-family: "Comfortaa", cursive;
}
.btn-primario {
  background: #002b4b;
  width: 11rem;
  margin-left: 10px;
  margin-top: 6px;
  margin-right: 1rem;
}
.m2 {
  width: 11rem;
  margin-left: 10px;
  margin-top: 6px;
  margin-right: 1rem;
}
.button-primario {
  margin: auto;
  color: white;
  font-family: "Roboto", sans-serif;
}
.button-secundario {
  margin: auto;
  width: 10rem;
  color: #002b4b;
  font-size: 12px;
  font-family: "Roboto", sans-serif;
}
.btn-container {
  width: 11rem;
  display: flex;
  transform:translate(10%);
  flex-direction: column;
  align-self: flex-start;
}
.theme--light.v-btn.v-btn--has-bg {
  background-color: #002b4b !important;
}
.space-init {
  width: 20rem;
  margin-left: 3rem;
  margin-top: 6rem;
  background-color: white;
}
.space-middle {
  width: 4.5rem;
  margin-left: 3rem;
  margin-top: 2rem;
  margin-right: 1rem;

}
.space-end {
  width:55rem;
  top: 0px;
  height: 100%;
}

.link {
  font-family: "Roboto", sans-serif;

  font-size: 0.9rem;
  color: #002b4b;
}
.img {
  width: auto;
  height: auto;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */

  body{
    overflow-x: auto!important;
    overflow-y: auto!important;
  }
  nav {
    display: none;
  }
  [class*="container-login"] {
    align-content: center;
    display: flex;
    align-self: stretch;
  }
  [class*="space-middle"] {
    align-content: center;
    width:3rem;
  }
  [class*="space-end"] {
    display: none;
  }
  [class*="space-init"] {
  width: 13rem;
  margin-left: 5px;
  margin-top: 40px;

  }
}
</style>
