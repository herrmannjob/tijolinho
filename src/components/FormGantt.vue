<template>
  <v-dialog
    max-width="600px"
    v-model="form"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">Nova atividade:</span>
      </v-card-title>
      <v-card-text>
        <div>
          <v-col
            cols="12"
          >

            <v-text-field
              label="Atividade*"
              required
              v-model="title"
            ></v-text-field>

            <v-textarea
              color="teal"
              v-model="description"
            >
              <template v-slot:label>
                <div>
                  Descrição
                </div>
              </template>
            </v-textarea>

            <v-menu
              ref="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Início"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                min="1950-01-01"
              ></v-date-picker>
            </v-menu>

            <v-menu
              ref="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="end_date"
                  label="Término"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="end_date"
                min="1950-01-01"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </div>
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
import { AgendaParticular } from '@/models'
import Functions from '@/functions/Functions'
import ResponseModal from '@/components/ResponseModal.vue'
export default {
  name: 'FormGantt',
  components: { ResponseModal },
  props: {
    form: Boolean,
    date: String,
    user: Object
  },
  data () {
    return {
      title: '',
      description: '',
      end_date: '',
      modal: false,
      message: { title: '', code: '', text: '' }
    }
  },
  created () {

  },
  methods: {
    close () {
      this.$emit('update:form', false)
    },
    async save () {
      const start = new Date(this.date)
      const end = new Date(this.end_date)
      const duration = (end - start) / 1000 / 60 / 60 / 24
      const response = await Functions.putData(AgendaParticular, {
        "titulo": this.title,
        "descricao": this.description,
        "data_inicio": this.date + 'Z',
        "data_fim": this.end_date + 'Z',
        "duracao": `${duration} dia(s)`,
        "Usuario": this.user
      })
      if (response.status === 'ok') {
        this.message.title = "Atividade cadastrada com sucesso!"
      } else {
        this.message.title = "Ocorreu um erro..."
        this.message.code = response.error.code
        this.message.text = response.error.message
      }
      this.modal = true
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
