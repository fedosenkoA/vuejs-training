<template>
  <div class="header">
    <div class="menu">
      <div v-for="item in items" :key="item.id" class="menu__item">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const items = [
  { id: 1, name: 'Home', path: '/' },
  { id: 2, name: 'About Me', path: '/about' },
];
</script>

<style scoped>
.header {
}
.menu {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border-bottom: 2px groove #c6dfbb;
  margin: 0.5rem;
}
.menu__item {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  transition: all 0.5s ease;
}
.menu__item:hover {
  background-color: #c6dfbb;
  box-shadow: #c6dfbb 0px 3px 8px;
}
a {
  color: #50753f;
  text-decoration: none;
  transition: all 0.5s ease;
}
.menu__item:hover a {
  color: #ffffff;
}
</style>
