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

      <!-- Progress Timeline -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Timeline Progress Proyek Bulanan</h2>
          <div ref="timelineChart" class="w-full h-80"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'

// Page metadata
useHead({
  title: 'Dashboard Proyek Perubahan - Astina',
  meta: [
    { name: 'description', content: 'Dashboard monitoring dan analisis proyek perubahan' }
  ]
})

// Reactive data
const totalProjects = ref(0)
const activeTrainings = ref(0)
const totalInstitutions = ref(0)
const averageProgress = ref(67)
const isLoading = ref(true)
const error = ref(null)

// Data from APIs
const institutionSummary = ref([])
const trainingSummary = ref([])
const keywordsSummary = ref([])

// Chart refs
const trainingChart = ref(null)
const institutionChart = ref(null)
const keywordsChart = ref(null)
const timelineChart = ref(null)

// Sample data untuk chart yang belum menggunakan API real
const trainingData = [
  { name: 'SAKIP & Reformasi Birokrasi', value: 32 },
  { name: 'Digitalisasi Pelayanan Publik', value: 28 },
  { name: 'Manajemen Perubahan', value: 24 },
  { name: 'Inovasi Pelayanan', value: 20 },
  { name: 'Leadership Excellence', value: 18 },
  { name: 'Data Analytics', value: 16 },
  { name: 'Smart Government', value: 12 },
  { name: 'Customer Service', value: 6 }
]

// Data untuk fetch API
async function fetchDashboardData() {
  try {
    isLoading.value = true
    error.value = null

    // Fetch institution summary
    const institutionRes = await fetch('/api/proper/summary_instansi')
    const institutionData = await institutionRes.json()

    if (institutionData.success && Array.isArray(institutionData.summary)) {
      institutionSummary.value = institutionData.summary
      totalInstitutions.value = institutionSummary.value.length
      totalProjects.value = institutionSummary.value.reduce((total, item) => total + item.count, 0)
    }

    // Fetch training summary
    const trainingRes = await fetch('/api/proper/summary_program')
    const trainingDataResp = await trainingRes.json()

    if (trainingDataResp.success && Array.isArray(trainingDataResp.summary)) {
      trainingSummary.value = trainingDataResp.summary
      activeTrainings.value = trainingSummary.value.length
    }

    // Fetch keywords summary
    const keywordsRes = await fetch('/api/abstract/summary_kata_kunci')
    const keywordsDataResp = await keywordsRes.json()
    if (keywordsDataResp.success && Array.isArray(keywordsDataResp.summary)) {
      keywordsSummary.value = keywordsDataResp.summary
    }
  } catch (err) {
    console.error('Error fetching dashboard data:', err)
    error.value = 'Gagal memuat data dashboard'
  } finally {
    isLoading.value = false
  }
}

// keywordsData diambil dari API

const timelineData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  completed: [8, 12, 15, 18, 22, 28, 35, 42, 48, 55, 62, 67],
  ongoing: [15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52],
  planned: [5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42]
}

onMounted(async () => {
  await fetchDashboardData()
  // Pastikan charts di-init setelah data ter-load
  if (!isLoading.value && !error.value) {
    initCharts()
  }
})

// Watch untuk update chart ketika data berubah
watch([institutionSummary, trainingSummary], () => {
  if (!isLoading.value && !error.value && trainingChart.value && institutionChart.value) {
    initCharts()
  }
})

