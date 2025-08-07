<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center text-2xl font-bold mb-4">
          Login ASTINA
        </h2>
        
        <form @submit.prevent="handleLogin">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter your email" 
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
          <p class="text-sm">Don't have an account? 
            <NuxtLink to="/register" class="link link-primary">Register here</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref('')
const password = ref('')
const loading = ref(false)

// Demo login function
const handleLogin = async () => {
  loading.value = true
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo validation - in real app, call authentication API
    if (email.value && password.value) {
      // Store user session (demo)
      console.log('Login successful:', { email: email.value })
      
      // Redirect to dashboard
      await navigateTo('/')
    } else {
      throw new Error('Please fill in all fields')
    }
  } catch (error) {
    console.error('Login error:', error)
    // In real app, show error message to user
    alert('Login failed. Please try again.')
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