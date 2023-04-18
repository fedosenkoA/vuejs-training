<template>
  <div>
    <div style="background: white" class="bg-white h-100">
      <div class="overflow-hidden" style="height: 110px">
        <Transition name="fade">
          <div
            v-if="countDeleted === 0"
            class="d-flex justify-content-between pe-6 pt-4 pb-3"
          >
            <h3>
              <strong>List of bus companies</strong>
            </h3>
            <ButtonComponent
              :class="{ active: isActive }"
              label="Add new bus companies"
              style="min-width: 210px"
              @click="createBusCompany"
            ></ButtonComponent>
          </div>
          <div
            v-else-if="countDeleted !== 0"
            class="d-flex justify-content-between pe-6 pt-4 pb-3"
          >
            <h3>
              <strong>{{ 'Selected ' + countDeleted + ' profiles' }}</strong>
            </h3>
            <div class="d-flex flex-nowrap">
              <ButtonComponent
                :class="{ active: isActive }"
                class="me-2"
                :label="'Delete ' + countDeleted + ' profiles'"
                @click="showDeletePopup = !showDeletePopup"
              ></ButtonComponent>
              <ButtonWhiteComponent
                :class="{ active: isActive }"
                style="width: 184px; height: 46px"
                label="Cancel"
                @click="unsetDeleteBusCompanies"
              ></ButtonWhiteComponent>
            </div>
          </div>
        </Transition>
      </div>
      <div
        v-if="globalBusCompanies.length"
        class="overflow-scroll-y scrollbar position-relative"
        style="max-height: calc(100vh - 180px)"
      >
        <TransitionGroup name="fade">
          <BusCompanyCard
            v-for="(transport, index) in globalBusCompanies"
            :key="index"
            :transport="transport"
          />
        </TransitionGroup>
      </div>
    </div>
    <Transition name="fade">
      <PopupComponent
        v-if="showDeletePopup"
        @delete-answer="deleteProfilesAnswer"
      ></PopupComponent>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ButtonComponent from '../../../kits/ButtonComponent.vue';
import BusCompanyCard from './BusCompanyCard.vue';
import { useBusCompanyList } from '../../../../composebles/transport';
import ButtonWhiteComponent from '../../../kits/ButtonWhiteComponent.vue';
import PopupComponent from '../../../PopupComponent.vue';

const {
  getBusCompanyList,
  globalBusCompanies,
  countDeleted,
  unsetDeleteBusCompanies,
  deleteBusCompanies,
  changeFormState,
} = useBusCompanyList();

const isActive = ref(false);
const showDeletePopup = ref(false);

const deleteProfilesAnswer = (answer) => {
  if (answer) {
    deleteBusCompanies();
  }
  showDeletePopup.value = false;
};

const createBusCompany = () => {
  changeFormState(true, 0);
};

onMounted(() => {
  getBusCompanyList();
});
</script>
<style scoped>
.active {
  background-color: #952252;
  border: #952252;
}
</style>
