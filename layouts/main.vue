<template>
  <div class="min-h-screen bg-base-100 flex font-poppins">
    <!-- Sidebar -->
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <!-- Navigation Bar -->
      <Navbar />
      <!-- Main Content Area -->
      <main class="flex-1">
        <slot />
      </main>
      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
// Komponen Sidebar, Navbar, Footer otomatis diimport oleh Nuxt
// Tambahkan logic khusus layout di sini jika diperlukan
</script>

<style scoped>
/* Tambahkan style khusus layout main di sini jika diperlukan */
</style>
