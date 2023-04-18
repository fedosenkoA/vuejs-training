<template>
  <div v-if="show">
    <div
      style="
        width: 556px;
        height: 460px;
        background: #ffffff;
        border: 1px solid #dedede;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.04);
        border-radius: 10px;
      "
    >
      <div style="height: 191px; border-bottom: 1px solid #dedede">
        <img
          style="
            width: 408px;
            height: 166px;
            margin-top: 24px;
            margin-left: 74px;
          "
          src="/src/assets/images/recommendationEmblem.svg"
          alt="RecommendationEmblem"
        />
      </div>
      <div style="height: 167px; border-bottom: 1px dashed #dedede">
        <span
          class="d-flex"
          style="
            font-size: 18px;
            padding-top: 24px;
            padding-left: 24px;
            font-family: Hanken Grotesk Medium, serif;
            color: #464646;
            font-weight: 600;
            line-height: 24px;
          "
          >Recommendation</span
        >
        <div>
          <div
            class="row"
            style="
              padding-top: 8px;
              color: #6b6b6b;
              padding-left: 24px;
              font-size: 18px;
              font-family: Hanken Grotesk Medium, serif;
            "
          >
            <span>1. Press start button “add new”.</span>
            <span>2. Fill all fields.</span>
            <span>3. Check result.</span>
          </div>
        </div>
      </div>
      <div style="height: 102px">
        <ButtonComponent
          style="
            margin-top: 24px;
            margin-left: 32px;
            width: 492px;
            height: 46px;
            font-family: Hanken Grotesk Medium, serif;
          "
          label="Okay, got it!"
          @click="hideSelf"
        ></ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from './kits/ButtonComponent.vue';
</script>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    hideSelf() {
      this.show = false;
    },
  },
};
</script>
<style scoped></style>
