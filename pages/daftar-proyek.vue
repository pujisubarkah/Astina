<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-blue-900 mb-2">Hub Produk Pembelajaran</h1>
            <p class="text-blue-700 mb-4">
              Pusat repositori digital untuk seluruh Produk Pembelajaran dari program pelatihan kepemimpinan nasional
            </p>
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p class="text-blue-800 text-sm">
                <strong>💡 Tentang Hub ini:</strong> Astina mengumpulkan ribuan Produk Pembelajaran dari peserta 
                <strong>PKN Tk I, PKN Tk II, PKA, dan PKP</strong> yang dapat Anda jelajahi, pelajari, 
                dan adaptasi untuk transformasi di instansi Anda.
              </p>
            </div>
          </div>
        <div class="flex gap-2">
          <button v-if="isLoggedIn" class="btn btn-outline" @click="showImportModal = true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Import Data
          </button>
    <!-- Modal Import CSV -->
    <Teleport to="body">
      <Transition name="fade">
  <div v-if="showImportModal && isLoggedIn" class="fixed inset-0 z-50 flex items-center justify-center">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showImportModal = false"></div>
          <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6 z-10 relative">
            <h2 class="text-xl font-bold mb-4">Import Data Proyek (CSV)</h2>
            <form @submit.prevent="handleImportCSV">
              <input type="file" accept=".csv" @change="onCSVChange" class="file-input file-input-bordered w-full mb-4" />
              <div v-if="importError" class="alert alert-error mb-2">{{ importError }}</div>
              <div v-if="importSuccess" class="alert alert-success mb-2">{{ importSuccess }}</div>
              <div class="flex gap-2 justify-end">
                <button type="button" class="btn" @click="showImportModal = false">Batal</button>
                <button type="submit" class="btn btn-primary" :disabled="importLoading">
                  <span v-if="importLoading" class="loading loading-spinner loading-sm"></span>
                  {{ importLoading ? 'Mengupload...' : 'Upload CSV' }}
                </button>
              </div>
            </form>
            <div class="mt-4 text-xs text-gray-500">
              <a href="/template-proyek.csv" download class="link link-primary">Download Template CSV</a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
          <a href="/upload-proyek" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Upload Proyek
          </a>
        </div>
        </div>
      </div>

      <!-- Info Hub Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mb-6">
        <div class="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 class="text-2xl font-bold mb-3">🌟 Mengapa Jelajahi Hub Ini?</h2>
            <ul class="space-y-2 text-blue-100">
              <li class="flex items-start gap-2">
                <span class="text-yellow-300 mt-1">✓</span>
                <span>Temukan inspirasi dari <strong>ribuan Produk Pembelajaran</strong> terbaik</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-yellow-300 mt-1">✓</span>
                <span>Pelajari <strong>best practice</strong> dari berbagai instansi</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-yellow-300 mt-1">✓</span>
                <span>Adaptasi solusi inovatif untuk <strong>transformasi birokrasi</strong></span>
              </li>
            </ul>
          </div>
          <div class="text-center">
            <div class="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-2">Program Yang Terhimpun</h3>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded px-3 py-2 font-medium shadow-sm">PKN Tk I</div>
                <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded px-3 py-2 font-medium shadow-sm">PKN Tk II</div>
                <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded px-3 py-2 font-medium shadow-sm">PKA</div>
                <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded px-3 py-2 font-medium shadow-sm">PKP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="card bg-white shadow-lg mb-6">
        <div class="card-body">
          <div class="grid grid-cols-12 gap-4 items-end">
            <!-- Search Field (3/6) -->
            <div class="col-span-5">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Pencarian</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Cari proyek, kata kunci, atau nama peserta..." 
                  class="input input-bordered w-full"
                  v-model="searchQuery"
                />
              </div>
            </div>
            
            <!-- Filter K/L (1/6) -->
            <div class="col-span-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">K/L</span>
                </label>
                <select class="select select-bordered w-full" v-model="selectedInstitution">
                  <option value="">Semua K/L</option>
                  <option 
                    v-for="institution in institutionOptions" 
                    :key="institution.instansiId" 
                    :value="institution.instansiId"
                  >
                    {{ institution.namaInstansi }}{{ institutionSummary[institution.instansiId] ? ` (${institutionSummary[institution.instansiId].total_proyek})` : '' }}
                  </option>
                </select>
              </div>
            </div>
            
            <!-- Filter Pelatihan (1/6) -->
            <div class="col-span-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Pelatihan</span>
                </label>
                <select class="select select-bordered w-full" v-model="selectedTraining">
                  <option value="">Semua Pelatihan</option>
                  <option 
                    v-for="training in trainingOptions" 
                    :key="training.id" 
                    :value="training.id"
                  >
                    {{ training.nama }}{{ trainingSummary[training.id] ? ` (${trainingSummary[training.id].total_proyek})` : '' }}
                  </option>
                </select>
              </div>
            </div>
            
            <!-- Sort (1/6) -->
            <div class="col-span-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Urutkan</span>
                </label>
                <select class="select select-bordered w-full" v-model="sortBy">
                  <option value="latest">Terbaru</option>
                  <option value="popular">Terpopuler</option>
                  <option value="title">Nama A-Z</option>
                  <option value="progress">Progress</option>
                </select>
              </div>
            </div>
            
            <!-- Search Button -->
            <div class="col-span-1">
              <button class="btn btn-primary w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="stat-title">Total Produk Pembelajaran</div>
          <div class="stat-value text-blue-600">{{ totalProjectCount.toLocaleString() }}</div>
          <div class="stat-desc text-sm text-gray-500">Jumlah seluruh produk yang tersimpan di hub</div>
        </div>

        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div class="stat-title">Ditampilkan</div>
          <div class="stat-value text-orange-600">{{ filteredProjectsCount.toLocaleString() }}</div>
          <div class="stat-desc text-sm text-gray-500">Produk yang sesuai filter dan saat ini terlihat</div>
        </div>

        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="stat-title">Kontributor</div>
          <div class="stat-value text-purple-600">{{ totalContributors }}</div>
          <div class="stat-desc text-sm text-gray-500">Jumlah kontributor Produk Pembelajaran</div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="loading loading-spinner loading-lg text-blue-600"></div>
        <span class="ml-2 text-gray-600">Memuat proyek...</span>
      </div>
      
      <div v-else-if="projects.length === 0" class="text-center py-12">
        <div class="text-gray-500 text-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Tidak ada proyek yang ditemukan
        </div>
        <p class="text-gray-400">Coba ubah filter atau kata kunci pencarian Anda</p>
      </div>
      
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div 
          v-for="project in paginatedProjects" 
          :key="project.id"
          class="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4"
          :class="getProjectBorderColor(project.status)"
        >
          <div class="card-body">
            <!-- Project Header -->
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="avatar placeholder">
                  <div class="text-white rounded-full w-8 h-8 flex items-center justify-center" :class="getAvatarColor(project.noIdentitas)">
                    <!-- Male Icon -->
                    <svg v-if="getAvatarIcon(project.noIdentitas) === 'male'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <!-- Female Icon -->
                    <svg v-else-if="getAvatarIcon(project.noIdentitas) === 'female'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <!-- Neutral/Default Icon -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-sm text-gray-600">{{ project.author }}</h3>
                  <p class="text-xs text-gray-500">{{ project.institution }}</p>
                </div>
              </div>
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01" />
                  </svg>
                </div>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                  <li><a><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> Star</a></li>
                  <li><a><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg> Share</a></li>
                </ul>
              </div>
            </div>

            <!-- Project Title -->
            <h2 class="card-title text-lg mb-2 line-clamp-2">
              <a href="#" class="hover:text-blue-600 transition-colors">
                {{ project.title }}
              </a>
            </h2>

            <!-- Description -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ project.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1 mb-4">
              <span 
                v-for="tag in project.tags.slice(0, 3)" 
                :key="tag"
                class="badge badge-outline badge-sm"
              >
                {{ tag }}
              </span>
              <span v-if="project.tags.length > 3" class="badge badge-ghost badge-sm">
                +{{ project.tags.length - 3 }}
              </span>
            </div>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs text-gray-600">Progress</span>
                <span class="text-xs font-semibold">{{ project.progress }}%</span>
              </div>
              <progress 
                class="progress w-full"
                :class="getProgressColor(project.progress)"
                :value="project.progress" 
                max="100"
              ></progress>
            </div>

            <!-- Project Stats -->
            <div class="flex items-center justify-between text-sm text-gray-600">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {{ project.stars }}
                </span>
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ project.views }}
                </span>
                <span class="flex items-center gap-1">
                  <div class="w-3 h-3 rounded-full" :class="getStatusColor(project.status)"></div>
                  {{ project.status }}
                </span>
              </div>
                <span class="text-xs">{{ formatDate(project.updatedAt) === 'NaN tahun lalu' ? '' : formatDate(project.updatedAt) }}</span>
            </div>

            <!-- Action Buttons -->
            <div class="card-actions justify-end mt-4">
              <button class="btn btn-outline btn-sm" @click="showDetail(project)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Lihat Detail
              </button>
              <button class="btn btn-primary btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-8" v-if="totalPages > 1">
        <div class="join">
          <button 
            class="join-item btn" 
            :class="{ 'btn-disabled': !pagination.hasPrevPage }"
            @click="prevPage"
          >
            «
          </button>
          <button 
            v-for="page in visiblePages" 
            :key="page"
            class="join-item btn"
            :class="{ 'btn-active': page === pagination.page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button 
            class="join-item btn"
            :class="{ 'btn-disabled': !pagination.hasNextPage }"
            @click="nextPage"
          >
            »
          </button>
        </div>
      </div>
      </div>
    </div>

    <!-- Project Detail Modal with Animation -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center">
          <!-- Animated Backdrop -->
          <div 
            class="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm"
            @click="showModal = false"
          ></div>
          
          <!-- Modal Content with Glass Effect -->
          <div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative z-[110] border border-white/20 overflow-hidden">
            <!-- Header with Gradient -->
            <div class="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-blue-600 to-blue-800">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-400/20 to-transparent"></div>
            </div>
            
            <!-- Close Button -->
            <button 
              class="absolute top-4 right-4 btn btn-circle btn-sm bg-white hover:bg-white/90 border-0 text-blue-600 z-10"
              @click="showModal = false"
            >
              ✕
            </button>

            <!-- Content Container -->
            <div class="relative">
              <!-- Title Section -->
              <div class="px-6 pt-8 pb-10">
                <div class="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="text-blue-100 text-sm font-medium tracking-wide">Produk Pembelajaran</p>
                </div>
                <h2 class="text-2xl font-bold text-white leading-normal">{{ selectedProject.title }}</h2>
              </div>
              
              <!-- Main Content Grid -->
              <div class="grid md:grid-cols-2 gap-6 bg-white/95 backdrop-blur-sm rounded-t-xl p-6 shadow-lg">
                <!-- Left Column - Basic Info -->
                <div class="space-y-4">
                  <div class="flex items-center space-x-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p class="text-sm text-gray-500">Nama</p>
                      <p class="font-medium">{{ selectedProject.author }}</p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <div>
                      <p class="text-sm text-gray-500">NIP</p>
                      <p class="font-medium">{{ selectedProject.nip }}</p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <p class="text-sm text-gray-500">Instansi</p>
                      <p class="font-medium">{{ selectedProject.institution }}</p>
                    </div>
                  </div>
                </div>

                <!-- Right Column - Additional Info -->
                <div class="space-y-4">
                  <div class="flex items-center space-x-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p class="text-sm text-gray-500">Nomor KRA</p>
                      <p class="font-medium">{{ selectedProject.nomorKra }}</p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <div>
                      <p class="text-sm text-gray-500">Program</p>
                      <p class="font-medium">{{ selectedProject.training }}</p>
                    </div>
                  </div>
                </div>

                <!-- Full Width Content -->
                <div class="md:col-span-2 space-y-4">
                  <!-- Abstract -->
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h3 class="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      Abstrak
                    </h3>
                    <p class="text-gray-700 leading-relaxed">{{ selectedProject.description }}</p>
                  </div>

                  <!-- Tags -->
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Kata Kunci
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="tag in selectedProject.tags" 
                        :key="tag" 
                        class="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600 border border-blue-100"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>

