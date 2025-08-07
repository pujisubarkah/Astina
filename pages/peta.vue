<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-blue-900 mb-2">Peta Sebaran Proyek Perubahan</h1>
            <p class="text-blue-700">Klik pada provinsi untuk melihat detail proyek perubahan di wilayah tersebut</p>
          </div>
          <div class="flex gap-2">
            <select class="select select-bordered" v-model="selectedCategory">
              <option value="">Semua Kategori</option>
              <option value="digitalisasi">Digitalisasi</option>
              <option value="sakip">SAKIP & Reformasi</option>
              <option value="inovasi">Inovasi</option>
              <option value="manajemen">Manajemen Perubahan</option>
            </select>
            <select class="select select-bordered" v-model="selectedStatus">
              <option value="">Semua Status</option>
              <option value="completed">Selesai</option>
              <option value="ongoing">Berjalan</option>
              <option value="planning">Perencanaan</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div class="stat-title">Total Provinsi</div>
          <div class="stat-value text-blue-600">{{ stats.totalProvinces }}</div>
          <div class="stat-desc">dengan proyek aktif</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
            </svg>
          </div>
          <div class="stat-title">Total Proyek</div>
          <div class="stat-value text-green-600">{{ stats.totalProjects }}</div>
          <div class="stat-desc">di seluruh Indonesia</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="stat-title">Peserta Aktif</div>
          <div class="stat-value text-orange-600">{{ stats.totalParticipants }}</div>
          <div class="stat-desc">dari berbagai K/L</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-purple-600">
            <div class="radial-progress text-purple-600" :style="`--value:${stats.completionRate}; --size:3rem; --thickness: 4px;`">
              <span class="text-sm font-bold">{{ stats.completionRate }}%</span>
            </div>
          </div>
          <div class="stat-title">Tingkat Penyelesaian</div>
          <div class="stat-value text-purple-600">{{ stats.completionRate }}%</div>
          <div class="stat-desc">rata-rata nasional</div>
        </div>
      </div>

      <!-- Map and Details Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Indonesia Map -->
        <div class="lg:col-span-2">
          <div class="card bg-white shadow-lg">
            <div class="card-body">
              <div class="flex items-center justify-between mb-4">
                <h2 class="card-title text-lg font-semibold text-gray-800">Peta Indonesia</h2>
                <div class="flex items-center gap-2">
                  <div class="badge badge-info">Interaktif</div>
                  <span class="text-xs text-gray-500">Klik provinsi untuk detail</span>
                </div>
              </div>
              
              <!-- SVG Map Container -->
              <div class="relative bg-blue-50 rounded-lg p-4" style="height: 500px;">
                <svg
                  viewBox="0 0 1000 600"
                  class="w-full h-full cursor-pointer"
                  @mouseleave="hoveredProvince = null"
                >
                  <g id="indonesia-provinces">
                    <template v-for="prov in provinsiList" :key="prov.id">
                      <path
                        v-if="prov.svgPath"
                        :d="parseSvgPath(prov.svgPath)"
                        :fill="getProvinceColor(prov.code)"
                        :class="getProvinceClass(prov.code)"
                        @click="selectProvince(prov.code)"
                        @mouseenter="hoveredProvince = prov.code"
                      />
                    </template>
                  </g>
                  <!-- Tooltip for hovered province -->
                  <g v-if="hoveredProvince">
                    <rect
                      :x="tooltipPosition.x"
                      :y="tooltipPosition.y"
                      :width="tooltipWidth"
                      height="40"
                      fill="rgba(0,0,0,0.8)"
                      rx="4"
                    />
                    <text
                      :x="tooltipPosition.x + 10"
                      :y="tooltipPosition.y + 15"
                      fill="white"
                      font-size="12"
                      font-weight="bold"
                    >
                      {{ getProvinceName(hoveredProvince) }}
                    </text>
                    <text
                      :x="tooltipPosition.x + 10"
                      :y="tooltipPosition.y + 30"
                      fill="white"
                      font-size="10"
                    >
                      {{ getProvinceProjectCount(hoveredProvince) }} proyek
                    </text>
                  </g>
                </svg>
              </div>

              <!-- Legend -->
              <div class="mt-4 flex flex-wrap gap-4 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Tinggi (10+ proyek)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Sedang (5-9 proyek)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Rendah (1-4 proyek)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>Belum ada proyek</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Province Details Panel -->
        <div class="lg:col-span-1">
          <div class="card bg-white shadow-lg sticky top-6">
            <div class="card-body">
              <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">
                {{ selectedProvinceData ? getProvinceName(selectedProvinceData.code) : 'Detail Provinsi' }}
              </h2>
              
              <!-- No Province Selected -->
              <div v-if="!selectedProvinceData" class="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p class="text-gray-500">Klik provinsi pada peta untuk melihat detail proyek</p>
              </div>

              <!-- Province Data -->
              <div v-else>
                <!-- Province Stats -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="stat bg-blue-50 rounded-lg p-3">
                    <div class="stat-title text-xs">Total Proyek</div>
                    <div class="stat-value text-lg text-blue-600">{{ selectedProvinceData.totalProjects }}</div>
                  </div>
                  <div class="stat bg-green-50 rounded-lg p-3">
                    <div class="stat-title text-xs">Selesai</div>
                    <div class="stat-value text-lg text-green-600">{{ selectedProvinceData.completedProjects }}</div>
                  </div>
                  <div class="stat bg-orange-50 rounded-lg p-3">
                    <div class="stat-title text-xs">Berjalan</div>
                    <div class="stat-value text-lg text-orange-600">{{ selectedProvinceData.ongoingProjects }}</div>
                  </div>
                  <div class="stat bg-purple-50 rounded-lg p-3">
                    <div class="stat-title text-xs">Peserta</div>
                    <div class="stat-value text-lg text-purple-600">{{ selectedProvinceData.participants }}</div>
                  </div>
                </div>

                <!-- Project List -->
                <div class="space-y-3">
                  <h3 class="font-semibold text-gray-800 mb-3">Proyek Terbaru</h3>
                  <div 
                    v-for="project in selectedProvinceData.projects.slice(0, 5)" 
                    :key="project.id"
                    class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    @click="viewProjectDetail(project)"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h4 class="font-medium text-sm text-gray-900 mb-1">{{ project.title }}</h4>
                        <p class="text-xs text-gray-600 mb-2">{{ project.institution }}</p>
                        <div class="flex items-center gap-2">
                          <div class="badge badge-xs" :class="getStatusBadgeClass(project.status)">
                            {{ getStatusText(project.status) }}
                          </div>
                          <span class="text-xs text-gray-500">{{ project.category }}</span>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-xs text-gray-500">{{ formatDate(project.lastUpdate) }}</div>
                        <div class="text-xs font-medium" :class="getProgressClass(project.progress)">
                          {{ project.progress }}%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- View All Button -->
                  <button 
                    v-if="selectedProvinceData.projects.length > 5"
                    class="btn btn-outline btn-sm w-full mt-3"
                    @click="viewAllProjects"
                  >
                    Lihat Semua {{ selectedProvinceData.totalProjects }} Proyek
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Project Detail Modal -->
  <div v-if="selectedProject" class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">{{ selectedProject.title }}</h3>
        <button class="btn btn-sm btn-circle btn-ghost" @click="selectedProject = null">✕</button>
      </div>
      
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Instansi</label>
            <p class="text-sm">{{ selectedProject.institution }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Kategori</label>
            <p class="text-sm">{{ selectedProject.category }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Status</label>
            <div class="badge" :class="getStatusBadgeClass(selectedProject.status)">
              {{ getStatusText(selectedProject.status) }}
            </div>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Progress</label>
            <div class="flex items-center gap-2">
              <progress class="progress w-20" :class="getProgressColor(selectedProject.progress)" :value="selectedProject.progress" max="100"></progress>
              <span class="text-sm font-medium">{{ selectedProject.progress }}%</span>
            </div>
          </div>
        </div>
        
        <div>
          <label class="text-sm font-medium text-gray-600">Deskripsi</label>
          <p class="text-sm text-gray-700 mt-1">{{ selectedProject.description }}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Tanggal Mulai</label>
            <p class="text-sm">{{ formatDate(selectedProject.startDate) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Target Selesai</label>
            <p class="text-sm">{{ formatDate(selectedProject.targetDate) }}</p>
          </div>
        </div>
      </div>
      
      <div class="modal-action">
        <button class="btn btn-primary btn-sm">Lihat Detail Lengkap</button>
        <button class="btn btn-ghost btn-sm" @click="selectedProject = null">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
useHead({
  title: 'Peta Sebaran Proyek - Astina',
  meta: [
    { name: 'description', content: 'Peta interaktif sebaran proyek perubahan di seluruh Indonesia' }
  ]
})

// Reactive data
const selectedCategory = ref('')
const selectedStatus = ref('')
const hoveredProvince = ref(null)
const selectedProvinceData = ref(null)
const selectedProject = ref(null)

// Stats data
const stats = reactive({
  totalProvinces: 28,
  totalProjects: 156,
  totalParticipants: 324,
  completionRate: 73
})

// Province data from API
const provinsiList = ref([])
const provinceData = reactive({})

onMounted(async () => {
  const res = await $fetch('/api/provinsi')
  if (res.success && Array.isArray(res.data)) {
    provinsiList.value = res.data.map((prov) => {
      // Kode provinsi cukup dari nama, lowercase dan tanpa spasi
      const code = prov.nama.toLowerCase().replace(/\s+/g, '')
      provinceData[code] = {
        code,
        name: prov.nama,
        totalProjects: 0,
        completedProjects: 0,
        ongoingProjects: 0,
        participants: 0,
        projects: [],
      }
      return { ...prov, code }
    })
  }
  // Auto-select Jakarta jika ada
  if (provinceData['jakarta']) selectProvince('jakarta')
})

// Helper untuk parse svgPath jika ada escape
function parseSvgPath(svgPath) {
  if (!svgPath) return ''
  try {
    // Jika path string ada escape quote, parse dulu
    if (svgPath.startsWith('"') || svgPath.startsWith("'")) {
      return JSON.parse(svgPath)
    }
    return svgPath
  } catch {
    return svgPath
  }
}

// Computed properties
const tooltipPosition = computed(() => {
  return { x: 50, y: 50 }
})

const tooltipWidth = computed(() => {
  if (!hoveredProvince.value) return 0
  const name = getProvinceName(hoveredProvince.value)
  return Math.max(120, name.length * 8 + 40)
})

// Methods
function getProvinceName(code) {
  const names = {
    aceh: 'Aceh',
    sumut: 'Sumatera Utara',
    sumbar: 'Sumatera Barat',
    riau: 'Riau',
    jambi: 'Jambi',
    sumsel: 'Sumatera Selatan',
    lampung: 'Lampung',
    jakarta: 'DKI Jakarta',
    jabar: 'Jawa Barat',
    jateng: 'Jawa Tengah',
    yogya: 'DI Yogyakarta',
    jatim: 'Jawa Timur',
    bali: 'Bali',
    ntb: 'Nusa Tenggara Barat',
    ntt: 'Nusa Tenggara Timur',
    kalbar: 'Kalimantan Barat',
    kalteng: 'Kalimantan Tengah',
    kalsel: 'Kalimantan Selatan',
    kaltim: 'Kalimantan Timur',
    kalut: 'Kalimantan Utara',
    sulut: 'Sulawesi Utara',
    sulteng: 'Sulawesi Tengah',
    sulsel: 'Sulawesi Selatan',
    sultra: 'Sulawesi Tenggara',
    gorontalo: 'Gorontalo',
    sulbar: 'Sulawesi Barat',
    maluku: 'Maluku',
    malut: 'Maluku Utara',
    papbar: 'Papua Barat',
    papua: 'Papua'
  }
  return names[code] || code
}

function getProvinceProjectCount(code) {
  return provinceData[code]?.totalProjects || 0
}

function getProvinceColor(code) {
  const projectCount = getProvinceProjectCount(code)
  if (projectCount >= 10) return '#10B981' // Green
  if (projectCount >= 5) return '#3B82F6'  // Blue
  if (projectCount >= 1) return '#F59E0B'  // Yellow
  return '#D1D5DB' // Gray
}

function getProvinceClass(code) {
  const baseClass = 'transition-all duration-200 hover:opacity-80 cursor-pointer'
  if (hoveredProvince.value === code) {
    return `${baseClass} stroke-gray-800 stroke-2`
  }
  if (selectedProvinceData.value?.code === code) {
    return `${baseClass} stroke-blue-600 stroke-2`
  }
  return `${baseClass} stroke-white stroke-1`
}

function selectProvince(code) {
  selectedProvinceData.value = provinceData[code]
}

function getStatusBadgeClass(status) {
  const classes = {
    completed: 'badge-success',
    ongoing: 'badge-info',
    planning: 'badge-warning',
    delayed: 'badge-error'
  }
  return classes[status] || 'badge-neutral'
}

function getStatusText(status) {
  const texts = {
    completed: 'Selesai',
    ongoing: 'Berjalan',
    planning: 'Perencanaan',
    delayed: 'Terlambat'
  }
  return texts[status] || status
}

function getProgressClass(progress) {
  if (progress >= 90) return 'text-green-600'
  if (progress >= 70) return 'text-blue-600'
  if (progress >= 50) return 'text-yellow-600'
  return 'text-red-600'
}

function getProgressColor(progress) {
  if (progress >= 90) return 'progress-success'
  if (progress >= 70) return 'progress-info'
  if (progress >= 50) return 'progress-warning'
  return 'progress-error'
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

function viewProjectDetail(project) {
  selectedProject.value = project
}

function viewAllProjects() {
  // Navigate to project list with province filter
  console.log('View all projects for', selectedProvinceData.value.name)
}

// Auto-select Jakarta on mount
onMounted(() => {
  selectProvince('jakarta')
})
</script>

<style scoped>
.modal {
  z-index: 1000;
}

svg path, svg circle {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

svg path:hover, svg circle:hover {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}
</style>
