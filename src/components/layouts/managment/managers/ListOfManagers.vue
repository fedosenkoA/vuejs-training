<template>
  <div>
    <div style="background: white" class="bg-white h-100">
      <div class="overflow-hidden" style="height: 110px">
        <Transition name="slide-up">
          <div
            v-if="countDeletedUser === 0"
            class="d-flex justify-content-between pe-6 pt-4 pb-3"
          >
            <h3>
              <strong>List of admins</strong>
            </h3>
            <ButtonComponent
              :class="{ active: isActive }"
              label="Add new admin"
              @click="createAdmin"
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
                @click="unsetDeleteManager"
              ></ButtonWhiteComponent>
            </div>
          </div>
        </Transition>
      </div>
      <div
        v-if="globalManagers.length"
        class="overflow-scroll-y scrollbar position-relative ps-2"
        style="height: calc(100vh - 200px)"
      >
        <TransitionGroup name="fade">
          <ListOfManagersCard
            v-for="(manager, index) in globalManagers"
            :key="index"
            :guide="manager"
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
import ListOfManagersCard from './ListOfManagersCard.vue';
import { useManagersList } from '@/composebles/managers.ts';
import ButtonWhiteComponent from '../../../kits/ButtonWhiteComponent.vue';
import PopupComponent from '../../../PopupComponent.vue';

const {
  getManagersList,
  globalManagers,
  countDeletedUser,
  unsetDeleteManager,
  deleteManager,
  changeFormState,
  editGuide,
} = useManagersList();

const isActive = ref(false);
const showDeletePopup = ref(false);

const deleteProfilesAnswer = (answer) => {
  if (answer) {
    deleteManager();
  }
  showDeletePopup.value = false;
};

const createAdmin = () => {
  changeFormState(true, 0);
};

onMounted(() => {
  getManagersList();
});
</script>
<style scoped>
.active {
  background-color: #952252;
  border: #952252;
}
</style>
