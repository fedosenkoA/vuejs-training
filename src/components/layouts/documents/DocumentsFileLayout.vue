<template>
  <div class="container">
    <div
      class="text-start text-black-50 w-100 fw-bold fs-5"
      style="margin-left: 4%; padding-top: 1%"
    >
      Upload doc
    </div>
    <div v-if="documents !== undefined" class="row d-flex align-items-center">
      <div
        v-for="document in documents"
        :key="document.id"
        class="col-3 border rounded"
        style="width: 40%; margin-left: 5%; margin-top: 2%; min-height: 150px"
      >
        <div class="row" style="padding-top: 1%; padding-left: 4%">
          {{ group_id }}
        </div>
        <div
          class="row border-bottom d-flex align-items-center"
          style="min-height: 100px"
        >
          <div class="col d-flex justify-content-center">
            <a :href="document?.documents.path" download>
              <img
                src="../../../assets/images/documents.svg"
                style="width: 46px; height: 55px"
              />
            </a>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col">Document_{{ document.id }}</div>
          <div class="col d-flex justify-content-end">
            <img
              src="../../../assets/images/delete_document.svg"
              style="width: 15px; height: 17px"
              @click="deleteDocument(document.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  documents: [],
  group_id: Number || String,
  date: String,
  museum: String,
});
const emit = defineEmits(['deleteDocument']);

const deleteDocument = (id) => {
  emit('deleteDocument', id);
};
</script>
