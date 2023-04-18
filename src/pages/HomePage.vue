<template>
  <div class="row"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { router } from '../router/index.ts';

onMounted(() => {
  router.push('/login');
});
</script>
