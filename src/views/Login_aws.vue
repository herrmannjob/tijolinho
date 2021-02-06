<template>
    <div id="app">
      <div v-if="!signedIn">
         <amplify-authenticator></amplify-authenticator>
      </div>
      <div v-if="signedIn">
        <amplify-sign-out class="signout"></amplify-sign-out>
        <div class="container">
          <amplify-photo-picker
            v-bind:photoPickerConfig="photoPickerConfig"
          ></amplify-photo-picker>
          <amplify-s3-album path="images/"></amplify-s3-album>
        </div>
      </div>
    </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
const photoPickerConfig = {
  path: 'images/',
}
export default {
  name: 'app',
  async beforeCreate() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
      this.signedIn = true
    } catch (err) {
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    });
  },
  data () {
    return {
      photoPickerConfig,
      signedIn: false
    }
  }
}
</script>

<style>
body {
  margin: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  padding: 40px;
}
.signout {
  background-color: #ededed;
  margin: 0;
  padding: 11px 0px 1px;
}
</style>