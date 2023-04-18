<template>
  <DocumentsFilter @setViewDocuments="setViewDocuments" />
  <div class="rounded bg-body w-100 px-12 pt-5 pb-1 mt-2">
    <div
      v-if="globalDocumentList"
      class="overflow-scroll-y scrollbar"
      style="max-height: calc(100vh - 220px)"
    >
      <TransitionGroup name="fade">
        <DocumentsRow
          v-for="tour in globalDocumentList"
          :key="tour?.id"
          :tour="tour"
          style="box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.04)"
          @setViewDocuments="setViewDocuments"
        />
      </TransitionGroup>
    </div>
    <LoaderComponent v-if="loading" />
    <p
      class="close-all"
      @click="
        () => {
          isRowsOpen = openAll(isRowsOpen);
        }
      "
    >
      {{ isRowsOpen ? 'Expand all cards' : 'Collapse all cards' }}
    </p>
  </div>
</template>

<script setup>
import DocumentsRow from './DocumentsRow.vue';
import { useDocuments } from '../../../composebles/documents';
import { onMounted, ref } from 'vue';
import DocumentsFilter from './DocumentsFilter.vue';
import LoaderComponent from '../../kits/LoaderComponent.vue';

const { getTourList, globalDocumentList, openAll, loading } = useDocuments();

const isRowsOpen = ref(true);

onMounted(() => {
  getTourList();
});
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
