<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-blue-900 mb-2">Daftar Proyek Perubahan</h1>
            <p class="text-blue-700">Repository laporan proyek perubahan dari peserta pelatihan</p>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Import Data
            </button>
            <a href="/upload-proyek" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Upload Proyek
            </a>
          </div>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="card bg-white shadow-lg mb-6">
        <div class="card-body">
          <div class="flex flex-col lg:flex-row gap-4">
            <!-- Search -->
            <div class="flex-1">
              <div class="form-control">
                <div class="input-group">
                  <input 
                    type="text" 
                    placeholder="Cari proyek, kata kunci, atau nama peserta..." 
                    class="input input-bordered w-full"
                    v-model="searchQuery"
                  />
                  <button class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Filters -->
            <div class="flex gap-2">
              <select class="select select-bordered" v-model="selectedTraining">
                <option value="">Semua Pelatihan</option>
                <option value="sakip">SAKIP & Reformasi Birokrasi</option>
                <option value="digital">Digitalisasi Pelayanan Publik</option>
                <option value="manajemen">Manajemen Perubahan</option>
                <option value="inovasi">Inovasi Pelayanan</option>
                <option value="leadership">Leadership Excellence</option>
              </select>
              
              <select class="select select-bordered" v-model="selectedInstitution">
                <option value="">Semua K/L</option>
                <option value="kemendagri">Kemendagri</option>
                <option value="kemenkes">Kemenkes</option>
                <option value="kemendikbud">Kemendikbudristek</option>
                <option value="pupr">Kementerian PUPR</option>
                <option value="kemensos">Kemensos</option>
              </select>
              
              <select class="select select-bordered" v-model="sortBy">
                <option value="latest">Terbaru</option>
                <option value="popular">Terpopuler</option>
                <option value="title">Nama A-Z</option>
                <option value="progress">Progress</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Summary -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="stat-title">Total Proyek</div>
          <div class="stat-value text-blue-600">{{ filteredProjects.length }}</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-title">Selesai</div>
          <div class="stat-value text-green-600">{{ completedProjects }}</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-title">Sedang Berjalan</div>
          <div class="stat-value text-orange-600">{{ ongoingProjects }}</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="stat-title">Kontributor</div>
          <div class="stat-value text-purple-600">{{ totalContributors }}</div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div 
          v-for="project in paginatedProjects" 
          :key="project.id"
          class="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4"
          :class="getProjectBorderColor(project.status)"
        >
          <div class="card-body">
            <!-- Project Header -->
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="avatar placeholder">
                  <div class="bg-blue-500 text-white rounded-full w-8">
                    <span class="text-xs">{{ project.author.substring(0, 2).toUpperCase() }}</span>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-sm text-gray-600">{{ project.author }}</h3>
                  <p class="text-xs text-gray-500">{{ project.institution }}</p>
                </div>
              </div>
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01" />
                  </svg>
                </div>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                  <li><a><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> Star</a></li>
                  <li><a><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg> Share</a></li>
                </ul>
              </div>
            </div>

            <!-- Project Title -->
            <h2 class="card-title text-lg mb-2 line-clamp-2">
              <a href="#" class="hover:text-blue-600 transition-colors">
                {{ project.title }}
              </a>
            </h2>

            <!-- Description -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ project.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1 mb-4">
              <span 
                v-for="tag in project.tags.slice(0, 3)" 
                :key="tag"
                class="badge badge-outline badge-sm"
              >
                {{ tag }}
              </span>
              <span v-if="project.tags.length > 3" class="badge badge-ghost badge-sm">
                +{{ project.tags.length - 3 }}
              </span>
            </div>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs text-gray-600">Progress</span>
                <span class="text-xs font-semibold">{{ project.progress }}%</span>
              </div>
              <progress 
                class="progress w-full"
                :class="getProgressColor(project.progress)"
                :value="project.progress" 
                max="100"
              ></progress>
            </div>

            <!-- Project Stats -->
            <div class="flex items-center justify-between text-sm text-gray-600">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {{ project.stars }}
                </span>
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ project.views }}
                </span>
                <span class="flex items-center gap-1">
                  <div class="w-3 h-3 rounded-full" :class="getStatusColor(project.status)"></div>
                  {{ project.status }}
                </span>
              </div>
              <span class="text-xs">{{ formatDate(project.updatedAt) }}</span>
            </div>

            <!-- Action Buttons -->
            <div class="card-actions justify-end mt-4">
              <button class="btn btn-outline btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Lihat Detail
              </button>
              <button class="btn btn-primary btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-8" v-if="totalPages > 1">
        <div class="join">
          <button 
            class="join-item btn" 
            :class="{ 'btn-disabled': currentPage === 1 }"
            @click="currentPage = Math.max(1, currentPage - 1)"
          >
            «
          </button>
          <button 
            v-for="page in visiblePages" 
            :key="page"
            class="join-item btn"
            :class="{ 'btn-active': page === currentPage }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button 
            class="join-item btn"
            :class="{ 'btn-disabled': currentPage === totalPages }"
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
          >
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
useHead({
  title: 'Daftar Proyek Perubahan - Astina',
  meta: [
    { name: 'description', content: 'Repository laporan proyek perubahan dari peserta pelatihan' }
  ]
})

// Reactive data
const searchQuery = ref('')
const selectedTraining = ref('')
const selectedInstitution = ref('')
const sortBy = ref('latest')
const currentPage = ref(1)
const itemsPerPage = 9

