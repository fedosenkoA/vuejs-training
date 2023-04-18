<template>
  <div class="border rounded mb-3 ticket-card">
    <div class="ticket-row">
      <div class="border-end w-50 d-flex justify-content-between">
        <div>ID booking</div>
        <div>123SUISZZJSKA</div>
      </div>
      <div class="w-50 d-flex justify-content-between">
        <div>ID booking</div>
        <div>123SUISZZJSKA</div>
      </div>
    </div>
    <div class="ticket-row">
      <div class="border-end w-50 d-flex justify-content-between">
        <div>ID booking</div>
        <div>123SUISZZJSKA</div>
      </div>
      <div class="w-50 d-flex justify-content-between">
        <div>ID booking</div>
        <div>123SUISZZJSKA</div>
      </div>
    </div>
    <div class="ticket-row">
      <div class="border-end w-50 d-flex justify-content-between">
        <div>ID booking</div>
        <div>123SUISZZJSKA</div>
      </div>
      <div class="w-50 d-flex justify-content-between">
        <div>ID booking</div>
        <div>123SUISZZJSKA</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.ticket-row {
  display: flex;
  justify-content: space-between;
}
.ticket-row div {
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.ticket-row:nth-child(2n) {
  background-color: #f2f2f2;
}
.ticket-row:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.active {
  border: 1px solid #dd6497 !important;
}
</style>
