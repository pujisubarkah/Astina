<template>
  <aside class="w-64 bg-white border-r shadow-sm min-h-screen">
    <div class="px-6 py-6 border-b">
      <h3 class="text-lg font-semibold text-gray-800">Menu</h3>
    </div>

    <nav class="p-4 space-y-2">
      <NuxtLink class="block px-3 py-2 rounded hover:bg-gray-100" :to="$route.path + '/upload-surat'">Upload Surat Usulan</NuxtLink>
      <NuxtLink class="block px-3 py-2 rounded hover:bg-gray-100" :to="$route.path + '/upload-peserta'">Upload Data Peserta</NuxtLink>
      <NuxtLink class="block px-3 py-2 rounded hover:bg-gray-100" :to="$route.path + '/master-usulan'">Data Master Usulan</NuxtLink>
      <button @click="doLogout" class="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-red-600">Logout</button>
    </nav>

    <div class="mt-auto px-4 py-4 border-t text-sm text-gray-500">
      <div>© 2025 ASTINA</div>
    </div>
  </aside>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'
const { logout } = useAuth()

const doLogout = async () => {
  try {
    await logout()
    // redirect to home
    window.location.href = '/'
  } catch (e) {
    console.error('Logout error', e)
  }
}
</script>

<style scoped>
aside { background: linear-gradient(180deg, #ffffff, #f8fafc); }
</style>
