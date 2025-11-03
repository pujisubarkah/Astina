<template>
  <div class="mb-12">
    <!-- Header Section with Gradient -->
    <div class="relative mb-8">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl opacity-10"></div>
      <div class="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SDGs dan Asta Cita
            </h2>
            <p class="text-gray-600 text-lg mt-1">Distribusi produk pembelajaran berdasarkan SDGs dan Asta Cita</p>
          </div>
        </div>

        <!-- Animated Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-500 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-blue-700">Total SDGs</p>
                <p class="text-2xl font-bold text-blue-800">{{ totalProdukSDGs }}</p>
                <p class="text-xs text-blue-600">Produk Pembelajaran</p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-500 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-green-700">Asta Cita</p>
                <p class="text-2xl font-bold text-green-800">257</p>
                <p class="text-xs text-green-600">Produk Pembelajaran</p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-purple-500 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-purple-700">Total Keseluruhan</p>
                <p class="text-2xl font-bold text-purple-800">{{ totalProdukSDGs + 257 }}</p>
                <p class="text-xs text-purple-600">Produk Pembelajaran</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- SDGs Section -->
      <div class="group">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          <!-- Card Header with Gradient -->
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold">SDGs Distribution</h3>
                <p class="text-blue-100 text-sm">Sustainable Development Goals</p>
              </div>
            </div>
          </div>

          <div class="p-6">
            <!-- Loading State -->
            <div v-if="sdgsPending" class="text-center py-12">
              <div class="relative">
                <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 animate-spin mx-auto h-16 w-16" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
              </div>
              <p class="text-gray-500 mt-4 font-medium">Memuat data SDGs...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="sdgsError" class="bg-red-50 border border-red-200 rounded-xl p-4">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-red-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-red-800">Error Loading Data</p>
                  <p class="text-red-600 text-sm">{{ sdgsError }}</p>
                </div>
              </div>
            </div>

            <!-- SDGs Content -->
            <div v-else>
              <!-- Chart Container -->
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
                <client-only>
                  <apexchart
                    type="bar"
                    height="450"
                    :options="sdgsChartOptions"
                    :series="sdgsChartSeries"
                    class="transition-all duration-300"
                  />
                </client-only>
              </div>

              <!-- Top SDGs Cards with Scroll -->
              <div class="grid grid-cols-1 gap-3">
                <div v-for="sdg in allSdgsSorted" :key="sdg.tujuan_ke"
                     class="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <img :src="sdg.image" :alt="`SDG ${sdg.tujuan_ke}`"
                           class="w-12 h-12 rounded-lg shadow-md border-2 border-white"
                           @error="handleImageError" />
                      <div class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                        {{ sdg.tujuan_ke }}
                      </div>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-blue-800 text-sm">{{ sdg.sdgs.split(' ').slice(0, 6).join(' ') }}...</h4>
                      <p class="text-blue-600 font-bold">{{ getSDGCount(sdg.tujuan_ke) }} produk</p>
                    </div>
                    <div class="text-right">
                      <div class="w-16 bg-blue-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full transition-all duration-500"
                             :style="`width: ${getSDGProgress(sdg.tujuan_ke)}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Asta Cita Section -->
      <div class="group">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          <!-- Card Header with Gradient -->
          <div class="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold">Asta Cita Distribution</h3>
                <p class="text-green-100 text-sm">Program Prioritas Nasional</p>
              </div>
            </div>
          </div>

          <div class="p-6">
            <!-- Chart Container -->
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-100">
              <client-only>
                <apexchart
                  type="bar"
                  height="400"
                  :options="astaCitaChartOptions"
                  :series="astaCitaChartSeries"
                  class="transition-all duration-300"
                />
              </client-only>
            </div>

            <!-- Asta Cita Legend with Cards and Scroll -->
            <div class="space-y-3">
              <h4 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Asta Cita Program
              </h4>

              <div v-for="(item, index) in astaCitaItems" :key="index"
                   class="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-102">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {{ index + 1 }}
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="text-gray-800 text-sm leading-relaxed">{{ item.text }}</p>
                    <div class="mt-2 flex items-center gap-2">
                      <div class="text-xs text-green-600 font-medium">{{ item.count }} produk</div>
                      <div class="flex-1 bg-green-200 rounded-full h-1.5">
                        <div class="bg-green-600 h-1.5 rounded-full transition-all duration-500"
                             :style="`width: ${getAstaCitaProgress(item.count)}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Fetch SDGs data from API
