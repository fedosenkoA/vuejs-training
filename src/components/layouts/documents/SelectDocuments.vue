<template>
  <div class="form-group d-flex flex-column">
    <select
      :id="id"
      required="required"
      :value="modelValue"
      class="form-select border w-full"
      @input="updateInput"
    >
      <option disabled value="">{{ defaultValue }}</option>
      <option v-for="option in options" :key="option.label">
        {{ option.label || option.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  defaultValue: {
    type: String,
    required: true,
  },
});
const updateInput = (event) => {
  emit('updateInput', event.target.value);
};
const emit = defineEmits(['updateInput']);
</script>

<style>
select {
  border: 2px solid #eeeeee !important;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: none !important;
  background-color: white;
  width: 130px;
  height: 50px;
  background-image: url('/src/assets/images/arrowDown.svg');
  background-position: calc(100% - 20px) center;
  background-repeat: no-repeat;
  font-size: x-small;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
select:focus-visible,
select:focus {
  border: 2px solid #dd6497 !important;
  outline: none !important;
}
</style>
