<template>
  <div class="min-h-screen bg-base-100 flex font-poppins">
    <SidebarSlug />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 p-6 bg-gray-50 pt-20"> <!-- add extra top padding for fixed header -->
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarSlug from '@/components/SidebarSlug.vue'
import Header from '@/components/Header.vue'
</script>

<style scoped>
</style>
