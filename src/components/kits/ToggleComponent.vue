<template>
  <div class="toggle">
    <input :id="props.label" type="checkbox" :checked="props.completed" />
    <label :for="props.label"></label>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  completed: Boolean,
});
</script>

<style scoped>
.toogle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.toggle input {
  display: none;
}
.toggle label {
  position: relative;
  display: block;
  width: 50px;
  height: 25px;
  background: #ccc;
  border-radius: 25px;
  cursor: pointer;
}
.toggle label:after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 21px;
  height: 21px;
  background: #fff;
  border-radius: 50%;
  transition: 0.3s;
}
.toggle input:checked + label {
  background: #fff1f7;
}
.toggle input:checked + label:after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}
</style>
