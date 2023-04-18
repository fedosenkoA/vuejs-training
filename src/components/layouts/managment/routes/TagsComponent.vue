<template>
  <div>
    <div class="d-flex flex-wrap">
      <div
        v-for="(day, id) in days"
        :key="id"
        class="tag small"
        :class="{
          disabled: day.disabled,
          active: day.count,
          checked: day.is_checked,
        }"
        @click="selectDay(day)"
      >
        {{ day.name + (day.count ? ' (' + day.count + ')' : '') }}
      </div>
      <div
        class="tag small text-primary border-primary"
        :class="{ checked: exception }"
        style="width: 286px"
        @click="addException()"
      >
        Add exception
        <img src="/src/assets/images/calendar_pink.svg" alt="" />
      </div>
    </div>
    <Transition name="fade">
      <div v-if="exception">
        <InputComponent
          id="exception_date"
          v-model="exception_date"
          type="date"
          :model-value="exception_date"
          :label="'Exception date'"
          @change="emit('exception', exception_date)"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import InputComponent from '../../../kits/InputComponent.vue';

const props = defineProps({
  availableDate: {
    type: Array,
    required: true,
    default: () => [
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
  exceptionDate: {
    type: String,
    required: false,
    default: '',
  },
});

const days = ref(props.availableDate);
const exception = ref(false);
const exception_date = ref(props.exceptionDate);

const selectDay = (day) => {
  if (!day.disabled) {
    day.is_checked = !day.is_checked;
    emit('choose', days);
  }
};

const addException = () => {
  if (exception.value) {
    days.value.map((day) => {
      if (day.name !== 'Sunday') day.disabled = false;
    });
    exception.value = false;
  } else {
    days.value.map((day) => {
      day.disabled = true;
    });
    exception.value = true;
  }
};
const emit = defineEmits(['choose', 'exception']);
</script>

<style scoped>
.tag {
  padding: 5px;
  border: 1px solid #858585;
  border-radius: 10px;
  min-width: 90px;
  text-align: center;
  color: #858585;
  margin-right: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}
.tag:hover {
  cursor: pointer;
  border: 1px solid #cb3171;
  color: #cb3171;
}
.active {
  border: 1px solid #24a760;
  color: #24a760;
}
.disabled {
  cursor: not-allowed !important;
  border: 1px solid #858585 !important;
  color: #858585 !important;
  opacity: 0.5 !important;
}
.checked {
  color: white !important;
  background-color: #cb3171 !important;
  border-color: #cb3171 !important;
}
</style>
