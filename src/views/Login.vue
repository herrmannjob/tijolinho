<template>
  <div >
    <FormLogin/>
  </div>
</template>

<script>

import FormLogin from '@/components/FormLogin.vue'
import { AmplifyEventBus } from 'aws-amplify-vue'
import Functions from '@/functions/Functions'
import Tarefas from '@/functions/tarefas'
export default {
  name: 'Login',
  components: {
    FormLogin
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
      this.$router.push('calendar')
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
