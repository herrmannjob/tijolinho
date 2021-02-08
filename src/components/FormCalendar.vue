<template>
  <v-dialog
    max-width="600px"
    v-model="form"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">Nova tarefa:</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-col
            cols="12"
          >

            <p style="text-align:left">Data: {{ date }}</p>

            <v-text-field
              label="Tarefa*"
              required
            ></v-text-field>

            <v-select
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Cliente*"
              required
            ></v-select>

            <v-select
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Obra*"
              required
            ></v-select>

            <v-select
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Prioridade*"
              required
            ></v-select>

            <v-select
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Categoria*"
              required
            ></v-select>

            <v-textarea
              color="teal"
            >
              <template v-slot:label>
                <div>
                  Observações
                </div>
              </template>
            </v-textarea>
          </v-col>
          
        </v-container>
        <small>*Campos obrigatórios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          Fechar
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FormCalendar',
  props: {
    form: Boolean,
    date: String,
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('update:form', false)
    }
  }
}
</script>
<style lang="css">
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body{
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
