<template>
  <div class="navbar bg-primary text-primary-content shadow-lg">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
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
          class="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a href="/dashboard" class="hover:bg-primary-focus">Dashboard</a></li>
          <li><a href="/daftar-proyek" class="hover:bg-primary-focus">Daftar Proyek</a></li>
          <li><a href="/peta" class="hover:bg-primary-focus">Peta Sebaran</a></li>
          <li class="divider my-1"></li>
          <!-- Authentication links for mobile -->
          <li v-if="!isLoggedIn"><a @click="openLoginModal" class="hover:bg-primary-focus">Login</a></li>
          <li v-if="isLoggedIn"><a href="/profile" class="hover:bg-primary-focus">Profile</a></li>
          <li v-if="isLoggedIn"><a @click="logout" class="hover:bg-primary-focus">Logout</a></li>
        </ul>
      </div>
      <div class="flex items-center gap-2 logo-container">
        <img src="/lanri_.png" alt="LAN RI Logo" class="h-10 w-auto object-contain filter brightness-0 invert" />
        <img src="/berakhlak.png" alt="Berakhlak Logo" class="h-10 w-auto object-contain filter brightness-0 invert" />
        <img src="/bangga.png" alt="Bangga Logo" class="h-10 w-auto object-contain filter brightness-0 invert" />
      </div>
    </div>
    
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <a href="/dashboard" class="hover:bg-primary-focus transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15l4-4 4 4" />
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <a href="/daftar-proyek" class="hover:bg-primary-focus transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Daftar Proyek
          </a>
        </li>
        <li>
          <a href="/peta" class="hover:bg-primary-focus transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 616 0z" />
            </svg>
            Peta Sebaran
          </a>
        </li>
      </ul>
    </div>
    
    <div class="navbar-end">
      <!-- User authenticated -->
      <div v-if="isLoggedIn" class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a class="justify-between">
              {{ user?.name || user?.username || 'User' }}
              <span class="badge badge-primary">{{ user?.roleId === 1 ? 'Admin' : 'User' }}</span>
            </a>
          </li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a @click="logout">Logout</a></li>
        </ul>
      </div>
      
      <!-- User not authenticated -->
      <div v-else class="flex gap-2">
        <button @click="openLoginModal" class="btn btn-primary btn-sm hover:bg-primary-focus transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 713-3h7a3 3 0 713 3v1" />
          </svg>
          Login
        </button>
      </div>
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
.logo-container img {
  transition: all 0.2s ease;
}

.logo-container img:hover {
  transform: scale(1.05);
}

/* Responsive logo sizing */
@media (max-width: 768px) {
  .logo-container img {
    height: 2rem; /* 32px */
  }
}

@media (max-width: 640px) {
  .logo-container img {
    height: 1.75rem; /* 28px */
  }
  
  .logo-container {
    gap: 0.25rem !important; /* Reduce gap di mobile */
  }
}
</style>
