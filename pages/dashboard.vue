<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-blue-900 mb-2">Dashboard Proyek Perubahan</h1>
        <p class="text-blue-700">Monitoring dan analisis data proyek perubahan real-time</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <p class="text-sm text-gray-600">K/L Terlibat</p>
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
const totalProjects = ref(156)
const activeTrainings = ref(12)
const totalInstitutions = ref(23)
const averageProgress = ref(67)

// Chart refs
const trainingChart = ref(null)
const institutionChart = ref(null)
const keywordsChart = ref(null)
const timelineChart = ref(null)

// Sample data
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

const institutionData = [
  { name: 'Kemendagri', value: 25 },
  { name: 'Kemenkes', value: 22 },
  { name: 'Kemendikbudristek', value: 20 },
  { name: 'Kementerian PUPR', value: 18 },
  { name: 'Kemensos', value: 15 },
  { name: 'Kemenkumham', value: 12 },
  { name: 'Kemenag', value: 10 },
  { name: 'BPS', value: 8 },
  { name: 'BPKP', value: 7 },
  { name: 'Lainnya', value: 19 }
]

const keywordsData = [
  { name: 'Digitalisasi', value: 85 },
  { name: 'Pelayanan Publik', value: 72 },
  { name: 'Sistem Informasi', value: 68 },
  { name: 'Inovasi', value: 54 },
  { name: 'Reformasi', value: 48 },
  { name: 'Smart City', value: 42 },
  { name: 'E-Government', value: 38 },
  { name: 'Transparansi', value: 35 },
  { name: 'Efisiensi', value: 32 },
  { name: 'Akuntabilitas', value: 28 },
  { name: 'Transformasi', value: 25 },
  { name: 'Online', value: 22 },
  { name: 'Monitoring', value: 20 },
  { name: 'Otomasi', value: 18 }
]

const timelineData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  completed: [8, 12, 15, 18, 22, 28, 35, 42, 48, 55, 62, 67],
  ongoing: [15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52],
  planned: [5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42]
}

onMounted(() => {
  initCharts()
})

const initCharts = () => {
  // Training Chart (Doughnut)
  const trainingChartInstance = echarts.init(trainingChart.value)
  trainingChartInstance.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: { fontSize: 12 }
    },
    series: [
      {
        name: 'Proyek per Pelatihan',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        data: trainingData,
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

  // Institution Chart (Bar)
  const institutionChartInstance = echarts.init(institutionChart.value)
  institutionChartInstance.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
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
      data: institutionData.map(item => item.name),
      axisLabel: { fontSize: 10 }
    },
    series: [
      {
        name: 'Jumlah Proyek',
        type: 'bar',
        data: institutionData.map(item => item.value),
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
  keywordsChartInstance.setOption({
    title: {
      text: 'Kata Kunci Populer',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#374151'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        return `<strong>${params.name}</strong><br/>Frekuensi: ${params.value[1]} kali muncul`
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '15%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 10
    },
    yAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 10
    },
    series: [
      {
        name: 'Keywords',
        type: 'scatter',
        symbolSize: function(data) {
          return Math.sqrt(data[1]) * 8 // Size based on frequency
        },
        data: keywordsData.map((item, index) => [
          Math.random() * 8 + 1, // Random X position
          Math.random() * 8 + 1, // Random Y position
          item.value,
          item.name
        ]),
        itemStyle: {
          color: function(params) {
            const colors = [
              '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', 
              '#EF4444', '#06B6D4', '#84CC16', '#EC4899',
              '#6366F1', '#14B8A6', '#F97316', '#8B5CF6'
            ]
            return colors[params.dataIndex % colors.length]
          },
          opacity: 0.8
        },
        label: {
          show: true,
          formatter: function(params) {
            return params.data[3] // Show keyword name
          },
          fontSize: function(params) {
            return Math.max(10, Math.min(20, params.data[2] / 4)) // Font size based on frequency
          },
          fontWeight: function(params) {
            return params.data[2] > 50 ? 'bold' : 'normal'
          },
          color: '#fff',
          textShadowBlur: 2,
          textShadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        emphasis: {
          focus: 'self',
          scale: 1.2,
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      }
    ]
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