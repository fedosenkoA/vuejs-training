<template>
  <ButtonComponent
    :label="'Save'"
    :type="'accept'"
    @:click="saveLists"
  ></ButtonComponent>
  <ButtonComponent
    :label="'Delete All'"
    :type="'delete'"
    @:click="deleteTodos"
  ></ButtonComponent>
  <ButtonComponent
    :label="'Delete Last'"
    :type="'delete'"
    @:click="deleteLastTodo"
  ></ButtonComponent>
</template>

<script setup>
import ButtonComponent from '../components/ButtonComponent.vue';
import { useToDoList } from '../composables/list.ts';

const { deleteTodos, deleteLastTodo, saveLists } = useToDoList();
</script>
