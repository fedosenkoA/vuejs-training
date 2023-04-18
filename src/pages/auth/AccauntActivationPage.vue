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
          <h3 class="mb-3"><strong>Set Password</strong></h3>
        </div>
        <div class="mb-3">
          <InputComponent
            id="email"
            v-model="form.email"
            :label="'Email'"
            type="email"
            :class="[errors.email ? 'is-invalid' : '']"
            :error-message="errors.email"
            name="email"
            required
            autocomplete="email"
            autofocus
            :placeholder="'Enter email'"
          />
          <Transition name="fade">
            <InputComponent
              id="password"
              v-model="form.password"
              :label="'New password'"
              type="password"
              :class="[errors.password ? 'is-invalid' : '']"
              :error-message="errors.password"
              name="password"
              required
              autofocus
              :placeholder="'New password'"
            />
          </Transition>
          <Transition name="fade">
            <InputComponent
              id="token"
              v-model="form.token"
              :label="'Code'"
              :type="'text'"
              :class="[errors.token ? 'is-invalid' : '']"
              :error-message="errors.token"
              name="code"
              required
              :placeholder="'Enter Code'"
            />
          </Transition>
        </div>
        <div>
          <div class="btn-toolbar justify-content-between mb-3">
            <ButtonComponent
              class="w-100"
              type="submit"
              :label="'Send'"
            ></ButtonComponent>
          </div>
          <Transition name="fade">
            <div v-if="message">
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
                  <p
                    class="col text-primary small m-0"
                    style="max-width: 245px"
                  >
                    {{ message }}
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </form>
      <Transition name="fade"
        ><LoaderComponent v-if="loading" class="mt-3"
      /></Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AuthLeftImage from '../../components/layouts/AuthLeftImageLayout.vue';
import { useAuth } from '../../composebles/auth.ts';
import ButtonComponent from '../../components/kits/ButtonComponent.vue';
import InputComponent from '../../components/kits/InputComponent.vue';
import LoaderComponent from '../../components/kits/LoaderComponent.vue';
import { graphqlValidationErrorParser } from '../../helpers/helpers.ts';

const { setPassword } = useAuth();

const form = ref({ email: '', password: '', token: '', codeSent: false });
const errors = ref({
  email: '',
  password: '',
  token: '',
});
const loading = ref(false);
const message = ref('');
const formSubmit = async () => {
  loading.value = true;
  try {
    await setPassword(form.value)
      .then((response) => {
        loading.value = false;
        message.value = response
          ? 'Your account has been verified. You can start using the application.'
          : 'Check the entered data';
      })
      .catch((response) => {
        if (
          !response.extensions &&
          response.extensions.category === 'validation'
        ) {
          graphqlValidationErrorParser(
            response.extensions['validation'],
            errors.value
          );
        }
      });
  } catch (response) {
    message.value = 'Check the entered data';
    loading.value = false;
  }
};
</script>

<style scoped></style>
