<template>
  <div v-if="showDetailForm">
    <form
      class="d-flex flex-column justify-content-between bg-white rounded border w-100 mx-6 h-100"
      :style="{ height: divHeight }"
      style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.04); max-width: 560px"
      @submit.prevent="formSubmit"
    >
      <div style="height: 80px; border-bottom: 1px solid #dedede">
        <div class="d-flex justify-content-between p-4">
          <h3>{{ currentUser ? 'Guide info' : 'Create new profile' }}</h3>
        </div>
      </div>
      <UploadComponent @upload:value="form.file = $event" />
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
          <SelectComponent
            id="payment_type"
            class="me-3"
            style="max-width: 235px"
            :label="'Payment type'"
            :options="options"
            :v-model="form.rate_type"
            :model-value="form.rate_type"
            @update:model-value="form.rate_type = $event"
          />
          <Transition name="fade">
            <InputComponent
              v-if="form.rate_type === 'PER_HOUR'"
              id="rate"
              v-model="form.rate"
              :label="'Rate/Service €'"
              type="number"
              :class="[errors.rate ? 'is-invalid' : '']"
              name="rate"
              required
              autofocus
              :placeholder="'Service'"
            />
            <p v-else class="text-muted small w-50 mt-2" style="max-width: 47%">
              Fill in the tours below with the price per service
            </p>
          </Transition>
        </div>
        <Transition name="fade">
          <div
            v-if="form.rate_type === 'PER_SERVICE'"
            class="d-flex overflow-scroll-y scrollbar flex-wrap justify-content-between border-top border-bottom py-1"
            style="max-height: 100px"
          >
            <InputComponent
              v-for="rate in form.rates"
              :id="'rate_' + rate.rate_id"
              :key="rate.id"
              v-model="rate.charge"
              :label="rate.label"
              type="number"
              class="w-50"
              style="max-width: 47%"
              :class="[errors.rate ? 'is-invalid' : '']"
              name="rate"
              required
              autofocus
              :placeholder="'Service'"
            />
          </div>
        </Transition>
        <div class="d-flex mt-1">
          <ButtonComponent
            :label="currentUser ? 'Save' : 'Create'"
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
import SelectComponent from '../../../kits/SelectComponent.vue';
import UploadComponent from '../../../kits/UploadComponent.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { useGuideList } from '../../../../composebles/guide.ts';
import { usePageToasts } from '../../../../composebles/use-toast';

const {
  getGuideUser,
  createGuideUser,
  updateGuideUser,
  setRateForGuide,
  uploadAvatar,
  currentUser,
  showDetailForm,
  changeFormState,
} = useGuideList();

const divHeight = ref('');
const form = ref({
  id: 0,
  user_id: 0,
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  rate_type: 'PER_HOUR',
  rate: 0,
  rates: [],
  rate_tour: '',
  file: null,
  roles: {
    connect: 'GUIDE_ID',
  },
});
const errors = ref({
  email: '',
  first_name: '',
  last_name: '',
  phone_number: '',
});
const options = ref([
  { value: 'PER_HOUR', label: 'Hour' },
  { value: 'PER_SERVICE', label: 'Service' },
]);
const tourPayment = [
  { rate_id: 1, charge: '0', label: 'Evening Tapas' },
  { rate_id: 2, charge: '0', label: 'Midday Tapas' },
  { rate_id: 3, charge: '0', label: 'Private Tapas' },
  { rate_id: 4, charge: '0', label: 'Flamenco Tapas' },
  { rate_id: 5, charge: '0', label: '10 AM Park Sagrada' },
  { rate_id: 8, charge: '0', label: '3 PM Park Sagrada' },
  { rate_id: 13, charge: '0', label: '2:30 PM Park Sagrada' },
  { rate_id: 6, charge: '0', label: 'Private Park Sagrada' },
  { rate_id: 7, charge: '0', label: 'Sagrada' },
  { rate_id: 12, charge: '0', label: 'Private Sagrada' },
  { rate_id: 9, charge: '0', label: 'Best of BCN' },
  { rate_id: 11, charge: '0', label: 'Private Best of BCN' },
  { rate_id: 14, charge: '0', label: 'Montserrat' },
  { rate_id: 10, charge: '0', label: 'Private Montserrat' },
];

const { addToast } = usePageToasts();
const formSubmit = () => {
  if (currentUser.value !== 0) {
    updateGuideUser(form.value)
      .then((guide) => {
        addToast({
          title: 'Success',
          text: 'Guide updated successfully',
        });
        sendRateForGuide();
        if (form.value.file) uploadAvatar(guide?.user.id, form.value.file);
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
    createGuideUser(form.value)
      .then((guide) => {
        addToast({
          title: 'Success',
          text: 'Guide updated successfully',
        });
        sendRateForGuide();
        if (form.value.file) uploadAvatar(guide?.user.id, form.value.file);
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

const sendRateForGuide = () => {
  if (form.value.rate_type === 'PER_HOUR') {
    const ratePerHour = [
      {
        charge: parseFloat(form.value.rate),
      },
    ];
    setRateForGuide(ratePerHour, form.value.id, 'PER_HOUR');
  } else {
    const ratePerService = form.value.rates.map((rate) => {
      const serviceRate = {
        charge: parseFloat(rate?.charge),
        rate_id: rate?.rate_id,
      };
      return { ...serviceRate };
    });
    setRateForGuide(ratePerService, form.value.id, 'PER_SERVICE');
  }
};

const getUserData = () => {
  if (currentUser.value !== 0) {
    const guide = getGuideUser(currentUser.value);
    if (guide !== null) {
      const ratesLength = guide.rates.length;
      if (ratesLength < 2) {
        form.value.rate_type = 'PER_HOUR';
        form.value.rate = guide.rates[0]?.charge ?? 0;
        form.value.rates = JSON.parse(JSON.stringify(tourPayment));
      } else {
        form.value.rate_type = 'PER_SERVICE';
        form.value.rate = 0;
        form.value.rates = JSON.parse(JSON.stringify(tourPayment));
        debugger;
        guide.rates.forEach((rate) => {
          debugger;
          const index = form.value.rates.findIndex(
            (item) => item?.rate_id === rate.id
          );
          form.value.rates[index].charge = rate.charge;
        });
      }

      form.value.id = guide?.id;
      form.value.user_id = guide?.user.id;
      form.value.first_name = guide?.user.first_name;
      form.value.last_name = guide?.user.last_name;
      form.value.email = guide?.user.email;
      form.value.phone_number = guide?.user.phone_number;
    }
  } else {
    form.value.id = 0;
    form.value.user_id = 0;
    form.value.first_name = '';
    form.value.last_name = '';
    form.value.email = '';
    form.value.phone_number = '';
    form.value.rate_type = 'PER_HOUR';
    form.value.rate = 0;
    form.value.rate_tour = '';
    form.value.rates = tourPayment;
  }
};

onUpdated(() => {
  if (currentUser.value !== form.value.id) {
    getUserData();
  }
});
onMounted(() => {
  getUserData();
});
</script>
<style scoped></style>
