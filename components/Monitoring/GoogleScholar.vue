<template>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-blue-900 mb-6">N-Grams Analysis</h2>
    <p class="text-blue-700 mb-6">Analisis kata-kata penting dari produk pembelajaran alumni (setelah menghilangkan stopwords)</p>
    
    <!-- N-Gram Type Selection -->
    <div class="card bg-white shadow-lg mb-6">
      <div class="card-body">
        <h3 class="card-title text-xl text-blue-800 mb-4">Pilih Jenis Analisis</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="type in ngramTypes" 
            :key="type.value"
            class="cursor-pointer"
            @click="selectedNGramType = type.value"
          >
            <div 
              class="p-4 rounded-lg border-2 transition-all"
              :class="selectedNGramType === type.value 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'"
            >
              <div class="flex items-center">
                <input 
                  type="radio" 
                  :value="type.value"
                  v-model="selectedNGramType"
                  class="radio radio-primary mr-3"
                />
                <div>
                  <h4 class="font-semibold text-gray-900">{{ type.label }}</h4>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ type.value === 'unigrams' ? 'Analisis kata per kata' :
                       type.value === 'bigrams' ? 'Analisis kombinasi 2 kata' :
                       'Analisis kombinasi 3 kata' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- N-Grams Chart -->
    <div class="card bg-white shadow-lg mb-6">
      <div class="card-body">
        <div v-if="ngramsData.length > 0" class="mb-4">
          <apexchart 
            type="bar" 
            :options="chartOptions" 
            :series="chartSeries"
            height="400"
          ></apexchart>
        </div>
        
        <div v-else-if="productsPending" class="text-center py-8">
          <div class="loading loading-spinner loading-lg text-blue-600"></div>
          <p class="text-blue-700 mt-4">Memproses data...</p>
        </div>
        
        <div v-else class="text-center py-8 text-gray-500">
          <i class="fas fa-chart-bar text-4xl mb-4"></i>
          <p>Tidak ada data untuk dianalisis</p>
        </div>
      </div>
    </div>

    <!-- Top N-Grams List -->
    <div v-if="ngramsData.length > 0" class="card bg-white shadow-lg">
      <div class="card-body">
        <h3 class="card-title text-xl text-blue-800 mb-4">
          Top 30 {{ selectedNGramType === 'unigrams' ? 'Kata' : 
                    selectedNGramType === 'bigrams' ? 'Bigram' : 'Trigram' }}
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(ngram, index) in ngramsData.slice(0, 30)" 
            :key="index"
            class="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1 min-w-0">
                <span class="font-semibold text-blue-900 text-sm block truncate" :title="ngram.text">
                  {{ ngram.text }}
                </span>
              </div>
              <div class="flex flex-col items-end ml-2">
                <span class="badge badge-primary badge-sm">{{ ngram.frequency }}</span>
                <span class="text-xs text-blue-700 mt-1">{{ ngram.percentage }}%</span>
              </div>
            </div>
            <div class="w-full bg-blue-200 rounded-full h-2">
              <div 
                class="bg-blue-600 h-2 rounded-full" 
                :style="`width: ${Math.min(100, (ngram.frequency / ngramsData[0].frequency) * 100)}%`"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Help Section -->
    <div class="card bg-blue-50 shadow-lg mt-6">
      <div class="card-body">
        <h3 class="card-title text-blue-900 mb-4">
          <i class="fas fa-info-circle mr-2"></i>
          Tentang N-Grams Analysis
        </h3>
        <div class="text-blue-800 text-sm space-y-2">
          <p><strong>Unigrams:</strong> Analisis kata tunggal yang paling sering muncul</p>
          <p><strong>Bigrams:</strong> Analisis kombinasi 2 kata yang sering muncul bersama</p>
          <p><strong>Trigrams:</strong> Analisis kombinasi 3 kata yang sering muncul bersama</p>
          <p><strong>Stopwords:</strong> Kata-kata umum (seperti "dan", "yang", "di") yang telah dihilangkan dari analisis</p>
          <p class="mt-4"><strong>Tujuan:</strong> Mengidentifikasi tema, pola, dan topik utama dalam proyek perubahan alumni</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// State
const selectedNGramType = ref('unigrams')

// Fetch learning products data from API - get all data for N-grams analysis
const { data: productsData, pending: productsPending, error: productsError } = await useFetch('/api/product?all=true')

