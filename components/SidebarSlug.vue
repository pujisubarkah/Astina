<template>
  <aside class="w-64 bg-gradient-to-b from-primary to-primary-focus text-primary-content shadow-xl min-h-screen flex flex-col overflow-hidden border-r border-primary-focus/20 pt-16">
    <div class="px-6 py-6 border-b border-primary-focus/20">
      <h3 class="text-lg font-semibold">Menu</h3>
    </div>

    <nav class="flex-1 p-4 space-y-2 sidebar-links">
      <NuxtLink
        :to="base + '/upload-surat'"
        class="sidebar-link"
        active-class="active"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z"/></svg>
        <span>Upload Surat Usulan</span>
      </NuxtLink>

      <NuxtLink
        :to="base + '/upload-peserta'"
        class="sidebar-link"
        active-class="active"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/></svg>
        <span>Upload Data Peserta</span>
      </NuxtLink>

      <NuxtLink
        :to="base + '/master-usulan'"
        class="sidebar-link"
        active-class="active"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
        <span>Data Master Usulan</span>
      </NuxtLink>

      <button @click="doLogout" class="sidebar-link logout text-red-200 hover:text-red-50">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        <span>Logout</span>
      </button>
    </nav>

    <div class="mt-auto px-4 py-4 border-t border-primary-focus/20 text-sm opacity-80">
      <div>© 2025 ASTINA</div>
    </div>
  </aside>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'
import { useRoute } from 'vue-router'
import { navigateTo } from '#app'

const { logout } = useAuth()
const route = useRoute()

// base path for slug pages (strip trailing slash)
const base = route.path.replace(/\/$/, '')

const doLogout = async () => {
  try {
    await logout()
    await navigateTo('/')
  } catch (e) {
    console.error('Logout error', e)
  }
}
</script>

<style scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  color: rgba(255,255,255,0.9);
  transition: all 0.15s ease;
  font-weight: 600;
  text-decoration: none;
}

.sidebar-link:hover {
  background: rgba(255,255,255,0.06);
  transform: translateX(4px);
}

.sidebar-link.active {
  background: rgba(255,255,255,0.12);
  box-shadow: 0 6px 18px rgba(2,6,23,0.12);
}

.icon { width: 18px; height: 18px; stroke-width: 1.6; }

.logout { background: transparent; border: none; cursor: pointer; }
.logout:hover { background: rgba(255,255,255,0.04); }

/* matching small scrollbar */
.sidebar-links::-webkit-scrollbar { width: 6px }
.sidebar-links::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 6px }
</style>
