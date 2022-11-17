<template>
  <input
    v-model="name"
    class="todo-input"
    type="text"
    placeholder="Some list to do...."
    @keyup.enter="addTodo(name)"
  />
  <div class="list">
    <TransitionGroup name="fade" tag="div" class="todo-list">
      <div v-for="item in todoList" :key="item.id" class="todo-item">
        <ToDo v-model="ToDo" :item="item" />
      </div>
    </TransitionGroup>
  </div>
  <ToDoSaves></ToDoSaves>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import ToDo from './ToDo.vue';
import ToDoSaves from './ToDoSaves.vue';
import { useToDoList } from '../composables/list.ts';

const { todoList, addTodo, getLists } = useToDoList();

onMounted(() => {
  getLists();
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
