<template>
  <Teleport to="#app">
    <div v-show="isOpen" class="backdrop" @click="close($event)">
      <div
        v-if="amountEvents > 1 && leftSide == false"
        class="popupMore"
        :class="'overflow-scroll-y scrollbar'"
      >
        <header class="header">
          <div class="d-flex">
            <h1 class="headerText" style="width: 435px">
              {{ header }}
            </h1>
            <img
              style="
                height: 16px;
                width: 16px;
                margin-top: 41px;
                cursor: pointer;
              "
              src="/src/assets/images/closeX.svg"
              alt="CloseX"
              @click="$emit('closeModalWindow')"
            />
          </div>
        </header>
        <div>
          <div class="row d-grid">
            <div>
              <slot name="body"></slot>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="amountEvents == 1 && leftSide == false && little === false"
        class="popup"
      >
        <header class="header">
          <div class="d-flex">
            <h1 class="headerText" style="width: 435px">
              {{ header }}
            </h1>
            <img
              style="
                height: 16px;
                width: 16px;
                margin-top: 41px;
                cursor: pointer;
              "
              src="/src/assets/images/closeX.svg"
              alt="CloseX"
              @click="$emit('closeModalWindow')"
            />
          </div>
        </header>
        <div>
          <div class="row d-grid">
            <div>
              <slot name="body"></slot>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="amountEvents == 1 && leftSide == true" class="popupLeft">
        <header class="header">
          <div class="d-flex">
            <h1 class="headerText" style="width: 435px">
              {{ header }}
            </h1>
            <img
              style="
                height: 16px;
                width: 16px;
                margin-top: 41px;
                cursor: pointer;
              "
              src="/src/assets/images/closeX.svg"
              alt="CloseX"
              @click="$emit('closeModalWindow')"
            />
          </div>
        </header>
        <div>
          <div class="row d-grid">
            <div>
              <slot name="body"></slot>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="little === true" class="popupLittle">
        <header class="header">
          <div class="d-flex">
            <h1 class="headerText" style="width: 435px">
              {{ header }}
            </h1>
            <img
              style="
                height: 16px;
                width: 16px;
                margin-top: 41px;
                cursor: pointer;
              "
              src="/src/assets/images/closeX.svg"
              alt="CloseX"
              @click="$emit('closeModalWindow')"
            />
          </div>
        </header>
        <div>
          <div class="row d-grid">
            <div>
              <slot name="body"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  header: {
    type: String,
    default: ' ',
  },
  amountEvents: {
    type: Number,
    default: 1,
  },
  leftSide: {
    type: Boolean,
    default: false,
  },
  little: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['closeModalWindow']);

const close = (e) => {
  if (e.target.className === 'backdrop') emit('closeModalWindow');
};
</script>

<style>
.popup {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 487px;
  height: 380px;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 2px solid #dedede;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}

.popupMore {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 487px;
  height: 380px;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 2px solid #dedede;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  overflow-x: hidden;
}

.popupLeft {
  position: fixed;
  left: 80%;
  top: 50%;
  width: 487px;
  height: 600px;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 2px solid #dedede;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}

.popupLittle {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 487px;
  height: 300px;
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
  background-color: rgba(0, 0, 0, 0.16);
  z-index: 7;
}

.header {
  font-size: 24px;
  border-bottom: 1px solid #dedede;
  height: 80px;
}

.headerText {
  width: 399px;
  height: 34px;
  padding-top: 37px;
  padding-left: 32px;
  font-size: 24px;
  color: #464646;
  font-weight: 700;
}

footer {
  position: absolute;
  bottom: 32px;
}
</style>
