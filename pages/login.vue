<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center text-2xl font-bold mb-4">
          Login ASTINA
        </h2>
        
        <!-- Error message -->
        <div v-if="errorMessage" class="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
        
        <form @submit.prevent="handleLogin">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input 
              v-model="username"
              type="text" 
              placeholder="Enter your username" 
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
              placeholder="Enter your password" 
              class="input input-bordered" 
              required 
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="loading loading-spinner loading-sm"></span>
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>
          </div>
        </form>
        
        <div class="divider">OR</div>
        
        <div class="text-center">
          <p class="text-sm">Belum punya akun? 
            <NuxtLink to="/register" class="link link-primary font-medium">Daftar diri Anda di sini</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

import { useAuth } from '@/composables/useAuth'
const { login, user } = useAuth()

// Login function using composable
const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    await login({
      username: username.value,
      password: password.value
    })
    console.log('Login successful')
    // Redirect by role
    if (user.value?.roleId === 1) {
      await navigateTo('/admin/dashboard')
    } else {
      // Use name as slug instead of username
      const slug = user.value?.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'user'
      await navigateTo(`/${slug}/dashboard`)
    }
    
  } catch (error) {
    console.error('Login error:', error)
    
    if (error.statusCode === 401) {
      errorMessage.value = 'Invalid username or password'
    } else if (error.statusCode === 400) {
      errorMessage.value = 'Please fill in all fields'
    } else {
      errorMessage.value = 'Login failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

// Page meta
definePageMeta({
  layout: false,
  title: 'Login - ASTINA'
})
</script>