<template>
  <div class="home">
    <Drawer />
    <div class="content">
      <TopBar />
      <div class="components row">
        <div class="col-9">
          <CalendarComponent />
        </div>
        <v-divider vertical></v-divider>
        <div class="col right-col">
          <p class="title">Compromissos:</p>
          <div class="row date">
            <p class="col">{{ today }}</p>
            <v-btn
              text
              color="primary"
              class="col"
            >
              Ver todos
            </v-btn>
          </div>
          <div>
            <v-card
              class="card-right"
              color="primary"
              v-for="(item,i) in 3"
              :key="i"
            >
              <v-expansion-panels accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-avatar
                      class="avatar"
                      tile
                    >
                      <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                    </v-avatar>
                    <span style="margin-left:5px">{{ username }}</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
import CalendarComponent from '@/components/CalendarComponent.vue'
import Drawer from '@/components/Drawer.vue'
import TopBar from '@/components/TopBar.vue'
import moment from '@/plugins/moment'

export default {
  name: 'Calendar',
  components: {
    CalendarComponent, Drawer, TopBar
  },
  data () {
    return {
      today: '',
      username: 'Usuário Teste'
    }
  },
  created () {
    this.today = moment().format('ll')
  },
  methods: {
    async login () {
    }
  }
}
</script>
<style lang="css">
html, body {
  overflow-y:auto;
}
.home {
  display: flex;
  align-self: stretch;
  height: 100%!important;
  width: 100%;
}
.content {
  width: 100%;
}
.components {
  padding: 20px;
}
.right-col > .title {
  margin-top: 20px;
  text-align: left;
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
.date {
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
