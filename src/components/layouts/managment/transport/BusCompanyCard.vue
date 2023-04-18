<template>
  <div v-if="transport?.id">
    <div
      class="d-flex justify-content align-items-center mb-3"
      :class="transport.active ? 'active' : ''"
      style="
        height: 123px;
        width: 870px;
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
            :is-checked="transport.prepareToDeletion"
            @updateInput="prepareToDeletionBusCompany(props.transport.id)"
          ></CheckBoxComponent>
        </label>
      </div>

      <div
        class="d-flex justify-content pt-5 ps-2 pe-1"
        style="width: 695px; height: 121px; border-left: 1px dashed #858585"
      >
        <div class="w-25">
          <div class="col">
            <span class="title"><strong>Bus company</strong></span>
          </div>
          <div class="col">
            <span class="info text-muted">{{ transport.name ?? 'N/A' }}</span>
          </div>
        </div>
        <div class="w-25">
          <div class="col">
            <span class="title"><strong>Manager</strong></span>
          </div>
          <div class="col">
            <span class="info text-muted">{{
              transport.manager.first ??
              'N/A' + ' ' + transport.manager.last_name ??
              'N/A'
            }}</span>
          </div>
        </div>
        <div class="w-25">
          <div class="col">
            <span class="title"><strong>Email</strong></span>
          </div>
          <div class="col">
            <span class="info text-muted">{{
              transport.manager.email ?? 'N/A'
            }}</span>
          </div>
        </div>
        <div class="w-25">
          <div class="col">
            <span class="title"><strong>Number</strong></span>
          </div>
          <div class="col">
            <span class="info text-muted">{{
              transport.manager.phone_number ?? 'N/A'
            }}</span>
          </div>
        </div>
      </div>

      <div
        style="
          width: 88px;
          height: 121px;
          border-left: 1px dashed #858585;
          stroke-dashoffset: 0;
          padding-top: 12px;
          padding-left: 35px;
        "
      >
        <div style="padding-bottom: 10px">
          <img
            class="settable"
            src="/src/assets/images/editButton.svg"
            alt="Logo"
            style="height: 18px; width: 18px; cursor: pointer"
            @click="editBusCompany(props.transport.id)"
          />
        </div>
        <div class="pb-1">
          <img
            class="settable"
            src="/src/assets/images/keys.svg"
            alt="Logo"
            style="height: 18px; width: 18px; cursor: pointer"
            @click="sendInvite(props.transport.manager.email)"
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
import { useBusCompanyList } from '../../../../composebles/transport';
import { useManagersList } from '../../../../composebles/managers';
import { ref } from 'vue';
import { transformAST } from '@vue/reactivity-transform';

const {
  deleteBusCompany,
  prepareToDeletionBusCompany,
  activeBusCompany,
  changeFormState,
} = useBusCompanyList();

const { sendInvite } = useManagersList();

const props = defineProps({
  transport: {
    type: Object,
    required: true,
  },
});

const showDeletePopup = ref(false);
const actionDelete = async (answer) => {
  if (answer) {
    await deleteBusCompany(props.transport.id)
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

const editBusCompany = (id) => {
  activeBusCompany(id);
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
