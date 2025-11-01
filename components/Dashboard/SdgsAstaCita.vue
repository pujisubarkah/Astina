<template>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-blue-900 mb-6">SDGs dan Asta Cita</h2>
    <p class="text-blue-700 mb-6">Distribusi produk pembelajaran berdasarkan SDGs dan Asta Cita</p>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- SDGs Section -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <h3 class="card-title text-xl text-blue-800 mb-4">Produk Pembelajaran Mendukung SDGs</h3>
          
          <!-- Loading State -->
          <div v-if="sdgsPending" class="text-center py-8">
            <div class="loading loading-spinner loading-lg"></div>
            <p class="text-gray-500 mt-2">Memuat data SDGs...</p>
          </div>
          
          <!-- Error State -->
          <div v-else-if="sdgsError" class="alert alert-error">
            <span>Error loading SDGs data: {{ sdgsError }}</span>
          </div>
          
          <!-- SDGs Content -->
          <div v-else>
            <div class="mb-4 p-4 bg-blue-50 rounded-lg">
              <p class="text-sm text-blue-700 font-semibold">Total <span class="text-lg font-bold">{{ totalProdukSDGs }}</span> Produk Pembelajaran</p>
            </div>
            
            <!-- SDGs Bar Chart Only -->
            <client-only>
              <apexchart 
                type="bar" 
                height="500" 
                :options="sdgsChartOptions" 
                :series="sdgsChartSeries" 
              />
            </client-only>
          </div>
        </div>
      </div>

      <!-- Asta Cita Chart -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <h3 class="card-title text-xl text-blue-800 mb-4">Produk Pembelajaran Mendukung Asta Cita</h3>
          <div class="mb-4 p-4 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-700 font-semibold">Total <span class="text-lg font-bold">257</span> Produk Pembelajaran</p>
          </div>
          <client-only>
            <apexchart 
              type="bar" 
              height="450" 
              :options="astaCitaChartOptions" 
              :series="astaCitaChartSeries" 
            />
          </client-only>
          
          <!-- Asta Cita Legend -->
          <div class="mt-6 bg-blue-50 p-4 rounded-lg max-h-60 overflow-y-auto">
            <h4 class="font-semibold text-blue-900 mb-3">Asta Cita</h4>
            <div class="space-y-2 text-sm">
              <div class="flex items-start gap-2">
                <span class="font-semibold text-blue-700">1.</span>
                <span>Memperkokoh ideologi Pancasila, demokrasi, dan HAM</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="font-semibold text-blue-700">2.</span>
                <span>Memantapkan sistem pertahanan keamanan negara serta mendorong kemandirian bangsa melalui swasembada pangan, energi, air, ekonomi kreatif, ekonomi hijau, dan ekonomi biru</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="font-semibold text-blue-700">3.</span>
                <span>Meningkatkan lapangan kerja yang berkualitas, mendorong kewirausahaan, mengembangkan industri kreatif, dan melanjutkan pembangunan infrastruktur</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="font-semibold text-blue-700">4.</span>
                <span>Memperkuat pembangunan Sumber Daya Manusia (SDM), sains, teknologi, pendidikan, kesehatan, prestasi olahraga, kesetaraan gender, serta penguatan peran perempuan, pemuda, dan penyandang disabilitas</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="font-semibold text-blue-700">5.</span>
                <span>Melanjutkan hilirisasi dan industrialisasi untuk meningkatkan nilai tambah di dalam negeri</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="font-semibold text-blue-700">6.</span>
                <span>Membangun dari desa dan dari bawah untuk pemerataan ekonomi dan pengentasan kemiskinan</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="font-semibold text-blue-700">7.</span>
                <span>Memperkuat reformasi politik, hukum, dan birokrasi, serta memperkuat pencegahan dan pemberantasan korupsi dan narkoba</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="font-semibold text-blue-700">8.</span>
                <span>Memperkuat penyelarasan kehidupan yang harmonis dengan lingkungan, alam, dan budaya, serta meningkatkan toleransi antarumat beragama untuk mewujudkan masyarakat yang adil dan makmur</span>
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

// SDGs Chart Configuration - Clean bar chart with image tooltips
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
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 6,
      dataLabels: {
        position: 'top'
      },
      distributed: false
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: 25,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#fff']
    },
    formatter: function(val) {
      return val + ' produk'
    }
  },
  xaxis: {
    categories: sdgsData.value
      .sort((a, b) => b.tujuan_ke - a.tujuan_ke) // Sort descending untuk ranking
      .map(sdg => `SDG ${sdg.tujuan_ke}`),
    labels: {
      style: {
        fontSize: '12px',
        fontWeight: '500'
      }
    },
    title: {
      text: 'Jumlah Produk Pembelajaran',
      style: {
        fontSize: '14px',
        fontWeight: '600'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        fontWeight: '500'
      }
    }
  },
  colors: ['#3b82f6'],
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 3
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      const sdg = sdgsData.value
        .sort((a, b) => b.tujuan_ke - a.tujuan_ke)[dataPointIndex]
      
      if (!sdg) return '<div class="p-2">No data</div>'
      
      const count = getSDGCount(sdg.tujuan_ke)
      return `<div class="bg-white p-4 shadow-xl rounded-lg border max-w-sm">
        <div class="flex items-center gap-3 mb-3">
          <img src="${sdg.image}" alt="SDG ${sdg.tujuan_ke}" class="w-12 h-12 rounded shadow-sm" onerror="this.src='/sdgs/placeholder.png'" />
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

// Asta Cita Chart Configuration
const astaCitaChartOptions = computed(() => ({
  chart: {
    id: 'asta-cita-chart',
    type: 'bar',
    toolbar: {
      show: true
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 4,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: 30,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#333']
    }
  },
  xaxis: {
    categories: [
      'Asta Cita 8', 'Asta Cita 7', 'Asta Cita 6', 'Asta Cita 5', 
      'Asta Cita 4', 'Asta Cita 3', 'Asta Cita 2', 'Asta Cita 1'
    ],
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  colors: ['#10b981'],
  grid: {
    borderColor: '#e5e7eb'
  },
  tooltip: {
    y: {
      formatter: function(val) {
        return val + ' produk'
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
.card {
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>