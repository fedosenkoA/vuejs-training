<template>
  <div class="border-bottom py-1 d-flex w-100">
    <div
      class="d-flex justify-content-between align-items-center"
      style="width: 20%"
    >
      <h2><strong>Documents</strong></h2>
    </div>
    <div
      class="row d-flex justify-content-between align-items-center px-1"
      style="width: 80%"
    >
      <div class="col-4">
        <div
          v-if="view === 'list view'"
          class="border rounded d-flex flex-row"
          style="
            padding: 4px;
            background: #f9f9f9;
            transition: all 0.2s;
            width: fit-content;
            height: 50px;
          "
        >
          <div
            class="d-flex align-items-center item px-1 py-1 cursor-pointer"
            style="
              background: #ffffff;
              border: solid 1px #dedede;
              border-radius: 5px;
              transition: all 0.2s;
            "
            @click="setLayout('list view')"
          >
            <p class="small m-0">Museum ticket</p>
          </div>

          <div
            class="d-flex align-items-center item px-1 py-1 cursor-pointer"
            @click="setLayout('bills view')"
          >
            <p class="small m-0">Restaurant bills</p>
          </div>
        </div>

        <div
          v-else
          class="border rounded d-flex flex-row"
          style="
            padding: 4px;
            background: #f9f9f9;
            transition: all 0.2s;
            width: fit-content;
            height: 50px;
          "
        >
          <div
            class="d-flex align-items-center item px-1 py-1 cursor-pointer"
            @click="setLayout('list view')"
          >
            <p class="small m-0">Museum ticket</p>
          </div>

          <div
            class="d-flex align-items-center item px-1 py-1 cursor-pointer"
            style="
              background: #ffffff;
              border: solid 1px #dedede;
              border-radius: 5px;
              transition: all 0.2s;
            "
            @click="setLayout('bills view')"
          >
            <p class="small m-0">Restaurant bills</p>
          </div>
        </div>
      </div>

      <SelectComponent
        id="restaurant"
        class="col-2"
        style="padding-bottom: 0 !important; width: 15% !important"
        :options="restaurantsArray"
        :model-value="filterProperties.restaurant"
        @updateInput="setRestaurant"
      />
      <InputComponent
        id="date_range"
        v-model="filterProperties.date_range"
        style="padding-bottom: 0 !important; width: 20% !important"
        class="col-2"
        type="date"
        name="unavailable_on"
        required
        autofocus
        :placeholder="'Select day'"
        @update:modelValue="setDate"
      />
      <ButtonWhiteComponent
        class="col-2 btn"
        type="submit"
        style="width: 20% !important; height: 48px"
        :label="'Cancel'"
        @click="clear"
      />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import SelectComponent from './SelectDocuments.vue';
import InputComponent from '../../kits/InputComponent.vue';
import { useDocuments } from '../../../composebles/documents.ts';
import ButtonWhiteComponent from '../../kits/ButtonWhiteComponent.vue';

const {
  setFilterRestaurant,
  clearFilterRestaurant,
  getRestaurants,
  restaurants,
  getBills,
} = useDocuments();

const filterProperties = ref({
  restaurant: '',
  date_range: '',
});

onMounted(() => {
  getBills();
  getRestaurants();
});

const restaurantsArray = computed(() => restaurants.value);
const view = ref('bills view');

const setRestaurant = (val) => {
  filterProperties.value.restaurant = val;
  sendFilter();
};

const setDate = (val) => {
  filterProperties.value.date_range = val;
  sendFilter();
};

const sendFilter = () => {
  setFilterRestaurant(
    filterProperties.value.restaurant,
    filterProperties.value.date_range
  );
  getBills();
};

const clear = () => {
  clearFilterRestaurant();
  filterProperties.value = {
    restaurant: '',
    date_range: '',
  };
  getBills();
};

const setLayout = (data) => {
  view.value = data;
  setViewDocuments();
};

const emit = defineEmits(['setViewDocuments']);

const setViewDocuments = () => {
  emit('setViewDocuments', {
    view: view.value,
  });
};
</script>

<style scoped></style>
