<script setup lang="ts">
import {useModalStore} from '~/stores/modal';

const modalStore = useModalStore();
</script>

<template>
  <div
      v-if="modalStore.state.component"
      id="modal-layout"
      @click.self="modalStore.close"
  >
    <!-- Assign component state && component props -->
    <Component
        :is="modalStore.state.component"
        v-bind="modalStore.state.componentProps"
        @close="modalStore.close"
    />
  </div>
</template>

<style scoped>
#modal-layout {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
