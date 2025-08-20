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
            Hub Proyek Perubahan Program Pelatihan Kepemimpinan Nasional
          </p>
          <p class="text-lg mb-10 max-w-2xl mx-auto opacity-80">
            Astina adalah platform terpusat yang menghimpun seluruh Proyek Perubahan dari peserta 
            <strong class="text-yellow-300">PKN Tk I, PKN Tk II, PKA, dan PKP</strong>. 
            Menjadi jembatan kolaborasi lintas instansi untuk berbagi best practice, 
            pembelajaran, dan inovasi transformasi birokrasi di seluruh Indonesia.
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
          <h2 class="text-4xl font-bold mb-4">Mengapa Astina?</h2>
          <p class="text-lg opacity-70 max-w-3xl mx-auto">
            Sebagai <strong>Hub Proyek Perubahan</strong> terbesar di Indonesia, Astina mengintegrasikan 
            seluruh hasil karya peserta program pelatihan kepemimpinan dalam satu platform yang mudah diakses, 
            dipelajari, dan diadaptasi oleh instansi lain.
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
              <h3 class="card-title justify-center text-lg">Hub Repositori</h3>
              <p class="text-sm opacity-70">
                Pusat penyimpanan digital untuk semua Proyek Perubahan dari PKN Tk I, PKN Tk II, PKA, dan PKP yang terorganisir dengan baik.
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
              <h3 class="card-title justify-center text-lg">Knowledge Sharing</h3>
              <p class="text-sm opacity-70">
                Berbagi pengalaman dan pembelajaran antar peserta program pelatihan kepemimpinan untuk replikasi best practice di instansi masing-masing.
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
              <h3 class="card-title justify-center text-lg">Learning Hub</h3>
              <p class="text-sm opacity-70">
                Platform pembelajaran terpusat untuk mengakses panduan, studi kasus, dan dokumentasi lengkap dari setiap Proyek Perubahan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold text-blue-900 mb-6">Apa itu Astina?</h2>
          <div class="text-lg text-blue-800 leading-relaxed space-y-4">
            <p>
              <strong class="text-blue-900">Astina (Aplikasi Sentral Transformasi Inovasi dan Nilai Aparatur)</strong> 
              adalah platform digital yang didedikasikan untuk mengumpulkan, mengelola, dan membagikan 
              seluruh Proyek Perubahan yang dihasilkan oleh peserta program pelatihan kepemimpinan di Indonesia.
            </p>
            <p>
              Melalui Astina, ribuan Proyek Perubahan dari alumni <strong>PKN Tk I, PKN Tk II, PKA, dan PKP</strong> 
              dapat diakses dengan mudah, dipelajari, dan diadaptasi oleh instansi lain untuk menciptakan 
              dampak transformasi yang lebih luas di seluruh birokrasi Indonesia.
            </p>
            <div class="grid md:grid-cols-2 gap-6 mt-8 text-left">
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="font-bold text-blue-900 mb-3">🎯 Visi</h3>
                <p class="text-blue-700">
                  Menjadi hub utama transformasi birokrasi Indonesia melalui kolaborasi dan sharing best practice 
                  antar aparatur sipil negara.
                </p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="font-bold text-blue-900 mb-3">🚀 Misi</h3>
                <p class="text-blue-700">
                  Memfasilitasi replikasi dan adaptasi Proyek Perubahan terbaik untuk mempercepat 
                  inovasi dan peningkatan kinerja di seluruh instansi pemerintah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Section -->
    <div class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Statistik Proyek Perubahan</h2>
          <p class="text-lg opacity-70">
            Berbagai Proyek Perubahan yang dilakukan peserta pelatihan dari tahun 2020 hingga kini
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="program in summaryProgram" :key="program.programId" class="stat bg-base-100 rounded-lg shadow-lg">
            <div class="stat-title">{{ program.programNama }}</div>
            <div class="stat-value text-blue-600">{{ program.count.toLocaleString() }}</div>
            <div class="stat-desc">Jumlah proyek</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20 bg-blue-700 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4 text-white">Bergabunglah dengan Komunitas Inovator</h2>
        <p class="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
          Ribuan aparatur sipil negara telah menggunakan Astina sebagai hub untuk berkolaborasi, 
          berbagi best practice, dan mengakselerasi transformasi birokrasi. 
          <strong>Proyek Perubahan Anda bisa menginspirasi instansi lain!</strong>
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/daftar-proyek" class="btn btn-warning btn-lg text-blue-900">
            Jelajahi Proyek Perubahan
          </a>
          <a href="/upload-proyek" class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-700">
            Kontribusi Proyek Anda
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

// ...existing code...
<script setup>
import { ref, onMounted } from 'vue'

const summaryProgram = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/api/proper/summary_program')
    const data = await res.json()
    if (data.success && Array.isArray(data.summary)) {
      summaryProgram.value = data.summary
    }
  } catch (e) {
    summaryProgram.value = []
  }
})

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