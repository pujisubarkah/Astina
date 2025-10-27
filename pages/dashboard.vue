<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
  <h1 class="text-4xl font-bold text-blue-900 mb-2">Dashboard Monitoring Produk Pembelajaran</h1>
  <p class="text-blue-700">Statistik dan visualisasi produk pembelajaran secara real-time</p>
      </div>

      <!-- Loading State untuk semua data -->
      <div v-if="pending || keywordDataPending" class="mb-8">
        <div class="alert alert-info">
          <div class="loading loading-spinner loading-sm"></div>
          <span>Memuat data dashboard...</span>
          <div class="text-xs">
            <span v-if="pending">Program: Loading... </span>
            <span v-if="keywordDataPending">Keywords: Loading... </span>
          </div>
        </div>
      </div>

      <!-- Stat Cards -->
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
        <span>Error loading data: {{ error }}</span>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Total Proyek</p>
                <p class="text-2xl font-bold text-blue-600">{{ totalProyek }}</p>
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
                <p class="text-sm text-gray-600">Total Program</p>
                <p class="text-2xl font-bold text-purple-600">{{ totalProgram }}</p>
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
                <p class="text-sm text-gray-600">Program Terbesar</p>
                <p class="text-2xl font-bold text-green-600">{{ programTerbesar?.count || 0 }}</p>
                <p class="text-xs text-gray-500">{{ programTerbesar?.programNama || '-' }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Rata-rata per Program</p>
                <p class="text-2xl font-bold text-yellow-600">{{ rataRataProgram }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart Section: 2 chart sejajar dengan ApexCharts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Distribusi Proyek per Program</h2>
            <client-only>
              <div v-if="chartOptions && series && series.length > 0">
                <apexchart 
                  :key="`chart1-${chartKey}`"
                  type="bar" 
                  height="350" 
                  :options="chartOptions" 
                  :series="series" 
                />
              </div>
              <div v-else class="flex items-center justify-center h-80">
                <div class="loading loading-spinner loading-lg"></div>
              </div>
            </client-only>
          </div>
        </div>
        <div class="card bg-white shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-800 mb-4">Distribusi Proyek per Kategori Instansi</h2>
            <client-only>
              <div v-if="chartOptions2 && series2 && series2.length > 0">
                <apexchart 
                  :key="`chart2-${chartKey}`"
                  type="donut" 
                  height="350" 
                  :options="chartOptions2" 
                  :series="series2" 
                />
              </div>
              <div v-else class="flex items-center justify-center h-80">
                <div class="loading loading-spinner loading-lg"></div>
              </div>
            </client-only>
          </div>
        </div>
      </div>

      <!-- Modal Detail Instansi -->
      <div v-if="showDetail" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">Detail {{ selectedKategori?.kategori_name }}</h3>
            <button @click="closeDetail" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="mb-6">
            <p class="text-sm text-gray-600">Total Proyek: <strong>{{ selectedKategori?.total_proyek }}</strong></p>
            <p class="text-sm text-gray-600">Total Instansi: <strong>{{ selectedKategori?.total_instansi }}</strong></p>
          </div>

          <!-- Chart dalam Modal -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-lg font-semibold mb-4">Top 10 Instansi dengan Proyek Terbanyak</h4>
            <client-only>
              <div v-if="detailChartOptions && detailChartSeries && detailChartSeries.length > 0">
                <apexchart 
                  type="bar" 
                  height="400" 
                  :options="detailChartOptions" 
                  :series="detailChartSeries" 
                />
              </div>
              <div v-else class="flex items-center justify-center h-96">
                <div class="loading loading-spinner loading-lg"></div>
              </div>
            </client-only>
          </div>
        </div>
      </div>

      <!-- Chart 3: Kata Kunci dengan Filter Instansi -->
      <div class="card bg-white shadow-lg mb-8">
        <div class="card-body">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="card-title text-lg font-semibold text-gray-800">Kata Kunci Terpopuler per Instansi</h2>
              <p class="text-sm text-gray-600">Pilih instansi untuk melihat kata kunci yang sering digunakan</p>
              <p class="text-xs text-blue-500" v-if="keywordData?.total_instansi">
                Total {{ keywordData.total_instansi }} instansi tersedia
                <span v-if="selectedInstansiName && !keywordDataPending" class="text-green-600">
                  • Default: {{ selectedKategoriName }} - {{ selectedInstansiName }}
                </span>
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <select 
                v-model="selectedKategoriId" 
                @change="onKategoriChange"
                class="select select-bordered w-48"
                :disabled="keywordDataPending"
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
                :disabled="!selectedKategoriId || keywordDataPending"
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
          
          <div v-else-if="keywordDataPending" class="text-center py-8">
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
            <div class="text-xs text-gray-400 mt-2">
              Debug: {{ keywordDataPending ? 'Loading...' : `${keywordData?.total_kategori || 0} kategori, ${keywordData?.total_instansi || 0} instansi available` }}
            </div>
          </div>
        </div>
      </div>

      <!-- SDGs dan Asta Cita Section -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-blue-900 mb-6">SDGs dan Asta Cita</h2>
        <p class="text-blue-700 mb-6">Distribusi produk pembelajaran berdasarkan SDGs dan Asta Cita</p>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- SDGs Chart -->
          <div class="card bg-white shadow-lg">
            <div class="card-body">
              <h3 class="card-title text-xl text-blue-800 mb-4">Produk Pembelajaran Mendukung SDGs</h3>
              <div class="mb-4 p-4 bg-blue-50 rounded-lg">
                <p class="text-sm text-blue-700 font-semibold">Total <span class="text-lg font-bold">257</span> Produk Pembelajaran</p>
              </div>
              <client-only>
                <apexchart 
                  type="bar" 
                  height="500" 
                  :options="sdgsChartOptions" 
                  :series="sdgsChartSeries" 
                />
              </client-only>
              
              <!-- SDGs Legend -->
              <div class="mt-6 bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-900 mb-3">Sustainable Development Goals (SDGs)</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">1.</span>
                    <span>Tanpa Kemiskinan</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">2.</span>
                    <span>Tanpa Kelaparan</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">3.</span>
                    <span>Kehidupan Sehat dan Sejahtera</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">4.</span>
                    <span>Pendidikan Berkualitas</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">5.</span>
                    <span>Kesetaraan Gender</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">6.</span>
                    <span>Air Bersih dan Sanitasi Layak</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">7.</span>
                    <span>Energi Bersih dan Terjangkau</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">8.</span>
                    <span>Pekerjaan Layak dan Pertumbuhan Ekonomi</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">9.</span>
                    <span>Industri, Inovasi, dan Infrastruktur</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">10.</span>
                    <span>Berkurangnya Kesenjangan</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">11.</span>
                    <span>Kota dan Pemukiman yang Berkelanjutan</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">12.</span>
                    <span>Konsumsi dan Produksi yang Bertanggung Jawab</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">13.</span>
                    <span>Penanganan Perubahan Iklim</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">14.</span>
                    <span>Ekosistem Laut</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">15.</span>
                    <span>Ekosistem Daratan</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">16.</span>
                    <span>Perdamaian, Keadilan, dan Kelembagaan yang Tangguh</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-semibold text-blue-700">17.</span>
                    <span>Kemitraan untuk Mencapai Tujuan</span>
                  </div>
                </div>
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
              <div class="mt-6 bg-blue-50 p-4 rounded-lg">
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

      <!-- Dampak Nilai Ekonomi Section -->
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
            <option value="pkn-i-angkatan-lxii">PKN Tk. I Angkatan LXII</option>
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

      <!-- Statistik Penelusuran Google Section -->
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
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

// Fetch data dari API untuk chart pertama dengan caching
const { data: programData, pending, error, refresh: refreshProgram } = await useAsyncData('program-summary', async () => {
  try {
    const res = await fetch('/api/proper/summary_program')
    const json = await res.json()
    console.log('API Response:', json) // Debug log
    if (json.success && Array.isArray(json.summary)) {
      return json.summary
    }
    return []
  } catch (e) {
    console.error('Error fetching program data:', e)
    return []
  }
}, {
  default: () => [],
  server: false, // Client-side only untuk chart
  lazy: true
})

// Fetch data dari API untuk chart kata kunci dengan optimasi
const { data: keywordData, pending: keywordDataPending, refresh: refreshKeywords } = await useAsyncData('keyword-summary', async () => {
  try {
    const res = await fetch('/api/abstract/summary_kata_kunci')
    const json = await res.json()
    console.log('Keyword API Response:', json) // Debug log
    if (json.success && Array.isArray(json.summary)) {
      return json
    }
    return { summary: [] }
  } catch (e) {
    console.error('Error fetching keyword data:', e)
    return { summary: [] }
  }
}, {
  default: () => ({ summary: [] }),
  server: false, // Client-side only
  lazy: true
})

// Fetch data dari API untuk chart kedua (instansi) dengan optimasi
const { data: instansiData, refresh: refreshInstansi } = await useAsyncData('instansi-summary', async () => {
  try {
    const res = await fetch('/api/proper/summary_instansi')
    const json = await res.json()
    console.log('Instansi API Response:', json) // Debug log
    if (json.success && Array.isArray(json.summary)) {
      return json.summary
    }
    return []
  } catch (e) {
    console.error('Error fetching instansi data:', e)
    return []
  }
}, {
  default: () => [],
  server: false, // Client-side only
  lazy: true
})

// State untuk chart re-rendering
const chartKey = ref(0)

// Function untuk force refresh charts
function forceRefreshCharts() {
  chartKey.value++
  console.log('Force refresh charts, key:', chartKey.value)
}

// State untuk filtering kata kunci - dua tingkat filter
const selectedKategoriId = ref('')
const selectedKategoriName = ref('')
const selectedInstansiId = ref('')
const selectedInstansiName = ref('')
const selectedKeywords = ref([])

// State untuk economic program selection
const selectedEconomicProgram = ref('pka-vi')

// Computed untuk daftar instansi berdasarkan kategori yang dipilih
const availableInstansi = computed(() => {
  if (!selectedKategoriId.value || !keywordData?.value?.summary) return []
  
  const kategori = keywordData.value.summary.find(k => 
    k.kategori_id.toString() === selectedKategoriId.value.toString()
  )
  
  return kategori?.instansi || []
})

// Function untuk handle perubahan kategori
function onKategoriChange() {
  console.log('onKategoriChange called, selectedKategoriId:', selectedKategoriId.value)
  
  // Reset instansi dan keywords saat kategori berubah
  selectedInstansiId.value = ''
  selectedInstansiName.value = ''
  selectedKeywords.value = []
  
  if (!selectedKategoriId.value || !keywordData?.value?.summary) {
    selectedKategoriName.value = ''
    return
  }
  
  const kategori = keywordData.value.summary.find(k => 
    k.kategori_id.toString() === selectedKategoriId.value.toString()
  )
  
  if (kategori) {
    selectedKategoriName.value = kategori.kategori_name
    console.log('Selected kategori:', kategori.kategori_name, 'with', kategori.total_instansi, 'instansi')
  }
}

// Function untuk handle perubahan instansi
function onInstansiChange() {
  console.log('onInstansiChange called, selectedInstansiId:', selectedInstansiId.value)
  
  if (!selectedInstansiId.value || !availableInstansi.value.length) {
    selectedKeywords.value = []
    selectedInstansiName.value = ''
    console.log('No instansi selected or no data')
    return
  }
  
  const instansi = availableInstansi.value.find(item => 
    item.instansi_id.toString() === selectedInstansiId.value.toString()
  )
  
  console.log('Found instansi:', instansi)
  
  if (instansi) {
    selectedKeywords.value = instansi.top_keywords || []
    selectedInstansiName.value = instansi.nama_instansi
    console.log('Selected keywords:', selectedKeywords.value)
    console.log('Selected instansi name:', selectedInstansiName.value)
  } else {
    console.log('Instansi not found')
    selectedKeywords.value = []
    selectedInstansiName.value = ''
  }
}

// Economic Impact Data
const economicProgramsData = {
  'pka-vi': {
    title: 'Dampak Produk Pembelajaran PKA Angkatan VI',
    programName: 'Alumni PKN Tk. II Angkatan II',
    programCode: 'PKA VI',
    alumni: 45,
    cost: 'Rp. 17.000.000',
    totalCost: 'Rp. 765.000.000',
    totalTrainingCost: 'Rp. 765.000.000',
    economicImpact: 'RP. 182.056.198.175',
    chartSeries: [29, 12],
    analysis: 'Perhitungan dampak ekonomi berasal dari perhitungan masing-masing peserta dengan menggunakan metode cost and benefit analysis.',
    additionalInfo: '*Tim Ditjar mapim sedang mengembangkan instrumen yang dapat digunakan oleh peserta dalam menghitung dampak nilai ekonomi produk pembelajaran'
  },
  'pkn-ii-angkatan-ii': {
    title: 'Dampak Produk Pembelajaran PKN Tk. II Angkatan II',
    programName: 'Alumni PKN Tk. II Angkatan II',
    programCode: 'PKN II',
    alumni: 56,
    cost: 'Rp. 22.945.000',
    totalCost: 'Rp. 1.284.920.000',
    totalTrainingCost: 'Rp. 1.284.920.000',
    economicImpact: 'RP. 3.003.545.174.496.580',
    chartSeries: [40, 16],
    analysis: 'Perhitungan dampak ekonomi berasal dari perhitungan masing-masing peserta dengan menggunakan metode cost and benefit analysis. Terdapat data outlier yang disebabkan ada 1 alumni memiliki dampak ekonomi sebanyak RP.3.000.000.000.000.000 peserta an Dr. Ir. Heru Kustanto, M.Si. Judul: STRATEGI PENGUATAN TATA KELOLA PROGRAM PENINGKATAN PENGGUNAAN PRODUK DALAM NEGERI UNTUK MENDUKUNG PERTUMBUHAN EKONOMI DI KEMENTERIAN PERINDUSTRIAN',
    additionalInfo: null
  },
  'pkn-i-angkatan-lxii': {
    title: 'Dampak Produk Pembelajaran PKN Tk. I Angkatan LXII',
    programName: 'Alumni PKN Tk. II Angkatan II',
    programCode: 'PKN I',
    alumni: 42,
    cost: 'Rp. 40.000.000',
    totalCost: 'Rp. 1.680.000.000',
    totalTrainingCost: 'Rp. 1.680.000.000',
    economicImpact: 'RP. 26.636.612.830.604',
    chartSeries: [28, 14],
    analysis: 'Perhitungan dampak ekonomi berasal dari perhitungan masing-masing peserta dengan menggunakan metode cost and benefit analysis',
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
  colors: ['#3b82f6', '#ef4444'],
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

// Computed properties untuk stat cards berdasarkan data API - dengan memoization
const totalProyek = computed(() => {
  if (!programData?.value || !Array.isArray(programData.value)) return 0
  return programData.value.reduce((sum, item) => sum + (item.count || 0), 0)
})

const totalProgram = computed(() => {
  if (!programData?.value || !Array.isArray(programData.value)) return 0
  return programData.value.length
})

const programTerbesar = computed(() => {
  if (!programData?.value || !Array.isArray(programData.value) || programData.value.length === 0) return null
  return programData.value.reduce((max, item) => (item.count || 0) > (max.count || 0) ? item : max, { count: 0 })
})

const rataRataProgram = computed(() => {
  if (!programData?.value || !Array.isArray(programData.value) || programData.value.length === 0) return 0
  const total = totalProyek.value
  return Math.round(total / programData.value.length)
})

const chartOptions = computed(() => ({
  chart: { id: 'program-bar' },
  xaxis: { 
    categories: programData.value?.map(item => item.programNama) || ['Program A', 'Program B', 'Program C', 'Program D']
  },
  colors: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'],
  dataLabels: { enabled: true },
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 8
    }
  },
  legend: {
    show: false
  }
}))
const series = computed(() => [{ 
  name: 'Jumlah Proyek', 
  data: programData.value?.map(item => item.count) || [32, 45, 21, 30]
}])

const chartOptions2 = computed(() => ({
  chart: { 
    id: 'instansi-donut',
    events: {
      dataPointSelection: function(event, chartContext, config) {
        showInstansiDetail(config.dataPointIndex)
      }
    }
  },
  labels: instansiData.value?.map(item => item.kategori_name) || ['Kategori A', 'Kategori B', 'Kategori C', 'Kategori D'],
  colors: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'],
  dataLabels: { 
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: 'bold'
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
              return total.toString()
            }
          }
        }
      }
    }
  },
  legend: {
    position: 'bottom',
    fontSize: '12px',
    markers: {
      width: 12,
      height: 12
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
        Total Proyek: <strong>${value}</strong><br/>
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
        position: 'bottom'
      }
    }
  }]
}))
const series2 = computed(() => 
  instansiData.value?.map(item => item.total_proyek) || [12, 28, 19, 24]
)

