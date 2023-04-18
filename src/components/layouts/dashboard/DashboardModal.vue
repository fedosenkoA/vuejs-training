<template>
  <Teleport to="#app">
    <div v-if="modalData" class="backdrop">
      <div class="popup">
        <header class="header">
          <div
            class="d-flex justify-content-between ps-5 pe-3 pt-3 pb-1 border-bottom"
          >
            <div class="d-flex flex-column">
              <h4>
                <strong>{{ modalData.header }}</strong>
              </h4>
              <p class="text-muted">{{ modalData.text }}</p>
            </div>
            <img
              class="settable"
              style="height: 16px; width: 16px; right: -10px; cursor: pointer"
              src="/src/assets/images/closeX.svg"
              alt="CloseX"
              @click="unsetModalData"
            />
          </div>
        </header>
        <div class="px-5 pt-3 pb-1">
          <div
            v-if="modalData.type === 'setGuideForGroup'"
            class="d-flex flex-column justify-content-start align-items-sm-start"
          >
            <SelectComponent
              id=""
              v-model:id="selectedValue"
              :label="'Select guide'"
              :model-value="selectedValue"
              :options="getGuides()"
              @update:model-value="selectedValue = $event"
            ></SelectComponent>
          </div>
          <div
            v-if="modalData.type === 'setRouteForGroup'"
            class="d-flex flex-column justify-content-start align-items-sm-start"
          >
            <SelectComponent
              id=""
              v-model:id="selectedValue"
              :label="'Select route'"
              :model-value="selectedValue"
              :options="getRoutes()"
              @update:model-value="selectedValue = $event"
            ></SelectComponent>
          </div>
          <div v-if="modalData.type === 'setMeetPoint'">
            <InputComponent
              id="address"
              v-model="address"
              :label="'Address'"
              type="text"
              required
              autofocus
              :error-message="meetError.address"
              :placeholder="'Enter address'"
            />
            <InputComponent
              id="meet_time"
              v-model="meetTime"
              :label="'Meet time'"
              type="time"
              required
              autofocus
              :error-message="meetError.time"
              :placeholder="'Time'"
            />
          </div>
          <div
            v-if="modalData.type === 'setBusCompany'"
            class="d-flex flex-column justify-content-start align-items-sm-start"
          >
            <SelectComponent
              id=""
              v-model:id="selectedValue"
              :label="'Select bus company'"
              :model-value="selectedValue"
              :options="getBusCompanies()"
              @update:model-value="selectedValue = $event"
            ></SelectComponent>
          </div>
          <div
            v-if="modalData.type === 'setBusType'"
            class="d-flex flex-column justify-content-start align-items-sm-start"
          >
            <SelectComponent
              id=""
              v-model:id="selectedValue"
              :label="'Select bus type'"
              :model-value="selectedValue"
              :options="getBusTypes()"
              @update:model-value="selectedValue = $event"
            ></SelectComponent>
          </div>
        </div>
        <footer class="w-100">
          <div class="d-flex px-5 pb-3 w-100">
            <ButtonComponent
              class="w-100"
              :label="'Apply'"
              @click="sendAnswer"
            ></ButtonComponent>
          </div>
        </footer>
        <Transition name="fade">
          <div v-if="modalLoading" class="mb-2">
            <LoaderComponent class="loader"></LoaderComponent>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import ButtonComponent from '../../kits/ButtonComponent.vue';
import { useDashboard } from '../../../composebles/dashboard.ts';
import LoaderComponent from '../../kits/LoaderComponent.vue';
import SelectComponent from '../../kits/SelectComponent.vue';
import { ref } from 'vue';
import InputComponent from '../../kits/InputComponent.vue';
import { getTimeWithoutSecond } from '../../../helpers/date.ts';

const {
  setMeetingLocation,
  setGuideForGroup,
  setRouteForGroup,
  setBusCompany,
  setBusType,
  globalGuides,
  globalRoutes,
  globalBusCompanies,
  globalBusTypes,
  modalData,
  modalLoading,
  unsetModalData,
  getTourBookingById,
} = useDashboard();

const tourBooking = getTourBookingById(modalData.value.tour_booking_id ?? 0);
const selectedValue = ref(0);
const address = ref(tourBooking?.meeting_location ?? '');
const meetTime = ref(
  tourBooking?.meeting_time
    ? getTimeWithoutSecond(
        new Date('1970-01-01T' + tourBooking.meeting_time + '+01:00')
      )
    : ''
);
const meetError = ref({
  address: '',
  time: '',
});

const getGuides = () => {
  return globalGuides.value.map((guide) => {
    return {
      value: guide.id,
      label:
        (guide.user?.first_name ?? '') + ' ' + (guide.user?.last_name ?? ''),
    };
  });
};

const getRoutes = () => {
  return globalRoutes.value.map((route) => {
    return {
      value: route.id,
      label: route.name,
    };
  });
};

const getBusCompanies = () => {
  return globalBusCompanies.value.map((busCompany) => {
    return {
      value: busCompany.id,
      label: busCompany.name,
    };
  });
};

const getBusTypes = () => {
  const transportCompanyId = tourBooking?.transportCompany?.id;

  const buses = globalBusTypes.value[transportCompanyId];

  return buses.map((busType) => {
    return {
      value: busType.id,
      label: busType.seats,
    };
  });
};

const sendAnswer = (answer) => {
  switch (modalData.value?.type) {
    case 'setMeetPoint':
      if (!address.value) {
        meetError.value.address = 'The address must be completed';
        break;
      }
      if (!meetTime.value) {
        meetError.value.address = '';
        meetError.value.time = 'The time of the meeting must be';
        break;
      }
      meetError.value = {
        address: '',
        time: '',
      };
      setMeetingLocation(
        modalData.value?.tour_booking_id,
        address.value,
        meetTime.value
      );
      break;
    case 'setGuideForGroup':
      setGuideForGroup(modalData.value?.group_id, selectedValue.value);
      break;
    case 'setRouteForGroup':
      setRouteForGroup(modalData.value?.group_id, selectedValue.value);
      break;
    case 'setBusCompany':
      setBusCompany(modalData.value?.tour_booking_id, selectedValue.value);
      break;
    case 'setBusType':
      setBusType(modalData.value?.tour_booking_id, selectedValue.value);
      break;
  }
};
</script>

<style scoped>
.popup {
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 487px;
  max-width: 600px;
  height: fit-content;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 2px solid #dedede;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}

.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.16);
}
</style>
