<template>
  <tr
    v-if="group"
    class="py-12 small"
    :class="[{ 'border-top': props.key !== 0 }, { 'rounded-5': props.last }]"
  >
    <td class="ps-16">{{ props.group.id }}</td>
    <td class="ps-16">
      {{ getHours() }}
    </td>
    <td class="ps-16">
      <div class="border w-25 rounded text-center">
        {{ group.museumTickets[0]?.type ? group?.museumTickets[0]?.type : '-' }}
      </div>
      <div
        v-if="group.museumTickets[0]?.typ === 'Prepaid'"
        class="rounded"
        style="
          width: 8px;
          height: 8px;
          background: #9747ff;
          margin-left: 15px;
          margin-top: -17px;
        "
      ></div>
      <div
        v-else-if="group.museumTickets[0]?.type === 'Paid'"
        class="rounded"
        style="
          width: 8px;
          height: 8px;
          background: #43e470;
          margin-left: 15px;
          margin-top: -17px;
        "
      ></div>
    </td>
    <td class="ps-16">
      {{ group.museumTickets?.length ? group?.museumTickets.length : 0 }}
    </td>

    <td class="ps-16">
      €{{ getTotalPrice() }}
      <img
        v-if="group.museumTickets[0]?.type === 'Paid'"
        src="../../../assets/images/Ticket.svg"
      />
      <img
        v-else
        src="../../../assets/images/Ticket.svg"
        style="visibility: hidden"
      />
      <img
        src="../../../assets/images/edit_settings.svg"
        style="padding-left: 5px"
        @click="setViewDocuments"
      />
    </td>
    <!--td class="ps-16">
      <a href="">Link</a>
      {{ getTickets(props.group.museumTickets) }}
    </td-->
  </tr>
</template>

<script setup>
import { onMounted } from 'vue';
const props = defineProps({
  group: {},
  date: {},
});

const getHours = () => {
  const hour = new Date(props.date).getHours();
  const mins = new Date(props.date).getMinutes();
  const minute = mins < 10 ? `0${mins}` : mins;
  return `${hour}:${minute}`;
};

const getTotalPrice = () => {
  let price = 0;
  props.group?.museumTickets.forEach((museumTicket) => {
    price += museumTicket.amount;
  });
  return price;
};

const getTickets = (tickets) => {
  const ticketsHtml = tickets.map((ticket) => {
    return `<a href="${ticket?.documents.path}" target="_blank">${ticket?.documents.path}</a>`;
  });
  return ticketsHtml.join(', ');
};

const emit = defineEmits(['setViewDocuments']);
const view = 'upload view';

const setViewDocuments = () => {
  emit('setViewDocuments', {
    view: view,
    tickets: props.group?.museumTickets,
    group_id: props.group?.id,
    museum:
      props.group?.museumTickets[0]?.museum?.name === undefined
        ? 'N/A'
        : props.group?.museumTickets[0]?.museum?.name,
  });
};
</script>

<style scoped></style>
