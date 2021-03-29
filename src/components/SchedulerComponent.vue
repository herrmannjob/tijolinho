<script>
import ModalCalendar from "@/components/ModalCalendar";
import Firebase from "@/services/Firebase";
import { FirebaseMixin } from "@/mixins/FirebaseMixin";
// import { db } from '../services/Firebase.js'

export default {
  name: "SchedulerComponent",
  components: { ModalCalendar },
  mixins: [FirebaseMixin],
  data: () => ({
    client_names: [],
    clients: [],
    clienteSelecionado: "",
    color: "primary",
    colors: [
      "#2196F3",
      "#3F51B5",
      "#673AB7",
      "#00BCD4",
      "#4CAF50",
      "#FF9800",
      "#757575",
    ],
    corPrioridade: "",
    companies: [],
    constructions: [],
    constructions_names: [],
    createEvent: null,
    createStart: null,
    currentlyEditing: null,
    date_clicked: "",
    details: null,
    dialog: false,
    dialogDate: false,
    dragEvent: null,
    dragStart: null,
    end: null,
    endMenu: false,
    events: [],
    eventos: [],
    extendOriginal: null,
    focus: new Date().toISOString().substr(0, 10),
    form: false,
    mode: "stack",
    modes: ["stack", "column"],
    name: null,
    obraSelecionada: "",
    ready: false,
    refresh: false,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    start: null,
    startMenu: false,
    today: new Date().toISOString().substr(0, 10),
    type: "month",
    typeChange: "",
    select_view: ["Dia", "Semana", "Mês"],
    types: ["month", "week", "day"],
    typeToLabel: {
      month: "Mês",
      week: "Semana",
      day: "Dia",
    },
    user_email: "",
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdayChange: "",
    weekdays: [],
    task_titulo: null,
    task_cliente: null,
    task_obra: null,
    task_prioridade: null,
    task_categoria: null,
    task_observacao: null,
    particular_tasks: [],
    constructions_tasks: [],
    user: null,
    uid: "",
  }),
  computed: {
    cal() {
      return this.ready ? this.$refs.calendar : null;
    },
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + "px" : "-10px";
    },
    formTitle() {
      return this.editedIndex === -1 ? "Novo Item" : "Editar Item";
    },
  },
  async mounted() {
    this.ready = true;
    this.scrollToTime();
    this.updateTime();
    this.$refs.calendar.checkChange();
    await Firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user_email = user.email;
        await this.getUser();
        await this.getObras();
        await this.getClients();
        await this.getTasks();
        // await this.getEvents();
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
        this.getConstructionsTasks();
      }
    },
    async getTasks() {
      await this.getParticularTasks();
      await this.getConstructionsTasks();
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
            this.eventos.push({
              title: item.titulo,
              color: "#002b4b",
              details: item.data.prioridade,
              start: item.data_inicio.substr(0, 10),
              end: item.data_fim.substr(0, 10),
            });
          });
        }
      });
      // this.events.push(this.eventos);
    },
    async getParticularTasks() {
      const events = [];
      const response = await this.getDocument(
        Firebase.firestore(),
        "AgendaParticular",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.particular_tasks = [];
        response.documents.map((item) => {
          if (item.data.prioridade == "Alta") {
            this.corPrioridade = "#eb4034";
          }
          if (item.data.prioridade == "Média") {
            this.corPrioridade = "#eb9c34";
          }
          if (item.data.prioridade == "Baixa") {
            this.corPrioridade = "#71eb34";
          }
          if (item.data.prioridade == "") {
            this.corPrioridade = "#002b4b";
          }
          this.particular_tasks.push(item.data);
          events.push({
            name: item.data.titulo,
            color: this.corPrioridade,
            details: item.data.descricao,
            start: item.data.data_inicio.substr(0, 10),
            end: item.data.data_fim.substr(0, 10),
          });
        });
      }
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    async getEvents() {
      const events = [];

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
            events.push({
              name: item.data.titulo,
              color: "#002b4b",
              details: item.data.prioridade,
              start: item.data.data_inicio.substr(0, 10),
              end: item.data.data_fim.substr(0, 10),
            });
          });
        }
      });

      const response = await this.getDocument(
        Firebase.firestore(),
        "AgendaParticular",
        "usuarioID",
        this.user_email
      );
      if (response.status === "ok") {
        this.particular_tasks = [];
        response.documents.map((item) => {
          this.particular_tasks.push(item.data);
          events.push({
            name: item.data.titulo,
            color: "#002b4b",
            details: item.data.prioridade,
            start: item.data.data_inicio.substr(0, 10),
            end: item.data.data_fim.substr(0, 10),
          });
        });
      }
    },
    getCurrentTime() {
      return this.cal
        ? this.cal.times.now.hour * 60 + this.cal.times.now.minute
        : 0;
    },
    scrollToTime() {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal.scrollToTime(first);
    },
    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },
    dateClick(info) {
      this.form = true;
      this.date_clicked = info.dateStr;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    editEvent() {
      this.form = true;
    },
    async deleteEvent (ev) {
      Firebase.firestore(),
        "AgendaParticular",
        "usuarioID",
        this.user_email.doc(ev).delete()
      this.selectedOpen = false,
      this.getEvents()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    changeView() {
      switch (this.typeChange) {
        case "day":
          this.type = "day";
          break;
        case "week":
          this.type = "week";
          break;
        case "month":
          this.type = "month";
          break;
      }
    },
    // changeDaysView() {
    //   switch (this.weekdayChange) {
    //     case "Dom - Sáb":
    //       this.weekday = [0, 1, 2, 3, 4, 5, 6];
    //       break;
    //     case "Seg - Dom":
    //       this.weekday = [1, 2, 3, 4, 5, 6, 0];
    //       break;
    //     case "Seg - Sex":
    //       this.weekday = [1, 2, 3, 4, 5];
    //       break;
    //     case "Final de Semana":
    //       this.weekday = [6, 0];
    //       break;
    //   }
    // },
    startDrag({ event, timed }) {
      if (event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
    startTime(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start;

        this.dragTime = mouse - start;
      } else {
        this.createStart = this.roundTime(mouse);
        this.createEvent = {
          name: `Event #${this.events.length}`,
          color: this.rndElement(this.colors),
          start: this.createStart,
          end: this.createStart,
          timed: true,
        };

        this.events.push(this.createEvent);
      }
    },
    extendBottom(event) {
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    mouseMove(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start;
        const end = this.dragEvent.end;
        const duration = end - start;
        const newStartTime = mouse - this.dragTime;
        const newStart = this.roundTime(newStartTime);
        const newEnd = newStart + duration;

        this.dragEvent.start = newStart;
        this.dragEvent.end = newEnd;
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.createStart);
        const max = Math.max(mouseRounded, this.createStart);

        this.createEvent.start = min;
        this.createEvent.end = max;
      }
    },
    endDrag() {
      this.dragTime = null;
      this.dragEvent = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;
    },
    cancelDrag() {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
        } else {
          const i = this.events.indexOf(this.createEvent);
          if (i !== -1) {
            this.events.splice(i, 1);
          }
        }
      }

      this.createEvent = null;
      this.createStart = null;
      this.dragTime = null;
      this.dragEvent = null;
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
  },
};
</script>

