<template>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-blue-900 mb-6">Dampak Nilai Ekonomi</h2>
    <p class="text-blue-700 mb-6">Analisis dampak ekonomi dari produk pembelajaran berdasarkan program pelatihan</p>
    
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
            <p class="text-sm text-blue-700">Berdampak Secara Nilai Ekonomi</p>
          </div>
          <client-only>
            <apexchart 
              type="pie" 
              height="300" 
              :options="economicChartOptions" 
              :series="currentEconomicData.chartSeries" 
            />
          </client-only>
          
          <!-- Training Cost Table -->
          <div class="mt-6 overflow-x-auto">
            <table class="table table-sm w-full">
              <thead>
                <tr class="bg-blue-100">
                  <th class="text-blue-900">Pelatihan</th>
                  <th class="text-blue-900">Alumni</th>
                  <th class="text-blue-900">Biaya</th>
                  <th class="text-blue-900">Jumlah Biaya</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-semibold">{{ currentEconomicData.programCode }}</td>
                  <td>{{ currentEconomicData.alumni }}</td>
                  <td>{{ currentEconomicData.cost }}</td>
                  <td class="font-bold text-blue-600">{{ currentEconomicData.totalCost }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Economic Impact Details -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <h3 class="card-title text-xl text-blue-800 mb-4">Detail Dampak Ekonomi</h3>
          
          <!-- Total Training Cost -->
          <div class="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p class="text-sm text-gray-700">Dengan total biaya pelatihan sebanyak</p>
            <p class="text-2xl font-bold text-yellow-600">{{ currentEconomicData.totalTrainingCost }}</p>
            <p class="text-sm text-gray-700 mt-2">diperoleh perkiraan Dampak Nilai Ekonomi oleh Proper yang dihasilkan {{ currentEconomicData.programName }} sebanyak:</p>
          </div>

          <!-- Economic Impact Amount -->
          <div class="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
            <p class="text-3xl font-bold text-green-600">{{ currentEconomicData.economicImpact }}</p>
          </div>

          <!-- Analysis -->
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-900 mb-3">Keterangan:</h4>
            <div class="text-sm text-blue-800 space-y-2">
              <p>{{ currentEconomicData.analysis }}</p>
              <p v-if="currentEconomicData.additionalInfo" class="mt-4">{{ currentEconomicData.additionalInfo }}</p>
              <p class="font-semibold mt-4">*Tim Ditjar mapim sedang mengembangkan instrumen yang dapat digunakan oleh peserta dalam menghitung dampak nilai ekonomi produk pembelajaran</p>
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
    chartSeries: [29, 16], // Ya: 29, Tidak: 16
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
    chartSeries: [40, 16], // Ya: 40, Tidak: 16
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
    chartSeries: [44, 16], // Ya: 44, Tidak: 16
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
    chartSeries: [43, 19], // Ya: 43, Tidak: 19
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
    chartSeries: [28, 14], // Ya: 28, Tidak: 14
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
    chartSeries: [29, 14], // Ya: 29, Tidak: 14
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

// Economic Chart Options
const economicChartOptions = computed(() => ({
  chart: {
    id: 'economic-impact-pie',
    type: 'pie'
  },
  labels: ['Ya', 'Tidak'],
  colors: ['#10b981', '#ef4444'],
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      colors: ['#fff']
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '0%'
      }
    }
  },
  legend: {
    position: 'bottom',
    fontSize: '14px'
  },
  tooltip: {
    y: {
      formatter: function(val) {
        return val + ' alumni'
      }
    }
  }
}))
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>