<template>
  <router-link
    class="p-1 mb-1 rounded menu-row bg-body menu-link small"
    :class="{ activated: active }"
    :to="link"
  >
    <li class="list-menu-item">
      <img :src="icon" alt="Image" />
      <strong class="menu-link">{{ name }}</strong>
    </li>
  </router-link>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  icon: {
    type: String,
    required: false,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.list-menu-item {
  list-style-type: none;
}

.menu-link {
  color: #858585;
  font-size: 14px;
  margin-left: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.menu-row:hover {
  background-color: #fff1f7 !important;
  border-radius: 10px;
}

.menu-row:hover li {
  color: #cb3171;
}

.activated {
  background-color: #fff1f7 !important;
  border-radius: 10px;
}

.activated strong {
  color: #cb3171;
}
</style>
