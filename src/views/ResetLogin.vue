<template>
  <div class="home">
<ResetLoginComponent/>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */


// import { api, urls } from '../services/Api'
import ResetLoginComponent from '@/components/ResetLoginComponent.vue'


export default {
  name: 'ResetLoginComponent',
  components: {
   ResetLoginComponent
  },
  
  
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

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .right-col{
    display: none;
  }
  .calendar {
    border-right: none;
  }
}
</style>
