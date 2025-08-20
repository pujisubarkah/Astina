<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-blue-900 mb-2">Peta Sebaran Proyek Perubahan</h1>
            <p class="text-blue-700">Klik pada provinsi untuk melihat detail proyek perubahan di wilayah tersebut</p>
          </div>
          <div class="flex gap-2">
            <select class="select select-bordered" v-model="selectedCategory">
              <option value="">Semua Kategori</option>
              <option value="digitalisasi">Digitalisasi</option>
              <option value="sakip">SAKIP & Reformasi</option>
              <option value="inovasi">Inovasi</option>
              <option value="manajemen">Manajemen Perubahan</option>
            </select>
            <select class="select select-bordered" v-model="selectedStatus">
              <option value="">Semua Status</option>
              <option value="completed">Selesai</option>
              <option value="ongoing">Berjalan</option>
              <option value="planning">Perencanaan</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div class="stat-title">Total Provinsi</div>
          <div class="stat-value text-blue-600">{{ stats.totalProvinces }}</div>
          <div class="stat-desc">dengan proyek aktif</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
            </svg>
          </div>
          <div class="stat-title">Total Proyek</div>
          <div class="stat-value text-green-600">{{ stats.totalProjects }}</div>
          <div class="stat-desc">di seluruh Indonesia</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="stat-title">Peserta Aktif</div>
          <div class="stat-value text-orange-600">{{ stats.totalParticipants }}</div>
          <div class="stat-desc">dari berbagai K/L</div>
        </div>
        
        <div class="stat bg-white rounded-lg shadow-lg">
          <div class="stat-figure text-purple-600">
            <div class="radial-progress text-purple-600" :style="`--value:${stats.completionRate}; --size:3rem; --thickness: 4px;`">
              <span class="text-sm font-bold">{{ stats.completionRate }}%</span>
            </div>
          </div>
          <div class="stat-title">Tingkat Penyelesaian</div>
          <div class="stat-value text-purple-600">{{ stats.completionRate }}%</div>
          <div class="stat-desc">rata-rata nasional</div>
        </div>
      </div>

      <!-- Map and Details Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Indonesia Map -->
        <div class="lg:col-span-2">
          <div class="card bg-white shadow-lg">
            <div class="card-body">
              <div class="flex items-center justify-between mb-4">
                <h2 class="card-title text-lg font-semibold text-gray-800">Peta Indonesia</h2>
                <div class="flex items-center gap-2">
                  <div class="badge badge-info">Interaktif</div>
                  <span class="text-xs text-gray-500">Klik provinsi untuk detail</span>
                </div>
              </div>
              
              <!-- SVG Map Container -->
              <div class="relative bg-blue-50 rounded-lg p-4" style="height: 500px;">
                <svg
                  viewBox="0 0 1000 600"
                  class="w-full h-full cursor-pointer"
                  @mouseleave="hoveredProvince = null"
                >
                  <g id="indonesia-provinces">
                    <template v-for="prov in provinsiList" :key="prov.id">
                      <path
                        v-if="prov.svgPath"
                        :d="parseSvgPath(prov.svgPath)"
                        :fill="getProvinceColor(prov.code)"
                        :class="getProvinceClass(prov.code)"
                        @click="selectProvince(prov.code)"
                        @mouseenter="hoveredProvince = prov.code"
                      />
                    </template>
                  </g>
                  <!-- Tooltip for hovered province -->
                  <g v-if="hoveredProvince">
                    <rect
                      :x="tooltipPosition.x"
                      :y="tooltipPosition.y"
                      :width="tooltipWidth"
                      height="40"
                      fill="rgba(0,0,0,0.8)"
                      rx="4"
                    />
                    <text
                      :x="tooltipPosition.x + 10"
                      :y="tooltipPosition.y + 15"
                      fill="white"
                      font-size="12"
                      font-weight="bold"
                    >
                      {{ getProvinceName(hoveredProvince) }}
                    </text>
                    <text
                      :x="tooltipPosition.x + 10"
                      :y="tooltipPosition.y + 30"
                      fill="white"
                      font-size="10"
                    >
                      {{ getProvinceProjectCount(hoveredProvince) }} proyek
                    </text>
                  </g>
                </svg>
              </div>

              <!-- Legend -->
              <div class="mt-4 flex flex-wrap gap-4 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4" style="background:#0B2447"></div>
                  <span>&gt; 1000 proyek (Sangat Tinggi)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4" style="background:#205295"></div>
                  <span>501 - 1000 proyek (Tinggi)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4" style="background:#2C74B3"></div>
                  <span>301 - 500 proyek (Menengah)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4" style="background:#A5D7E8"></div>
                  <span>101 - 300 proyek (Rendah)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4" style="background:#F8F6F4; border:1px solid #ccc"></div>
                  <span>1 - 100 proyek (Sangat Rendah)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-gray-300 border"></div>
                  <span>0 proyek</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Province Details Panel -->
        <div class="lg:col-span-1">
          <div class="card bg-white shadow-lg sticky top-6">
            <div class="card-body">
              <div class="flex items-center justify-between mb-4">
                <h2 class="card-title text-lg font-semibold text-gray-800">
                  {{ selectedProvinceData ? `Detail ${getProvinceName(selectedProvinceData.code)}` : 'Detail Provinsi' }}
                </h2>
                <button 
                  v-if="selectedProvinceData && kabupatenData.length"
                  class="btn btn-primary btn-sm"
                  @click="openKabupatenModal = true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Lihat Peta Detail
                </button>
              </div>
              
              <!-- Loading state -->
              <div v-if="loadingKabupaten" class="text-center py-8">
                <div class="loading loading-spinner loading-md"></div>
                <p class="text-gray-500 mt-2">Memuat data kabupaten...</p>
              </div>
              
              <!-- Province Summary -->
              <div v-else-if="selectedProvinceData" class="space-y-4">
                <!-- Quick Stats -->
                <div class="grid grid-cols-2 gap-3">
                  <div class="stat bg-blue-50 rounded-lg p-3">
                    <div class="stat-title text-xs text-blue-600">Total Kabupaten/Kota</div>
                    <div class="stat-value text-lg text-blue-800">{{ kabupatenData.length }}</div>
                  </div>
                  <div class="stat bg-green-50 rounded-lg p-3">
                    <div class="stat-title text-xs text-green-600">Total Proyek</div>
                    <div class="stat-value text-lg text-green-800">{{ selectedProvinceData.totalProjects || 0 }}</div>
                  </div>
                </div>

                <!-- Preview Kabupaten Map (Small) -->
                <div v-if="kabupatenData.length" class="space-y-3">
                  <div class="flex items-center justify-between">
                    <h4 class="font-medium text-gray-700">Preview Peta Kabupaten</h4>
                    <span class="text-xs text-gray-500">Klik tombol di atas untuk detail</span>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-2 cursor-pointer hover:bg-blue-100 transition-colors" @click="openKabupatenModal = true">
                    <svg 
                      viewBox="0 0 1000 600" 
                      class="w-full h-32"
                    >
                      <g>
                        <template v-for="kab in kabupatenData" :key="kab.id_kabupaten || kab.id">
                          <path
                            v-if="kab.svg_path"
                            :d="parseSvgPath(kab.svg_path)"
                            :fill="getKabupatenColor(Number(kab.jumlah) || Number(kab.jumlah_inovasi) || 0)"
                            class="stroke-white stroke-1"
                          />
                        </template>
                      </g>
                    </svg>
                    <p class="text-center text-xs text-gray-600 mt-2">Klik untuk memperbesar</p>
                  </div>
                </div>

                <!-- Top Kabupaten List -->
                <div v-if="kabupatenData.length" class="space-y-2">
                  <h4 class="font-medium text-gray-700">Top 5 Kabupaten/Kota</h4>
                  <div class="space-y-2 max-h-40 overflow-y-auto">
                    <div 
                      v-for="kab in topKabupaten" 
                      :key="kab.id_kabupaten || kab.id"
                      class="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      @click="selectKabupaten(kab)"
                    >
                      <div>
                        <p class="text-sm font-medium text-gray-800">{{ kab.nama_kabupaten || kab.nama || 'Kabupaten' }}</p>
                        <p class="text-xs text-gray-600">{{ kab.jumlah || 0 }} proyek</p>
                      </div>
                      <div class="badge badge-primary badge-sm">{{ kab.jumlah || 0 }}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- No Province Selected -->
              <div v-else class="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p class="text-gray-500">Klik provinsi pada peta untuk melihat kabupaten/kota</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Kabupaten Detail Modal -->
  <div v-if="openKabupatenModal && selectedProvinceData" class="modal modal-open">
    <div class="modal-box max-w-6xl h-[90vh] max-h-none">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="font-bold text-xl text-gray-800">Peta {{ getProvinceName(selectedProvinceData.code) }}</h3>
          <p class="text-gray-600">{{ kabupatenData.length }} Kabupaten/Kota • {{ selectedProvinceData.totalProjects || 0 }} Total Proyek</p>
        </div>
        <div class="flex items-center gap-2">
          <!-- View Toggle -->
          <div class="tabs tabs-boxed">
            <a class="tab" :class="{ 'tab-active': kabupatenView === 'map' }" @click="kabupatenView = 'map'">Peta</a>
            <a class="tab" :class="{ 'tab-active': kabupatenView === 'list' }" @click="kabupatenView = 'list'">Daftar</a>
          </div>
          <button class="btn btn-sm btn-circle btn-ghost" @click="openKabupatenModal = false">✕</button>
        </div>
      </div>
      
      <div class="h-full overflow-hidden">
        <!-- Map View -->
        <div v-if="kabupatenView === 'map'" class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <!-- Large Map -->
          <div class="lg:col-span-2">
            <div class="bg-blue-50 rounded-lg p-4 h-full">
              <svg 
                viewBox="0 0 1000 600" 
                class="w-full h-full cursor-pointer"
                @mouseleave="hoveredKabupaten = null"
              >
                <g>
                  <template v-for="kab in kabupatenData" :key="kab.id_kabupaten || kab.id">
                    <path
                      v-if="kab.svg_path"
                      :d="parseSvgPath(kab.svg_path)"
                      :fill="getKabupatenColor(Number(kab.jumlah) || Number(kab.jumlah_inovasi) || 0)"
                      :class="getKabupatenClass(kab)"
                      :stroke="hoveredKabupaten?.id_kabupaten === kab?.id_kabupaten || hoveredKabupaten?.id === kab?.id ? '#1d4ed8' : '#3b82f6'"
                      :stroke-width="hoveredKabupaten?.id_kabupaten === kab?.id_kabupaten || hoveredKabupaten?.id === kab?.id ? '2' : '1'"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      @click="selectKabupaten(kab)"
                      @mouseenter="hoveredKabupaten = kab"
                    />
                  </template>
                </g>
                
                <!-- Tooltip for hovered kabupaten -->
                <g v-if="hoveredKabupaten">
                  <rect
                    :x="kabupatenTooltipPosition.x"
                    :y="kabupatenTooltipPosition.y"
                    :width="kabupatenTooltipWidth"
                    height="50"
                    fill="rgba(0,0,0,0.9)"
                    rx="6"
                  />
                  <text
                    :x="kabupatenTooltipPosition.x + 12"
                    :y="kabupatenTooltipPosition.y + 18"
                    fill="white"
                    font-size="14"
                    font-weight="bold"
                  >
                    {{ hoveredKabupaten?.nama_kabupaten || hoveredKabupaten?.nama || 'Kabupaten' }}
                  </text>
                  <text
                    :x="kabupatenTooltipPosition.x + 12"
                    :y="kabupatenTooltipPosition.y + 35"
                    fill="white"
                    font-size="12"
                  >
                    {{ hoveredKabupaten?.jumlah || 0 }} proyek perubahan
                  </text>
                </g>
              </svg>
            </div>
          </div>
          
          <!-- Selected Kabupaten Info -->
          <div class="lg:col-span-1 space-y-4">
            <!-- Legend -->
            <div class="card bg-white shadow-sm">
              <div class="card-body p-4">
                <h4 class="font-semibold text-gray-800 mb-3">Legend</h4>
                <div class="space-y-2">
                  <div class="flex items-center gap-3">
                    <div class="w-4 h-4 bg-blue-800 rounded"></div>
                    <span class="text-sm">Sangat Tinggi (&gt;50 proyek)</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-4 h-4 bg-blue-600 rounded"></div>
                    <span class="text-sm">Tinggi (21-50 proyek)</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-4 h-4 bg-blue-400 rounded"></div>
                    <span class="text-sm">Sedang (11-20 proyek)</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-4 h-4 bg-blue-200 rounded"></div>
                    <span class="text-sm">Rendah (1-10 proyek)</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-4 h-4 bg-gray-300 rounded"></div>
                    <span class="text-sm">Tidak ada proyek</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Selected Kabupaten Detail -->
            <div v-if="selectedKabupaten" class="card bg-white shadow-sm">
              <div class="card-body p-4">
                <h4 class="font-semibold text-gray-800 mb-3">Detail Kabupaten</h4>
                <div class="space-y-3">
                  <div>
                    <label class="text-sm font-medium text-gray-600">Nama</label>
                    <p class="text-sm text-gray-800">{{ selectedKabupaten?.nama_kabupaten || selectedKabupaten?.nama || 'Kabupaten' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-600">Jumlah Proyek</label>
                    <p class="text-lg font-bold text-blue-600">{{ selectedKabupaten?.jumlah || 0 }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-600">Kategori</label>
                    <div class="badge badge-primary badge-sm">{{ getKabupatenCategory(selectedKabupaten?.jumlah || 0) }}</div>
                  </div>
                </div>
                <div class="mt-4">
                  <button class="btn btn-primary btn-sm w-full">Lihat Detail Proyek</button>
                </div>
              </div>
            </div>
            
            <!-- Instruction if no selection -->
            <div v-else class="card bg-white shadow-sm">
              <div class="card-body p-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.121 2.122" />
                </svg>
                <p class="text-gray-500 text-sm">Klik pada kabupaten di peta untuk melihat detail</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- List View -->
        <div v-else class="h-full">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full overflow-y-auto">
            <div 
              v-for="kab in sortedKabupatenData" 
              :key="kab.id_kabupaten || kab.id"
              class="card bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              @click="selectKabupaten(kab)"
              :class="{ 'ring-2 ring-blue-500': selectedKabupaten?.id_kabupaten === kab.id_kabupaten }"
            >
              <div class="card-body p-4">
                <h4 class="font-semibold text-gray-800 text-sm mb-2">{{ kab.nama_kabupaten || kab.nama || 'Kabupaten' }}</h4>
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl font-bold text-blue-600">{{ kab.jumlah || 0 }}</div>
                    <div class="text-xs text-gray-500">proyek</div>
                  </div>
                  <div class="badge badge-sm" :class="getKabupatenBadgeClass(kab.jumlah || 0)">
                    {{ getKabupatenCategory(kab.jumlah || 0) }}
                  </div>
                </div>
                <div class="mt-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-600 h-2 rounded-full transition-all" 
                      :style="`width: ${getKabupatenProgress(kab.jumlah || 0)}%`"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Project Detail Modal -->
  <div v-if="selectedProject" class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">{{ selectedProject?.title || 'Detail Proyek' }}</h3>
        <button class="btn btn-sm btn-circle btn-ghost" @click="selectedProject = null">✕</button>
      </div>
      
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Instansi</label>
            <p class="text-sm">{{ selectedProject?.institution || '-' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Kategori</label>
            <p class="text-sm">{{ selectedProject?.category || '-' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Status</label>
            <div class="badge" :class="getStatusBadgeClass(selectedProject?.status)">
              {{ getStatusText(selectedProject?.status) }}
            </div>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Progress</label>
            <div class="flex items-center gap-2">
              <progress class="progress w-20" :class="getProgressColor(selectedProject?.progress || 0)" :value="selectedProject?.progress || 0" max="100"></progress>
              <span class="text-sm font-medium">{{ selectedProject?.progress || 0 }}%</span>
            </div>
          </div>
        </div>
        
        <div>
          <label class="text-sm font-medium text-gray-600">Deskripsi</label>
          <p class="text-sm text-gray-700 mt-1">{{ selectedProject?.description || '-' }}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Tanggal Mulai</label>
            <p class="text-sm">{{ selectedProject?.startDate ? formatDate(selectedProject.startDate) : '-' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Target Selesai</label>
            <p class="text-sm">{{ selectedProject?.targetDate ? formatDate(selectedProject.targetDate) : '-' }}</p>
          </div>
        </div>
      </div>
      
      <div class="modal-action">
        <button class="btn btn-primary btn-sm">Lihat Detail Lengkap</button>
        <button class="btn btn-ghost btn-sm" @click="selectedProject = null">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
useHead({
  title: 'Peta Sebaran Proyek - Astina',
  meta: [
    { name: 'description', content: 'Peta interaktif sebaran proyek perubahan di seluruh Indonesia' }
  ]
})

// Reactive data
const selectedCategory = ref('')
const selectedStatus = ref('')
const hoveredProvince = ref(null)
const hoveredKabupaten = ref(null)
const selectedProvinceData = ref(null)
const selectedProject = ref(null)
const selectedKabupaten = ref(null)
const kabupatenData = ref([])
const loadingKabupaten = ref(false)
const openKabupatenModal = ref(false)
const kabupatenView = ref('map') // 'map' or 'list'

// Stats data
const stats = reactive({
  totalProvinces: 28,
  totalProjects: 156,
  totalParticipants: 324,
  completionRate: 73
})

const provinsiList = ref([])
const provinceData = reactive({})

// Utility untuk parsing path SVG dari API
function parseSvgPath(path) {
  if (!path) return ''
  
  try {
    // Hilangkan tanda kutip ganda di awal/akhir dan whitespace
    let cleanPath = String(path).replace(/^"|"$/g, '').trim()
    
    // Jika path string masih ada escape quote, parse dulu
    if (cleanPath.startsWith('"') || cleanPath.startsWith("'")) {
      cleanPath = JSON.parse(cleanPath)
    }
    
    return cleanPath
  } catch {
    // Fallback jika parsing gagal
    return String(path).replace(/^"|"$/g, '').trim()
  }
}

// Fetch summary per provinsi and fill provinceData
onMounted(async () => {
  try {
    // Fetch data provinsi dari endpoint /api/proper/provinsi
    const resSummary = await $fetch('/api/proper/provinsi')
    if (resSummary.success && Array.isArray(resSummary.data)) {
      // Isi provinsiList dan provinceData dari response API
      provinsiList.value = resSummary.data.map((item) => ({
        id: item.id_provinsi,
        code: item.id_provinsi, // Gunakan id_provinsi sebagai code
        svgPath: item.svg_path?.replace(/^"|"$/g, ''), // Hilangkan quotes
        jumlah: Number(item.jumlah_proper) || 0,
        nama: item.nama_provinsi
      }))
      
      // Isi provinceData untuk lookup
      resSummary.data.forEach((item) => {
        const code = item.id_provinsi
        provinceData[code] = {
          id: item.id_provinsi,
          code,
          name: item.nama_provinsi,
          svgPath: item.svg_path?.replace(/^"|"$/g, ''),
          totalProjects: Number(item.jumlah_proper) || 0,
          completedProjects: 0,
          ongoingProjects: 0,
          participants: 0,
          projects: []
        }
      })
      
      // Update stats
      stats.totalProvinces = provinsiList.value.length
      stats.totalProjects = provinsiList.value.reduce((sum, p) => sum + (p.jumlah || 0), 0)
      
      console.log('Provinsi data loaded:', provinsiList.value.length, 'provinces')
    }
  } catch (error) {
    console.error('Error fetching provinsi data:', error)
  }
  
  // Auto-select provinsi pertama jika ada
  if (provinsiList.value.length > 0) {
    selectProvince(provinsiList.value[0].code)
  }
})

// Computed properties
const tooltipPosition = computed(() => {
  return { x: 50, y: 50 }
})

const tooltipWidth = computed(() => {
  if (!hoveredProvince.value) return 0
  const name = getProvinceName(hoveredProvince.value)
  return Math.max(120, name.length * 8 + 40)
})

const kabupatenTooltipPosition = computed(() => {
  return { x: 50, y: 50 }
})

const kabupatenTooltipWidth = computed(() => {
  if (!hoveredKabupaten.value) return 0
  const name = hoveredKabupaten.value?.nama_kabupaten || hoveredKabupaten.value?.nama || 'Kabupaten'
  return Math.max(120, name.length * 8 + 60)
})

// Computed for kabupaten data
const sortedKabupatenData = computed(() => {
  return [...kabupatenData.value].sort((a, b) => (Number(b.jumlah) || 0) - (Number(a.jumlah) || 0))
})

const topKabupaten = computed(() => {
  return sortedKabupatenData.value.slice(0, 5)
})

// Methods
function getProvinceName(code) {
  // Cari nama provinsi dari data yang sudah di-fetch
  // Menggunakan data dari API dulu, baru fallback ke mapping
  const provinsi = provinceData[code]
  if (provinsi && provinsi.name) {
    return provinsi.name
  }
  
  // Fallback ke mapping manual jika tidak ditemukan
  const names = {
    11: 'Aceh',
    12: 'Sumatera Utara',
    13: 'Sumatera Barat',
    14: 'Riau',
    15: 'Jambi',
    16: 'Sumatera Selatan',
    17: 'Bengkulu',
    18: 'Lampung',
    19: 'Kepulauan Bangka Belitung',
    21: 'Kepulauan Riau',
    31: 'DKI Jakarta',
    32: 'Jawa Barat',
    33: 'Jawa Tengah',
    34: 'DI Yogyakarta',
    35: 'Jawa Timur',
    36: 'Banten',
    51: 'Bali',
    52: 'Nusa Tenggara Barat',
    53: 'Nusa Tenggara Timur',
    61: 'Kalimantan Barat',
    62: 'Kalimantan Tengah',
    63: 'Kalimantan Selatan',
    64: 'Kalimantan Timur',
    65: 'Kalimantan Utara',
    71: 'Sulawesi Utara',
    72: 'Sulawesi Tengah',
    73: 'Sulawesi Selatan',
    74: 'Sulawesi Tenggara',
    75: 'Gorontalo',
    76: 'Sulawesi Barat',
    81: 'Maluku',
    82: 'Maluku Utara',
    91: 'Papua Barat',
    94: 'Papua',
    93: 'Papua Selatan'
  }
  return names[code] || `Provinsi ${code}`
}

function getProvinceProjectCount(code) {
  return provinceData[code]?.totalProjects || 0
}

function getColor(jumlah, min, max) {
  // Contoh: biru muda (#BDE0FE) ke biru tua (#023E8A)
  const percent = (jumlah - min) / (max - min);
  const r = Math.round(189 + (2 - 189) * percent);
  const g = Math.round(224 + (62 - 224) * percent);
  const b = Math.round(254 + (138 - 254) * percent);
  return `rgb(${r},${g},${b})`;
}

function getKabupatenColor(jumlah) {
  if (jumlah > 50) return '#1e40af' // Biru tua
  if (jumlah > 20) return '#2563eb' // Biru sedang
  if (jumlah > 10) return '#60a5fa' // Biru muda
  if (jumlah > 0) return '#bfdbfe'  // Biru sangat muda
  return '#e5e7eb' // Abu-abu
}

function getKabupatenClass(kab) {
  const baseClass = 'transition-all duration-200 hover:opacity-80 cursor-pointer'
  if (hoveredKabupaten.value && (hoveredKabupaten.value?.id_kabupaten === kab?.id_kabupaten || hoveredKabupaten.value?.id === kab?.id)) {
    return `${baseClass} stroke-blue-700 stroke-2 drop-shadow-md`
  }
  return `${baseClass} stroke-blue-500 stroke-1`
}

function selectKabupaten(kab) {
  selectedKabupaten.value = kab
  console.log('Selected kabupaten:', kab)
  // Bisa ditambahkan logic untuk menampilkan detail kabupaten
}

function getKabupatenCategory(jumlah) {
  if (jumlah > 50) return 'Sangat Tinggi'
  if (jumlah > 20) return 'Tinggi'
  if (jumlah > 10) return 'Sedang'
  if (jumlah > 0) return 'Rendah'
  return 'Tidak Ada'
}

function getKabupatenBadgeClass(jumlah) {
  if (jumlah > 50) return 'badge-error'
  if (jumlah > 20) return 'badge-warning'
  if (jumlah > 10) return 'badge-info'
  if (jumlah > 0) return 'badge-success'
  return 'badge-neutral'
}

function getKabupatenProgress(jumlah) {
  const maxJumlah = Math.max(...kabupatenData.value.map(k => Number(k.jumlah) || 0))
  if (maxJumlah === 0) return 0
  return Math.round((jumlah / maxJumlah) * 100)
}

function getProvinceColor(code) {
  const projectCount = getProvinceProjectCount(code)
  if (projectCount > 1000) return '#0B2447' // Sangat tinggi
  if (projectCount > 500) return '#205295'  // Tinggi
  if (projectCount > 300) return '#2C74B3'  // Menengah
  if (projectCount > 100) return '#A5D7E8'  // Rendah
  if (projectCount > 0) return '#F8F6F4'    // Sangat rendah
  return '#D1D5DB' // Tidak ada proyek
}

function getProvinceClass(code) {
  const baseClass = 'transition-all duration-200 hover:opacity-80 cursor-pointer'
  if (hoveredProvince.value === code) {
    return `${baseClass} stroke-gray-800 stroke-2`
  }
  if (selectedProvinceData.value?.code === code) {
    return `${baseClass} stroke-blue-600 stroke-2`
  }
  return `${baseClass} stroke-white stroke-1`
}

async function selectProvince(code) {
  selectedProvinceData.value = provinceData[code]
  kabupatenData.value = []
  selectedKabupaten.value = null
  openKabupatenModal.value = false
  if (!selectedProvinceData.value) return
  
  // Fetch kabupaten data
  loadingKabupaten.value = true
  try {
    // Gunakan id dari selectedProvinceData atau cari dari provinsiList
    let idProvinsi = selectedProvinceData.value.id || selectedProvinceData.value.id_provinsi
    
    if (!idProvinsi) {
      // Cari id_provinsi dari provinsiList berdasarkan code
      const provData = provinsiList.value.find(p => p.code === code)
      idProvinsi = provData?.id || provData?.id_provinsi
    }
    
    if (idProvinsi) {
      console.log('Fetching kabupaten for provinsi:', idProvinsi)
      const res = await $fetch(`/api/proper/kabupaten/${idProvinsi}`)
      if (res.success && Array.isArray(res.data)) {
        kabupatenData.value = res.data
        console.log('Kabupaten data loaded:', res.data.length, 'items')
      }
    }
  } catch (error) {
    console.error('Error fetching kabupaten:', error)
  }
  loadingKabupaten.value = false
}

function getStatusBadgeClass(status) {
  if (!status) return 'badge-neutral'
  const classes = {
    completed: 'badge-success',
    ongoing: 'badge-info',
    planning: 'badge-warning',
    delayed: 'badge-error'
  }
  return classes[status] || 'badge-neutral'
}

function getStatusText(status) {
  if (!status) return 'Tidak diketahui'
  const texts = {
    completed: 'Selesai',
    ongoing: 'Berjalan',
    planning: 'Perencanaan',
    delayed: 'Terlambat'
  }
  return texts[status] || status
}

function getProgressClass(progress) {
  if (progress >= 90) return 'text-green-600'
  if (progress >= 70) return 'text-blue-600'
  if (progress >= 50) return 'text-yellow-600'
  return 'text-red-600'
}

function getProgressColor(progress) {
  if (progress >= 90) return 'progress-success'
  if (progress >= 70) return 'progress-info'
  if (progress >= 50) return 'progress-warning'
  return 'progress-error'
}

function formatDate(dateString) {
  if (!dateString) return '-'
  try {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return '-'
  }
}

function viewProjectDetail(project) {
  selectedProject.value = project
}

function viewAllProjects() {
  // Navigate to project list with province filter
  console.log('View all projects for', selectedProvinceData.value?.name)
}
</script>

<style scoped>
.modal {
  z-index: 1000;
}

svg path, svg circle {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

svg path:hover, svg circle:hover {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}
</style>
