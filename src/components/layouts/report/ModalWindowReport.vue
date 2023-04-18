<template>
  <Teleport to="#app">
    <div v-show="isOpen" class="backdrop">
      <div class="popupMore" :class="'overflow-scroll-y scrollbar'">
        <header class="header">
          <div class="d-flex">
            <h1 class="headerText" style="width: 90%">Report detail</h1>
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

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
  name: 'ModalWindow',
  props: {
    isOpen: {
      type: Boolean,
    },
  },
  emits: ['closeModalWindow'],
});
</script>

<style>
.popupMore {
  position: fixed;
  left: 55%;
  top: 45%;
  width: 700px;
  height: 500px;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 2px solid #dedede;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  overflow-x: hidden;
}

.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.16);
  z-index: 2;
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
