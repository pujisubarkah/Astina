<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center text-2xl font-bold mb-4">
          Daftar ASTINA
        </h2>
        
        <!-- Error message -->
        <div v-if="errorMessage" class="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
        
        <form @submit.prevent="handleRegister">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Nama Lengkap</span>
            </label>
            <input 
              v-model="name"
              type="text" 
              placeholder="Masukkan nama lengkap Anda" 
              class="input input-bordered" 
              required 
            />
          </div>
          
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
              <span class="label-text">Email</span>
            </label>
            <input 
              v-model="email"
              type="email" 
              placeholder="Masukkan email Anda" 
              class="input input-bordered" 
              required 
            />
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">Instansi</span>
            </label>
            <select v-model="institutionId" class="select select-bordered" required>
              <option value="">Pilih instansi Anda</option>
              <option value="1">Kementerian Sosial</option>
              <option value="2">Balitbangsos Kemensos</option>
              <option value="3">Bappenas</option>
              <option value="4">Kementerian Keuangan</option>
              <option value="5">Universitas Indonesia</option>
            </select>
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">Jabatan</span>
            </label>
            <input 
              v-model="position"
              type="text" 
              placeholder="Masukkan jabatan Anda" 
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
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">Konfirmasi Password</span>
            </label>
            <input 
              v-model="confirmPassword"
              type="password" 
              placeholder="Konfirmasi password Anda" 
              class="input input-bordered" 
              required 
            />
          </div>
          
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="loading loading-spinner loading-sm"></span>
              {{ loading ? 'Mendaftar...' : 'Daftar' }}
            </button>
          </div>
        </form>
        
        <div class="divider">ATAU</div>
        
        <div class="text-center">
          <p class="text-sm">Sudah punya akun? 
            <NuxtLink to="/login" class="link link-primary font-medium">Login di sini</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const name = ref('')
const username = ref('')
const email = ref('')
const institutionId = ref('')
const position = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')

// Register function using API
const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    // Validate passwords match
    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match')
    }
    
    // Call registration API
    await $fetch('/api/register', {
      method: 'POST',
      body: {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
        institutionId: institutionId.value,
        position: position.value
      }
    })
    
    // Show success message and redirect to login
    alert('Registrasi berhasil! Silakan login dengan username dan password Anda.')
    await navigateTo('/login')
    
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error.statusCode === 409) {
      errorMessage.value = 'Username sudah digunakan, silakan pilih username lain'
    } else if (error.statusCode === 400) {
      errorMessage.value = 'Mohon lengkapi semua field yang diperlukan'
    } else {
      errorMessage.value = 'Registrasi gagal. Silakan coba lagi.'
    }
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
