<script setup lang="ts">
const authStore = useAuthStore();
authStore.loadTokenFromStorage();
</script>

<template>
  <RouterView/>
</template>
