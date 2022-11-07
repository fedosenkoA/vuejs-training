<template>
  <ToDoList></ToDoList>
</template>

<script>
import { computed, ref } from 'vue';
import ToDoList from './components/ToDoList.vue';
export default {
  components: { ToDoList },
};
</script>
