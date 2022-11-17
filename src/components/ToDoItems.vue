<template>
  <div class="list-head">
    <input
      v-model="name"
      class="todo-input"
      type="text"
      placeholder="New record..."
      @keyup.enter="addListItem(recordIndex, name)"
    />
    <p class="list-name">{{ getListName(recordIndex) }}</p>
  </div>
  <div class="list">
    <TransitionGroup name="fade" tag="div" class="todo-list">
      <div
        v-for="item in getListItems(recordIndex)"
        :key="item.id"
        class="todo-item"
      >
        <p>{{ item.name }}</p>
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
import { onMounted, ref } from 'vue';
import { router } from '../router/index.ts';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import ButtonComponent from './ButtonComponent.vue';
import ToDoSaves from './ToDoSaves.vue';
import { useToDoList } from '../composables/list.ts';

const {
  todoList,
  addListItem,
  removeListItem,
  getListItems,
  getListName,
  getLists,
} = useToDoList();

const recordIndex = parseInt(useRoute().params.id, 10);

onMounted(() => {
  if (isNaN(recordIndex)) {
    router.push('/');
  }
  getLists();
});
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
.todo-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  transition: all 0.5s ease;
}
.list-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.list-name {
  font-size: 1rem;
  color: #c6dfbb;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.5s ease;
  border: solid 1px #c6dfbb;
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
