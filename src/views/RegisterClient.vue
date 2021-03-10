<template>
  <div class="home">
    <Drawer />
    <div class="content">
      <TopBar :email="email" />
      <FormRegisterClient/>
    </div>
  </div>
</template>

<script>
// import { api, urls } from '../services/Api'
import FormRegisterClient from '@/components/FormRegisterClient.vue'
import Drawer from '@/components/Drawer.vue'
import TopBar from '@/components/TopBar.vue'
import Firebase from "@/services/Firebase"


export default {
  name: 'Calendar',
  components: {
    FormRegisterClient, Drawer, TopBar
  },
  data () {
    return {
      email: '',
    }
  },
  async mounted () {
    await Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.email = user.email
      }
      else this.$router.push("/")
    })
  },
}
</script>
<style lang="css">
html, body {
  overflow-y: auto;
}
.home {
  display: flex;
  align-self: stretch;
  height: 100vh;
  width: 100%;
}
.content {
  width: 100%;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body{
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
