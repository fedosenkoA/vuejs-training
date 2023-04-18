<template>
  <div
    v-for="(menuItem, menuIndex) in menuItems"
    :key="menuIndex"
    class="me-3 mb-3 box-shadow h-50"
    style="min-width: 360px; width: 500px"
  >
    <div class="d-flex flex-column p-1 pb-2 border bg-info rounded h-100">
      <div class="d-flex p-1">
        <div
          class="rounded-5 d-flex align-items-center justify-content-center"
          style="background: #ffe1ee; height: 38px; width: 38px"
        >
          <img :src="menuItem.icon" alt="icon" />
        </div>
        <div class="d-flex align-items-center p-1 text-primary">
          <strong>
            {{ menuItem.label }}
          </strong>
        </div>
      </div>
      <div class="d-flex flex-column rounded border bg-white">
        <div class="p-1">
          <img :src="menuItem.image" alt="image" style="max-width: 456px" />
        </div>
        <ul class="p-1">
          <strong>
            {{ menuItem.listTitle }}
          </strong>
          <li
            v-for="(item, index) in menuItem.list"
            :key="index"
            class="small ms-3 text-muted"
          >
            {{ item }}
          </li>
        </ul>
        <div class="w-100" style="border-bottom: 1px dashed #dedede"></div>
        <div class="p-1">
          <router-link class="w-100" :to="menuItem.link">
            <ButtonWhiteComponent
              :label="'View page'"
              style="width: 100%"
            ></ButtonWhiteComponent>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonWhiteComponent from '../../kits/ButtonWhiteComponent.vue';
import { watchEffect } from 'vue';

const menuItems = [
  {
    label: 'Guide page',
    icon: '/src/assets/images/m_guide.svg',
    image: '/src/assets/images/m_guide.png',
    listTitle: 'On the guide page, you can:',
    list: [
      'Create, update, delete, invite guides;',
      'View profile of personal guide profile, view list of guides.',
    ],
    link: '/management/guides',
  },
  {
    label: 'Restaurant page',
    icon: '/src/assets/images/m_fog.svg',
    image: '/src/assets/images/m_restaurant.png',
    listTitle: 'On the restaurant page, you can:',
    list: [
      'Create, update, delete, invite restaurants;',
      'View restaurant profiles, list of restaurants.',
    ],
    link: '/management/restaurant',
  },
  {
    label: 'Restaurant route page',
    icon: '/src/assets/images/m_guide.svg',
    image: '/src/assets/images/m_routes.png',
    listTitle: 'On the restaurant route page, you can:',
    list: ['Create, update, delete routes;', 'View list of routes.'],
    link: '/management/routes',
  },
  {
    label: 'Bus company page',
    icon: '/src/assets/images/m_bus.svg',
    image: '/src/assets/images/m_transport.png',
    listTitle: 'On the bus company page, you can:',
    list: [
      'Create, update, delete, invite bus companies;',
      'View list of bus companies.',
    ],
    link: '/management/transport',
  },
  {
    label: 'User access management',
    icon: '/src/assets/images/m_guide.svg',
    image: '/src/assets/images/m_managers.png',
    listTitle: 'On the user access page, you can:',
    list: [
      'Create, update, delete admins;',
      'Invite admins to web application.',
    ],
    link: '/management/managers',
  },
];
</script>

<style scoped></style>
