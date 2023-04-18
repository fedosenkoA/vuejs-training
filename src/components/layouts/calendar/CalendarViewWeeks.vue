<template>
  <div class="row pt-1">
    <div class="col">
      <SelectComponentCalendar
        id="type"
        :options="optionsSelectedType"
        :model-value="selectedType"
        @updateInput="setType"
      />
    </div>

    <!--div class="col">
      <select
        :id="id"
        v-model="selectedTour"
        class="form-select border w-full overflow-scroll-y scrollbar"
        multiple
        style="height: 40px"
      >
        <option disabled value="" style="height: 40px">Tour name</option>
        <option
          v-for="option in optionsSelectedTour"
          :key="option.id"
          class="text-truncate"
        >
          {{ option.name }}
        </option>
      </select>
    </div>

    <div class="col">
      <select
        :id="id"
        v-model="selectedGuide"
        class="form-select border w-full overflow-scroll-y scrollbar"
        multiple
        style="height: 40px"
      >
        <option disabled value="" style="height: 40px">Tour guide</option>
        <option
          v-for="option in optionsSelectedGuide"
          :key="option.id"
          class="text-truncate"
        >
          {{ option.first_name }} {{ option.last_name }}
        </option>
      </select>
    </div>

    <div class="col">
      <select
        :id="id"
        v-model="selectedBus"
        class="form-select border w-full overflow-scroll-y scrollbar"
        multiple
        style="height: 40px"
      >
        <option disabled value="" style="height: 40px">Tour bus</option>
        <option
          v-for="option in optionsSelectedBus"
          :key="option.id"
          class="text-truncate"
        >
          {{ option.name }}
        </option>
      </select>
    </div-->
    <div class="col">
      <SelectComponentCalendar
        id="name"
        :options="optionsSelectedTour"
        :model-value="selectedTour"
        @updateInput="setTour"
      />
    </div>

    <div class="col">
      <SelectComponentCalendar
        id="guide"
        :options="optionsSelectedGuide"
        :model-value="selectedGuide"
        @updateInput="setGuide"
      />
    </div>

    <div class="col">
      <SelectComponentCalendar
        id="bus"
        :options="optionsSelectedBus"
        :model-value="selectedBus"
        @updateInput="setBus"
      />
    </div>

    <div class="col">
      <SelectComponentCalendar
        id="view"
        :options="optionsSelectedView"
        :model-value="selectedView"
        @updateInput="setView"
      />
    </div>

    <div class="col">
      <ButtonComponent :label="'Cancel'" @click="resetOptions" />
    </div>
  </div>
  <calendar-view
    :show-date="showDate"
    :display-period-uom="'week'"
    locale="en-us"
    :starting-day-of-week="1"
    :items="items"
    :show-times="true"
    :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
    @click-item="onClickItem"
  >
    <template #header="{ headerProps }">
      <calendar-view-header :header-props="headerProps" @input="setShowDate" />
    </template>
  </calendar-view>
  <ModalWindow
    :isOpen="isOpen"
    :header="modalWindowHeader"
    :left-side="leftSide"
    @closeModalWindow="closeModalWindow"
  >
    <template #body>
      <div class="flex container">
        <div style="border-bottom: 1px stroke hsl(0, 0%, 87%)">
          <div class="row pt-1">
            <div class="col">
              <img
                :src="dayInfo.customData?.tourGuide.user.avatar"
                alt="user"
                style="height: 60px; width: 60px"
              />
            </div>
            <div
              class="col d-flex justify-content-start text-start"
              style="margin-top: 20px; margin-left: -50px"
            >
              {{ dayInfo.customData?.tourGuide.user.first_name }}
              {{ dayInfo.customData?.tourGuide.user.last_name }}
            </div>
            <div class="col">
              <router-link
                :to="{
                  path: 'dashboard',
                  query: {
                    tour_id: `${dayInfo.id}`,
                    start_date: `${dayInfo.startDate}`,
                  },
                }"
              >
                <img
                  src="/src/assets/images/arrow_pink.svg"
                  style="
                    height: 15px;
                    width: 15px;
                    margin-top: 20px;
                    margin-left: 115px;
                  "
                />
              </router-link>
            </div>
          </div>

          <div class="row pt-1">
            <div class="col" style="margin-left: 8px">
              <img
                src="/src/assets/images/tour_name.svg"
                style="height: 15px; width: 15px"
              />
            </div>
            <div
              class="col text-nowrap d-flex justify-content-start text-start"
              style="margin-left: -50px"
            >
              Tour Name
            </div>
            <div class="col">
              <img
                src="/src/assets/images/tour_type.svg"
                style="height: 15px; width: 15px"
              />
            </div>
            <div
              class="col text-nowrap d-flex justify-content-start text-start"
              style="margin-left: -50px"
            >
              Type
            </div>
          </div>

          <div class="row" style="margin-left: 82px">
            <div
              class="col text-nowrap d-flex justify-content-start text-start"
              :style="{ color: dayInfo?.customData?.colorText }"
            >
              {{ dayInfo?.title }}
            </div>
            <div class="col" style="color: #858585">
              {{ dayInfo?.customData?.type }}
            </div>
          </div>

          <div class="row pt-1">
            <div class="col" style="margin-left: 8px">
              <img
                src="/src/assets/images/time.svg"
                style="height: 15px; width: 15px"
              />
            </div>
            <div
              class="col text-nowrap d-flex justify-content-start text-start"
              style="margin-left: -50px"
            >
              Time
            </div>
            <div class="col">
              <img
                src="/src/assets/images/bus_user.svg"
                style="height: 15px; width: 15px"
              />
            </div>
            <div
              class="col text-nowrap d-flex justify-content-start text-start"
              style="margin-left: -50px"
            >
              Bus company
            </div>
          </div>

          <div class="row">
            <div class="col" style="color: #858585">
              {{ dayInfo?.startDate?.getHours() }}
            </div>
            <div
              class="col text-nowrap d-flex justify-content-center text-start"
              style="color: #858585"
            >
              {{ dayInfo?.customData?.busName?.name }}
            </div>
          </div>

          <div class="row pt-1">
            <div class="col" style="margin-left: 8px">
              <img
                src="/src/assets/images/d_people.svg"
                style="height: 13px; width: 15px"
              />
            </div>
            <div
              class="col text-nowrap d-flex justify-content-start text-start"
              style="margin-left: -50px"
            >
              Number of people
            </div>
            <div class="col">
              <img
                src="/src/assets/images/d_group.svg"
                style="height: 15px; width: 15px"
              />
            </div>
            <div
              class="col text-nowrap d-flex justify-content-start text-start"
              style="margin-left: -50px"
            >
              Number of groups
            </div>
          </div>

          <div class="row">
            <div class="col" style="color: #858585">
              {{ dayInfo?.customData?.amountPeople }}
            </div>
            <div class="col" style="color: #858585">
              {{ dayInfo?.customData?.amountGroups }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </ModalWindow>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useTourList } from '../../../composebles/tours';
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
import '../../../../node_modules/vue-simple-calendar/dist/style.css';
import '../../../../node_modules/vue-simple-calendar/dist/css/default.css';
import '../../../../node_modules/vue-simple-calendar/dist/css/holidays-us.css';
import SelectComponentCalendar from './SelectComponentCalendar.vue';
import ModalWindow from './ModalWindowCalendar.vue';
import ButtonComponent from '../../kits/ButtonComponent.vue';

