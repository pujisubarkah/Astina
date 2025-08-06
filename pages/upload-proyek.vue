<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <a href="/daftar-proyek" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <div>
            <h1 class="text-4xl font-bold text-blue-900 mb-2">Upload Proyek Perubahan</h1>
            <p class="text-blue-700">Bagikan laporan proyek perubahan Anda dengan komunitas</p>
          </div>
        </div>
      </div>

      <!-- Upload Form -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <form @submit.prevent="submitProject">
            <!-- Step Indicator -->
            <div class="mb-8">
              <ul class="steps w-full">
                <li class="step" :class="{ 'step-primary': currentStep >= 1 }">Informasi Dasar</li>
                <li class="step" :class="{ 'step-primary': currentStep >= 2 }">Detail Proyek</li>
                <li class="step" :class="{ 'step-primary': currentStep >= 3 }">Upload File</li>
                <li class="step" :class="{ 'step-primary': currentStep >= 4 }">Review</li>
              </ul>
            </div>

            <!-- Step 1: Basic Information -->
            <div v-if="currentStep === 1" class="space-y-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Informasi Dasar</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Nama Lengkap *</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama lengkap Anda"
                    class="input input-bordered w-full"
                    v-model="form.authorName"
                    required
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Email *</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="nama@email.com"
                    class="input input-bordered w-full"
                    v-model="form.email"
                    required
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Kementerian/Lembaga *</span>
                  </label>
                  <select class="select select-bordered w-full" v-model="form.institution" required>
                    <option value="">Pilih K/L</option>
                    <option value="Kemendagri">Kementerian Dalam Negeri</option>
                    <option value="Kemenkes">Kementerian Kesehatan</option>
                    <option value="Kemendikbudristek">Kemendikbudristek</option>
                    <option value="Kementerian PUPR">Kementerian PUPR</option>
                    <option value="Kemensos">Kementerian Sosial</option>
                    <option value="Kemenkumham">Kementerian Hukum dan HAM</option>
                    <option value="Kemenag">Kementerian Agama</option>
                    <option value="BPS">Badan Pusat Statistik</option>
                    <option value="BPKP">BPKP</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Jabatan</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Misal: Kepala Bagian, Staf Ahli, dll"
                    class="input input-bordered w-full"
                    v-model="form.position"
                  />
                </div>

                <div class="form-control md:col-span-2">
                  <label class="label">
                    <span class="label-text font-semibold">Program Pelatihan *</span>
                  </label>
                  <select class="select select-bordered w-full" v-model="form.training" required>
                    <option value="">Pilih Program Pelatihan</option>
                    <option value="sakip">SAKIP & Reformasi Birokrasi</option>
                    <option value="digital">Digitalisasi Pelayanan Publik</option>
                    <option value="manajemen">Manajemen Perubahan</option>
                    <option value="inovasi">Inovasi Pelayanan</option>
                    <option value="leadership">Leadership Excellence</option>
                    <option value="analytics">Data Analytics</option>
                    <option value="smart-gov">Smart Government</option>
                    <option value="customer-service">Customer Service Excellence</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Step 2: Project Details -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Detail Proyek</h2>
              
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Judul Proyek Perubahan *</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Berikan judul yang jelas dan deskriptif"
                  class="input input-bordered w-full"
                  v-model="form.title"
                  required
                />
                <label class="label">
                  <span class="label-text-alt">{{ form.title.length }}/100 karakter</span>
                </label>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Deskripsi Proyek *</span>
                </label>
                <textarea 
                  class="textarea textarea-bordered h-32"
                  placeholder="Jelaskan latar belakang, tujuan, dan ringkasan proyek perubahan Anda..."
                  v-model="form.description"
                  required
                ></textarea>
                <label class="label">
                  <span class="label-text-alt">{{ form.description.length }}/500 karakter</span>
                </label>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Status Proyek *</span>
                  </label>
                  <select class="select select-bordered w-full" v-model="form.status" required>
                    <option value="">Pilih Status</option>
                    <option value="planning">Perencanaan</option>
                    <option value="ongoing">Sedang Berjalan</option>
                    <option value="completed">Selesai</option>
                    <option value="paused">Ditunda</option>
                  </select>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Progress (%)</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    class="range range-primary"
                    v-model="form.progress"
                  />
                  <div class="w-full flex justify-between text-xs px-2">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                  <div class="text-center mt-2">
                    <span class="badge badge-primary">{{ form.progress }}%</span>
                  </div>
                </div>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Kata Kunci (Tags)</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Pisahkan dengan koma. Misal: digitalisasi, pelayanan, inovasi"
                  class="input input-bordered w-full"
                  v-model="form.tagsInput"
                  @blur="processTags"
                />
                <label class="label">
                  <span class="label-text-alt">Gunakan kata kunci yang relevan agar proyek mudah ditemukan</span>
                </label>
                <div class="flex flex-wrap gap-2 mt-2" v-if="form.tags.length > 0">
                  <span 
                    v-for="(tag, index) in form.tags" 
                    :key="index"
                    class="badge badge-outline gap-2"
                  >
                    {{ tag }}
                    <button 
                      type="button" 
                      class="btn btn-ghost btn-xs"
                      @click="removeTag(index)"
                    >
                      ✕
                    </button>
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Tanggal Mulai</span>
                  </label>
                  <input 
                    type="date" 
                    class="input input-bordered w-full"
                    v-model="form.startDate"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Target Selesai</span>
                  </label>
                  <input 
                    type="date" 
                    class="input input-bordered w-full"
                    v-model="form.endDate"
                  />
                </div>
              </div>
            </div>

            <!-- Step 3: File Upload -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Upload File Laporan</h2>
              
              <!-- Main Document -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Dokumen Utama *</span>
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input 
                    type="file" 
                    class="hidden" 
                    ref="mainFileInput"
                    @change="handleMainFile"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                  />
                  <div v-if="!form.mainFile">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p class="text-gray-600 mb-2">Klik untuk upload atau drag & drop file</p>
                    <p class="text-sm text-gray-500">PDF, DOC, DOCX, PPT, PPTX (Max 10MB)</p>
                    <button 
                      type="button" 
                      class="btn btn-outline btn-sm mt-4"
                      @click="$refs.mainFileInput.click()"
                    >
                      Pilih File
                    </button>
                  </div>
                  <div v-else class="text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="font-semibold">{{ form.mainFile.name }}</p>
                    <p class="text-sm">{{ formatFileSize(form.mainFile.size) }}</p>
                    <button 
                      type="button" 
                      class="btn btn-outline btn-sm mt-2"
                      @click="removeMainFile"
                    >
                      Ganti File
                    </button>
                  </div>
                </div>
              </div>

              <!-- Supporting Documents -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Dokumen Pendukung</span>
                  <span class="label-text-alt">Opsional</span>
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input 
                    type="file" 
                    class="hidden" 
                    ref="supportFileInput"
                    @change="handleSupportFiles"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                    multiple
                  />
                  <p class="text-gray-600 mb-2">Upload file pendukung (gambar, excel, dll)</p>
                  <p class="text-sm text-gray-500 mb-4">PDF, DOC, JPG, PNG, XLS (Max 5MB per file)</p>
                  <button 
                    type="button" 
                    class="btn btn-outline btn-sm"
                    @click="$refs.supportFileInput.click()"
                  >
                    Tambah File
                  </button>
                </div>
                
                <!-- Support Files List -->
                <div v-if="form.supportFiles.length > 0" class="mt-4 space-y-2">
                  <div 
                    v-for="(file, index) in form.supportFiles" 
                    :key="index"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div class="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p class="font-medium">{{ file.name }}</p>
                        <p class="text-sm text-gray-500">{{ formatFileSize(file.size) }}</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      class="btn btn-ghost btn-xs text-red-500"
                      @click="removeSupportFile(index)"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>

              <!-- Upload Guidelines -->
              <div class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 class="font-bold">Panduan Upload:</h3>
                  <div class="text-sm mt-1">
                    <p>• Dokumen utama harus berisi laporan lengkap proyek perubahan</p>
                    <p>• Gunakan format yang mudah dibaca (PDF lebih direkomendasikan)</p>
                    <p>• File pendukung dapat berupa gambar, data, atau material tambahan</p>
                    <p>• Pastikan tidak ada informasi sensitif/rahasia dalam dokumen</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 4: Review -->
            <div v-if="currentStep === 4" class="space-y-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Review & Submit</h2>
              
              <div class="bg-gray-50 rounded-lg p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="font-semibold text-gray-700">Nama Lengkap:</p>
                    <p>{{ form.authorName }}</p>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-700">Email:</p>
                    <p>{{ form.email }}</p>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-700">Kementerian/Lembaga:</p>
                    <p>{{ form.institution }}</p>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-700">Program Pelatihan:</p>
                    <p>{{ getTrainingName(form.training) }}</p>
                  </div>
                </div>
                
                <div>
                  <p class="font-semibold text-gray-700">Judul Proyek:</p>
                  <p>{{ form.title }}</p>
                </div>
                
                <div>
                  <p class="font-semibold text-gray-700">Deskripsi:</p>
                  <p class="text-sm">{{ form.description }}</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p class="font-semibold text-gray-700">Status:</p>
                    <span class="badge badge-outline">{{ form.status }}</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-700">Progress:</p>
                    <span class="badge badge-primary">{{ form.progress }}%</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-700">Total File:</p>
                    <span class="badge badge-secondary">{{ 1 + form.supportFiles.length }} file</span>
                  </div>
                </div>
                
                <div v-if="form.tags.length > 0">
                  <p class="font-semibold text-gray-700">Tags:</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="tag in form.tags" :key="tag" class="badge badge-outline badge-sm">{{ tag }}</span>
                  </div>
                </div>
              </div>

              <!-- Terms and Conditions -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" class="checkbox checkbox-primary" v-model="form.agreeTerms" />
                  <span class="label-text">
                    Saya menyetujui bahwa proyek ini dapat dibagikan secara publik untuk tujuan pembelajaran dan berbagi pengetahuan
                  </span>
                </label>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" class="checkbox checkbox-primary" v-model="form.agreeAccuracy" />
                  <span class="label-text">
                    Saya bertanggung jawab atas keakuratan data dan tidak ada informasi rahasia dalam dokumen yang diupload
                  </span>
                </label>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-8 border-t">
              <button 
                type="button" 
                class="btn btn-outline"
                :class="{ 'btn-disabled': currentStep === 1 }"
                @click="prevStep"
                v-if="currentStep > 1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Sebelumnya
              </button>
              <div v-else></div>

              <button 
                v-if="currentStep < 4"
                type="button" 
                class="btn btn-primary"
                @click="nextStep"
                :disabled="!canProceed"
              >
                Selanjutnya
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button 
                v-else
                type="submit" 
                class="btn btn-success"
                :disabled="!canSubmit"
                :class="{ 'loading': isSubmitting }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {{ isSubmitting ? 'Mengupload...' : 'Submit Proyek' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
