<template>
    <v-dialog
      v-model="modal"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">
          {{ message.title }}
        </v-card-title>
        <v-card-text v-if="message.code.length > 0" style="text-align:left">
          Código: {{ message.code }}
        </v-card-text>
        <v-card-text v-if="message.text.length > 0" style="text-align:left">
          Mensagem: {{ message.text }}
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