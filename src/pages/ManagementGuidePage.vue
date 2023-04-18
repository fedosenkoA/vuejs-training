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
          <ListOfGuidesList
            style="padding-left: 30px"
            class="col"
          ></ListOfGuidesList>
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
            <ManagementGuideDetailLayout v-else />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuLayout from '../components/layouts/MenuLayout.vue';
import HeaderLayout from '../components/layouts/HeaderLayout.vue';
import ListOfGuidesList from '../components/layouts/managment/guides/ListOfGuides.vue';
import RecommendationComponent from '../components/RecommendationComponent.vue';
import ManagementGuideDetailLayout from '../components/layouts/managment/guides/GuideDetail.vue';
import { useGuideList } from '../composebles/guide.ts';

const { showDetailForm } = useGuideList();

const emit = defineEmits(['editGuide']);
</script>
