<template>
  <v-app-bar>
    <v-spacer class="space"></v-spacer>
    <Seed v-if="false" />
    <div class="top-items">
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <!-- <v-list-item-avatar style="margin-right:10px">
        <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
      </v-list-item-avatar> -->

      <span class="top-menu">
        <v-menu bottom offset-y class="extend_menu mobile-menu">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2"
              fab
              small
              color="#002b4b"
              v-bind="attrs"
              v-on="on"
            >
              <span style="color:white">{{ name }}</span>
            </v-btn>
          </template>
          <v-list class="mobile-view">
            <div class="extend_icon_name">
              <v-btn class="mx-2" fab small color="#002b4b">
                <span style="color:white">{{ name }}</span>
              </v-btn>
              <div class="extend_name_email">
                <strong>{{ username }}</strong>
                <span style="color:gray">{{ email }}</span>
              </div>
            </div>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="(option, i) in user_options"
              :key="i"
              @click="() => {}"
            >
              <v-list-item-title>{{ option.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item style="display:contents">
              <v-btn outlined @click="logout">
                Sair
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </span>
    </div>

    <v-dialog v-model="error_dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Erro
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
  </v-app-bar>
</template>

<script>
import Seed from "@/components/Seed";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
export default {
  name: "TopBar",
  components: {
    Seed,
  },
  props: {
    email: String,
  },
  mixins: [FirebaseMixin],
  data() {
    return {
      user: null,
      username: "",
      user_options: [
        {
          title: "Conta",
        },
        {
          title: "Configurações",
        },
      ],
      signedIn: false,
      error_dialog: false,
      error: "",
    };
  },
  async updated() {
    const response = await this.getDocument(
      Firebase.firestore(),
      "Usuario",
      "email",
      this.email
    );
    this.username = response.documents[0].data.nome;
  },
  computed: {
    name: function() {
      let initials = "";
      this.username.split(" ").map((name) => {
        initials += name[0];
      });
      return initials.substr(0, 2);
    },
  },
  methods: {
    async logout() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
  },
};
</script>
<style lang="css">
html,
body {
  overflow-y: auto !important;
  height: 100vh;
  width: 100vw !important;
}

.top-items {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top-menu {
  display: flex;
  align-items: center;
}
.v-menu__content {
  width: 15em !important;
  top: 48px;
  left: 750px;
  transform-origin: left top 0px;
  z-index: 8;
}
.extend_icon_name {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}
.extend_name_email {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */

  .home {
    background-color: white !important;
  }
  body {
    overflow-x: auto;
    overflow-y: auto;
  }

  .v-menu__content {
    width: auto !important;
  }

  .extend_icon_name {
    display: flex;
    flex-direction: column !important;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
}
</style>