<script setup>
// Import CSV modal state
const showImportModal = ref(false)
const importLoading = ref(false)
const importError = ref('')
const importSuccess = ref('')
const importFile = ref(null)

function onCSVChange(e) {
  importFile.value = e.target.files[0]
  importError.value = ''
  importSuccess.value = ''
}

async function handleImportCSV() {
  importError.value = ''
  importSuccess.value = ''
  if (!importFile.value) {
    importError.value = 'Pilih file CSV terlebih dahulu.'
    return
  }
  importLoading.value = true
  try {
    const formData = new FormData()
    formData.append('file', importFile.value)
    const res = await fetch('/api/proyek_perubahan/import', {
      method: 'POST',
      body: formData,
      headers: {
        ...getAuthHeaders()
      }
    })
    const data = await res.json()
    if (data.success) {
      importSuccess.value = `Berhasil mengimport ${data.count} data proyek.`
      showImportModal.value = false
      // Refresh project list
      await fetchProjects()
    } else {
      importError.value = data.message || 'Gagal mengimport data.'
    }
  } catch (err) {
    importError.value = 'Terjadi kesalahan saat upload.'
  } finally {
    importLoading.value = false
  }
}
import { ref, computed, onMounted, watch } from 'vue'
import { useHead } from '#imports'
import { useAuth } from '@/composables/useAuth'
const { isLoggedIn, getAuthHeaders } = useAuth()

