<template>
  <keep-alive>
    <DashboardFilters />
  </keep-alive>
  <div class="rounded bg-body w-100 px-12 pt-2 pb-1 mt-2">
    <LoaderComponent v-if="loading" class="mb-2" />
    <div
      v-if="globalDashboardList"
      class="overflow-scroll-y scrollbar"
      style="max-height: calc(100vh - 220px)"
    >
      <TransitionGroup name="fade">
        <div v-for="(tour, index) in globalDashboardList" :key="tour?.id">
          <div
            v-if="isNewDay(tour, globalDashboardList[index - 1])"
            class="ms-1 mb-4"
          >
            <strong>{{ getNewDateForDisplay(tour) }}</strong>
          </div>
          <DashboardRow
            :tour="tour"
            style="box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.04)"
          />
        </div>
      </TransitionGroup>
    </div>
    <p
      class="close-all"
      @click="
        () => {
          isRowsOpen = openAll(isRowsOpen);
        }
      "
    >
      {{ isRowsOpen ? 'Expand all cards' : 'Collapse all cards' }}
    </p>
  </div>
  <DashboardModal v-if="showModalWindow" />
</template>

<script setup>
import DashboardRow from './DashboardRow.vue';
import { useDashboard } from '@/composebles/dashboard';
import { ref, toRaw } from 'vue';
import DashboardFilters from './DashboardFilters.vue';
import LoaderComponent from '../../kits/LoaderComponent.vue';
import DashboardModal from './DashboardModal.vue';
import { getHumanReadableDate } from '../../../helpers/date.ts';

const { globalDashboardList, filter, openAll, loading, showModalWindow } =
  useDashboard();

const isRowsOpen = ref(true);

const isNewDay = (newTour, oldTour) => {
  if (typeof oldTour === 'undefined') {
    return true;
  }

  return (
    new Date(toRaw(newTour).start_datetime + '+01:00').getDate() !==
    new Date(toRaw(oldTour).start_datetime + '+01:00').getDate()
  );
};

const getNewDateForDisplay = (newTour) => {
  return getHumanReadableDate(
    new Date(toRaw(newTour).start_datetime + '+01:00')
  );
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
  top: 165px;
  right: 52px;
}
.close-all:hover {
  color: #f03785;
}
</style>
