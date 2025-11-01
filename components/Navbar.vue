<template>
  <div class="navbar bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xl backdrop-blur-sm bg-opacity-95 border-b border-white/10">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle lg:hidden hover:bg-white/20 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-white/95 backdrop-blur-md text-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl border border-gray-200">
          <li><a href="/" class="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">Beranda</a></li>
          <li><a href="/dashboard" class="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">Dashboard</a></li>
          <li><a href="/daftar-proyek" class="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">Daftar Proyek</a></li>
          <li><a href="/peta" class="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">Peta Sebaran</a></li>
          <li class="divider my-1"></li>
            <li class="dropdown dropdown-hover">
              <a tabindex="0" class="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">Showcase</a>
                <ul class="dropdown-content menu p-2 shadow-xl bg-white/95 backdrop-blur-md rounded-box w-52 border border-gray-200 absolute left-full top-0 ml-2 hidden group-hover:block submenu-right">
                <li><a href="/showcase" class="hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 rounded-lg font-medium py-2 px-3">PKN I</a></li>
                <li><a href="/showcase?type=pkn2" class="hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 rounded-lg font-medium py-2 px-3">PKN II</a></li>
                <li><a href="/showcase?type=pka" class="hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 rounded-lg font-medium py-2 px-3">PKA</a></li>
                <li><a class="opacity-60 cursor-not-allowed rounded-lg font-medium py-2 px-3 text-gray-400">PKP</a></li>
              </ul>
            </li>
          <!-- Authentication links for mobile -->
          <li v-if="!isLoggedIn"><a @click="openLoginModal" class="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">Login</a></li>
          <li v-if="isLoggedIn"><a href="/profile" class="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">Profile</a></li>
          <li v-if="isLoggedIn"><a @click="logout" class="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">Logout</a></li>
        </ul>
      </div>
      <div class="flex items-center gap-3 logo-container">
        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
          <img src="/lanri_.png" alt="LAN RI Logo" class="h-8 w-auto object-contain filter brightness-0 invert" />
          <img src="/berakhlak.png" alt="Berakhlak Logo" class="h-8 w-auto object-contain filter brightness-0 invert" />
          <img src="/bangga.png" alt="Bangga Logo" class="h-8 w-auto object-contain filter brightness-0 invert" />
        </div>
      </div>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-2">
        <li>
          <a href="/" class="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="font-medium">Beranda</span>
          </a>
        </li>
        <li>
          <a href="/dashboard" class="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15l4-4 4 4" />
            </svg>
            <span class="font-medium">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/daftar-proyek" class="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="font-medium">Daftar Proyek</span>
          </a>
        </li>
        <li>
          <a href="/peta" class="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 616 0z" />
            </svg>
            <span class="font-medium">Peta Sebaran</span>
          </a>
        </li>
        <li class="dropdown dropdown-hover">
          <a tabindex="0" class="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8" />
            </svg>
            <span class="font-medium">Showcase</span>
            <svg class="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <ul class="dropdown-content menu p-2 shadow-2xl bg-white rounded-box w-52 border-2 border-blue-200 mt-2 animate-in slide-in-from-top-2 duration-200 z-[9999] relative">
            <li><a href="/showcase" class="hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 rounded-lg font-medium py-2 px-3">PKN I</a></li>
                <li><a href="/showcase?type=pkn2" class="hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 rounded-lg font-medium py-2 px-3">PKN II</a></li>
            <li><a class="opacity-60 cursor-not-allowed rounded-lg font-medium py-2 px-3 text-gray-400">PKA</a></li>
            <li><a class="opacity-60 cursor-not-allowed rounded-lg font-medium py-2 px-3 text-gray-400">PKP</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <!-- Debug info (remove after testing) -->
      <div class="text-xs text-white/50 mr-2">
        Auth: {{ isLoggedIn ? 'Logged In' : 'Not Logged In' }}
      </div>

      <!-- Always show login button for testing (remove after fix) -->
      <div class="flex gap-2">
        <button @click="openLoginModal" class="btn bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-blue-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold px-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 713-3h7a3 3 0 713 3v1" />
          </svg>
          Login
        </button>
      </div>

      <!-- User authenticated -->
      <!-- <div v-if="isLoggedIn" class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar ring-2 ring-white/30 hover:ring-white/50 transition-all duration-300">
          <div class="w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-white/95 backdrop-blur-md text-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl border border-gray-200">
          <li>
            <a class="justify-between hover:bg-blue-50 rounded-lg transition-all duration-200">
              {{ user?.name || user?.username || 'User' }}
              <span class="badge badge-primary bg-gradient-to-r from-blue-500 to-purple-600 border-0">{{ user?.roleId === 1 ? 'Admin' : 'User' }}</span>
            </a>
          </li>
          <li><a href="/profile" class="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">Profile</a></li>
          <li><a href="/settings" class="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">Settings</a></li>
          <li><a @click="logout" class="hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-lg">Logout</a></li>
        </ul>
      </div> -->

      <!-- User not authenticated -->
      <!-- <div v-else class="flex gap-2">
        <button @click="openLoginModal" class="btn bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-blue-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold px-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 713-3h7a3 3 0 713 3v1" />
          </svg>
          Login
        </button>
      </div> -->
    </div>
  </div>

  <!-- Login Modal -->
  <LoginModal 
    :isOpen="showLoginModal" 
    @close="closeLoginModal"
    @openRegister="openRegisterModal" 
  />

  <!-- Register Modal -->
  <RegisterModal 
    :isOpen="showRegisterModal" 
    @close="closeRegisterModal"
    @openLogin="openLoginModal" 
  />
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'

