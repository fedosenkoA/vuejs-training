<template>
  <button :class="type" class="small" style="width: 184px; height: 46px">
    <strong>{{ label }}</strong>
  </button>
</template>

<script setup>
defineProps({
  type: String,
  label: String,
});
</script>

<style scoped>
button {
  background: #cb3171;
  border-radius: 10px;
  border: 2px solid #cb3171;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  transition: all 0.2s ease;
}
button:hover {
  background: #f03785;
  border: 2px solid #f03785;
}
button:active {
  background: #952252;
  border: 2px solid #952252;
}
.purple {
  background: #b129d9;
  border: 2px solid #b129d9;
}
.purple:hover {
  background: #ca15ff;
  border: 2px solid #ca15ff;
}
.purple:active {
  background: #9120b2;
  border: 2px solid #9120b2;
}
.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.disabled:hover {
  background: #cb3171;
  border: 2px solid #cb3171;
}
.purple + .disabled:hover {
  background: #b129d9;
  border: 2px solid #b129d9;
}
</style>
