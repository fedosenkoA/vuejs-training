<template>
  <div class="form-group d-flex flex-column w-100 pb-3">
    <label v-if="label" :for="id" class="small" style="margin-bottom: 3px">
      <strong>{{ label }}</strong>
    </label>
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full p-1"
      :style="height"
      @input="updateInput"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label ?? option.value }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: 'Select your option',
  },
  height: {
    type: String,
    default: '50px',
  },
});
const height = computed(() => {
  return 'height: ' + props.height;
});
const emit = defineEmits(['update:modelValue']);
const updateInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style scoped>
select {
  border: 2px solid #eeeeee !important;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: none !important;
  background-color: white;
  height: 46px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-image: url('/src/assets/images/arrowDown.svg');
  background-position: calc(100% - 20px) center;
  background-repeat: no-repeat;
}
select:focus-visible,
select:focus {
  border: 2px solid #dd6497 !important;
  outline: none !important;
}
</style>
