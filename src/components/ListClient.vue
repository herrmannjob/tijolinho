<template>
  <div class="home">
    <div class="content">
      <div class="components row">
        <div class="col-9">
          <v-text-field
            solo
            label="Buscar Cliente"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          <div style="align-items:flex-start;width:1rem">
            <v-btn
              color="primary"
              class="btn-primario"
              data-app
              @click="openDialog"
              v-bind="attrs"
              v-on="on"
              style="margin-bottom:0.5rem; margin-left:0; margin-top:0"
            >
              <v-icon>mdi-plus</v-icon>

              <router-link class="link-client" to="/register-client"
                >NOVO CLIENTE</router-link
              >
            </v-btn>
          </div>
          <v-card max-width="900" class="mx-auto">
            <v-list-item v-for="item in itemsTitle" :key="item.title">
              <v-list-item-avatar>
                <v-list-item-title v-text="item.avatar"></v-list-item-title>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="item.obras"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <p>Ações</p>
              </v-list-item-icon>
            </v-list-item>
            <v-list>
              <v-list-item v-for="item in items" :key="item.title">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title v-text="item.obras"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-icon>
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-icon>
                  <v-icon>
                    mdi-eye
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
        <v-divider vertical></v-divider>
        <!--Ultimos vizualizados ----- -->
        <div class="col right-col">
          <div class="row group-data">
            <p class="title">Ultimos Vizualizados:</p>
            <v-btn text color="primary" class="col">
              Ver todos
            </v-btn>
          </div>
          <div>
            <v-card
              class="card-right"
              color="primary"
              v-for="(item, i) in 3"
              :key="i"
            >
              <v-expansion-panels accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-avatar class="avatar" tile>
                      <v-img
                        src="https://randomuser.me/api/portraits/women/85.jpg"
                      ></v-img>
                    </v-avatar>
                    <span style="margin-left:5px">{{ username }}</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { api, urls } from '../services/Api'

export default {
  data() {
    return {
      today: "",
      username: "Usuário Teste",
      itemsTitle: [
        {
          title: "Nome",
          avatar: "Foto",
          obras: "Obras ativas",
          icons: "Ações",
        },
      ],
      items: [
        {
          title: "Jason Oner",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          obras: 2,
        },
        {
          title: "Travis Howard",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          obras: 3,
        },
        {
          title: "Ali Connors",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          obras: 4,
        },
        {
          title: "Cindy Baker",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          obras: 8,
        },
      ],
    };
  },
};
</script>
<style lang="css">
html,
body {
  overflow-y: auto;
}
.teste1 {
  flex: 0, 0 !important;
}
.home {
  display: flex;
  align-self: stretch;
  height: 100vh;
  width: 100%;
}
.content {
  width: 100vw;
}
.paragrafo {
  float: inline-start;
  flex: 1 1;
}
.link-client {
  color: aliceblue;
  text-decoration: none;
}

.components {
  padding: 20px;
}
.right-col > .title {
  margin-top: 20px;
}
.card-right {
  margin-top: 5px;
  margin-bottom: 5px;
  min-height: 60px;
}
.group-data {
  align-items: flex-start;
  flex-direction: row;
  padding-left: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.group-data > p {
  padding: 0;
}
.avatar {
  display: flex;
  width: 65px !important;
  height: 65px !important;
}
</style>
