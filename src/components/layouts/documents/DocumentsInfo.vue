<template>
  <div
    class="container"
    style="border-bottom: 1px dotted rgba(222, 222, 222, 1)"
  >
    <div
      class="text-start text-black-50 w-100 fw-bold fs-5"
      style="margin-left: 4%; padding-top: 1%"
    >
      Tour info
    </div>
    <div class="container fw-bold" style="margin-left: 5%; padding-top: 1%">
      <div class="row">
        <div class="col">Date</div>
        <div class="col">Tour</div>
      </div>
      <div class="row">
        <div class="col">
          <InputComponent
            id="date_range"
            v-model="properties.date_range"
            :default-value="defaultDate"
            style="
              padding-bottom: 0 !important;
              width: 75% !important;
              height: 90% !important;
            "
            type="date"
            name="unavailable_on"
            required
            autofocus
            :placeholder="'Select day'"
            @update:modelValue="setDate"
          />
        </div>
        <div class="col">
          <SelectDocuments
            id="tour"
            required
            style="
              padding-bottom: 0 !important;
              width: 75% !important;
              height: 90% !important;
            "
            :options="tourOptions"
            :model-value="properties.tour_name"
            :default-value="props.tour_name ? props.tour_name : 'Tour'"
            @updateInput="setTour"
          />
        </div>
      </div>
    </div>
    <div class="container fw-bold" style="margin-left: 5%; margin-bottom: 5px">
      <div class="row">
        <div class="col">Museum</div>
      </div>
      <div class="row">
        <div class="col">
          <SelectDocuments
            id="museum"
            style="
              padding-bottom: 0 !important;
              width: 75% !important;
              height: 90% !important;
            "
            :options="museumsOptions"
            :model-value="properties.museum"
            :default-value="props.museum ? props.museum : 'Museum'"
            @updateInput="setMuseum"
          />
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>

  <div class="container fw-bold" style="margin-left: 5%; margin-top: 5px">
    <div class="row text-start text-black-50" style="font-weight: 600">
      Group info
    </div>
    <div class="container">
      <div class="row">
        <div class="col">Group ID</div>
        <div class="col">Number of tickets</div>
      </div>
      <div class="row">
        <div class="col">
          <SelectDocuments
            id="group_id"
            style="
              padding-bottom: 0 !important;
              width: 75% !important;
              height: 90% !important;
            "
            :options="groupOptions"
            :model-value="properties.group_id"
            :default-value="
              props.group_id ? `Group_${props.group_id}` : 'Group'
            "
            @updateInput="setGroup"
          />
        </div>
        <div class="col">
          <InputComponent
            id="price"
            v-model="ticketsAmount"
            :default-value="defaultAmountTickets"
            style="
              padding-bottom: 0 !important;
              width: 75% !important;
              height: 90% !important;
            "
            :height="'50px'"
            class="w-25"
            type="price"
            name="unavailable_on"
            required
            autofocus
            @update:modelValue="setAmount"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-6">Total price</div>
        <div class="col-6">Ticket time</div>
      </div>
      <div class="row">
        <div class="col-6">
          <InputComponent
            id="amount"
            v-model="totalPrice"
            :default-value="defaultTotalPrice"
            style="
              padding-bottom: 0 !important;
              width: 75% !important;
              height: 90% !important;
            "
            :height="'50px'"
            class="w-25"
            type="price"
            name="unavailable_on"
            required
            autofocus
            @update:modelValue="setPrice"
          />
        </div>
        <div class="col-6">
          <InputComponent
            id="date_range"
            v-model="time"
            :default-value="defaultTime"
            style="
              padding-bottom: 0 !important;
              width: 75% !important;
              height: 90% !important;
            "
            :height="'50px'"
            class="w-25"
            type="time"
            name="unavailable_on"
            required
            autofocus
            :placeholder="'Select time'"
            @update:modelValue="setTime"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">Prepaid / Paid</div>
      </div>
      <div class="row">
        <div class="col">
          <SelectDocuments
            id="group_id"
            style="
              padding-bottom: 0 !important;
              width: 75% !important;
              height: 90% !important;
            "
            :default-value="defaultPayment"
            :options="optionsPayment"
            :model-value="payment"
            @updateInput="setPayment"
          />
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>

  <div
    class="container"
    style="border: 2px dotted rgba(222, 222, 222, 1); margin-top: 5px"
  >
    <div class="row-6 d-flex justify-content-center align-items-center pt-1">
      Upload document
    </div>
    <div
      class="row-6 d-flex justify-content-center align-items-center pt-1 pb-1"
    >
      <label
        for="file-upload"
        class="custom-file-upload"
        style="color: rgba(133, 133, 133, 1)"
      >
        Click here to upload photo
      </label>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        style="display: none"
        capture
        @change="onFileChanged($event)"
      />
    </div>
    <div
      v-if="!set"
      class="row-6 d-flex justify-content-center align-items-center pt-1 pb-1"
    >
      Don't duplicate files
    </div>
  </div>

  <div
    class="container mt-1"
    style="
      border-bottom: 2px dotted rgba(203, 49, 113, 1);
      border-top: 2px dotted rgba(203, 49, 113, 1);
    "
  >
    <div class="row">
      <div
        class="col d-flex justify-content-center align-items-center"
        style="color: rgba(203, 49, 113, 1); font-weight: 400"
      >
        Add new group
        <img
          src="../../../assets/images/people_audience.svg"
          style="margin-left: 1%"
        />
      </div>
    </div>
  </div>

  <div class="container mt-1 mb-1">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-6">
        <ButtonComponent :label="'Save'" style="width: 90%" @click="save" />
      </div>
      <div class="col-6">
        <ButtonWhiteComponent
          :label="'Cancel'"
          style="width: 90%"
          @click="confirm"
        />
      </div>
    </div>
  </div>
  <DocumentsModalWindow :is-open="isOpen" @closeModalWindow="closeModalWindow">
    <template #body>
      <div class="flex container">
        <div
          class="row-4 d-flex justify-content-center align-items-center pt-1 ps-1 pe-1"
        >
          Are you sure you want to close window?
        </div>
        <div
          class="row-4 d-flex justify-content-center align-items-center ps-1 pe-1"
        >
          The information will not be safed
        </div>
        <div
          class="row-4 d-flex justify-content-center align-items-center"
          style="margin-top: 10px"
        >
          <div class="col d-flex justify-content-center align-items-center">
            <ButtonComponent
              :label="'Yes'"
              style="width: 75%"
              @click="setViewDocuments"
            />
          </div>
          <div class="col d-flex justify-content-center align-items-center">
            <ButtonComponent
              :label="'No'"
              style="width: 75%"
              @click="closeModalWindow"
            />
          </div>
        </div>
      </div>
    </template>
  </DocumentsModalWindow>