useHead({
  title: 'Upload Proyek Perubahan - Astina',
  meta: [
    { name: 'description', content: 'Upload laporan proyek perubahan Anda' }
  ]
})

// Reactive data
const currentStep = ref(1)
const isSubmitting = ref(false)

const form = reactive({
  // Step 1
  authorName: '',
  email: '',
  institution: '',
  position: '',
  training: '',
  
  // Step 2
  title: '',
  description: '',
  status: '',
  progress: 0,
  tagsInput: '',
  tags: [],
  startDate: '',
  endDate: '',
  
  // Step 3
  mainFile: null,
  supportFiles: [],
  
  // Step 4
  agreeTerms: false,
  agreeAccuracy: false
})

// Computed properties
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return form.authorName && form.email && form.institution && form.training
    case 2:
      return form.title && form.description && form.status
    case 3:
      return form.mainFile
    case 4:
      return form.agreeTerms && form.agreeAccuracy
    default:
      return false
  }
})

const canSubmit = computed(() => {
  return canProceed.value && !isSubmitting.value
})

// Methods
const nextStep = () => {
  if (canProceed.value && currentStep.value < 4) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const processTags = () => {
  if (form.tagsInput.trim()) {
    const newTags = form.tagsInput
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag && !form.tags.includes(tag))
    
    form.tags.push(...newTags)
    form.tagsInput = ''
  }
}

