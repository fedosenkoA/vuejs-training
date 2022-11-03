<template>
  <button :class="props.type">{{ props.label }}</button>
</template>

<script setup>
const props = defineProps({
  type: String,
  label: String,
});
</script>

<style scoped>
button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #c6dfbb;
  box-shadow: #c6dfbb 0px 3px 8px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0.5rem;
}
.accept {
  background-color: #c6dfbb;
  box-shadow: #c6dfbb 0px 3px 8px;
}
.delete {
  background-color: #dfbbc6;
  box-shadow: #dfbbc6 0px 3px 8px;
}
</style>
