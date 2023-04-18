<template>
  <div
    class="label w-15 d-flex justify-content-center p-3"
    :class="[color ?? 'orange', type]"
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
    default: 'N/A',
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
    return '/src/assets/images/d_mark_red_dashed.png';
  }
  if (props.color === 'pink') {
    return '/src/assets/images/d_mark_pink_dashed.png';
  }
  if (props.color === 'purple') {
    return '/src/assets/images/d_mark_purple_dashed.png';
  }
  if (props.color === 'blue') {
    return '/src/assets/images/d_mark_blue_dashed.png';
  }
  return '/src/assets/images/d_mark_dashed.png';
});
</script>

<style scoped>
.orange {
  color: #ff6161 !important;
}
.red {
  color: #e9556f !important;
}
.blue {
  color: #55abe9 !important;
}
.pink {
  color: #e655e9 !important;
}
.purple {
  color: #9655e9 !important;
}
</style>