const bubbleChartOptions = {
  chart: { id: 'kata-kunci-bubble' },
  xaxis: { 
    tickAmount: 10,
    labels: { rotate: -45 }
  },
  yaxis: { max: 50 },
  colors: ['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f97316', '#ec4899', '#84cc16'],
  dataLabels: {
    enabled: true,
    formatter: function(val, opts) {
      return opts.w.globals.labels[opts.seriesIndex]
    }
  },
  title: {
    text: 'Kata Kunci dalam Produk Pembelajaran'
  }
}
const bubbleSeries = [
  {
    name: 'Digitalisasi',
    data: [[15, 35, 50]]
  },
  {
    name: 'Inovasi',
    data: [[25, 30, 45]]
  },
  {
    name: 'Efisiensi',
    data: [[35, 25, 40]]
  },
  {
    name: 'Pelayanan',
    data: [[20, 40, 35]]
  },
  {
    name: 'Transparansi',
    data: [[30, 20, 30]]
  },
  {
    name: 'Modernisasi',
    data: [[40, 35, 25]]
  },
  {
    name: 'Reformasi',
    data: [[10, 45, 20]]
  },
  {
    name: 'Transformasi',
    data: [[45, 15, 55]]
  }
]

// Computed untuk chart kata kunci
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
      distributed: true, // Setiap bar warna berbeda
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
    show: false // Hide legend karena setiap bar beda warna
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

