<template>
  <div
    v-if="items.length > 0"
    class="border rounded d-flex flex-row"
    style="
      padding: 4px;
      background: #f9f9f9;
      transition: all 0.2s;
      width: fit-content;
    "
  >
    <div
      v-for="(item, index) in itemsList"
      :key="index"
      class="d-flex justify-content-between align-items-center item"
      :class="{ active: item.active }"
      @click="active(index)"
    >
      <p class="small m-0">
        {{ item.label }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const itemsList = ref(props.items);

const active = (index) => {
  itemsList.value.forEach((item) => {
    item.active = item?.index === index;
  });
  emit('change', index);
};

const emit = defineEmits(['change']);
</script>

<style scoped>
.item {
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.item:hover {
  background: #ffffff;
  border-radius: 5px;
  transition: all 0.2s;
}
.active {
  background: #ffffff;
  border: solid 1px #dedede;
  border-radius: 5px;
  transition: all 0.2s;
}
</style>
