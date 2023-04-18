<template>
  <HeaderLayout />
  <div class="d-flex flex-row">
    <MenuLayout class="col" />
    <div
      class="col h-100 ps-5 pe-5 bg-white"
      style="min-height: calc(100vh - 69px); background: #f8f8f8"
    >
      <component
        :is="component"
        :tickets="tickets"
        :date="date"
        :museum="museum"
        :tour_name="tour_name"
        :group_id="group_id"
        @setViewDocuments="setViewDocuments"
      />
    </div>
  </div>
</template>

<script>
import MenuLayout from '../components/layouts/MenuLayout.vue';
import HeaderLayout from '../components/layouts/HeaderLayout.vue';
import DocumentsLayout from '../components/layouts/documents/DocumentsLayout.vue';
import DocumentsUploadLayout from '../components/layouts/documents/DocumentsUploadLayout.vue';
import { onMounted, ref, watch } from 'vue';
import BillsLayout from '../components/layouts/documents/BillsLayout.vue';

export default {
  name: 'DocumentsPage',
  components: {
    MenuLayout,
    HeaderLayout,
    DocumentsUploadLayout,
    DocumentsLayout,
    BillsLayout,
  },
  setup() {
    const view = ref('list view');
    const bills = ref([]);
    const tickets = ref([]);
    const group_id = ref(0);
    const component = ref('DocumentsLayout');
    const date = ref('');
    const museum = ref('');
    const tour_name = ref('');

    const condition = () => {
      if (view.value === 'list view') component.value = 'DocumentsLayout';
      else if (view.value === 'upload view') {
        component.value = 'DocumentsUploadLayout';
      } else if (view.value === 'bills view') {
        component.value = 'BillsLayout';
      }
    };
    onMounted(() => {
      condition();
    });
    watch(() => {
      condition();
    });

    const setViewDocuments = (data) => {
      view.value = data.view;
      tickets.value = data?.tickets;
      group_id.value = data?.group_id;
      date.value = data?.date;
      museum.value = data?.museum;
      tour_name.value = data?.tour_name;
    };
    return {
      view,
      setViewDocuments,
      component,
      bills,
      tickets,
      group_id,
      date,
      museum,
      tour_name,
    };
  },
};
</script>

<style scoped></style>
