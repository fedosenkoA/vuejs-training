<template>
  <router-link
    :to="link"
    class="guide-img rounded-5"
    :style="{
      zIndex: 0 + props.index,
      height: `50px`,
      width: `50px`,
      left: `${props.index * 35}px`,
    }"
  >
    <img
      class="rounded-5 border-white"
      :src="icon"
      alt="user"
      style="height: 50px; width: 50px"
    />
  </router-link>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: 'test_user.png',
  },
  link: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style scoped>
a {
  position: absolute;
}
.guide-img:hover {
  transition: 0.5s all ease-in-out;
  z-index: 10 !important;
}
</style>
