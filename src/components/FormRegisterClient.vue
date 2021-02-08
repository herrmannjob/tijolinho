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
            <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Data de Inicio"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="secondary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="secondary"
                            @click="$refs.dialog.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>                    
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field label="Conjuge" required></v-text-field>
                                <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Data nascimento Conjuge"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="secondary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="secondary"
                            @click="$refs.dialog.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
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
          </div>
          <v-dialog v-model="dialog" persistent max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                class="btn-secundario"
                outlined
                data-app
                @click="openDialog"
                v-bind="attrs"
                v-on="on"
              >
                CADASTRAR OBRA
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Cadastrar Obra</span>
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        label="Nome"
                        :close-on-content-click="false"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                      <v-select
                        :items="categoria"
                        :close-on-content-click="false"
                        :menu-props="{ top: true, offsetY: true }"
                        label="Categoria"
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Data de Inicio"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="secondary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="secondary"
                            @click="$refs.dialog.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>

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
                            label="Termino previsto"
                            prepend-icon="mdi-calendar"
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
                          @change="save"
                        ></v-date-picker>
                      </v-menu>
                      <v-text-field
                        label="Gasto estimado"
                        required
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field label="Telefone" required></v-text-field>
                      <v-text-field label="Cep" required></v-text-field>
                      <v-text-field label="Complemento" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field label="Endereço" required></v-text-field>

                      <v-select
                        :items="items"
                        :menu-props="{ top: true, offsetY: true }"
                        label="Cidade"
                      ></v-select>
                      <v-select
                        :items="estados"
                        :menu-props="{ top: true, offsetY: true }"
                        label="Estado"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-form>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  SALVAR
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      estados: ["MG", "PA", "PB", "PR", "PE"],
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
    pickFile() {
      this.$refs.image.click();
    },
    closeMyDialog() {
      this.dialog = false;
    },
    openDialog() {
      this.dialog = true;
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
