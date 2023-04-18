<template>
  <button class="small" :class="type" :type="btnType">
    <strong>{{ label }}</strong>
  </button>
</template>
<script setup>
defineProps({
  type: String,
  label: String,
  btnType: {
    type: String,
    default: 'button',
  },
});
</script>
<style scoped>
button {
  background: white;
  border-radius: 10px;
  border: 2px solid #cb3171;
  color: #cb3171;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  transition: all 0.2s ease;
}
button:hover {
  color: #f03785;
  border: 2px solid #f03785;
}
button:active {
  color: #952252;
  border: 2px solid #952252;
}
.purple {
  color: #b129d9;
  border: 2px solid #b129d9;
}
.purple:hover {
  color: #ca15ff;
  border: 2px solid #ca15ff;
}
.purple:active {
  color: #9120b2;
  border: 2px solid #9120b2;
}
.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.disabled:hover {
  color: #cb3171;
  border: 2px solid #cb3171;
}
.purple + .disabled:hover {
  color: #b129d9;
  border: 2px solid #b129d9;
}
</style>
