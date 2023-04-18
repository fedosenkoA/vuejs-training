<template>
  <LoaderComponent v-if="loading" class="pb-1 pt-1" />
  <div
    v-if="loading"
    class="row d-flex justify-content-center align-items-center"
    style="color: #cb3171"
  >
    Loading…Almost there
  </div>
  <div class="container mt-3 h-100">
    <div class="row">
      <div class="col-5 m-auto border rounded-3">
        <div class="row ms-1 mt-1">
          <div class="row mt-2">
            <img
              class="border rounded p-1"
              src="../../../assets/images/frame.svg"
            />
          </div>
          <div class="row mt-2">
            <div
              class="row"
              style="color: rgba(70, 70, 70, 1); font-weight: 600"
            >
              Recommendation
            </div>
            <div class="ms-1">
              <div
                class="row"
                style="color: rgba(107, 107, 107, 1); font-weight: 400"
              >
                1. Fill in the field with the necessary information.
              </div>
              <div
                class="row"
                style="color: rgba(107, 107, 107, 1); font-weight: 400"
              >
                2. Get a detailed report.
              </div>
            </div>
          </div>
          <div
            class="row pt-2"
            style="border-bottom: 1px dotted rgba(222, 222, 222, 1)"
          ></div>
        </div>

        <div class="row ms-1 mt-2">
          <div
            class="row"
            style="color: rgba(133, 133, 133, 1); font-weight: 700"
          >
            Generate and download report
          </div>
          <div class="mt-1">
            <div class="row" style="color: #464646; font-weight: 600">
              <div class="col-6">Role</div>
              <div class="col-6">Name</div>
            </div>
            <div class="row">
              <div class="col-6">
                <SelectComponent
                  id="role"
                  style="
                    padding-bottom: 0 !important;
                    width: 100% !important;
                    height: 80%;
                    margin-left: -10px;
                  "
                  :options="roles"
                  :model-value="role"
                  @update-input="setRole"
                />
              </div>

              <div class="col-6">
                <SelectComponent
                  id="selected"
                  style="
                    padding-bottom: 0 !important;
                    width: 100% !important;
                    height: 80%;
                    margin-left: -10px;
                  "
                  :options="seletedValues"
                  :model-value="seletedValue"
                  @update-input="setSeletedValue"
                />
              </div>
            </div>
            <div class="row">
              <div class="col" style="color: #464646; font-weight: 600">
                Date range
              </div>
            </div>
            <div class="row pt-1">
              <InputComponent
                id="date_range_from"
                v-model="date_from"
                style="
                  padding-bottom: 0 !important;
                  width: 50% !important;
                  height: 80%;
                  margin-left: -10px;
                "
                class="col-2"
                type="date"
                name="unavailable_on"
                :max="today"
                required
                autofocus
                :placeholder="'Select day'"
                @update:modelValue="setDateFrom"
              />

              <InputComponent
                id="date_range_to"
                v-model="date_to"
                style="
                  padding-bottom: 0 !important;
                  width: 50% !important;
                  height: 80%;
                  margin-left: -10px;
                "
                class="col-2"
                type="date"
                name="unavailable_on"
                :min="date_from"
                :max="maxDay"
                required
                autofocus
                :placeholder="'Select day'"
                @update:modelValue="setDateTo"
              />
            </div>
          </div>
          <div class="row">
            <Button
              :label="'View report'"
              class="mt-2 mb-2"
              style="width: 96%; height: 40px"
              @click="createFilteredReport"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalWindowReportVue :is-open="isOpen" @closeModalWindow="closeModalWindow">
    <template #body>
      <Transition>
        <div class="row-body">
          <table class="table table-borderless m-0" style="width: 100%">
            <thead class="small table-light w-100">
              <tr>
                <th class="ps-16" scope="col">Name</th>
                <th class="ps-16" scope="col">Period</th>
                <th class="ps-16" scope="col">Tours</th>
                <th class="ps-16" scope="col">Fee</th>
                <th class="ps-16" scope="col">Total</th>
                <th class="ps-16" scope="col"></th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <RowTable
                v-for="(report, index) in filteredReportArray"
                :key="index"
                :report="report"
                :last="index === filteredReportArray.length - 1"
              />
            </tbody>
          </table>
        </div>
      </Transition>
    </template>
  </ModalWindowReportVue>
</template>

