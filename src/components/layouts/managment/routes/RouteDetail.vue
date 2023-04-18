<template>
  <div v-if="showDetailForm">
    <form
      class="d-flex flex-column justify-content-between bg-white rounded border w-100 mx-6 h-100"
      style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.04); max-width: 560px"
      @submit.prevent="formSubmit"
    >
      <div style="height: 102px; border-bottom: 1px solid #dedede">
        <div class="d-flex justify-content-between p-4">
          <h2>
            {{ currentRoute ? 'View route' : 'Create new route' }}
          </h2>
          <div class="d-flex align-items-center justify-content-center">
            <!--            <img-->
            <!--              src="/src/assets/images/trash.svg"-->
            <!--              style="width: 25px; height: 27px; cursor: pointer"-->
            <!--              :style="currentRoute ? 'opacity: 1;' : 'opacity: 0.5;'"-->
            <!--              alt="DeleteButtonLightRed"-->
            <!--              @click="deleteAction"-->
            <!--            />-->
          </div>
        </div>
      </div>
      <div
        class="d-flex flex-column py-2 px-4"
        style="border-bottom: 1px dashed #dedede"
      >
        <div class="mb-1">
          <strong class="small">Available date</strong>
          <img
            src="/src/assets/images/shape.svg"
            alt=""
            style="width: 15px; height: 15px; margin-left: 5px; cursor: pointer"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-html="true"
            title="Tooltip on bottom"
          />
        </div>
        <TagsComponent
          :tags="form.availableDays"
          :available-date="form.availableDays.weekday"
          :exception-date="form.availableDays[0]?.date"
          @choose="form.availableDays.weekDay = $event"
          @exception="form.availableDays.date = $event"
        />
      </div>
      <div>
        <div class="row px-4 pt-2">
          <InputComponent
            id="name"
            v-model="form.name"
            :label="'Route name'"
            type="text"
            name="name"
            required
            autofocus
            :placeholder="'Enter route name'"
          />
        </div>
        <div
          v-if="form.points && form.points.length"
          class="row px-4 mb-1 overflow-scroll-y scrollbar"
          style="max-height: 280px"
        >
          <div class="timeline-container">
            <TransitionGroup name="fade">
              <div v-for="(point, point_id) in form.points" :key="point_id">
                <div class="timeline-block timeline-block-right">
                  <div class="marker"></div>
                  <div class="timeline-content">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <InputComponent
                        :id="'time' + point_id"
                        v-model="form.points[point_id].time"
                        class="me-3"
                        :label="'Time'"
                        type="time"
                        name="name"
                        style="max-width: 200px"
                        required
                        autofocus
                        :placeholder="'Enter route name'"
                      />
                      <SelectComponent
                        v-if="restaurants.length"
                        :id="'restaurant_' + point_id"
                        :label="'Restaurant'"
                        :options="restaurants"
                        @update:model-value="
                          form.points[point_id].restaurant_id = $event
                        "
                      />
                      <div v-if="point_id > 1">
                        <img
                          src="/src/assets/images/trash.svg"
                          class="ms-1 settable"
                          alt=""
                          style="width: 20px; height: 20px; cursor: pointer"
                          @click="removePoint(point_id)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
        <div
          class="d-flex justify-content-between align-items-center py-1 px-4"
          style="
            border-bottom: 1px dashed #cb3171;
            border-top: 1px dashed #cb3171;
          "
        >
          <div
            class="text-primary small mx-auto add-point"
            style="cursor: pointer"
            @click="addPoint"
          >
            Add new point
            <img
              class="ms-1 settable"
              src="/src/assets/images/route.svg"
              alt=""
            />
          </div>
        </div>
        <div class="row p-4">
          <div class="d-flex">
            <ButtonComponent
              :label="currentRoute ? 'Save' : 'Create'"
              style="width: 235px; height: 46px"
              class="me-3"
            ></ButtonComponent>
            <ButtonWhiteComponent
              label="Cancel"
              style="width: 235px; height: 46px"
              @click="changeFormState(false, 0)"
            ></ButtonWhiteComponent>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import ButtonComponent from '../../../kits/ButtonComponent.vue';
import ButtonWhiteComponent from '../../../kits/ButtonWhiteComponent.vue';
import InputComponent from '../../../kits/InputComponent.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { usePageToasts } from '../../../../composebles/use-toast';
import { useRoutesList } from '../../../../composebles/restaurant-routes';
import TagsComponent from './TagsComponent.vue';
import SelectComponent from '../../../kits/SelectComponent.vue';

