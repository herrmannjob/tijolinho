<template>
  <div >
    <ModalLogin/>
  </div>
</template>

<script>

import ModalLogin from '@/components/ModalLogin.vue'
import { AmplifyEventBus } from 'aws-amplify-vue'
import Functions from '@/functions/Functions'
import Tarefas from '@/functions/tarefas'
export default {
  name: 'Login',
  components: {
    ModalLogin
  },
  data () {
    return {
      signedIn: false,
      error: '',
      user: null,
    }
  },
  async beforeCreate() {
    try {
      var tarefa = await Tarefas.cadastra()
      console.log(tarefa)
      this.user = await Functions.isAuth()
      this.signedIn = true
      this.$router.push('calendario')
    } catch (error) {
      console.log('erro: ', error)
      this.signedIn = false
      this.user = null
    }
    AmplifyEventBus.$on('authState', info => {
      console.log('info: ', info)
      if (info === 'signedIn') {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    });
  },
}
</script>
