<template>
  <div v-if="tour">
    <div v-if="tour.closed_out" class="position-relative border-primary">
      <div
        class="position-absolute"
        style="
          top: 0;
          left: -0px;
          border-radius: 10px 0;
          z-index: 5;
          background-color: #cb3171;
        "
      >
        <strong class="text-white small px-1">Closed out</strong>
      </div>
    </div>
    <div v-if="tour.sold_out" class="position-relative border-primary">
      <div
        class="position-absolute"
        style="
          top: 0;
          left: -0px;
          border-radius: 10px 0;
          z-index: 5;
          background-color: #43e470;
        "
      >
        <strong class="text-white small px-1">Sold out</strong>
      </div>
    </div>
    <div class="row-container rounded-3 bg-white mb-4 border">
      <div
        class="row-header d-flex justify-content-start"
        style="height: 102px"
      >
        <div class="py-16 ps-16">
          <LableComponent
            v-if="tour.rate.type === 'TYPE_REGULAR'"
            :value="getLabelName()"
            :color="getColorByName()"
            :type="''"
            style="min-width: 257px"
          />
          <LableDeshedComponent
            v-else
            :value="getLabelName()"
            :color="getColorByName()"
            :type="''"
            style="min-width: 257px"
          />
        </div>
        <DashboardHeaderInfo :tour="tour" />
        <div class="d-flex align-self-center me-2 ms-auto">
          <div>
            <div
              style="position: relative; min-width: 160px; height: 50px"
              :style="{ width: 25 + guides.length * 25 }"
            >
              <GuidesComponent
                v-for="(item, index) in getGuides"
                :key="index"
                :icon="item.icon"
                :index="index"
              />
            </div>
          </div>
        </div>

        <div
          class="border-start d-flex justify-content-center align-items-center"
          style="width: 102px; height: 102px"
        >
          <div
            class="rounded-5 bg-info m-auto d-flex justify-content-center align-items-center"
            style="width: 38px; height: 38px"
            @click="openRow(tour.id)"
          >
            <img
              src="/src/assets/images/arrow_up.svg"
              alt="arrow"
              :class="{ active: tour.open }"
            />
          </div>
        </div>
      </div>
      <Transition>
        <div v-if="tour.open" class="row-body">
          <table class="table table-borderless m-0" style="width: 100%">
            <thead class="small table-light">
              <tr>
                <th v-if="isFieldExists('id')" class="ps-16" scope="col">ID</th>
                <th v-if="isFieldExists('guide')" class="ps-16" scope="col">
                  Assigned tour guides
                </th>
                <th v-if="isFieldExists('route')" class="ps-16" scope="col">
                  Food route
                </th>
                <th
                  v-if="isFieldExists('presentStatus')"
                  class="ps-16"
                  scope="col"
                >
                  Status (Present visitors)
                </th>
                <th v-if="isFieldExists('people')" class="ps-16" scope="col">
                  Number of people
                </th>
                <th
                  v-if="isFieldExists('tickets', 'Montserrat')"
                  class="ps-16"
                  scope="col"
                >
                  Montserrat
                </th>
                <th
                  v-if="isFieldExists('tickets', 'Park Guell')"
                  class="ps-16"
                  scope="col"
                >
                  Park Guell
                </th>
                <th
                  v-if="isFieldExists('tickets', 'Sagrada')"
                  class="ps-16"
                  scope="col"
                >
                  Sagrada
                </th>
                <th v-if="isFieldExists('bookings')" class="ps-16" scope="col">
                  Bookings
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <DashboardRowTable
                v-for="(group, index) in tour.groups"
                :key="index"
                :group="group"
                :tour-id="tour.id"
                :fields="getFieldMap"
                :last="index === tour.groups.length - 1"
              />
            </tbody>
          </table>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import GuidesComponent from '../../GuidesComponent.vue';
import { useDashboard } from '../../../composebles/dashboard.ts';
import LableComponent from '../../kits/LableComponent.vue';
import DashboardRowTable from './DashboardRowTable.vue';
import DashboardHeaderInfo from './DashboardHeaderInfo.vue';
import { computed, ref } from 'vue';
import LableDeshedComponent from '../../kits/LableDeshedComponent.vue';

const { openRow } = useDashboard();

const props = defineProps({
  tour: {},
});

const show = ref(false);

const open = () => {
  show.value = !show.value;
};

const guides = ref([]);

const fieldsMap = [
  {
    tour: 1,
    fields: {
      id: 1,
      guide: 1,
      route: 1,
      presentStatus: 1,
      people: 1,
      tickets: [],
      bookings: 1,
    },
  },
  {
    tour: 2,
    fields: {
      id: 1,
      guide: 1,

      route: 0,
      presentStatus: 1,
      people: 1,
      tickets: ['Park Guell', 'Sagrada'],
      bookings: 1,
    },
  },
  {
    tour: 3,
    fields: {
      id: 1,
      guide: 1,
      route: 0,
      presentStatus: 1,
      people: 1,
      tickets: ['Sagrada'],
      bookings: 1,
    },
  },
  {
    tour: 4,
    fields: {
      id: 1,
      guide: 1,
      route: 0,
      presentStatus: 1,
      people: 1,
      tickets: ['Sagrada'],
      bookings: 1,
    },
  },
  {
    tour: 5,
    fields: {
      id: 1,
      guide: 1,
      route: 0,
      presentStatus: 1,
      people: 1,
      tickets: ['Montserrat'],
      bookings: 1,
    },
  },
];

const getFieldMap = computed(() => {
  return fieldsMap.find((x) => x.tour === parseInt(props.tour.rate.tour.id))
    ?.fields;
});

const isFieldExists = (field, subField = null) => {
  const fieldMap = getFieldMap;

  if (fieldMap.value[field]) {
    if (Array.isArray(fieldMap.value[field])) {
      return fieldMap.value[field].find((x) => x === subField);
    }

    return true;
  }

  return false;
};

const getColorByName = () => {
  switch (props.tour.rate.tour.name) {
    case 'Sagrada':
      return 'red';
    case 'Park Sagrada':
      return 'purple';
    case 'Tapas':
      return 'blue';
    case 'Montserrat':
      return 'orange';
    case 'Best of BCN':
      return 'pink';

    default:
      return 'red';
  }
};

const getLabelName = () => {
  const name = props.tour.rate.tour.name;
  const date = new Date(props.tour?.start_datetime);
  return (
    date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }) +
    ' ' +
    props.tour.rate.tour.name
  );
};

const getGuides = computed(() => {
  return filterGuidesByUniqueId(
    props.tour?.groups.map((item) => {
      return {
        id: item.guide?.user.id,
        icon: item.guide?.user.avatar ?? '/src/assets/images/testIcon.svg',
      };
    })
  );
});

const filterGuidesByUniqueId = (guides) => {
  return guides
    .map((e) => e['id'])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => guides[e])
    .map((e) => guides[e]);
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
img {
  transition: transform 0.3s ease-in-out;
}
.active {
  transition: transform 0.3s ease-in-out;
  transform: rotate(180deg);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
