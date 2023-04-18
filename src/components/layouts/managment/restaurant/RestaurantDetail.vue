<template>
  <div v-if="showDetailForm">
    <form
      class="d-flex flex-column justify-content-between bg-white rounded border w-100 mx-6 h-100"
      :style="{ height: divHeight }"
      style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.04); max-width: 560px"
      @submit.prevent="formSubmit"
    >
      <div style="height: 102px; border-bottom: 1px solid #dedede">
        <div class="d-flex justify-content-between p-4">
          <h2>
            {{ currentRestaurant ? 'Restaurant info' : 'Create new profile' }}
          </h2>
        </div>
      </div>
      <div>
        <div class="row p-4">
          <div class="d-flex">
            <InputComponent
              id="name"
              v-model="form.name"
              :label="'Restaurant name'"
              type="text"
              class="me-3"
              name="first_name"
              required
              autofocus
              :placeholder="'Enter name'"
            />
            <InputComponent
              id="address"
              v-model="form.address"
              :label="'Enter address'"
              type="text"
              name="address"
              required
              autofocus
              :placeholder="'Enter address'"
            />
          </div>
          <div class="d-flex">
            <InputComponent
              id="manager_name"
              v-model="form.manager.first_name"
              :label="'Manager name'"
              type="text"
              class="me-3"
              name="manager_name"
              required
              autofocus
              :placeholder="'Manager name'"
            />
            <InputComponent
              id="manager_name_last"
              v-model="form.manager.last_name"
              :label="'Manager last name'"
              type="text"
              name="manager_name_last"
              required
              autofocus
              :placeholder="'Manager last name'"
            />
          </div>
          <div class="d-flex">
            <InputComponent
              id="email"
              v-model="form.manager.email"
              :label="'Email'"
              class="me-3"
              type="email"
              name="email"
              required
              autofocus
              :placeholder="'Enter email'"
            />
            <InputComponent
              id="phone"
              v-model="form.manager.phone_number"
              :label="'Phone number'"
              type="phone"
              class="me-3"
              name="phone_number"
              required
              autofocus
              :placeholder="'Enter phone number'"
            />
          </div>
          <div class="d-flex">
            <InputComponent
              id="unavailable_on"
              v-model="form.unavailable_on"
              :label="'Unavailable on'"
              type="date"
              multiple="multiple"
              name="unavailable_on"
              required
              autofocus
              :placeholder="'Enter date'"
            />
            <InputComponent
              id="unavailable_on"
              v-model="form.unavailable_on"
              :label="'Unavailable on'"
              type="date"
              multiple="multiple"
              name="unavailable_on"
              required
              autofocus
              :placeholder="'Enter date'"
            />
          </div>
          <div class="d-flex">
            <ButtonComponent
              :label="currentRestaurant ? 'Save' : 'Create'"
              style="width: 235px; height: 46px"
              class="me-3"
            ></ButtonComponent>
            <ButtonWhiteComponent
              label="Cancel"
              style="width: 235px; height: 46px"
              @click="changeFormState(false)"
            ></ButtonWhiteComponent>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import ButtonComponent from '../../../kits/ButtonComponent.vue';
import ButtonWhiteComponent from '../../../kits/ButtonWhiteComponent.vue';
import InputComponent from '../../../kits/InputComponent.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { useRestaurantList } from '../../../../composebles/restaurant.ts';
import { usePageToasts } from '../../../../composebles/use-toast';
import InputMultDateComponent from '../../../kits/InputMultDateComponent.vue';

const {
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  currentRestaurant,
  showDetailForm,
  changeFormState,
} = useRestaurantList();

const divHeight = ref('');
const tabs = ref([
  {
    id: 0,
    name: 'Restaurant',
    active: true,
  },
  {
    id: 1,
    name: 'Manager',
    active: false,
  },
]);
//todo dates refactor
const form = ref({
  id: 0,
  name: '',
  address: '',
  manager: {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  },
  unavailable_on: {
    type: Date,
    default: null,
  },
  menus: [],
});

const { addToast } = usePageToasts();
const formSubmit = () => {
  if (currentRestaurant.value !== 0) {
    updateRestaurant(form.value)
      .then(() => {
        addToast({
          title: 'Success',
          text: 'Restaurant updated successfully',
        });
      })
      .catch((response) => {
        addToast(
          {
            title: 'Error',
            text: response.message,
          },
          'error'
        );
      });
  } else {
    createRestaurant(form.value)
      .then(() => {
        addToast({
          title: 'Success',
          text: 'Restaurant updated successfully',
        });
      })
      .catch((response) => {
        addToast(
          {
            title: 'Error',
            text: response.message,
          },
          'error'
        );
      });
  }
};

const getRestaurantData = () => {
  if (currentRestaurant.value !== 0) {
    const restaurant = getRestaurant(currentRestaurant.value);
    if (restaurant !== null) {
      form.value.id = restaurant.id;
      form.value.name = restaurant.name;
      form.value.address = restaurant.address;
      form.value.manager.id = restaurant.manager.id;
      form.value.manager.first_name = restaurant.manager.first_name;
      form.value.manager.last_name = restaurant.manager.last_name;
      form.value.manager.email = restaurant.manager.email;
      form.value.manager.phone_number = restaurant.manager.phone_number;
      form.value.unavailable_on = restaurant?.unavailable_on;
    }
  } else {
    form.value.id = 0;
    form.value.name = '';
    form.value.address = '';
    form.value.manager.id = 0;
    form.value.manager.first_name = '';
    form.value.manager.last_name = '';
    form.value.manager.email = '';
    form.value.manager.phone_number = '';
    form.value.unavailable_on = null;
  }
};

onUpdated(() => {
  if (currentRestaurant.value !== form.value.id) {
    getRestaurantData();
  }
});
onMounted(() => {
  getRestaurantData();
});
</script>
<style scoped></style>
