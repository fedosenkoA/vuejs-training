<template>
  <div>
    <div
      v-if="globalTickets && globalHeader"
      style="background: white"
      class="bg-white h-100"
    >
      <div
        class="d-flex justify-content-between pe-5 pb-2"
        style="height: 86px"
      >
        <h3 class="p-4">
          <strong>
            {{ globalHeader }}
          </strong>
        </h3>
        <router-link
          to="/dashboard"
          class="rounded d-flex align-items-center justify-content-center"
          @click="clearPageData"
        >
          <img
            class="settable"
            src="/src/assets/images/arrow.svg"
            style="width: 25px; height: 25px"
          />
        </router-link>
      </div>
      <div
        class="d-flex justify-content-between align-items-center flex-wrap px-4 pt-2 overflow-scroll-y scrollbar"
        style="max-height: calc(100vh - 40px)"
      >
        <TransitionGroup name="fade">
          <TicketCard
            v-for="ticket in globalTickets"
            :key="ticket.id"
            :ticket="ticket"
          />
        </TransitionGroup>
      </div>
    </div>
    <LoaderComponent v-else class="pt-5" />
  </div>
  <div>
    <GroupSwapModal v-if="modalWindow" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TicketCard from './TicketCard.vue';
import { useGroupSwap } from '../../../composebles/group-swap';
import GroupSwapModal from './GroupSwapModal.vue';
import LoaderComponent from '@/components/kits/LoaderComponent.vue';

const {
  globalTickets,
  getGroupTickets,
  getGlobalHeader,
  globalHeader,
  modalWindow,
  clearPageData,
} = useGroupSwap();

onMounted(() => {
  let params = window.location.pathname.split('/')[2];
  let group_id = params.split('&')[0];
  let tour_id = params.split('&')[1].split('=')[1] || 0;
  getGroupTickets(group_id ?? 0);
  getGlobalHeader(tour_id, group_id);
});
</script>

<style scoped></style>
