<template>
  <div>
    <!-- Hero Section -->
    <div class="hero min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      <!-- Background Silhouettes -->
      <div class="absolute inset-0 opacity-10">
        <!-- Government Buildings Silhouette -->
        <svg viewBox="0 0 1200 400" class="absolute bottom-0 left-0 w-full h-auto">
          <!-- Main Government Building -->
          <rect x="200" y="200" width="120" height="200" fill="currentColor"/>
          <polygon points="200,200 260,150 320,200" fill="currentColor"/>
          <rect x="240" y="250" width="15" height="25" fill="white" opacity="0.3"/>
          <rect x="265" y="250" width="15" height="25" fill="white" opacity="0.3"/>
          <rect x="240" y="300" width="15" height="25" fill="white" opacity="0.3"/>
          <rect x="265" y="300" width="15" height="25" fill="white" opacity="0.3"/>
          
          <!-- Office Buildings -->
          <rect x="350" y="180" width="80" height="220" fill="currentColor"/>
          <rect x="360" y="200" width="10" height="15" fill="white" opacity="0.2"/>
          <rect x="380" y="200" width="10" height="15" fill="white" opacity="0.2"/>
          <rect x="400" y="200" width="10" height="15" fill="white" opacity="0.2"/>
          <rect x="360" y="240" width="10" height="15" fill="white" opacity="0.2"/>
          <rect x="380" y="240" width="10" height="15" fill="white" opacity="0.2"/>
          <rect x="400" y="240" width="10" height="15" fill="white" opacity="0.2"/>
          
          <rect x="460" y="220" width="90" height="180" fill="currentColor"/>
          <rect x="470" y="240" width="12" height="18" fill="white" opacity="0.2"/>
          <rect x="490" y="240" width="12" height="18" fill="white" opacity="0.2"/>
          <rect x="510" y="240" width="12" height="18" fill="white" opacity="0.2"/>
          <rect x="530" y="240" width="12" height="18" fill="white" opacity="0.2"/>

          <!-- People Silhouettes - Walking -->
          <!-- Person 1 - Walking right -->
          <g transform="translate(100, 370)">
            <circle cx="0" cy="-25" r="8" fill="white" opacity="0.4"/>
            <rect x="-6" y="-17" width="12" height="20" rx="2" fill="white" opacity="0.4"/>
            <rect x="-4" y="3" width="3" height="15" fill="white" opacity="0.4"/>
            <rect x="1" y="3" width="3" height="15" fill="white" opacity="0.4"/>
            <rect x="-8" y="-10" width="6" height="2" fill="white" opacity="0.4"/>
            <rect x="2" y="-8" width="6" height="2" fill="white" opacity="0.4"/>
          </g>

          <!-- Person 2 - Standing with briefcase -->
          <g transform="translate(150, 375)">
            <circle cx="0" cy="-20" r="6" fill="white" opacity="0.4"/>
            <rect x="-5" y="-14" width="10" height="16" rx="2" fill="white" opacity="0.4"/>
            <rect x="-3" y="2" width="2.5" height="12" fill="white" opacity="0.4"/>
            <rect x="0.5" y="2" width="2.5" height="12" fill="white" opacity="0.4"/>
            <rect x="-7" y="-8" width="5" height="2" fill="white" opacity="0.4"/>
            <rect x="8" y="-6" width="4" height="6" rx="1" fill="white" opacity="0.4"/>
          </g>

          <!-- Person 3 - Walking left -->
          <g transform="translate(580, 372)">
            <circle cx="0" cy="-28" r="7" fill="white" opacity="0.4"/>
            <rect x="-5" y="-21" width="10" height="18" rx="2" fill="white" opacity="0.4"/>
            <rect x="-3" y="-3" width="2.5" height="16" fill="white" opacity="0.4"/>
            <rect x="0.5" y="-3" width="2.5" height="16" fill="white" opacity="0.4"/>
            <rect x="2" y="-12" width="5" height="2" fill="white" opacity="0.4"/>
            <rect x="-7" y="-10" width="5" height="2" fill="white" opacity="0.4"/>
          </g>

          <!-- Person 4 - Group discussion -->
          <g transform="translate(640, 375)">
            <circle cx="0" cy="-20" r="6" fill="white" opacity="0.4"/>
            <rect x="-4" y="-14" width="8" height="16" rx="2" fill="white" opacity="0.4"/>
            <rect x="-2" y="2" width="2" height="12" fill="white" opacity="0.4"/>
            <rect x="0" y="2" width="2" height="12" fill="white" opacity="0.4"/>
            <rect x="-6" y="-8" width="4" height="2" fill="white" opacity="0.4"/>
            <rect x="2" y="-6" width="4" height="2" fill="white" opacity="0.4"/>
          </g>

          <!-- Person 5 - Another person in discussion -->
          <g transform="translate(665, 373)">
            <circle cx="0" cy="-22" r="6" fill="white" opacity="0.4"/>
            <rect x="-4" y="-16" width="8" height="18" rx="2" fill="white" opacity="0.4"/>
            <rect x="-2" y="2" width="2" height="12" fill="white" opacity="0.4"/>
            <rect x="0" y="2" width="2" height="12" fill="white" opacity="0.4"/>
            <rect x="2" y="-10" width="4" height="2" fill="white" opacity="0.4"/>
            <rect x="-6" y="-8" width="4" height="2" fill="white" opacity="0.4"/>
          </g>

          <!-- Person 6 - Running/walking fast -->
          <g transform="translate(750, 370)">
            <circle cx="0" cy="-26" r="7" fill="white" opacity="0.4"/>
            <rect x="-5" y="-19" width="10" height="17" rx="2" fill="white" opacity="0.4"/>
            <rect x="-3" y="-2" width="2.5" height="14" fill="white" opacity="0.4"/>
            <rect x="1" y="-2" width="2.5" height="14" fill="white" opacity="0.4"/>
            <rect x="-8" y="-12" width="6" height="2" fill="white" opacity="0.4"/>
            <rect x="3" y="-8" width="6" height="2" fill="white" opacity="0.4"/>
          </g>

          <!-- Person 7 - Small person (child/distant) -->
          <g transform="translate(850, 378)">
            <circle cx="0" cy="-17" r="5" fill="white" opacity="0.3"/>
            <rect x="-3" y="-12" width="6" height="12" rx="1" fill="white" opacity="0.3"/>
            <rect x="-2" y="0" width="1.5" height="8" fill="white" opacity="0.3"/>
            <rect x="0.5" y="0" width="1.5" height="8" fill="white" opacity="0.3"/>
            <rect x="-4" y="-7" width="3" height="1.5" fill="white" opacity="0.3"/>
            <rect x="1" y="-6" width="3" height="1.5" fill="white" opacity="0.3"/>
          </g>

          <!-- Person 8 - Walking towards building -->
          <g transform="translate(180, 374)">
            <circle cx="0" cy="-23" r="6" fill="white" opacity="0.4"/>
            <rect x="-4" y="-17" width="8" height="15" rx="2" fill="white" opacity="0.4"/>
            <rect x="-2" y="-2" width="2" height="13" fill="white" opacity="0.4"/>
            <rect x="0" y="-2" width="2" height="13" fill="white" opacity="0.4"/>
            <rect x="-6" y="-11" width="4" height="2" fill="white" opacity="0.4"/>
            <rect x="2" y="-9" width="4" height="2" fill="white" opacity="0.4"/>
          </g>

          <!-- Person 9 - Person with bag -->
          <g transform="translate(900, 376)">
            <circle cx="0" cy="-19" r="5" fill="white" opacity="0.4"/>
            <rect x="-4" y="-14" width="8" height="14" rx="2" fill="white" opacity="0.4"/>
            <rect x="-2" y="0" width="2" height="10" fill="white" opacity="0.4"/>
            <rect x="0" y="0" width="2" height="10" fill="white" opacity="0.4"/>
            <rect x="-6" y="-8" width="4" height="2" fill="white" opacity="0.4"/>
            <circle cx="7" cy="-5" r="3" fill="white" opacity="0.4"/>
          </g>

          <!-- Person 10 - Distant figure -->
          <g transform="translate(1050, 380)">
            <circle cx="0" cy="-15" r="4" fill="white" opacity="0.3"/>
            <rect x="-3" y="-11" width="6" height="10" rx="1" fill="white" opacity="0.3"/>
            <rect x="-1.5" y="-1" width="1.5" height="7" fill="white" opacity="0.3"/>
            <rect x="0" y="-1" width="1.5" height="7" fill="white" opacity="0.3"/>
            <rect x="-4" y="-6" width="3" height="1" fill="white" opacity="0.3"/>
            <rect x="1" y="-5" width="3" height="1" fill="white" opacity="0.3"/>
          </g>
          
          <!-- Network Connection Lines -->
          <line x1="260" y1="300" x2="390" y2="290" stroke="white" stroke-width="2" opacity="0.3" stroke-dasharray="5,5"/>
          <line x1="390" y1="300" x2="505" y2="310" stroke="white" stroke-width="2" opacity="0.3" stroke-dasharray="5,5"/>
          
          <!-- Data/Document Icons floating -->
          <circle cx="150" cy="150" r="8" fill="white" opacity="0.2"/>
          <rect x="145" y="145" width="10" height="10" fill="currentColor"/>
          
          <circle cx="600" cy="120" r="10" fill="white" opacity="0.2"/>
          <rect x="594" y="114" width="12" height="12" fill="currentColor"/>
          
          <!-- Innovation Symbols -->
          <polygon points="700,100 720,80 740,100 720,120" fill="white" opacity="0.15"/>
          <circle cx="720" cy="100" r="5" fill="currentColor"/>
        </svg>

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 animate-bounce" style="animation-delay: 0s; animation-duration: 3s;">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" class="text-white opacity-20">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="absolute top-32 right-20 animate-bounce" style="animation-delay: 1s; animation-duration: 4s;">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" class="text-white opacity-20">
            <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="absolute bottom-32 left-20 animate-bounce" style="animation-delay: 2s; animation-duration: 5s;">
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" class="text-white opacity-20">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M19.4 15A1.65 1.65 0 0 0 21 13.35A1.65 1.65 0 0 0 19.4 11.65A1.65 1.65 0 0 0 17.75 13A1.65 1.65 0 0 0 19.4 15Z" stroke="currentColor" stroke-width="2"/>
            <path d="M4.6 15A1.65 1.65 0 0 0 6.25 13.35A1.65 1.65 0 0 0 4.6 11.65A1.65 1.65 0 0 0 2.95 13A1.65 1.65 0 0 0 4.6 15Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>

        <div class="absolute top-40 right-40 animate-pulse" style="animation-duration: 2s;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" class="text-yellow-300 opacity-30">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" stroke-width="2" fill="currentColor"/>
          </svg>
        </div>

        <div class="absolute bottom-20 right-32 animate-pulse" style="animation-duration: 3s; animation-delay: 1s;">
          <svg width="35" height="35" viewBox="0 0 24 24" fill="none" class="text-yellow-300 opacity-25">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
          </svg>
        </div>
      </div>

      <div class="hero-content text-center text-white relative z-10">
        <div class="max-w-4xl">
          <h1 class="text-6xl font-bold mb-6">
            Selamat Datang di 
            <span class="text-yellow-300">Astina</span>
          </h1>
          <p class="text-xl mb-8 opacity-90">
            Hub Produk Pembelajaran Program Pelatihan Kepemimpinan Nasional
          </p>
          <p class="text-lg mb-10 max-w-2xl mx-auto opacity-80">
            Astina adalah platform terpusat yang menghimpun seluruh Produk Pembelajaran dari peserta 
            <strong class="text-yellow-300">PKN Tk I, PKN Tk II, PKA, dan PKP</strong>. 
            Menjadi jembatan kolaborasi lintas instansi untuk berbagi best practice, 
            pembelajaran, dan inovasi transformasi birokrasi di seluruh Indonesia.
          </p>
          <!-- Primary hero CTAs removed as requested -->
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-base-100">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Mengapa Astina?</h2>
          <p class="text-lg opacity-70 max-w-3xl mx-auto">
            Sebagai <strong>Hub Produk Pembelajaran</strong> terbesar di Indonesia, Astina mengintegrasikan 
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
                Pusat penyimpanan digital untuk semua Produk Pembelajaran dari PKN Tk I, PKN Tk II, PKA, dan PKP yang terorganisir dengan baik.
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
                Rekam jejak setiap tahapan produk pembelajaran dengan detail kronologi dan milestone yang jelas untuk akuntabilitas
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
                Platform pembelajaran terpusat untuk mengakses panduan, studi kasus, dan dokumentasi lengkap dari setiap Produk Pembelajaran.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <!-- Background Illustration -->
      <div class="absolute inset-0 opacity-5">
        <svg viewBox="0 0 1200 600" class="absolute inset-0 w-full h-full">
          <!-- Digital Network Nodes -->
          <circle cx="200" cy="150" r="20" fill="currentColor"/>
          <circle cx="400" cy="200" r="25" fill="currentColor"/>
          <circle cx="600" cy="100" r="18" fill="currentColor"/>
          <circle cx="800" cy="180" r="22" fill="currentColor"/>
          <circle cx="1000" cy="120" r="20" fill="currentColor"/>
          
          <!-- Connecting Lines -->
          <line x1="220" y1="150" x2="375" y2="200" stroke="currentColor" stroke-width="3" opacity="0.3"/>
          <line x1="425" y1="200" x2="580" y2="100" stroke="currentColor" stroke-width="3" opacity="0.3"/>
          <line x1="620" y1="100" x2="780" y2="180" stroke="currentColor" stroke-width="3" opacity="0.3"/>
          <line x1="822" y1="180" x2="980" y2="120" stroke="currentColor" stroke-width="3" opacity="0.3"/>

          <!-- People around network nodes -->
          <!-- Person at Node 1 -->
          <g transform="translate(185, 190)">
            <circle cx="0" cy="-20" r="6" fill="currentColor"/>
            <rect x="-4" y="-14" width="8" height="14" rx="2" fill="currentColor"/>
            <rect x="-2" y="0" width="2" height="10" fill="currentColor"/>
            <rect x="0" y="0" width="2" height="10" fill="currentColor"/>
            <rect x="-5" y="-8" width="4" height="2" fill="currentColor"/>
            <rect x="1" y="-6" width="4" height="2" fill="currentColor"/>
          </g>

          <!-- Person at Node 2 -->
          <g transform="translate(420, 240)">
            <circle cx="0" cy="-18" r="5" fill="currentColor"/>
            <rect x="-3" y="-13" width="6" height="12" rx="1" fill="currentColor"/>
            <rect x="-1.5" y="-1" width="1.5" height="8" fill="currentColor"/>
            <rect x="0" y="-1" width="1.5" height="8" fill="currentColor"/>
            <rect x="-4" y="-7" width="3" height="1.5" fill="currentColor"/>
            <rect x="1" y="-6" width="3" height="1.5" fill="currentColor"/>
          </g>

          <!-- Collaboration group at Node 3 -->
          <g transform="translate(580, 140)">
            <circle cx="0" cy="-20" r="5" fill="currentColor"/>
            <rect x="-3" y="-15" width="6" height="12" rx="1" fill="currentColor"/>
            <rect x="-1.5" y="-3" width="1.5" height="8" fill="currentColor"/>
            <rect x="0" y="-3" width="1.5" height="8" fill="currentColor"/>
            <rect x="-4" y="-9" width="3" height="1.5" fill="currentColor"/>
            <rect x="1" y="-7" width="3" height="1.5" fill="currentColor"/>
          </g>

          <g transform="translate(605, 145)">
            <circle cx="0" cy="-18" r="4" fill="currentColor"/>
            <rect x="-3" y="-14" width="6" height="10" rx="1" fill="currentColor"/>
            <rect x="-1.5" y="-4" width="1.5" height="7" fill="currentColor"/>
            <rect x="0" y="-4" width="1.5" height="7" fill="currentColor"/>
            <rect x="-4" y="-8" width="3" height="1" fill="currentColor"/>
            <rect x="1" y="-7" width="3" height="1" fill="currentColor"/>
          </g>

          <!-- Team at Node 4 -->
          <g transform="translate(790, 220)">
            <circle cx="0" cy="-22" r="6" fill="currentColor"/>
            <rect x="-4" y="-16" width="8" height="14" rx="2" fill="currentColor"/>
            <rect x="-2" y="-2" width="2" height="10" fill="currentColor"/>
            <rect x="0" y="-2" width="2" height="10" fill="currentColor"/>
            <rect x="-5" y="-10" width="4" height="2" fill="currentColor"/>
            <rect x="1" y="-8" width="4" height="2" fill="currentColor"/>
          </g>

          <g transform="translate(815, 225)">
            <circle cx="0" cy="-20" r="5" fill="currentColor"/>
            <rect x="-3" y="-15" width="6" height="12" rx="1" fill="currentColor"/>
            <rect x="-1.5" y="-3" width="1.5" height="8" fill="currentColor"/>
            <rect x="0" y="-3" width="1.5" height="8" fill="currentColor"/>
            <rect x="-4" y="-9" width="3" height="1.5" fill="currentColor"/>
            <rect x="1" y="-7" width="3" height="1.5" fill="currentColor"/>
          </g>

          <!-- Person at Node 5 -->
          <g transform="translate(985, 160)">
            <circle cx="0" cy="-20" r="5" fill="currentColor"/>
            <rect x="-3" y="-15" width="6" height="12" rx="1" fill="currentColor"/>
            <rect x="-1.5" y="-3" width="1.5" height="8" fill="currentColor"/>
            <rect x="0" y="-3" width="1.5" height="8" fill="currentColor"/>
            <rect x="-4" y="-9" width="3" height="1.5" fill="currentColor"/>
            <rect x="1" y="-7" width="3" height="1.5" fill="currentColor"/>
          </g>

          <!-- People working with documents -->
          <g transform="translate(170, 450)">
            <circle cx="0" cy="-18" r="5" fill="currentColor"/>
            <rect x="-3" y="-13" width="6" height="11" rx="1" fill="currentColor"/>
            <rect x="-1.5" y="-2" width="1.5" height="7" fill="currentColor"/>
            <rect x="0" y="-2" width="1.5" height="7" fill="currentColor"/>
            <rect x="-4" y="-7" width="3" height="1.5" fill="currentColor"/>
            <rect x="1" y="-6" width="3" height="1.5" fill="currentColor"/>
          </g>

          <g transform="translate(270, 430)">
            <circle cx="0" cy="-20" r="5" fill="currentColor"/>
            <rect x="-3" y="-15" width="6" height="12" rx="1" fill="currentColor"/>
            <rect x="-1.5" y="-3" width="1.5" height="8" fill="currentColor"/>
            <rect x="0" y="-3" width="1.5" height="8" fill="currentColor"/>
            <rect x="-4" y="-9" width="3" height="1.5" fill="currentColor"/>
            <rect x="1" y="-7" width="3" height="1.5" fill="currentColor"/>
          </g>

          <g transform="translate(370, 470)">
            <circle cx="0" cy="-16" r="4" fill="currentColor"/>
            <rect x="-3" y="-12" width="6" height="9" rx="1" fill="currentColor"/>
            <rect x="-1.5" y="-3" width="1.5" height="6" fill="currentColor"/>
            <rect x="0" y="-3" width="1.5" height="6" fill="currentColor"/>
            <rect x="-4" y="-7" width="3" height="1" fill="currentColor"/>
            <rect x="1" y="-6" width="3" height="1" fill="currentColor"/>
          </g>

          <g transform="translate(470, 450)">
            <circle cx="0" cy="-18" r="5" fill="currentColor"/>
            <rect x="-3" y="-13" width="6" height="11" rx="1" fill="currentColor"/>
            <rect x="-1.5" y="-2" width="1.5" height="7" fill="currentColor"/>
            <rect x="0" y="-2" width="1.5" height="7" fill="currentColor"/>
            <rect x="-4" y="-7" width="3" height="1.5" fill="currentColor"/>
            <rect x="1" y="-6" width="3" height="1.5" fill="currentColor"/>
          </g>
          
          <!-- Document Flow -->
          <rect x="190" y="400" width="40" height="50" rx="5" fill="currentColor"/>
          <rect x="290" y="380" width="40" height="50" rx="5" fill="currentColor"/>
          <rect x="390" y="420" width="40" height="50" rx="5" fill="currentColor"/>
          <rect x="490" y="400" width="40" height="50" rx="5" fill="currentColor"/>
          
          <!-- Flow Arrows -->
          <polygon points="260,425 280,415 280,435" fill="currentColor"/>
          <polygon points="360,405 380,395 380,415" fill="currentColor"/>
          <polygon points="460,445 480,435 480,455" fill="currentColor"/>
          
          <!-- Innovation Symbols -->
          <path d="M150 300 L170 280 L190 300 L170 320 Z" fill="currentColor" opacity="0.4"/>
          <circle cx="170" cy="300" r="8" fill="white"/>
          
          <path d="M950 350 L970 330 L990 350 L970 370 Z" fill="currentColor" opacity="0.4"/>
          <circle cx="970" cy="350" r="8" fill="white"/>
        </svg>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold text-blue-900 mb-6">Apa itu Astina?</h2>
          <div class="text-lg text-blue-800 leading-relaxed space-y-4">
            <p>
              <strong class="text-blue-900">Astina (Aplikasi Sentral Transformasi Inovasi dan Nilai Aparatur)</strong> 
              adalah platform digital yang didedikasikan untuk mengumpulkan, mengelola, dan membagikan 
              seluruh Produk Pembelajaran yang dihasilkan oleh peserta program pelatihan kepemimpinan di Indonesia.
            </p>
            <p>
              Melalui Astina, ribuan Produk Pembelajaran dari alumni <strong>PKN Tk I, PKN Tk II, PKA, dan PKP</strong> 
              dapat diakses dengan mudah, dipelajari, dan diadaptasi oleh instansi lain untuk menciptakan 
              dampak transformasi yang lebih luas di seluruh birokrasi Indonesia.
            </p>
            <div class="grid md:grid-cols-2 gap-6 mt-8 text-left">
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="font-bold text-blue-900 mb-3">📚 Yang Tersedia</h3>
                <p class="text-blue-700">
                  Akses mudah ke ribuan Produk Pembelajaran yang telah terbukti berhasil, lengkap dengan 
                  dokumentasi, pembelajaran, dan panduan implementasi untuk diadaptasi di instansi Anda.
                </p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="font-bold text-blue-900 mb-3">🤝 Kolaborasi Lintas Instansi</h3>
                <p class="text-blue-700">
                  Platform berbagi pengalaman dan best practice antar alumni PKN untuk mempercepat 
                  replikasi inovasi dan menghindari duplikasi effort dalam transformasi birokrasi.
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
          <h2 class="text-4xl font-bold mb-4">Statistik Produk Pembelajaran</h2>
          <p class="text-lg opacity-70">
            Berbagai Produk Pembelajaran yang dilakukan peserta pelatihan dari tahun 2020 hingga kini
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="program in summaryProgram" :key="program.programId" class="stat bg-base-100 rounded-lg shadow-lg">
            <div class="stat-title">{{ program.programNama }}</div>
            <div class="stat-value text-blue-600">{{ program.count.toLocaleString() }}</div>
            <div class="stat-desc">Jumlah produk</div>
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
          <strong>Produk Pembelajaran Anda bisa menginspirasi instansi lain!</strong>
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/daftar-proyek" class="btn btn-warning btn-lg text-blue-900">
            Jelajahi Produk Pembelajaran
          </a>
          <a href="/upload-proyek" class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-700">
            Kontribusi Produk Anda
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
  title: 'ASTINA - Hub Produk Pembelajaran Pelatihan Kepemimpinan',
  meta: [
    { name: 'description', content: 'Platform Repositori Produk Pembelajaran Pelatihan Kepemimpinan Nasional. Kelola repositori produk, tracking pembelajaran, dan kolaborasi tim dengan mudah.' }
  ]
})
</script>

<style scoped>
/* Additional page-specific styles can be added here if needed */
</style>