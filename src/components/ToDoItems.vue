<template>
  <input
    v-model="name"
    class="todo-input"
    type="text"
    placeholder="New record"
    @keyup.enter="addListItem(recordIndex, name)"
  />
  <div class="list">
    <TransitionGroup name="fade" tag="div" class="todo-list">
      <div
        v-for="item in todoList[recordIndex]"
        :key="item.id"
        class="todo-item"
      >
        <p>Name</p>
        <ButtonComponent
          :label="'Delete'"
          :type="'delete'"
          @:click="removeListItem(recordIndex, item.id)"
        ></ButtonComponent>
      </div>
    </TransitionGroup>
  </div>
  <ToDoSaves></ToDoSaves>
</template>

<script setup>
import { ref } from 'vue';
import { router } from '../router/index.ts';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import ButtonComponent from './ButtonComponent.vue';
import ToDoSaves from './ToDoSaves.vue';
import { useToDoList } from '../composables/list.ts';

const { todoList, addListItem, removeListItem } = useToDoList();

const recordIndex = useRoute().params.id;

onBeforeRouteLeave(() => {
  if (!todoList[recordIndex]) {
    router.push({ name: 'Home' });
  }
});
</script>

<style scoped>
.list {
  padding: 0.5rem 1rem;
  margin: 1rem 0.5rem;
  transition: all 0.5s ease;
}
input {
  padding: 0.5rem 1rem;
  border: unset;
  border-bottom: 1px solid #c6dfbb;
  margin: 0.5rem;
}
input:focus {
  outline: none;
}
input::placeholder {
  color: #c6dfbb;
}
input:focus::placeholder {
  color: #50753f;
}
</style>
