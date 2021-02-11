<template>
  <div class="Login">
    <FormLogin/>
  </div>
</template>

<script>

import FormLogin from '@/components/FormLogin.vue'
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
export default {
  name: 'Login',
  components: {
    FormLogin
  },
  data () {
    return {
      signedIn: false,
      error: ''
    }
  },
  async beforeCreate() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log('user: ', user)
      this.signedIn = true
    } catch (error) {
      this.error = error
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    });
  }
}
</script>
