<template>
  <FullCalendar :options="options" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
export default {
  name: 'CalendarMonth',
  components: {
    FullCalendar
  },
  props: {
    options: Object,
  },
  data () {
    return {
    }
  },
  beforeCreate () {
  },
  methods: {
    // close () {
    //   this.$emit('update:form', false)
    // }
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
