<template>
  <div>
    <!-- Chatbot tampil di semua halaman kecuali yang dikecualikan -->
    <ClientOnly>
      <DashboardChatbot v-if="showChatbot" />
    </ClientOnly>
  </div>
</template>

<script setup>
// Check current route to determine if chatbot should be shown
const route = useRoute()

const showChatbot = computed(() => {
  const path = route.path
  
  // Don't show chatbot only in specific admin pages
  if (path.startsWith('/admin') && path !== '/admin') {
    return false
  }
  
  // Don't show chatbot in specific slug pages that have issues
  const excludedPatterns = [
    /^\/provinsi\/\d+$/ // Only exclude /provinsi/[number]
  ]
  
  const isExcluded = excludedPatterns.some(pattern => pattern.test(path))
  
  // Show chatbot in most pages - only exclude specific problematic ones
  return !isExcluded
})
</script>
