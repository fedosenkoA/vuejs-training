<template>
  <input
    v-model="todo"
    class="todo-input"
    type="text"
    placeholder="Some task to do...."
    @keyup.enter="addTodo"
  />
  <div class="todo-container">
    <div v-for="item in todos" :key="item.id" class="todo-item">
      <input v-model="item.completed" type="checkbox" />
      {{ item.title }}
    </div>
  </div>
  <p>Count: {{ numberOfCompletedTodos }}</p>
  <div>
    <ButtonComponent :label="'Save'" :type="'accept'" @click="saveTodos" />
    <ButtonComponent
      :label="'Delete Checked'"
      :type="'delete'"
      @click="deleteCheckedTodos"
    />
    <ButtonComponent
      :label="'Delete All'"
      :type="'delete'"
      @click="deleteTodos"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import ButtonComponent from './components/ButtonComponent.vue';

export default {
  components: { ButtonComponent },
  setup() {
    const todo = ref('');
    const todos = ref([]);
    let id = 0;

    if (localStorage.getItem('todos')) {
      todos.value = JSON.parse(localStorage.getItem('todos'));
      id = todos.value.length;
    }

    const numberOfCompletedTodos = computed(
      () => todos.value.filter((todo) => todo.completed).length
    );

    const addTodo = () => {
      todos.value.push({
        id: id,
        title: todo.value.trim(),
        completed: false,
      });

      todo.value = '';
      id++;
    };

    const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos.value));
    };

    const deleteCheckedTodos = () => {
      todos.value = todos.value.filter((todo) => !todo.completed);
    };

    const deleteTodos = () => {
      localStorage.removeItem('todos');
      todos.value = [];
    };

    const recount = computed(
      todos,
      (newValue) => {
        console.log(`New value: ${newValue.length}`);
      },
      { deep: true }
    );

    return {
      todo,
      todos,
      addTodo,
      saveTodos,
      deleteCheckedTodos,
      deleteTodos,
      numberOfCompletedTodos,
    };
  },
};
</script>
<style>
#app {
  font-family: Monserat, sans-serif;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #bbcedf;
  margin-top: 60px;
  border: 1px solid #c6dfbb;
  padding: 1%;
}

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
