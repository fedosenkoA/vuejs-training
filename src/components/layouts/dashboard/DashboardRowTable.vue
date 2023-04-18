<template>
  <tr
    v-if="group"
    class="py-12 small"
    :class="[{ 'border-top': props.key !== 0 }, { 'rounded-5': props.last }]"
  >
    <td v-if="isFieldExists('id')" class="ps-16">{{ props.group.id }}</td>
    <td v-if="isFieldExists('guide')" class="ps-16">
      {{ getGuide }}
      <img
        class="ms-1 settable"
        src="/src/assets/images/d_swap.svg"
        alt="Swap"
        @click="setGuide"
      />
    </td>
    <td v-if="isFieldExists('route')" class="ps-16">
      {{ getRoute }}
      <img
        class="ms-1 settable"
        src="/src/assets/images/d_pen.svg"
        alt="Route"
        @click="setRoute"
      />
    </td>
    <td v-if="isFieldExists('presentStatus')" class="ps-16">
      {{ getStatus(props.group.participants) }}
    </td>
    <td v-if="isFieldExists('people')" class="ps-16">
      {{ (group?.participants.length ?? 0) + '/' + group?.limit }}
    </td>
    <td v-if="isFieldExists('tickets', 'Montserrat')" class="ps-16">
      <div class="d-flex">
        <div
          v-for="tickets in getTickets('Montserrat')"
          :key="tickets.type"
          class="d-flex justify-content-between align-items-center"
        >
          <div class="text-muted">{{ tickets.value }}</div>
          <div class="d-flex border rounded-1 mx-1 ps-1 align-items-center">
            <span>{{ tickets.type }}</span>
            <span
              class="rounded"
              :style="'background:' + tickets.color"
              style="
                width: 8px;
                height: 8px;
                margin-right: 5px;
                margin-left: 5px;
              "
            ></span>
          </div>
        </div>
        <img
          class="ms-1 settable"
          src="/src/assets/images/d_pen.svg"
          alt="Ticket"
        />
      </div>
    </td>
    <td v-if="isFieldExists('tickets', 'Park Guell')" class="ps-16">
      <div class="d-flex">
        <div
          v-for="tickets in getTickets('Park Guell')"
          :key="tickets.type"
          class="d-flex justify-content-between align-items-center"
        >
          <div class="text-muted">{{ tickets.value }}</div>
          <div class="d-flex border rounded-1 mx-1 ps-1 align-items-center">
            <span>{{ tickets.type }}</span>
            <span
              class="rounded"
              :style="'background:' + tickets.color"
              style="
                width: 8px;
                height: 8px;
                margin-right: 5px;
                margin-left: 5px;
              "
            ></span>
          </div>
        </div>
        <img
          class="ms-1 settable"
          src="/src/assets/images/d_pen.svg"
          alt="Ticket"
        />
      </div>
    </td>
    <td v-if="isFieldExists('tickets', 'Sagrada')" class="ps-16">
      <div class="d-flex">
        <div
          v-for="tickets in getTickets('Sagrada')"
          :key="tickets.type"
          class="d-flex justify-content-between align-items-center"
        >
          <div class="text-muted">{{ tickets.value }}</div>
          <div class="d-flex border rounded-1 mx-1 ps-1 align-items-center">
            <span>{{ tickets.type }}</span>
            <span
              class="rounded"
              :style="'background:' + tickets.color"
              style="
                width: 8px;
                height: 8px;
                margin-right: 5px;
                margin-left: 5px;
              "
            ></span>
          </div>
        </div>
        <img
          class="ms-1 settable"
          src="/src/assets/images/d_pen.svg"
          alt="Ticket"
        />
      </div>
    </td>
    <td v-if="isFieldExists('bookings')" class="ps-16">
      <router-link :to="'/swap/' + group?.id + '&tour_id=' + tourId"
        >Link</router-link
      >
    </td>
  </tr>
</template>

<script setup>
import { useDashboard } from '../../../composebles/dashboard';
import { computed } from 'vue';

const props = defineProps({
  group: {},
  tourId: {
    type: [Number, String],
    required: true,
    default: 0,
  },
  fields: {
    type: Object,
    required: true,
  },
});

const { setModalData } = useDashboard();

const isFieldExists = (field, subField = null) => {
  if (props.fields[field]) {
    if (Array.isArray(props.fields[field])) {
      return props.fields[field].find((x) => x === subField);
    }

    return true;
  }

  return false;
};

const getGuide = computed(() => {
  return props.group.guide?.user
    ? props.group.guide.user.first_name + ' ' + props.group.guide.user.last_name
    : 'N/A';
});

const getRoute = computed(() => {
  return props.group.route ? props.group.route.name : 'N/A';
});

const getStatus = (participants) => {
  const present = participants.filter((item) => item?.is_present === 'present');
  return `(${present.length}/${participants.length})`;
};

const getTickets = (museum) => {
  let tickets = [
    {
      value: 0,
      type: 'Paid',
      color: '#9747ff',
    },
    {
      value: 0,
      type: 'Prepaid',
      color: '#43e470',
    },
  ];

  props.group.museumTickets.forEach((ticket) => {
    if (ticket.museum.name === museum) {
      ticket.type === 'PAID'
        ? (tickets[0].value += ticket.number)
        : (tickets[1].value += ticket.number);
    }
  });

  return tickets;
};

const setGuide = () => {
  setModalData({
    type: 'setGuideForGroup',
    group_id: props.group.id,
    header: 'Set guide',
    text: 'Choose tour guide',
  });
};

const setRoute = () => {
  setModalData({
    type: 'setRouteForGroup',
    group_id: props.group.id,
    header: 'Set route',
    text: 'Choose food route',
  });
};
</script>

<style scoped></style>
