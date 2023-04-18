<template>
  <div class="d-flex justify-content-between px-5 py-3">
    <div
      v-for="(item, index) in getHeaderRow()"
      :key="index"
      class="d-flex me-5"
    >
      <img
        :src="item.icon"
        alt="svg"
        class="me-1"
        style="width: 20px; height: 30px; padding-top: 5px"
      />
      <div class="align-self-center">
        <div>
          <strong>{{ item.title }}</strong>
        </div>
        <div class="text-muted">
          {{ item.value }}
        </div>
        <div
          v-if="item.title === 'Paid'"
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
          v-else-if="item.title === 'Prepaid'"
          class="rounded"
          style="
            width: 8px;
            height: 8px;
            background: #43e470;
            margin-left: 15px;
            margin-top: -17px;
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
const props = defineProps({
  tour: {},
});

const getHeaderRow = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const headerRow = [];

  const month = monthNames[new Date(props.tour.start_datetime).getMonth() - 1];
  const day = new Date(props.tour.start_datetime).getDate();

  let paidTickets = 0;
  let prepaidTickets = 0;
  props.tour.groups.forEach((group) => {
    group.museumTickets?.forEach((museumTicket) => {
      if (museumTicket.type === 'paid') paidTickets++;
      else if (museumTicket.type === 'prepaid') prepaidTickets++;
    });
  });

  headerRow.push(
    {
      icon: '/src/assets/images/d_group.svg',
      title: 'Date',
      value: `${month} ${day}`,
    },
    {
      icon: '/src/assets/images/d_point.svg',
      title: 'Museum',
      value: props.tour.groups[0]?.museumTickets[0]?.museum?.name ?? 'N/A',
    },
    {
      icon: '/src/assets/images/d_company.svg',
      title: 'Type',
      value: props.tour?.rate.type.substring(5) ?? 'N/A',
    },
    {
      icon: '/src/assets/images/d_ticket.svg',
      title: 'Paid',
      value: paidTickets,
      // tickets: getTickets(),
    },
    {
      icon: '/src/assets/images/d_ticket.svg',
      title: 'Prepaid',
      value: prepaidTickets,
      // tickets: getTickets(),
    }
  );
  return headerRow;
};
onMounted(() => {
  // console.log(props.tour.groups[0]?.museumTickets[0]?.museum?.name);
});
</script>

<style scoped></style>
