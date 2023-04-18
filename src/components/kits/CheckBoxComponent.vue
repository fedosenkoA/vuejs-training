<template>
  <input
    class="checkbox"
    type="checkbox"
    :checked="isChecked"
    :value="value"
    @change="updateInput"
  />
  <span class="checkmark"></span>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    required: false,
    default: '',
  },
  isChecked: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const updateInput = (event) => {
  emit('updateInput', event.target.checked);
};

const emit = defineEmits(['updateInput']);
</script>

<style lang="postcss" scoped>
/* Customize the label (the wrapper) */
.wrapper {
  display: flex;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: #ffffff;
  border: 2px solid #ccc;
  border-radius: 5px;
}

/* On mouse-over, add a grey background color */
.wrapper:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.wrapper input:checked ~ .checkmark {
  background-color: #cb3171;
  border-color: #cb3171;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.wrapper input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.wrapper .checkmark:after {
  left: 5px;
  top: 0px;
  width: 6px;
  height: 14px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
