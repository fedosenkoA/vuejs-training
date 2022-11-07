<template>
  <div class="row">
    <p class="title">{{ props.item.title }}</p>
    <div class="buttons">
      <ButtonComponent
        :label="'Edit'"
        :type="'accept'"
        @:click="editTodo"
      ></ButtonComponent>
      <ButtonComponent
        :label="'Delete'"
        :type="'delete'"
        @:click="saveToLocaleStorage"
      ></ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import CheckComponent from './CheckComponent.vue';
import ModalComponent from './ModalComponent.vue';
const props = defineProps({
  item: Object,
});

const editTodo = () => {
  const modal = new ModalComponent({
    item: props.item,
  });
};

const saveToLocaleStorage = () => {
  localStorage.setItem('todos', JSON.stringify(props.item));
};
</script>

<style scoped>
.row {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
}
.row:hover {
  background-color: #d6e5d4;
}
.title:before {
  content: '';
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #545e4f;
  margin-right: 0.5rem;
}
</style>
