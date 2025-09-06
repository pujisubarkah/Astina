<template>
  <div class="min-h-screen bg-base-100 flex font-poppins">
    <!-- Sidebar -->
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header />
      <!-- Main Content Area -->
      <main class="flex-1 p-6 bg-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// Initialize auth for main layout
const { initAuth, isLoggedIn } = useAuth()
const route = useRoute()

// Initialize auth when layout mounts
onMounted(() => {
  initAuth()
})

// Only redirect to login if user is clearly not authenticated
// and not during the login process
watch(isLoggedIn, (newValue) => {
  if (process.client && !newValue) {
    // Don't redirect if already on login/home page
    if (route.path !== '/' && route.path !== '/login') {
      // Add delay to avoid interfering with login redirect
      setTimeout(() => {
        if (!isLoggedIn.value) {
          console.log('User not authenticated, redirecting to login')
          navigateTo('/')
        }
      }, 500)
    }
  }
}, { immediate: false }) // Don't run immediately on mount
</script>

<style scoped>
/* Tambahkan style khusus layout main di sini jika diperlukan */
</style>
