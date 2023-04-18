<template>
  <div
    class="w-100 d-flex align-items-center justify-content-center"
    style="height: 100vh"
  >
    <form
      class="d-flex flex-column justify-content-between bg-white rounded border w-100"
      style="
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.04);
        max-width: 600px;
        min-height: 150px;
      "
      @submit.prevent="formSubmit"
    >
      <div style="border-bottom: 1px solid #dedede">
        <div class="d-flex justify-content-between px-4 py-2">
          <h2>Food preferences</h2>
          <div class="d-flex align-items-center justify-content-center"></div>
        </div>
      </div>
      <div class="d-flex flex-column pt-2 px-4">
        <div class="">
          <p class="text-muted">
            Choose the ingredients we should exclude from your dish.
          </p>
        </div>
        <div
          v-if="personsPreferences.length"
          class="d-flex flex-column mt-1"
          :class="{
            'overflow-scroll-y': personsPreferences.length > 2,
            scrollbar: personsPreferences.length > 2,
          }"
          style="max-height: 600px"
        >
          <div
            v-for="(person, key) in personsPreferences"
            :key="key"
            class="border-bottom mt-1"
          >
            <strong class="small pb-1">Person {{ key + 1 }}</strong>
            <div class="d-flex flex-wrap">
              <div
                v-for="(preference, id) in person"
                :key="key + '_' + id"
                class="tag small"
                :class="{
                  checked: preference.is_checked,
                  disabled: preference.disabled,
                }"
                @click="selectPreference(preference, key)"
              >
                {{ preference.name }}
              </div>
              <div
                class="tag small text-primary border-primary"
                :class="{ checked: exception[key] }"
                style="width: 286px"
                @click="addException(person, key)"
              >
                No food preferences
              </div>
            </div>
          </div>
        </div>

        <div class="row py-2">
          <div class="d-flex">
            <ButtonComponent
              :label="'Send'"
              style="height: 46px"
              class="me-3 w-50"
            ></ButtonComponent>
            <ButtonWhiteComponent
              class="w-50"
              label="Clear"
              style="height: 46px"
              @click="clearPreferences()"
            ></ButtonWhiteComponent>
          </div>
        </div>
        <Transition name="fade">
          <div v-if="globalError" class="rounded text-primary">
            <div
              class="text-primary border-primary rounded p-1"
              style="background: #fff1f7"
            >
              {{ globalError }}
            </div>
          </div>
        </Transition>
        <Transition name="fade">
          <div v-if="globalWasSent" class="rounded text-primary">
            <div
              class="border-primary rounded p-1 text-center"
              style="background: #eafff9; color: #24a760; border-color: #24a760"
            >
              We have received your preferences!
            </div>
          </div>
        </Transition>
      </div>
      <Transition name="fade" class="pb-1">
        <LoaderComponent v-if="globalLoading" />
      </Transition>
    </form>
  </div>
</template>

<script setup>
import ButtonComponent from '../../kits/ButtonComponent.vue';
import ButtonWhiteComponent from '../../kits/ButtonWhiteComponent.vue';
import { onMounted, ref } from 'vue';
import { usePreferencesList } from '../../../composebles/food-preferences';
import LoaderComponent from '../../kits/LoaderComponent.vue';

const { sendFoodPreferences, globalError, globalLoading, globalWasSent } =
  usePreferencesList();

const token = ref('');
const countPersons = ref('');
const preferences = [
  {
    id: 1,
    name: 'Octopus',
    is_checked: false,
    disabled: false,
  },
  {
    id: 2,
    name: 'Fish',
    is_checked: false,
    disabled: false,
  },
  {
    id: 3,
    name: 'Seafood',
    is_checked: false,
    disabled: false,
  },
  {
    id: 4,
    name: 'Meat',
    is_checked: false,
    disabled: false,
  },
  {
    id: 5,
    name: 'Red meat',
    is_checked: false,
    disabled: false,
  },
  {
    id: 6,
    name: 'Pork',
    is_checked: false,
    disabled: false,
  },
  {
    id: 7,
    name: 'Dairy products',
    is_checked: false,
    disabled: false,
  },
  {
    id: 8,
    name: 'Gluten',
    is_checked: false,
    disabled: false,
  },
  {
    id: 9,
    name: 'Egg',
    is_checked: false,
    disabled: false,
  },
  {
    id: 10,
    name: 'Shellfish',
    is_checked: false,
    disabled: false,
  },
  {
    id: 11,
    name: 'Alcohol',
    is_checked: false,
    disabled: false,
  },
  {
    id: 12,
    name: 'Sulphites',
    is_checked: false,
    disabled: false,
  },
  {
    id: 13,
    name: 'Raw food',
    is_checked: false,
    disabled: false,
  },
  {
    id: 14,
    name: 'Mushrooms',
    is_checked: false,
    disabled: false,
  },
  {
    id: 15,
    name: 'Potato',
    is_checked: false,
    disabled: false,
  },
  {
    id: 16,
    name: 'Onion',
    is_checked: false,
    disabled: false,
  },
  {
    id: 17,
    name: 'Tomato',
    is_checked: false,
    disabled: false,
  },
  {
    id: 18,
    name: 'Nuts',
    is_checked: false,
    disabled: false,
  },
  {
    id: 19,
    name: 'Others',
    is_checked: false,
    disabled: false,
  },
];

const personsPreferences = ref([]);

const exception = ref([]);

const selectPreference = (preference, key) => {
  if (preference.disabled) return;
  personsPreferences.value[key][preference.id - 1].is_checked =
    !preference.is_checked;
};

const clearPreferences = () => {
  personsPreferences.value.forEach((preference) => {
    preference.forEach((item) => {
      item.is_checked = false;
      item.disabled = false;
    });
  });
  for (let key in exception.value) {
    exception.value[key] = true;
  }
};

const addException = (preference, key) => {
  preference.forEach((item) => {
    item.is_checked = false;
    item.disabled = !exception.value[key];
  });
  exception.value[key] = !exception.value[key];
};

const preparePreferences = () => {
  let preferencesIDs = [];

  preferencesIDs = personsPreferences.value.map((person) => {
    let ids = [];
    ids = person
      .filter((preference) => {
        if (preference.is_checked) return preference;
      })
      .map((preference) => {
        return preference.id;
      });
    if (ids.length === 0) return [20];
    return ids;
  });

  return preferencesIDs;
};

const getDateFromParams = () => {
  const params = new URLSearchParams(window.location.search);
  token.value = params.get('token');
  countPersons.value = params.get('count');
};

const getPersonsPreferences = () => {
  if (countPersons.value && countPersons.value > 0) {
    for (let i = 0; i < countPersons.value; i++) {
      personsPreferences.value.push(JSON.parse(JSON.stringify(preferences)));
      exception.value.push(false);
    }
  }
};

const formSubmit = () => {
  sendFoodPreferences(preparePreferences(), token.value);
};

onMounted(() => {
  getDateFromParams();
  getPersonsPreferences();
});
</script>

<style scoped>
.tag {
  padding: 5px;
  border: 1px solid #858585;
  border-radius: 10px;
  min-width: 60px;
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
