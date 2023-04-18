<template>
  <HeaderLayout />
  <div class="d-flex flex-row">
    <MenuLayout class="col" />
    <div
      class="col h-100 ps-5 pe-5 bg-white"
      style="min-height: calc(100vh - 69px); background: #f8f8f8"
    >
      <ReportHeader class="mt-5" @setViewReports="setViewReports" />
      <component :is="component" />
    </div>
  </div>
</template>

<script>
import MenuLayout from '../components/layouts/MenuLayout.vue';
import HeaderLayout from '../components/layouts/HeaderLayout.vue';
import ReportHeader from '../components/layouts/report/ReportHeader.vue';
import { onMounted, ref, watch } from 'vue';
import FilteredReport from '../components/layouts/report/FilteredReport.vue';
import TaxReport from '../components/layouts/report/TaxReport.vue';

export default {
  name: 'ReportPage',
  components: {
    MenuLayout,
    HeaderLayout,
    ReportHeader,
    FilteredReport,
    TaxReport,
  },
  setup() {
    const view = ref('tax report');
    const component = ref('TaxReport');
    const condition = () => {
      if (view.value === 'tax report') component.value = 'TaxReport';
      else {
        component.value = 'FilteredReport';
      }
    };
    onMounted(() => {
      condition();
    });
    watch(() => {
      condition();
    });

    const setViewReports = (data) => {
      view.value = data.view;
    };
    return {
      view,
      setViewReports,
      component,
    };
  },
};
</script>

<style scoped></style>
