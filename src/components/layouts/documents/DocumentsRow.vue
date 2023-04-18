<template>
  <div v-if="tour">
    <div class="row-container rounded-3 bg-white mb-4 border">
      <div class="row-header d-flex justify-content-start">
        <div class="py-16 ps-16">
          <LableComponent
            v-if="tour.rate.type == 'TYPE_REGULAR'"
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
        <DocumentsHeader :tour="tour" />

        <div
          class="border-start d-flex justify-content-center align-items-center ms-auto"
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
            <thead class="small table-light w-100">
              <tr>
                <th class="ps-16" scope="col">Group_ID</th>
                <th class="ps-16" scope="col">Ticket time</th>
                <th class="ps-16" scope="col">Payment status</th>
                <th class="ps-16" scope="col">Number</th>
                <th class="ps-16" scope="col">Total price</th>
                <th class="ps-16" scope="col"></th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <DocumentsRowTable
                v-for="(group, index) in tour.groups"
                :key="index"
                :group="group"
                :last="index === tour.groups.length - 1"
                :date="tour.start_datetime"
                @setViewDocuments="setViewDocuments"
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
import { useDocuments } from '../../../composebles/documents';
import LableComponent from '../../kits/LableComponent.vue';
import DocumentsRowTable from './DocumentsRowTable.vue';
import DocumentsHeader from './DocumentsHeaderInfo.vue';
import { ref } from 'vue';
import LableDeshedComponent from '../../kits/LableDeshedComponent.vue';

const { openRow } = useDocuments();

const props = defineProps({
  tour: {},
});

const show = ref(false);

const getColorByName = () => {
  switch (props.tour.rate.tour.name) {
    case 'Safa':
      return 'red';
    case 'Park Sagrada':
      return 'purple';
    case 'Tapas':
      return 'blue';
    case 'Monserat':
      return 'orange';

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
const emit = defineEmits(['setViewDocuments']);
const setViewDocuments = (data) => {
  emit('setViewDocuments', {
    ...data,
    date: props.tour.start_datetime,
    tour_name: props.tour.rate.name,
  });
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
