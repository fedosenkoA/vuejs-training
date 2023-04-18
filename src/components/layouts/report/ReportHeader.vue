<template>
  <div class="container">
    <div class="row">
      <div class="col-5 m-auto border-bottom py-1 pb-3 d-flex">
        <div class="d-flex justify-content-between align-items-center">
          <h2><strong>Report</strong></h2>
        </div>
        <div
          class="row d-flex justify-content-end align-items-end px-1 ms-auto"
        >
          <div
            v-if="view === 'tax report'"
            class="border rounded d-flex flex-row"
            style="
              padding: 4px;
              background: #f9f9f9;
              transition: all 0.2s;
              width: fit-content;
            "
          >
            <div
              class="d-flex align-items-center item px-2 py-1 cursor-pointer"
              style="
                background: #ffffff;
                border: solid 1px #dedede;
                border-radius: 5px;
                transition: all 0.2s;
              "
              @click="setLayout('tax report')"
            >
              <p class="small m-0">Tax report</p>
            </div>
            <div
              class="d-flex align-items-center item px-2 py-1 cursor-pointer"
              @click="setLayout('filtered report')"
            >
              <p class="small m-0">Filtered report</p>
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
            "
          >
            <div
              class="d-flex align-items-center item px-2 py-1 cursor-pointer"
              @click="setLayout('tax report')"
            >
              <p class="small m-0">Tax report</p>
            </div>
            <div
              class="d-flex align-items-center item px-2 py-1 cursor-pointer"
              style="
                background: #ffffff;
                border: solid 1px #dedede;
                border-radius: 5px;
                transition: all 0.2s;
              "
              @click="setLayout('filtered report')"
            >
              <p class="small m-0">Filtered report</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';

const view = ref('tax report');

const setLayout = (data) => {
  view.value = data;
  setViewReports();
};

const emit = defineEmits(['setViewReports']);

const setViewReports = () => {
  emit('setViewReports', {
    view: view.value,
  });
};
</script>

<style scoped></style>
