<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-blue-900 mb-2">Daftar Proyek Perubahan</h1>
            <p class="text-blue-700">Repository laporan proyek perubahan dari peserta pelatihan</p>
          </div>
        <div class="flex gap-2">
          <button class="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Import Data
          </button>
          <a href="/upload-proyek" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Upload Proyek
          </a>
        </div>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="card bg-white shadow-lg mb-6">
        <div class="card-body">
          <div class="flex flex-col lg:flex-row gap-4">
            <!-- Search -->
            <div class="flex-1">
              <div class="form-control">
                <div class="input-group">
                  <input 
                    type="text" 
                    placeholder="Cari proyek, kata kunci, atau nama peserta..." 
                    class="input input-bordered w-full"
                    v-model="searchQuery"
                  />
                  <button class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Filters -->
            <div class="flex gap-2">
              <select class="select select-bordered min-w-[200px]" v-model="selectedTraining">
                <option value="">Semua Pelatihan</option>
                <option 
                  v-for="training in trainingOptions" 
                  :key="training.id" 
                  :value="training.id"
                >
                  {{ training.nama }}{{ trainingSummary[training.id] ? ` (${trainingSummary[training.id].total_proyek})` : '' }}
                </option>
              </select>
              
              <select class="select select-bordered min-w-[200px]" v-model="selectedInstitution">
                <option value="">Semua K/L</option>
                <option 
                  v-for="institution in institutionOptions" 
                  :key="institution.instansiId" 
                  :value="institution.instansiId"
                >
                  {{ institution.namaInstansi }}{{ institutionSummary[institution.instansiId] ? ` (${institutionSummary[institution.instansiId].total_proyek})` : '' }}
                </option>
              </select>
              
              <select class="select select-bordered" v-model="sortBy">
                <option value="latest">Terbaru</option>
                <option value="popular">Terpopuler</option>
                <option value="title">Nama A-Z</option>
                <option value="progress">Progress</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Summary -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="stat-title">Total Proyek</div>
          <div class="stat-value text-blue-600">{{ filteredProjects.length }}</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-title">Selesai</div>
          <div class="stat-value text-green-600">{{ completedProjects }}</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-title">Sedang Berjalan</div>
          <div class="stat-value text-orange-600">{{ ongoingProjects }}</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow">
          <div class="stat-figure text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="stat-title">Kontributor</div>
          <div class="stat-value text-purple-600">{{ totalContributors }}</div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  <div class="bg-blue-500 text-white rounded-full w-8">
                    <span class="text-xs">{{ project.author.substring(0, 2).toUpperCase() }}</span>
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
            :class="{ 'btn-disabled': currentPage === 1 }"
            @click="currentPage = Math.max(1, currentPage - 1)"
          >
            «
          </button>
          <button 
            v-for="page in visiblePages" 
            :key="page"
            class="join-item btn"
            :class="{ 'btn-active': page === currentPage }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button 
            class="join-item btn"
            :class="{ 'btn-disabled': currentPage === totalPages }"
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
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
                  <p class="text-blue-100 text-sm font-medium tracking-wide">Proyek Perubahan</p>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useHead } from '#imports'

