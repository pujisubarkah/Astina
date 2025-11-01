<template>
  <aside class="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-100 shadow-xl min-h-screen flex flex-col overflow-hidden border-r border-slate-700">
    <div class="px-6 py-6 border-b border-slate-700">
      <h3 class="text-lg font-semibold">Admin Panel</h3>
      <p class="text-sm text-slate-400 mt-1">Manajemen Sistem</p>
    </div>

    <nav class="flex-1 p-4 space-y-2">
      <NuxtLink
        to="/admin/dashboard"
        class="admin-nav-link"
        active-class="active"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 5 4-4 4 4"/>
        </svg>
        <span>Dashboard</span>
      </NuxtLink>

      <NuxtLink
        to="/admin/pengajuan-sipendar"
        class="admin-nav-link"
        active-class="active"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <span>Pengajuan Sipendar</span>
      </NuxtLink>

      <NuxtLink
        to="/admin/pengajuan-project"
        class="admin-nav-link"
        active-class="active"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
        <span>Pengajuan Project</span>
      </NuxtLink>

      <NuxtLink
        to="/admin/database-alumni"
        class="admin-nav-link"
        active-class="active"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>
        <span>Database Alumni</span>
      </NuxtLink>
    </nav>

    <div class="mt-auto px-4 py-4 border-t border-slate-700 text-sm opacity-80">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
          A
        </div>
        <div>
          <div class="font-medium">Admin</div>
          <div class="text-xs text-slate-400">Administrator</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
// Admin sidebar component
</script>

<style scoped>
.admin-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: rgba(255,255,255,0.9);
  transition: all 0.15s ease;
  font-weight: 500;
  text-decoration: none;
}

.admin-nav-link:hover {
  background: rgba(255,255,255,0.1);
  transform: translateX(4px);
  color: rgba(255,255,255,1);
}

.admin-nav-link.active {
  background: rgba(59, 130, 246, 0.2);
  color: rgba(255,255,255,1);
  border-left: 3px solid #3b82f6;
}

.icon {
  width: 18px;
  height: 18px;
  stroke-width: 1.6;
  flex-shrink: 0;
}
</style>