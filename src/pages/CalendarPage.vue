<template>
  <HeaderLayout />
  <div class="d-flex flex-row" style="overflow: hidden">
    <MenuLayout class="col" />
    <div
      class="col h-100 p-4 bg-white overflow-scroll-y scrollbar"
      style="min-height: calc(100vh - 69px); max-height: calc(100vh - 69px)"
    >
      <h2>
        <strong>Calendar</strong>
      </h2>
      <div class="d-flex align-content-start flex-wrap mt-5">
        <component :is="component" @setViewVal="setViewVal" />
      </div>
    </div>
  </div>
</template>

<script>
import MenuLayout from '../components/layouts/MenuLayout.vue';
import HeaderLayout from '../components/layouts/HeaderLayout.vue';
import CalendarViewWeeks from '../components/layouts/calendar/CalendarViewWeeks.vue';
import { ref, watchEffect } from 'vue';
import CalendarLayout from '../components/layouts/calendar/CalendarLayout.vue';

export default {
  name: 'CalendarPage',
  components: {
    MenuLayout,
    HeaderLayout,
    CalendarViewWeeks,
    CalendarLayout,
  },
  setup() {
    const view = ref('Month');
    const component = ref('CalendarLayout');

    const setViewVal = (data) => {
      view.value = data;
      if (view.value === 'Month') component.value = 'CalendarLayout';
      else component.value = 'CalendarViewWeeks';
    };
    return {
      view,
      setViewVal,
      component,
    };
  },
};
</script>

<style scoped></style>
