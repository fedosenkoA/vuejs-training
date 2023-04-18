<template>
  <tr class="py-12 small">
    <td class="ps-16">Tapas</td>
    <td class="ps-16">
      {{ getDate() }}
    </td>
    <td v-if="bill.group.guide != null" class="ps-16">
      {{ bill.group.guide.user.first_name }}
      {{ bill.group.guide.user.last_name }}
    </td>
    <td v-else class="ps-16">N/A</td>
    <td class="ps-16">
      {{ bill.restaurant.name }}
    </td>
    <td class="ps-16">
      {{ bill.amount }}
    </td>
  </tr>
</template>
<script setup>
const props = defineProps({
  bill: {
    default: {},
  },
  date: {
    type: String,
    default: '',
  },
});
const getDate = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateVal = new Date(props.date).getMonth();
  const month = monthNames[dateVal + 1];

  return `${new Date(props.date).getDate()} ${month}`;
};
</script>

<style scoped></style>
