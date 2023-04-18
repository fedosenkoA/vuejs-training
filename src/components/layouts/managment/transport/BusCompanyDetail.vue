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
            {{ currentBusCompany ? 'BusCompany info' : 'Create new profile' }}
          </h2>
          <!--          <div class="d-flex align-items-center justify-content-center">-->
          <!--            <img-->
          <!--              src="/src/assets/images/trash.svg"-->
          <!--              style="width: 25px; height: 27px; cursor: pointer"-->
          <!--              :style="currentBusCompany ? 'opacity: 1;' : 'opacity: 0.5;'"-->
          <!--              alt="DeleteButtonLightRed"-->
          <!--              @click="deleteAction"-->
          <!--            />-->
          <!--          </div>-->
        </div>
      </div>
      <div>
        <div class="row px-4 pt-4">
          <div class="row">
            <NavBarComponent
              :items="[
                {
                  label: 'Main information',
                  active: true,
                  index: 0,
                },
                {
                  label: 'Bus information',
                  active: false,
                  index: 1,
                },
              ]"
              @change="formType = $event"
            />
          </div>
        </div>
        <Transition>
          <div v-if="formType === 0" class="row p-4">
            <div class="d-flex">
              <InputComponent
                id="name"
                v-model="form.name"
                :label="'Bus company name'"
                type="text"
                class="me-3"
                name="first_name"
                required
                autofocus
                :placeholder="'Enter name'"
              />
              <InputComponent
                id="manager_name"
                v-model="form.manager.first_name"
                :label="'Manager'"
                type="text"
                name="manager_name"
                required
                autofocus
                :placeholder="'Manager name'"
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
                id="phone_number"
                v-model="form.manager.phone_number"
                :label="'Phone'"
                type="text"
                name="phone_number"
                required
                autofocus
                :placeholder="'Enter phone'"
              />
            </div>
            <div class="d-flex">
              <ButtonComponent
                :label="currentBusCompany ? 'Save' : 'Create'"
                style="width: 235px; height: 46px"
                class="me-3"
              ></ButtonComponent>
              <ButtonWhiteComponent
                label="Cancel"
                style="width: 235px; height: 46px"
                @click="changeFormState(false, 0)"
              ></ButtonWhiteComponent>
            </div>
          </div>
          <div v-else class="row p-4">
            <div
              class="p-0 overflow-scroll-y scrollbar"
              style="max-height: 400px"
            >
              <TransitionGroup
                name="fade"
                class="overflow-scroll-y scrollbar"
                style="max-height: 400px"
              >
                <div
                  v-for="(point, point_id) in form.points"
                  :key="point_id"
                  class="timeline-container"
                  style="padding-left: 12px"
                >
                  <div class="timeline-block timeline-block-right">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <InputComponent
                          :id="'bus_type_' + point_id"
                          v-model="form.points[point_id].bus_type"
                          class="me-3"
                          :label="'Bus type (seats)'"
                          type="number"
                          name="name"
                          style="max-width: 200px"
                          required
                          autofocus
                          :placeholder="'Enter bus seats'"
                        />
                        <SelectComponent
                          :id="'tour' + point_id"
                          :label="'Tour'"
                          :options="tours"
                          :v-model="form.points[point_id].tour_id"
                          :model-value="form.points[point_id].tour_id"
                          @update:model-value="
                            form.points[point_id].restaurant_id = $event
                          "
                        />
                      </div>
                    </div>
                  </div>
                  <div class="timeline-block timeline-block-right">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <InputComponent
                            :id="'rate' + point_id"
                            v-model="form.points[point_id].rate_per_service"
                            :label="'Rate per service'"
                            type="number"
                            name="name"
                            required
                            autofocus
                            style="width: 80%"
                            :placeholder="'Enter route name'"
                          />
                          <div v-if="point_id > 0">
                            <img
                              src="/src/assets/images/trash.svg"
                              class="ms-1"
                              alt=""
                              style="width: 20px; height: 20px; cursor: pointer"
                              @click="removePoint(point_id)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TransitionGroup>
            </div>
            <div
              class="d-flex justify-content-between align-items-center py-1 px-4"
              style="
                border-bottom: 1px dashed #cb3171;
                border-top: 1px dashed #cb3171;
              "
            >
              <div
                class="text-primary small mx-auto add-point"
                style="cursor: pointer"
                @click="addPoint"
              >
                Add new bus
                <img class="ms-1" src="/src/assets/images/d_bus.svg" alt="" />
              </div>
            </div>
            <div class="row px-4 pt-2">
              <div class="d-flex">
                <ButtonComponent
                  :label="currentRoute ? 'Save' : 'Create'"
                  style="height: 46px"
                  class="me-3 w-50"
                ></ButtonComponent>
                <ButtonWhiteComponent
                  label="Cancel"
                  style="width: 235px; height: 46px"
                  class="w-50"
                  @click="changeFormState(false, 0)"
                ></ButtonWhiteComponent>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </form>
  </div>
</template>

<script setup>
import ButtonComponent from '../../../kits/ButtonComponent.vue';
import ButtonWhiteComponent from '../../../kits/ButtonWhiteComponent.vue';
import InputComponent from '../../../kits/InputComponent.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { useBusCompanyList } from '../../../../composebles/transport';
import { usePageToasts } from '../../../../composebles/use-toast';
import NavBarComponent from '../../../kits/NavBarComponent.vue';
import SelectComponent from '../../../kits/SelectComponent.vue';

const {
  getBusCompany,
  createBusCompany,
  updateBusCompany,
  currentBusCompany,
  showDetailForm,
  changeFormState,
} = useBusCompanyList();

const divHeight = ref('');
const form = ref({
  id: 0,
  name: '',
  manager: {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  },
  buses: [
    {
      id: 0,
      seats: 0,
      fee: 0,
    },
  ],
  points: [
    {
      id: 0,
      bus_type: 0,
      tour_type: 0,
      rate_per_service: 0,
    },
  ],
});

const tours = ref([
  {
    id: 0,
    label: 'Tour',
    value: 0,
  },
  {
    id: 1,
    label: 'Tour 1',
    value: 1,
  },
]);

const formType = ref(0);

const { addToast } = usePageToasts();
const formSubmit = () => {
  if (currentBusCompany.value !== 0) {
    updateBusCompany(form.value)
      .then(() => {
        addToast({
          title: 'Success',
          text: 'Bus company updated successfully',
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
    createBusCompany(form.value)
      .then(() => {
        addToast({
          title: 'Success',
          text: 'Bus company create successfully',
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

const getBusCompanyData = () => {
  if (currentBusCompany.value !== 0) {
    const busCompany = getBusCompany(currentBusCompany.value);
    if (busCompany !== null) {
      form.value.id = busCompany.id;
      form.value.name = busCompany.name;
      form.value.address = busCompany.address;
      form.value.manager.id = busCompany.manager.id;
      form.value.manager.first_name = busCompany.manager.first_name;
      form.value.manager.last_name = busCompany.manager.last_name;
      form.value.manager.email = busCompany.manager.email;
      form.value.manager.phone_number = busCompany.manager.phone_number;
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
  }
};

const addPoint = () => {
  form.value.points.push({
    id: 0,
    bus_type: 0,
    tour_type: 0,
    rate_per_service: 0,
  });
};

const removePoint = (id) => {
  form.value.points.splice(id - 1, 1);
};

onUpdated(() => {
  if (currentBusCompany.value !== form.value.id) {
    getBusCompanyData();
  }
});
onMounted(() => {
  getBusCompanyData();
});
</script>
<style scoped></style>
