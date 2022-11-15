<template>
  <ButtonComponent
    :label="'Save'"
    :type="'accept'"
    @:click="saveLists"
  ></ButtonComponent>
  <ButtonComponent
    :label="'Delete'"
    :type="'delete'"
    @:click="deleteTodos"
  ></ButtonComponent>
</template>

<script setup>
import ButtonComponent from '../components/ButtonComponent.vue';
import { useToDoList } from '../composables/list.ts';

const { deleteTodos, saveLists } = useToDoList();
</script>
