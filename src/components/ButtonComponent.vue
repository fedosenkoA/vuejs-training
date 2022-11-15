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
  font-size: 1rem;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.5s ease;
}
.accept {
  background-color: #c5deba;
}
.accept:hover {
  box-shadow: #c5deba 0px 3px 8px;
}
.delete {
  background-color: #dfbbc6;
}
.delete:hover {
  box-shadow: #dfbbc6 0px 3px 8px;
}
.details {
  background-color: #a4a7de;
}
.details:hover {
  box-shadow: #a4a7de 0px 3px 8px;
}
</style>
