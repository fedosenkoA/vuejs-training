<template>
  <div
    v-if="ticket"
    class="border rounded mb-3 ticket-card"
    :class="{ active: ticket.active }"
  >
    <div class="ticket-row">
      <div>ID booking</div>
      <div>{{ ticket.confirmation_code }}</div>
    </div>
    <div class="ticket-row">
      <div>First name</div>
      <div>{{ ticket.first_name }}</div>
    </div>
    <div class="ticket-row">
      <div>Last name</div>
      <div>{{ ticket.last_name }}</div>
    </div>
    <div class="ticket-row">
      <div>Phone number</div>
      <div>{{ ticket.phone_number }}</div>
    </div>
    <div class="ticket-row">
      <div>Email</div>
      <div
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-html="true"
        :title="ticket.email"
      >
        {{ getEmail }}
      </div>
    </div>
    <div class="ticket-row">
      <div>Number of bookings</div>
      <div>{{ ticket.number_of_booking }}</div>
    </div>
    <div v-if="ticket.showFoodPreferences" class="ticket-row">
      <div>Food preferences</div>
      <div
        class="text-primary text-decoration-underline pref-btn"
        @click="openModal(ticket.id)"
      >
        View food pref
      </div>
    </div>
    <div class="ticket-row">
      <div>Status</div>
      <div>{{ ticket.status }}</div>
    </div>
  </div>
</template>

<script setup>
import { useGroupSwap } from '../../../composebles/group-swap';
import { computed } from 'vue';

const { activeGroup, getPreferenceList, openModal } = useGroupSwap();

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

const getEmail = computed(() => {
  if (props.ticket.email === null) {
    return '';
  }

  return props.ticket.email.toString().slice(0, 30) + '...';
});
</script>

<style scoped>
.ticket-card {
  width: calc(50% - 16px);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
.ticket-row {
  display: flex;
  justify-content: space-between;
}
.ticket-row div {
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.ticket-row:nth-child(2n) {
  background-color: #f2f2f2;
}
.ticket-row:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.active {
  border: 1px solid #dd6497 !important;
}
.pref-btn {
  cursor: pointer;
}
.pref-btn:hover {
  text-decoration: none !important;
}
</style>
