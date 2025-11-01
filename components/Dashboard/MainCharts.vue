<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <!-- Program Distribution Chart -->
    <div class="card bg-white shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Distribusi Proyek per Program</h2>
        <client-only>
          <div v-if="pending" class="flex items-center justify-center h-80">
            <div class="loading loading-spinner loading-lg"></div>
          </div>
          <div v-else-if="error" class="flex items-center justify-center h-80">
            <p class="text-red-500">Error: {{ error }}</p>
          </div>
          <div v-else-if="chartOptions && series && series.length > 0">
            <apexchart 
              :key="`chart1-${chartKey}`"
              type="bar" 
              height="350" 
              :options="chartOptions" 
              :series="series" 
            />
          </div>
          <div v-else class="flex items-center justify-center h-80">
            <p class="text-gray-500">No data available</p>
          </div>
        </client-only>
      </div>
    </div>

    <!-- Institution Categories Donut Chart -->
    <div class="card bg-white shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Distribusi Proyek per Kategori Instansi</h2>
        <client-only>
          <div v-if="pending" class="flex items-center justify-center h-80">
            <div class="loading loading-spinner loading-lg"></div>
          </div>
          <div v-else-if="error" class="flex items-center justify-center h-80">
            <p class="text-red-500">Error: {{ error }}</p>
          </div>
          <div v-else-if="chartOptions2 && series2 && series2.length > 0">
            <apexchart 
              :key="`chart2-${chartKey}`"
              type="donut" 
              height="350" 
              :options="chartOptions2" 
              :series="series2" 
            />
          </div>
          <div v-else class="flex items-center justify-center h-80">
            <p class="text-gray-500">No data available</p>
          </div>
        </client-only>
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
  },
  onInstansiDetail: {
    type: Function,
    default: () => {}
  }
})

// Chart key for re-rendering
const chartKey = ref(0)

// Computed properties untuk chart data
const programData = computed(() => {
  return props.data?.summary_program?.programs || []
})

const instansiData = computed(() => {
  return props.data?.summary_instansi?.categories || []
})

// Watch untuk force refresh charts
watch(() => props.data, () => {
  chartKey.value++
}, { deep: true })

// Program Chart Options
const chartOptions = computed(() => ({
  chart: { 
    id: 'program-bar',
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
    categories: programData.value?.map(item => {
      const name = item.programNama || 'Unknown'
      return name.length > 30 ? name.substring(0, 30) + '...' : name
    }) || [],
    labels: {
      rotate: -45,
      style: {
        fontSize: '11px'
      }
    }
  },
  colors: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'],
  dataLabels: { 
    enabled: true,
    style: {
      fontSize: '11px',
      fontWeight: 'bold',
      colors: ['#FFFFFF']
    },
    formatter: function(val) {
      return val.toLocaleString()
    }
  },
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 8,
      columnWidth: '80%'
    }
  },
  legend: {
    show: false
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      const program = programData.value[dataPointIndex]
      return `<div class="bg-white p-3 shadow-lg rounded border">
        <strong>${program?.programNama || 'N/A'}</strong><br/>
        ID Program: <strong>${program?.programId || 'N/A'}</strong><br/>
        Total Proyek: <strong>${(program?.count || 0).toLocaleString()}</strong>
      </div>`
    }
  }
}))

const series = computed(() => [{ 
  name: 'Jumlah Proyek', 
  data: programData.value?.map(item => item.count) || []
}])

// Institution Donut Chart Options
const chartOptions2 = computed(() => ({
  chart: { 
    id: 'instansi-donut',
    events: {
      dataPointSelection: function(event, chartContext, config) {
        if (props.onInstansiDetail) {
          props.onInstansiDetail(config.dataPointIndex)
        }
      }
    }
  },
  labels: instansiData.value?.map(item => item.kategori_name || 'N/A') || [],
  colors: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'],
  dataLabels: { 
    enabled: true,
    style: {
      fontSize: '11px',
      fontWeight: 'bold',
      colors: ['#FFFFFF']
    },
    formatter: function(val, opts) {
      return val.toFixed(1) + '%'
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '60%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total Proyek',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            formatter: function(w) {
              const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0)
              return total.toLocaleString()
            }
          }
        }
      }
    }
  },
  legend: {
    position: 'bottom',
    fontSize: '11px',
    markers: {
      width: 10,
      height: 10
    },
    formatter: function(seriesName, opts) {
      const value = opts.w.globals.series[opts.seriesIndex]
      return seriesName + ': ' + value.toLocaleString()
    }
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      const kategori = instansiData.value?.[seriesIndex]
      const value = series[seriesIndex]
      const total = series.reduce((a, b) => a + b, 0)
      const percentage = ((value / total) * 100).toFixed(1)
      return `<div class="bg-white p-3 shadow-lg rounded border">
        <strong>${kategori?.kategori_name || 'N/A'}</strong><br/>
        ID Kategori: <strong>${kategori?.kategori_id || 'N/A'}</strong><br/>
        Total Proyek: <strong>${value.toLocaleString()}</strong><br/>
        Persentase: <strong>${percentage}%</strong><br/>
        Total Instansi: <strong>${kategori?.total_instansi || 0}</strong><br/>
        <small class="text-gray-500">Klik untuk melihat detail instansi</small>
      </div>`
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom',
        fontSize: '10px'
      }
    }
  }]
}))

const series2 = computed(() => 
  instansiData.value?.map(item => item.total_proyek) || []
)
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>