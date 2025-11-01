<template>
  <div>
    <!-- Chatbot hanya tampil di halaman utama, bukan di admin atau slug -->
    <DashboardChatbot v-if="showChatbot" />
  </div>
</template>

<script setup>
// Check current route to determine if chatbot should be shown
const route = useRoute()

const showChatbot = computed(() => {
  const path = route.path
  
  // Don't show chatbot in admin pages
  if (path.startsWith('/admin')) {
    return false
  }
  
  // Don't show chatbot in slug pages (pages with dynamic parameters)
  // Examples: /provinsi/123, /project/abc, etc.
  const slugPatterns = [
    /^\/provinsi\/\d+/,  // /provinsi/[id]
    /^\/project\/\w+/,   // /project/[id] 
    /^\/[^\/]+\/[^\/]+$/ // any /something/something pattern
  ]
  
  if (slugPatterns.some(pattern => pattern.test(path))) {
    return false
  }
  
  // Show chatbot in main pages like /, /dashboard, /upload-proyek, etc.
  return true
})
</script>