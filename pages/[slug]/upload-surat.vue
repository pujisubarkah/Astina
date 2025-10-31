<template>
  <div class="p-8 max-w-3xl">
    <h1 class="text-2xl font-bold mb-4 text-blue-700">Upload Surat Usulan</h1>
    <p class="text-sm text-gray-700 mb-6">Silakan unggah surat usulan calon peserta dengan menekan ikon Browse, pilih file hasil pemindaian (scan), lalu klik Upload.</p>

    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <label class="flex items-center gap-3">
          <input ref="fileInput" @change="onFileChange" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" class="hidden" />
          <button type="button" @click="openFileDialog" class="btn btn-outline btn-sm">📁 Browse</button>
          <span class="text-sm text-gray-600">{{ fileName || 'Belum ada file yang dipilih' }}</span>
        </label>

        <div class="ml-auto">
          <button :disabled="!selectedFile || uploading" @click="uploadFile" class="btn btn-primary btn-sm">
            <span v-if="uploading">Mengunggah...</span>
            <span v-else>Upload</span>
          </button>
        </div>
      </div>

      <p v-if="message" :class="messageClass" class="mt-4 p-3 rounded">{{ message }}</p>

      <div class="mt-4 text-xs text-gray-500">
        <p>Catatan: Hanya file hasil pemindaian dengan ekstensi <strong>.pdf</strong>, <strong>.doc</strong>, atau <strong>.docx</strong> yang diizinkan. Jika Anda mengunggah gambar hasil scan, gunakan ekstensi <strong>.jpg/.jpeg</strong> atau <strong>.png</strong>.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'slug' })

const fileInput = ref(null)
const selectedFile = ref(null)
const fileName = ref('')
const uploading = ref(false)
const message = ref('')
const messageClass = ref('')

const allowed = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']

function openFileDialog() {
  if (fileInput.value) fileInput.value.click()
}

function onFileChange(e) {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  selectedFile.value = f
  fileName.value = f.name
  message.value = ''
  messageClass.value = ''
}

async function uploadFile() {
  if (!selectedFile.value) return

  // Validate extension
  const name = selectedFile.value.name
  const ext = name.split('.').pop().toLowerCase()
  if (!allowed.includes(ext)) {
    message.value = 'ERROR: Ekstensi file tidak diizinkan!'
    messageClass.value = 'bg-red-100 text-red-700'
    return
  }

  uploading.value = true
  message.value = ''
  messageClass.value = ''

  try {
    const form = new FormData()
    form.append('file', selectedFile.value)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form
    })

    if (!res.ok) {
      // Try to read message from server
      let text = await res.text().catch(() => '')
      message.value = text || 'ERROR: Gagal mengunggah file.'
      messageClass.value = 'bg-red-100 text-red-700'
    } else {
      message.value = 'SUCCESS: File berhasil di Upload!'
      messageClass.value = 'bg-green-100 text-green-700'
      // reset selection
      selectedFile.value = null
      fileName.value = ''
      if (fileInput.value) fileInput.value.value = ''
    }
  } catch (err) {
    message.value = 'ERROR: Gagal mengunggah file.'
    messageClass.value = 'bg-red-100 text-red-700'
    console.error(err)
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
/* Placeholder styles */
</style>
