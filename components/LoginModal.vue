<template>
  <div v-if="isOpen" class="modal modal-open">
    <div class="modal-box w-96 max-w-5xl">
      <!-- Close button -->
      <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      
      <h3 class="font-bold text-2xl mb-6 text-center">Login ASTINA</h3>
      
      <!-- Error message -->
      <div v-if="errorMessage" class="alert alert-error mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ errorMessage }}</span>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input 
            v-model="username"
            type="text" 
            placeholder="Masukkan username Anda" 
            class="input input-bordered" 
            required 
          />
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input 
            v-model="password"
            type="password" 
            placeholder="Masukkan password Anda" 
            class="input input-bordered" 
            required 
          />
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Lupa password?</a>
          </label>
        </div>
        
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </div>
      </form>
      
      <div class="divider">ATAU</div>
      
      <div class="text-center">
        <p class="text-sm">Belum punya akun? 
          <a @click="openRegisterModal" class="link link-primary font-medium cursor-pointer">Daftar diri Anda di sini</a>
        </p>
      </div>
    </div>
    
    <!-- Modal backdrop -->
    <div class="modal-backdrop" @click="closeModal">
      <button>close</button>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close', 'openRegister'])

// Form data
const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

// Auth composable
const { login, user } = useAuth()

// Login function
const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const result = await login({
      username: username.value,
      password: password.value
    })
    
    console.log('Login successful')
    
    // Close modal first
    emit('close')
    
    // Wait a bit for auth state to update, then redirect
    await nextTick()
    
    // Redirect by role using the returned user data
    if (result.user?.roleId === 1) {
      await navigateTo('/admin/dashboard')
    } else {
      // Use name as slug instead of username
      const slug = result.user?.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'user'
      await navigateTo(`/${slug}/dashboard`)
    }
    
  } catch (error) {
    console.error('Login error:', error)
    
    if (error.statusCode === 401) {
      errorMessage.value = 'Username atau password salah'
    } else if (error.statusCode === 400) {
      errorMessage.value = 'Mohon lengkapi semua field'
    } else {
      errorMessage.value = 'Login gagal. Silakan coba lagi.'
    }
  } finally {
    loading.value = false
  }
}

// Close modal
const closeModal = () => {
  emit('close')
  // Reset form
  username.value = ''
  password.value = ''
  errorMessage.value = ''
}

// Open register modal
const openRegisterModal = () => {
  emit('openRegister')
}

// Watch for modal open/close to handle body scroll
watch(() => props.isOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = 'auto'
  }
})
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
