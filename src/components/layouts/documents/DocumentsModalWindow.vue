<template>
  <Teleport to="#app">
    <div v-show="isOpen" class="backdrop">
      <div class="popupLittle">
        <header class="header">
          <div
            class="d-flex justify-content-end align-items-center"
            style="width: 450px"
          >
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
.popupLittle {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 487px;
  height: 200px;
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
  z-index: 2;
}
</style>