// Page metadata
useHead({
  title: 'Daftar Proyek Perubahan - Astina',
  meta: [
    { name: 'description', content: 'Repository laporan proyek perubahan dari peserta pelatihan' }
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

// Modal state
const showModal = ref(false)
const selectedProject = ref({})

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
      institutionOptions.value = institutionData.data
      console.log('Institution Options set:', institutionOptions.value);
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

// Function to fetch projects
async function fetchProjects(instansiId = null, programId = null) {
  try {
    let url = '/api/proyek_perubahan'
    
    if (instansiId) {
      url = `/api/proyek_perubahan/instansi/${instansiId}`
    } else if (programId) {
      url = `/api/proyek_perubahan/pelatihan/${programId}`
    }
      
    console.log('Fetching projects from:', url)
    const res = await fetch(url)
    const data = await res.json()
    
    if (data.success && Array.isArray(data.data)) {
      console.log('Raw project data:', data.data[0])
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
        progress: 100,
        status: 'completed',
        tags: Array.isArray(item.kataKunci) ? item.kataKunci : (typeof item.kataKunci === 'string' ? JSON.parse(item.kataKunci.replace(/'/g, '"')) : []),
        updatedAt: item.createdAt || '',
        createdAt: item.createdAt || ''
      }))
    }
    console.log('Institution Summary processed:', institutionSummary.value);
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}

function showDetail(project) {
  console.log('Opening modal for project:', project)
  selectedProject.value = { ...project }  // Create a copy to avoid reference issues
  showModal.value = true
  console.log('Modal state:', showModal.value)
}

const projects = ref([])

onMounted(async () => {
  // Fetch filter options first
  await fetchFilterOptions()
  
  try {
    const res = await fetch('/api/proyek_perubahan')
    const data = await res.json()
    if (data.success && Array.isArray(data.data)) {
      console.log('Raw project data:', data.data[0]); // Debug: lihat struktur data asli
      projects.value = data.data.map(item => {
        console.log('Processing item:', item);
        return {
          id: item.id,
          title: item.proyekPerubahan,
          description: item.abstract,
          author: item.nama,
          institution: item.namaInstansi,
          instansiId: item.idInstansi,
          training: item.nama_program, // Sesuaikan dengan nama field yang benar
          programId: item.pelatihan_id, // Sesuaikan dengan nama field yang benar dari API
          nomorKra: item.nomorKra,
          nip: item.noIdentitas,
          progress: 100,
          status: 'completed',
          tags: Array.isArray(item.kataKunci) ? item.kataKunci : (typeof item.kataKunci === 'string' ? JSON.parse(item.kataKunci.replace(/'/g, '"')) : []),
          updatedAt: item.createdAt || '',
          createdAt: item.createdAt || ''
        }
      })
    }
  } catch (e) {
    console.error('Error fetching projects:', e)
    projects.value = []
  }
})

// Computed properties
const filteredProjects = computed(() => {
  let filtered = projects.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.author.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Training filter
  if (selectedTraining.value) {
    console.log('Filtering by training:', selectedTraining.value)
    filtered = filtered.filter(project => {
      console.log('Project programId:', project.programId, 'Selected:', selectedTraining.value)
      return String(project.programId) === String(selectedTraining.value)
    })
  }

  // Institution filter
  if (selectedInstitution.value) {
    console.log('Filtering by institution:', selectedInstitution.value)
    filtered = filtered.filter(project => {
      console.log('Project instansiId:', project.instansiId, 'Selected:', selectedInstitution.value)
      return String(project.instansiId) === String(selectedInstitution.value)
    })
  }

  console.log('Filtered results:', filtered.length)

  // Sort
  switch (sortBy.value) {
    case 'popular':
      filtered.sort((a, b) => b.stars - a.stars)
      break
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'progress':
      filtered.sort((a, b) => b.progress - a.progress)
      break
    default: // latest
      filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }

  return filtered
})

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProjects.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const completedProjects = computed(() => {
  return filteredProjects.value.filter(p => p.status === 'completed').length
})

const ongoingProjects = computed(() => {
  return filteredProjects.value.filter(p => p.status === 'ongoing').length
})

const totalContributors = computed(() => {
  return new Set(filteredProjects.value.map(p => p.author)).size
})

// Utility functions
const getProjectBorderColor = (status) => {
  switch (status) {
    case 'completed': return 'border-green-500'
    case 'ongoing': return 'border-blue-500'
    default: return 'border-gray-300'
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

// Watch for filter changes
watch([searchQuery, selectedTraining, selectedInstitution, sortBy], 
  async ([newSearch, newTraining, newInstitution, newSort], [oldSearch, oldTraining, oldInstitution, oldSort]) => {
    console.log('Filter changed:', {
      training: { old: oldTraining, new: newTraining },
      institution: { old: oldInstitution, new: newInstitution },
      search: { old: oldSearch, new: newSearch },
      sort: { old: oldSort, new: newSort }
    })
    
    // Reset page
    currentPage.value = 1
    
    // Fetch filtered data if either institution or training changes
    if (newInstitution !== oldInstitution || newTraining !== oldTraining) {
      // Give priority to institution filter if both are selected
      if (newInstitution) {
        await fetchProjects(newInstitution, null)
      } else if (newTraining) {
        await fetchProjects(null, newTraining)
      } else {
        // If neither filter is selected, fetch all projects
        await fetchProjects()
      }
    }
})
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