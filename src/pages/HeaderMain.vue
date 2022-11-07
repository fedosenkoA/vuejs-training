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
  { id: 2, name: 'About', path: '/about' },
  { id: 3, name: 'Contact', path: '/contact' },
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
}
a {
  color: #50753f;
  text-decoration: none;
}
</style>
