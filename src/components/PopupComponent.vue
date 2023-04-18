<template>
  <div class="backdrop" @click="emit('deleteAnswer', false)">
    <div class="popup">
      <header class="header">
        <div class="d-flex">
          <h1 class="headerText" style="width: 435px">Deleting a guide</h1>
          <img
            style="height: 16px; width: 16px; margin-top: 41px; cursor: pointer"
            src="/src/assets/images/closeX.svg"
            alt="CloseX"
            @click="emit('deleteAnswer', false)"
          />
        </div>
      </header>
      <div>
        <div class="row d-grid justify-content-center">
          <span
            style="
              padding-top: 27px;
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              font-family: Hanken Grotesk Medium, serif;
              color: #464646;
            "
            >Are you sure you want to delete?</span
          >
          <span
            class="d-flex justify-content-center"
            style="
              padding-top: 11px;
              font-family: Hanken Grotesk Info, serif;
              color: #6b6b6b;
              font-weight: 400;
              font-style: normal;
            "
            >The data will not be saved</span
          >
        </div>
      </div>
      <footer class="row">
        <div class="d-flex">
          <div class="col" style="padding-left: 32px">
            <ButtonComponent
              label="Yes"
              style="width: 200px; height: 46px"
              @click="emit('deleteAnswer', true)"
            ></ButtonComponent>
          </div>
          <div class="col" style="padding-left: 24px">
            <ButtonWhiteComponent
              label="No"
              style="width: 200px; height: 46px"
              @click="emit('deleteAnswer', false)"
            ></ButtonWhiteComponent>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from './kits/ButtonComponent.vue';
import ButtonWhiteComponent from './kits/ButtonWhiteComponent.vue';

const emit = defineEmits(['deleteAnswer']);
</script>

<style>
.popup {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 487px;
  height: 281px;
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
