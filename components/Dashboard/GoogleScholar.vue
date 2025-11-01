<template>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-blue-900 mb-6">Google Scholar</h2>
    <p class="text-blue-700 mb-6">Pencarian dan analisis publikasi ilmiah alumni di Google Scholar</p>
    
    <!-- Search Form -->
    <div class="card bg-white shadow-lg mb-6">
      <div class="card-body">
        <h3 class="card-title text-xl text-blue-800 mb-4">Pencarian Alumni</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- Batch Selection -->
          <div>
            <label class="block text-sm font-medium text-blue-900 mb-2">Angkatan:</label>
            <select 
              v-model="selectedBatch" 
              class="select select-bordered w-full"
            >
              <option value="">Pilih Angkatan</option>
              <option value="pka-vi">PKA Angkatan VI</option>
              <option value="pkn-ii-angkatan-ii">PKN Tk. II Angkatan II</option>
              <option value="pkn-ii-angkatan-x">PKN Tk. II Angkatan X</option>
              <option value="pkn-ii-angkatan-xv">PKN Tk. II Angkatan XV</option>
              <option value="pkn-i-angkatan-lxii">PKN Tk. I Angkatan LXII</option>
              <option value="pkn-i-angkatan-lxiii">PKN Tk. I Angkatan LXIII</option>
            </select>
          </div>

          <!-- Alumni Selection -->
          <div>
            <label class="block text-sm font-medium text-blue-900 mb-2">Alumni:</label>
            <select 
              v-model="selectedAlumni" 
              :disabled="!selectedBatch"
              class="select select-bordered w-full"
            >
              <option value="">Pilih Alumni</option>
              <option 
                v-for="alumni in availableAlumni" 
                :key="alumni.id" 
                :value="alumni.id"
              >
                {{ alumni.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Search Button -->
        <div class="flex justify-center">
          <button 
            @click="searchGoogleScholar" 
            :disabled="!selectedAlumni || isSearching"
            class="btn btn-primary"
          >
            <span v-if="isSearching" class="loading loading-spinner loading-sm"></span>
            {{ isSearching ? 'Mencari...' : 'Cari di Google Scholar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchResults.length > 0" class="card bg-white shadow-lg">
      <div class="card-body">
        <h3 class="card-title text-xl text-blue-800 mb-4">
          Hasil Pencarian: {{ selectedAlumniName }}
        </h3>

        <!-- Summary Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="stat bg-blue-50 rounded-lg">
            <div class="stat-title text-blue-700">Total Publikasi</div>
            <div class="stat-value text-blue-900">{{ searchResults.length }}</div>
          </div>
          <div class="stat bg-green-50 rounded-lg">
            <div class="stat-title text-green-700">Total Sitasi</div>
            <div class="stat-value text-green-900">{{ totalCitations }}</div>
          </div>
          <div class="stat bg-yellow-50 rounded-lg">
            <div class="stat-title text-yellow-700">H-Index</div>
            <div class="stat-value text-yellow-900">{{ hIndex }}</div>
          </div>
          <div class="stat bg-purple-50 rounded-lg">
            <div class="stat-title text-purple-700">i10-Index</div>
            <div class="stat-value text-purple-900">{{ i10Index }}</div>
          </div>
        </div>

        <!-- Publications List -->
        <div class="space-y-4">
          <div 
            v-for="(publication, index) in searchResults" 
            :key="index"
            class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <h4 class="font-semibold text-blue-900 mb-2">{{ publication.title }}</h4>
            <p class="text-gray-700 text-sm mb-2">{{ publication.authors }}</p>
            <p class="text-gray-600 text-sm mb-2">{{ publication.journal }} - {{ publication.year }}</p>
            <div class="flex items-center justify-between">
              <span class="text-green-600 text-sm">Sitasi: {{ publication.citations }}</span>
              <a 
                :href="publication.url" 
                target="_blank" 
                class="btn btn-sm btn-outline btn-primary"
              >
                Lihat Publikasi
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="hasSearched && !isSearching" class="card bg-white shadow-lg">
      <div class="card-body text-center">
        <div class="text-gray-500 text-lg mb-4">
          <i class="fas fa-search text-4xl mb-2"></i>
        </div>
        <h3 class="text-xl text-gray-700 mb-2">Tidak ada publikasi ditemukan</h3>
        <p class="text-gray-600">Coba pilih alumni lain atau periksa ejaan nama.</p>
      </div>
    </div>

    <!-- Help Section -->
    <div class="card bg-blue-50 shadow-lg mt-6">
      <div class="card-body">
        <h3 class="card-title text-blue-900 mb-4">
          <i class="fas fa-info-circle mr-2"></i>
          Informasi Google Scholar
        </h3>
        <div class="text-blue-800 text-sm space-y-2">
          <p><strong>H-Index:</strong> Jumlah publikasi (h) yang masing-masing dikutip setidaknya h kali</p>
          <p><strong>i10-Index:</strong> Jumlah publikasi yang dikutip setidaknya 10 kali</p>
          <p><strong>Sitasi:</strong> Jumlah kali publikasi dirujuk oleh karya ilmiah lain</p>
          <p class="mt-4"><strong>Catatan:</strong> Data diambil dari Google Scholar dan dapat berubah setiap saat</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// State
const selectedBatch = ref('')
const selectedAlumni = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const hasSearched = ref(false)

// Sample Alumni Data (in real app, this would come from API)
const alumniData = {
  'pka-vi': [
    { id: 'alumni1', name: 'Dr. Ahmad Rizki, M.Si.' },
    { id: 'alumni2', name: 'Prof. Dr. Siti Nurhaliza, M.Pd.' },
    { id: 'alumni3', name: 'Dr. Ir. Budi Santoso, M.T.' }
  ],
  'pkn-ii-angkatan-ii': [
    { id: 'alumni4', name: 'Dr. Indra Wijaya, M.M.' },
    { id: 'alumni5', name: 'Dr. Ir. Heru Kustanto, M.Si.' },
    { id: 'alumni6', name: 'Prof. Dr. Maya Sari, M.Pd.' }
  ],
  'pkn-ii-angkatan-x': [
    { id: 'alumni7', name: 'Dr. Rudi Hartono, M.Si.' },
    { id: 'alumni8', name: 'Dr. Ir. Fitri Ramadhani, M.T.' }
  ],
  'pkn-ii-angkatan-xv': [
    { id: 'alumni9', name: 'Dr. Andi Kurniawan, M.M.' },
    { id: 'alumni10', name: 'Prof. Dr. Lisa Permata, M.Pd.' }
  ],
  'pkn-i-angkatan-lxii': [
    { id: 'alumni11', name: 'Prof. Dr. Ir. Joko Widodo, M.T.' },
    { id: 'alumni12', name: 'Dr. Ratna Dewi, M.Si.' }
  ],
  'pkn-i-angkatan-lxiii': [
    { id: 'alumni13', name: 'Dr. Bambang Sutrisno, M.M.' },
    { id: 'alumni14', name: 'Prof. Dr. Ani Yudhoyono, M.Pd.' }
  ]
}

// Sample Publications Data (in real app, this would come from Google Scholar API)
const samplePublications = {
  'alumni1': [
    {
      title: 'Sustainable Development in Indonesian Public Administration',
      authors: 'Ahmad Rizki, John Doe, Jane Smith',
      journal: 'Journal of Public Administration',
      year: 2023,
      citations: 15,
      url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=example&citation_for_view=example:example'
    },
    {
      title: 'Digital Transformation in Government Services',
      authors: 'Ahmad Rizki, Alice Johnson',
      journal: 'International Review of Administrative Sciences',
      year: 2022,
      citations: 28,
      url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=example&citation_for_view=example:example'
    }
  ],
  'alumni2': [
    {
      title: 'Educational Policy Implementation in Remote Areas',
      authors: 'Siti Nurhaliza, Michael Brown',
      journal: 'Educational Policy Review',
      year: 2023,
      citations: 12,
      url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=example&citation_for_view=example:example'
    }
  ]
}

// Computed properties
const availableAlumni = computed(() => {
  return selectedBatch.value ? (alumniData[selectedBatch.value] || []) : []
})

const selectedAlumniName = computed(() => {
  if (!selectedAlumni.value || !selectedBatch.value) return ''
  const alumni = availableAlumni.value.find(a => a.id === selectedAlumni.value)
  return alumni ? alumni.name : ''
})

const totalCitations = computed(() => {
  return searchResults.value.reduce((total, pub) => total + pub.citations, 0)
})

const hIndex = computed(() => {
  const citations = searchResults.value.map(pub => pub.citations).sort((a, b) => b - a)
  let hIndex = 0
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) {
      hIndex = i + 1
    } else {
      break
    }
  }
  return hIndex
})

const i10Index = computed(() => {
  return searchResults.value.filter(pub => pub.citations >= 10).length
})

// Watch for batch changes to reset alumni selection
watch(selectedBatch, () => {
  selectedAlumni.value = ''
  searchResults.value = []
  hasSearched.value = false
})

// Functions
async function searchGoogleScholar() {
  if (!selectedAlumni.value) return
  
  isSearching.value = true
  hasSearched.value = false
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In real app, this would be an API call to Google Scholar
    searchResults.value = samplePublications[selectedAlumni.value] || []
    
  } catch (error) {
    console.error('Error searching Google Scholar:', error)
    searchResults.value = []
  } finally {
    isSearching.value = false
    hasSearched.value = true
  }
}
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