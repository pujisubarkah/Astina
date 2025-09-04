<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-blue-900 mb-2">Dashboard Proyek Perubahan</h1>
        <p class="text-blue-700">Monitoring dan analisis data proyek perubahan real-time</p>
      </div>

      <!-- Stats Cards -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div v-for="i in 4" :key="i" class="card bg-white shadow-lg animate-pulse">
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
      </div>

      <div v-else-if="error" class="alert alert-error mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Total Proyek</p>
                <p class="text-2xl font-bold text-blue-600">{{ totalProjects }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Pelatihan Aktif</p>
                <p class="text-2xl font-bold text-green-600">{{ activeTrainings }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">K/L dan Pemerintah Daerah Terlibat</p>
                <p class="text-2xl font-bold text-purple-600">{{ totalInstitutions }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Progress Rata-rata</p>
                <p class="text-2xl font-bold text-orange-600">{{ averageProgress }}%</p>
              </div>
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Chart 1: Proyek per Pelatihan -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Distribusi Proyek per Pelatihan</h2>
            <div ref="trainingChart" class="w-full h-80"></div>
          </div>
        </div>

        <!-- Chart 2: Proyek per Kementerian/Lembaga -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Proyek per Kementerian/Lembaga</h2>
            <div ref="institutionChart" class="w-full h-80"></div>
          </div>
        </div>
      </div>

      <!-- Chart 3: Top Keywords/Tags -->
      <div class="card bg-white shadow-lg mb-8">
        <div class="card-body">
          <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Kata Kunci Terpopuler</h2>
          <p class="text-sm text-gray-600 mb-4">Visualisasi kata kunci yang paling sering muncul dalam proyek perubahan</p>
          <div ref="keywordsChart" class="w-full h-96"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// ...existing code...
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>