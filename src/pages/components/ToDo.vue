<template>
  <div class="row">
    <p class="title">{{ props.item.todo.name }}</p>
    <div class="buttons">
      <ButtonComponent
        :label="'Edit'"
        :type="'accept'"
        @:click="editTodo"
      ></ButtonComponent>
      <a href="'link'" class="link">
        <ButtonComponent
          :label="'Details'"
          :type="'details'"
          href="/details"
          @:click="detailsTodo"
        ></ButtonComponent>
      </a>
      <ButtonComponent
        :label="'x'"
        :type="'delete'"
        @:click="deleteTodo"
      ></ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import ModalComponent from './ModalComponent.vue';
const props = defineProps({
  id: Object,
  item: Object,
});

// const link = ref('/todo/' + props.id);
console.log(props.id);

const editTodo = () => {
  console.log(props.item);
};

const detailsTodo = () => {
  // const router = new RouterLink({
  //   to: '/todo',
  //   item: props.item,
  // });
  console.log(props.item);
};

const deleteTodo = () => {
  const item = JSON.parse(localStorage.getItem('todos'));
  const index = item.findIndex((x) => x.id === props.item.id);
  item.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(item));
};
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