<script setup>
import Button from '../../kits/ButtonComponent.vue';
import InputComponent from '../../kits/InputComponent.vue';
import { onMounted, ref, computed } from 'vue';
import SelectComponent from './SelectReport.vue';
import { useReports } from '../../../composebles/reports';
import ModalWindowReportVue from './ModalWindowReport.vue';
import RowTable from './RowTable.vue';
import LoaderComponent from '../../kits/LoaderComponent.vue';

const role = ref('');
const date_from = ref('');
const date_to = ref('');
const seletedValue = ref('');
const isOpen = ref(false);
const loading = ref(false);

const closeModalWindow = () => {
  isOpen.value = false;
};

const roles = [
  {
    id: 0,
    label: 'Tour guide',
  },
  {
    id: 1,
    label: 'Bus company',
  },
  {
    id: 2,
    label: 'Restaurant',
  },
];

const {
  getTransportCompanies,
  getFilteredReport,
  getRestaurants,
  getGuides,
  restaurants,
  guides,
  transportCompanies,
  guidesInfo,
  getGuidesInfo,
} = useReports();

onMounted(() => {
  getGuides();
  getRestaurants();
  getTransportCompanies();
  getGuidesInfo();
});

const restaurantsArray = computed(() => restaurants.value);
const guidesArray = computed(() => guides.value);
const transportCompaniesArray = computed(() => transportCompanies.value);
const seletedValues = ref([]);
const selectedType = ref('');
const filteredReport = ref('');
const filteredReportArray = ref([]);

const createSelectedValues = () => {
  if (role.value === 'Tour guide') {
    seletedValues.value = guidesArray.value;
    selectedType.value = 'GUIDE';
  } else if (role.value === 'Bus company') {
    seletedValues.value = transportCompaniesArray.value;
    selectedType.value = 'TRANSPORT';
  } else if (role.value === 'Restaurant') {
    seletedValues.value = restaurantsArray.value;
    selectedType.value = 'RESTAURANT';
  }
};

const maxDay = ref(new Date().toISOString().split('T')[0]);
const today = ref(new Date().toISOString().split('T')[0]);

const setDateFrom = (val) => {
  date_from.value = val;
  const dateFrom = new Date(date_from.value);

  let month = dateFrom.getMonth() + 1 > 11 ? 1 : dateFrom.getMonth() + 1;
  if (month < 10) month = `0${month + 1}`;

  const mDay =
    new Date(`${dateFrom.getFullYear()}-${month}-${dateFrom.getDate()}`) <
    new Date(today.value)
      ? `${dateFrom.getFullYear()}-${month}-${dateFrom.getDate()}`
      : today.value;
  maxDay.value = mDay;
};

const setDateTo = (val) => {
  date_to.value = val;
};

const setRole = (val) => {
  role.value = val;
  createSelectedValues();
};

const setSeletedValue = (val) => {
  seletedValue.value = val;
};

const findId = () => {
  let id = 0;

  if (role.value === 'Tour guide') {
    const fullName = seletedValue.value.split(' ');
    guidesInfo.value.forEach((el) => {
      if (
        el.user.first_name == fullName[0] &&
        el.user.last_name == fullName[1]
      ) {
        id = el.id;
      }
    });
  } else if (role.value === 'Bus company') {
    seletedValues.value.forEach((el) => {
      if (el.name == seletedValue.value) {
        id = el.id;
      }
    });
  } else if (role.value === 'Restaurant') {
    seletedValues.value.forEach((el) => {
      if (el.name == seletedValue.value) {
        id = el.id;
      }
    });
  }

  return id;
};

const createFilteredReport = () => {
  loading.value = true;
  const reference_id = findId();
  getFilteredReport(
    selectedType.value,
    reference_id,
    date_from.value,
    date_to.value
  ).then((data) => {
    loading.value = false;
    filteredReportArray.value = [];
    filteredReport.value = '';

    filteredReport.value = data;
    isOpen.value = true;

    if (filteredReport.value?.data != null) {
      filteredReport.value.data.forEach((el) => {
        filteredReportArray.value.push({
          name: filteredReport.value.header.name,
          date: el.date,
          tour: el.tour_name,
          fee: el.fee,
          total: filteredReport.value.total,
        });
      });
    } else {
      filteredReportArray.value.push({
        name: filteredReport.value.header.name,
        date: 'N/A',
        tour: 'N/A',
        fee: 'N/A',
        total: filteredReport.value.total,
      });
    }
  });
};
</script>
