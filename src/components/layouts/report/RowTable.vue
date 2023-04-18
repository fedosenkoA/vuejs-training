<template>
  <tr
    v-if="report"
    class="py-12 small"
    :class="[{ 'border-top': props.key !== 0 }, { 'rounded-5': props.last }]"
  >
    <td class="ps-16">{{ props.report.name }}</td>
    <td class="ps-16">{{ props.report.date }}</td>
    <td class="ps-16">{{ props.report.tour }}</td>
    <td class="ps-16">{{ props.report.fee }}</td>
    <td v-if="props.last" class="ps-16">{{ props.report.total }}</td>
  </tr>
</template>

<script setup>
const props = defineProps({
  report: {},
  last: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
