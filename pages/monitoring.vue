<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-blue-900 mb-2">Monitoring Implementasi & Publikasi</h1>
            <p class="text-blue-700">Pantau implementasi proyek perubahan dan dampak publikasinya di berbagai media</p>
          </div>
          <div class="flex gap-2">
            <select class="select select-bordered" v-model="monitoringPeriod">
              <option value="week">Mingguan</option>
              <option value="month">Bulanan</option>
              <option value="quarter">Triwulan</option>
              <option value="year">Tahunan</option>
            </select>
            <button class="btn btn-outline" @click="refreshData">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'animate-spin': isRefreshing }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Update Data
            </button>
          </div>
        </div>
      </div>

      <!-- Implementation & Publication Stats -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="stat-title">Total Implementasi</div>
          <div class="stat-value text-blue-600">{{ stats.totalImplemented }}</div>
          <div class="stat-desc">{{ stats.implementationChange >= 0 ? '+' : '' }}{{ stats.implementationChange }} bulan ini</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div class="stat-title">Terpublikasi</div>
          <div class="stat-value text-green-600">{{ stats.published }}</div>
          <div class="stat-desc text-green-600">{{ ((stats.published / stats.totalImplemented) * 100).toFixed(1) }}% publication rate</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div class="stat-title">Media Coverage</div>
          <div class="stat-value text-orange-600">{{ stats.mediaCoverage }}</div>
          <div class="stat-desc">{{ stats.digitalMedia }} digital, {{ stats.printMedia }} print</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="stat-title">Total Reach</div>
          <div class="stat-value text-red-600">{{ formatNumber(stats.totalReach) }}</div>
          <div class="stat-desc text-red-600">Estimasi audience tercapai</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-purple-600">
            <div class="radial-progress text-purple-600" :style="`--value:${stats.impactScore}; --size:3rem; --thickness: 4px;`">
              <span class="text-sm font-bold">{{ stats.impactScore }}%</span>
            </div>
          </div>
          <div class="stat-title">Impact Score</div>
          <div class="stat-value text-purple-600">{{ stats.impactScore }}%</div>
          <div class="stat-desc">Berdasarkan reach & engagement</div>
        </div>
      </div>

      <!-- Filters & Search -->
      <div class="card bg-white shadow-lg mb-6">
        <div class="card-body py-4">
          <div class="flex flex-col lg:flex-row gap-4">
            <div class="flex-1">
              <input 
                type="text" 
                placeholder="Cari proyek implementasi atau publikasi..." 
                class="input input-bordered w-full"
                v-model="searchQuery"
              />
            </div>
            <div class="flex gap-2">
              <select class="select select-bordered" v-model="filterStatus">
                <option value="">Semua Status</option>
                <option value="implemented">Sudah Diimplementasi</option>
                <option value="pilot">Tahap Pilot</option>
                <option value="planning">Perencanaan</option>
                <option value="evaluation">Evaluasi</option>
              </select>
              <select class="select select-bordered" v-model="filterMedia">
                <option value="">Semua Media</option>
                <option value="digital">Media Digital</option>
                <option value="print">Media Cetak</option>
                <option value="tv">Televisi</option>
                <option value="radio">Radio</option>
                <option value="social">Media Sosial</option>
              </select>
              <select class="select select-bordered" v-model="sortBy">
                <option value="publication">Publikasi Terbaru</option>
                <option value="reach">Total Reach</option>
                <option value="impact">Impact Score</option>
                <option value="implementation">Status Implementasi</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Publication Trend Chart -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">
              Trend Publikasi Bulanan
              <div class="badge badge-success">Updated</div>
            </h2>
            <div ref="publicationTrendChart" class="w-full h-64"></div>
          </div>
        </div>

        <!-- Media Distribution -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">
              Distribusi Media Publikasi
            </h2>
            <div ref="mediaDistributionChart" class="w-full h-64"></div>
          </div>
        </div>
        
        <!-- Implementation Status Chart -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">
              Status Implementasi Proyek
            </h2>
            <div ref="implementationChart" class="w-full h-64"></div>
          </div>
        </div>

        <!-- Reach & Impact Chart -->
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">
              Reach vs Impact Score
            </h2>
            <div ref="reachImpactChart" class="w-full h-64"></div>
          </div>
        </div>
      </div>

      <!-- Project Monitoring Table -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <h2 class="card-title text-lg font-semibold text-gray-800">Monitor Implementasi & Publikasi Proyek</h2>
            <div class="flex items-center gap-2">
              <div class="badge badge-info gap-1">
                <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                Updated
              </div>
              <span class="text-xs text-gray-500">Last update: {{ lastUpdate }}</span>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Proyek</th>
                  <th>Status Implementasi</th>
                  <th>Status Publikasi</th>
                  <th>Media Coverage</th>
                  <th>Total Reach</th>
                  <th>Impact Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in filteredProjects" :key="project.id" class="hover">
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar placeholder">
                        <div class="w-8 h-8 rounded bg-blue-500 text-white text-xs">
                          {{ project.id }}
                        </div>
                      </div>
                      <div>
                        <div class="font-bold text-sm">{{ project.title }}</div>
                        <div class="text-xs text-gray-500">{{ project.institution }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="flex flex-col">
                      <div class="badge" :class="getImplementationStatusClass(project.implementationStatus)">
                        {{ getImplementationStatusText(project.implementationStatus) }}
                      </div>
                      <div class="text-xs text-gray-500 mt-1">{{ project.implementationDate }}</div>
                    </div>
                  </td>
                  <td>
                    <div class="flex flex-col">
                      <div class="badge" :class="getPublicationStatusClass(project.publicationStatus)">
                        {{ getPublicationStatusText(project.publicationStatus) }}
                      </div>
                      <div class="text-xs text-gray-500 mt-1">{{ project.publicationCount }} publikasi</div>
                    </div>
                  </td>
                  <td>
                    <div class="flex flex-wrap gap-1">
                      <div v-for="media in project.mediaTypes" :key="media" 
                           class="badge badge-outline badge-xs" 
                           :class="getMediaTypeClass(media)">
                        {{ getMediaTypeName(media) }}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="flex flex-col">
                      <div class="font-semibold text-blue-600">{{ formatNumber(project.totalReach) }}</div>
                      <div class="text-xs text-gray-500">estimasi audience</div>
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      <div class="radial-progress text-sm" 
                           :style="`--value:${project.impactScore}; --size:2.5rem; --thickness: 3px;`"
                           :class="getImpactScoreClass(project.impactScore)">
                        <span class="text-xs font-bold">{{ project.impactScore }}%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="dropdown dropdown-end">
                      <div tabindex="0" role="button" class="btn btn-ghost btn-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01" />
                        </svg>
                      </div>
                      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a class="text-xs" @click="viewDetails(project)">Lihat Detail</a></li>
                        <li><a class="text-xs" @click="addPublication(project)">Tambah Publikasi</a></li>
                        <li><a class="text-xs" @click="viewPublications(project)">Lihat Publikasi</a></li>
                        <li><a class="text-xs" @click="generateReport(project)">Generate Report</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="flex justify-between items-center mt-4">
            <span class="text-sm text-gray-600">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredProjects.length) }} 
              of {{ filteredProjects.length }} projects
            </span>
            <div class="join">
              <button 
                class="join-item btn btn-sm" 
                :class="{ 'btn-disabled': currentPage === 1 }"
                @click="currentPage = Math.max(1, currentPage - 1)"
              >
                «
              </button>
              <span class="join-item btn btn-sm btn-active">{{ currentPage }}</span>
              <button 
                class="join-item btn btn-sm"
                :class="{ 'btn-disabled': currentPage === totalPages }"
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Alert Section -->
      <div class="mt-6" v-if="alerts.length > 0">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Alerts & Notifications</h3>
        <div class="space-y-2">
          <div 
            v-for="alert in alerts" 
            :key="alert.id"
            class="alert"
            :class="getAlertClass(alert.type)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 class="font-bold">{{ alert.title }}</h4>
              <p class="text-sm">{{ alert.message }}</p>
            </div>
            <button class="btn btn-ghost btn-xs" @click="dismissAlert(alert.id)">Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'

