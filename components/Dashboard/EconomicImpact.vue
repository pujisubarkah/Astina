<template>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-blue-900 mb-6">Dampak Nilai Ekonomi</h2>
    <p class="text-blue-700 mb-6">Analisis dampak ekonomi dari produk pembelajaran berdasarkan program pelatihan</p>
    
    <!-- Overall ROI Highlight -->
    <div class="mb-8 p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl text-white shadow-xl overall-roi-card">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold mb-2">Total Return on Investment</h3>
          <p class="text-green-100 text-sm">Keseluruhan program pelatihan</p>
        </div>
        <div class="text-right">
          <div class="text-4xl font-bold mb-1">{{ overallROI.toLocaleString('id-ID') }}x</div>
          <p class="text-green-100 text-sm">ROI Keseluruhan</p>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-white/20">
        <p class="text-sm text-green-100">
          Setiap Rp.1 yang diinvestasikan dalam pelatihan menghasilkan Rp.{{ overallROI.toLocaleString('id-ID') }} dampak ekonomi
        </p>
      </div>
    </div>
    
    <!-- Program Selection -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-blue-900 mb-2">Pilih Program:</label>
      <select 
        v-model="selectedEconomicProgram" 
        @change="onEconomicProgramChange"
        class="select select-bordered w-80"
      >
        <option value="pka-vi">PKA Angkatan VI</option>
        <option value="pkn-ii-angkatan-ii">PKN Tk. II Angkatan II</option>
        <option value="pkn-ii-angkatan-x">PKN Tk. II Angkatan X</option>
        <option value="pkn-ii-angkatan-xv">PKN Tk. II Angkatan XV</option>
        <option value="pkn-i-angkatan-lxii">PKN Tk. I Angkatan LXII</option>
        <option value="pkn-i-angkatan-lxiii">PKN Tk. I Angkatan LXIII</option>
      </select>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Economic Impact Chart -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <h3 class="card-title text-xl text-blue-800 mb-4">{{ currentEconomicData.title }}</h3>
          <div class="mb-4 p-4 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-700">Perbandingan Return on Investment (ROI) Antar Program</p>
          </div>
          <client-only>
            <apexchart
              type="line"
              height="350"
              :options="economicChartOptions"
              :series="roiChartSeries"
            />
          </client-only>

          <!-- ROI Indicator -->
          <div class="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">{{ currentEconomicData.programCode }} - ROI</span>
              <div class="text-right">
                <span class="text-lg font-bold text-green-600">{{ currentEconomicData.roi.toLocaleString('id-ID') }}x</span>
                <div class="text-xs text-gray-500">dari total {{ overallROI.toLocaleString('id-ID') }}x</div>
              </div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div class="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
                   :style="`width: ${Math.min((currentEconomicData.roi / overallROI) * 100, 100)}%`"></div>
            </div>
            <p class="text-xs text-gray-600">Kontribusi terhadap ROI keseluruhan program</p>
          </div>
          
          <!-- Training Cost Table -->
          <div class="mt-6 overflow-x-auto">
            <h4 class="font-semibold text-gray-800 mb-3">Rincian Biaya dan Manfaat</h4>
            <table class="table table-sm w-full">
              <thead>
                <tr class="bg-blue-100">
                  <th class="text-blue-900">Program</th>
                  <th class="text-blue-900">Jumlah Alumni</th>
                  <th class="text-blue-900">Biaya per Peserta</th>
                  <th class="text-blue-900">Total Biaya</th>
                  <th class="text-blue-900">Manfaat Ekonom</th>
                  <th class="text-blue-900">Net Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-semibold">{{ currentEconomicData.programCode }}</td>
                  <td class="text-center">{{ currentEconomicData.alumni }}</td>
                  <td>{{ currentEconomicData.cost }}</td>
                  <td class="font-semibold text-blue-600">{{ currentEconomicData.totalCost }}</td>
                  <td class="font-semibold text-green-600">{{ currentEconomicData.economicImpact }}</td>
                  <td class="font-semibold text-purple-600">{{ currentEconomicData.netBenefit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Economic Impact Details -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <h3 class="card-title text-xl text-blue-800 mb-4">Cost Benefit Analysis (CBA)</h3>

          <!-- CBA Summary -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p class="text-sm text-gray-700 font-medium">Total Biaya Investasi</p>
              <p class="text-2xl font-bold text-blue-600">{{ currentEconomicData.totalTrainingCost }}</p>
              <p class="text-xs text-gray-600">Biaya pelatihan program</p>
            </div>
            <div class="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <p class="text-sm text-gray-700 font-medium">Total Manfaat Ekonomi</p>
              <p class="text-2xl font-bold text-green-600">{{ currentEconomicData.economicImpact }}</p>
              <p class="text-xs text-gray-600">Dampak ekonomi dihasilkan</p>
            </div>
          </div>

          <!-- CBA Metrics -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="p-3 bg-purple-50 rounded-lg text-center border border-purple-200">
              <p class="text-xs text-gray-600 font-medium">Net Benefit</p>
              <p class="text-lg font-bold text-purple-600">{{ currentEconomicData.netBenefit }}</p>
              <p class="text-xs text-gray-500">Manfaat - Biaya</p>
            </div>
            <div class="p-3 bg-orange-50 rounded-lg text-center border border-orange-200">
              <p class="text-xs text-gray-600 font-medium">B/C Ratio</p>
              <p class="text-lg font-bold text-orange-600">{{ currentEconomicData.benefitCostRatio }}</p>
              <p class="text-xs text-gray-500">Manfaat/Biaya</p>
            </div>
            <div class="p-3 bg-teal-50 rounded-lg text-center border border-teal-200">
              <p class="text-xs text-gray-600 font-medium">ROI</p>
              <p class="text-lg font-bold text-teal-600">{{ currentEconomicData.roi }}x</p>
              <p class="text-xs text-gray-500">Return on Investment</p>
            </div>
          </div>

          <!-- CBA Analysis -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-3">Analisis Cost Benefit</h4>
            <div class="space-y-3 text-sm text-gray-700">
              <div class="flex justify-between items-center">
                <span>Biaya Investasi per Peserta:</span>
                <span class="font-semibold">{{ currentEconomicData.cost }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Jumlah Alumni:</span>
                <span class="font-semibold">{{ currentEconomicData.alumni }} orang</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Manfaat Ekonomi per Rupiah Investasi:</span>
                <span class="font-semibold text-green-600">Rp.{{ currentEconomicData.roi }}</span>
              </div>
              <div class="flex justify-between items-center border-t pt-2">
                <span>Kesimpulan CBA:</span>
                <span class="font-bold text-green-600">{{ currentEconomicData.cbaConclusion }}</span>
              </div>
            </div>
          </div>

          <!-- CBA Standards Reference -->
          <div class="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h5 class="font-semibold text-blue-900 mb-2">Standar Cost Benefit Analysis (CBA)</h5>
            <div class="text-xs text-blue-800 space-y-1">
              <p><strong>Benefit-Cost Ratio (B/C):</strong> Rasio antara total manfaat dengan total biaya (>1 = beneficial)</p>
              <p><strong>Net Benefit:</strong> Selisih antara total manfaat dan total biaya</p>
              <p><strong>ROI:</strong> Return on Investment = (Manfaat - Biaya) / Biaya × 100</p>
              <p><strong>Kesimpulan:</strong> B/C > 1 dan Net Benefit > 0 menunjukkan investasi layak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// State untuk economic program selection
const selectedEconomicProgram = ref('pka-vi')

// Economic Impact Data
const economicProgramsData = {
  'pka-vi': {
    title: 'Dampak Produk Pembelajaran PKA Angkatan VI',
    programName: 'Alumni PKA Angkatan VI',
    programCode: 'PKA VI',
    alumni: 45,
    cost: 'Rp. 17.000.000',
    totalCost: 'Rp. 765.000.000',
    totalTrainingCost: 'Rp. 765.000.000',
    economicImpact: 'RP. 182.056.198.175',
    roi: 238, // ROI calculation
    netBenefit: 'Rp. 181.291.198.175',
    benefitCostRatio: '238.07',
    cbaConclusion: 'Highly Beneficial',
    chartSeries: [{
      name: 'Biaya Pelatihan',
      data: [7.65] // in billions
    }, {
      name: 'Dampak Ekonomi',
      data: [182.06] // in billions
    }],
    analysis: 'Perhitungan dampak ekonomi berasal dari perhitungan masing-masing peserta dengan menggunakan metode cost and benefit analysis.',
    additionalInfo: null
  },
  'pkn-ii-angkatan-ii': {
    title: 'Dampak Produk Pembelajaran PKN Tk. II Angkatan II',
    programName: 'Alumni PKN Tk. II Angkatan II',
    programCode: 'PKN II',
    alumni: 56,
    cost: 'Rp. 22.945.000',
    totalCost: 'Rp. 1.284.920.000',
    totalTrainingCost: 'Rp. 1.284.920.000',
    economicImpact: 'RP. 3.545.174.496.580',
    roi: 2758,
    netBenefit: 'Rp. 3.543.889.576.580',
    benefitCostRatio: '2,758.07',
    cbaConclusion: 'Highly Beneficial',
    chartSeries: [{
      name: 'Biaya Pelatihan',
      data: [1.28] // in billions
    }, {
      name: 'Dampak Ekonomi',
      data: [3545.17] // in billions
    }],
    analysis: 'Perhitungan dampak ekonomi berasal dari perhitungan masing-masing peserta dengan menggunakan metode cost and benefit analysis. Terdapat data outlier yang kami hapus karena ada 1 alumni memiliki dampak ekonomi sebanyak RP.3.000.000.000.000.000 peserta an Dr. Ir. Heru Kustanto, M.Si. Judul: STRATEGI PENGUATAN TATA KELOLA PROGRAM PENINGKATAN PENGGUNAAN PRODUK DALAM NEGERI UNTUK MENDUKUNG PERTUMBUHAN EKONOMI DI KEMENTERIAN PERINDUSTRIAN',
    additionalInfo: null
  },
  'pkn-ii-angkatan-x': {
    title: 'Dampak Produk Pembelajaran PKN Tk. II Angkatan X',
    programName: 'Alumni PKN Tk. II Angkatan X',
    programCode: 'PKN II',
    alumni: 60,
    cost: 'Rp. 22.945.000',
    totalCost: 'Rp. 1.376.700.000',
    totalTrainingCost: 'Rp. 1.376.700.000',
    economicImpact: 'RP. 1.078.328.515.145',
    roi: 782,
    netBenefit: 'Rp. 1.076.951.815.145',
    benefitCostRatio: '782.07',
    cbaConclusion: 'Highly Beneficial',
    chartSeries: [{
      name: 'Biaya Pelatihan',
      data: [1.38] // in billions
    }, {
      name: 'Dampak Ekonomi',
      data: [1078.33] // in billions
    }],
    analysis: 'Perhitungan dampak ekonomi berasal dari perhitungan masing-masing peserta dengan menggunakan metode cost and benefit analysis',
    additionalInfo: null
  },
  'pkn-ii-angkatan-xv': {
    title: 'Dampak Produk Pembelajaran PKN Tk. II Angkatan XV',
    programName: 'Alumni PKN Tk. II Angkatan XV',
    programCode: 'PKN II',
    alumni: 62,
    cost: 'Rp. 22.945.000',
    totalCost: 'Rp. 1.422.590.000',
    totalTrainingCost: 'Rp. 1.422.590.000',
    economicImpact: 'RP. 17.771.815.162.988',
    roi: 12491,
    netBenefit: 'Rp. 17.770.392.572.988',
    benefitCostRatio: '12,491.07',
    cbaConclusion: 'Highly Beneficial',
    chartSeries: [{
      name: 'Biaya Pelatihan',
      data: [1.42] // in billions
    }, {
      name: 'Dampak Ekonomi',
      data: [17771.82] // in billions
    }],
    analysis: 'Perhitungan dampak ekonomi berasal dari perhitungan masing-masing peserta dengan menggunakan metode cost and benefit analysis.',
    additionalInfo: null
  },
  'pkn-i-angkatan-lxii': {
    title: 'Dampak Produk Pembelajaran PKN Tk. I Angkatan LXII',
    programName: 'Alumni PKN Tk. I Angkatan LXII',
    programCode: 'PKN I',
    alumni: 42,
    cost: 'Rp. 40.000.000',
    totalCost: 'Rp. 1.680.000.000',
    totalTrainingCost: 'Rp. 1.680.000.000',
    economicImpact: 'RP. 26.636.612.830.604',
    roi: 15879,
    netBenefit: 'Rp. 26.634.932.830.604',
    benefitCostRatio: '15,879.07',
    cbaConclusion: 'Highly Beneficial',
    chartSeries: [{
      name: 'Biaya Pelatihan',
      data: [1.68] // in billions
    }, {
      name: 'Dampak Ekonomi',
      data: [26636.61] // in billions
    }],
    analysis: 'Perhitungan dampak ekonomi berasal dari perhitungan masing-masing peserta dengan menggunakan metode cost and benefit analysis',
    additionalInfo: null
  },
  'pkn-i-angkatan-lxiii': {
    title: 'Dampak Produk Pembelajaran PKN Tk. I Angkatan LXIII',
    programName: 'Alumni PKN Tk. I Angkatan LXIII',
    programCode: 'PKN I',
    alumni: 43,
    cost: 'Rp. 40.000.000',
    totalCost: 'Rp. 1.720.000.000',
    totalTrainingCost: 'Rp. 1.720.000.000',
    economicImpact: 'RP. 410.096.393.798.828',
    roi: 238426,
    netBenefit: 'Rp. 410.094.673.798.828',
    benefitCostRatio: '238,426.07',
    cbaConclusion: 'Highly Beneficial',
    chartSeries: [{
      name: 'Biaya Pelatihan',
      data: [1.72] // in billions
    }, {
      name: 'Dampak Ekonomi',
      data: [410096.39] // in billions
    }],
    analysis: 'Perhitungan dampak ekonomi berasal dari perhitungan masing-masing peserta dengan menggunakan metode cost and benefit analysis.',
    additionalInfo: null
  }
}

// Function untuk handle perubahan program ekonomi
function onEconomicProgramChange() {
  console.log('Economic program changed to:', selectedEconomicProgram.value)
}

// Computed property untuk data ekonomi saat ini
const currentEconomicData = computed(() => {
  return economicProgramsData[selectedEconomicProgram.value] || economicProgramsData['pka-vi']
})

// Overall ROI calculation across all programs
const overallROI = computed(() => {
  const allPrograms = Object.values(economicProgramsData)
  const totalCost = allPrograms.reduce((sum, program) => sum + program.chartSeries[0].data[0], 0)
  const totalImpact = allPrograms.reduce((sum, program) => sum + program.chartSeries[1].data[0], 0)
  return Math.round(totalImpact / totalCost)
})

// Economic Chart Options
const economicChartOptions = computed(() => ({
  chart: {
    id: 'economic-impact-line',
    type: 'line',
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
      speed: 1500,
      animateGradually: {
        enabled: true,
        delay: 200
      },
      dynamicAnimation: {
        enabled: true,
        speed: 500
      }
    }
  },
  stroke: {
    curve: 'smooth',
    width: 4,
    colors: ['#10b981']
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.4,
      gradientToColors: ['#34d399', '#6ee7b7'],
      inverseColors: false,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 100]
    }
  },
  markers: {
    size: 6,
    colors: ['#065f46'],
    strokeColors: '#ffffff',
    strokeWidth: 3,
    hover: {
      size: 8
    }
  },
  dataLabels: {
    enabled: true,
    background: {
      enabled: true,
      foreColor: '#065f46',
      padding: 6,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#10b981',
      opacity: 0.9
    },
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#ffffff']
    },
    formatter: function(val) {
      return val + 'x'
    },
    offsetY: -10
  },
  xaxis: {
    categories: ['PKA VI', 'PKN II-2', 'PKN II-10', 'PKN II-15', 'PKN I-62', 'PKN I-63'],
    labels: {
      style: {
        fontSize: '12px',
        fontWeight: '600',
        colors: '#374151'
      },
      rotate: -45
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
      },
      formatter: function(val) {
        if (val >= 1000) {
          return (val / 1000).toFixed(0) + 'Kx'
        }
        return val + 'x'
      }
    },
    title: {
      text: 'Return on Investment (ROI)',
      style: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#065f46'
      }
    }
  },
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
    theme: 'light',
    y: {
      formatter: function(val) {
        return val.toLocaleString('id-ID') + 'x ROI'
      }
    },
    marker: {
      show: true
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

// ROI Chart Series for all programs
const roiChartSeries = computed(() => [{
  name: 'ROI',
  data: [
    economicProgramsData['pka-vi'].roi,
    economicProgramsData['pkn-ii-angkatan-ii'].roi,
    economicProgramsData['pkn-ii-angkatan-x'].roi,
    economicProgramsData['pkn-ii-angkatan-xv'].roi,
    economicProgramsData['pkn-i-angkatan-lxii'].roi,
    economicProgramsData['pkn-i-angkatan-lxiii'].roi
  ]
}])
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Enhanced gradient animations */
@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientFlow 6s ease infinite;
}

/* Pulse effect for overall ROI */
@keyframes gentlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.overall-roi-card {
  animation: gentlePulse 4s ease-in-out infinite;
}

/* Enhanced line chart styling */
.apexcharts-tooltip {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  border-radius: 8px !important;
  border: 1px solid #e2e8f0 !important;
}

.apexcharts-tooltip-title {
  background: linear-gradient(135deg, #065f46, #10b981) !important;
  color: white !important;
  font-weight: 600 !important;
  border-radius: 6px 6px 0 0 !important;
}

/* Smooth gradient animation */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
}

/* Enhanced marker styling */
.apexcharts-marker {
  filter: drop-shadow(0 2px 4px rgba(6, 95, 70, 0.3));
}

/* Custom scrollbar for better UX */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #10b981, #34d399);
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #065f46, #10b981);
}
</style>