</template>

<script setup>
import InputComponent from './InputComponent.vue';
import SelectDocuments from './SelectDocuments.vue';
import { useDocuments } from '../../../composebles/documents.ts';

import ButtonWhiteComponent from '../../kits/ButtonWhiteComponent.vue';
import ButtonComponent from '../../kits/ButtonComponent.vue';
import { ref, computed, watch, onMounted } from 'vue';
import DocumentsModalWindow from './DocumentsModalWindow.vue';

const {
  getTours,
  tours,
  getMuseums,
  museums,
  globalDocumentList,
  uploadDocuments,
  deleteDocument,
  createMuseumTicket,
  createMuseumTicketNewGroup,
} = useDocuments();

const props = defineProps({
  group_id: Number,
  date: String,
  museum: String,
  tour_name: String,
  tickets: [],
  addedTickersArray: [],
  deletedTicketsArray: [],
});

const properties = ref({
  museum: '',
  date_range: '',
  tour_name: '',
  group_id: '',
});

const totalPrice = ref(0.0);
const ticketsAmount = ref(0);
const time = ref('');

const defaultTime = ref('');
const defaultDate = ref('');

const set = ref(true);
const isOpen = ref(false);

const defaultAmountTickets = ref('');
const defaultTotalPrice = ref(0);
const defaultPayment = ref('');

const getTime = () => {
  if (props.date) {
    const mins =
      new Date(props?.date).getMinutes() > 10
        ? new Date(props?.date).getMinutes()
        : `0${new Date(props?.date).getMinutes()}`;

    defaultTime.value = `${new Date(props?.date).getHours()}:${mins}`;
  }
};

const getDate = () => {
  if (props.date) {
    defaultDate.value = `${new Date(props?.date).getFullYear()}-${new Date(
      props?.date
    ).getMonth()}-${new Date(props?.date).getDate()}`;
  }
};

const getTotalPrice = () => {
  let price = 0;
  if (props.tickets) {
    props?.tickets.forEach((museumTicket) => {
      price += museumTicket.amount;
    });
    defaultTotalPrice.value = price;
  }
};

const getAmount = () => {
  if (props.tickets) {
    defaultAmountTickets.value = props.tickets.amount;
  }
};

const getStatus = () => {
  if (props.tickets) {
    defaultPayment.value = props.tickets.type === 'PAID' ? 'Paid' : 'Prepaid';
  }
};

const payment = ref('');
const optionsPayment = [
  {
    value: 'Paid',
    label: 'Paid',
  },
  {
    value: 'Prepaid',
    label: 'Prepaid',
  },
];

