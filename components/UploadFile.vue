<script setup lang="ts">
const emit = defineEmits(['fileUploaded', 'uploadError'])

const { uploadToDropbox, isUploading, uploadProgress, uploadError } = useFileUpload()

const selectedFile = ref<File | null>(null)
const uploadedFileData = ref<any>(null)
const fileInput = ref<HTMLInputElement>()

async function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  selectedFile.value = file
  
  // Start upload
  const result = await uploadToDropbox(file)
  
  if (result.success && result.data) {
    uploadedFileData.value = result.data
    emit('fileUploaded', result.data)
  } else {
    emit('uploadError', result.error || 'Upload failed')
  }
}

function removeFile() {
  selectedFile.value = null
  uploadedFileData.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<template>
  <div class="form-control">
    <!-- File Input -->
    <div v-if="!uploadedFileData" class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
      <input 
        type="file" 
        class="hidden" 
        ref="fileInput"
        @change="handleFileSelect"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.txt"
        :disabled="isUploading"
      />
      
      <!-- Upload Area -->
      <div v-if="!isUploading && !selectedFile">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p class="text-gray-600 mb-2">Upload dokumen utama proyek</p>
        <p class="text-sm text-gray-500 mb-4">PDF, DOC, XLS, PPT, JPG, PNG (Max 10MB)</p>
        <button 
          type="button" 
          class="btn btn-primary btn-sm"
          @click="fileInput?.click()"
        >
          Pilih File
        </button>
      </div>
      
      <!-- Upload Progress -->
      <div v-if="isUploading" class="space-y-4">
        <div class="flex items-center justify-center gap-3">
          <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm text-gray-600">
            {{ uploadProgress < 50 ? 'Mengupload ke Cloud Storage...' : 'Memfinalisasi upload...' }}
          </span>
        </div>
        
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" :style="{ width: uploadProgress + '%' }"></div>
        </div>
        
        <p class="text-sm text-gray-500">{{ uploadProgress }}%</p>
        
        <div v-if="selectedFile" class="text-sm text-gray-600">
          {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
        </div>
      </div>
      
      <!-- Upload Error -->
      <div v-if="uploadError" class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ uploadError }}</span>
        <button class="btn btn-sm btn-ghost" @click="removeFile">Coba Lagi</button>
      </div>
    </div>
    
    <!-- Uploaded File Display -->
    <div v-if="uploadedFileData" class="bg-green-50 border border-green-200 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="font-medium text-green-800">{{ uploadedFileData.filename }}</p>
            <p class="text-sm text-green-600">
              {{ formatFileSize(uploadedFileData.size) }} • 
              {{ uploadedFileData.shareUrl && uploadedFileData.shareUrl.includes('dropbox') ? 'Dropbox' : 'Local Storage' }}
            </p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <a 
            :href="uploadedFileData.shareUrl || uploadedFileData.url" 
            target="_blank"
            class="btn btn-ghost btn-xs text-green-600 hover:text-green-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Lihat
          </a>
          <button 
            type="button" 
            class="btn btn-ghost btn-xs text-red-500 hover:text-red-600"
            @click="removeFile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