const removeTag = (index) => {
  form.tags.splice(index, 1)
}

const handleMainFile = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
    form.mainFile = file
  } else {
    alert('File terlalu besar. Maksimal 10MB.')
  }
}

const removeMainFile = () => {
  form.mainFile = null
}

const handleSupportFiles = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    if (file.size <= 5 * 1024 * 1024) { // 5MB limit per file
      form.supportFiles.push(file)
    } else {
      alert(`File ${file.name} terlalu besar. Maksimal 5MB per file.`)
    }
  })
}

const removeSupportFile = (index) => {
  form.supportFiles.splice(index, 1)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getTrainingName = (value) => {
  const trainings = {
    'sakip': 'SAKIP & Reformasi Birokrasi',
    'digital': 'Digitalisasi Pelayanan Publik',
    'manajemen': 'Manajemen Perubahan',
    'inovasi': 'Inovasi Pelayanan',
    'leadership': 'Leadership Excellence',
    'analytics': 'Data Analytics',
    'smart-gov': 'Smart Government',
    'customer-service': 'Customer Service Excellence'
  }
  return trainings[value] || value
}

const submitProject = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Show success message
    alert('Proyek berhasil diupload! Terima kasih atas kontribusi Anda.')
    
    // Redirect to project list
    await navigateTo('/daftar-proyek')
  } catch (error) {
    alert('Terjadi kesalahan saat mengupload. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}

// Auto-save draft (optional)
watchEffect(() => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('project-draft', JSON.stringify({
      ...form,
      mainFile: null, // Don't save file objects
      supportFiles: []
    }))
  }
})

// Load draft on mount
onMounted(() => {
  if (typeof window !== 'undefined') {
    const draft = localStorage.getItem('project-draft')
    if (draft) {
      const parsed = JSON.parse(draft)
      Object.assign(form, parsed)
    }
  }
})
</script>

<style scoped>
.steps .step:before {
  content: counter(step-counter);
}

.file-drop-zone {
  transition: all 0.3s ease;
}

.file-drop-zone:hover {
  border-color: #3B82F6;
  background-color: #F8FAFC;
}
</style>