const setDate = (val) => {
  properties.value.date_range = val;
};
const setTime = (val) => {
  time.value = val;
};

const setAmount = (val) => {
  ticketsAmount.value = val;
};

const setPrice = (val) => {
  totalPrice.value = val;
};

const museumsOptions = ref([]);
const tourOptions = ref([]);
const groupOptions = ref([]);

const groups = ref([]);
const file = ref('');
const form = ref('');
const newGroup = ref(false);

onMounted(() => {
  getTotalPrice();
  getTime();
  getDate();
  getAmount();
  getStatus();

  getMuseums().then(() => {
    if (props.museum != undefined) {
      museumsOptions.value = [
        {
          value: props.museum,
          label: props.museum,
        },
      ];
    } else {
      museums.value.forEach((el) => {
        museumsOptions.value.push({
          value: el.name,
          label: el.name,
        });
      });
    }
  });
  getTours().then(() => {
    if (props.tour_name != undefined) {
      tourOptions.value = [
        {
          value: props.tour_name,
          label: props.tour_name,
        },
      ];
    } else {
      tours.value.forEach((el) => {
        tourOptions.value.push({
          value: el.name,
          label: el.name,
        });
      });
    }
  });

  if (props.group_id != undefined) {
    groupOptions.value = [
      {
        value: `Group_${props.group_id}`,
        label: `Group_${props.group_id}`,
      },
    ];
  }
});

function getRandomInt() {
  return Math.floor(Math.random() * 1000);
}

const emit = defineEmits(['setDocument', 'setViewDocuments']);
const setDocument = () => {
  emit('setDocument', {
    id: getRandomInt(),
    path: file.value,
    group_id: properties.value.group_id,
  });
};

const computedAddedTickersArray = computed(() => props.addedTickersArray);

function onFileChanged($event) {
  console.log('aaaaaaaaaa');
  const target = $event.target;
  if (target && target.files) {
    file.value = target.files[0];

    const check = computedAddedTickersArray.value.filter(
      (el) => el.documents.path.name == file.value.name
    );
    if (check.length > 0) set.value = false;

    /*computedAddedTickersArray.value?.forEach((el) => {
      console.log(
        el.documents.path.name,
        file.value.name,
        el.documents.path.name == file.value.name
      );
    });*/
    if (set.value) setDocument();
    ticketsAmount.value = ticketsAmount.value + 1;
    if (props.tickets.length != 0) {
      totalPrice.value = totalPrice.value + props.tickets[0].amount;
    } else totalPrice.value = 0;
  }
}

const setViewDocuments = () => {
  emit('setViewDocuments', {
    view: 'list view',
  });
};

const getIdMuseumAndRate = () => {
  let idRate = 0;
  let idMuseum = 0;
  globalDocumentList.value.forEach((el) => {
    if (el.rate.name == properties.value.tour_name) {
      idRate = el.rate.id;
    }
  });
  museums.value.forEach((el) => {
    if (el.name == properties.value.museum) idMuseum = el.id;
  });
  return [idRate, idMuseum];
};

async function save() {
  if (props.addedTickersArray) {
    const ids = getIdMuseumAndRate();
    if (payment.value === 'Paid') payment.value = 'PAID';
    else payment.value = 'PREPAID';

    createMuseumTicket(
      properties.value.date_range,
      ids[0],
      ids[1],
      properties.value.group_id,
      time.value,
      payment.value,
      ticketsAmount.value,
      totalPrice.value
    ).then((data) => {
      props.addedTickersArray.forEach((el) => {
        uploadDocuments(Number(data.id), el.documents.path);
      });
      setViewDocuments();
    });
  } else if (props.deletedTicketsArray) {
    try {
      props.deletedTicketsArray.forEach((el) => {
        deleteDocument(el.id);
      });
      setViewDocuments();
    } catch (error) {
      form.value = '';
      file.value = null;
    }
  }
}

const addGroup = () => {
  newGroup.value = true;
};

const setGroupOptions = () => {
  let groupsArray = [];
  globalDocumentList.value.forEach((el) => {
    if (el.rate.name == properties.value.tour_name) {
      el.groups.forEach((group) => {
        groupsArray.push({
          value: `Group_${group.id}`,
          label: `Group_${group.id}`,
        });
      });
    }
  });
  groupOptions.value = groupsArray;
};

const setGroup = (val) => {
  properties.value.group_id = val;
};
const setMuseum = (val) => {
  properties.value.museum = val;
};
const setPayment = (val) => {
  payment.value = val;
};
const setTour = (val) => {
  properties.value.tour_name = val;
  setGroupOptions();
};

const confirm = () => {
  isOpen.value = true;
};
const closeModalWindow = () => {
  isOpen.value = false;
};
</script>
