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
              v-model="title"
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
          @click="save"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
    <ResponseModal :modal.sync="modal" :message="message" />
  </v-dialog>
</template>

<script>
import { Tarefa } from '@/models'
import Functions from '@/functions/Functions'
import ResponseModal from '@/components/ResponseModal.vue'
export default {
  name: 'FormCalendar',
  components: { ResponseModal },
  props: {
    form: Boolean,
    date: String,
  },
  data () {
    return {
      title: '',
      start_date: '',
      end_date: '',
      modal: false,
      message: { title: '', code: '', text: '' }
    }
  },
  methods: {
    close () {
      this.$emit('update:form', false)
    },
    async save () {
      const response = await Functions.putData(Tarefa, {
        // "CronogramaObra": /* Provide a CronogramaObra instance here */,
        // "Responsavel": /* Provide a Usuario instance here */,
        // "status": /* Provide a StatusTarefa instance here */,
        "nome_tarefa": this.title,
        "data_inicio": this.date + 'Z',
        "data_fim": this.date + 'Z',
        // "TarefaOrigem": /* Provide a Tarefa instance here */
      })
      if (response.status === 'ok') {
        this.message.title = "Tarefa cadastrada com sucesso!"
      } else {
        this.message.title = "Ocorreu um erro..."
        this.message.code = response.error.code
        this.message.text = response.error.message
      }
      this.modal = true
      console.log(response)
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