// Indonesian stopwords
const stopwords = new Set([
  'dan', 'atau', 'yang', 'di', 'ke', 'dari', 'pada', 'untuk', 'dengan', 'dalam', 'oleh',
  'adalah', 'akan', 'dapat', 'bisa', 'telah', 'sudah', 'belum', 'masih', 'juga', 'saja',
  'ini', 'itu', 'tersebut', 'para', 'sebuah', 'suatu', 'satu', 'dua', 'tiga', 'empat',
  'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'tidak', 'bukan', 'tanpa',
  'jika', 'apabila', 'bila', 'ketika', 'saat', 'waktu', 'setiap', 'semua', 'seluruh',
  'beberapa', 'banyak', 'sedikit', 'lebih', 'kurang', 'sangat', 'cukup', 'terlalu',
  'agar', 'supaya', 'karena', 'sebab', 'akibat', 'dampak', 'hasil', 'melalui', 'lewat',
  'antara', 'antar', 'hingga', 'sampai', 'terhadap', 'tentang', 'mengenai', 'sekitar'
])

// Text preprocessing function
function preprocessText(text) {
  if (!text) return []
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopwords.has(word))
    .filter(word => !/^\d+$/.test(word)) // Remove pure numbers
}

// Generate N-grams
function generateNGrams(words, n) {
  const ngrams = []
  for (let i = 0; i <= words.length - n; i++) {
    const ngram = words.slice(i, i + n).join(' ')
    ngrams.push(ngram)
  }
  return ngrams
}

// Count frequency of N-grams
function countNGrams(ngrams) {
  const counts = {}
  ngrams.forEach(ngram => {
    counts[ngram] = (counts[ngram] || 0) + 1
  })
  
  // Convert to array, filter frequency > 1, and sort by frequency
  return Object.entries(counts)
    .map(([text, frequency]) => ({ text, frequency }))
    .filter(item => item.frequency > 1) // Only show items with frequency > 1
    .sort((a, b) => b.frequency - a.frequency)
}

// Process N-grams data
const ngramsData = computed(() => {
  if (!productsData.value?.data) return []

  // Combine all project change titles
  const allTexts = productsData.value.data
    .map(product => product.proyekPerubahan)
    .filter(Boolean)

  if (allTexts.length === 0) return []

  // Process based on selected N-gram type
  let allNGrams = []
  
  allTexts.forEach(text => {
    const words = preprocessText(text)
    
    if (selectedNGramType.value === 'unigrams') {
      allNGrams.push(...words)
    } else if (selectedNGramType.value === 'bigrams') {
      allNGrams.push(...generateNGrams(words, 2))
    } else if (selectedNGramType.value === 'trigrams') {
      allNGrams.push(...generateNGrams(words, 3))
    }
  })

  const ngramCounts = countNGrams(allNGrams)
  const totalCount = ngramCounts.reduce((sum, item) => sum + item.frequency, 0)
  
  // Add percentage and limit to top 50
  return ngramCounts
    .slice(0, 50)
    .map(item => ({
      ...item,
      percentage: ((item.frequency / totalCount) * 100).toFixed(1)
    }))
})

// Chart configuration
const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 400,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  xaxis: {
    categories: ngramsData.value.slice(0, 15).map(item => item.text),
    title: {
      text: 'Frekuensi'
    }
  },
  yaxis: {
    title: {
      text: selectedNGramType.value === 'unigrams' ? 'Kata' : 
            selectedNGramType.value === 'bigrams' ? 'Bigram' : 'Trigram'
    }
  },
  colors: ['#3B82F6'],
  title: {
    text: `Top 15 ${selectedNGramType.value === 'unigrams' ? 'Kata' : 
                    selectedNGramType.value === 'bigrams' ? 'Bigram' : 'Trigram'} 
           dari Proyek Perubahan`,
    align: 'center',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#1E40AF'
    }
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5
    }
  }
}))

const chartSeries = computed(() => ([
  {
    name: 'Frekuensi',
    data: ngramsData.value.slice(0, 15).map(item => item.frequency)
  }
]))

// N-gram type options
const ngramTypes = [
  { value: 'unigrams', label: 'Unigrams (Kata Tunggal)' },
  { value: 'bigrams', label: 'Bigrams (2 Kata)' },
  { value: 'trigrams', label: 'Trigrams (3 Kata)' }
]
</script>

<style scoped>
.stat {
  padding: 1rem;
  text-align: center;
}

.stat-title {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: bold;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>