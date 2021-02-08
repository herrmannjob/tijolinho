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
          <v-btn
            color="primary"
            class="btn-primario"
            data-app
            @click="openDialog"
            v-bind="attrs"
            v-on="on"
            style="margin-bottom:1rem; margin-left:0; margin-top:0"
          >
            <v-icon>mdi-plus</v-icon>

            <router-link class="link-client" to="/register-client"
              >NOVO CLIENTE</router-link
            >
          </v-btn>

          <v-card>
            <v-list flat>
              <template v-for="(item, index) in items.slice(0, 6)">
                <v-subheader v-if="item.header" :key="item.header">
                  {{ item.header }}
                </v-subheader>
                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>
                <v-list-item v-else :key="item.title">
                  <v-list-item-content>
                    <div>
                      <v-list-item-avatar>
                        <img :src="item.avatar" />
                      </v-list-item-avatar>

                      <v-list-item-title v-html="item.name">
                      </v-list-item-title>

                      <v-list-item-subtitle
                        v-html="item.obras"
                      ></v-list-item-subtitle>

                      <v-icon medium class="mr-2" @click="editItem(item)">
                        mdi-pencil
                      </v-icon>
                      <v-icon medium @click="deleteItem(item)">
                        mdi-delete
                      </v-icon>
                      <v-icon medium @click="deleteItem(item)">
                        mdi-eye
                      </v-icon>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </template>
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

      items: [
        { header: "Meus clientes" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "Joao Barcelos",
          obras: `<span class="font-weight-bold">Quantitade de Obras:3 </span> `,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          name: "Claudio Oliveira",
          obras: `<span class="font-weight-bold">Quantitade de Obras:3 </span> `,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Mariana Vasconcelos",
          obras: `<span class="font-weight-bold">Quantitade de Obras:3 </span> `,
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
.home {
  display: flex;
  align-self: stretch;
  height: 100% !important;
  width: 100%;
}
.content {
  width: 100%;
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
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 60px;
}
.group-data {
  align-items: center;
  padding-left: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.group-data > p {
  padding: 0;
}
.avatar {
  display: block;
  width: 65px !important;
  height: 65px !important;
}
</style>
