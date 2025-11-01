<template>
  <div class="p-8">
    <!-- Back Button -->
    <button
      @click="$router.back()"
      class="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Kembali ke Database Alumni
    </button>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="alumni" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Card -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-center">
            <!-- Photo -->
            <div class="mb-4">
              <div class="w-48 h-48 mx-auto rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                <img
                  v-if="alumni.photo"
                  :src="alumni.photo"
                  :alt="alumni.nama"
                  class="w-full h-full object-cover"
                />
                <svg v-else class="w-24 h-24 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>

            <!-- Name -->
            <h2 class="text-2xl font-bold text-slate-900 mb-2">{{ alumni.nama }}</h2>
            <p class="text-slate-600 mb-1">{{ alumni.namaInstansi || '-' }}</p>
            <p class="text-sm text-slate-500">NIP: {{ alumni.noIdentitas }}</p>

            <!-- Stats -->
            <div class="mt-6 pt-6 border-t border-slate-200">
              <div class="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p class="text-2xl font-bold text-blue-600">{{ alumni.namaProgram || '-' }}</p>
                  <p class="text-xs text-slate-600">Program</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-green-600">{{ extractYearFromKRA(alumni.nomorKra) }}</p>
                  <p class="text-xs text-slate-600">Tahun</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Info Card -->
        <div class="bg-white rounded-lg shadow p-6 mt-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-4">Informasi Cepat</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <div class="flex-1">
                <p class="text-xs text-slate-500">Instansi</p>
                <p class="text-sm font-medium text-slate-900">{{ alumni.namaInstansi || '-' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <div class="flex-1">
                <p class="text-xs text-slate-500">Lembaga Diklat</p>
                <p class="text-sm font-medium text-slate-900">{{ alumni.namaLemdik || '-' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <div class="flex-1">
                <p class="text-xs text-slate-500">Nomor KRA</p>
                <p class="text-sm font-medium text-slate-900">{{ alumni.nomorKra || '-' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Information -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Proyek Perubahan -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Proyek Perubahan
          </h3>
          <p class="text-slate-700 leading-relaxed">{{ alumni.proyekPerubahan || '-' }}</p>
        </div>

        <!-- Data Pribadi -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Data Pribadi
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-500 mb-1">Nama Lengkap</label>
              <p class="text-slate-900">{{ alumni.nama }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-500 mb-1">NIP</label>
              <p class="text-slate-900">{{ alumni.noIdentitas }}</p>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-slate-500 mb-1">Instansi</label>
              <p class="text-slate-900">{{ alumni.namaInstansi || '-' }}</p>
            </div>
          </div>
        </div>

        <!-- Riwayat Pendidikan/Pelatihan -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            Riwayat Pelatihan
          </h3>
          <div class="space-y-4">
            <div class="flex gap-4 p-4 bg-slate-50 rounded-lg">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-slate-900">{{ alumni.namaProgram || '-' }}</h4>
                <p class="text-sm text-slate-600">{{ alumni.namaLemdik || '-' }}</p>
                <p class="text-xs text-slate-500 mt-1">Nomor KRA: {{ alumni.nomorKra || '-' }}</p>
              </div>
              <div class="text-right">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Selesai
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex gap-3">
            <button
              @click="printCV"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              Cetak CV
            </button>
            <button
              @click="downloadPDF"
              class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded-lg shadow p-8 text-center">
      <p class="text-slate-600">Data alumni tidak ditemukan.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const alumni = ref(null)
const loading = ref(true)

const fetchAlumniDetail = async () => {
  try {
    loading.value = true
    const id = route.params.id
    
    // Fetch from proper API by specific ID
    const res = await fetch(`/api/proper/${id}`)
    if (!res.ok) {
      throw new Error('Failed to fetch alumni detail')
    }
    
    const response = await res.json()
    if (response.success && response.data) {
      alumni.value = response.data
    }
  } catch (error) {
    console.error('Error fetching alumni detail:', error)
  } finally {
    loading.value = false
  }
}

const printCV = () => {
  window.print()
}

const downloadPDF = () => {
  console.log('Downloading PDF for alumni:', alumni.value.id)
  // Implement PDF download functionality
}

const extractYearFromKRA = (nomorKra) => {
  if (!nomorKra) return '-'
  
  // Extract year from KRA format: 00001941/PKP/4016/012/LAN-BPS/2025
  // Tahun ada di akhir setelah slash terakhir
  const parts = nomorKra.split('/')
  if (parts.length > 0) {
    const lastPart = parts[parts.length - 1]
    // Check if it's a valid year (4 digits)
    if (/^\d{4}$/.test(lastPart)) {
      return lastPart
    }
  }
  
  return '-'
}

onMounted(() => {
  fetchAlumniDetail()
})
</script>

<style scoped>
@media print {
  button {
    display: none;
  }
}
</style>
