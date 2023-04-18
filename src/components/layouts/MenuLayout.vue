<template>
  <div
    class="w-15 border-end border-bottom p-3"
    style="height: calc(100vh - 69px)"
  >
    <ul class="list-group list-group-flush">
      <MenuItemLayout
        v-for="(item, index) in menuItems"
        :key="index"
        :link="item.link"
        :icon="item.icon"
        :active="item.active"
        :name="item.name"
      ></MenuItemLayout>
    </ul>
  </div>
</template>
<script setup>
import MenuItemLayout from './managment/MenuItemLayout.vue';
import { ref, watchEffect } from 'vue';

const menuItems = ref([
  {
    name: 'Dashboard',
    icon: '/src/assets/images/dashboard.svg',
    link: '/dashboard',
    active: false,
  },
  {
    name: 'Calendar',
    icon: '/src/assets/images/calendar.svg',
    link: '/calendar',
    active: false,
  },
  {
    name: 'Management',
    icon: '/src/assets/images/management.svg',
    link: '/management',
    active: false,
  },
  {
    name: 'Reports',
    icon: '/src/assets/images/reports.svg',
    link: '/reports',
    active: false,
  },
  {
    name: 'Documents',
    icon: '/src/assets/images/documents.svg',
    link: '/documents',
    active: false,
  },
]);

const checkActive = () => {
  const currentPath = ref('/' + window.location.pathname.split('/')[1]);
  menuItems.value.forEach((item) => {
    item.active = item.link === currentPath.value;
  });
};

watchEffect(() => {
  checkActive();
});
</script>
<style scoped></style>