// Page metadata
useHead({
  title: 'Monitoring Proyek - Astina',
  meta: [
    { name: 'description', content: 'Monitor progres dan status proyek perubahan secara real-time' }
  ]
})

// Reactive data
const searchQuery = ref('')
const filterStatus = ref('')
const filterMedia = ref('')
const sortBy = ref('publication')
const currentPage = ref(1)
const itemsPerPage = 10
const refreshInterval = ref('monthly')
const isRefreshing = ref(false)
const lastUpdate = ref(new Date().toLocaleTimeString())

// Sample data for implementation & publication monitoring
const stats = reactive({
  totalImplemented: 156,
  published: 134,
  mediaCoverage: 287,
  digitalMedia: 189,
  printMedia: 98,
  totalReach: 2450000,
  impactScore: 78,
  implementationChange: 12
})

const projects = ref([
  {
    id: 1,
    title: 'Digitalisasi Sistem Perizinan UMKM',
    participant: 'Budi Santoso - budi.santoso@kemendagri.go.id',
    institution: 'Kemendagri',
    implementationStatus: 'implemented',
    implementationDate: '2024-11-15',
    publicationStatus: 'published',
    publicationCount: 8,
    mediaTypes: ['digital', 'print', 'tv'],
    totalReach: 450000,
    impactScore: 85,
    publications: [
      { media: 'Kompas Digital', type: 'digital', reach: 200000, date: '2024-12-01' },
      { media: 'Tempo TV', type: 'tv', reach: 150000, date: '2024-12-05' },
      { media: 'Bisnis Indonesia', type: 'print', reach: 100000, date: '2024-12-10' }
    ]
  },
  {
    id: 2,
    title: 'E-Government Pelayanan Kesehatan',
    participant: 'Sari Dewi - sari.dewi@kemenkes.go.id',
    institution: 'Kemenkes',
    implementationStatus: 'pilot',
    implementationDate: '2024-12-01',
    publicationStatus: 'published',
    publicationCount: 5,
    mediaTypes: ['digital', 'social'],
    totalReach: 320000,
    impactScore: 72,
    publications: [
      { media: 'Detik Health', type: 'digital', reach: 180000, date: '2024-12-08' },
      { media: 'Instagram @kemenkes_ri', type: 'social', reach: 140000, date: '2024-12-12' }
    ]
  },
  {
    id: 3,
    title: 'Monitoring SAKIP Terintegrasi',
    participant: 'Ahmad Rahman - ahmad.rahman@bpkp.go.id',
    institution: 'BPKP',
    implementationStatus: 'planning',
    implementationDate: '2025-01-15',
    publicationStatus: 'draft',
    publicationCount: 2,
    mediaTypes: ['digital'],
    totalReach: 85000,
    impactScore: 45,
    publications: [
      { media: 'Berita Satu', type: 'digital', reach: 85000, date: '2024-12-10' }
    ]
  },
  {
    id: 4,
    title: 'Sistem Informasi Manajemen Sekolah',
    participant: 'Maya Sari - maya.sari@kemdikbud.go.id',
    institution: 'Kemdikbud',
    implementationStatus: 'implemented',
    implementationDate: '2024-10-20',
    publicationStatus: 'published',
    publicationCount: 12,
    mediaTypes: ['digital', 'print', 'radio'],
    totalReach: 680000,
    impactScore: 92,
    publications: [
      { media: 'Republika Online', type: 'digital', reach: 250000, date: '2024-11-15' },
      { media: 'Koran Tempo', type: 'print', reach: 180000, date: '2024-11-20' },
      { media: 'Radio Elshinta', type: 'radio', reach: 250000, date: '2024-11-25' }
    ]
  },
  {
    id: 5,
    title: 'Portal Layanan Petani Digital',
    participant: 'Rudi Hartono - rudi.hartono@kementan.go.id',
    institution: 'Kementan',
    implementationStatus: 'evaluation',
    implementationDate: '2024-09-10',
    publicationStatus: 'published',
    publicationCount: 6,
    mediaTypes: ['digital', 'tv', 'social'],
    totalReach: 420000,
    impactScore: 78,
    publications: [
      { media: 'TVRI Nasional', type: 'tv', reach: 200000, date: '2024-12-01' },
      { media: 'Kontan Digital', type: 'digital', reach: 120000, date: '2024-12-05' },
      { media: 'Twitter @kementan', type: 'social', reach: 100000, date: '2024-12-08' }
    ]
  }
])