const { data: sdgsApiData, pending: sdgsPending, error: sdgsError } = await useFetch('/api/sdgs')

// Extract SDGs data
const sdgsData = computed(() => {
  return sdgsApiData.value?.data || []
})

// Static data untuk count produk per SDG (bisa diganti dengan API juga nanti)
const sdgsProductCounts = {
  1: 8, 2: 29, 3: 25, 4: 26, 5: 2, 6: 1, 7: 1, 8: 33, 9: 25, 10: 2, 11: 6, 12: 5, 13: 3, 14: 3, 15: 1, 16: 73, 17: 14
}

// Function to get product count for each SDG
const getSDGCount = (tujuanKe) => {
  return sdgsProductCounts[tujuanKe] || 0
}

// Calculate total products
const totalProdukSDGs = computed(() => {
  return Object.values(sdgsProductCounts).reduce((sum, count) => sum + count, 0)
})

// Top SDGs for cards display
const topSdgs = computed(() => {
  return sdgsData.value
    .map(sdg => ({
      ...sdg,
      count: getSDGCount(sdg.tujuan_ke)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

// All SDGs sorted by count (descending)
const allSdgsSorted = computed(() => {
  return sdgsData.value
    .map(sdg => ({
      ...sdg,
      count: getSDGCount(sdg.tujuan_ke)
    }))
    .sort((a, b) => b.count - a.count)
})

// Asta Cita items with counts
const astaCitaItems = [
  { text: "Memperkokoh ideologi Pancasila, demokrasi, dan HAM", count: 12 },
  { text: "Memantapkan sistem pertahanan keamanan negara serta mendorong kemandirian bangsa melalui swasembada pangan, energi, air, ekonomi kreatif, ekonomi hijau, dan ekonomi biru", count: 43 },
  { text: "Meningkatkan lapangan kerja yang berkualitas, mendorong kewirausahaan, mengembangkan industri kreatif, dan melanjutkan pembangunan infrastruktur", count: 25 },
  { text: "Memperkuat pembangunan Sumber Daya Manusia (SDM), sains, teknologi, pendidikan, kesehatan, prestasi olahraga, kesetaraan gender, serta penguatan peran perempuan, pemuda, dan penyandang disabilitas", count: 75 },
  { text: "Melanjutkan hilirisasi dan industrialisasi untuk meningkatkan nilai tambah di dalam negeri", count: 1 },
  { text: "Membangun dari desa dan dari bawah untuk pemerataan ekonomi dan pengentasan kemiskinan", count: 20 },
  { text: "Memperkuat reformasi politik, hukum, dan birokrasi, serta memperkuat pencegahan dan pemberantasan korupsi dan narkoba", count: 70 },
  { text: "Memperkuat penyelarasan kehidupan yang harmonis dengan lingkungan, alam, dan budaya, serta meningkatkan toleransi antarumat beragama untuk mewujudkan masyarakat yang adil dan makmur", count: 11 }
]

// Progress calculation functions
const getSDGProgress = (tujuanKe) => {
  const count = getSDGCount(tujuanKe)
  const maxCount = Math.max(...Object.values(sdgsProductCounts))
  return maxCount > 0 ? (count / maxCount) * 100 : 0
}

const getAstaCitaProgress = (count) => {
  const maxCount = Math.max(...astaCitaItems.map(item => item.count))
  return maxCount > 0 ? (count / maxCount) * 100 : 0
}

// SDGs Chart Configuration - Enhanced with animations and better styling
const sdgsChartOptions = computed(() => ({
  chart: {
    id: 'sdgs-chart',
    type: 'bar',
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      }
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 1000,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 8,
      dataLabels: {
        position: 'top'
      },
      distributed: false,
      barHeight: '70%'
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: 25,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#1e40af']
    },
    formatter: function(val) {
      return val + ' produk'
    }
  },
  xaxis: {
    categories: sdgsData.value
      .sort((a, b) => b.tujuan_ke - a.tujuan_ke)
      .map(sdg => `SDG ${sdg.tujuan_ke}`),
    labels: {
      style: {
        fontSize: '12px',
        fontWeight: '500',
        colors: '#64748b'
      }
    },
    title: {
      text: 'Jumlah Produk Pembelajaran',
      style: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#1e40af'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        fontWeight: '500',
        colors: '#64748b'
      }
    }
  },
  colors: ['#3b82f6'],
  grid: {
    borderColor: '#e2e8f0',
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      const sdg = sdgsData.value
        .sort((a, b) => b.tujuan_ke - a.tujuan_ke)[dataPointIndex]

      if (!sdg) return '<div class="p-2">No data</div>'

      const count = getSDGCount(sdg.tujuan_ke)
      return `<div class="bg-white p-4 shadow-xl rounded-lg border max-w-sm border-blue-200">
        <div class="flex items-center gap-3 mb-3">
          <img src="${sdg.image}" alt="SDG ${sdg.tujuan_ke}" class="w-12 h-12 rounded-lg shadow-sm border-2 border-blue-100" onerror="this.src='/sdgs/placeholder.png'" />
          <div>
            <p class="font-bold text-blue-700 text-lg">SDG ${sdg.tujuan_ke}</p>
            <p class="text-2xl font-bold text-blue-600">${count} produk</p>
          </div>
        </div>
        <p class="text-sm font-medium text-gray-700 leading-relaxed">${sdg.sdgs}</p>
      </div>`
    }
  },
  legend: {
    show: false
  },
  states: {
    hover: {
      filter: {
        type: 'lighten',
        value: 0.1
      }
    }
  }
}))

const sdgsChartSeries = computed(() => {
  if (!sdgsData.value.length) return [{ name: 'Jumlah Produk', data: [] }]
  
  return [{
    name: 'Jumlah Produk',
    data: sdgsData.value
      .sort((a, b) => b.tujuan_ke - a.tujuan_ke) // Sort descending for chart
      .map(sdg => getSDGCount(sdg.tujuan_ke))
  }]
})

// Handle image loading errors
const handleImageError = (event) => {
  event.target.src = '/sdgs/placeholder.png' // Fallback image
  console.warn('Failed to load SDG image:', event.target.src)
}

// Asta Cita Chart Configuration - Enhanced styling
const astaCitaChartOptions = computed(() => ({
  chart: {
    id: 'asta-cita-chart',
    type: 'bar',
    toolbar: {
      show: true
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 1000,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 8,
      dataLabels: {
        position: 'top'
      },
      barHeight: '70%'
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: 30,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#065f46']
    },
    formatter: function(val) {
      return val + ' produk'
    }
  },
  xaxis: {
    categories: [
      'Asta Cita 8', 'Asta Cita 7', 'Asta Cita 6', 'Asta Cita 5',
      'Asta Cita 4', 'Asta Cita 3', 'Asta Cita 2', 'Asta Cita 1'
    ],
    labels: {
      style: {
        fontSize: '12px',
        fontWeight: '500',
        colors: '#64748b'
      }
    },
    title: {
      text: 'Jumlah Produk Pembelajaran',
      style: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#065f46'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        fontWeight: '500',
        colors: '#64748b'
      }
    }
  },
  colors: ['#10b981'],
  grid: {
    borderColor: '#e2e8f0',
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      const astaCitaIndex = 7 - dataPointIndex // Reverse index since categories are reversed
      const item = astaCitaItems[astaCitaIndex]
      if (!item) return '<div class="p-2">No data</div>'

      return `<div class="bg-white p-4 shadow-xl rounded-lg border max-w-sm border-green-200">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            ${astaCitaIndex + 1}
          </div>
          <div>
            <p class="font-bold text-green-700 text-lg">Asta Cita ${astaCitaIndex + 1}</p>
            <p class="text-2xl font-bold text-green-600">${item.count} produk</p>
          </div>
        </div>
        <p class="text-sm font-medium text-gray-700 leading-relaxed">${item.text.length > 100 ? item.text.substring(0, 100) + '...' : item.text}</p>
      </div>`
    }
  },
  states: {
    hover: {
      filter: {
        type: 'lighten',
        value: 0.1
      }
    }
  }
}))

const astaCitaChartSeries = computed(() => ([{
  name: 'Jumlah Produk',
  data: [11, 70, 20, 1, 75, 25, 43, 12]
}]))
</script>

<style scoped>
/* Enhanced animations and effects */
.group:hover .group {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateY(-4px);
}

/* Gradient text animation */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

/* Pulse animation for stats cards */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.stat:hover {
  animation: pulse 2s infinite;
}

/* Loading spinner enhancement */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Progress bar animation */
.progress-bar {
  transition: width 0.8s ease-in-out;
}

/* Card hover effects */
.hover\:scale-102:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Shadow enhancements */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .group:hover .group {
    transform: none;
  }

  .card:hover {
    transform: none;
  }
}
</style>