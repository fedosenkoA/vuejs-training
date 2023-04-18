<template>
  <div class="border-bottom py-1 d-flex w-100">
    <div
      class="d-flex justify-content-between align-items-center"
      style="width: 20%"
    >
      <h2><strong>Dashboard</strong></h2>
      <div class="d-flex justify-content-between align-items-center">
        <div class="me-1">Alert mode</div>
        <div class="form-check form-switch d-flex align-items-center">
          <label class="form-check-label" for="flexSwitchCheckDefault"></label>
          <input
            id="flexSwitchCheckDefault"
            class="form-check-input"
            type="checkbox"
            role="switch"
          />
        </div>
      </div>
    </div>

    <div
      class="d-flex border-start justify-content-between align-items-center px-1"
      style="width: 80%"
    >
      <SelectComponent
        id="tour"
        class="w-25"
        style="padding-bottom: 0 !important; width: 19% !important"
        :options="filterOptions.options"
        :v-model="filterProperties.selectedType"
        :model-value="filterProperties.selectedType"
        @update:model-value="filterProperties.selectedType = $event"
        @change="sendFilter()"
      />
      <InputComponent
        id="group_id"
        v-model="filterProperties.conformationCode"
        style="padding-bottom: 0 !important; width: 19% !important"
        class="w-25"
        type="text"
        name="group_id"
        required
        autofocus
        :placeholder="'Booking ID'"
        @change="sendConfirmationCodeFilter()"
      />
      <InputComponent
        id="date_range_from"
        v-model="filterProperties.startDate"
        style="padding-bottom: 0 !important; width: 19% !important"
        class="w-25"
        type="date"
        name="unavailable_on"
        required
        autofocus
        :placeholder="'Select day from'"
        :min="getIsoDate(startDate)"
        @change="
          () => {
            changeEndDate();
            sendFilter();
          }
        "
      />
      <InputComponent
        id="date_range_to"
        v-model="filterProperties.endDate"
        style="padding-bottom: 0 !important; width: 19% !important"
        class="w-25"
        type="date"
        name="unavailable_on"
        required
        autofocus
        :placeholder="'Select day to'"
        :min="filterProperties.startDate"
        :max="getIsoDate(endDate)"
        @change="
          () => {
            changeStartDate();
            sendFilter();
          }
        "
      />
      <ButtonWhiteComponent
        class="btn w-25"
        type="submit"
        style="width: 19% !important; height: 48px"
        :label="'Cancel'"
        @click="clearFilter()"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import SelectComponent from '../../kits/SelectComponent.vue';
import InputComponent from '../../kits/InputComponent.vue';
import { useDashboard } from '../../../composebles/dashboard.ts';
import ButtonWhiteComponent from '../../kits/ButtonWhiteComponent.vue';
import { getIsoDate, getLocalNow } from '../../../helpers/date.ts';

const {
  filter,
  getGuides,
  getRoutes,
  getTourList,
  getTourListByConfirmationCode,
  getTransportCompanies,
} = useDashboard();

const filterProperties = ref({
  selectedType: 'all',
  startDate: '',
  endDate: '',
  conformationCode: '',
});

const startDate = ref(new Date());
startDate.value.setMonth(startDate.value.getMonth() - 2);
const endDate = ref(new Date());
endDate.value.setMonth(endDate.value.getMonth() + 2);

const filterOptions = {
  options: [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'PRIVATE',
      label: 'Private',
    },
    {
      value: 'REGULAR',
      label: 'Regular',
    },
  ],
};

const tourListSubscription = ref();
const tourListByConfirmationCodeSubscription = ref();

//todo refactor this for 2 month range
const sendFilter = () => {
  checkDateValue();

  unsubscribeTourListByConfirmationCode();

  tourListSubscription.value = getTourList(filterProperties.value);
};

const unsubscribeTourListByConfirmationCode = () => {
  if (typeof tourListByConfirmationCodeSubscription.value !== 'undefined') {
    tourListByConfirmationCodeSubscription.value.unsubscribe();
  }
};

const sendConfirmationCodeFilter = () => {
  checkDateValue();

  tourListSubscription.value.unsubscribe();

  tourListByConfirmationCodeSubscription.value = getTourListByConfirmationCode(
    filterProperties.value.conformationCode
  );
};

const clearFilter = () => {
  filterProperties.value.selectedType = 'all';
  filterProperties.value.conformationCode = null;
  getDefaultDatePeriod();

  unsubscribeTourListByConfirmationCode();

  tourListSubscription.value = getTourList(filterProperties.value);
};

const changeStartDate = () => {
  const changeEndDate = new Date(filterProperties.value.endDate);
  startDate.value.setDate(changeEndDate.getMonth() - 2);
};

const changeEndDate = () => {
  const changeStartDate = new Date(filterProperties.value.startDate);
  endDate.value.setDate(changeStartDate.getMonth() + 2);
};

const checkDateValue = () => {
  const today = new Date(filterProperties.value.startDate);
  const tomorrow = new Date(filterProperties.value.endDate);
  const plusTwoMonths = new Date(filterProperties.value.startDate);
  const minusTwoMonths = new Date(filterProperties.value.startDate);
  plusTwoMonths.setMonth(today.getMonth() + 2);
  minusTwoMonths.setMonth(today.getMonth() - 2);

  if (today > tomorrow) {
    filterProperties.value.endDate = filterProperties.value.startDate;
  }

  if (tomorrow > plusTwoMonths) {
    filterProperties.value.endDate = getIsoDate(plusTwoMonths);
  }

  if (today < minusTwoMonths) {
    filterProperties.value.startDate = getIsoDate(minusTwoMonths);
  }
};

const getDefaultDatePeriod = () => {
  const today = getLocalNow();
  const tomorrow = getLocalNow();
  tomorrow.setDate(today.getDate() + 1);

  filterProperties.value.startDate = getIsoDate(today);
  filterProperties.value.endDate = getIsoDate(tomorrow);
};

onMounted(() => {
  getDefaultDatePeriod();
  tourListSubscription.value = getTourList(filterProperties.value);
  getGuides();
  getRoutes();
  getTransportCompanies();
});
</script>

<style scoped></style>
