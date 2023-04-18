<template>
  <div>
    <div style="background: white; width: 890px" class="bg-white h-100">
      <div class="overflow-hidden" style="height: 130px">
        <Transition name="fade">
          <div
            v-if="countDeleted === 0"
            class="d-flex justify-content-between flex-column pe-6 pt-4 pb-3"
          >
            <h3 class="mb-1">
              <strong>List of restaurant routes</strong>
            </h3>
            <div class="d-flex flex-nowrap justify-content-between">
              <InputComponent
                id="date_range_from"
                v-model="dateRangeFrom"
                type="date"
                name="unavailable_on"
                style="max-width: 32%"
                required
                autofocus
                :placeholder="'Select day from'"
              />
              <InputComponent
                id="date_range_to"
                v-model="dateRangeTo"
                type="date"
                name="unavailable_on"
                style="max-width: 32%"
                required
                autofocus
                :placeholder="'Select day from'"
              />
              <ButtonComponent
                :class="{ active: isActive }"
                style="max-width: 32%; width: 32%; height: 48px"
                label="Add new restaurant route"
                @click="changeFormState(true, 0)"
              ></ButtonComponent>
            </div>
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
                @click="unsetDeleteRoutes"
              ></ButtonWhiteComponent>
            </div>
          </div>
        </Transition>
      </div>
      <div
        v-if="globalRoutes.length"
        class="mt-2 pe-2 overflow-scroll-y scrollbar"
        style="max-height: 750px"
      >
        <TransitionGroup name="fade">
          <RouteCard
            v-for="(route, index) in globalRoutes"
            :key="index"
            :route="route"
            class="position-relative"
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
import RouteCard from './RouteCard.vue';
import { useRoutesList } from '../../../../composebles/restaurant-routes.ts';
import ButtonWhiteComponent from '../../../kits/ButtonWhiteComponent.vue';
import PopupComponent from '../../../PopupComponent.vue';
import InputComponent from '../../../kits/InputComponent.vue';

const {
  getRouteList,
  globalRoutes,
  countDeleted,
  unsetDeleteRoutes,
  deleteRoutes,
  changeFormState,
} = useRoutesList();

const isActive = ref(false);
const dateRangeFrom = ref('');
const dateRangeTo = ref('');
const showDeletePopup = ref(false);

const deleteProfilesAnswer = (answer) => {
  if (answer) {
    deleteRoutes();
  }
  showDeletePopup.value = false;
};

onMounted(() => {
  getRouteList();
});
</script>
<style scoped>
.active {
  background-color: #952252;
  border: #952252;
}
</style>