// Sample project data
const projects = ref([
  {
    id: 1,
    title: 'Digitalisasi Sistem Perizinan UMKM Berbasis Web',
    description: 'Proyek perubahan untuk mempermudah proses perizinan UMKM melalui sistem digital terintegrasi yang dapat diakses 24/7 oleh masyarakat.',
    author: 'Budi Santoso',
    institution: 'Kemendagri',
    training: 'digital',
    progress: 95,
    status: 'completed',
    stars: 24,
    views: 156,
    tags: ['digitalisasi', 'perizinan', 'umkm', 'web-app'],
    updatedAt: '2024-12-15',
    createdAt: '2024-11-01'
  },
  {
    id: 2,
    title: 'Implementasi E-Government untuk Pelayanan Kesehatan',
    description: 'Sistem informasi terintegrasi untuk pelayanan kesehatan masyarakat dengan fitur booking online, rekam medis digital, dan monitoring real-time.',
    author: 'Sari Dewi',
    institution: 'Kemenkes',
    training: 'digital',
    progress: 78,
    status: 'ongoing',
    stars: 18,
    views: 89,
    tags: ['e-government', 'kesehatan', 'booking', 'rekam-medis'],
    updatedAt: '2024-12-10',
    createdAt: '2024-10-15'
  },
  {
    id: 3,
    title: 'Sistem Monitoring dan Evaluasi SAKIP Terintegrasi',
    description: 'Platform monitoring dan evaluasi SAKIP dengan dashboard real-time, automated reporting, dan sistem early warning untuk pencapaian target kinerja.',
    author: 'Ahmad Rahman',
    institution: 'BPKP',
    training: 'sakip',
    progress: 100,
    status: 'completed',
    stars: 32,
    views: 203,
    tags: ['sakip', 'monitoring', 'evaluasi', 'dashboard'],
    updatedAt: '2024-12-08',
    createdAt: '2024-09-20'
  },
  {
    id: 4,
    title: 'Smart City Dashboard untuk Monitoring Infrastruktur',
    description: 'Dashboard smart city untuk monitoring infrastruktur kota secara real-time dengan integrasi IoT sensors dan predictive analytics.',
    author: 'Maya Sari',
    institution: 'Kementerian PUPR',
    training: 'inovasi',
    progress: 65,
    status: 'ongoing',
    stars: 15,
    views: 67,
    tags: ['smart-city', 'iot', 'infrastruktur', 'analytics'],
    updatedAt: '2024-12-12',
    createdAt: '2024-11-05'
  },
  {
    id: 5,
    title: 'Transformasi Digital Sistem Pendidikan Nasional',
    description: 'Platform digital untuk transformasi sistem pendidikan dengan learning management system, virtual classroom, dan assessment tools.',
    author: 'Dr. Indra Wijaya',
    institution: 'Kemendikbudristek',
    training: 'manajemen',
    progress: 45,
    status: 'ongoing',
    stars: 28,
    views: 134,
    tags: ['pendidikan', 'lms', 'virtual-class', 'assessment'],
    updatedAt: '2024-12-14',
    createdAt: '2024-10-30'
  },
  {
    id: 6,
    title: 'Sistem Informasi Bantuan Sosial Terintegrasi',
    description: 'Sistem informasi untuk manajemen bantuan sosial dengan fitur verifikasi penerima, distribusi tracking, dan reporting otomatis.',
    author: 'Lisa Permata',
    institution: 'Kemensos',
    training: 'digital',
    progress: 88,
    status: 'ongoing',
    stars: 21,
    views: 98,
    tags: ['bansos', 'verifikasi', 'tracking', 'reporting'],
    updatedAt: '2024-12-11',
    createdAt: '2024-11-10'
  }
])

// Computed properties
const filteredProjects = computed(() => {
  let filtered = projects.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.author.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Training filter
  if (selectedTraining.value) {
    filtered = filtered.filter(project => project.training === selectedTraining.value)
  }

  // Institution filter
  if (selectedInstitution.value) {
    filtered = filtered.filter(project => 
      project.institution.toLowerCase().includes(selectedInstitution.value.toLowerCase())
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'popular':
      filtered.sort((a, b) => b.stars - a.stars)
      break
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'progress':
      filtered.sort((a, b) => b.progress - a.progress)
      break
    default: // latest
      filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }

  return filtered
})

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProjects.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const completedProjects = computed(() => {
  return filteredProjects.value.filter(p => p.status === 'completed').length
})

const ongoingProjects = computed(() => {
  return filteredProjects.value.filter(p => p.status === 'ongoing').length
})

const totalContributors = computed(() => {
  return new Set(filteredProjects.value.map(p => p.author)).size
})

// Utility functions
const getProjectBorderColor = (status) => {
  switch (status) {
    case 'completed': return 'border-green-500'
    case 'ongoing': return 'border-blue-500'
    default: return 'border-gray-300'
  }
}

const getProgressColor = (progress) => {
  if (progress >= 90) return 'progress-success'
  if (progress >= 70) return 'progress-info'
  if (progress >= 50) return 'progress-warning'
  return 'progress-error'
}

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-500'
    case 'ongoing': return 'bg-blue-500'
    default: return 'bg-gray-400'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Kemarin'
  if (diffDays < 7) return `${diffDays} hari lalu`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan lalu`
  return `${Math.floor(diffDays / 365)} tahun lalu`
}

// Watch for filter changes to reset pagination
watch([searchQuery, selectedTraining, selectedInstitution, sortBy], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}
</style>