<template>
  <Teleport to="#app">
    <div v-if="modalData" class="backdrop">
      <div class="popup">
        <header class="header">
          <div
            class="d-flex justify-content-between ps-5 pe-3 pt-3 pb-1 border-bottom"
          >
            <div class="d-flex flex-column">
              <h4>
                <strong>Food preference</strong>
              </h4>
              <p class="text-muted">Choose food preference</p>
            </div>
            <img
              class="settable"
              style="height: 16px; width: 16px; right: -10px; cursor: pointer"
              src="/src/assets/images/closeX.svg"
              alt="CloseX"
              @click="closeModal"
            />
          </div>
        </header>
        <div class="px-5 pt-3 pb-1">
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
        </div>
        <footer class="w-100">
          <div class="d-flex px-5 pb-3 w-100">
            <ButtonComponent
              class="w-100"
              :label="'Apply'"
              @click="setPreferenceHandler"
            ></ButtonComponent>
          </div>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useGroupSwap } from '../../../composebles/group-swap';
import ButtonComponent from '../../kits/ButtonComponent.vue';
import { onMounted, ref } from 'vue';

const { closeModal, modalData, setPreference } = useGroupSwap();

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

const setPreferenceHandler = async () => {
  await setPreference(modalData);
  closeModal();
};

const selectPreference = (preference, key) => {
  if (preference.disabled) return;
  personsPreferences.value[key][preference.id - 1].is_checked =
    !preference.is_checked;
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

onMounted(() => {
  personsPreferences.value = modalData.value.map((person) => {
    return preferences.map((preference) => {
      return {
        ...preference,
        is_checked: person.foodPreferences.includes(preference.id),
      };
    });
  });
});
</script>

<style scoped>
.popup {
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 487px;
  max-width: 600px;
  height: fit-content;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 2px solid #dedede;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}

.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.16);
}

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
