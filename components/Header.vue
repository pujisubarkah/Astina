<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg border-b border-primary-focus px-6 h-16">
  <div class="flex items-center justify-between h-16">
      <!-- Left Section: Logos & Page Title -->
      <div class="flex items-center space-x-6">
        <!-- Logo Section -->
        <div class="flex items-center space-x-4 logo-container">
          <img 
            src="/lanri_.png" 
            alt="LAN RI" 
            class="h-10 w-auto object-contain"
          />
          <img 
            src="/berakhlak.png" 
            alt="Berakhlak" 
            class="h-10 w-auto object-contain"
          />
          <img 
            src="/bangga.png" 
            alt="Bangga" 
            class="h-10 w-auto object-contain"
          />
        </div>
        
        <!-- Page Info -->
        <div class="border-l border-primary-content/30 pl-6">
          <h1 class="text-2xl font-bold text-white">{{ pageTitle }}</h1>
          <nav class="flex text-sm text-primary-content/70 mt-1" v-if="breadcrumbs.length > 0">
            <span v-for="(item, index) in breadcrumbs" :key="index" class="flex items-center">
              <NuxtLink 
                v-if="item.to && index < breadcrumbs.length - 1"
                :to="item.to" 
                class="hover:text-white transition-colors text-primary-content/80"
              >
                {{ item.label }}
              </NuxtLink>
              <span v-else class="text-white font-medium">{{ item.label }}</span>
              <svg 
                v-if="index < breadcrumbs.length - 1" 
                class="w-4 h-4 mx-2 text-primary-content/60" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          </nav>
        </div>
      </div>

      <!-- Right Section: User Info & Actions -->
      <div class="flex items-center space-x-4">
        <!-- Notifications -->
        <button class="relative p-2 text-primary-content/80 hover:text-white hover:bg-primary-focus/30 rounded-lg transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.828 5.293a1 1 0 011.414 0L15 8.05v3.95a3 3 0 11-6 0V8.05l2.758-2.757z" />
          </svg>
          <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
        </button>

        <!-- User Profile Dropdown -->
        <div class="relative" ref="userDropdown">
          <button 
            @click="toggleUserMenu"
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-focus/30 transition-colors"
          >
            <div class="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center text-sm font-semibold">
              {{ userInitials }}
            </div>
            <div class="hidden md:block text-left">
              <div class="text-sm font-medium text-white">{{ currentUser?.name || 'User' }}</div>
              <div class="text-xs text-primary-content/70">@{{ currentUser?.username || 'user' }}</div>
            </div>
            <svg class="w-4 h-4 text-primary-content/70" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div 
            v-show="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
          >
            <NuxtLink to="/profile" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors">
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </NuxtLink>
            <NuxtLink to="/settings" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors">
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </NuxtLink>
            <hr class="my-2 border-gray-200">
            <button 
              @click="logout"
              class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  }
})

// State
const showUserMenu = ref(false)
const userDropdown = ref(null)

// Auth composable
const { user, logout: authLogout, getUserInfo } = useAuth()

// Computed
const route = useRoute()
const router = useRouter()

// Get user info from auth store - menggunakan data user yang sebenarnya
const currentUser = computed(() => {
  const userInfo = getUserInfo()
  
  if (userInfo) {
    return {
      name: userInfo.name || 'User',
      username: userInfo.username || 'user',
      role: userInfo.role || 'User',
      roleId: userInfo.roleId
    }
  }
  return { name: 'User', username: 'user', role: 'User', roleId: null }
})

const pageTitle = computed(() => {
  if (props.title) return props.title
  
  // Auto-generate title from route with better mapping
  const routeName = route.name?.toString() || ''
  const routePath = route.path || ''
  
  // Handle specific route patterns based on actual routing structure
  if (routePath.includes('/admin/dashboard')) {
    return 'Admin Dashboard'
  }
  if (routePath.includes('/admin/approval')) {
    return 'Approval'
  }
  if (routePath.endsWith('/dashboard') && !routePath.includes('/admin/')) {
    return 'Dashboard'
  }
  if (routePath.endsWith('/upload_proper')) {
    return 'Upload Proper'
  }
  if (routePath === '/daftar-proyek') {
    return 'Daftar Proyek'
  }
  if (routePath === '/peta') {
    return 'Peta'
  }
  if (routePath === '/monitoring') {
    return 'Monitoring'
  }
  if (routePath === '/statistik') {
    return 'Statistik'
  }
  
  // Default title generation for other routes
  return routeName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'Dashboard'
})

const userInitials = computed(() => {
  const name = currentUser.value?.name || 'User'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = (event) => {
  if (userDropdown.value && !userDropdown.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

const logout = async () => {
  try {
    // Use auth composable logout function
    authLogout()
    
    // Close user menu
    showUserMenu.value = false
    
    // Additional cleanup jika diperlukan
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    
    // Redirect ke halaman utama
    await navigateTo('/')
    
    console.log('Logout berhasil')
  } catch (error) {
    console.error('Error during logout:', error)
    // Tetap redirect meski ada error
    await navigateTo('/')
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeUserMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script>

<style scoped>
/* Logo styling */
.logo-container img {
  filter: brightness(0) invert(1); /* Make logos white if they're dark */
  transition: all 0.2s ease;
}

.logo-container img:hover {
  transform: scale(1.05);
}

/* Responsive logo sizing */
@media (max-width: 768px) {
  .logo-container img {
    height: 2rem; /* 8 * 0.25rem = 2rem = 32px */
  }
}

@media (max-width: 640px) {
  .logo-container img {
    height: 1.75rem; /* 7 * 0.25rem = 1.75rem = 28px */
  }
}

/* Additional custom styles if needed */
</style>
