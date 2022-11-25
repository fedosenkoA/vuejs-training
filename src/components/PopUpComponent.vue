<template>
  <div v-if="props.showPopUp.value" class="popup">
    <div class="popup-inner">
      <div class="popup-header">
        <input
          v-model="name"
          class="todo-input"
          type="text"
          placeholder="New value..."
          @keyup.enter="$emit('renameItem', name)"
        />
        <ButtonComponent
          :label="'x'"
          :type="'delete'"
          @:click="closePopup"
        ></ButtonComponent>
      </div>
      <div class="popup-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';

const props = defineProps({
  showPopUp: Boolean,
});

const closePopup = () => {
  props.showPopUp.value = false;
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.popup-inner {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 25%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.popup-header {
  display: flex;
  justify-content: space-between;
  transition: all 0.5s ease;
}
.popup-content {
  display: flex;
  justify-content: space-between;
  align-content: center;
  transition: all 0.5s ease;
  font-size: 1rem;
  font-weight: 500;
}
input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  color: #545e4f;
  background-color: #c6dfbb;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.5s ease;
}
</style>