// Optimized watchers dengan throttling
const refreshTimeout = ref(null)

function throttledRefresh() {
  if (refreshTimeout.value) clearTimeout(refreshTimeout.value)
  refreshTimeout.value = setTimeout(() => {
    forceRefreshCharts()
  }, 100)
}

// Watcher untuk debugging
watch(keywordData, (newVal) => {
  console.log('keywordData changed:', newVal)
  // Auto-select kategori dan instansi pertama saat data ready
  if (newVal?.summary && newVal.summary.length > 0 && !selectedKategoriId.value) {
    autoSelectDefault()
  }
  // Throttled refresh
  throttledRefresh()
}, { deep: true })

watch(selectedKeywords, (newVal) => {
  console.log('selectedKeywords changed:', newVal)
  // Refresh chart saat keywords berubah
  if (newVal && newVal.length > 0) {
    throttledRefresh()
  }
}, { deep: true })

// Watch program data untuk chart 1 - throttled
watch(programData, (newVal) => {
  if (newVal && newVal.length > 0) {
    throttledRefresh()
  }
}, { deep: true })

// Watch instansi data untuk chart 2 - throttled
watch(instansiData, (newVal) => {
  if (newVal && newVal.length > 0) {
    throttledRefresh()
  }
}, { deep: true })