const alerts = ref([
  {
    id: 1,
    type: 'warning',
    title: 'Publikasi Tertunda',
    message: '3 proyek belum dipublikasikan dalam 2 minggu terakhir'
  },
  {
    id: 2,
    type: 'info',
    title: 'Media Baru',
    message: 'Detik.com tertarik untuk meliput proyek digitalisasi Kemendagri'
  }
])

// Chart refs
const publicationTrendChart = ref(null)
const mediaDistributionChart = ref(null)
const implementationChart = ref(null)
const reachImpactChart = ref(null)

// Additional variables for monitoring
const monitoringPeriod = ref('month')
const filterTraining = ref('')

// Computed properties
const filteredProjects = computed(() => {
  let filtered = projects.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.institution.toLowerCase().includes(query) ||
      project.participant.toLowerCase().includes(query)
    )
  }

  if (filterStatus.value) {
    filtered = filtered.filter(project => project.implementationStatus === filterStatus.value)
  }

  if (filterMedia.value) {
    filtered = filtered.filter(project => project.mediaTypes.includes(filterMedia.value))
  }

  // Apply sorting
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'reach':
        return b.totalReach - a.totalReach
      case 'impact':
        return b.impactScore - a.impactScore
      case 'implementation':
        return new Date(b.implementationDate) - new Date(a.implementationDate)
      default: // publication
        return b.publicationCount - a.publicationCount
    }
  })

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage)
})

