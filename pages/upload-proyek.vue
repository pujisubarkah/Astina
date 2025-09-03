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
                    <span class="label-text font-semibold">NIP *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan NIP Anda"
                    class="input input-bordered w-full"
                    v-model="form.nip"
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
                    <option v-for="instansi in instansiOptions" :key="instansi.instansi_id" :value="instansi.instansi_id">
                      {{ instansi.nama_instansi }}
                    </option>
                  </select>
                </div>

                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">Lembaga Diklat *</span>
                    </label>
                    <select class="select select-bordered w-full" v-model="form.lembagaDiklat" required>
                      <option value="">Pilih Lembaga Diklat</option>
                      <option v-for="lemdik in lemdikOptions" :key="lemdik.id" :value="lemdik.id">
                        {{ lemdik.namalemdik }}
                      </option>
                    </select>
                  </div>

                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">Nomor KRA</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Isi jika ada Nomor KRA"
                      class="input input-bordered w-full"
                      v-model="form.nomorKra"
                    />
                  </div>

                  <div class="form-control md:col-span-2">
                    <label class="label">
                      <span class="label-text font-semibold">Program Pelatihan *</span>
                    </label>
                    <select class="select select-bordered w-full" v-model="form.training" required>
                      <option value="">Pilih Program Pelatihan</option>
                      <option v-for="pelatihan in pelatihanOptions" :key="pelatihan.id" :value="pelatihan.id">
                        {{ pelatihan.nama }}
                      </option>
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
                  class="textarea textarea-bordered w-full h-32"
                  placeholder="Jelaskan latar belakang, tujuan, dan ringkasan proyek perubahan Anda..."
                  v-model="form.description"
                  :maxlength="500"
                  required
                  @input="form.description = form.description.slice(0, 500)"
                ></textarea>
                <label class="label">
                  <span class="label-text-alt text-xs text-gray-500">{{ form.description.length }}/500 karakter</span>
                </label>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold whitespace-normal break-words">Berapa perkiraan nilai ekonomi yang dihasilkan dari proyek perubahan atau dari penerapan hasil pelatihan yang Anda ikuti? *</span>
                  </label>
                  <select class="select select-bordered w-full" v-model="form.nilaiEkonomi" required>
                    <option value="">Pilih Nilai Ekonomi</option>
                    <option v-for="option in nilaiEkonomiOptions" :key="option" :value="option">
                      {{ option }}
                    </option>
                  </select>
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
                <UploadFile @fileUploaded="handleMainFileUploaded" @uploadError="handleUploadError" />
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
                        <p class="font-medium">{{ file.filename }}</p>
                        <p class="text-sm text-gray-500">{{ formatFileSize(file.size) }} • Google Drive</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <a 
                        :href="file.shareUrl" 
                        target="_blank"
                        class="btn btn-ghost btn-xs text-blue-500"
                      >
                        Lihat
                      </a>
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
                    <p>{{ getInstansiName(form.institution) }}</p>
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
                    <p class="font-semibold text-gray-700">Total File:</p>
                    <span class="badge badge-secondary">{{ getTotalFiles() }} file</span>
                  </div>
                  <div v-if="form.mainFileData">
                    <p class="font-semibold text-gray-700">Dokumen Utama:</p>
                    <span class="badge badge-primary">{{ form.mainFileData.filename }}</span>
                  </div>
                  <div v-if="form.supportFiles.length > 0">
                    <p class="font-semibold text-gray-700">File Pendukung:</p>
                    <span class="badge badge-outline">{{ form.supportFiles.length }} file</span>
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
import UploadFile from "~/components/UploadFile.vue"
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
const instansiOptions = ref([])
const pelatihanOptions = ref([])
const lemdikOptions = ref([])

const form = reactive({
  // Step 1
  authorName: '',
  email: '',
  institution: '',
  lembagaDiklat: '',
  training: '',
  nip: '',
  nomorKra: '',
  
  // Step 2
  title: '',
  description: '',
  nilaiEkonomi: '',
  progress: 0,
  tagsInput: '',
  tags: [],
  startDate: '',
  endDate: '',
  
  // Step 3
  mainFile: null,
  mainFileData: null, // Store uploaded file data from Dropbox
  supportFiles: [],
  
  // Step 4
  agreeTerms: false,
  agreeAccuracy: false
})

const nilaiEkonomiOptions = computed(() => {
  // Cari pelatihan yang dipilih berdasarkan ID
  const selected = pelatihanOptions.value.find(p => p.id === form.training)
  const id = selected?.id
  if (id === 1 || id === 2) {
    return [
      'Kurang dari Rp.100.000.000,- (seratus juta rupiah)',
      'Rp100.000.000,- s.d. Rp1.000.000.000,-',
      'Rp1.000.000.001,- s.d. Rp10.000.000.000,-',
      'Lebih dari Rp10.000.000.000,- (sepuluh miliar rupiah)'
    ]
  } else if (id === 3 || id === 4) {
    return [
      'Kurang dari Rp 50.000.000 (lima puluh juta rupiah)',
      'Rp 50.000.000,- s.d Rp 100.000.000,-',
      'Rp 100.000.001,- s.d Rp 500.000.000,-',
      'Lebih dari Rp 500.000.000,- (lima ratus juta rupiah)'
    ]
  }
  return []
})

// Computed properties
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return form.authorName && form.email && form.institution && form.training
    case 2:
      return form.title && form.description && form.nilaiEkonomi
    case 3:
      return form.mainFileData // Check for uploaded file data instead of file object
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

