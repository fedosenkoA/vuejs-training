<template>
  <div class="row">
    <p class="title">{{ props.item.title }}</p>
    <div class="buttons">
      <ButtonComponent
        :label="'Edit'"
        :type="'accept'"
        @:click="editTodo"
      ></ButtonComponent>
      <ButtonComponent
        :label="'Details'"
        :type="'details'"
        @:click="detailsTodo"
      ></ButtonComponent>
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
  item: Object,
});

const editTodo = () => {
  const modal = new ModalComponent({
    item: props.item,
  });
};

const detailsTodo = () => {
  // const router = new VueRouter();
  // router.push({
  //   name: 'Details',
  //   params: {
  //     id: props.item.id,
  //   },
  // });
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
