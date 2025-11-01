<template>
  <div class="card bg-white shadow-lg mb-8">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="card-title text-lg font-semibold text-gray-800">Kata Kunci Terpopuler per Instansi</h2>
          <p class="text-sm text-gray-600">Pilih instansi untuk melihat kata kunci yang sering digunakan</p>
          <p class="text-xs text-blue-500" v-if="keywordData?.total_instansi">
            Total {{ keywordData.total_instansi }} instansi tersedia
            <span v-if="selectedInstansiName && selectedKategoriName" class="text-green-600">
              • Selected: {{ selectedKategoriName }} - {{ selectedInstansiName }}
            </span>
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <select 
            v-model="selectedKategoriId" 
            @change="onKategoriChange"
            class="select select-bordered w-48"
            :disabled="pending"
          >
            <option value="">Pilih Kategori...</option>
            <option 
              v-for="kategori in keywordData?.summary || []" 
              :key="kategori.kategori_id"
              :value="kategori.kategori_id"
            >
              {{ kategori.kategori_name }} ({{ kategori.total_instansi }} instansi)
            </option>
          </select>
          
          <select 
            v-model="selectedInstansiId" 
            @change="onInstansiChange"
            class="select select-bordered w-64"
            :disabled="!selectedKategoriId || pending"
          >
            <option value="">Pilih Instansi...</option>
            <option 
              v-for="instansi in availableInstansi" 
              :key="instansi.instansi_id"
              :value="instansi.instansi_id"
            >
              {{ instansi.nama_instansi }} ({{ instansi.total_keywords }} keywords)
            </option>
          </select>
        </div>
      </div>
      
      <div v-if="selectedKeywords.length > 0" class="bg-gray-50 rounded-lg p-4">
        <client-only>
          <div v-if="keywordChartOptions && keywordChartSeries && keywordChartSeries.length > 0">
            <apexchart 
              :key="`chart3-${chartKey}`"
              type="bar" 
              height="400" 
              :options="keywordChartOptions" 
              :series="keywordChartSeries" 
            />
          </div>
          <div v-else class="flex items-center justify-center h-96">
            <div class="loading loading-spinner loading-lg"></div>
          </div>
        </client-only>
      </div>
      
      <div v-else-if="pending" class="text-center py-8">
        <div class="loading loading-spinner loading-lg"></div>
        <p class="text-gray-500 mt-2">Memuat data kata kunci...</p>
      </div>
      
      <div v-else class="text-center py-8 text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p v-if="!selectedKategoriId">Pilih kategori terlebih dahulu</p>
        <p v-else-if="!selectedInstansiId">Pilih instansi untuk melihat analisis kata kunci</p>
        <p v-else>Tidak ada data kata kunci untuk instansi ini</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props untuk menerima data dari parent
