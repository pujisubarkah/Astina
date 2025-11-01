<template>
  <div class="p-8 max-w-3xl">
    <h1 class="text-2xl font-bold mb-4 text-blue-700">Upload Data Peserta</h1>

    <div class="mb-6">
      <p class="text-sm text-gray-700">Untuk mengunggah data calon peserta, klik tombol <strong>Upload Data Peserta</strong> di bawah ini. Sistem akan menanyakan apakah Anda sudah menyiapkan data dengan BENAR sebelum melanjutkan.</p>
    </div>

    <div class="mb-6">
      <button @click="startUploadFlow" class="btn btn-primary">Upload Data Peserta</button>
    </div>

    <div v-if="showForm" class="bg-white p-6 rounded shadow-sm">
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-3">
          <input ref="fileInput" @change="onFileChange" type="file" accept=".xls,.xlsx" class="hidden" />
          <button type="button" @click="openFileDialog" class="btn btn-outline btn-sm">📁 Browse</button>
          <span class="text-sm text-gray-600">{{ fileName || 'Belum ada file yang dipilih' }}</span>
        </label>

        <a class="ml-4 text-sm link link-primary" :href="templateUrl" download>📥 Download Template Peserta (.xls)</a>

        <div class="ml-auto">
          <button :disabled="!selectedFile || uploading" @click="submitFile" class="btn btn-success btn-sm">Kirim</button>
        </div>
      </div>

      <div v-if="resultMessage" class="mt-4 p-3 rounded" :class="resultClass">{{ resultMessage }}</div>

      <div v-if="importStats" class="mt-4 bg-gray-50 p-3 rounded text-sm">
        <p><strong>Informasi Import:</strong></p>
        <ul class="list-disc pl-5">
          <li>Total baris: {{ importStats.total ?? '—' }}</li>
          <li>Berhasil diimport: {{ importStats.success ?? '—' }}</li>
          <li>Gagal diimport: {{ importStats.failed ?? '—' }}</li>
        </ul>
        <p class="mt-2 text-xs text-gray-600">Catatan: Untuk dinyatakan berhasil, jumlah <strong>Gagal diimport</strong> harus berisi angka 0 (nol).</p>
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
const showForm = ref(false)
const uploading = ref(false)
const resultMessage = ref('')
const resultClass = ref('')
const importStats = ref(null)

const templateUrl = '/template-peserta.xls'

function startUploadFlow() {
  const ok = confirm('Apakah Anda sudah menyiapkan Data Peserta dengan BENAR?')
  if (ok) {
    showForm.value = true
  }
}

function openFileDialog() {
  if (fileInput.value) fileInput.value.click()
}

function onFileChange(e) {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  selectedFile.value = f
  fileName.value = f.name
  resultMessage.value = ''
  resultClass.value = ''
  importStats.value = null
}

async function submitFile() {
  if (!selectedFile.value) return

  // validate extension
  const ext = (selectedFile.value.name.split('.').pop() || '').toLowerCase()
  if (!['xls', 'xlsx'].includes(ext)) {
    resultMessage.value = 'ERROR: Ekstensi file tidak diizinkan. Harap gunakan file .xls atau .xlsx.'
    resultClass.value = 'bg-red-100 text-red-700'
    return
  }

  uploading.value = true
  resultMessage.value = ''
  resultClass.value = ''
  importStats.value = null

  try {
    const form = new FormData()
    form.append('file', selectedFile.value)

    const res = await fetch('/api/upload', { method: 'POST', body: form })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      resultMessage.value = text || 'ERROR: Gagal mengunggah file.'
      resultClass.value = 'bg-red-100 text-red-700'
      return
    }

    // Try to parse JSON response
    let json = null
    try { json = await res.json() } catch (e) { json = null }

    // If server returns import stats, show them. Expected shape: { importResult: { total, success, failed } }
    if (json && json.importResult) {
      importStats.value = json.importResult
      resultMessage.value = 'File berhasil dikirim. Lihat ringkasan import di bawah.'
      resultClass.value = 'bg-green-100 text-green-700'
    } else if (json && json.success) {
      // No import stats, but upload succeeded (e.g., uploaded to cloud storage)
      resultMessage.value = 'SUCCESS: File berhasil dikirim. Server tidak mengembalikan statistik import.'
      resultClass.value = 'bg-green-100 text-green-700'
    } else {
      resultMessage.value = 'SUCCESS: File berhasil dikirim.'
      resultClass.value = 'bg-green-100 text-green-700'
    }
    // After success, reset selection
    selectedFile.value = null
    fileName.value = ''
    if (fileInput.value) fileInput.value.value = ''
  } catch (err) {
    console.error(err)
    resultMessage.value = 'ERROR: Terjadi kesalahan saat mengirim file.'
    resultClass.value = 'bg-red-100 text-red-700'
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
/* Placeholder styles */
</style>
