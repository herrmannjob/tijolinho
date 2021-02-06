<template>
  <div>
    <h6>Código do cliente:</h6>
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
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field label="Conjuge" required></v-text-field>
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
                  label="Data de nascimento do conjuge"
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
            <v-text-field label="Telefone" required></v-text-field>
          </v-col>
          <div>
            <v-btn
              elevation="2"
              depressed
              class="btn-primario"
              @click="onSubmit"
            >
              <p class="button-primario">SALVAR DADOS</p>
            </v-btn>
            <v-btn class="m2" outlined>
              <p class="button-secundario">CADASTRAR OBRA</p>
            </v-btn>
          </div>
        </v-row>
      </v-form>

      <div class="middle-client">
        <router-link class="link" to="/">
          <v-icon class="return">mdi-arrow-left</v-icon></router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import image from "../assets/register.png";
export default {
  data() {
    return {
      title: "Image Upload",
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      date: null,
      e1: 1,
      picker: new Date().toISOString().substr(0, 10),
      menu: false,
      items: ["MG", "PA", "PB", "PR", "PE"],
      image: image,
      valid: false,
      show: false,
      firstname: "",
      lastname: "",
      nameRules: [(v) => !!v || "Nome é obrigatório"],
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
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
    pickFile() {
      this.$refs.image.click();
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
.teste {
  color: white !important;
  margin: auto;
}
.return {
  color: #002b4b !important;
  margin: 0;
}
.v-menu__content {
  align-self: center !important;
  justify-self: center !important;
  top: unset !important;
  left: unset !important;
}
.init-client {
  width: 8rem;
  margin-top: 1rem;
  background-color: white;
}
.middle-client {
  width: 1rem;
  font-weight: bold;
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
  .middle-client{
    display: none; 
}
}
</style>
