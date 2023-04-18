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
          <ListOfTickets style="padding-left: 30px" class="col"></ListOfTickets>
        </div>
        <div
          class="col d-flex justify-content-center align-items-center overflow-hidden"
          style="height: calc(100vh - 60px); background: #fafafa"
        >
          <Transition name="slide-up">
            <GroupSwapDetail />
            <!--            <RecommendationComponent v-if="!showDetailForm" />-->
            <!--            <GroupSwapDetail v-else />-->
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuLayout from '../components/layouts/MenuLayout.vue';
import HeaderLayout from '../components/layouts/HeaderLayout.vue';
import RecommendationComponent from '../components/RecommendationComponent.vue';
import { useGuideList } from '../composebles/guide.ts';
import ListOfTickets from '../components/layouts/group-swap/ListOfTickets.vue';
import GroupSwapDetail from '../components/layouts/group-swap/GroupSwapDetail.vue';

const { showDetailForm } = useGuideList();

const emit = defineEmits(['editGuide']);
</script>

<style scoped></style>
