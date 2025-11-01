<template>
  <div class="p-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">Database Alumni</h1>
      <p class="text-slate-600">Kelola data alumni dari berbagai program diklat SIPENDAR</p>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Total Alumni</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Aktif Bekerja</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.active }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Lulus Tahun Ini</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.graduatedThisYear }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-orange-100 text-orange-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Program Diklat</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.programs }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Search Input - Span 2 columns on large screens -->
        <div class="lg:col-span-2">
          <label class="block text-sm font-medium text-slate-700 mb-2">Cari Alumni</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Nama, NIP, atau Proyek Perubahan..."
            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Instansi Filter -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Instansi</label>
          <select
            v-model="filters.instansiId"
            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Instansi</option>
            <option v-for="inst in instansiOptions" :key="inst.instansi_id" :value="inst.instansi_id">
              {{ inst.nama_instansi }}
            </option>
          </select>
        </div>

        <!-- Program Filter -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Program</label>
          <select
            v-model="filters.programId"
            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Program</option>
            <option v-for="p in programOptions" :key="p.id" :value="p.id">{{ p.nama }}</option>
          </select>
        </div>

        <!-- Lemdik Filter -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Lemdik</label>
          <select
            v-model="filters.lemdikId"
            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Lemdik</option>
            <option v-for="lem in lemdikOptions" :key="lem.id" :value="lem.id">{{ lem.namalemdik }}</option>
          </select>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mt-4">
        <button
          @click="applyFilters"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            Terapkan Filter
          </span>
        </button>
        
        <button
          @click="resetFilters"
          class="px-6 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Reset
          </span>
        </button>
      </div>
    </div>

    <!-- Alumni Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between items-center">
        <div class="flex items-center gap-4">
          <h3 class="text-lg font-medium text-slate-900">Daftar Alumni</h3>
          <div class="flex items-center gap-2">
            <label class="text-sm text-slate-600">Tampilkan:</label>
            <select
              v-model="itemsPerPage"
              @change="changeItemsPerPage"
              class="px-3 py-1 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
            <span class="text-sm text-slate-600">baris</span>
          </div>
        </div>
        <button
          @click="exportData"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export Excel
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">NIP</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Instansi</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Program</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Lemdik</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nomor KRA</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Proyek Perubahan</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-for="(alumni, index) in alumniList" :key="alumni.id" class="hover:bg-slate-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewProfile(alumni)"
                  class="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                >
                  {{ alumni.nama }}
                </button>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ alumni.noIdentitas }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ alumni.namaInstansi || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ alumni.namaProgram || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ alumni.namaLemdik || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ alumni.nomorKra || '-' }}</td>
              <td class="px-6 py-4 text-sm text-slate-900 max-w-xs truncate" :title="alumni.proyekPerubahan">{{ alumni.proyekPerubahan || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <div class="text-sm text-slate-700">
          Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} sampai {{ Math.min(currentPage * itemsPerPage, totalItems) }} dari {{ totalItems }} hasil
        </div>
        <div class="flex space-x-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-slate-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Sebelumnya
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-slate-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Page meta
definePageMeta({
  layout: 'admin'
})

// Reactive data
const stats = ref({
  total: 0,
  active: 0,
  graduatedThisYear: 0,
  programs: 0
})

const alumniList = ref([])
const programOptions = ref([])
const instansiOptions = ref([])
const lemdikOptions = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = ref(0)
const totalPages = ref(0)

const filters = ref({
  search: '',
  instansiId: '',
  programId: '',
  lemdikId: ''
})

// Methods
const fetchProgramOptions = async () => {
  try {
    const res = await fetch('/api/pelatihan')
    if (!res.ok) return
    const response = await res.json()
    if (response.success && response.data) {
      programOptions.value = response.data
    }
  } catch (e) {
    console.warn('Failed to fetch program options:', e)
  }
}

const fetchInstansiOptions = async () => {
  try {
    const res = await fetch('/api/instansi')
    if (!res.ok) return
    const response = await res.json()
    if (response.success && response.data) {
      instansiOptions.value = response.data
    }
  } catch (e) {
    console.warn('Failed to fetch instansi options:', e)
  }
}

const fetchLemdikOptions = async () => {
  try {
    const res = await fetch('/api/lemdik')
    if (!res.ok) return
    const response = await res.json()
    if (response.success && response.data) {
      lemdikOptions.value = response.data
    }
  } catch (e) {
    console.warn('Failed to fetch lemdik options:', e)
  }
}

const fetchAlumni = async () => {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: itemsPerPage.value.toString()
    })

    if (filters.value.search) {
      params.append('search', filters.value.search)
    }
    if (filters.value.instansiId) {
      params.append('instansiId', filters.value.instansiId)
    }
    if (filters.value.programId) {
      params.append('programId', filters.value.programId)
    }
    if (filters.value.lemdikId) {
      params.append('lemdikId', filters.value.lemdikId)
    }

    const res = await fetch(`/api/proper?${params.toString()}`)
    if (!res.ok) {
      throw new Error('Failed to fetch alumni data')
    }
    const response = await res.json()
    
    if (response.success) {
      alumniList.value = response.data
      
      // Update pagination info
      if (response.pagination) {
        totalItems.value = response.pagination.total
        totalPages.value = response.pagination.totalPages
        
        // Update stats
        stats.value.total = response.pagination.total
        stats.value.active = response.pagination.total
        stats.value.programs = new Set(response.data.map(a => a.programId).filter(Boolean)).size
      }
    }
  } catch (error) {
    console.error('Error fetching alumni:', error)
  }
}

const applyFilters = () => {
  currentPage.value = 1
  fetchAlumni()
}

const resetFilters = () => {
  filters.value = {
    search: '',
    instansiId: '',
    programId: '',
    lemdikId: ''
  }
  currentPage.value = 1
  fetchAlumni()
}

const changeItemsPerPage = () => {
  currentPage.value = 1
  fetchAlumni()
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchAlumni()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchAlumni()
  }
}

const viewProfile = (alumni) => {
  // Navigate to alumni profile detail page
  navigateTo(`/admin/alumni/${alumni.id}`)
}

const exportData = () => {
  // Implement export to Excel functionality
  console.log('Exporting alumni data to Excel')
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchProgramOptions(),
    fetchInstansiOptions(),
    fetchLemdikOptions(),
    fetchAlumni()
  ])
})
</script>