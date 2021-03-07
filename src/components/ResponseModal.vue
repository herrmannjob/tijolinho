<template>
    <v-dialog
      v-model="modal"
      persistent
      max-width="500"
    >
      <v-card>
           <div class="header-dialog">
    <!-- <img  class="icone" src="@/assets/warning.svg" width="50px" height="50px" alt="warning"> -->
    </div>
        <v-card-title class="headline">
          {{ message.title }}
        </v-card-title>
        <v-card-text v-if="message.text.length > 0" style="text-align:left">
         {{ message.text }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'ResponseModal',
  props: {
    modal: Boolean,
    message: Object,
  },
  methods: {
    close () {
      this.$emit('update:modal', false)
    }
  }
}
</script>
<style lang="css">
.header-dialog{
  background-color: #002b4b;
  height: 45px;
 
}
.icone{
 margin-top: 10px;
  transform: translateY(10%);
}
</style>