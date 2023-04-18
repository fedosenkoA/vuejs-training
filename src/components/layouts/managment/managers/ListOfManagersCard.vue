<template>
  <div v-if="guide.id">
    <div
      class="d-flex justify-content align-items-center mb-3"
      :class="guide.active ? 'active' : ''"
      style="
        height: 123px;
        /*width: 827px*/
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
        <label class="wrapper flex items-center">
          <CheckBoxComponent
            :is-checked="guide.prepareToDeletion"
            @updateInput="prepareToDeletionManager(props.guide.id)"
          ></CheckBoxComponent>
        </label>
      </div>

      <div
        class="d-flex justify-content ps-2"
        style="width: 649px; height: 121px; border-left: 1px dashed #858585"
      >
        <div style="padding-top: 37px; padding-right: 40px">
          <div class="col">
            <span class="title"><strong>Admin name</strong></span>
          </div>
          <div class="col">
            <span class="info text-muted">{{
              guide.first_name + ' ' + guide.last_name
            }}</span>
          </div>
        </div>
        <div style="padding-top: 37px; padding-right: 40px">
          <div class="col">
            <span class="title"><strong>Number</strong></span>
          </div>
          <div class="col">
            <span class="info text-muted">{{
              guide.phone_number ?? 'N/A'
            }}</span>
          </div>
        </div>
        <div style="padding-top: 37px">
          <div class="col">
            <span class="title"><strong>Email</strong></span>
          </div>
          <div class="col">
            <span class="info text-muted">{{ guide.email ?? 'N/A' }}</span>
          </div>
        </div>
      </div>

      <div
        style="
          width: 88px;
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
        <div v-if="!guide.email_verified_at" class="pb-1">
          <img
            class="settable"
            src="/src/assets/images/keys.svg"
            alt="Logo"
            style="height: 18px; width: 18px; cursor: pointer"
            @click="sendInvite(props.guide.email)"
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
import { useManagersList } from '../../../../composebles/managers';
import { ref } from 'vue';

const {
  deleteManager,
  prepareToDeletionManager,
  sendInvite,
  activeManager,
  changeFormState,
} = useManagersList();

const props = defineProps({
  guide: {
    type: Object,
    required: true,
  },
});

const showDeletePopup = ref(false);
const actionDelete = async (answer) => {
  if (answer) {
    await deleteManager(props.guide.id)
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
  activeManager(id);
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