// Methods
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const getImplementationStatusClass = (status) => {
  const classes = {
    implemented: 'badge-success',
    pilot: 'badge-warning',
    planning: 'badge-info',
    evaluation: 'badge-accent'
  }
  return classes[status] || 'badge-neutral'
}

const getImplementationStatusText = (status) => {
  const texts = {
    implemented: 'Diimplementasi',
    pilot: 'Tahap Pilot',
    planning: 'Perencanaan',
    evaluation: 'Evaluasi'
  }
  return texts[status] || status
}

const getPublicationStatusClass = (status) => {
  const classes = {
    published: 'badge-success',
    draft: 'badge-warning',
    pending: 'badge-info'
  }
  return classes[status] || 'badge-neutral'
}

const getPublicationStatusText = (status) => {
  const texts = {
    published: 'Terpublikasi',
    draft: 'Draft',
    pending: 'Pending'
  }
  return texts[status] || status
}

const getMediaTypeClass = (type) => {
  const classes = {
    digital: 'badge-primary',
    print: 'badge-secondary',
    tv: 'badge-accent',
    radio: 'badge-info',
    social: 'badge-success'
  }
  return classes[type] || 'badge-neutral'
}

const getMediaTypeName = (type) => {
  const names = {
    digital: 'Digital',
    print: 'Cetak',
    tv: 'TV',
    radio: 'Radio',
    social: 'Sosial'
  }
  return names[type] || type
}

const getImpactScoreClass = (score) => {
  if (score >= 80) return 'text-success'
  if (score >= 60) return 'text-warning'
  return 'text-error'
}

const getAlertClass = (type) => {
  const classes = {
    warning: 'alert-warning',
    error: 'alert-error',
    info: 'alert-info',
    success: 'alert-success'
  }
  return classes[type] || 'alert-info'
}

// Action methods
const refreshData = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    lastUpdate.value = new Date().toLocaleTimeString()
  }, 2000)
}

const viewDetails = (project) => {
  console.log('View details:', project)
}

const editProject = (project) => {
  console.log('Edit project:', project)
}

const addPublication = (project) => {
  console.log('Add publication:', project)
}

const viewPublications = (project) => {
  console.log('View publications:', project)
}

const generateReport = (project) => {
  console.log('Generate report:', project)
}

const dismissAlert = (alertId) => {
  const index = alerts.value.findIndex(alert => alert.id === alertId)
  if (index > -1) {
    alerts.value.splice(index, 1)
  }
}