// Page metadata
useHead({
  title: 'Hub Produk Pembelajaran - Astina',
  meta: [
    { name: 'description', content: 'Hub terpusat untuk ribuan Produk Pembelajaran dari program pelatihan kepemimpinan PKN Tk I, PKN Tk II, PKA, dan PKP. Jelajahi, pelajari, dan adaptasi best practice transformasi birokrasi.' }
  ]
})

// Reactive data
const searchQuery = ref('')
const selectedTraining = ref('')
const selectedInstitution = ref('')
const sortBy = ref('latest')
const currentPage = ref(1)
const itemsPerPage = 9

// Options for filters
const trainingOptions = ref([])
const institutionOptions = ref([])
const trainingSummary = ref({})
const institutionSummary = ref({})

// Data and pagination state
const projects = ref([])
const loading = ref(false)
const pagination = ref({
  page: 1,
  limit: 9,
  total: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false
})

// Statistics
const stats = ref({
  filtered_total: 0,
  filtered_contributors: 0,
  global_total: 0,
  global_completed: 0,
  global_contributors: 0
})

// Modal state
const showModal = ref(false)
const selectedProject = ref({})

// Function to fetch projects with pagination
async function fetchProjects() {
  loading.value = true
  try {
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: itemsPerPage.toString(),
      sort_by: sortBy.value
    })

    if (searchQuery.value) {
      params.append('search', searchQuery.value)
    }
    if (selectedInstitution.value) {
      params.append('instansi_id', selectedInstitution.value)
    }
    if (selectedTraining.value) {
      params.append('pelatihan_id', selectedTraining.value)
    }

  const res = await fetch(`/api/proyek_perubahan/paginated?${params}`)
    const data = await res.json()
    
    if (data.success) {
      projects.value = data.data.map(item => ({
        id: item.id,
        title: item.proyekPerubahan,
        description: item.abstract,
        author: item.nama,
        institution: item.namaInstansi,
        instansiId: item.instansiId,
        training: item.programNama,
        programId: item.programId,
        nomorKra: item.nomorKra,
        nip: item.noIdentitas,
        noIdentitas: item.noIdentitas, // Keep the original field for gender detection
        progress: 100,
        status: 'completed',
        tags: Array.isArray(item.kataKunci) ? item.kataKunci : (typeof item.kataKunci === 'string' ? JSON.parse(item.kataKunci.replace(/'/g, '"')) : []),
        updatedAt: item.createdAt || '',
        createdAt: item.createdAt || '',
        stars: Math.floor(Math.random() * 50) + 1, // Random stars for demo
        views: Math.floor(Math.random() * 1000) + 1 // Random views for demo
      }))
      pagination.value = data.pagination
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
  } finally {
    loading.value = false
  }
}

// Function to fetch statistics
async function fetchStats() {
  try {
    const params = new URLSearchParams()

    if (searchQuery.value) {
      params.append('search', searchQuery.value)
    }
    if (selectedInstitution.value) {
      params.append('instansi_id', selectedInstitution.value)
    }
    if (selectedTraining.value) {
      params.append('pelatihan_id', selectedTraining.value)
    }

    const res = await fetch(`/api/proyek_perubahan/stats?${params}`)
    const data = await res.json()
    
    if (data.success) {
      stats.value = data.data
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

// Fetch filter options and summaries
async function fetchFilterOptions() {
  try {
    // Fetch training options and summary
    const [trainingRes, trainingSummaryRes] = await Promise.all([
      fetch('/api/pelatihan'),
      fetch('/api/proyek_perubahan/summary_pelatihan')
    ])
    
    const [trainingData, trainingSummaryData] = await Promise.all([
      trainingRes.json(),
      trainingSummaryRes.json()
    ])

    console.log('Training Data:', trainingData);
    console.log('Training Summary:', trainingSummaryData);

    if (trainingData.success && Array.isArray(trainingData.data)) {
      trainingOptions.value = trainingData.data
      console.log('Training Options set:', trainingOptions.value);
    }

    if (trainingSummaryData.success) {
      // Convert array to object for easier lookup
      trainingSummary.value = trainingSummaryData.data.reduce((acc, item) => {
        acc[item.pelatihan_id] = item
        return acc
      }, {})
      console.log('Training Summary processed:', trainingSummary.value);
    }

    // Fetch institution options and summary
    const [institutionRes, institutionSummaryRes] = await Promise.all([
      fetch('/api/instansi'),
      fetch('/api/proyek_perubahan/summary_instansi')
    ])
    
    const [institutionData, institutionSummaryData] = await Promise.all([
      institutionRes.json(),
      institutionSummaryRes.json()
    ])

    console.log('Institution Data:', institutionData);
    console.log('Institution Summary:', institutionSummaryData);

    if (institutionData.success && Array.isArray(institutionData.data)) {
      // Map the data to use consistent field names
      institutionOptions.value = institutionData.data.map(item => ({
        instansiId: item.instansi_id,
        namaInstansi: item.nama_instansi
      }))
      console.log('Institution Options set:', institutionOptions.value);
      console.log('First institution:', institutionOptions.value[0]);
    }

    if (institutionSummaryData.success) {
      // Convert array to object for easier lookup
      institutionSummary.value = institutionSummaryData.data.reduce((acc, item) => {
        acc[item.instansi_id] = item
        return acc
      }, {})
    }
  } catch (error) {
    console.error('Error fetching filter options:', error)
  }
}

// Function to fetch projects with filter (deprecated - now using fetchProjects)
async function fetchProjectsOld(instansiId = null, programId = null) {
  // This function is now deprecated, use fetchProjects() instead
  await fetchProjects()
}

function showDetail(project) {
  console.log('Opening modal for project:', project)
  selectedProject.value = { ...project }  // Create a copy to avoid reference issues
  showModal.value = true
  console.log('Modal state:', showModal.value)
}

onMounted(async () => {
  // Fetch filter options first
  await fetchFilterOptions()
  
  // Fetch initial data
  await fetchStats()
  await fetchProjects()
})

// Computed properties for pagination and display
const paginatedProjects = computed(() => {
  // Server-side pagination, so we just return the projects as-is
  return projects.value
})

const totalPages = computed(() => {
  return pagination.value.totalPages || 1
})

const visiblePages = computed(() => {
  const pages = []
  const current = pagination.value.page
  const total = totalPages.value
  const start = Math.max(1, current - 2)
  const end = Math.min(total, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Computed properties for statistics
const totalProjectCount = computed(() => stats.value.global_total)
const completedProjects = computed(() => stats.value.global_completed)
const totalContributors = computed(() => stats.value.filtered_contributors)
const filteredProjectsCount = computed(() => stats.value.filtered_total)

// Utility functions
const getProjectBorderColor = (status) => {
  switch (status) {
    case 'completed': return 'border-green-500'
    case 'ongoing': return 'border-blue-500'
    default: return 'border-gray-300'
  }
}

const getAvatarColor = (noIdentitas) => {
  // Check if noIdentitas has 18 characters
  if (!noIdentitas || noIdentitas.length !== 18) {
    return 'bg-gray-500' // Gender neutral for invalid/incomplete NIK
  }
  
  // Get the 15th digit (index 14)
  const genderDigit = noIdentitas.charAt(14)
  
  if (genderDigit === '1') {
    return 'bg-blue-500' // Male (laki-laki)
  } else if (genderDigit === '2') {
    return 'bg-pink-500' // Female (perempuan)
  } else {
    return 'bg-gray-500' // Gender neutral for other cases
  }
}

const getAvatarIcon = (noIdentitas) => {
  // Check if noIdentitas has 18 characters
  if (!noIdentitas || noIdentitas.length !== 18) {
    return 'neutral' // Gender neutral for invalid/incomplete NIK
  }
  
  // Get the 15th digit (index 14)
  const genderDigit = noIdentitas.charAt(14)
  
  if (genderDigit === '1') {
    return 'male' // Male (laki-laki)
  } else if (genderDigit === '2') {
    return 'female' // Female (perempuan)
  } else {
    return 'neutral' // Gender neutral for other cases
  }
}

const getProgressColor = (progress) => {
  if (progress >= 90) return 'progress-success'
  if (progress >= 70) return 'progress-info'
  if (progress >= 50) return 'progress-warning'
  return 'progress-error'
}

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-500'
    case 'ongoing': return 'bg-blue-500'
    default: return 'bg-gray-400'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Kemarin'
  if (diffDays < 7) return `${diffDays} hari lalu`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan lalu`
  return `${Math.floor(diffDays / 365)} tahun lalu`
}

// Watch for filter changes and pagination
watch([searchQuery, selectedTraining, selectedInstitution, sortBy], 
  async () => {
    // Reset to first page when filters change
    currentPage.value = 1
    pagination.value.page = 1
    
    // Fetch new data
    await fetchStats()
    await fetchProjects()
  }
)

// Watch for page changes
watch(currentPage, async (newPage) => {
  pagination.value.page = newPage
  await fetchProjects()
})

// Function to handle pagination button clicks
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function nextPage() {
  if (pagination.value.hasNextPage) {
    currentPage.value += 1
  }
}

function prevPage() {
  if (pagination.value.hasPrevPage) {
    currentPage.value -= 1
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}
</style>