const initCharts = () => {
  if (isLoading.value || error.value) return
  
  // Training Chart (Doughnut) - menggunakan data dari API
  const trainingChartInstance = echarts.init(trainingChart.value)
  const trainingChartData = trainingSummary.value.map(item => ({
    name: item.programNama,
    value: item.count
  }))
  
  trainingChartInstance.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} proyek ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: { fontSize: 12 }
    },
    series: [
      {
        name: 'Proyek per Program',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        data: trainingChartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        }
      }
    ],
    color: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16', '#EC4899']
  })

  // Institution Chart (Bar) - menggunakan data dari API
  const institutionChartInstance = echarts.init(institutionChart.value)
  // Ambil top 10 instansi dengan proyek terbanyak
  const topInstitutions = institutionSummary.value
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(item => ({
      name: item.namaInstansi && item.namaInstansi.length > 25 ? 
        item.namaInstansi.substring(0, 25) + '...' : 
        item.namaInstansi || 'Unknown',
      value: item.count,
      fullName: item.namaInstansi || 'Unknown'
    }))
  
  institutionChartInstance.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        const data = params[0]
        const originalData = institutionSummary.value.find(item => 
          item.namaInstansi === topInstitutions[data.dataIndex].fullName
        )
        return `<strong>${originalData?.namaInstansi || 'Unknown'}</strong><br/>
                Jumlah Proyek: ${originalData?.count || 0}`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { fontSize: 10 }
    },
    yAxis: {
      type: 'category',
      data: topInstitutions.map(item => item.name),
      axisLabel: { fontSize: 10 }
    },
    series: [
      {
        name: 'Jumlah Proyek',
        type: 'bar',
        data: topInstitutions.map(item => item.value),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#3B82F6' },
            { offset: 1, color: '#1E40AF' }
          ])
        }
      }
    ]
  })

  // Keywords Chart (Bubble Chart instead of Word Cloud)
  const keywordsChartInstance = echarts.init(keywordsChart.value)
  // Ambil top 20 keywords dan bersihkan nama
  const topKeywords = keywordsSummary.value
    .map(item => ({
      ...item,
      cleanKeyword: item.keyword
        .replace(/['\[\]\"]+/g, '') // hapus tanda kutip, kurung, dan double quote
        .replace(/^,+|,+$/g, '') // hapus koma di awal/akhir
        .replace(/\s+/g, ' ') // normalisasi spasi
        .trim()
    }))
  .filter(item => item.cleanKeyword.length > 1)
  .slice(0, 100)

  // Layout bubble agar tidak tumpang tindih dan label di tengah
  const bubbleData = topKeywords.map((item, idx) => ({
    value: item.count,
    name: item.cleanKeyword,
    symbolSize: Math.max(40, Math.sqrt(item.count) * 10),
    itemStyle: {
      color: [
        '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444',
        '#06B6D4', '#84CC16', '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#8B5CF6'
      ][idx % 12],
      opacity: 0.85,
      borderWidth: 2,
      borderColor: '#fff',
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.15)'
    },
    label: {
      show: true,
      position: 'inside',
      formatter: item.cleanKeyword,
      fontSize: Math.max(12, Math.min(22, item.count / 3)),
      fontWeight: item.count > 50 ? 'bold' : 'normal',
      color: '#fff',
      textShadowBlur: 2,
      textShadowColor: 'rgba(0,0,0,0.5)'
    }
  }))

  keywordsChartInstance.setOption({
    title: {
      text: 'Kata Kunci Populer',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151'
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fff',
      borderColor: '#3B82F6',
      borderWidth: 1,
      textStyle: { color: '#374151', fontSize: 14 },
      formatter: function(params) {
        return `<strong>${params.data.name}</strong><br/>Frekuensi: ${params.data.value} kali muncul`;
      }
    },
    grid: { left: '5%', right: '5%', top: '10%', bottom: '10%', containLabel: true },
    xAxis: { show: false },
    yAxis: { show: false },
    series: [{
      type: 'scatter',
      data: bubbleData,
      symbol: 'circle',
      emphasis: {
        focus: 'self',
        scale: 1.3,
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      }
    }]
  })

  // Timeline Chart (Line)
  const timelineChartInstance = echarts.init(timelineChart.value)
  timelineChartInstance.setOption({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Selesai', 'Sedang Berjalan', 'Direncanakan']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timelineData.months
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Selesai',
        type: 'line',
        smooth: true,
        data: timelineData.completed,
        itemStyle: { color: '#10B981' },
        areaStyle: { 
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
            { offset: 1, color: 'rgba(16, 185, 129, 0.1)' }
          ])
        }
      },
      {
        name: 'Sedang Berjalan',
        type: 'line',
        smooth: true,
        data: timelineData.ongoing,
        itemStyle: { color: '#3B82F6' },
        areaStyle: { 
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
          ])
        }
      },
      {
        name: 'Direncanakan',
        type: 'line',
        smooth: true,
        data: timelineData.planned,
        itemStyle: { color: '#F59E0B' },
        areaStyle: { 
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(245, 158, 11, 0.3)' },
            { offset: 1, color: 'rgba(245, 158, 11, 0.1)' }
          ])
        }
      }
    ]
  })

  // Make charts responsive
  window.addEventListener('resize', () => {
    trainingChartInstance.resize()
    institutionChartInstance.resize()
    keywordsChartInstance.resize()
    timelineChartInstance.resize()
  })
}
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>