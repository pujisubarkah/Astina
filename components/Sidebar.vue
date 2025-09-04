<template>
  <aside class="w-64 bg-white shadow-lg h-full flex flex-col">
    <div class="px-6 py-4 border-b">
      <h2 class="text-lg font-bold text-blue-700">Menu</h2>
    </div>
    <nav class="flex-1 px-4 py-2">
      <ul>
        <li v-if="isAdmin">
          <NuxtLink to="/dashboard" class="sidebar-link" active-class="active">Dashboard</NuxtLink>
        </li>
        <li v-if="isAdmin">
          <NuxtLink to="/setujui-proyek" class="sidebar-link" active-class="active">Setujui Proyek</NuxtLink>
        </li>
        <li v-if="!isAdmin">
          <NuxtLink to="/dashboard" class="sidebar-link" active-class="active">Dashboard</NuxtLink>
        </li>
        <li v-if="!isAdmin">
          <NuxtLink to="/upload-proyek" class="sidebar-link" active-class="active">Upload Proyek Perubahan</NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'
const { user } = useAuth()
const isAdmin = computed(() => user.value?.roleId === 1)
</script>

<style scoped>
.sidebar-link {
  display: block;
  padding: 0.75rem 1rem;
  color: #2563eb;
  border-radius: 0.375rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  transition: background 0.2s, color 0.2s;
}
.sidebar-link:hover,
.sidebar-link.active {
  background: #eff6ff;
  color: #1d4ed8;
}
</style>
