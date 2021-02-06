<template>
  <div class="home">
    <Drawer />
    <div class="content">
      <TopBar />
      <FormRegisterClient/>
    </div>
  </div>
</template>

<script>
// import { api, urls } from '../services/Api'
import FormRegisterClient from '@/components/FormRegisterClient.vue'
import Drawer from '@/components/Drawer.vue'
import TopBar from '@/components/TopBar.vue'


export default {
  name: 'Calendar',
  components: {
    FormRegisterClient, Drawer, TopBar
  },
  
}
</script>
<style lang="css">
html, body {
  overflow-y: hidden;
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
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body{
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