// Additional methods for the table (kept for compatibility)
const getProgressColor = (progress) => {
  if (progress >= 90) return 'progress-success'
  if (progress >= 70) return 'progress-info'
  if (progress >= 50) return 'progress-warning'
  return 'progress-error'
}

const getProgressStatus = (progress, deadline) => {
  const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))
  if (progress >= 90) return 'Near completion'
  if (daysLeft < 7 && progress < 80) return 'Behind schedule'
  if (progress > 50) return 'On track'
  return 'Needs attention'
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'completed': return 'badge-success'
    case 'ongoing': return 'badge-info'
    case 'delayed': return 'badge-warning'
    case 'at-risk': return 'badge-error'
    default: return 'badge-ghost'
  }
}

const getStatusDotClass = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-500'
    case 'ongoing': return 'bg-blue-500 animate-pulse'
    case 'delayed': return 'bg-yellow-500'
    case 'at-risk': return 'bg-red-500 animate-pulse'
    default: return 'bg-gray-500'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'completed': return 'Selesai'
    case 'ongoing': return 'Berjalan'
    case 'delayed': return 'Terlambat'
    case 'at-risk': return 'Berisiko'
    default: return status
  }
}

const getDeadlineClass = (deadline) => {
  const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))
  if (daysLeft < 0) return 'text-red-600 font-bold'
  if (daysLeft < 7) return 'text-orange-600 font-medium'
  return 'text-gray-600'
}

const getTimeRemaining = (deadline) => {
  const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))
  if (daysLeft < 0) return `${Math.abs(daysLeft)} hari terlambat`
  if (daysLeft === 0) return 'Hari ini'
  if (daysLeft === 1) return 'Besok'
  return `${daysLeft} hari lagi`
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

// Chart initialization
const initCharts = () => {
  // Publication Trend Chart
  if (publicationTrendChart.value) {
    const chart1 = echarts.init(publicationTrendChart.value)
    chart1.setOption({
      title: {
        text: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Publikasi',
        type: 'line',
        data: [8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45],
        smooth: true,
        areaStyle: {
          opacity: 0.3
        },
        itemStyle: {
          color: '#10B981'
        }
      }]
    })
  }

  // Media Distribution Chart
  if (mediaDistributionChart.value) {
    const chart2 = echarts.init(mediaDistributionChart.value)
    chart2.setOption({
      tooltip: {
        trigger: 'item'
      },
      series: [{
        name: 'Media',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 189, name: 'Digital' },
          { value: 98, name: 'Cetak' },
          { value: 65, name: 'TV' },
          { value: 45, name: 'Radio' },
          { value: 89, name: 'Sosial Media' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    })
  }

  // Implementation Status Chart
  if (implementationChart.value) {
    const chart3 = echarts.init(implementationChart.value)
    chart3.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Diimplementasi', 'Pilot', 'Perencanaan', 'Evaluasi']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Jumlah Proyek',
        type: 'bar',
        data: [85, 32, 28, 11],
        itemStyle: {
          color: '#3B82F6'
        }
      }]
    })
  }

  // Reach vs Impact Chart
  if (reachImpactChart.value) {
    const chart4 = echarts.init(reachImpactChart.value)
    chart4.setOption({
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          return `${params.data[2]}<br/>Reach: ${params.data[0]}<br/>Impact: ${params.data[1]}%`
        }
      },
      xAxis: {
        name: 'Total Reach',
        type: 'value',
        scale: true
      },
      yAxis: {
        name: 'Impact Score (%)',
        type: 'value',
        scale: true
      },
      series: [{
        name: 'Proyek',
        type: 'scatter',
        symbolSize: function (data) {
          return Math.sqrt(data[0] / 5000)
        },
        data: [
          [450000, 85, 'Digitalisasi UMKM'],
          [320000, 72, 'E-Gov Kesehatan'],
          [85000, 45, 'SAKIP Monitoring'],
          [680000, 92, 'SIMS'],
          [420000, 78, 'Portal Petani']
        ],
        itemStyle: {
          color: '#EC4899'
        }
      }]
    })
  }
}

// Lifecycle
onMounted(() => {
  nextTick(() => {
    initCharts()
  })
})
</script>