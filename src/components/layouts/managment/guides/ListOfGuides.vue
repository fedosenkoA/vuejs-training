<template>
  <div>
    <div style="background: white; width: 890px" class="bg-white h-100">
      <div class="overflow-hidden" style="height: 110px">
        <Transition name="slide-up">
          <div
            v-if="countDeletedUser === 0"
            class="d-flex justify-content-between pe-6 pt-4 pb-3"
          >
            <h3>
              <strong>List of guides</strong>
            </h3>
            <ButtonComponent
              :class="{ active: isActive }"
              label="Add new guide"
              @click="createGuide"
            ></ButtonComponent>
          </div>
          <div v-else class="d-flex justify-content-between pe-6 pt-4 pb-3">
            <h3>
              <strong>{{
                'Selected ' + countDeletedUser + ' profiles'
              }}</strong>
            </h3>
            <div class="d-flex flex-nowrap">
              <ButtonComponent
                :class="{ active: isActive }"
                class="me-2"
                :label="'Delete ' + countDeletedUser + ' profiles'"
                @click="showDeletePopup = !showDeletePopup"
              ></ButtonComponent>
              <ButtonWhiteComponent
                :class="{ active: isActive }"
                style="width: 184px; height: 46px"
                label="Cancel"
                @click="unsetDeleteGuides"
              ></ButtonWhiteComponent>
            </div>
          </div>
        </Transition>
      </div>
      <div
        v-if="globalGuideUsers.length"
        class="overflow-scroll-y scrollbar"
        style="max-height: calc(100vh - 155px)"
      >
        <TransitionGroup name="fade">
          <ListOfGuidesCard
            v-for="(guide, index) in globalGuideUsers"
            :key="index"
            :guide="guide"
          />
        </TransitionGroup>
      </div>
    </div>
    <Transition name="fade">
      <PopupComponent
        v-if="showDeletePopup"
        @delete-answer="deleteProfilesAnswer"
      ></PopupComponent>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ButtonComponent from '../../../kits/ButtonComponent.vue';
import ListOfGuidesCard from './ListOfGuidesCard.vue';
import { useGuideList } from '@/composebles/guide.ts';
import ButtonWhiteComponent from '../../../kits/ButtonWhiteComponent.vue';
import PopupComponent from '../../../PopupComponent.vue';

const {
  getGuideList,
  globalGuideUsers,
  countDeletedUser,
  unsetDeleteGuides,
  deleteGuides,
  changeFormState,
  editGuide,
} = useGuideList();

const isActive = ref(false);
const showDeletePopup = ref(false);

const deleteProfilesAnswer = (answer) => {
  if (answer) {
    deleteGuides();
  }
  showDeletePopup.value = false;
};

const createGuide = () => {
  changeFormState(true, 0);
};

onMounted(() => {
  getGuideList();
});
</script>
<style scoped>
.active {
  background-color: #952252;
  border: #952252;
}
</style>