<template>
  <div>
    <v-sheet height="64" class="d-flex menu-flex">
      <v-btn icon class="ma-2" @click="prev()">
        <v-icon class="icone-setas">mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <template>
        <div class="headerCalendar center con-selects">
          <vs-select
            :state="color"
            label-placeholder="Calendário"
            v-model="typeChange"
            :onselect="changeView()"
          >
            <vs-option label="Dia" value="day">
              Dia
            </vs-option>
            <vs-option label="Semana" value="week">
              Semana
            </vs-option>
            <vs-option label="Mês" value="month">
              Mês
            </vs-option>
          </vs-select>
        </div>
      </template>
      <template>
        <div class="headerCalendar center con-selects">
          <vs-select
            :state="color"
            filter
            label-placeholder="Cliente"
            v-model="clienteSelecionado"
          >
            <vs-option
              v-for="(cliente, index) in client_names"
              :key="index"
              :label="cliente"
            >
              {{ cliente }}
            </vs-option>
          </vs-select>
        </div>
      </template>
      <template>
        <div class="headerCalendar center con-selects">
          <vs-select
            :state="color"
            filter
            label-placeholder="Obra"
            v-model="obraSelecionada"
          >
            <vs-option
              v-for="(obra, index) in constructions_names"
              :key="index"
              :label="obra"
            >
              {{ obra }}
            </vs-option>
          </vs-select>
        </div>
      </template>
      <v-spacer></v-spacer>
      <v-btn fab text small icon class="ma-2" @click="next()">
        <v-icon class="icone-setas">mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="today"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        :event-ripple="false"
        :now="today"
        color="primary"
        @change="getEvents"
        @mousedown:event="startDrag"
        @mousedown:time="startTime"
        @mousemove:time="mouseMove"
        @mouseup:time="endDrag"
        @mouseleave.native="cancelDrag"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="form = true"
        ><template v-slot:event="{ event, timed, eventSummary }">
          <div class="v-event-draggable" v-html="eventSummary()"></div>
          <div
            v-if="timed"
            class="v-event-drag-bottom"
            @mousedown.stop="extendBottom(event)"
          ></div>
        </template>
        <template v-slot:day-body="{ date, week }">
          <div
            class="v-current-time"
            :class="{ first: date === week[0].date }"
            :style="{ top: nowY }"
          ></div>
        </template>
      </v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" :width="350" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-btn @click="deleteEvent(selectedEvent.id)" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>

          <v-card-text>
            <form v-if="currentlyEditing !== selectedEvent.id">
              {{ selectedEvent.details }}
            </form>
            <form v-else>
              <textarea-autosize
                v-model="selectedEvent.details"
                type="text"
                style="width: 100%"
                :min-height="100"
                placeholder="add note"
              >
              </textarea-autosize>
            </form>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">
              Fechar
            </v-btn>
            <v-btn
              v-if="currentlyEditing !== selectedEvent.id"
              text
              @click.prevent="editEvent(selectedEvent)"
            >
              Editar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
    <ModalCalendar
      :form.sync="form"
      :refresh.sync="refresh"
      :date="date_clicked"
      :user="user_email"
    />
  </div>
</template>

<style scoped lang="scss">
.headerCalendar {
  margin-left: 1%;
  margin-right: 1%
}

.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: "";
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
.menu-flex {
  display: flex;
}

.v-event-draggable {
  padding-left: 6px;
  color: white;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: "";
  }

  &:hover::after {
    display: block;
  }
}

@media only screen and (max-width: 1000px) {
  .tipo-calendario {
    width: 17% !important;
  }

  .dias-da-semana {
    width: 20% !important;
  }

  .fonte-btns {
    font-size: 9px;
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
  }

  .icone-btns {
    display: none;
  }
}

@media only screen and (max-width: 768px) {
  .icone-setas {
    color: #002b4b !important;
  }
}
</style>
