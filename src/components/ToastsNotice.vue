<template>
  <teleport to="#portal-toast">
    <TransitionGroup name="notificationList" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="overflow-hidden bg-white shadow-sm rounded d-flex mb-2 relative z-index-1500"
      >
        <div
          :class="[toast.type === 'success' ? 'bg-green' : 'bg-red']"
          class="d-flex justify-content-center align-items-center border-end bg-red"
          style="width: 60px"
        >
          <img
            v-if="toast.type === 'success'"
            src="/src/assets/images/green_arrow.svg"
            alt="image"
          />
          <img
            v-if="toast.type === 'error'"
            src="/src/assets/images/shape.svg"
            alt="image"
          />
        </div>
        <div class="d-flex flex-column p-1">
          <div
            class="d-flex justify-content-between flex-nowrap align-items-center pb-1"
          >
            <strong class="pe-4 text-sm">Message</strong>
            <img
              src="/src/assets/images/closeX.svg"
              alt="CloseX"
              style="width: 14px; height: 14px; cursor: pointer"
              @click="hideToast(toast.id)"
            />
          </div>
          <div v-if="toast.message.text" class="text-sm font-medium pe-3">
            {{ toast.message.text }}
          </div>
        </div>
      </div>
    </TransitionGroup>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { usePageToasts } from '../composebles/use-toast';

export default defineComponent({
  setup() {
    const { state, removeToast } = usePageToasts();
    const toasts = computed(() => state.toasts);
    const hideToast = (id: number) => {
      removeToast(id);
    };

    return {
      toasts,
      hideToast,
    };
  },
});
</script>

<style>
.notificationList-move,
.notificationList-enter-active,
.notificationList-leave-active {
  transition: all 1s ease;
}

.notificationList-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.notificationList-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.notificationList-leave-active {
  position: absolute;
}

.bg-red {
  background: #fff1f7;
}
.bg-green {
  background: #eafff9;
}
</style>
