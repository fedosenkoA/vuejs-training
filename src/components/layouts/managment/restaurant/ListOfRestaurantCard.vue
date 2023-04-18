<template>
  <div v-if="restaurant.id">
    <div
      class="d-flex justify-content align-items-center mb-3 position-relative"
      :class="restaurant.active ? 'active' : ''"
      style="
        height: 206px;
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
          height: 206px;
          width: 84px;
          padding-left: 32px;
          padding-top: 35px;
        "
      >
        <label class="wrapper flex items-center">
          <CheckBoxComponent
            :is-checked="restaurant.prepareToDeletion"
            @updateInput="prepareToDeletionRestaurant(props.restaurant.id)"
          ></CheckBoxComponent>
        </label>
      </div>

      <div
        class="d-flex flex-column justify-content-between ps-2 pe-1 py-4"
        style="width: 700px; height: 206px; border-left: 1px dashed #858585"
      >
        <div class="d-flex no-wrap">
          <div class="card-item">
            <div class="col">
              <span class="title"><strong>Restaurant name</strong></span>
            </div>
            <div class="col">
              <span class="info text-muted small">{{ restaurant.name }}</span>
            </div>
          </div>
          <div class="card-item">
            <div class="col">
              <span class="title"><strong>Address</strong></span>
            </div>
            <div class="col">
              <span class="info text-muted small">{{
                restaurant.address
              }}</span>
            </div>
          </div>
          <div class="card-item">
            <div class="col">
              <span class="title"><strong>Manager</strong></span>
            </div>
            <div class="col">
              <span class="info text-muted small">{{
                restaurant.manager.first_name +
                ' ' +
                restaurant.manager.last_name
              }}</span>
            </div>
          </div>
        </div>
        <div class="d-flex no-wrap">
          <div class="card-item">
            <div class="col">
              <span class="title"><strong>Email</strong></span>
            </div>
            <div class="col">
              <span class="info text-muted small">{{
                restaurant.manager.email ?? 'N/A'
              }}</span>
            </div>
          </div>
          <div class="card-item" style="max-width: 250px">
            <div class="col">
              <span class="title"><strong>Number</strong></span>
            </div>
            <div class="col">
              <span class="info text-muted small">{{
                restaurant.manager.phone_number ?? 'N/A'
              }}</span>
            </div>
          </div>
          <div class="card-item">
            <div class="col">
              <span class="title"><strong>Unavailable on</strong></span>
            </div>

            <div class="col">
              <span class="info text-muted small">{{
                restaurant.unavailable_days ?? 'N/A'
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style="
          width: 88px;
          height: 206px;
          border-left: 1px dashed #858585;
          stroke-dashoffset: 0;
          padding-top: 48px;
          padding-left: 35px;
        "
      >
        <div style="padding-bottom: 16px">
          <img
            class="settable"
            src="/src/assets/images/editButton.svg"
            alt="Logo"
            style="height: 18px; width: 18px; cursor: pointer"
            @click="editRestaurant(props.restaurant.id)"
          />
        </div>
        <div class="pb-1">
          <img
            class="settable"
            src="/src/assets/images/keys.svg"
            alt="Logo"
            style="height: 18px; width: 18px; cursor: pointer"
            @click="sendInvite(props.restaurant.manager.email)"
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
import { useRestaurantList } from '../../../../composebles/restaurant.ts';
import { useManagersList } from '../../../../composebles/managers';
import { ref } from 'vue';

const {
  deleteRestaurant,
  prepareToDeletionRestaurant,
  activeRestaurant,
  changeFormState,
} = useRestaurantList();

const { sendInvite } = useManagersList();

const props = defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});

const showDeletePopup = ref(false);
const actionDelete = async (answer) => {
  if (answer) {
    await deleteRestaurant(props.restaurant.id)
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

const editRestaurant = (id) => {
  activeRestaurant(id);
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
.card-item {
  width: 33%;
  max-width: 250px;
}
</style>
