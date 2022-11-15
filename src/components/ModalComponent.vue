<template>
  <div v-show="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ props.item.title }}</h2>
        <button class="close" @click="closeModal">x</button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  show: Boolean,
});

const closeModal = () => {
  this.show = false;
  this.$emit('close');
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 50%;
  height: 50%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}

.modal-header h2 {
  margin: 0;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #ccc;
}

.close {
  cursor: pointer;
}
</style>
