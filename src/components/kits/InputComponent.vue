<template>
  <div class="form-group d-flex flex-column w-100 pb-3">
    <label v-if="label" :for="id" class="small" style="margin-bottom: 3px">
      <strong>{{ label }}</strong>
    </label>
    <input
      :id="id"
      :type="showPassword ? 'text' : type"
      :value="modelValue"
      :placeholder="placeholder"
      class="border w-full pb-1 form-control bg-white"
      :class="showPassword ? 'border-primary' : ''"
      style="padding: 12px"
      :style="height"
      :min="min"
      :max="max"
      lang="en-US"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div
      v-if="props.type === 'password'"
      class="d-flex justify-content-end password-container"
    >
      <div
        class="password-btn btn btn-link p-0"
        @click="showPassword = !showPassword"
      >
        <img
          src="/src/assets/images/eye.svg"
          alt="password"
          :class="showPassword ? 'opacity-50' : ''"
        />
      </div>
    </div>
    <Transition name="fade">
      <p v-show="errorMessage" class="text-danger small m-0">
        {{ errorMessage }}
      </p>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  height: {
    type: String,
    default: '50px',
  },
  min: {
    type: String,
    default: '0',
  },
  max: {
    type: String,
    default: '1000000',
  },
});
const height = computed(() => {
  return 'height: ' + props.height;
});
const showPassword = ref(false);
defineEmits(['update:modelValue']);
</script>

<style scoped>
input {
  border: 2px solid #eeeeee !important;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: none !important;
}
input:focus-visible {
  border: 2px solid #dd6497 !important;
}

input[type='password']:after {
  content: '';
  height: 10px;
  width: 10px;
  background: url('/src/assets/images/eye.svg') no-repeat center center;
  background-size: 20px;
  cursor: pointer;
  z-index: 1;
}
.password-container {
  position: relative;
}
.password-btn {
  position: absolute;
  right: 11px;
  top: -38px;
  z-index: 1;
}
</style>
