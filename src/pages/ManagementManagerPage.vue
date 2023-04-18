<template>
  <HeaderLayout />
  <div class="d-flex flex-row">
    <MenuLayout class="col" />
    <div class="col h-100 bg-white" style="min-height: calc(100vh - 69px)">
      <div class="d-flex align-content-start flex-wrap">
        <div
          class="col h-100 bg-white border-end"
          style="min-height: calc(100vh - 69px)"
        >
          <ListOfManagers class="col ps-2"></ListOfManagers>
        </div>
        <div
          class="col d-flex justify-content-center align-items-center overflow-hidden"
          style="
            height: calc(100vh - 69px);
            max-width: 800px;
            background: #fafafa;
          "
        >
          <Transition name="slide-up">
            <RecommendationComponent v-if="!showDetailForm" />
            <ManagerDetail v-else />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuLayout from '../components/layouts/MenuLayout.vue';
import HeaderLayout from '../components/layouts/HeaderLayout.vue';
import ListOfManagers from '../components/layouts/managment/managers/ListOfManagers.vue';
import RecommendationComponent from '../components/RecommendationComponent.vue';
import ManagerDetail from '../components/layouts/managment/managers/ManagerDetail.vue';
import { useManagersList } from '../composebles/managers';

const { showDetailForm } = useManagersList();

const emit = defineEmits(['editGuide']);
</script>
