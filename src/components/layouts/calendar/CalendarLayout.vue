<template>
  <v-calendar
    locale="en"
    title-position="right"
    :first-day-of-week="2"
    :masks="{ weekdays: 'WWW' }"
    :attributes="attributes"
    style="margin-top: 3px; width: 100%; height: 100%"
  >
    <template #header-title="{ monthLabel, yearLabel }">
      <div class="row" style="z-index: 1">
        <span ref="vCalendar" class="col">
          {{ monthLabel }} {{ yearLabel }}
        </span>
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
          <!--select
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
          </select-->
          <SelectComponentCalendar
            id="guide"
            :options="optionsSelectedGuide"
            :model-value="selectedGuide"
            @updateInput="setGuide"
          />
        </div>

        <div class="col">
          <!--select
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
          </select-->
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

        <div class="col" @click="resetOptions">
          <ButtonComponent :label="'Cancel'" style="height: 40px" />
        </div>

        <div class="col" @click="assign">
          <ButtonComponent :label="'Assign'" style="height: 40px" />
        </div>
      </div>
    </template>
    <template #day-content="{ day, attributes }">
      <div
        class="container"
        :class="[
          setClass && selectedDaysTours.includes(day.id) ? 'pinkContainer' : '',
        ]"
        style="width: 100%; height: 100%"
        @click="selectDays(day)"
      >
        <span
          v-if="
            month_year.month - 1 == new Date().getMonth() &&
            month_year.year == new Date().getFullYear() &&
            day.day == new Date().getDate()
          "
          class="todayDay"
          >{{ day.day }}</span
        >
        <span v-else class="day">
          {{ day.day }}
        </span>
        <div
          v-for="attr in attributes"
          :key="attr.key"
          @click="openModalWindow(attr.dates)"
        >
          <div :class="[attr.customData.classAttr]">
            <div class="row h-80" style="width: 150px">
              <div
                class="col-1 text-start text-truncate"
                style="
                  width: 52px;
                  line-height: 97%;
                  margin-top: 2px;
                  margin-left: 1px;
                "
              >
                {{ attr.customData.tourName.name }}
              </div>
              <div class="col d-flex" style="width: 15px">
                <img
                  src="/src/assets/images/d_people.svg"
                  alt="user"
                  style="height: 15px; width: 15px"
                />
              </div>
              <div class="col-1 d-flex" style="width: 10px; color: #858585">
                {{ attr.customData.amountGroups }}
              </div>
              <div class="col-1" style="width: 15px">
                <img
                  src="/src/assets/images/d_group.svg"
                  style="height: 15px; width: 15px"
                />
              </div>
              <div class="col-1" style="width: 10px; color: #858585">
                {{ attr.customData.amountPeople }}
              </div>
            </div>

            <div class="row">
              <div class="col-1">
                <img
                  class="rounded-5 border-white"
                  :src="attr.customData?.tourGuide.user.avatar"
                  style="
                    height: 27px;
                    width: 27px;
                    margin-bottom: 1px;
                    margin-top: 2px;
                  "
                />
              </div>
              <div
                class="col-1 d-flex justify-content-start text-start text-nowrap"
                style="margin-left: 50px; margin-top: 13px; color: #858585"
              >
                {{ attr.customData.busName?.name }}
              </div>
            </div>
          </div>
          <div
            v-if="attr.customData.amountEvents > 1"
            class="col d-flex justify-content-start text-start"
            style="color: #858585; font-size: xx-small"
          >
            {{ attr.customData.amountEvents }} events in total
          </div>
        </div>
      </div>
    </template>
  </v-calendar>
  <ModalWindow
    :is-open="isOpen"
    :header="modalWindowHeader"
    :amount-events="amountEvents"
    :left-side="leftSide"
    :little="littleView"
    @closeModalWindow="closeModalWindow"
  >
    <template #body>
      <div class="flex container">
        <div v-if="chosen === '' && leftSide === false">
          <div
            v-for="day in dayInfo"
            :key="day.key"
            style="border-bottom: 1px stroke hsl(0, 0%, 87%)"
          >
            <div class="row pt-1">
              <div class="col">
                <img
                  :src="day.customData?.tourGuide.user.avatar"
                  alt="user"
                  style="height: 60px; width: 60px"
                />
              </div>
              <div
                class="col d-flex justify-content-start align-items-center text-start"
              >
                {{ day.customData?.tourGuide.user.first_name }}
                {{ day.customData?.tourGuide.user.last_name }}
              </div>
              <div
                class="col d-flex justify-content-end align-items-center me-1"
              >
                <router-link
                  :to="{
                    path: 'dashboard',
                    query: {
                      tour_id: `${day.id}`,
                      start_date: `${day?.dates}`,
                    },
                  }"
                >
                  <img
                    src="/src/assets/images/arrow_pink.svg"
                    style="height: 15px; width: 15px"
                  />
                </router-link>
              </div>
            </div>

            <div class="row pt-1">
              <div
                class="col d-flex justify-content-end align-items-center text-start"
              >
                <img
                  src="/src/assets/images/tour_name.svg"
                  style="height: 15px; width: 15px"
                />
              </div>
              <div
                class="col text-nowrap d-flex justify-content-start align-items-center text-start"
              >
                Tour Name
              </div>
              <div
                class="col d-flex justify-content-end align-items-center text-start"
              >
                <img
                  src="/src/assets/images/tour_type.svg"
                  style="height: 15px; width: 15px"
                />
              </div>
              <div
                class="col text-nowrap d-flex justify-content-start align-items-center text-start"
              >
                Type
              </div>
            </div>

            <div class="row">
              <div class="col"></div>
              <div
                class="col text-nowrap d-flex justify-content-start align-items-center"
                :style="{ color: day?.customData?.colorText }"
              >
                {{ day?.customData?.tourName.name }}
              </div>
              <div class="col"></div>
              <div
                class="col text-nowrap d-flex justify-content-start align-items-center"
                style="color: #858585"
              >
                {{ day?.customData?.type }}
              </div>
            </div>

            <div class="row pt-1">
              <div class="col d-flex justify-content-end align-items-center">
                <img
                  src="/src/assets/images/time.svg"
                  style="height: 15px; width: 15px"
                />
              </div>
              <div
                class="col text-nowrap d-flex justify-content-start align-items-center text-start"
              >
                Time
              </div>
              <div class="col d-flex justify-content-end align-items-center">
                <img
                  src="/src/assets/images/bus_user.svg"
                  style="height: 15px; width: 15px"
                />
              </div>
              <div
                class="col text-nowrap d-flex justify-content-start align-items-center text-start"
              >
                Bus company
              </div>
            </div>

            <div class="row">
              <div class="col"></div>
              <div
                class="col d-flex justify-content-start align-items-center"
                style="color: #858585"
              >
                {{ day?.dates?.getHours() }}:
                {{
                  day?.dates?.getMinutes() > 0 ? day?.dates?.getMinutes() : '00'
                }}
              </div>
              <div class="col"></div>
              <div
                class="col text-nowrap d-flex justify-content-start align-items-center text-start"
                style="color: #858585"
              >
                {{ day?.customData?.busName?.name }}
              </div>
            </div>

            <div class="row pt-1">
              <div class="col d-flex justify-content-end align-items-center">
                <img
                  src="/src/assets/images/d_people.svg"
                  style="height: 13px; width: 15px"
                />
              </div>
              <div
                class="col d-flex justify-content-start align-items-center text-start"
              >
                Number of people
              </div>
              <div class="col d-flex justify-content-end align-items-center">
                <img
                  src="/src/assets/images/d_group.svg"
                  style="height: 15px; width: 15px"
                />
              </div>
              <div
                class="col d-flex justify-content-start align-items-center text-start"
              >
                Number of groups
              </div>
            </div>

            <div class="row">
              <div class="col"></div>
              <div
                class="col d-flex justify-content-start align-items-center"
                style="color: #858585"
              >
                {{ day?.customData?.amountPeople }}
              </div>
              <div class="col"></div>
              <div
                class="col d-flex justify-content-start align-items-center"
                style="color: #858585"
              >
                {{ day?.customData?.amountGroups }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="
            chosen != '' &&
            leftSide == false &&
            chosen === 'Tour guide' &&
            selectedDaysTours.length == 0
          "
        >
          <div
            class="col g-2 d-flex justify-content-start text-start pt-2 ps-2"
          >
            Choose the group
          </div>
          <div
            class="col g-2 d-flex justify-content-start text-start pt-2 ps-2"
          >
            <SelectComponentCalendar
              id="group"
              :options="groups"
              :model-value="chosenGroup"
              @updateInput="setGroup"
            />
          </div>
          <div
            class="col g-2 d-flex justify-content-start text-start pt-2 ps-2"
          >
            <div class="col">
              <ButtonComponent :label="'Proceed'" @click="setProceedValues" />
            </div>
            <div class="col" @click="closeModalWindow">
              <ButtonWhiteComponentVue :label="'Cancel'" style="width: 80%" />
            </div>
          </div>
        </div>
        <div
          v-else-if="
            chosen != '' &&
            leftSide == false &&
            chosen === 'Bus company' &&
            selectedDaysTours.length == 0
          "
        >
          <div
            class="row g-2 d-flex justify-content-start text-start mt-4 ps-2"
          >
            The following bus company will be assigned
          </div>
          <div
            class="row g-2 d-flex justify-content-start text-start mt-1 ps-2"
            style="color: rgba(107, 107, 107, 1)"
          >
            {{ chosenTour }} {{ chosenDay }}
          </div>
          <div class="row mt-2">
            <div class="col ps-2">
              <ButtonComponent :label="'Proceed'" @click="setProceedValues" />
            </div>
            <div class="col ps-2" @click="closeModalWindow">
              <ButtonWhiteComponentVue :label="'Cancel'" style="width: 80%" />
            </div>
          </div>
        </div>
        <div
          v-else-if="
            chosen != '' &&
            leftSide == false &&
            chosen === 'Bus company' &&
            selectedDaysTours.length != 0
          "
        >
          <div
            class="row g-2 d-flex justify-content-start text-start mt-4 ps-2"
          >
            The following bus company will be assigned
          </div>
          <div
            class="row g-2 d-flex justify-content-start text-start mt-1 ps-2"
            v-if="selectedDaysTours.length > 1"
            style="color: rgba(107, 107, 107, 1)"
          >
            {{ selectedDaysTours[0] }} -
            {{ selectedDaysTours[selectedDaysTours.length - 1] }}
          </div>
          <div
            v-else
            class="row g-2 d-flex justify-content-start text-start mt-1 ps-2"
            style="color: rgba(107, 107, 107, 1)"
          >
            {{ selectedDaysTours[0] }}
          </div>
          <div class="row mt-2">
            <div class="col ps-2">
              <ButtonComponent :label="'Proceed'" @click="setSelectedDays" />
            </div>
            <div class="col ps-2" @click="resetSelectedDays">
              <ButtonWhiteComponentVue :label="'Cancel'" />
            </div>
          </div>
        </div>
        <div
          v-else-if="
            chosen != '' &&
            leftSide == false &&
            chosen === 'Tour guide' &&
            selectedDaysTours.length != 0
          "
        >
          <div
            class="row g-2 d-flex justify-content-start text-start mt-4 ps-3"
            style="padding-top: 3%"
          >
            The following guide will be assigned
          </div>
          <div
            class="row g-2 d-flex justify-content-start text-start mt-1 ps-3"
            style="color: rgba(107, 107, 107, 1)"
          >
            {{ selectedDaysTours[0] }} -
            {{ selectedDaysTours[selectedDaysTours.length - 1] }}
          </div>
          <div class="row ps-3">
            <div class="col">
              <ButtonComponent :label="'Proceed'" @click="setSelectedDays" />
            </div>
            <div class="col" @click="resetSelectedDays">
              <ButtonWhiteComponentVue :label="'Cancel'" />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="container">
            <div
              class="col g-2 d-flex justify-content-start text-start pt-2 ps-2"
              style="color: #464646; font-size: 14px"
            >
              Choose who you want to assign
            </div>
            <div
              class="col g-2 d-flex justify-content-start text-start ps-2"
              style="color: hsla(0, 0%, 42%, 1); font-size: 16px"
            >
              Select role
            </div>
            <div class="col g-2 d-flex justify-content-start text-start ps-2">
              <SelectComponentCalendar
                id="chosen"
                :options="optionsChosen"
                :model-value="chosen"
                @updateInput="setChosen"
              />
            </div>
            <div class="row mt-1 border-bottom"></div>

            <div v-if="chosen === 'Tour guide'">
              <div
                class="col g-2 d-flex justify-content-start text-start pt-2 ps-2"
                style="color: hsla(0, 0%, 28%, 1); font-size: 18px"
              >
                Tour guide
              </div>
              <div
                class="col g-2 d-flex justify-content-start text-start ps-2"
                style="color: hsla(0, 0%, 42%, 1); font-size: 16px"
              >
                Select from available tour guides and assign
              </div>
              <div class="col g-2 d-flex justify-content-start text-start ps-2">
                <SelectComponentCalendar
                  id="chosenGuide"
                  :options="optionsSelectedGuide"
                  :model-value="chosenTourGuide"
                  @updateInput="setChosenTourGuide"
                />
              </div>
              <div class="row mt-1 border-bottom"></div>
            </div>
            <div v-if="chosen === 'Bus company'">
              <div
                class="col d-flex justify-content-start text-start pt-2 ps-2"
                style="color: hsla(0, 0%, 28%, 1); font-size: 18px"
              >
                Bus company
              </div>
              <div
                class="col d-flex justify-content-start text-start ps-2"
                style="color: hsla(0, 0%, 42%, 1); font-size: 16px"
              >
                Select from available bus companies and assign
              </div>
              <div class="col d-flex justify-content-start text-start ps-2">
                <SelectComponentCalendar
                  id="chosenBus"
                  :options="optionsSelectedBus"
                  :model-value="chosenTourBus"
                  @updateInput="setChosenTourBus"
                />
              </div>
              <div class="row mt-1 border-bottom"></div>
            </div>
            <div
              class="col d-flex justify-content-start text-start pt-2 ps-2"
              style="color: hsla(0, 0%, 28%, 1); font-size: 18px"
            >
              Tour
            </div>
            <div
              class="col d-flex justify-content-start text-start ps-2"
              style="color: hsla(0, 0%, 42%, 1); font-size: 16px"
            >
              Select tour
            </div>
            <div
              v-if="chosen === 'Bus company'"
              class="col d-flex justify-content-start text-start ps-2"
            >
              <SelectComponentCalendar
                id="chosenName"
                :options="optionsSelectedTourForBuses"
                :model-value="chosenTour"
                @updateInput="setChosenTour"
              />
            </div>
            <div
              v-if="chosen === 'Tour guide' || chosen == ''"
              class="col d-flex justify-content-start text-start ps-2"
            >
              <SelectComponentCalendar
                id="chosenName"
                :options="optionsSelectedTour"
                :model-value="chosenTour"
                @updateInput="setChosenTour"
              />
            </div>
            <div class="row mt-1 border-bottom"></div>

            <section>
              <div
                class="col d-flex justify-content-start text-start pt-2 ps-2"
                style="color: hsla(0, 0%, 42%, 1); font-size: 18px"
              >
                <input v-model="chosenTourVuew" type="radio" value="0" />
                Choose from existing tours
              </div>
              <div
                class="col d-flex justify-content-start text-start ps-2"
                style="color: hsla(0, 0%, 42%, 1); font-size: 18px"
              >
                <input v-model="chosenTourVuew" type="radio" value="1" />
                Choose from days without tour groups
              </div>
            </section>

            <div class="col pt-3">
              <ButtonComponent
                :label="'Proceed'"
                @click="setChosenPoints"
                style="width: 100%"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </ModalWindow>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import ModalWindow from './ModalWindowCalendar.vue';
import { useTourList } from '../../../composebles/tours';
import SelectComponentCalendar from './SelectComponentCalendar.vue';
import ButtonComponent from '../../kits/ButtonComponent.vue';
import ButtonWhiteComponentVue from '../../kits/ButtonWhiteComponent.vue';

export default {
  name: 'CalendarLayout',
  components: {
    ModalWindow,
    SelectComponentCalendar,
    ButtonComponent,
    ButtonWhiteComponentVue,
  },
  emits: ['setViewVal'],
  setup(props, ctx) {
    const setViewVal = () => {
      ctx.emit('setViewVal', selectedView.value);
    };
    const {
      getTourList,
      calendar,
      individialCalendarDates,
      guidesInfo,
      busCompanies,
      filter,
      getGuides,
      getTransportCompanies,
      getTourNames,
      tourNames,
      assignGuide,
      assignGuideToDate,
      assignTransportToDate,
      assignTransportRequest,
      tourBooking,
      getTourNamesForBuses,
      tourNamesForBuses,
    } = useTourList();
    const vCalendar = ref(null);
    const isOpen = ref();
    let period = { start: '', end: '' };
    const month_year = ref({ month: '', year: '' });
    const littleView = ref(false);

    const selectedType = ref('');
    // const selectedTour = ref([]);
    // const selectedBus = ref([]);
    // const selectedGuide = ref([]);
    const selectedTour = ref('');
    const selectedBus = ref('');
    const selectedGuide = ref('');

    const selectedView = ref('Month');

    const optionsSelectedType = ref([
      { id: 0, label: 'Regular' },
      { id: 1, label: 'Private' },
    ]);
    const optionsSelectedView = ref([
      { id: 0, label: 'Month' },
      { id: 1, label: 'Week' },
    ]);
    const optionsChosen = ref([
      { id: 0, label: 'Tour guide' },
      { id: 1, label: 'Bus company' },
    ]);
    const amountEvents = ref(0);
    const dayInfo = ref({});
    const leftSide = ref(false);

    const chosenTourVuew = ref(0);
    const chosenTourGuide = ref('');
    const chosenTour = ref('');
    const chosenTourBus = ref('');
    const chosen = ref('');
    const groups = ref([]);
    const chosenGroup = ref('');
    const chosenDay = ref('');

    const selectedDaysTours = ref([]);

    const modalWindowHeader = ref('');
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    onMounted(() => {
      getGuides();
      getTransportCompanies();
      getTourNamesForBuses();
      getTourNames();
      isOpen.value = false;
      dayInfo.value = {
        key: 0,
        customData: {
          tourName: '',
          busName: '',
          amountPeople: '',
          amountGroups: '',
          endDate: new Date(),
          type: '',
        },
        dates: new Date(),
      };
      month_year.value = {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      };
      setViewVal();
    });
    let year = '';
    let month = '';
    const setPeriod = (data) => {
      let textArray = data.split(' ');
      year = textArray[1];
      month = monthNames.indexOf(textArray[0]) + 1;
      let start_date = `${textArray[1]}-${month}-01 00:00:00`;
      let last_day = new Date(year, month + 1, 0).getDate();
      let end_date = `${year}-${month}-${last_day} 00:00:00`;
      period = { start: start_date, end: end_date };
      getTourList(period);
      return { month: month, year: year };
    };

    const attributes = computed(() => individialCalendarDates.value);
    const optionsSelectedBus = computed(() => busCompanies.value);
    const optionsSelectedGuide = computed(() => guidesInfo.value);
    const optionsSelectedTour = computed(() => tourNames.value);
    const optionsSelectedTourForBuses = computed(() => tourNamesForBuses.value);

    watch(() => {
      if (vCalendar.value != null) {
        month_year.value = setPeriod(vCalendar.value.innerText);
      }
    });

    const createDayInfo = (date) => {
      dayInfo.value = calendar.value.filter(
        (el) => el.dates.getDate() == date[0].start.getDate()
      );
      amountEvents.value = dayInfo.value.length;
      let headerDate = dayInfo.value[0].dates;
      modalWindowHeader.value = `${headerDate.getDate()} ${headerDate.toLocaleString(
        'en-us',
        { month: 'long' }
      )} ${headerDate.getFullYear()}`;
    };

    const createGroups = (date) => {
      groups.value = [];
      const result = calendar.value.filter(
        (el) =>
          el.dates.getDate() == date[0].start.getDate() &&
          el.customData.rate.name === chosenTour.value
      );
      result.forEach((el, index) => {
        const hour = el.dates.getHours();
        const minutes =
          el.dates?.getMinutes() > 0 ? el?.dates?.getMinutes() : '00';
        groups.value.push({
          id: index,
          label: `${hour}:${minutes} Group_${el.customData.groupId}`,
        });
      });
    };

    const openModalWindow = (date) => {
      if (
        chosenTourVuew.value != '' &&
        chosenTourVuew.value == '1' &&
        selectedDaysTours.value.length == 0
      ) {
        isOpen.value = false;
        modalWindowHeader.value = '';
      } else isOpen.value = true;

      if (date != null && chosen.value === '') {
        leftSide.value = false;
        createDayInfo(date);
      } else if (date != null && chosen.value !== '') {
        leftSide.value = false;
        const inputVal =
          chosenTourGuide.value != ''
            ? chosenTourGuide.value
            : chosenTourBus.value;
        modalWindowHeader.value = `Assign ${inputVal}`;
        createGroups(date);
        littleView.value = true;
      } else if (
        chosen.value !== '' &&
        date == null &&
        selectedDaysTours.value.length != 0
      ) {
        const inputVal =
          chosenTourGuide.value != ''
            ? chosenTourGuide.value
            : chosenTourBus.value;
        modalWindowHeader.value = `Assign ${inputVal}`;
        leftSide.value = false;
        amountEvents.value = 1;
        littleView.value = true;
      } else {
        modalWindowHeader.value = 'Assign';
        leftSide.value = true;
        amountEvents.value = 1;
      }

      if (date) {
        let month = monthNames[new Date(date[0].start).getMonth()];
        let day = new Date(date[0].start).getDate();
        let year = new Date(date[0].start).getFullYear();
        chosenDay.value = `${month}, ${day}, ${year}`;
      }
    };
    const closeModalWindow = () => {
      isOpen.value = false;
      leftSide.value = false;
      littleView.value = false;
    };

    const setType = (value) => {
      selectedType.value = value;
      setPeriod(vCalendar.value.innerText);
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
    };

    /*watch(() => {
      if (vCalendar.value != null) setPeriod(vCalendar.value.innerText);
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

    const setTour = (value) => {
      selectedTour.value = value;
      setPeriod(vCalendar.value.innerText);
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
    };

    const setGuide = (value) => {
      selectedGuide.value = value;
      setPeriod(vCalendar.value.innerText);
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
    };

    const setBus = (value) => {
      selectedBus.value = value;
      setPeriod(vCalendar.value.innerText);
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
    };

    const setView = (value) => {
      selectedView.value = value;
      setViewVal();
    };

    const setChosen = (value) => {
      chosen.value = value;
    };

    const setChosenTourGuide = (value) => {
      chosenTourGuide.value = value;
      chosenTourBus.value = '';
    };

    const setChosenTourBus = (value) => {
      chosenTourBus.value = value;
      chosenTourGuide.value = '';
    };

    const setChosenTour = (value) => {
      chosenTour.value = value;
    };

    const setGroup = (value) => {
      chosenGroup.value = value;
    };

    const setClass = ref(false);

    const selectDays = (day) => {
      let flag = false;

      if (attributes.value[0] != undefined) {
        const result = attributes.value.filter(
          (el) => el.dates.getDate() === Number(day.label)
        );
        if (result.length == 0) flag = true;
      } else flag = true;

      if (chosenTourVuew.value == 1 && flag) {
        let indexVal = 0;
        selectedDaysTours.value.forEach((el, index) => {
          if (el === day.id) indexVal = index;
        });

        if (indexVal === 0) {
          setClass.value = true;
          selectedDaysTours.value.push(day.id);
        } else {
          setClass.value = false;
          selectedDaysTours.value.splice(indexVal, 1);
        }
      }
    };

    const resetOptions = () => {
      setPeriod(vCalendar.value.innerText);
      selectedType.value = '';
      selectedTour.value = '';
      selectedGuide.value = '';
      selectedBus.value = '';

      chosenTourBus.value = '';
      chosen.value = '';
      chosenTour.value = '';
      chosenTourGuide.value = '';

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
    };

    const setChosenPoints = () => {
      setPeriod(vCalendar.value.innerText);
      filter(
        selectedType.value,
        selectedTour.value,
        selectedGuide.value,
        selectedBus.value,
        chosen.value,
        chosenTour.value
      );
      closeModalWindow();
    };

    /*const unSetChosenPoints = () => {
      chosenGroup.value = '';
      chosenTourGuide.value = '';
      chosen.value = '';
      chosenTourBus.value = '';
      chosenTour.value = '';
      closeModalWindow();

      setPeriod(vCalendar.value.innerText);
      filter(
        selectedType.value,
        selectedTour.value,
        selectedGuide.value,
        selectedBus.value,
        chosen.value,
        chosenTour.value
      );
    };*/

    const setProceedValues = () => {
      if (chosenTourGuide.value != '')
        assignGuide(chosenGroup.value, chosenTourGuide.value);
      else if (chosenTourBus.value != '') {
        assignTransportRequest(chosenTourBus.value);
      }
      closeModalWindow();
      setPeriod(vCalendar.value.innerText);
      filter(
        selectedType.value,
        selectedTour.value,
        selectedGuide.value,
        selectedBus.value,
        chosen.value,
        chosenTour.value
      );
    };

    const assign = () => {
      openModalWindow(null);
    };

    const setSelectedDays = () => {
      if (chosenTourGuide.value != '')
        assignGuideToDate(chosenTourGuide.value, selectedDaysTours.value);
      else if (chosenTourBus.value != '') {
        assignTransportToDate(chosenTourBus.value, selectedDaysTours.value);
      }
      closeModalWindow();
    };

    const resetSelectedDays = () => {
      closeModalWindow();
      selectedDaysTours.value = [];
      setPeriod(vCalendar.value.innerText);
      selectedType.value = '';
      selectedTour.value = '';
      selectedGuide.value = '';
      selectedBus.value = '';
      chosen.value = '';
      chosenTour.value = '';
      filter(
        selectedType.value,
        selectedTour.value,
        selectedGuide.value,
        selectedBus.value,
        chosen.value,
        chosenTour.value
      );
    };

    return {
      setSelectedDays,
      assign,
      attributes,
      openModalWindow,
      closeModalWindow,
      dayInfo,
      isOpen,
      modalWindowHeader,
      vCalendar,
      amountEvents,
      month_year,
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
      leftSide,
      chosenTourVuew,
      chosenTourGuide,
      chosenTour,
      chosen,
      optionsChosen,
      chosenTourBus,
      selectedDaysTours,
      optionsSelectedTourForBuses,
      setBus,
      setGuide,
      setTour,
      setType,
      setView,
      resetOptions,
      setChosen,
      setChosenTour,
      setChosenTourGuide,
      setChosenTourBus,
      setChosenPoints,
      setGroup,
      setProceedValues,
      groups,
      chosenGroup,
      littleView,
      selectDays,
      setClass,
      chosenDay,
      resetSelectedDays,
      // unSetChosenPoints,
    };
  },
};
</script>

<style>
select {
  border: 2px solid #eeeeee !important;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: none !important;
  background-color: white;
  width: 130px;
  height: 40px;
  background-image: url('/src/assets/images/arrowDown.svg');
  background-position: calc(100% - 20px) center;
  background-repeat: no-repeat;
  font-size: x-small;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
select:focus-visible,
select:focus {
  border: 2px solid #dd6497 !important;
  outline: none !important;
}
.pinkContainer {
  border: 1px solid rgba(203, 49, 113, 1);
  background-color: rgba(255, 246, 250, 1);
  width: 100%;
  height: 100%;
}
input {
  border: 2px solid hsla(335, 61%, 49%, 1);
}
input:checked {
  border: 6px solid hsla(335, 61%, 49%, 1);
}
@media (min-width: 1681px) and (max-width: 1920px) {
  .vc-day {
    height: 140px;
    width: 230px;
  }
  .barselona,
  .barselonaPrivate,
  .sagrada,
  .sagradaPrivate,
  .montserrat,
  .montserratPrivate,
  .tapas,
  .tapasPrivate,
  .park,
  .parkPrivate {
    width: 170px;
    height: 90px;
  }
}

@media (width: 1680px) {
  .vc-day {
    height: 130px;
    width: 195px;
  }
  .barselona,
  .barselonaPrivate,
  .sagrada,
  .sagradaPrivate,
  .montserrat,
  .montserratPrivate,
  .tapas,
  .tapasPrivate,
  .park,
  .parkPrivate {
    width: 170px;
    height: 84px;
  }
}

@media (width: 1600px) {
  .vc-day {
    height: 110px;
    width: 180px;
  }
  .barselona,
  .barselonaPrivate,
  .sagrada,
  .sagradaPrivate,
  .montserrat,
  .montserratPrivate,
  .tapas,
  .tapasPrivate,
  .park,
  .parkPrivate {
    width: 150px;
    height: 60px;
  }
}

.vc-arrow.is-left {
  width: 35px;
  height: 35px;
  border: 2px solid #858585;
  border-radius: 50%;
  color: #858585;
}
.vc-arrow.is-right {
  width: 35px;
  height: 35px;
  border: 2px solid #858585;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 0.3%;
  color: #858585;
}
.vc-header {
  justify-content: flex-start !important;
  margin-left: 7%;
  @media screen and (max-width: 800px) {
    margin-left: 15%;
  }
}
.vc-day {
  border: 1px solid hsl(0, 0%, 87%);
  min-height: 88px;
  width: 100%;
}
.vc-weekday {
  color: hsl(335, 61%, 49%);
  background-color: hsl(333, 100%, 98%);
  border: 1px solid hsl(0, 0%, 87%);
}
.vc-weeks {
  padding-top: 2%;
}
.day {
  color: #464646;
}
.description {
  width: 90%;
  height: 60%;
}
.container {
  width: 100%;
  text-align: center;
}
.vc-pane-container {
  min-width: 1200px;
  height: 100%;
}
.todayDay {
  color: white;
  background-color: hsl(335, 61%, 49%);
  border-left: 5px solid hsl(335, 61%, 49%);
  border-right: 5px solid hsl(335, 61%, 49%);
  border-radius: 100%;
}
.barselona {
  color: #e955a5;
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: #ffecf7;
  border-left: 2px solid #e955a5;
}
.barselonaPrivate {
  color: #e955a5;
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: #ffecf7;
  border: 2px dashed #e955a5;
}
.sagrada {
  color: hsl(299, 77%, 62%);
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: hsl(303, 100%, 96%);
  border-left: 2px solid hsl(299, 77%, 62%);
}
.sagradaPrivate {
  color: hsl(299, 77%, 62%);
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: hsl(303, 100%, 96%);
  border: 2px dashed hsl(299, 77%, 62%);
}
.montserrat {
  color: hsl(0, 100%, 69%);
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: hsl(0, 100%, 96%);
  border-left: 2px solid hsl(0, 100%, 69%);
}
.montserratPrivate {
  color: hsl(0, 100%, 69%);
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: hsl(0, 100%, 96%);
  border: 2px dashed hsl(0, 100%, 69%);
}
.tapas {
  color: hsl(205, 77%, 62%);
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: hsl(208, 100%, 96%);
  border-left: 2px solid hsl(205, 77%, 62%);
}
.tapasPrivate {
  color: hsl(205, 77%, 62%);
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: hsl(208, 100%, 96%);
  border: 2px dashed hsl(205, 77%, 62%);
}
.park {
  color: hsl(266, 77%, 62%);
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: hsl(284, 100%, 96%);
  border-left: 2px solid hsl(266, 77%, 62%);
}
.parkPrivate {
  color: hsl(266, 77%, 62%);
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: hsl(284, 100%, 96%);
  border: 2px dashed hsl(266, 77%, 62%);
}
.best {
  color: hsla(328, 77%, 62%, 1);
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: hsl(284, 100%, 96%);
  border-left: 2px solid hsl(266, 77%, 62%);
}
.bestPrivate {
  color: hsla(328, 77%, 62%, 1);
  font-size: 10px;
  width: 150px;
  height: 50px;
  background-color: hsl(284, 100%, 96%);
  border: 2px dashed hsl(266, 77%, 62%);
}
.vc-popover-content-wrapper.is-interactive {
  display: none;
}
.pe-5 {
  padding-right: 0rem !important;
}
</style>
