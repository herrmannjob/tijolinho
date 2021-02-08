<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue'
import { api, urls } from '../services/Api'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {}
  },
  methods: {
    async login () {
      const response = await api.post(urls.login, {
        email: 'teste@teste.com',
        password: '4r3e2w1q'
      })
      console.log(response)
    }
  }
}
</script>
