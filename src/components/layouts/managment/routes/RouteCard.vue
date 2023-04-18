<template>
  <div v-if="route && route.show">
    <div
      class="rounded mb-3"
      :class="{
        active: route.active,
        'card-open': route.open,
        'card-close': !route.open,
      }"
      style="
        height: fit-content;
        background: #ffffff;
        border-left: 6px solid #dedede;
        stroke-width: 5px;
        box-shadow: 0 0 30px 2px rgba(0, 0, 0, 0.04);
      "
    >
      <div class="position-relative border-primary">
        <div
          v-if="
            route?.availableDays.length === 1 &&
            route?.availableDays[0].date !== ''
          "
          class="position-absolute bg-primary"
          style="top: 0; left: -6px; border-radius: 10px 0"
        >
          <strong class="text-white small px-1">Exception</strong>
        </div>
      </div>
      <div class="d-flex justify-content align-items-center">
        <div class="ps-4 pt-4" style="width: 84px; min-height: 120px">
          <label class="wrapper flex items-center">
            <CheckBoxComponent
              :is-checked="route.prepareToDeletion"
              @updateInput="prepareToDeletionRoute(props.route.id)"
            ></CheckBoxComponent>
          </label>
        </div>
        <div
          class="d-flex flex-column justify-content-between ps-2 pe-1 py-4"
          style="width: 700px; border-left: 1px dashed #858585"
        >
          <div class="d-flex no-wrap">
            <div class="card-item">
              <div class="col">
                <span class="title"><strong>Day</strong></span>
              </div>
              <div class="col">
                <span class="info text-muted small">{{ getDateOrDays }}</span>
              </div>
            </div>
            <div class="card-item">
              <div class="col">
                <span class="title"><strong>Route name</strong></span>
              </div>
              <div class="col">
                <span class="info text-muted small">{{ route.name }}</span>
              </div>
            </div>
            <div class="card-item">
              <div class="col">
                <span class="title"><strong>Time</strong></span>
              </div>
              <div class="col">
                <span class="info text-muted small"> {{ getFirstTime() }}</span>
              </div>
            </div>
            <div class="card-item">
              <div class="col">
                <span
                  class="title"
                  style="cursor: pointer"
                  @click="openRoute(route.id)"
                >
                  <strong class="pe-1">Restaurants</strong>
                  <img
                    class="settable"
                    :class="route.open ? 'arrow-open' : 'arrow-close'"
                    src="/src/assets/images/arrow_up.svg"
                    alt=""
                  />
                </span>
              </div>
              <div class="col">
                <span class="info text-muted small">View all</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-flex flex-column justify-content-center align-items-center"
          style="
            width: 88px;
            min-height: 120px;
            border-left: 1px dashed #858585;
            stroke-dashoffset: 0;
          "
        >
          <div class="pb-2">
            <img
              class="settable"
              src="/src/assets/images/editButton.svg"
              alt="Logo"
              style="height: 18px; width: 18px; cursor: pointer"
              @click="editRoute(props.route.id)"
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
      <div v-if="route.points" class="card-content d-flex flex-column w-100">
        <div class="w-100 mb-2" style="border-top: 1px dashed #858585"></div>
        <div
          v-for="(point, id) in route.points"
          :key="id"
          class="bg-info rounded ms-2 me-3 mb-2 py-1 px-2 d-flex justify-content-between align-items-center"
        >
          <div
            class="text-primary d-flex justify-content-between align-items-center"
          >
            <div
              class="rounded me-1"
              style="
                height: 100%;
                min-height: 30px;
                width: 1px;
                border: 2px solid #cb3171;
              "
            ></div>
            <strong>{{ point.time }}</strong>
          </div>
          <div
            class="flex-grow-1 mx-1"
            style="height: 1px; border-top: 1px solid #cb3171"
          ></div>
          <div class="text-primary">
            <strong>{{ point.pointable.name }}</strong>
          </div>
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
import { useRoutesList } from '../../../../composebles/restaurant-routes';
import { computed, ref } from 'vue';
import { getWeekDayByNumber } from '../../../../helpers/date';

const {
  deleteRoute,
  prepareToDeletionRoute,
  activeRoute,
  changeFormState,
  openRoute,
} = useRoutesList();

const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
});

const showDeletePopup = ref(false);
const actionDelete = async (answer) => {
  if (answer) {
    await deleteRoute(props.route.id)
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

const editRoute = (id) => {
  activeRoute(id);
  changeFormState(true, id);
};

const getFirstTime = () => {
  const length = props?.route?.points.length;
  const time =
    props?.route?.points[0]?.time +
    ' - ' +
    props?.route?.points[length - 1]?.time;
  if (!time) return 'Not set';
  return time;
};

const getDateOrDays = computed(() => {
  if (
    props?.route?.availableDays?.length === 1 &&
    props?.route?.availableDays[0]?.date !== ''
  ) {
    return props?.route?.availableDays[0]?.date || 'Not set';
  } else {
    const days = props?.route?.availableDays
      .map((day) => getWeekDayByNumber(day?.weekday))
      .join(', ');
    return days || 'Not set';
  }
});

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
.card-close {
  transition: all 0.2s;
  max-height: 120px;
  overflow: hidden;
}
.card-close * + .card-open * {
  transition: all 0.2s;
}
.card-open {
  transition: all 0.2s;
  max-height: unset;
}
.arrow-close {
  transition: transform 0.2s;
}
.arrow-open {
  transition: transform 0.2s;
  transform: rotate(180deg);
}
.card-item {
  width: 33%;
  max-width: 250px;
}
</style>
