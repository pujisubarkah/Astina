<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
    <!-- Loading State -->
    <div v-if="pending" v-for="i in 4" :key="i" class="card bg-white shadow-lg animate-pulse">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div>
            <div class="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div class="h-8 bg-gray-200 rounded w-16"></div>
          </div>
          <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="col-span-4">
      <div class="alert alert-error">
        <span>Error loading stats: {{ error }}</span>
      </div>
    </div>

    <!-- Stats Cards -->
    <template v-else>
      <!-- Total Proyek -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Proyek</p>
              <p class="text-2xl font-bold text-blue-600">{{ totalProyek.toLocaleString() }}</p>
              <p class="text-xs text-gray-500">Seluruh sistem</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Program -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Program</p>
              <p class="text-2xl font-bold text-purple-600">{{ totalProgram }}</p>
              <p class="text-xs text-gray-500">Pelatihan aktif</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Kategori Instansi -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Kategori Instansi</p>
              <p class="text-2xl font-bold text-green-600">{{ totalKategori }}</p>
              <p class="text-xs text-gray-500">Jenis organisasi</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Keywords -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Keywords</p>
              <p class="text-2xl font-bold text-yellow-600">{{ totalKeywords }}</p>
              <p class="text-xs text-gray-500">Kata kunci unik</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
// Props untuk menerima data dari parent
const props = defineProps({
  data: {
    type: Object,
    default: () => null
  },
  pending: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

// Computed properties untuk stats
const totalProyek = computed(() => {
  return props.data?.overview?.total_proyek || 0
})

const totalProgram = computed(() => {
  return props.data?.overview?.total_program || 0
})

const totalKategori = computed(() => {
  return props.data?.overview?.total_instansi_kategori || 0
})

const totalKeywords = computed(() => {
  return props.data?.overview?.total_keywords || 0
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>