<template>
  <aside class="w-64 bg-primary text-primary-content shadow-xl h-full flex flex-col">
    <!-- Header Sidebar -->
    <div class="px-6 py-6 border-b border-primary-focus/20">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary-focus rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-bold">ASTINA</h2>
          <p class="text-xs opacity-70">Management Panel</p>
        </div>
      </div>
    </div>

    <!-- User Info -->
    <div class="px-6 py-4 bg-primary-focus/10">
      <div class="flex items-center gap-3">
        <div class="avatar placeholder">
          <div class="bg-primary-focus text-primary-content rounded-full w-10">
            <span class="text-sm">{{ user?.name?.charAt(0) || 'U' }}</span>
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">{{ user?.name || 'User' }}</p>
          <p class="text-xs opacity-70">{{ user?.roleId === 1 ? 'Administrator' : 'User' }}</p>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 py-4 space-y-2">
      <!-- Dynamic Menu Sections from Composable -->
      <div v-for="section in menuSections" :key="section.id" class="mb-4">
        <div class="px-3 py-2 text-xs font-semibold text-primary-content/70 uppercase tracking-wider">
          {{ section.title }}
        </div>
        <ul class="space-y-1">
          <li v-for="item in section.items" :key="item.id">
            <NuxtLink :to="item.route" class="sidebar-link group" active-class="active">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
              </svg>
              <span>{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
        <!-- Add divider between sections except for the last one -->
        <div v-if="section.id !== 'monitoring-section'" class="divider divider-primary opacity-20 my-4"></div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="px-6 py-4 border-t border-primary-focus/20">
      <div class="text-center">
        <p class="text-xs opacity-70">© 2025 ASTINA</p>
        <p class="text-xs opacity-50">LAN RI</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'
import { useMenu } from '@/composables/useMenu'

// Auth composable
const { user, getUserInfo } = useAuth()

// Menu composable
const { getMenuByRole } = useMenu()

// Computed properties
const isAdmin = computed(() => user.value?.roleId === 1)

// Get current user info
const currentUser = computed(() => getUserInfo())

// Get user role string for menu filtering
const userRoleString = computed(() => {
  const roleId = currentUser.value?.roleId || user.value?.roleId
  return roleId === 1 ? 'admin' : 'user'
})

// Get user slug for dynamic routes
const userSlug = computed(() => {
  return currentUser.value?.username || user.value?.username || ''
})

// Get menu sections based on user role
const menuSections = computed(() => {
  return getMenuByRole(userRoleString.value, userSlug.value)
})
</script>

<style scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
  font-weight: 500;
  text-decoration: none;
}

.sidebar-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(2px);
}

.sidebar-link.active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.sidebar-link svg {
  transition: transform 0.2s ease;
  width: 20px;
  height: 20px;
}

.sidebar-link:hover svg {
  transform: scale(1.1);
}

.sidebar-link.active svg {
  transform: scale(1.1);
}

/* Custom scrollbar for sidebar */
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}

.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Gradient overlay for better visual hierarchy */
.sidebar-header {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

/* User avatar styling */
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 14px;
}

/* Role badge */
.role-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Section divider */
.section-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
}

/* Section title */
.section-title {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  padding: 0 0.75rem;
}
</style>
