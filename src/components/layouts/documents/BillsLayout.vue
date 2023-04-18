<template>
  <BillsFilter @setViewDocuments="setViewDocuments" />
  <div class="rounded bg-body w-100 px-12 pt-5 pb-1 mt-2">
    <div v-if="billsArray">
      <Transition>
        <div class="row-body">
          <table class="table table-borderless m-0" style="width: 100%">
            <thead class="small table-light w-100">
              <tr>
                <th class="ps-16" scope="col">Tour name</th>
                <th class="ps-16" scope="col">Date</th>
                <th class="ps-16" scope="col">Tour guide</th>
                <th class="ps-16" scope="col">Restaurant name</th>
                <th class="ps-16" scope="col">Total amount</th>
                <th class="ps-16" scope="col"></th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <BillsRowTable
                v-for="(bill, index) in billsArray"
                :key="index"
                :bill="bill"
                :last="index === billsArray.length - 1"
                :date="bill.group.booking.start_datetime"
                @setViewDocuments="setViewDocuments"
              />
            </tbody>
          </table>
        </div>
      </Transition>
    </div>
    <LoaderComponent v-if="loading" />
  </div>
</template>
<script setup>
import { useDocuments } from '../../../composebles/documents';
import { onMounted, ref, computed } from 'vue';
import BillsFilter from './BillsFilter.vue';
import LoaderComponent from '../../kits/LoaderComponent.vue';
import BillsRowTable from './BillsRowtable.vue';
const { loading, getBills, bills } = useDocuments();

onMounted(() => {
  getBills();
});

const billsArray = computed(() => bills.value);
const emit = defineEmits(['setViewDocuments']);
const setViewDocuments = (data) => {
  emit('setViewDocuments', data);
};
</script>

<style scoped>
.close-all {
  font-size: 14px;
  line-height: 17px;
  color: #cb3171;
  text-decoration: underline;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  position: absolute;
  top: 148px;
  right: 52px;
}
.close-all:hover {
  color: #f03785;
}
</style>