const {
  getRoute,
  globalRestaurants,
  getRestaurantList,
  createRoute,
  updateRoute,
  currentRoute,
  showDetailForm,
  changeFormState,
} = useRoutesList();

const form = ref({
  id: 0,
  name: '',
  availableDays: {
    date: '',
    weekDay: [
      {
        id: 1,
        name: 'Monday',
        count: 0,
        disabled: false,
        is_checked: false,
      },
      {
        id: 2,
        name: 'Tuesday',
        count: 0,
        disabled: false,
        is_checked: false,
      },
      {
        id: 3,
        name: 'Wednesday',
        count: 0,
        disabled: false,
        is_checked: false,
      },
      {
        id: 4,
        name: 'Thursday',
        count: 0,
        disabled: false,
        is_checked: false,
      },
      {
        id: 5,
        name: 'Friday',
        count: 0,
        disabled: false,
        is_checked: false,
      },
      {
        id: 6,
        name: 'Saturday',
        count: 0,
        disabled: false,
        is_checked: false,
      },
      {
        id: 7,
        name: 'Sunday',
        count: 0,
        disabled: false,
        is_checked: false,
      },
    ],
  },
  daysChecked: [],
  points: [
    {
      time: '',
      restaurant_id: 1,
    },
    {
      time: '',
      restaurant_id: 0,
    },
  ],
});

const restaurants = ref([]);

const { addToast } = usePageToasts();
const formSubmit = () => {
  chooseRouteType();
  if (currentRoute.value !== 0) {
    updateRoute(form.value)
      .then(() => {
        addToast({
          title: 'Success',
          text: 'Restaurant updated successfully',
        });
      })
      .catch((response) => {
        addToast(
          {
            title: 'Error',
            text: response.message,
          },
          'error'
        );
      });
  } else {
    createRoute(form.value)
      .then(() => {
        addToast({
          title: 'Success',
          text: 'Restaurant updated successfully',
        });
      })
      .catch((response) => {
        addToast(
          {
            title: 'Error',
            text: response.message,
          },
          'error'
        );
      });
  }
};

const getRouteData = () => {
  if (currentRoute.value !== 0) {
    const restaurant = getRoute(currentRoute.value);
    if (restaurant !== null) {
      form.value = restaurant;
    }
  } else {
    form.value = {
      id: 0,
      name: '',
      availableDays: {
        date: '',
        weekday: [
          {
            id: 1,
            name: 'Monday',
            count: 0,
            disabled: false,
            is_checked: false,
          },
          {
            id: 2,
            name: 'Tuesday',
            count: 0,
            disabled: false,
            is_checked: false,
          },
          {
            id: 3,
            name: 'Wednesday',
            count: 0,
            disabled: false,
            is_checked: false,
          },
          {
            id: 4,
            name: 'Thursday',
            count: 0,
            disabled: false,
            is_checked: false,
          },
          {
            id: 5,
            name: 'Friday',
            count: 0,
            disabled: false,
            is_checked: false,
          },
          {
            id: 6,
            name: 'Saturday',
            count: 0,
            disabled: false,
            is_checked: false,
          },
          {
            id: 7,
            name: 'Sunday',
            count: 0,
            disabled: true,
            is_checked: false,
          },
        ],
      },
      points: [
        {
          time: '',
          restaurant_id: 0,
        },
        {
          time: '',
          restaurant_id: 0,
        },
      ],
    };
  }
};

const removePoint = (point_id) => {
  form.value.points.splice(point_id, 1);
};

const addPoint = () => {
  form.value.points.push({
    restaurant_id: 0,
    time: '',
  });
};

const chooseRouteType = () => {
  if (form.value.availableDays.date !== '') {
    form.value.daysChecked = [];
  } else {
    form.value.daysChecked = form.value.availableDays.weekDay
      .map((day) => {
        if (day?.is_checked) return day.id;
      })
      .filter((day) => day !== undefined);
  }
};

onUpdated(() => {
  if (currentRoute.value !== form.value.id) {
    getRouteData();
  }
});
onMounted(() => {
  getRouteData();
  getRestaurantList();
  restaurants.value = globalRestaurants.value.map((restaurant) => {
    return {
      label: restaurant.name,
      value: restaurant.id,
    };
  });
});
</script>
<style scoped>
.add-point:hover {
  text-decoration: underline;
  transition: transform 0.3s;
}
</style>