export default {
  name: 'CalendarWeeks',
  components: {
    CalendarView,
    SelectComponentCalendar,
    CalendarViewHeader,
    ButtonComponent,
    ModalWindow,
  },
  emits: ['setViewVal'],
  setup(props, ctx) {
    const showDate = ref(new Date());
    const modalWindowHeader = ref('');

    const setViewVal = () => {
      ctx.emit('setViewVal', selectedView.value);
    };

    const {
      getTourList,
      calendar,
      guidesInfo,
      busCompanies,
      filter,
      getGuides,
      getTransportCompanies,
      getTourNames,
      tourNames,
    } = useTourList();

    const selectedType = ref('');
    const selectedTour = ref([]);
    const selectedBus = ref([]);
    const selectedGuide = ref([]);
    const selectedView = ref('Week');
    const optionsSelectedType = ref([
      { id: 0, label: 'Regular' },
      { id: 1, label: 'Private' },
    ]);
    const optionsSelectedView = ref([
      { id: 0, label: 'Month' },
      { id: 1, label: 'Week' },
    ]);
    const dayInfo = ref({});
    const isOpen = ref();
    const items = ref([]);
    let period = { start: '', end: '' };
    const attributes = computed(() => calendar.value);

    onMounted(() => {
      getGuides();
      getTransportCompanies();
      getTourNames();
      isOpen.value = false;
      setPeriod();
      setViewVal();
    });

    const setShowDate = (d) => {
      showDate.value = d;
      setPeriod();
    };

    const createDayInfo = (event) => {
      dayInfo.value = event;
      let headerDate = dayInfo.value.startDate;
      modalWindowHeader.value = `${headerDate.getDate()} ${headerDate.toLocaleString(
        'en-us',
        { month: 'long' }
      )} ${headerDate.getFullYear()}`;
    };

    const setPeriod = () => {
      const year = showDate.value.getFullYear();
      const month = showDate.value.getMonth() + 1;
      const start_day = showDate.value.getDate() - showDate.value.getDay() + 1;
      let start_date = `${year}-${month}-${start_day} 00:00:00`;
      let last = new Date(year, month, 0).getDate();
      let last_day = '';
      let end_date = '';

      if (last - start_day < 6) {
        last_day = 6 - (last - start_day);
        end_date = `${year}-${month + 1}-${last_day} 00:00:00`;
      } else {
        last_day = start_day + 6;
        end_date = `${year}-${month}-${last_day} 00:00:00`;
      }
      period = { start: start_date, end: end_date };
      getTourList(period).then(() => {
        items.value = [];
        attributes.value.forEach((el) => {
          let stringClass = '';
          if (el.customData.classAttr === 'barselona') {
            stringClass =
              'color: #e955a5; font-size: 12px; min-width: 90px; max-width: 150px; height: 50px; background-color: #ffecf7; border-left: 2px solid #e955a5; margin-top: 10px; margin-left: 5px; font-weight: bold; border-top: 1px solid #858585;';
          } else if (el.customData.classAttr === 'sagrada') {
            stringClass =
              'color: hsl(299, 77%, 62%);font-size: 12px; min-width: 90px; max-width: 150px; height: 50px; background-color: hsl(303, 100%, 96%); border-left: 2px solid hsl(299, 77%, 62%);  margin-top: 10px; margin-left: 5px; font-weight: bold; border-top: 1px solid #858585;';
          } else if (el.customData.classAttr === 'montserrat') {
            stringClass =
              'color: hsl(0, 100%, 69%); font-size: 12px; min-width: 90px; max-width: 150px; height: 50px; background-color: hsl(0, 100%, 96%); border-left: 2px solid hsl(0, 100%, 69%); margin-top: 10px; margin-left: 5px; font-weight: bold; border-top: 1px solid #858585;';
          } else if (el.customData.classAttr === 'tapas') {
            stringClass =
              ' color: hsl(205, 77%, 62%); font-size: 12px; min-width: 90px; max-width: 150px;height: 50px; background-color: hsl(208, 100%, 96%); border-left: 2px solid hsl(205, 77%, 62%); margin-top: 10px; margin-left: 5px; font-weight: bold; border-top: 1px solid #858585;';
          } else if (el.customData.classAttr === 'park') {
            stringClass =
              'color: hsl(266, 77%, 62%); font-size: 12px; min-width: 90px; max-width: 150px; height: 50px; background-color: hsl(266, 77%, 62%); border-left: 2px solid hsl(284, 100%, 96%); margin-top: 10px; margin-left: 5px; font-weight: bold; border-top: 1px solid #858585;';
          } else if (el.customData.classAttr === 'sagradaPrivate') {
            stringClass =
              'color: hsl(299, 77%, 62%);font-size: 12px; min-width: 90px; max-width: 150px; height: 50px; background-color: hsl(303, 100%, 96%); border: 2px dashed hsl(299, 77%, 62%);  margin-top: 10px; margin-left: 5px; font-weight: bold;';
          } else if (el.customData.classAttr === 'montserratPrivate') {
            stringClass =
              'color: hsl(0, 100%, 69%); font-size: 12px; min-width: 90px; max-width: 150px; height: 50px; background-color: hsl(0, 100%, 96%); border: 2px dashed hsl(0, 100%, 69%); margin-top: 10px; margin-left: 5px; font-weight: bold;';
          } else if (el.customData.classAttr === 'tapasPrivate') {
            stringClass =
              ' color: hsl(205, 77%, 62%); font-size: 12px; min-width: 90px; max-width: 150px;height: 50px; background-color: hsl(208, 100%, 96%); border: 2px dashed hsl(205, 77%, 62%); margin-top: 10px; margin-left: 5px; font-weight: bold;';
          } else if (el.customData.classAttr === 'parkPrivate') {
            stringClass =
              'color: hsl(266, 77%, 62%); font-size: 12px; min-width: 90px; max-width: 150px; height: 50px; background-color: hsl(266, 77%, 62%); border: 2px dashed hsl(284, 100%, 96%); margin-top: 10px; margin-left: 5px; font-weight: bold;';
          } else if (el.customData.classAttr === 'best') {
            stringClass =
              'color: hsla(328, 77%, 62%, 1);font-size: 12px; min-width: 90px; max-width: 150px; height: 50px; background-color: hsl(284, 100%, 96%); border-left: 2px solid hsl(266, 77%, 62%);  margin-top: 10px; margin-left: 5px; font-weight: bold;';
          } else if (el.customData.classAttr === 'bestPrivate') {
            stringClass =
              'color: hsla(328, 77%, 62%, 1);font-size: 12px; min-width: 90px; max-width: 150px; height: 50px; background-color: hsl(284, 100%, 96%); border: 2px dashed hsl(266, 77%, 62%); margin-top: 10px; margin-left: 5px; font-weight: bold;';
          }
          const item = {
            id: el.key,
            startDate: el.dates,
            title: el.customData.tourName.name,
            style: stringClass,
            customData: {
              tourGuide: el.customData.tourGuide,
              busName: el.customData.busName,
              amountPeople: el.customData.amountPeople,
              amountGroups: el.customData.amountGroups,
              colorText: el.customData.colorText,
              type: el.customData.type,
            },
          };
          items.value.push(item);
        });
      });
    };

    const openModalWindow = () => {
      isOpen.value = true;
    };
    const closeModalWindow = () => {
      isOpen.value = false;
      leftSide.value = false;
    };

    const chosenTourGuide = ref('');
    const chosenTourBus = ref('');
    const chosenTour = ref('');

    /*watch(() => {
      setPeriod();
      filter(
        selectedType.value,
        selectedTour.value,
        selectedGuide.value,
        selectedBus.value,
        chosenTourGuide.value,
        chosenTourBus.value,
        chosenTour.value
      );
      setViewVal();
    });*/

    const setType = (value) => {
      selectedType.value = value;
      setPeriod();
      filter(
        selectedType.value,
        selectedTour.value,
        selectedGuide.value,
        selectedBus.value,
        chosenTourGuide.value,
        chosenTourBus.value,
        chosenTour.value
      );
    };

    const setTour = (value) => {
      selectedTour.value = value;
      setPeriod();
      filter(
        selectedType.value,
        selectedTour.value,
        selectedGuide.value,
        selectedBus.value,
        chosenTourGuide.value,
        chosenTourBus.value,
        chosenTour.value
      );
    };

    const setGuide = (value) => {
      selectedGuide.value = value;
      setPeriod();
      filter(
        selectedType.value,
        selectedTour.value,
        selectedGuide.value,
        selectedBus.value,
        chosenTourGuide.value,
        chosenTourBus.value,
        chosenTour.value
      );
    };

    const setBus = (value) => {
      selectedBus.value = value;
      setPeriod();
      filter(
        selectedType.value,
        selectedTour.value,
        selectedGuide.value,
        selectedBus.value,
        chosenTourGuide.value,
        chosenTourBus.value,
        chosenTour.value
      );
    };

    const setView = (value) => {
      selectedView.value = value;
      setViewVal();
    };

    const onClickItem = (e) => {
      createDayInfo(e.originalItem);
      leftSide.value = false;
      openModalWindow();
    };

    const optionsChosen = ref([
      { id: 0, label: 'Tour guide' },
      { id: 1, label: 'Bus company' },
    ]);

    const leftSide = ref(false);

    const chosenTourVuew = ref(0);
    const chosen = ref('');

    const optionsSelectedBus = computed(() => busCompanies.value);
    const optionsSelectedGuide = computed(() => guidesInfo.value);
    const optionsSelectedTour = computed(() => tourNames.value);

    const resetOptions = () => {
      selectedType.value = '';
      selectedTour.value = '';
      selectedGuide.value = '';
      selectedBus.value = '';
      setPeriod();
      filter(
        selectedType.value,
        selectedTour.value,
        selectedGuide.value,
        selectedBus.value,
        chosenTourGuide.value,
        chosenTourBus.value,
        chosenTour.value
      );
    };

    return {
      showDate,
      setShowDate,
      items,
      selectedType,
      selectedGuide,
      selectedTour,
      selectedBus,
      selectedView,
      optionsSelectedType,
      optionsSelectedTour,
      optionsSelectedGuide,
      optionsSelectedBus,
      optionsSelectedView,
      setBus,
      setGuide,
      setTour,
      setType,
      setView,
      onClickItem,
      modalWindowHeader,
      resetOptions,
      dayInfo,
      isOpen,
      closeModalWindow,
      optionsChosen,
      chosenTourVuew,
      leftSide,
      chosenTourGuide,
      chosenTour,
      chosenTourBus,
      chosen,
    };
  },
};
</script>
<style>
.currentPeriod,
.previousYear,
.nextYear {
  display: none;
}
.cv-header button {
  box-sizing: border-box;
  line-height: 1em;
  font-size: 1em;
  border: 2px solid #858585;
  border-radius: 50%;
  color: #858585;
}
.cv-header {
  border: 0px;
}
.cv-weeks {
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  flex-flow: column nowrap;
  border-width: 0 0 1px 1px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  min-height: 500px;
  max-height: 900px;
}
.cv-week-days {
  offset: none;
}
.cv-day-number {
  height: 30px;
  width: 100%;
  color: hsl(335, 61%, 49%);
}
.cv-day {
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  position: relative;
  position: sticky;
  top: 0;
  border-width: 1px 1px 0 0;
  direction: initial;
  text-align: center;
}
.cv-header-days {
  background-color: hsl(333, 100%, 98%);
  color: hsl(335, 61%, 49%);
  font-style: normal;
  font-weight: bold;
}
</style>
