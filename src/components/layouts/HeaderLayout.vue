<template>
  <header class="bg-body">
    <div
      class="d-flex align-items-center justify-content-center justify-content-between border-bottom"
    >
      <section class="w-15 border-right h-100 border-end py-1">
        <div class="d-flex align-items-end px-3">
          <img
            src="/src/assets/images/LogoB.svg"
            alt="Logo"
            style="height: 45px"
          />
          <img
            src="/src/assets/images/Logo.svg"
            alt="Logo"
            style="height: 45px; margin-left: 5px"
          />
        </div>
      </section>

      <section class="border-start h-100 p-1">
        <div
          class="d-flex flex-row flex-nowrap border rounded text-center bg-white logout-btn"
          style="margin-right: 20px; padding: 9px; cursor: pointer"
          @click="logout"
        >
          <div
            class="d-flex align-items-center justify-content-center"
            style="margin-left: 12px"
          >
            <span style="font-family: Hanken Grotesk, serif; color: #464646"
              >Log Out</span
            >
          </div>
          <img
            src="/src/assets/images/logOutDoor.svg"
            alt="logOutDoor"
            style="margin: 7px"
          />
        </div>
      </section>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '../../composebles/auth.ts';
import { useNotifications } from '../../composebles/notifications';

const { logout } = useAuth();
const { watchNotifications } = useNotifications();

watchNotifications();
</script>

<style>
.logout-btn {
  transition: all 0.2s ease-in-out;
}
.logout-btn:hover {
  box-shadow: 0 0 30px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease-in-out;
}
.logout-btn:active {
  box-shadow: 0 0 30px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease-in-out;
}
</style>
