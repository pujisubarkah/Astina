<template>
  <div class="min-h-screen bg-base-100 flex flex-col">
    <!-- Navigation Bar -->
    <Navbar />
    
    <!-- Main Content Area -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
// Import components (auto-imported by Nuxt)
// Navbar and Footer components will be automatically imported from ~/components/
</script>

<style scoped>
/* Additional layout-specific styles can be added here if needed */
</style>
