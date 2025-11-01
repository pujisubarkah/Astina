<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-blue-900 mb-2">Dashboard Monitoring Produk Pembelajaran</h1>
        <p class="text-blue-700">Statistik dan visualisasi produk pembelajaran secara real-time</p>
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
        <!-- Skip heavy components for now - load only fast components -->
        
        <!-- Stats Cards - SKIPPED for now -->
        <!-- <DashboardStatsCards :data="dashboardData" /> -->

        <!-- Main Charts - SKIPPED for now -->
        <!-- <DashboardMainCharts 
          :data="dashboardData" 
          @show-detail="showInstansiDetail" 
        /> -->

        <!-- Keyword Analysis - SKIPPED for now -->
        <!-- <DashboardKeywordAnalysis :data="dashboardData" /> -->

        <!-- Only show lightweight static components -->
        
        <!-- SDGs and Asta Cita -->
        <DashboardSdgsAstaCita />

        <!-- Economic Impact -->
        <DashboardEconomicImpact />

        <!-- Google Scholar -->
        <DashboardGoogleScholar />
        
        <!-- Development Controls -->
        <div class="mb-8">
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
    const res = await fetch('/api/dashboard/summary')
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
</style>
