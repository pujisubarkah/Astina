<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center text-2xl font-bold mb-4">
          Register ASTINA
        </h2>
        
        <form @submit.prevent="handleRegister">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Full Name</span>
            </label>
            <input 
              v-model="name"
              type="text" 
              placeholder="Enter your full name" 
              class="input input-bordered" 
              required 
            />
          </div>
          
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
              <span class="label-text">Institution</span>
            </label>
            <select v-model="institutionId" class="select select-bordered" required>
              <option value="">Select your institution</option>
              <option value="1">Kementerian Sosial</option>
              <option value="2">Balitbangsos Kemensos</option>
              <option value="3">Bappenas</option>
              <option value="4">Kementerian Keuangan</option>
              <option value="5">Universitas Indonesia</option>
            </select>
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">Position</span>
            </label>
            <input 
              v-model="position"
              type="text" 
              placeholder="Enter your position" 
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
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input 
              v-model="confirmPassword"
              type="password" 
              placeholder="Confirm your password" 
              class="input input-bordered" 
              required 
            />
          </div>
          
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="loading loading-spinner loading-sm"></span>
              {{ loading ? 'Creating Account...' : 'Register' }}
            </button>
          </div>
        </form>
        
        <div class="divider">OR</div>
        
        <div class="text-center">
          <p class="text-sm">Already have an account? 
            <NuxtLink to="/login" class="link link-primary">Login here</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const institutionId = ref('')
const position = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

// Demo register function
const handleRegister = async () => {
  loading.value = true
  
  try {
    // Validate passwords match
    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match')
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Demo validation - in real app, call registration API
    if (name.value && email.value && institutionId.value && position.value && password.value) {
      console.log('Registration successful:', { 
        name: name.value, 
        email: email.value,
        institutionId: institutionId.value,
        position: position.value
      })
      
      // Show success message and redirect to login
      alert('Registration successful! Please login with your credentials.')
      await navigateTo('/login')
    } else {
      throw new Error('Please fill in all fields')
    }
  } catch (error) {
    console.error('Registration error:', error)
    // In real app, show error message to user
    alert(error.message || 'Registration failed. Please try again.')
  } finally {
    loading.value = false
  }
}

// Page meta
definePageMeta({
  layout: false,
  title: 'Register - ASTINA'
})
</script>
