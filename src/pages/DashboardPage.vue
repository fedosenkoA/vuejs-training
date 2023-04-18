<template>
  <HeaderLayout />
  <div class="d-flex flex-row">
    <MenuLayout class="col" />
    <div
      class="col h-100 ps-5 pe-5 bg-white"
      style="min-height: calc(100vh - 69px); background: #f8f8f8"
    >
      <keep-alive>
        <DashboardLayout />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import MenuLayout from '../components/layouts/MenuLayout.vue';
import HeaderLayout from '../components/layouts/HeaderLayout.vue';
import DashboardLayout from '../components/layouts/dashboard/DashboardLayout.vue';
import DashboardFilters from '../components/layouts/dashboard/DashboardFilters.vue';
</script>

<style scoped></style>
