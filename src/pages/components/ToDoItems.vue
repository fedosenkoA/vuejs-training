<template>
  <input
    v-model="todo"
    class="todo-input"
    type="text"
    placeholder="Some task to do...."
    @keyup.enter="addItem"
  />
  <div class="todo-container">
    <div v-for="item in todo.items" :key="item.id" class="todo-item">
      <input v-model="item.completed" type="checkbox" />
      {{ item.title }}
    </div>
  </div>
  <p>Count: {{ numberOfCompletedTodos }}</p>
  <div>
    <ButtonComponent :label="'Save'" :type="'accept'" @click="saveTodo" />a
    <ButtonComponent
      :label="'Delete All'"
      :type="'delete'"
      @click="deleteTodo"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
const props = defineProps({
  list: Object,
});

const numberOfCompletedTodos = computed(() => {
  return props.todo.items.filter((item) => item.completed).length;
});

const addItem = () => {
  props.list.items.push({
    title: todo.value.trim(),
  });
  props.list.title = '';
};
</script>

<style scoped>
.todo-input {
  width: 90%;
  padding: 1%;
  border: 1px solid #c6dfbb;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 1%;
  box-shadow: #c6dfbb 0px 3px 8px;
}
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: #c6dfbb 0px 2px 4px 0px inset;
}
.todo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  width: 50%;
  margin: 1%;
  padding: 1%;
  border-radius: 5px;
  background-color: #dfbbc6;
  box-shadow: #c6dfbb 0px 3px 8px;
}
</style>
