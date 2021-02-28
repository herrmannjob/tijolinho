<template>
  <div class="home">
    <Drawer />
    <div class="content">
      <TopBar />
      <ListClient/>
    </div>
  </div>
</template>

<script>
// import { api, urls } from '../services/Api'
import ListClient from '@/components/ListClient.vue'
import Drawer from '@/components/Drawer.vue'
import TopBar from '@/components/TopBar.vue'


export default {
  name: 'Client',
  components: {
   ListClient, Drawer, TopBar
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
