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
          <h2>{{ currentManager ? 'Admin info' : 'Create new profile' }}</h2>
        </div>
      </div>
      <div style="border-bottom: 1px dashed #dedede">
        <div class="row p-4" style="height: 216px">
          <div class="d-flex">
            <InputComponent
              id="first_name"
              v-model="form.first_name"
              :label="'First name'"
              type="text"
              :class="[errors.first_name ? 'is-invalid' : '']"
              class="me-3"
              :error-message="errors.first_name"
              name="first_name"
              required
              autofocus
              :placeholder="'Enter first name'"
            />
            <InputComponent
              id="last_name"
              v-model="form.last_name"
              :label="'Last name'"
              type="text"
              :class="[errors.last_name ? 'is-invalid' : '']"
              :error-message="errors.last_name"
              name="last_name"
              required
              autofocus
              :placeholder="'Enter last name'"
            />
          </div>
          <div class="d-flex">
            <InputComponent
              id="email"
              v-model="form.email"
              :label="'Email'"
              type="email"
              :class="[errors.email ? 'is-invalid' : '']"
              class="me-3"
              :error-message="errors.email"
              name="email"
              required
              autofocus
              :placeholder="'Enter email'"
            />
            <InputComponent
              id="phone"
              v-model="form.phone_number"
              :label="'Phone number'"
              type="phone"
              :class="[errors.phone_number ? 'is-invalid' : '']"
              :error-message="errors.phone_number"
              name="phone_number"
              required
              autofocus
              :placeholder="'Enter phone number'"
            />
          </div>
        </div>
      </div>
      <div class="row py-3 px-4">
        <div class="d-flex">
          <ButtonComponent
            :label="currentManager ? 'Save' : 'Create'"
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
    </form>
  </div>
</template>

<script setup>
import ButtonComponent from '../../../kits/ButtonComponent.vue';
import ButtonWhiteComponent from '../../../kits/ButtonWhiteComponent.vue';
import InputComponent from '../../../kits/InputComponent.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { useManagersList } from '../../../../composebles/managers';
import { usePageToasts } from '../../../../composebles/use-toast';

const {
  getManager,
  createManager,
  updateManager,
  currentManager,
  showDetailForm,
  changeFormState,
} = useManagersList();

const divHeight = ref('');
const form = ref({
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  roles: {
    connect: 'ADMIN_ID',
  },
});
const errors = ref({
  email: '',
  first_name: '',
  last_name: '',
  phone_number: '',
});

const { addToast } = usePageToasts();
const formSubmit = () => {
  if (currentManager.value !== 0) {
    updateManager(form.value)
      .then(() => {
        addToast({
          title: 'Success',
          text: 'Admin updated successfully',
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
    createManager(form.value)
      .then((id) => {
        addToast({
          title: 'Success',
          text: 'Admin updated successfully',
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

const getManagerData = () => {
  if (currentManager.value !== 0) {
    const Admin = getManager(currentManager.value);
    if (Admin !== null) {
      form.value.id = Admin?.id;
      form.value.first_name = Admin?.first_name;
      form.value.last_name = Admin?.last_name;
      form.value.email = Admin?.email;
      form.value.phone_number = Admin?.phone_number;
    }
  } else {
    form.value.id = 0;
    form.value.first_name = '';
    form.value.last_name = '';
    form.value.email = '';
    form.value.phone_number = '';
  }
};

onUpdated(() => {
  if (currentManager.value !== form.value.id) {
    getManagerData();
  }
});
onMounted(() => {
  getManagerData();
});
</script>
<style scoped></style>