// Function untuk auto-select default
function autoSelectDefault() {
  if (!keywordData?.value?.summary || keywordData.value.summary.length === 0) return
  
  // Pilih kategori pertama yang memiliki instansi
  const firstKategori = keywordData.value.summary[0]
  if (firstKategori && firstKategori.instansi && firstKategori.instansi.length > 0) {
    selectedKategoriId.value = firstKategori.kategori_id.toString()
    selectedKategoriName.value = firstKategori.kategori_name
    
    // Pilih instansi dengan total_keywords terbanyak dalam kategori ini
    const topInstansi = firstKategori.instansi
      .sort((a, b) => b.total_keywords - a.total_keywords)[0]
    
    if (topInstansi) {
      selectedInstansiId.value = topInstansi.instansi_id.toString()
      selectedInstansiName.value = topInstansi.nama_instansi
      selectedKeywords.value = topInstansi.top_keywords || []
      
      console.log('Auto-selected:', {
        kategori: selectedKategoriName.value,
        instansi: selectedInstansiName.value,
        keywords: selectedKeywords.value.length
      })
    }
  }
}

// Lifecycle untuk debugging dan auto-selection
onMounted(() => {
  console.log('Dashboard mounted')
  console.log('Initial keywordData:', keywordData.value)
  console.log('Initial keywordDataPending:', keywordDataPending.value)
  
  // Coba auto-select jika data sudah ada
  if (keywordData.value?.summary && keywordData.value.summary.length > 0) {
    autoSelectDefault()
  }
  
  // Force re-render charts setelah DOM ready
  nextTick(() => {
    if (typeof window !== 'undefined' && window.ApexCharts) {
      setTimeout(() => {
        console.log('Force chart refresh after mount')
      }, 100)
    }
  })
})

