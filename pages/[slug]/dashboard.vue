<template>
  <div class="p-8">
    <!-- Welcome Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-blue-700 mb-2">Selamat Datang, {{ userName }}!</h1>
      <p class="text-lg text-gray-600">Selamat datang di dashboard SIPENDAR Anda</p>
    </div>

    <h2 class="text-2xl font-bold mb-4 text-blue-700">SIPENDAR — Pendaftaran Peserta Diklat Kepemimpinan</h2>

    <p class="mb-4 text-gray-700">
      SIPENDAR adalah sistem pendaftaran daring untuk calon peserta Diklat Kepemimpinan (Diklatpim).
      Instansi pengusul harus menyiapkan berkas yang dipersyaratkan agar pendaftaran dapat diproses.
    </p>

    <section class="mb-6">
      <h2 class="text-lg font-semibold mb-2">Persyaratan Berkas</h2>
      <ol class="list-decimal list-inside text-gray-700 space-y-1">
        <li>Surat usulan resmi yang ditujukan kepada Deputi Bidang Diklat Aparatur LAN.</li>
        <li>Daftar nama calon peserta (format CSV/XLSX sesuai template).</li>
        <li>Dokumen pendukung lain sesuai ketentuan program (jika diperlukan).</li>
      </ol>
    </section>

    <section class="mb-6">
      <h2 class="text-lg font-semibold mb-2">Siapa yang Berwenang Menandatangani Surat Usulan?</h2>
      <p class="text-gray-700 mb-2">Surat usulan calon peserta Diklatpim harus ditandatangani oleh Pejabat Pembina Kepegawaian, seperti:</p>
      <ul class="list-disc list-inside text-gray-700 space-y-1">
        <li>Sekretaris Jenderal</li>
        <li>Sekretaris Kementerian</li>
        <li>Sekretaris Utama</li>
        <li>Sekretaris Daerah</li>
        <li>Asisten Kapolri Bidang SDM</li>
        <li>Jaksa Agung Muda Bidang Pembinaan SDM</li>
        <li>Deputi Bidang SDM Kementerian Sekretariat Negara</li>
        <li>Deputi Bidang Administrasi Sekretariat Kabinet</li>
        <li>Pejabat Pembina Kepegawaian lainnya</li>
      </ul>
    </section>

    <section class="mb-6">
      <h2 class="text-lg font-semibold mb-2">Langkah Cepat Pendaftaran</h2>
      <ol class="list-decimal list-inside text-gray-700 space-y-2">
        <li>Siapkan <strong>Surat Usulan</strong> dalam format PDF/DOC yang ditandatangani pejabat berwenang.</li>
        <li>Siapkan <strong>Daftar Peserta</strong> sesuai template (CSV/XLSX).</li>
        <li>Gunakan tautan di bawah untuk mengunggah berkas yang diminta:</li>
      </ol>

      <div class="mt-3 space-x-3">
        <NuxtLink :to="`${base}/upload-surat`" class="btn btn-sm btn-primary">Upload Surat Usulan</NuxtLink>
        <NuxtLink :to="`${base}/upload-peserta`" class="btn btn-sm btn-secondary">Upload Data Peserta</NuxtLink>
        <NuxtLink :to="`${base}/master-usulan`" class="btn btn-sm btn-outline">Data Master Usulan</NuxtLink>
      </div>
    </section>

    <section>
      <h2 class="text-lg font-semibold mb-2">Catatan</h2>
      <ul class="list-disc list-inside text-gray-700 space-y-1">
        <li>Pastikan surat usulan memuat cap/ttd dan identitas pejabat yang menandatangani.</li>
        <li>Periksa kembali format file dan ukuran sebelum mengunggah.</li>
        <li>Jika instansi memiliki pertanyaan, hubungi admin SIPENDAR melalui kanal komunikasi resmi.</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { getUserInfo } = useAuth()

// Get user name from auth first, fallback to slug conversion
const userInfo = getUserInfo()
let userName = userInfo?.name || 'User'

// If no name from auth, try to convert slug to readable name
if (userName === 'User' && route.params.slug) {
  // Convert slug format (kementerian-agama) to readable format (Kementerian Agama)
  userName = route.params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Always generate slug from user name, not from route params
const slug = userName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
const base = `/${slug}`

// If route slug doesn't match user slug, we still show the dashboard but use user's actual name
// This handles cases where user accesses old username-based URLs

definePageMeta({ layout: 'slug' })
</script>

<style scoped>
/* Intentionally left blank — use Tailwind utility classes inline in the template. */
</style>
