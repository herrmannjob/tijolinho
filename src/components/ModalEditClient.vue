<script>
import ResponseModal from "@/components/ResponseModal.vue";
import image from "../assets/register.png";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
export default {
  name: "ModalEditClient",
  components: {ResponseModal},
  mixins: [FirebaseMixin],
  props: {
    formEditClient: Boolean,
    editedClient: {},
  },
  data() {
    return {
      outlinedColor: "#002b4b",
      title: "Image Upload",
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
      formConstruction: false,
      id_generated: "",
      idParams: "",
      picker: new Date().toISOString().substr(0, 10),
      pickerInit: new Date().toISOString().substr(0, 10),
      pickerEnd: new Date().toISOString().substr(0, 10),
      pickerNasc: new Date().toISOString().substr(0, 10),
      pickerNascConj: new Date().toISOString().substr(0, 10),
      message: { title: "", code: "", text: "" },
      menu: false,
      menuInit: false,
      menuEnd: false,
      menuNasc: false,
      menuNascConj: false,
      modal: false,
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
        (v) => v.length === 11 || "Telefone com 11 dígitos - 11 98765 4321",
        (v) => !isNaN(Number(v)) || "Telefone com 11 dígitos - 11 98765 4321",
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
      client: { nome: "empty" },
      confirm: false,
      confirm_message: "Cliente cadastrado com sucesso!",
      user_email: "",
      client_id: "",
      refresh: false,
    };
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
  updated() {
    if (this.refresh) {
      this.editedClient.nome = "";
      (this.editedClient.email = ""),
        (this.editedClient.telefone = ""),
        (this.editedClient.data_nascimento = null),
        (this.editedClient.nome_conjuge = ""),
        (this.editedClient.data_nascimento_conjuge = null),
        (this.refresh = false);
    }
  },
  async mounted() {
    await Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_email = user.email;
        this.getCompany();
      } else this.$router.push("/");
    });
  },
  methods: {
    handleClose() {
      this.$emit("update:formEditClient", false);
    },
    close() {
      this.$emit("close");
    },
    voltar() {
      this.$router.go(-1);
    },
    async getCompany() {
      const response = await this.getDocumentList(
        Firebase.firestore(),
        "Empresa",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.company = response.documents[0];
      }
    },
    async addTipoUsuario() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "TipoUsuario",
        "id",
        "cliente"
      );
      if (response.status === "empty")
        await this.firebaseCreate(
          Firebase.firestore(),
          "TipoUsuario",
          "cliente",
          { id: "cliente", nome: "Cliente" }
        );
      this.tipo_usuario = "cliente";
    },

    async updateUser() {
      await this.addTipoUsuario();
      const data = {
        nome: this.editedClient.nome,
        email: this.editedClient.email,
        telefone: this.editedClient.telefone,
        data_nascimento: this.editedClient.data_nascimento,
        nome_conjuge: this.editedClient.nome_conjuge,
        data_nascimento_conjuge: this.editedClient.data_nascimento_conjuge,
        foto_perfil: this.editedClient.foto_perfil,
        TipoUsuario: this.tipo_usuario,
      };
      this.id_generated = this.editedClient.id;
      await this.firebaseUpdate(
        Firebase.firestore(),
        "Usuario",
        this.id_generated,
        data
      )
        .then(() => {
          // debugger;
          this.modal = true;
          this.message.title = "Cliente atualizado com sucesso!";
          this.handleClose();
          this.$emit("update:formEditClient", false);
        })
        .catch((error) => {
          this.modal = true;
          this.message.title = "Ocorreu um erro...";
          this.message.code = error;
          this.message.text = error;
        });
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
          this.editedClient.foto_perfil = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.editedClient.foto_perfil = "";
      }
    },
  },
};
</script>
<template>
  <vs-dialog
    @close="handleClose"
    blur
    v-model="formEditClient"
    max-width="800px"
    prevent-close
  >
    <template #header>
      <div @click="pickFile" class="card">
        <div class="side card-upload">
          <v-icon class="img-upload">mdi-image</v-icon>
        </div>

        <input
          class="card"
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        />
        <img
          class="image-response"
          :src="editedClient.foto_perfil"
          height="80"
          v-if="editedClient.foto_perfil"
        />
      </div>
      <h4 class="not-margin">Editar <b>Cliente</b></h4>
    </template>

    <div class="con-form">
      <v-form
        v-model="valid"
        style="justify-content:center; align-items: center; flex-direction: row; display: flex"
      >
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="editedClient.nome"
              :rules="nameRules"
              label="Nome do cliente"
              required
            ></v-text-field>

            <v-text-field
              label="Nome do cônjuge (opcional)"
              v-model="editedClient.nome_conjuge"
            ></v-text-field>

            <v-text-field
              label="Telefone"
              v-model="editedClient.telefone"
              placeholder="11 98765 4321"
              :rules="phone_rules"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="group-data-client">
              <div class="inputControl bornDateControl">
                <template>
                  <vs-input
                    type="date"
                    v-model="editedClient.data_nascimento"
                    label="Data de Nascimento (opcional)"
                    required
                  />
                </template>
              </div>
              <div class="inputControl bornDateControlPair">
                <template>
                  <vs-input
                    type="date"
                    v-model="editedClient.data_nascimento_conjuge"
                    label="Data de Nascimento do Conjuge (opcional)"
                    required
                  />
                </template>
              </div>
              <vs-input
                v-model="editedClient.email"
                placeholder="E-mail"
              >
                <template #icon>
                  <v-icon>mdi-email</v-icon>
                </template>
              </vs-input>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button :color="outlinedColor" @click="updateUser" block>
          Salvar Dados
        </vs-button>
      </div>
    </template>
    <ResponseModal :modal.sync="modal" :message="message" />
  </vs-dialog>
</template>
<style lang="css">
.bornDateControl {
  margin-bottom: 8% !important;
}
.group-data-client {
  display: grid;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  height: 100%;
  padding-left: unset;
  padding-top: 5%;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
}

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
  flex-direction: column !important;
  display: flex;
  align-items: center;
  width: 100%;
  color: #002b4b;
  font-family: "Comfortaa", cursive;
  align-self: center;
  margin: 0 !important;
}
.form-btns {
  margin-top: 10%;
  /* margin-right: 1rem; */
}
.v-text-field .v-input__control {
  color: #002b4b;
  width: 15rem;
  margin: inherit;
}
.return-btn {
  color: #002b4b !important;
}
.v-menu__content {
  align-self: center !important;
  justify-self: center !important;
}
.init-cliente {
  width: 8rem;
  margin: 0 0 7% 0;
  display: flex;
}
.image-responsive {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-response {
  border-radius: 50% !important;
}
.form-middle {
  margin: 0 5% 0 0;
}
.end-client {
  width: 1rem;
  margin-left: 2.5rem;
  margin-top: 1.7rem;
}
.img-upload {
  color: white !important;
  line-height: 3 !important;
  font-size: 26px !important;
  justify-content: center !important;
  align-items: center !important;
  display: flex !important;
}
.card {
  flex-direction: row;
  width: 5rem;
  height: 5rem;
  max-height: 80px !important;
  max-width: 80px !important;
  margin: 0.5rem;
  border-radius: 50%;
  border: none !important;
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
.btn-primary {
  background-color: #002b4b !important;
  color: #fafafa !important;
  width: 80px;
}
.card-upload {
  background: #002b4b;
  font-size: 3px;
}
.avatar-edit {
  align-self: start;
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
}
</style>
