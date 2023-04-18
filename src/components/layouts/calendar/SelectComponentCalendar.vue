<template>
  <div v-if="id === 'view'" class="form-group d-flex flex-column">
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full"
      @input="updateInput"
    >
      <option v-for="option in options" :key="option.label">
        {{ option.label }}
      </option>
    </select>
  </div>

  <div v-if="id === 'type'" class="form-group d-flex flex-column">
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full"
      @input="updateInput"
    >
      <option disabled value="">Tour type</option>
      <option v-for="option in options" :key="option.label">
        {{ option.label }}
      </option>
    </select>
  </div>

  <div v-if="id === 'name'" class="form-group d-flex flex-column">
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full"
      @input="updateInput"
    >
      <option disabled value="">Tour name</option>
      <option v-for="option in options" :key="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>

  <div v-if="id === 'bus'" class="form-group d-flex flex-column">
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full"
      @input="updateInput"
    >
      <option disabled value="">Bus company</option>
      <option v-for="option in options" :key="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>

  <div v-if="id === 'guide'" class="form-group d-flex flex-column">
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full"
      @input="updateInput"
    >
      <option disabled value="">Tour guide</option>
      <option v-for="option in options" :key="option.id">
        {{ option.first_name }} {{ option.last_name }}
      </option>
    </select>
  </div>

  <div v-if="id === 'chosen'" class="form-group d-flex flex-column">
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full p-1"
      style="width: 400px; height: 40px"
      @input="updateInput"
    >
      <option disabled value="">Role</option>
      <option v-for="option in options" :key="option.label">
        {{ option.label }}
      </option>
    </select>
  </div>

  <div v-if="id === 'chosenGuide'" class="form-group d-flex flex-column">
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full p-1"
      style="width: 400px; height: 40px"
      @input="updateInput"
    >
      <option disabled value="">Tour guide</option>
      <option v-for="option in options" :key="option.id">
        {{ option.first_name }} {{ option.last_name }}
      </option>
    </select>
  </div>

  <div v-if="id === 'chosenBus'" class="form-group d-flex flex-column">
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full p-1"
      style="width: 400px; height: 40px"
      @input="updateInput"
    >
      <option disabled value="">Bus company</option>
      <option v-for="option in options" :key="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>

  <div v-if="id === 'group'" class="form-group d-flex flex-column">
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full p-1"
      style="width: 400px; height: 40px"
      @input="updateInput"
    >
      <option disabled value="">Groups</option>
      <option v-for="option in options" :key="option.id">
        {{ option.label }}
      </option>
    </select>
  </div>

  <div v-if="id === 'chosenName'" class="form-group d-flex flex-column">
    <select
      :id="id"
      :value="modelValue"
      class="form-select border w-full p-1"
      style="width: 400px; height: 40px"
      @input="updateInput"
    >
      <option disabled value="">Tour name</option>
      <option v-for="option in options" :key="option.id">
        {{ option.name }}
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
  height: 40px;
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