// Use the authentication composable
const { user, isLoggedIn, logout: authLogout, initAuth } = useAuth()

// Modal states
const showLoginModal = ref(false)
const showRegisterModal = ref(false)

// Initialize auth state on component mount
onMounted(() => {
  initAuth()
  console.log('Navbar mounted, isLoggedIn:', isLoggedIn.value)
})

// Watch for auth state changes to ensure reactivity
watch(isLoggedIn, (newVal) => {
  console.log('Auth state changed in Navbar:', newVal)
})

// Enhanced logout function
const logout = async () => {
  authLogout()
  await navigateTo('/')
}

// Modal functions
const openLoginModal = () => {
  showLoginModal.value = true
  showRegisterModal.value = false
}

const closeLoginModal = () => {
  showLoginModal.value = false
}

const openRegisterModal = () => {
  showRegisterModal.value = true
  showLoginModal.value = false
}

const closeRegisterModal = () => {
  showRegisterModal.value = false
}
</script>

<style scoped>
/* Logo styling untuk navbar */
.logo-container {
  transition: all 0.3s ease;
}

.logo-container:hover {
  transform: translateY(-2px);
}

.logo-container img {
  transition: all 0.3s ease;
  filter: brightness(0) invert(1);
}

.logo-container:hover img {
  transform: scale(1.05);
  filter: brightness(0) invert(1) drop-shadow(0 0 8px rgba(255,255,255,0.3));
}

/* Enhanced menu item animations */
.navbar-center .menu li a {
  position: relative;
  overflow: hidden;
}

.navbar-center .menu li a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.navbar-center .menu li a:hover::before {
  left: 100%;
}

/* Avatar glow effect */
.avatar .w-10 {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.avatar:hover .w-10 {
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
  transform: scale(1.05);
}

/* Dropdown animations */
.dropdown-content {
  animation: fadeInDown 0.3s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced submenu styling */
.dropdown-content ul {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  z-index: 9999 !important;
  position: relative;
}

.dropdown-content li a {
  position: relative;
  transition: all 0.2s ease;
}

.dropdown-content li a:hover {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  transform: translateX(4px);
}

.dropdown-content li a:hover::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 2px 0 0 2px;
}

/* Mobile menu button animation */
.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

/* Responsive logo sizing */
@media (max-width: 768px) {
  .logo-container img {
    height: 2rem; /* 32px */
  }

  .logo-container {
    gap: 0.5rem !important;
  }
}

@media (max-width: 640px) {
  .logo-container img {
    height: 1.75rem; /* 28px */
  }

  .logo-container {
    gap: 0.25rem !important;
  }

  .navbar-center .menu li a {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}

/* Glassmorphism effect for mobile dropdown */
@media (max-width: 1024px) {
  .dropdown-content {
    backdrop-filter: blur(16px);
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 9999 !important;
  }
}

/* Force high z-index for all dropdowns */
.dropdown-content {
  z-index: 9999 !important;
}

.menu .dropdown-content {
  z-index: 9999 !important;
}

/* Ensure submenu is not clipped by parent sections */
.navbar, .menu, .dropdown, .dropdown-content, .menu > li {
  overflow: visible !important;
}

.submenu-right {
  z-index: 100000 !important;
  min-width: 14rem;
}
</style>
