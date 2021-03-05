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
        <v-col
          cols="12"
        >

          <v-text-field
            label="Atividade*"
            :rules="[rules.required]"
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

          <v-select
            :items="priority_list"
            v-model="priority"
            label="Prioridade"
            dense
          ></v-select>

          <v-menu
            ref="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateStart.date"
                label="Início"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="dateStart.date"
              min="1950-01-01"
            ></v-date-picker>
          </v-menu>

          <v-menu
            ref="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="dateStart.time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateStart.time"
                label="Horário inicial"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="dateStart.time"
              @click:minute="$refs.menu.save(dateStart.time)"
              full-width
            ></v-time-picker>
          </v-menu>

          <v-menu
            ref="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateEnd.date"
                label="Término"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="dateEnd.date"
              min="1950-01-01"
            ></v-date-picker>
          </v-menu>

          <v-menu
            ref="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time_end"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateEnd.time"
                label="Horário final"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="dateEnd.time"
              @click:minute="$refs.menu.save(dateEnd.time)"
              full-width
            ></v-time-picker>
          </v-menu>
        </v-col>
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
          color="primary"
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
// import { AgendaParticular } from '@/models'
// import Functions from '@/functions/Functions'
import ResponseModal from '@/components/ResponseModal.vue'
export default {
  name: 'FormCalendar',
  components: { ResponseModal },
  props: {
    form: Boolean,
    refresh: Boolean,
    date: String,
    user: Object
  },
  data () {
    return {
      title: '',
      description: '',
      date_end: '',
      time_end: '',
      priority_list: ['Alta', 'Média', 'Baixa'],
      priority: '',
      modal: false,
      message: { title: '', code: '', text: '' },
      rules: {
        required: value => !!value || 'Campo obrigatório.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  mounted () {
  },
  methods: {
    close () {
      this.title = ''
      this.description = ''
      this.date_end = ''
      this.time_end = ''
      this.priority = ''
      this.$emit('update:form', false)
      this.$emit('update:refresh', true)
    },
    async save () {
    //   const start = new Date(this.date)
    //   const end = new Date(this.date_end + 'T' + this.time_end + ':00Z')
    //   const duration = (end - start) / 1000 / 60 / 60 / 24
    //   const response = await Functions.putData(AgendaParticular, {
    //     "titulo": this.title,
    //     "descricao": this.description,
    //     "data_inicio": this.dateStart.date + 'T' + this.dateStart.time + ':00.000Z',
    //     "data_fim": this.date_end + 'T' + this.time_end + ':00.000Z',
    //     "duracao": `${duration} dia(s)`,
    //     "prioridade": this.priority,
    //     "Usuario": this.user
    //   })
    //   console.log(response)
    //   if (response.status === 'ok') {
    //     this.message.title = "Atividade cadastrada com sucesso!"
    //   } else {
    //     this.message.title = "Ocorreu um erro..."
    //     this.message.code = response.error.code
    //     this.message.text = response.error.message
    //   }
    //   this.modal = true
    }
  },
  computed: {
    dateStart: function () {
      return { date: this.date.substr(0, 10), time: this.date.substr(11, 5) }
    },
    dateEnd: function () {
      const time = this.date.substr(11, 5)
      const day = (parseInt(time.substr(0, 2)) + 1).toString()
      return { date: this.date.substr(0, 10), time: day + time.substr(2) }
    }
  }
}
</script>
<style lang="css">
.theme--light.v-messages {
  display: flex !important;
  color: red;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body{
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