const getTrainingName = (id) => {
  const training = pelatihanOptions.value.find(p => p.id === id)
  return training ? training.nama : ''
}

const getInstansiName = (id) => {
  const instansi = instansiOptions.value.find(i => i.instansi_id === id)
  return instansi ? instansi.nama_instansi : ''
}

const getLemdikName = (id) => {
  const lemdik = lemdikOptions.value.find(l => l.id === id)
  return lemdik ? lemdik.namalemdik : ''
}

// File upload handlers
const handleMainFileUploaded = (fileData) => {
  form.mainFileData = fileData
  form.mainFile = null // Clear the file object since we have the uploaded data
}

const handleUploadError = (error) => {
  alert(`Error uploading file: ${error}`)
}

// Support file upload with Google Drive
const { uploadToGoogleDrive } = useFileUpload()

const handleSupportFiles = async (event) => {
  const files = Array.from(event.target.files)
  
  for (const file of files) {
    if (file.size <= 5 * 1024 * 1024) { // 5MB limit per file
      try {
        const result = await uploadToGoogleDrive(file)
        if (result.success && result.data) {
          form.supportFiles.push({
            ...result.data,
            originalFile: file
          })
        } else {
          alert(`Failed to upload ${file.name}: ${result.error}`)
        }
      } catch (error) {
        alert(`Error uploading ${file.name}: ${error.message}`)
      }
    } else {
      alert(`File ${file.name} terlalu besar. Maksimal 5MB per file.`)
    }
  }
}

const getTotalFiles = () => {
  return (form.mainFileData ? 1 : 0) + form.supportFiles.length
}

const submitProject = async () => {
  isSubmitting.value = true
  try {
    // Step 1: Get file URL from uploaded data
    const mainFileUrl = form.mainFileData?.url || null
    
    if (!mainFileUrl) {
      throw new Error('File utama belum diupload')
    }

    // Step 2: Get institution, lemdik, and training IDs from selected values
    const selectedInstansi = instansiOptions.value.find(inst => inst.instansi_id === form.institution)
    const selectedLemdik = lemdikOptions.value.find(lem => lem.id === form.lembagaDiklat)
    const selectedPelatihan = pelatihanOptions.value.find(pel => pel.id === form.training)

    if (!selectedInstansi || !selectedLemdik || !selectedPelatihan) {
      throw new Error('Data instansi, lemdik, atau pelatihan tidak valid')
    }

    // Step 3: Create project using the new API
    const projectData = {
      userId: 1, // TODO: Get from authentication/session
      instansiId: selectedInstansi.instansi_id,
      lemdikId: selectedLemdik.id,
      pelatihanId: selectedPelatihan.id,
      title: form.title,
      description: form.description,
      nilaiEkonomi: form.nilaiEkonomi,
      mainFileUrl: mainFileUrl,
      status: 'submitted' // Change from draft to submitted when user submits
    }

    const projectResponse = await $fetch('/api/project', {
      method: 'POST',
      body: projectData
    })

    if (!projectResponse.success) {
      throw new Error(projectResponse.message || 'Gagal menyimpan proyek')
    }

    const projectId = projectResponse.data.id

    // Step 4: Upload support files if any
    if (form.supportFiles.length > 0) {
      for (const file of form.supportFiles) {
        try {
          await $fetch('/api/project/support', {
            method: 'POST',
            body: {
              projectId: projectId,
              fileUrl: file.url,
              fileName: file.filename,
              fileType: file.originalFile?.type || 'document'
            }
          })
        } catch (err) {
          console.warn('Failed to save support file:', file.filename, err)
        }
      }
    }

    // Step 5: Save user info to proper table for tracking
    try {
      await $fetch('/api/proper', {
        method: 'POST',
        body: {
          nama: form.authorName,
          no_identitas: form.nip,
          email: form.email,
          instansi_id: selectedInstansi.instansi_id,
          lemdik_id: selectedLemdik.id,
          nomor_kra: form.nomorKra,
          program_id: selectedPelatihan.id
        }
      })
    } catch (err) {
      console.warn('Failed to save proper info:', err)
    }

    // Clear draft from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('project-draft')
    }

    alert('Proyek berhasil diupload ke Google Drive dan disimpan! Terima kasih atas kontribusi Anda.')
    await navigateTo('/daftar-proyek')
  } catch (error) {
    console.error('Submit error:', error)
    alert(`Terjadi kesalahan saat mengupload: ${error.message}`)
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

// Load draft and fetch instansi & pelatihan on mount
onMounted(async () => {
  if (typeof window !== 'undefined') {
    const draft = localStorage.getItem('project-draft')
    if (draft) {
      const parsed = JSON.parse(draft)
      Object.assign(form, parsed)
    }
  }
  // Fetch instansi options from API
  try {
    const res = await fetch('/api/instansi')
    const data = await res.json()
    if (data.success && Array.isArray(data.data)) {
      instansiOptions.value = data.data
    }
  } catch (err) {
    console.error('Gagal fetch instansi:', err)
  }
  // Fetch lemdik options from API
  try {
    const res = await fetch('/api/lemdik')
    const data = await res.json()
    if (data.success && Array.isArray(data.data)) {
      lemdikOptions.value = data.data
    }
  } catch (err) {
    console.error('Gagal fetch lemdik:', err)
  }
  // Fetch pelatihan options from API
  try {
    const res = await fetch('/api/pelatihan')
    const data = await res.json()
    if (data.success && Array.isArray(data.data)) {
      pelatihanOptions.value = data.data
    }
  } catch (err) {
    console.error('Gagal fetch pelatihan:', err)
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
