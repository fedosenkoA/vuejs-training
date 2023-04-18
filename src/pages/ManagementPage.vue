<template>
  <HeaderLayout />
  <div class="d-flex flex-row">
    <MenuLayout class="col" />
    <div
      class="col h-100 p-4 bg-white overflow-scroll-y scrollbar"
      style="min-height: calc(100vh - 69px); max-height: calc(100vh - 69px)"
    >
      <h2>
        <strong>Management</strong>
      </h2>
      <div class="d-flex align-content-start flex-wrap mt-5">
        <ManagementMenuLayout />
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuLayout from '../components/layouts/MenuLayout.vue';
import HeaderLayout from '../components/layouts/HeaderLayout.vue';
import ManagementMenuLayout from '../components/layouts/managment/ManagementMenuLayout.vue';
</script>
