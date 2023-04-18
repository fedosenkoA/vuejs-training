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
              <strong>List of restaurants</strong>
            </h3>
            <ButtonComponent
              :class="{ active: isActive }"
              label="Add new restaurant"
              @click="createRestaurant"
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
                @click="unsetDeleteRestaurants"
              ></ButtonWhiteComponent>
            </div>
          </div>
        </Transition>
      </div>
      <div
        v-if="globalRestaurants.length"
        class="overflow-scroll-y scrollbar"
        style="max-height: calc(100vh - 200px)"
      >
        <TransitionGroup name="fade">
          <ListOfRestaurantCard
            v-for="(restaurant, index) in globalRestaurants"
            :key="index"
            :restaurant="restaurant"
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
import ListOfRestaurantCard from './ListOfRestaurantCard.vue';
import { useRestaurantList } from '../../../../composebles/restaurant.ts';
import ButtonWhiteComponent from '../../../kits/ButtonWhiteComponent.vue';
import PopupComponent from '../../../PopupComponent.vue';

const {
  getRestaurantList,
  globalRestaurants,
  countDeleted,
  unsetDeleteRestaurants,
  deleteRestaurants,
  changeFormState,
} = useRestaurantList();

const isActive = ref(false);
const showDeletePopup = ref(false);

const deleteProfilesAnswer = (answer) => {
  if (answer) {
    deleteRestaurants();
  }
  showDeletePopup.value = false;
};

const createRestaurant = () => {
  changeFormState(true, 0);
};

onMounted(() => {
  getRestaurantList();
});
</script>
<style scoped>
.active {
  background-color: #952252;
  border: #952252;
}
</style>