// Cleanup timeout saat component unmount
onUnmounted(() => {
  if (refreshTimeout.value) {
    clearTimeout(refreshTimeout.value)
  }
})

// State untuk detail instansi
const selectedKategori = ref(null)
const showDetail = ref(false)

// Function untuk menampilkan detail instansi
function showInstansiDetail(dataPointIndex) {
  if (!instansiData.value?.[dataPointIndex]) return
  selectedKategori.value = instansiData.value[dataPointIndex]
  showDetail.value = true
}

function closeDetail() {
  showDetail.value = false
  selectedKategori.value = null
}

// Chart options untuk detail modal
const detailChartOptions = computed(() => {
  if (!selectedKategori.value?.detail_instansi) return {}
  
  // Ambil top 10 instansi
  const topInstansi = selectedKategori.value.detail_instansi
    .sort((a, b) => b.total_proyek - a.total_proyek)
    .slice(0, 10)
  
  // Tentukan warna berdasarkan kategori yang sama dengan donut chart
  const categoryColors = {
    1: '#f59e0b', // Kementerian - Amber
    2: '#10b981', // Lembaga - Emerald  
    3: '#3b82f6', // Pemerintah Provinsi - Blue
    4: '#ef4444', // Pemerintah Kabupaten - Red
    5: '#8b5cf6', // Pemerintah Kota - Purple
  }
  
  const categoryColor = categoryColors[selectedKategori.value.kategori_id] || '#06b6d4'
  
  return {
    chart: { 
      id: 'detail-instansi-bar',
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
      categories: topInstansi.map(item => item.nama_instansi.length > 30 
        ? item.nama_instansi.substring(0, 30) + '...' 
        : item.nama_instansi),
      labels: {
        rotate: -45,
        style: {
          fontSize: '10px'
        }
      }
    },
    colors: [categoryColor],
    dataLabels: { 
      enabled: true,
      style: {
        fontSize: '10px',
        colors: ['#FFFFFF']
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8
      }
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const instansi = topInstansi[dataPointIndex]
        const categoryNames = {
          1: 'Kementerian',
          2: 'Lembaga',  
          3: 'Pemerintah Provinsi',
          4: 'Pemerintah Kabupaten',
          5: 'Pemerintah Kota'
        }
        const categoryName = categoryNames[selectedKategori.value.kategori_id] || 'Lainnya'
        return `<div class="bg-white p-3 shadow-lg rounded border">
          <strong>${instansi?.nama_instansi || 'N/A'}</strong><br/>
          <span class="inline-block w-3 h-3 rounded-full mr-1" style="background-color: ${categoryColor}"></span>
          <strong>${categoryName}</strong><br/>
          Total Proyek: <strong>${instansi?.total_proyek || 0}</strong><br/>
          <small class="text-gray-500">ID: ${instansi?.instansi_id || 'N/A'}</small>
        </div>`
      }
    }
  }
})

const detailChartSeries = computed(() => {
  if (!selectedKategori.value?.detail_instansi) return []
  
  const topInstansi = selectedKategori.value.detail_instansi
    .sort((a, b) => b.total_proyek - a.total_proyek)
    .slice(0, 10)
  
  return [{ 
    name: 'Jumlah Proyek', 
    data: topInstansi.map(item => item.total_proyek)
  }]
})

// SDGs Chart Configuration
const sdgsChartOptions = computed(() => ({
  chart: {
    id: 'sdgs-chart',
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
      'SDGs 17', 'SDGs 16', 'SDGs 15', 'SDGs 14', 'SDGs 13', 'SDGs 12', 'SDGs 11', 'SDGs 10', 
      'SDGs 9', 'SDGs 8', 'SDGs 7', 'SDGs 6', 'SDGs 5', 'SDGs 4', 'SDGs 3', 'SDGs 2', 'SDGs 1'
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
  colors: ['#3b82f6'],
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

const sdgsChartSeries = computed(() => ([{
  name: 'Jumlah Produk',
  data: [14, 73, 1, 3, 3, 5, 6, 2, 25, 33, 1, 1, 2, 26, 25, 29, 8]
}]))

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

<style scoped>
.card {
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
