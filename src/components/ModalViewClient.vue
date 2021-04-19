<script>
import image from "../assets/register.png";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
export default {
  name: "ModalViewClient",
  mixins: [FirebaseMixin],
  props: {
    formViewClient: Boolean,
    selectedClient: {},
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
      idParams: "",
      picker: new Date().toISOString().substr(0, 10),
      pickerInit: new Date().toISOString().substr(0, 10),
      pickerEnd: new Date().toISOString().substr(0, 10),
      pickerNasc: new Date().toISOString().substr(0, 10),
      pickerNascConj: new Date().toISOString().substr(0, 10),
      menu: false,
      menuInit: false,
      menuEnd: false,
      menuNasc: false,
      menuNascConj: false,
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
      this.firstname = "";
      (this.email = ""),
        (this.phone = ""),
        (this.dateNasc = null),
        (this.firstnameConjuge = ""),
        (this.dateNascConj = null),
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
      this.$emit("update:formViewClient", false);
    },
    handleOpen() {
      this.$emit("formConstruction", true);
      this.$emit("confirm", false);
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
    async updateCompany() {
      if (!this.company.usuarioID.includes(this.client_id)) {
        this.company.usuarioID.push(this.client_id);
        const data = {
          enderecoID: this.company.enderecoID,
          id: this.company.id,
          nome: this.company.nome,
          telefone: this.company.telefone,
          usuarioID: this.company.usuarioID,
        };
        const response = await this.firebaseCreate(
          Firebase.firestore(),
          "Empresa",
          data.id,
          data
        );
        if (response.status === "ok") this.company = data;
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

    async addUser() {
      await this.addTipoUsuario();
      const response = await this.getDocument(
        Firebase.firestore(),
        "Usuario",
        "telefone",
        this.user_email
      );
      if (response.status === "empty") {
        const data = {
          nome: this.selectedClient.nome,
          email: this.selectedClient.email,
          telefone: this.selectedClient.telefone,
          data_nascimento: this.selectedClient.data_nascimento,
          nome_conjuge: this.selectedClient.nome_conjuge,
          data_nascimento_conjuge: this.selectedClient.data_nascimento_conjuge,
          foto_perfil: this.selectedClient.foto_perfil,
          TipoUsuario: this.tipo_usuario,
        };
        const client = await this.firebaseCreate(
          Firebase.firestore(),
          "Usuario",
          null,
          data
        );
        await this.firebaseUpdate(
          Firebase.firestore(),
          "Usuario",
          client.created_id,
          { id: client.created_id }
        );
        this.client_id = client.created_id;
        this.confirm = true;
        this.close();
      } else {
        this.client_id = response.documents[0].id;
        this.confirm_message =
          "Já existe um usuário com este número" + "" + this.phone;
        this.confirm = true;
      }
      this.updateCompany();
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
          this.selectedClient.foto_perfil = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.selectedClient.foto_perfil = "";
      }
    },
  },
};
</script>
<template>
  <vs-dialog
    @close="handleClose"
    blur
    v-model="formViewClient"
    max-width="800px"
    prevent-close
  >
    <template #header>
      <div @click="pickFile" class="card">
        <div class="side card-upload">
          <v-icon class="img-upload">mdi-image</v-icon>
        </div>
        <img
          class="image-response"
          :src="selectedClient.foto_perfil"
          height="80"
          v-if="selectedClient.foto_perfil"
        />
      </div>
      <h4 class="not-margin">Visualizar <b>{{selectedClient.TipoUsuario}}</b></h4>
    </template>

    <div class="con-form">
      <v-form
        v-model="valid"
        style="justify-content:center; align-items: center; flex-direction: row; display: flex"
      >
        <v-row>
          <v-col cols="12" sm="6">
            <div class="group-data-client">
              <template>
                <vs-input
                  readonly
                  v-model="selectedClient.nome"
                  :rules="nameRules"
                  label="Nome do cliente"
                  required
                />
              </template>
              <template>
                <vs-input
                  readonly
                  label="Nome do cônjuge"
                  v-model="selectedClient.nome_conjuge"
                />
              </template>
              <template>
                <vs-input
                  readonly
                  label="Telefone"
                  v-model="selectedClient.telefone"
                  placeholder="11 98765 4321"
                  :rules="phone_rules"
                  required
                />
              </template>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="group-data-client">
              <div class="inputControl bornDateControl">
                <template>
                  <vs-input
                    readonly
                    type="date"
                    v-model="selectedClient.data_nascimento"
                    label="Data de Nascimento"
                    required
                  />
                </template>
              </div>
              <div class="inputControl bornDateControlPair">
                <template>
                  <vs-input
                    readonly
                    type="date"
                    v-model="selectedClient.data_nascimento_conjuge"
                    label="Data de Nascimento do Conjuge"
                    required
                  />
                </template>
              </div>
              <div class="inputControl">
                <vs-input
                  readonly
                  v-model="selectedClient.email"
                  :rules="email.length > 0 ? emailRules : []"
                  label="E-mail"
                >
                  <template #icon>
                    <v-icon>mdi-email</v-icon>
                  </template>
                </vs-input>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </div>

    <template #footer>
      <div class="footer-dialog"></div>
    </template>
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
