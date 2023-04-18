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
          <div class="mt-2">
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
                1. Press Create report.
              </div>
              <div
                class="row"
                style="color: rgba(107, 107, 107, 1); font-weight: 400"
              >
                2. Choose the date range.
              </div>
              <div
                class="row"
                style="color: rgba(107, 107, 107, 1); font-weight: 400"
              >
                3. Press Create (the Excel report will be downloaded)
              </div>
            </div>
          </div>
          <Button
            class="mt-2"
            style="width: 92%; height: 40px"
            :label="'Create report'"
            @click="allowClick"
          />
          <div
            class="row pt-2"
            style="border-bottom: 2px dotted rgba(222, 222, 222, 1)"
          ></div>
        </div>

        <div class="row ms-1 mt-2">
          <div class="row" style="color: rgba(70, 70, 70, 1); font-weight: 600">
            Generate and download report
          </div>
          <div
            class="row mt-1"
            style="color: rgba(70, 70, 70, 1); font-weight: 400"
          >
            Date range
          </div>
          <div class="row">
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
              :min="'2023-01-01'"
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
          <div class="row">
            <Button
              :label="'Create'"
              class="mt-2 mb-2"
              style="width: 96%; height: 40px"
              :class="[setClass ? '' : 'buttonCreate']"
              @click="createTaxReport"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '../../kits/ButtonComponent.vue';
import InputComponent from '../../kits/InputComponent.vue';
import { ref } from 'vue';
import { useReports } from '../../../composebles/reports';
import LoaderComponent from '../../kits/LoaderComponent.vue';

const { getTaxReport } = useReports();

const date_from = ref('');
const date_to = ref('');
const maxDay = ref(new Date().toISOString().split('T')[0]);
const today = ref(new Date().toISOString().split('T')[0]);
const loading = ref(false);
const taxReport = ref('');

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

const setClass = ref(false);

const allowClick = () => {
  setClass.value = true;
};

const createTaxReport = () => {
  loading.value = true;
  getTaxReport(date_from.value, date_to.value).then((data) => {
    loading.value = false;
    taxReport.value = data;
    const link = document.createElement('a');
    link.setAttribute('href', `${taxReport.value}`);
    link.setAttribute('download', 'download');
    onload = link.click();
  });
};
</script>

<style scoped>
.buttonCreate {
  background-color: hsl(335, 63%, 81%);
  pointer-events: none;
  border-color: hsl(335, 63%, 81%);
}
</style>
