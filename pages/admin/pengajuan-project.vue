<template>
  <div class="p-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">Pengajuan Project</h1>
      <p class="text-slate-600">Kelola pengajuan proyek pembelajaran dari peserta diklat</p>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Total Project</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Draft</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.draft }}</p>
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
            <p class="text-sm font-medium text-slate-600">Disetujui</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.approved }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Dalam Proses</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.inProgress }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex flex-wrap gap-4 items-end">
        <div class="flex-1 min-w-64">
          <label class="block text-sm font-medium text-slate-700 mb-2">Cari Project</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Masukkan judul project..."
            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="min-w-48">
          <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
          <select
            v-model="filters.status"
            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="draft">Draft</option>
            <option value="in_progress">Dalam Proses</option>
            <option value="approved">Disetujui</option>
            <option value="completed">Selesai</option>
          </select>
        </div>

        <div class="min-w-48">
          <label class="block text-sm font-medium text-slate-700 mb-2">Pelatihan</label>
          <select
            v-model="filters.pelatihanId"
            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Pelatihan</option>
            <option v-for="p in pelatihanOptions" :key="p.id" :value="p.id">{{ p.nama }}</option>
          </select>
        </div>

        <button
          @click="applyFilters"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Terapkan Filter
        </button>
      </div>
    </div>

    <!-- Projects Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200">
        <h3 class="text-lg font-medium text-slate-900">Daftar Project</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Judul</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pelatihan</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Instansi</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-for="(project, index) in projects" :key="project.id" class="hover:bg-slate-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-sm text-slate-900 max-w-xs truncate" :title="project.title">{{ project.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ getPelatihanName(project.pelatihanId) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ project.instansiName || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(project.status)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ getStatusText(project.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewProject(project)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Lihat
                </button>
                <button
                  v-if="project.status === 'draft'"
                  @click="approveProject(project)"
                  class="text-green-600 hover:text-green-900 mr-3"
                >
                  Setujui
                </button>
                <button
                  @click="editProject(project)"
                  class="text-slate-600 hover:text-slate-900"
                >
                  Edit
                </button>
              </td>
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
import { ref, onMounted } from 'vue'

// Page meta
definePageMeta({
  layout: 'admin'
})

// Reactive data
const stats = ref({
  total: 0,
  draft: 0,
  approved: 0,
  inProgress: 0
})

const projects = ref([])
const pelatihanOptions = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = ref(0)
const totalPages = ref(0)

const filters = ref({
  search: '',
  status: '',
  pelatihanId: ''
})

// Methods
const applyFilters = () => {
  currentPage.value = 1
  fetchProjects()
}

const fetchPelatihanOptions = async () => {
  try {
    const res = await fetch('/api/pelatihan')
    if (!res.ok) return
    pelatihanOptions.value = await res.json()
  } catch (e) {
    console.warn('Failed to fetch pelatihan options:', e)
  }
}

const fetchProjects = async () => {
  try {
    const params = new URLSearchParams()
    if (filters.value.search) params.append('q', filters.value.search)
    if (filters.value.status) params.append('status', filters.value.status)
    if (filters.value.pelatihanId) params.append('pelatihan_id', filters.value.pelatihanId)
    if (currentPage.value > 1) params.append('page', currentPage.value.toString())
    if (itemsPerPage.value !== 10) params.append('limit', itemsPerPage.value.toString())

    const res = await fetch('/api/project' + (params.toString() ? `?${params.toString()}` : ''))
    if (!res.ok) {
      console.error('Failed to load projects')
      return
    }
    const json = await res.json()
    projects.value = json.data || json

    // Calculate stats
    stats.value.total = projects.value.length
    stats.value.draft = projects.value.filter(p => p.status === 'draft').length
    stats.value.approved = projects.value.filter(p => p.isApproved).length
    stats.value.inProgress = projects.value.filter(p => p.status === 'in_progress').length

    totalItems.value = projects.value.length
    totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value)
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}

const getPelatihanName = (pelatihanId) => {
  const pelatihan = pelatihanOptions.value.find(p => p.id === pelatihanId)
  return pelatihan ? pelatihan.nama : '-'
}

const viewProject = (project) => {
  // Navigate to project detail
  window.open(`/proyek/${project.id}`, '_blank')
}

const approveProject = async (project) => {
  try {
    const res = await fetch('/api/project/approval', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: project.id, isApproved: true })
    })
    if (res.ok) {
      await fetchProjects()
    } else {
      alert('Gagal menyetujui project')
    }
  } catch (e) {
    console.error(e)
    alert('Gagal menyetujui project')
  }
}

const editProject = (project) => {
  // Navigate to edit page or open modal
  console.log('Editing project:', project.id)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchProjects()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchProjects()
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'draft':
      return 'bg-slate-100 text-slate-800'
    case 'in_progress':
      return 'bg-blue-100 text-blue-800'
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'completed':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-slate-100 text-slate-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'draft':
      return 'Draft'
    case 'in_progress':
      return 'Dalam Proses'
    case 'approved':
      return 'Disetujui'
    case 'completed':
      return 'Selesai'
    default:
      return status
  }
}

// Lifecycle
onMounted(() => {
  fetchPelatihanOptions()
  fetchProjects()
})
</script>