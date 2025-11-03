<template>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-blue-900 mb-6">Statistik Penelusuran Google</h2>
    <p class="text-blue-700 mb-6">Rekap hasil pencarian Google untuk proyek perubahan dan aksi perubahan</p>
    
    <!-- Data Table -->
    <div class="card bg-white shadow-lg mb-6">
      <div class="card-body">
        <h3 class="card-title text-xl text-blue-800 mb-4">Rekap Hasil Pencarian Google</h3>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr class="bg-blue-900 text-white">
                <th class="text-white">Tahun</th>
                <th class="text-white">2021</th>
                <th class="text-white">2022</th>
                <th class="text-white">2023</th>
                <th class="text-white">2024</th>
                <th class="text-white">2025 (s.d Sept)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-semibold text-red-600">Proyek Perubahan</td>
                <td>194.000</td>
                <td>282.000</td>
                <td>3.290.000</td>
                <td>5.050.000</td>
                <td>5.440.000</td>
              </tr>
              <tr>
                <td class="font-semibold text-red-600">Aksi Perubahan</td>
                <td>171.000</td>
                <td>333.000</td>
                <td>2.220.000</td>
                <td>3.480.000</td>
                <td>4.350.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="card bg-white shadow-lg">
      <div class="card-body">
        <h3 class="card-title text-xl text-blue-800 mb-4">Grafik Hasil Pencarian Google</h3>
        <client-only>
          <apexchart 
            type="line" 
            height="400" 
            :options="googleSearchChartOptions" 
            :series="googleSearchChartSeries" 
          />
        </client-only>
        
        <!-- Insight Box -->
        <div class="mt-6 bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold text-blue-900 mb-3">Insight</h4>
          <div class="text-sm text-blue-800 space-y-2">
            <p>Dari grafik hasil pencarian Google terhadap kata kunci <span class="font-semibold text-red-600">proyek perubahan</span> dan <span class="font-semibold text-red-600">aksi perubahan</span> dapat disimpulkan bahwa <span class="font-semibold">peningkatan signifikan</span> terhadap hasil pencarian di google <span class="font-semibold text-red-600">terjadi sejak Tahun 2023</span>.</p>
            
            <p>Hal ini memberikan bukti bahwa <span class="font-semibold">Keputusan Kepala Lembaga Administrasi Negara Nomor: 2/K.1/PDP.07/2023</span> Tentang Pedoman Penyelenggaraan Pelatihan Struktural Kepemimpinan dengan memasukkan <span class="font-semibold text-red-600">Implementasi Strategi Marketing dan Diseminasi</span> dalam unsur penilaian <span class="font-semibold text-red-600">berdampak signifikan terhadap peningkatan hasil pencarian di Google</span>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Google Search Chart Configuration
const googleSearchChartOptions = computed(() => ({
  chart: {
    id: 'google-search-chart',
    type: 'line',
    toolbar: {
      show: true
    }
  },
  stroke: {
    width: 3,
    curve: 'smooth'
  },
  markers: {
    size: 6,
    strokeWidth: 2,
    strokeColors: ['#fff'],
    fillOpacity: 1,
    hover: {
      size: 8
    }
  },
  dataLabels: {
    enabled: true,
    background: {
      enabled: true,
      borderRadius: 2,
      padding: 4,
      opacity: 0.8
    },
    style: {
      fontSize: '11px',
      fontWeight: 'bold'
    },
    formatter: function(val) {
      return val.toLocaleString()
    }
  },
  xaxis: {
    categories: ['2021', '2022', '2023', '2024', '2025 (s.d Sept)'],
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
      },
      formatter: function(val) {
        return val.toLocaleString()
      }
    },
    title: {
      text: 'Jumlah Hasil Pencarian'
    }
  },
  colors: ['#3b82f6', '#f59e0b'],
  grid: {
    borderColor: '#e5e7eb'
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center'
  },
  tooltip: {
    y: {
      formatter: function(val) {
        return val.toLocaleString() + ' hasil'
      }
    }
  }
}))

const googleSearchChartSeries = computed(() => ([
  {
    name: 'Proyek Perubahan',
    data: [194000, 282000, 3290000, 5050000, 5440000]
  },
  {
    name: 'Aksi Perubahan',
    data: [171000, 333000, 2220000, 3480000, 4350000]
  }
]))
</script>
