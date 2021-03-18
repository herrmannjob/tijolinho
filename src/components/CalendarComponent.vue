<script>
import FullCalendar from "@fullcalendar/vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "@/plugins/sweetalert";
import ModalCalendar from "@/components/ModalCalendar";
import CalendarWeek from "@/components/CalendarWeek";
import CalendarDay from "@/components/CalendarDay";
import CalendarMonth from "@/components/CalendarMonth";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";

export default {
  name: "CalendarComponent",
  components: {
    ModalCalendar,
    CalendarWeek,
    CalendarDay,
    CalendarMonth,
    FullCalendar,
  },
  mixins: [FirebaseMixin],
  data() {
    return {
      user: null,
      uid: "",
      select_view: ["Agenda", "Dia", "Dias Úteis", "Semana", "Mês"],
      calendar_view: "",
      clients: [],
      client_names: ["Nenhum cliente cadastrado"],
      constructions_names: ["Nenhuma obra cadastrada"],
      constructions: [],
      companies: [],
      view_week: true,
      view_day: false,
      view_month: false,
      calendarOptions: {
        aspectRatio: 2,
        contentHeight: 600,
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        locale: "pt-br",
        editable: true,
        dayHeaderFormat: { weekday: "long", day: "numeric", omitCommas: true },
        allDayText: "Dia inteiro",
        // headerToolbar: {
        //   left: "title",
        //   center: "",
        //   right:
        //     "prev,next today dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        // },
        headerToolbar: {
          left: "title",
          center: "",
          right: "today prev,next",
        },
        buttonText: {
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          list: "Lista",
        },
        eventBorderColor: "rgb(255, 255, 255, 0.4)",
        views: {
          timeGridWeek: {
            titleFormat: { year: "2-digit", month: "2-digit", day: "2-digit" },
          },
        },
        timeZone: "UTC",
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        dateClick: this.dateClick,
        events: [],
      },
      form: false,
      date_clicked: "",
      task_titulo: null,
      task_cliente: null,
      task_obra: null,
      task_prioridade: null,
      task_categoria: null,
      task_observacao: null,
      particular_tasks: [],
      constructions_tasks: [],
      refresh: false,
      user_email: "",
    };
  },
  async mounted() {
    await Firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user_email = user.email;
        await this.getUser();
        await this.getObras();
        await this.getClients();
        await this.getTasks();
      }
    });
  },
  async updated() {
    if (this.refresh) {
      await this.getTasks();
      this.refresh = false;
    }
  },
  methods: {
    async getUser() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "Usuario",
        "email",
        this.user_email
      );
      this.username = response.documents[0].data.nome;
    },
    async getObras() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "Obra",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.constructions = [];
        this.constructions_names = [];
        response.documents.map((item) => {
          this.constructions.push(item.data);
          this.constructions_names.push(item.data.nome);
        });
      }
    },
    async getCompanies() {
      const response = await this.getDocumentList(
        Firebase.firestore(),
        "Empresa",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.companies = response.documents;
      }
    },
    async getClients() {
      await this.getCompanies();
      if (this.companies.length > 0) {
        let client_ids = [];
        this.companies.map((company) => {
          company.usuarioID.map((client) => {
            if (client !== this.user_email) client_ids.push(client);
          });
        });
        if (client_ids.length > 0) {
          this.clients = [];
          this.client_names = [];
          client_ids.map(async (item) => {
            const response = await this.getDocument(
              Firebase.firestore(),
              "Usuario",
              "id",
              item
            );
            this.clients.push(response.documents[0].data);
            this.client_names.push(response.documents[0].data.nome);
          });
        }
      }
    },
    async getTasks() {
      await this.getParticularTasks();
      await this.getConstructionsTasks();
    },
    async getParticularTasks() {
      const response = await this.getDocument(
        Firebase.firestore(),
        "AgendaParticular",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.particular_tasks = [];
        this.calendarOptions.events = [];
        response.documents.map((item) => {
          this.particular_tasks.push(item.data);
          this.calendarOptions.events.push({
            title: item.data.titulo,
            start: item.data.data_inicio.substr(0, 19) + "Z",
            end: item.data.data_fim.substr(0, 19) + "Z",
          });
        });
      }
    },
    async getConstructionsTasks() {
      this.constructions_tasks = [];
      this.constructions.map(async (c) => {
        const response = await this.getDocument(
          Firebase.firestore(),
          "AgendaObra",
          "obraID",
          c.id
        );
        if (response.status === "ok") {
          response.documents.map((item) => {
            this.constructions_tasks.push(item.data);
            this.calendarOptions.events.push({
              title: item.data.titulo,
              start: item.data.data_inicio,
              end: item.data.data_fim,
            });
          });
        }
      });
    },
    changeView() {
      switch (this.calendar_view) {
        case "Mês":
          this.calendarOptions.initialView = "dayGridMonth";
          this.view_week = false;
          this.view_day = false;
          this.view_month = true;
          this.calendarOptions.weekends = true;
          break;
        case "Dia":
          this.calendarOptions.initialView = "timeGridDay";
          this.view_week = false;
          this.view_month = false;
          this.view_day = true;
          this.calendarOptions.weekends = true;
          break;
        default:
          this.calendarOptions.initialView = "timeGridWeek";
          this.view_day = false;
          this.view_month = false;
          this.view_week = true;
          this.calendarOptions.weekends = true;
          break;
        case "Agenda":
          this.calendarOptions.initialView = "listWeek";
          this.view_week = false;
          this.view_month = false;
          this.view_day = false;
          this.view_list = true;
          this.calendarOptions.weekends = true;
          break;
        case "Dias Úteis":
          this.calendarOptions.weekends = false;
          break;
      }
    },
    dateClick(info) {
      this.form = true;
      this.date_clicked = info.dateStr;
    },
    selectDate(info) {
      Swal.fire("selected " + info.startStr + " to " + info.endStr);
    },
    toggleWeekends: function() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends;
    },
  },
};
</script>
<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            :items="select_view"
            label="Calendário"
            v-model="calendar_view"
            :onselect="changeView()"
            dense
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-select :items="client_names" label="Cliente" dense></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-select :items="constructions_names" label="Obra" dense></v-select>
        </v-col>
      </v-row>

      <ModalCalendar
        :form.sync="form"
        :refresh.sync="refresh"
        :date="date_clicked"
        :user="user_email"
      />

      <CalendarWeek
        :options="calendarOptions"
        v-if="view_week"
        ref="calendar"
      />

      <CalendarDay :options="calendarOptions" v-if="view_day" ref="calendar" />

      <CalendarMonth
        :options="calendarOptions"
        v-if="view_month"
        ref="calendar"
      />
      <button @click="toggleWeekends">toggle weekends</button>
      <FullCalendar
        class="demo-app-calendar"
        :options="calendarOptions"
        v-show="false"
      />
    </div>
  </div>
