<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Initialize auth on app start
const { initAuth } = useAuth()

onMounted(() => {
  initAuth()
})
</script>
