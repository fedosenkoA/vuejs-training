<template>
  <div class="container border-bottom py-1 d-flex w-75">
    <div
      class="d-flex justify-content-between align-items-center"
      style="width: 25%"
    >
      <h2><strong>Documents</strong></h2>
    </div>
  </div>
  <div class="container border d-flex w-75 rounded mt-1">
    <div class="row w-100">
      <div class="col-5 border-end">
        <DocumentsFileLayout
          :documents="ticketsArray"
          :group_id="group_id_doc"
          @deleteDocument="deleteDocument"
        />
      </div>
      <div class="col-7">
        <DocumentsInfo
          :date="date"
          :museum="museum"
          :tour_name="tour_name"
          :group_id="group_id"
          :tickets="ticketsArray"
          :deletedTicketsArray="deletedTicketsArray"
          :addedTickersArray="addedTickersArray"
          @setDocument="setDocument"
          @setViewDocuments="setViewDocuments"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import DocumentsFileLayout from './DocumentsFileLayout.vue';
import DocumentsInfo from './DocumentsInfo.vue';
import { computed, onMounted, ref } from 'vue';
import { set } from 'lodash';

const props = defineProps({
  tickets: [],
  group_id: Number,
  date: String,
  museum: String,
  tour_name: String,
});

const ticketsArray = ref([]);
const addedTickersArray = ref([]);
const deletedTicketsArray = ref([]);
const group_id_doc = ref('');

onMounted(() => {
  if (props.tickets != undefined) {
    ticketsArray.value = props.tickets;
  }
});

const setDocument = (data) => {
  const ticket = {
    id: data.id,
    documents: {
      path: data.path,
    },
  };
  group_id_doc.value = data.group_id;
  if (addedTickersArray.value.length < 5) {
    addedTickersArray.value = [...addedTickersArray.value, ticket];
    ticketsArray.value = [...ticketsArray.value, ticket];
  }
};

const deleteDocument = (id) => {
  let indexEl = 0;
  let i = 0;
  if (ticketsArray.value.length == 1) {
    if (ticketsArray.value[0].id == id) ticketsArray.value = [];
  } else {
    ticketsArray.value.forEach((el, index) => {
      if (el.id == id) {
        indexEl = index;
      }
    });
    ticketsArray.value = ticketsArray.value.splice(indexEl);
  }

  if (addedTickersArray.value.length == 1) {
    if (addedTickersArray.value[0].id == id) {
      const ticket = {
        id: id,
        documents: {
          path: addedTickersArray.value[0].documents.path,
        },
      };
      addedTickersArray.value = [];
      deletedTicketsArray.value.push(ticket);
    }
  } else {
    addedTickersArray.value.forEach((el, index) => {
      if (el.id == id) {
        i = index;
      }
    });
    deletedTicketsArray.value.push(addedTickersArray.value[i]);
    addedTickersArray.value = ticketsArray.value.splice(i);
  }
};
const emit = defineEmits(['setViewDocuments']);
const setViewDocuments = (data) => {
  emit('setViewDocuments', data);
};
</script>

<style scoped>
.close-all {
  font-size: 14px;
  line-height: 17px;
  color: #cb3171;
  text-decoration: underline;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  position: absolute;
  top: 148px;
  right: 52px;
}
.close-all:hover {
  color: #f03785;
}
</style>
