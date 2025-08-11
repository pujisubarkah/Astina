<template>
  <div>
    <!-- Hero Section -->
    <div class="hero min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <div class="hero-content text-center text-white">
        <div class="max-w-4xl">
          <h1 class="text-6xl font-bold mb-6">
            Selamat Datang di 
            <span class="text-yellow-300">Astina</span>
          </h1>
          <p class="text-xl mb-8 opacity-90">
            Aplikasi Sentral Transformasi Inovasi dan Nilai Aparatur
          </p>
          <p class="text-lg mb-10 max-w-2xl mx-auto opacity-80">
            Astina adalah pusat dokumentasi dan kolaborasi untuk Proyek Perubahan peserta PKP, PKA, PKN Tk I, dan PKN Tk II. 
    Menghimpun berbagai ide strategis, menyatukan kekuatan lintas instansi, 
    dan menggerakkan transformasi menuju aparatur negara yang unggul
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn btn-warning btn-lg text-blue-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Mulai Sekarang
            </button>
            <button class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-1 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-base-100">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Fitur Unggulan</h2>
          <p class="text-lg opacity-70 max-w-2xl mx-auto">
            Astina menyediakan platform repositori yang lengkap untuk mengelola dan melacak semua perubahan proyek pemerintah
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Repository Feature -->
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div class="card-body text-center">
              <div class="mx-auto mb-4 p-4 bg-blue-600 rounded-full w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7l2 2-2 2m2-2l2 2-2 2" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                </svg>
              </div>
              <h3 class="card-title justify-center text-lg">Repositori Proyek</h3>
              <p class="text-sm opacity-70">
                Ruang penyimpanan ide dan hasil karya perubahan, tersusun rapi untuk memudahkan kolaborasi lintas generasi.
              </p>
            </div>
          </div>

          <!-- Version Control Feature -->
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div class="card-body text-center">
              <div class="mx-auto mb-4 p-4 bg-green-600 rounded-full w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="card-title justify-center text-lg">Tracking Perubahan</h3>
              <p class="text-sm opacity-70">
                Rekam jejak setiap tahapan proyek perubahan dengan detail kronologi dan milestone yang jelas untuk akuntabilitas
              </p>
            </div>
          </div>

          <!-- Collaboration Feature -->
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div class="card-body text-center">
              <div class="mx-auto mb-4 p-4 bg-purple-600 rounded-full w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="card-title justify-center text-lg">Kolaborasi Tim</h3>
              <p class="text-sm opacity-70">
                Menghubungkan aparatur lintas instansi untuk berbagi best practice dan saling memberikan masukan konstruktif
              </p>
            </div>
          </div>

          <!-- Documentation Feature -->
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div class="card-body text-center">
              <div class="mx-auto mb-4 p-4 bg-orange-600 rounded-full w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="card-title justify-center text-lg">Dokumentasi</h3>
              <p class="text-sm opacity-70">
                Platform terpusat untuk menyimpan laporan, panduan, dan knowledge sharing setiap proyek perubahan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Section -->
    <div class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Statistik Platform</h2>
          <p class="text-lg opacity-70">
            Dipercaya oleh berbagai instansi pemerintah di seluruh Indonesia
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="stat bg-base-100 rounded-lg shadow-lg">
            <div class="stat-figure text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7l2 2-2 2m2-2l2 2-2 2" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
              </svg>
            </div>
            <div class="stat-title">Proyek Perubahan</div>
            <div class="stat-value text-blue-600">1,250</div>
            <div class="stat-desc">Proyek terdokumentasi</div>
          </div>

          <div class="stat bg-base-100 rounded-lg shadow-lg">
            <div class="stat-figure text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-title">Inovasi Berhasil</div>
            <div class="stat-value text-green-600">25,420</div>
            <div class="stat-desc">Best practice tersimpan</div>
          </div>

          <div class="stat bg-base-100 rounded-lg shadow-lg">
            <div class="stat-figure text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="stat-title">Aparatur Aktif</div>
            <div class="stat-value text-purple-600">890</div>
            <div class="stat-desc">Peserta berkolaborasi</div>
          </div>

          <div class="stat bg-base-100 rounded-lg shadow-lg">
            <div class="stat-figure text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="stat-title">Instansi</div>
            <div class="stat-value text-orange-600">45</div>
            <div class="stat-desc">Organisasi terdaftar</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20 bg-blue-700 text-white">
      <div class="container mx-auto px-4 text-center">
        <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Bergabunglah dengan ribuan aparatur dan instansi yang telah menggunakan Astina untuk berkolaborasi dalam proyek transformasi pemerintahan
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="btn btn-warning btn-lg text-blue-900">
            Mulai Gratis Sekarang
          </button>
          <button class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-700">
            Hubungi Tim Kami
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set page metadata
useHead({
  title: 'Selamat Datang - Astina Platform',
  meta: [
    { name: 'description', content: 'Platform Repositori Proyek Digital untuk Lembaga Administrasi Negara. Kelola repositori proyek, tracking perubahan, dan kolaborasi tim dengan mudah.' }
  ]
})
</script>

<style scoped>
/* Additional page-specific styles can be added here if needed */
</style>