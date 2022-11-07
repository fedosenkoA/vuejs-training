<template>
  <input
    v-model="todo"
    class="todo-input"
    type="text"
    placeholder="Some task to do...."
    @keyup.enter="addTodo"
  />
  <div class="row">
    <TransitionGroup name="fade" tag="div" class="todo-list">
      <div v-for="item in todos" :key="item.id" class="todo-item">
        <ToDo v-model="ToDo" :item="item" />
      </div>
    </TransitionGroup>
  </div>
  <ButtonComponent
    :label="'Save'"
    :type="'accept'"
    @:click="saveToLocaleStorage"
  ></ButtonComponent>
  <ButtonComponent
    :label="'Delete'"
    :type="'delete'"
    @:click="deleteFromLocaleStorage"
  ></ButtonComponent>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import ToDo from './ToDo.vue';

const todo = ref('');
const todos = ref([]);
const id = ref(0);

const addTodo = () => {
  todos.value.push({
    title: todo.value.trim(),
    completed: false,
    items: [],
  });

  todo.value = '';
};

const saveToLocaleStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
};

const deleteFromLocaleStorage = () => {
  localStorage.removeItem('todos');
  todos.value = [];
};

const getFromLocaleStorage = () => {
  const todosFromLocaleStorage = JSON.parse(localStorage.getItem('todos'));
  if (todosFromLocaleStorage) {
    todos.value = todosFromLocaleStorage;
  }
};

onMounted(() => {
  getFromLocaleStorage();
});
</script>

<style scoped>
.row {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  transition: all 0.5s ease;
}
.row:hover {
  transform: translateX(5px);
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
