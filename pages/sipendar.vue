<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
    <div class="container mx-auto px-4 py-12">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 class="text-5xl font-bold text-blue-900 mb-4">SIPENDAR</h1>
        <p class="text-xl text-blue-700 font-medium">Sistem Pendaftaran Daring</p>
      </div>

      <!-- Main Content -->
      <div class="max-w-4xl mx-auto">
        <!-- Introduction Card -->
        <div class="card bg-white shadow-xl mb-8">
          <div class="card-body">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-blue-900 mb-4">Tentang SIPENDAR</h2>
                <p class="text-lg text-gray-700 leading-relaxed mb-6">
                  <strong class="text-blue-800">SIPENDAR (Sistem Pendaftaran Daring)</strong> adalah sistem pendaftaran peserta Diklat Kepemimpinan (Diklatpim) yang bersifat daring (dalam jaringan/online).
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Requirements Section -->
        <div class="card bg-white shadow-xl">
          <div class="card-body">
            <div class="flex items-start gap-4 mb-6">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-blue-900 mb-4">Persyaratan Pendaftaran</h2>
              </div>
            </div>
            
            <div class="prose prose-lg max-w-none">
              <p class="text-gray-700 leading-relaxed mb-6">
                Untuk dapat mendaftarkan calon peserta Diklat Kepemimpinan (Diklatpim), instansi pengusul dari 
                <strong class="text-blue-800">Kementerian, Lembaga Tinggi Negara, Lembaga Non Struktural, Lembaga Pemerintah Non Kementerian, maupun Pemerintah Daerah (Provinsi/Kota/Kabupaten)</strong> 
                harus menyediakan berkas, yaitu:
              </p>

              <!-- Requirements List -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 class="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span class="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">1</span>
                  Surat Usulan Resmi
                </h3>
                
                <div class="mb-4">
                  <p class="text-gray-700 mb-3">
                    Surat usulan resmi, ditujukan kepada <strong class="text-blue-800">Deputi bidang Diklat Aparatur LAN</strong>. 
                    Surat usulan calon peserta Diklatpim harus ditandatangani oleh Pejabat pembina kepegawaian, seperti:
                  </p>
                </div>

                <!-- Authorized Signatories -->
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="space-y-3">
                    <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span class="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">1</span>
                      <span class="text-gray-700">Sekretaris Jenderal</span>
                    </div>
                    <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span class="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">2</span>
                      <span class="text-gray-700">Sekretaris Kementerian</span>
                    </div>
                    <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span class="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">3</span>
                      <span class="text-gray-700">Sekretaris Utama</span>
                    </div>
                    <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span class="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">4</span>
                      <span class="text-gray-700">Sekretaris Daerah</span>
                    </div>
                    <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span class="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">5</span>
                      <span class="text-gray-700">Asisten Kapolri Bidang SDM</span>
                    </div>
                  </div>
                  
                  <div class="space-y-3">
                    <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span class="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">6</span>
                      <span class="text-gray-700">Jaksa Agung Muda Bidang Pembinaan SDM</span>
                    </div>
                    <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span class="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">7</span>
                      <span class="text-gray-700">Deputi Bidang SDM Kementerian Sekretariat Negara</span>
                    </div>
                    <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span class="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">8</span>
                      <span class="text-gray-700">Deputi Bidang Administrasi Sekretariat Kabinet</span>
                    </div>
                    <div class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span class="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">9</span>
                      <span class="text-gray-700">Pejabat pembina kepegawaian lainnya</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-12">
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-blue-900 mb-4">Akses SIPENDAR Sekarang</h3>
            <p class="text-gray-600 mb-6">Login ke sistem SIPENDAR untuk mendaftarkan calon peserta Diklat Kepemimpinan</p>
            <button @click="openLoginModal" class="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login SIPENDAR
            </button>
          </div>
        </div>

        <!-- Back to Home -->
        <div class="text-center mt-8">
          <NuxtLink to="/" class="btn btn-ghost">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Beranda
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Function to open login modal
const openLoginModal = () => {
  // Dispatch custom event that navbar can listen to
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-login-modal'))
  }
}

// Set page metadata
useHead({
  title: 'SIPENDAR - Sistem Pendaftaran Peserta Diklat Kepemimpinan | ASTINA',
  meta: [
    { name: 'description', content: 'SIPENDAR adalah sistem pendaftaran peserta Diklat Kepemimpinan (Diklatpim) yang bersifat daring. Login untuk mengakses sistem pendaftaran peserta Diklatpim.' }
  ]
})
</script>

<style scoped>
.prose {
  max-width: none;
}
</style>
