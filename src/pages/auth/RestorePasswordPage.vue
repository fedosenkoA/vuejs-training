<template>
  <div class="container-fluid row">
    <AuthLeftImage class="col" />
    <div class="form-body col w-50 align-self-center">
      <form
        class="mx-auto border p-4 br-5 rounded w-50 bg-white"
        name="form"
        style="box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.04)"
        @submit.prevent="formSubmit"
      >
        <div class="mb-3 d-flex">
          <div
            class="col bg-body rounded-5 p-1 me-1"
            style="max-width: 38px; max-height: 38px"
          >
            <router-link
              to="login"
              class="d-flex align-items-center justify-content-center"
            >
              <img
                class="align-top"
                src="/src/assets/images/arrow.svg"
                alt="Image"
              />
            </router-link>
          </div>
          <h3 class="mb-3"><strong>Restore password</strong></h3>
        </div>
        <div class="mb-3">
          <InputComponent
            id="email"
            v-model="form.email"
            :label="'Login'"
            type="email"
            :class="[errors.email.isError ? 'is-invalid' : '']"
            :error-message="errors.email.errorMessage"
            name="email"
            required
            autocomplete="email"
            autofocus
            :placeholder="'Enter login'"
          />
          <InputComponent
            id="email"
            v-model="form.email"
            :label="'Login'"
            type="email"
            :class="[errors.email.isError ? 'is-invalid' : '']"
            :error-message="errors.email.errorMessage"
            name="email"
            required
            autocomplete="email"
            autofocus
            :placeholder="'Enter login'"
          />
          <InputComponent
            id="email"
            v-model="form.email"
            :label="'Login'"
            type="email"
            :class="[errors.email.isError ? 'is-invalid' : '']"
            :error-message="errors.email.errorMessage"
            name="email"
            required
            autocomplete="email"
            autofocus
            :placeholder="'Enter login'"
          />
        </div>
        <div>
          <div class="btn-toolbar justify-content-between mb-3">
            <ButtonComponent
              class="w-100"
              type="submit"
              :label="'Send email'"
            ></ButtonComponent>
          </div>
          <div
            class="border-top mb-2"
            style="
              width: calc(100% + 64px);
              height: 2px;
              left: -32px;
              position: relative;
            "
          ></div>
          <div class="bg-info rounded" style="padding: 15px">
            <div class="d-flex justify-content-center">
              <img
                class="col me-1"
                src="/src/assets/images/shape.svg"
                alt="Image"
                style="max-width: 25px; max-height: 25px"
              />
              <p class="col text-primary small m-0" style="max-width: 245px">
                We’ll send a code to restore password
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuth } from '../../composebles/auth.js';
import { router } from '../../router/index.ts';
import AuthLeftImage from '../../components/layouts/AuthLeftImageLayout.vue';
import ButtonComponent from '../../components/kits/ButtonComponent.vue';
import InputComponent from '../../components/kits/InputComponent.vue';

const { restorePassword } = useAuth();

const emit = defineEmits(['onError']);
const form = reactive({ email: '', password: '', token: '' });
const errors = reactive({
  email: { isError: false, message: '' },
  password: { isError: false, message: '' },
  token: { isError: false, message: '' },
});

const formSubmit = async () => {
  try {
    await restorePassword(form);
    router.push({ name: 'welcome' });
  } catch (error) {
    emit('onError', error);
  }
};
</script>

<style scoped></style>
