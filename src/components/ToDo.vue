<template>
  <div class="row">
    <p class="title">{{ props.item.name }}</p>
    <div class="buttons">
      <ButtonComponent
        :label="'Edit'"
        :type="'accept'"
        @:click="editTodo"
      ></ButtonComponent>
      <a :href="'/todo/' + props.item.id" class="link">
        <ButtonComponent :label="'Details'" :type="'details'"></ButtonComponent>
      </a>
      <ButtonComponent
        :label="'x'"
        :type="'delete'"
        @:click="removeTodo(props.item.id)"
      ></ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import ModalComponent from './ModalComponent.vue';
import { useToDoList } from '../composables/list.ts';

const props = defineProps({
  item: Object,
});

const { todoList, removeTodo } = useToDoList();

console.log(todoList.value);
</script>

<style scoped>
.row {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  transition: all 0.5s ease;
}
.row:hover {
  transform: translateX(5px);
}
.title:before {
  content: '';
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #545e4f;
  margin-right: 0.5rem;
  transition: all 0.5s ease;
}

.row:hover .title:before {
  background-color: #c6dfbb;
}
</style>
