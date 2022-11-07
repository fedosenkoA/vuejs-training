<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script setup>
import Header from './pages/HeaderMain.vue';
import Footer from './pages/FooterMain.vue';
</script>

<style>
#app {
  font-family: Monserat, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
}
</style>
