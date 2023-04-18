<template>
  <div class="d-flex justify-content-start px-5 py-3">
    <div
      v-for="(item, index) in getHeaderRow()"
      :key="index"
      class="d-flex me-5"
    >
      <img
        v-if="item.title === 'Meet point'"
        :src="item.icon"
        alt="svg"
        class="me-1 settable"
        style="width: 20px; height: 30px; padding-top: 5px"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-html="true"
        :title="item.tooltip"
        @click="setMeetPoint()"
      />
      <img
        v-if="item.title === 'Bus company'"
        :src="item.icon"
        alt="svg"
        class="me-1 settable"
        style="width: 20px; height: 30px; padding-top: 5px"
        @click="setBusCompany()"
      />
      <img
        v-else-if="item.title === 'Bus type'"
        :src="item.icon"
        alt="svg"
        class="me-1 settable"
        style="width: 20px; height: 30px; padding-top: 5px"
        @click="setBusType()"
      />
      <img
        v-else-if="
          item.title !== 'Meet point' &&
          item.title !== 'Bus company' &&
          item.title !== 'Bus type'
        "
        :src="item.icon"
        alt="svg"
        class="me-1"
        style="width: 20px; height: 30px; padding-top: 5px"
      />
      <div class="align-self-center">
        <div>
          <strong>{{ item.title }}</strong>
        </div>
        <div v-if="item.title !== 'Tickets'" class="text-muted">
          {{ item.value }}
        </div>
        <div v-else class="d-flex">
          <div
            v-for="(ticket, index) in item.tickets"
            :key="index"
            class="d-flex justify-content-between"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="text-muted">{{ ticket.paid }}</div>
              <span
                class="rounded"
                style="
                  width: 8px;
                  height: 8px;
                  background: #9747ff;
                  margin-right: 5px;
                  margin-left: 2px;
                "
              ></span>
              <div class="text-muted">{{ ticket.prepaid }}</div>
              <span
                class="rounded"
                style="
                  width: 8px;
                  height: 8px;
                  background: #43e470;
                  margin-right: 5px;
                  margin-left: 2px;
                "
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDashboard } from '../../../composebles/dashboard';
import { getTimeAMPM } from '../../../helpers/date.ts';
import { computed } from 'vue';

const props = defineProps({
  tour: {},
});

const { setModalData } = useDashboard();

const fieldsMap = [
  {
    tour: 1,
    fields: {
      tickets: [],
      meetingPoint: 1,
      busCompany: 0,
      busType: 0,
    },
  },
  {
    tour: 2,
    fields: {
      tickets: ['Park Guell', 'Sagrada'],
      meetingPoint: 1,
      busCompany: 1,
      busType: 1,
    },
  },
  {
    tour: 3,
    fields: {
      tickets: ['Sagrada'],
      meetingPoint: 1,
      busCompany: 0,
      busType: 0,
    },
  },
  {
    tour: 4,
    fields: {
      tickets: ['Sagrada'],
      meetingPoint: 1,
      busCompany: 1,
      busType: 1,
    },
  },
  {
    tour: 5,
    fields: {
      tickets: ['Montserrat'],
      meetingPoint: 1,
      busCompany: 1,
      busType: 1,
    },
  },
];

const getHeaderRow = () => {
  const fieldMap = fieldsMap.find(
    (x) => x.tour === parseInt(props.tour.rate.tour.id)
  );

  let headerRows = [
    {
      icon: '/src/assets/images/d_people.svg',
      title: 'People',
      value: props.tour?.groups.reduce(
        (accumulator, value) => accumulator + value?.participants.length ?? 0,
        0
      ),
    },
    {
      icon: '/src/assets/images/d_group.svg',
      title: 'Groups',
      value: props.tour?.groups.length,
    },
  ];

  if (fieldMap.fields.tickets.length) {
    headerRows.push({
      icon: '/src/assets/images/d_ticket.svg',
      title: 'Tickets',
      tickets: getTickets(fieldMap.fields.tickets),
    });
  }

  if (fieldMap.fields.meetingPoint) {
    headerRows.push({
      icon: '/src/assets/images/d_point.svg',
      title: 'Meet point',
      value: getMeetLocation.value.toString().slice(0, 30) + '...',
      tooltip: getMeetLocation.value.toString(),
    });
  }

  if (fieldMap.fields.busCompany) {
    headerRows.push({
      icon: '/src/assets/images/d_company.svg',
      title: 'Bus company',
      value: getTransportCompany.value.toString(),
    });
  }

  if (fieldMap.fields.busType) {
    headerRows.push({
      icon: '/src/assets/images/d_bus.svg',
      title: 'Bus type',
      value: getTransportBus.value.toString(),
    });
  }

  return headerRows;
};

const setMeetPoint = () => {
  setModalData({
    type: 'setMeetPoint',
    tour_booking_id: props.tour?.id,
    header: 'Change meet point',
    text: 'Enter address of the meet point',
  });
};

const setBusCompany = () => {
  setModalData({
    type: 'setBusCompany',
    tour_booking_id: props.tour?.id,
    header: 'Change bus company',
    text: 'Choose bus company from list',
  });
};

const isTransportCompanySet = () => {
  return props.tour?.transportCompany;
};

const setBusType = () => {
  if (!isTransportCompanySet()) {
    return;
  }

  setModalData({
    type: 'setBusType',
    tour_booking_id: props.tour?.id,
    header: 'Change bus type',
    text: 'Choose bus type from list',
  });
};

const getTransportCompany = computed(() => {
  if (props.tour?.transportCompany?.id) {
    return props.tour?.transportCompany?.name;
  }

  if (!props.tour?.requests.length) {
    return 'N/A';
  }

  const request = props.tour.requests.find((x) => x.decision === null);

  if (typeof request === 'undefined') {
    return 'N/A';
  }

  return '⚠️ ' + request.requestable.name;
});

const getTransportBus = computed(() => {
  if (props.tour?.transportBus?.seats) {
    return props.tour?.transportBus?.seats + ' seats';
  }

  return 'N/A';
});

const getMeetLocation = computed(() => {
  if (!props.tour?.meeting_time && !props.tour?.meeting_location) {
    return 'N/A';
  }

  if (!props.tour?.meeting_time) {
    return props.tour?.meeting_location;
  }

  return (
    getTimeAMPM(new Date('1970-01-01T' + props.tour.meeting_time + '+01:00')) +
    ' - ' +
    props.tour.meeting_location
  );
});

const getTickets = (ticketsMap) => {
  const tickets = [];

  ticketsMap.forEach((ticket) => {
    tickets.push({
      paid: 0,
      prepaid: 0,
    });
  });

  props.tour?.groups.forEach((group) => {
    group?.museumTickets.forEach((ticket) => {
      const index = ticketsMap.findIndex((map) => map === ticket.museum.name);
      ticket.type === 'PAID'
        ? (tickets[index].paid += ticket.number)
        : (tickets[index].prepaid += ticket.number);
    });
  });

  return tickets;
};
</script>

<style scoped></style>
