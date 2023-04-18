<template>
  <div v-if="guide.id">
    <div
      class="d-flex justify-content align-items-center mb-3 pos"
      :class="guide.active ? 'active' : ''"
      style="
        width: fit-content;
        height: 123px;
        max-width: 900px;
        background: #ffffff;
        border-left: 6px solid #dedede;
        stroke-width: 5px;
        border-radius: 10px;
        box-shadow: 0 0 30px 2px rgba(0, 0, 0, 0.04);
      "
    >
      <div
        style="
          height: 123px;
          width: 84px;
          padding-left: 32px;
          padding-top: 35px;
        "
      >
        <label class="wrapper flex items-center position-relative">
          <CheckBoxComponent
            :is-checked="guide.prepareToDeletion"
            @updateInput="prepareToDeletionGuide(props.guide.id)"
          ></CheckBoxComponent>
        </label>
      </div>
      <div
        class="d-flex justify-content"
        style="width: 649px; height: 121px; border-left: 1px dashed #858585"
      >
        <a style="padding-top: 37px; padding-right: 40px; padding-left: 32px">
          <img
            class="rounded-circle"
            :src="
              guide.user.avatar
                ? 'https://devapi.barcelonalocalexperiences.com' +
                  guide.user.avatar
                : '/src/assets/images/testIcon.svg'
            "
            alt="Icon"
            style="height: 50px; width: 50px"
          />
        </a>
        <div style="padding-top: 37px; padding-right: 40px">
          <div class="col">
            <span class="title"><strong>Guide name</strong></span>
          </div>
          <div class="col">
            <span class="info text-muted small">{{
              guide.user.first_name ?? 'N/A'
            }}</span>
          </div>
        </div>
        <div style="padding-top: 37px; padding-right: 40px">
          <div class="col">
            <span class="title"><strong>Number</strong></span>
          </div>
          <div class="col">
            <span class="info text-muted small">{{
              guide.user.phone_number ?? 'N/A'
            }}</span>
          </div>
        </div>
        <div style="padding-top: 37px">
          <div class="col">
            <span class="title"><strong>Email</strong></span>
          </div>
          <div class="col">
            <span class="info text-muted small">{{
              guide.user.email ?? ''
            }}</span>
          </div>
        </div>
      </div>

      <div
        style="
          width: 88px;
          max-width: 90px;
          height: 121px;
          border-left: 1px dashed #858585;
          stroke-dashoffset: 0;
          padding-top: 10px;
          padding-left: 35px;
        "
      >
        <div class="pb-1">
          <img
            class="settable"
            src="/src/assets/images/editButton.svg"
            alt="Logo"
            style="height: 18px; width: 18px; cursor: pointer"
            @click="editGuide(props.guide.id)"
          />
        </div>
        <div v-if="authState.isAdmin" class="pb-1">
          <img
            class="settable"
            alt="Logo"
            src="/src/assets/images/keys.svg"
            style="height: 18px; width: 18px; cursor: pointer"
            @click="sendInvite(props.guide.user.email)"
          />
        </div>
        <div>
          <img
            class="settable"
            src="/src/assets/images/button.svg"
            alt="Delete"
            style="height: 20px; width: 19px; cursor: pointer"
            @click="showDeletePopup = !showDeletePopup"
          />
        </div>
      </div>
    </div>
    <Transition name="fade">
      <PopupComponent
        v-if="showDeletePopup"
        @deleteAnswer="actionDelete"
      ></PopupComponent>
    </Transition>
  </div>
</template>

<script setup>
import CheckBoxComponent from '../../../kits/CheckBoxComponent.vue';
import PopupComponent from '../../../PopupComponent.vue';
import { useGuideList } from '../../../../composebles/guide.ts';
import { ref } from 'vue';
import { useAuth } from '../../../../composebles/auth';
import { useManagersList } from '../../../../composebles/managers';

const { deleteGuide, prepareToDeletionGuide, activeGuide, changeFormState } =
  useGuideList();

const { authState } = useAuth();
const { sendInvite } = useManagersList();

const props = defineProps({
  guide: {
    type: Object,
    required: true,
  },
});

const showDeletePopup = ref(false);
const actionDelete = async (answer) => {
  if (answer) {
    await deleteGuide(props.guide.id)
      .then(() => {
        showDeletePopup.value = false;
      })
      .catch(() => {
        showDeletePopup.value = false;
      });
  } else {
    showDeletePopup.value = false;
  }
};

const editGuide = (id) => {
  activeGuide(id);
  changeFormState(true, id);
};

const emit = defineEmits(['deleteAnswer']);
</script>

<style scoped>
.active {
  border-left: 6px solid #dd6497 !important;
  border-top: 1px solid #dd6497 !important;
  border-right: 1px solid #dd6497 !important;
  border-bottom: 1px solid #dd6497 !important;
  transition: transform 0.2s;
}
</style>
