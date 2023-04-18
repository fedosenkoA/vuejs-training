<template>
  <div class="container-fluid row">
    <AuthLeftImageLayout class="col p-0 w-100"></AuthLeftImageLayout>
    <div class="col w-50 align-self-center">
      <form
        class="mx-auto bg-white border p-5 br-5 rounded w-50"
        name="form"
        style="
          max-width: 492px;
          box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.04);
        "
        @submit.prevent="formSubmit"
      >
        <h3 class="mb-3"><strong>Sign in to admin panel</strong></h3>
        <div class="mb-3">
          <InputComponent
            id="email"
            v-model="form.email"
            :label="'Login'"
            type="email"
            :class="[errors.email ? 'is-invalid' : '']"
            :error-message="errors.email"
            name="email"
            required
            autofocus
            :placeholder="'Enter login'"
          />
          <InputComponent
            id="password"
            v-model="form.password"
            :label="'Password'"
            type="password"
            name="password"
            :class="[errors.password ? 'is-invalid' : '']"
            :error-message="errors.password"
            :placeholder="'Enter password'"
            required
          />
        </div>
        <div>
          <div class="btn-toolbar justify-content-between mb-4">
            <ButtonComponent
              class="w-100"
              type="submit"
              :label="'Sign in'"
            ></ButtonComponent>
          </div>
          <div class="border-top ps-2 pe-2 pt-2 d-flex justify-content-center">
            <router-link to="/forgot-password">
              Forgot my password?
            </router-link>
          </div>
          <Transition name="fade">
            <div
              v-if="message"
              class="bg-info rounded mt-2"
              style="padding: 15px"
            >
              <div class="d-flex justify-content-center">
                <img
                  class="col me-1"
                  src="/src/assets/images/shape.svg"
                  alt="Image"
                  style="max-width: 25px; max-height: 25px"
                />
                <p class="col text-primary small m-0" style="max-width: 245px">
                  {{ message }}
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { router } from '../../router/index.ts';
import AuthLeftImageLayout from '../../components/layouts/AuthLeftImageLayout.vue';
import { useAuth } from '../../composebles/auth.ts';
import ButtonComponent from '../../components/kits/ButtonComponent.vue';
import InputComponent from '../../components/kits/InputComponent.vue';
import { graphqlValidationErrorParser } from '../../helpers/helpers.ts';

const { login } = useAuth();

const form = ref({ email: '', password: '', device: 'web' });
const errors = ref({
  email: '',
  password: '',
});
const message = ref('');

const formSubmit = async () => {
  await login(form.value)
    .then(() => {
      router.push({ name: 'dashboard' }).then(() => router.go(0));
    })
    .catch((response) => {
      if (response.extensions.category === 'validation') {
        graphqlValidationErrorParser(
          response.extensions['validation'],
          errors.value
        );
      }
      if (response.extensions.category === 'authentication') {
        errors.value.email = '';
        errors.value.password = '';
        message.value = response.message;
      }
    });
};
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
