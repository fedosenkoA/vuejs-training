<template>
  <div class="w-100 h-100 mx-3 py-3">
    <form
      class="d-flex flex-column justify-content-between bg-white rounded border w-100 h-100"
      style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.04)"
      @submit.prevent="formSubmit"
    >
      <div class="pt-3">
        <h2 class="px-3"><strong>Group swap</strong></h2>
        <SelectComponent
          id="payment_type"
          class="me-3 px-3"
          :label="'Booking'"
          :options="[]"
          :v-model="form.rate_type"
          :model-value="form.rate_type"
          @update:model-value="form.rate_type = $event"
        />
        <div class="px-3">
          <TickedCardTwoColumn ticket="Swap" />
        </div>
        <div class="d-flex flex-column align-items-center w-100">
          <img
            src="/src/assets/images/vector.svg"
            alt=""
            style="height: 35px; width: 6px"
          />
          <div
            class="d-flex align-items-center flex-nowrap justify-content-center w-100"
          >
            <div class="stroke flex-grow-1"></div>
            <div
              class="rounded d-flex align-items-center justify-content-center text-primary py-1 px-2"
              style="border: 2px dashed #cb3171; width: fit-content"
            >
              <strong class="small">People - 14</strong>
              <span
                class="rounded"
                style="
                  width: 6px;
                  height: 6px;
                  background: #cb3171;
                  margin-right: 5px;
                  margin-left: 5px;
                "
              />
              <strong class="small">Total 4/14</strong>
            </div>
            <div class="stroke flex-grow-1"></div>
          </div>
          <img
            src="/src/assets/images/vector.svg"
            alt=""
            style="height: 35px; width: 6px; transform: rotate(180deg)"
          />
        </div>
        <SelectComponent
          id="payment_type"
          class="me-3 px-3"
          :label="'Booking swap with'"
          :options="[]"
          :v-model="form.rate_type"
          :model-value="form.rate_type"
          @update:model-value="form.rate_type = $event"
        />
      </div>

      <div class="py-3 px-3">
        <div class="d-flex p-0">
          <ButtonComponent
            :label="'Swap'"
            style="min-width: 48%; height: 46px"
            class="me-3"
          ></ButtonComponent>
          <ButtonComponent
            label="Add user to swap "
            style="min-width: 48%; height: 46px"
            :type="'purple'"
            @click="addUserToSwap"
          ></ButtonComponent>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { usePageToasts } from '../../../composebles/use-toast';
import { useGroupSwap } from '../../../composebles/group-swap';
import ButtonComponent from '../../kits/ButtonComponent.vue';
import SelectComponent from '../../kits/SelectComponent.vue';
import TickedCardTwoColumn from './TickedCardTwoColumn.vue';

const form = ref({
  id: 0,
  user_id: 0,
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  rate_type: 'PER_HOUR',
  rate: 0,
  rate_tour: '',
  file: null,
  roles: {
    connect: 'GUIDE_ID',
  },
});

const { addToast } = usePageToasts();
const { globalGroups } = useGroupSwap();

const addUserToSwap = () => {
  addToast({
    title: 'User added to swap',
    description: 'User added to swap',
    status: 'success',
    duration: 3000,
    isClosable: true,
  });
};

const formSubmit = () => {
  return 0;
};
</script>
<style scoped>
.stroke {
  height: 1px;
  border-top: 1px dashed #dedede;
}
</style>
