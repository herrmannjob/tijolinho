<script>
import ModalAgendaObra from "@/components/ModalAgendaObra";
import ModalCalendar from "@/components/ModalCalendar";

export default {
  name: "SchedulerComponent",
  components: { ModalAgendaObra, ModalCalendar },
  data: () => ({
    date_clicked: "",
    refresh: false,
    user_email: "",
    constructions: [],
    constructions_names: [],
    form: false,
    select_view: ["Mês", "Semana", "Dia", "4 Dias"],
    calendar_view: "",
    type: "month",
    types: ["month", "week", "day", "4day"],
    typeToLabel: {
      month: "Mês",
      week: "Semana",
      day: "Dia",
      "4day": "4 dias",
    },
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Dom - Sáb", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Seg - Dom", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Seg - Sex", value: [1, 2, 3, 4, 5] },
      { text: "Seg, Qua, Sex", value: [1, 3, 5] },
      { text: "Final de Semana", value: [6, 0] },
    ],
    value: "",
    events: [],
    colors: [
      "#2196F3",
      "#3F51B5",
      "#673AB7",
      "#00BCD4",
      "#4CAF50",
      "#FF9800",
      "#757575",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  methods: {
    dateClick(info) {
      this.form = true;
      this.date_clicked = info.dateStr;
    },
    changeView() {
      switch (this.type) {
        case "Mês":
          this.type = "month";
          break;
        case "Semana":
          this.type = "week";
          break;
        case "Dia":
          this.type = "day";
          break;
        case "4 Dias":
          this.type = "4day";
          break;
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
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
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
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
    getEventColor(event) {
      const rgb = parseInt(event.color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      return event === this.dragEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event === this.createEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event.color;
    },
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`).getTime();
      const max = new Date(`${end.date}T23:59:59`).getTime();
      const days = (max - min) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const timed = this.rnd(0, 3) !== 0;
        const firstTimestamp = this.rnd(min, max);
        const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000;
        const start = firstTimestamp - (firstTimestamp % 900000);
        const end = start + secondTimestamp;

        events.push({
          name: this.rndElement(this.names),
          color: this.rndElement(this.colors),
          start,
          end,
          timed,
        });
      }

      this.events = events;
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
    <v-sheet tile height="54" class="d-flex menu-flex">
      <v-btn icon class="ma-2" @click="prev()">
        <v-icon class="icone-setas">mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="tipo-calendario"
            outlined
            color="grey darken-2"
            v-bind="attrs"
            v-on="on"
          >
            <span class="fonte-btns">Calendário</span>
            <v-icon class="icone-btns" right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="type = 'day'">
            <v-list-item-title>Dia</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'week'">
            <v-list-item-title>Semana</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'month'">
            <v-list-item-title>Mês</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = '4day'">
            <v-list-item-title>4 Dias</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="dias-da-semana ml-3 mr-3"
            outlined
            color="grey darken-2"
            v-bind="attrs"
            v-on="on"
          >
            <span class="fonte-btns">Dias da Semana</span>
            <v-icon class="icone-btns" right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="weekday = [0, 1, 2, 3, 4, 5, 6]">
            <v-list-item-title>Dom - Sáb</v-list-item-title>
          </v-list-item>
          <v-list-item @click="weekday = [1, 2, 3, 4, 5, 6, 0]">
            <v-list-item-title>Seg - Dom</v-list-item-title>
          </v-list-item>
          <v-list-item @click="weekday = [1, 2, 3, 4, 5]">
            <v-list-item-title>Seg - Sex</v-list-item-title>
          </v-list-item>
          <v-list-item @click="weekday = [6, 0]">
            <v-list-item-title>Final de Semana</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="selecao-cliente"
            outlined
            color="grey darken-2"
            v-bind="attrs"
            v-on="on"
          >
            <span class="fonte-btns">Cliente</span>
            <v-icon class="icone-btns" right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="select_client = [1]">
            <v-list-item-title>Cliente1</v-list-item-title>
          </v-list-item>
          <v-list-item @click="weekday = [2]">
            <v-list-item-title>Cliente2</v-list-item-title>
          </v-list-item>
          <v-list-item @click="weekday = [3]">
            <v-list-item-title>Cliente3</v-list-item-title>
          </v-list-item>
          <v-list-item @click="weekday = [4]">
            <v-list-item-title>Cliente4</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-3 selecao-obra"
            outlined
            color="grey darken-2"
            v-bind="attrs"
            v-on="on"
          >
            <span class="fonte-btns">Obra</span>
            <v-icon class="icone-btns" right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="select_obra = [1]">
            <v-list-item-title>Obra1</v-list-item-title>
          </v-list-item>
          <v-list-item @click="weekday = [2]">
            <v-list-item-title>Obra2</v-list-item-title>
          </v-list-item>
          <v-list-item @click="weekday = [3]">
            <v-list-item-title>Obra3</v-list-item-title>
          </v-list-item>
          <v-list-item @click="weekday = [4]">
            <v-list-item-title>Obra4</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="next()">
        <v-icon class="icone-setas">mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="updateRange"
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
        <ModalAgendaObra
          :form.sync="form"
          :constructions="constructions"
          :constructions_names="constructions_names"
        />
      </v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <span v-html="selectedEvent.details"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">
              Cancel
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