</template>
<style lang="scss">
h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  margin: 1.5em 0;
  padding: 0;
}
b {
  margin-right: 3px;
}
.components {
  background-color: #FFFFFF;
}
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}
.demo-app-sidebar-section {
  padding: 2em;
}
.demo-app-main {
  flex-grow: 1;
  padding: 2em;
}
.fc {
  max-width: 1100px;
  margin: 0 auto;
}

.fc-toolbar-title {
  font-size: 16px !important;
  text-transform: capitalize !important;
}

.fc-col-header-cell-cushion {
  text-transform: capitalize !important;
}
.fc .fc-col-header-cell-cushion {
  padding-top: 5px;
  padding-bottom: 5px;
}
.fc-timegrid-slot {
  height: 2.5em !important;
}

.fc-scroller {
  overflow: hidden !important;
}

.fc-scroller-liquid-absolute {
  overflow: auto !important;
}

.fc-timegrid-slot-label {
  border-left: none !important;
}

.fc-scroller-liquid-absolute::-webkit-scrollbar {
  width: 10px !important;
}

.fc-scroller-liquid-absolute::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey !important;
  border-radius: 10px !important;
  display: none;
}

.fc-scroller-liquid-absolute::-webkit-scrollbar-thumb {
  background: #002b4b !important;
  border-radius: 10px !important;
}

.fc-scroller-liquid-absolute::-webkit-scrollbar-thumb:hover {
  background: #00457a !important;
}

.fc .fc-timegrid-slot-label {
  border-left: 0 !important;
}

.fc-button {
  background: #002b4b !important;
}

.fc-button-active {
  background: #00457a !important;
}

.object_calendar {
  height: 100%;
}
.fc {
  height: auto;
}

.fc {
  & .fc-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .fc-toolbar.fc-header-toolbar {
    margin-bottom: 1.5em;
  }

  & .fc-toolbar.fc-footer-toolbar {
    margin-top: 1.5em;
  }

  & .fc-toolbar-title {
    font-size: 1.75em;
    margin: 0;
  }
}

.fc-direction-ltr {
  & .fc-toolbar > * > :not(:first-child) {
    margin-left: 0.75em; 
  }
}

.fc-direction-rtl {
  & .fc-toolbar > * > :not(:first-child) {
    margin-right: 0.75em; 
  }

  & .fc-toolbar-ltr {
    flex-direction: row-reverse;
  }
}

.fc-icon .fc-icon {
  font-family: "Material Icons", serif;
  font-style: normal;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga";
  user-select: none;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .components {
    margin-left: 1px;
    margin-top: 2px;
    padding: 0px !important;
    height: 5rem;
  }

  .demo-app {
    width: 20rem;
    height: 5rem !important;
    margin: 0;
  }

  .demo-app-main {
    padding: 0 !important;
    height: 5rem;
  }
  .right-col{
    width: auto;
  }
}
</style>
