<template>
  <div
    class="label w-15 d-flex text-white justify-content-center p-3"
    :class="[color, type]"
    style="width: 266px; height: 70px; position: relative; border-radius: 4px"
    :style="{ 'background-image': 'url(' + background() + ')' }"
  >
    <div class="lable rounded-4 align-items-center small" style="width: 222px">
      <strong>{{ value }}</strong>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  value: {
    type: String,
    required: false,
    default: '9:00 AM - Montserrat',
  },
  color: {
    type: String,
    required: false,
    default: 'red',
  },
  type: {
    type: String,
    required: false,
    default: '',
  },
});

const background = ref(() => {
  if (props.color === 'red') {
    return '/src/assets/images/d_mark_red.svg';
  }
  if (props.color === 'pink') {
    return '/src/assets/images/d_mark_pink.svg';
  }
  if (props.color === 'purple') {
    return '/src/assets/images/d_mark_purple.svg';
  }
  if (props.color === 'blue') {
    return '/src/assets/images/d_mark_blue.svg';
  }
  if (props.color === 'orange') {
    return '/src/assets/images/d_mark_orange.svg';
  }

  return '/src/assets/images/d_mark.svg';
});
</script>

<style scoped></style>