const props = defineProps({
  data: {
    type: Object,
    default: () => null
  },
  pending: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

// Chart key for re-rendering
const chartKey = ref(0)

// State untuk filtering kata kunci
const selectedKategoriId = ref('')
const selectedKategoriName = ref('')
const selectedInstansiId = ref('')
const selectedInstansiName = ref('')
const selectedKeywords = ref([])

// Computed properties
const keywordData = computed(() => {
  if (!props.data?.summary_kata_kunci) return { summary: [] }
  return {
    summary: props.data.summary_kata_kunci.categories,
    total_instansi: props.data.summary_kata_kunci.total_instansi,
    total_kategori: props.data.summary_kata_kunci.total_kategori
  }
})

const availableInstansi = computed(() => {
  if (!selectedKategoriId.value || !keywordData.value?.summary) return []
  
  const kategori = keywordData.value.summary.find(k => 
    k.kategori_id.toString() === selectedKategoriId.value.toString()
  )
  
  return kategori?.instansi || []
})

// Functions
function onKategoriChange() {
  // Reset instansi dan keywords saat kategori berubah
  selectedInstansiId.value = ''
  selectedInstansiName.value = ''
  selectedKeywords.value = []
  
  if (!selectedKategoriId.value || !keywordData.value?.summary) {
    selectedKategoriName.value = ''
    return
  }
  
  const kategori = keywordData.value.summary.find(k => 
    k.kategori_id.toString() === selectedKategoriId.value.toString()
  )
  
  if (kategori) {
    selectedKategoriName.value = kategori.kategori_name
  }
}

function onInstansiChange() {
  if (!selectedInstansiId.value || !availableInstansi.value.length) {
    selectedKeywords.value = []
    selectedInstansiName.value = ''
    return
  }
  
  const instansi = availableInstansi.value.find(item => 
    item.instansi_id.toString() === selectedInstansiId.value.toString()
  )
  
  if (instansi) {
    selectedKeywords.value = instansi.top_keywords || []
    selectedInstansiName.value = instansi.nama_instansi
  } else {
    selectedKeywords.value = []
    selectedInstansiName.value = ''
  }
}

// Auto-select default when data is ready
function autoSelectDefault() {
  if (!keywordData.value?.summary || keywordData.value.summary.length === 0) return
  
  const firstKategori = keywordData.value.summary[0]
  if (firstKategori && firstKategori.instansi && firstKategori.instansi.length > 0) {
    selectedKategoriId.value = firstKategori.kategori_id.toString()
    selectedKategoriName.value = firstKategori.kategori_name
    
    const topInstansi = firstKategori.instansi
      .sort((a, b) => b.total_keywords - a.total_keywords)[0]
    
    if (topInstansi) {
      selectedInstansiId.value = topInstansi.instansi_id.toString()
      selectedInstansiName.value = topInstansi.nama_instansi
      selectedKeywords.value = topInstansi.top_keywords || []
    }
  }
}

// Keyword Chart Options
const keywordChartOptions = computed(() => ({
  chart: { 
    id: 'keyword-bar',
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
  xaxis: { 
    categories: selectedKeywords.value.map(item => item.keyword),
    labels: {
      rotate: -45,
      style: {
        fontSize: '11px'
      }
    }
  },
  colors: [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#AED6F1', '#F9E79F',
    '#D7BDE2', '#A9DFBF', '#FAD7A0', '#E8DAEF', '#D5DBDB'
  ],
  dataLabels: { 
    enabled: true,
    style: {
      fontSize: '10px',
      fontWeight: 'bold',
      colors: ['#FFFFFF']
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      distributed: true,
      columnWidth: '70%'
    }
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      const keyword = selectedKeywords.value[dataPointIndex]
      return `<div class="bg-white p-3 shadow-lg rounded border">
        <strong>${keyword?.keyword || 'N/A'}</strong><br/>
        Frekuensi: <strong>${keyword?.count || 0}</strong><br/>
        <small class="text-gray-500">dalam proyek ${selectedInstansiName.value}</small>
      </div>`
    }
  },
  title: {
    text: `Top Keywords - ${selectedInstansiName.value} (${selectedKategoriName.value})`,
    style: {
      fontSize: '14px',
      fontWeight: 'bold'
    }
  },
  legend: {
    show: false
  },
  grid: {
    borderColor: '#e7e7e7',
    strokeDashArray: 3
  }
}))

const keywordChartSeries = computed(() => [{ 
  name: 'Frekuensi', 
  data: selectedKeywords.value.map(item => item.count)
}])

// Watch for data changes
watch(() => props.data, (newVal) => {
  if (newVal?.summary_kata_kunci?.categories && newVal.summary_kata_kunci.categories.length > 0 && !selectedKategoriId.value) {
    autoSelectDefault()
  }
  chartKey.value++
}, { deep: true })

watch(selectedKeywords, () => {
  chartKey.value++
}, { deep: true })

// Initialize when component mounts
onMounted(() => {
  if (keywordData.value?.summary && keywordData.value.summary.length > 0) {
    autoSelectDefault()
  }
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