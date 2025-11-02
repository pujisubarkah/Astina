<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-blue-900 mb-2">Dashboard Monitoring Produk Pembelajaran</h1>
        <p class="text-blue-700">Statistik dan visualisasi produk pembelajaran secara real-time</p>
      </div>

      <!-- Tab Navigation -->
      <div class="mb-8">
        <div class="tabs tabs-boxed bg-white shadow-lg p-2">
          <a 
            class="tab tab-lg" 
            :class="{ 'tab-active': activeTab === 'sdgs' }"
            @click="activeTab = 'sdgs'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            SDGs dan Asta Cita
          </a>
          <a 
            class="tab tab-lg" 
            :class="{ 'tab-active': activeTab === 'ekonomi' }"
            @click="activeTab = 'ekonomi'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Dampak Ekonomi
          </a>
          <a 
            class="tab tab-lg" 
            :class="{ 'tab-active': activeTab === 'ngram' }"
            @click="activeTab = 'ngram'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analisis N-Gram
          </a>
          <a 
            class="tab tab-lg" 
            :class="{ 'tab-active': activeTab === 'google' }"
            @click="activeTab = 'google'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Statistik Google Search
          </a>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="mb-8">
        <div class="alert alert-info">
          <div class="loading loading-spinner loading-sm"></div>
          <span>Memuat data dashboard dari endpoint terpadu...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error mb-8">
        <span>Error loading data: {{ error }}</span>
      </div>

      <!-- Dashboard Components -->
      <div v-else>
        <!-- Tab Content -->
        <div v-show="activeTab === 'sdgs'">
          <MonitoringSdgsAstaCita />
        </div>

        <div v-show="activeTab === 'ekonomi'">
          <MonitoringEconomicImpact />
        </div>

        <div v-show="activeTab === 'ngram'">
          <MonitoringGoogleScholar />
        </div>

        <div v-show="activeTab === 'google'">
          <MonitoringGoogleSearch />
        </div>
        
        <!-- Development Controls -->
        <div class="mt-8">
          <div class="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-bold">Komponen Sementara Dinonaktifkan</h3>
                <div class="text-xs">Stats Cards, Main Charts, dan Keyword Analysis sedang dioptimasi untuk performa yang lebih baik.</div>
              </div>
              <div class="flex gap-2">
                <div class="badge badge-info">Development Mode</div>
                <div class="badge badge-success">Fast Loading ⚡</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Active tab state
const activeTab = ref('sdgs')

// Temporarily disable heavy API call - use mock data for testing
const dashboardData = ref({
  summary_program: { total_program: 0, programs: [] },
  summary_instansi: { total_kategori: 0, categories: [] },
  summary_kata_kunci: { total_instansi: 0, total_kategori: 0, categories: [] },
  overview: {
    total_program: 0,
    total_instansi_kategori: 0,
    total_instansi_with_keywords: 0,
    total_proyek: 0,
    total_keywords: 0
  }
})
const pending = ref(false)
const error = ref(null)

// Original API call - commented out for performance testing
/*
const { data: dashboardData, pending, error } = await useAsyncData('dashboard-summary', async () => {
  try {
    const res = await fetch('/api/monitoring/summary')
    const json = await res.json()
    console.log('Dashboard API Response:', json)
    if (json.success && json.data) {
      return json.data
    }
    return null
  } catch (e) {
    console.error('Error fetching dashboard data:', e)
    return null
  }
}, {
  default: () => null,
  server: false,
  lazy: true
})
*/

// Function for showing institution detail modal (passed to MainCharts component)
function showInstansiDetail(dataPointIndex) {
  console.log('Show detail for institution:', dataPointIndex)
  // This function will be handled by the MainCharts component
}

// Set page metadata
useHead({
  title: 'Dashboard Statistik | ASTINA',
  meta: [
    { name: 'description', content: 'Dashboard statistik untuk memantau dan menganalisis produk pembelajaran pelatihan kepemimpinan.' }
  ]
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.tab {
  transition: all 0.2s ease;
}

.tab-active {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  font-weight: 600;
}
</style>
