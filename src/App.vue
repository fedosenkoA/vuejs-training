<template>
  <Toasts v-if="showToasts" />
  <router-view></router-view>
</template>

<script setup>
import Toasts from './components/ToastsNotice.vue';
import { usePageToasts } from './composebles/use-toast';
import { computed } from 'vue';

const { state } = usePageToasts();
const showToasts = computed(() => state.toasts);
</script>
