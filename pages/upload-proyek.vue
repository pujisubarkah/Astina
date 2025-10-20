<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <a href="/daftar-proyek" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <div>
            <h1 class="text-4xl font-bold text-blue-900 mb-2">Upload Produk Pembelajaran</h1>
            <p class="text-blue-700">Bagikan laporan produk pembelajaran Anda dengan komunitas</p>
          </div>
        </div>
      </div>

      <!-- Upload Form -->
      <div class="card bg-white shadow-lg">
        <div class="card-body">
          <form @submit.prevent="submitProject">
            <!-- Step Indicator -->
            <div class="mb-8">
              <ul class="steps w-full">
                <li class="step" :class="{ 'step-primary': currentStep >= 1 }">Informasi Dasar</li>
                <li class="step" :class="{ 'step-primary': currentStep >= 2 }">Detail Proyek</li>
                <li class="step" :class="{ 'step-primary': currentStep >= 3 }">Upload File</li>
                <li class="step" :class="{ 'step-primary': currentStep >= 4 }">Review</li>
              </ul>
            </div>

            <!-- Step 1: Basic Information -->
            <div v-if="currentStep === 1" class="space-y-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Informasi Dasar</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Nama Lengkap *</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama lengkap Anda"
                    class="input input-bordered w-full"
                    v-model="form.authorName"
                    required
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">NIP *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan NIP Anda"
                    class="input input-bordered w-full"
                    v-model="form.nip"
                    required
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Email *</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="nama@email.com"
                    class="input input-bordered w-full"
                    v-model="form.email"
                    required
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Kategori Instansi *</span>
                  </label>
                  <select class="select select-bordered w-full" v-model="form.kategoriInstansi" required @change="onKategoriChange">
                    <option :value="''">Pilih Kategori Instansi</option>
                    <option v-for="kategori in kategoriOptions" :key="kategori.id" :value="Number(kategori.id)">
                      {{ kategori.nama }}
                    </option>
                  </select>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Kementerian/Lembaga/Pemerintah Daerah *</span>
                  </label>
                  <select 
                    class="select select-bordered w-full" 
                    v-model="form.institution" 
                    required
                    :disabled="!form.kategoriInstansi"
                  >
                    <option :value="''">{{ form.kategoriInstansi ? 'Pilih Instansi' : 'Pilih Kategori Instansi terlebih dahulu' }}</option>
                    <option v-for="instansi in filteredInstansiOptions" :key="instansi.instansi_id" :value="Number(instansi.instansi_id)">
                      {{ instansi.nama_instansi }}
                    </option>
                  </select>
                </div>

                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">Lembaga Diklat *</span>
                    </label>
                    <select class="select select-bordered w-full" v-model="form.lembagaDiklat" required>
                      <option :value="''">Pilih Lembaga Diklat</option>
                      <option v-for="lemdik in lemdikOptions" :key="lemdik.id" :value="Number(lemdik.id)">
                        {{ lemdik.namalemdik }}
                      </option>
                    </select>
                  </div>

                 

                  <div class="form-control md:col-span-2">
                    <label class="label">
                      <span class="label-text font-semibold">Program Pelatihan *</span>
                    </label>
                    <select class="select select-bordered w-full" v-model="form.training" required>
                      <option :value="''">Pilih Program Pelatihan</option>
                      <option v-for="pelatihan in pelatihanOptions" :key="pelatihan.id" :value="Number(pelatihan.id)">
                        {{ pelatihan.nama }}
                      </option>
                    </select>
                  </div>
              </div>
            </div>

            <!-- Step 2: Project Details -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Detail Proyek</h2>
              
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Judul Produk Pembelajaran *</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Berikan judul yang jelas dan deskriptif"
                  class="input input-bordered w-full"
                  v-model="form.title"
                  required
                />
                <label class="label">
                  <span class="label-text-alt">{{ form.title.length }}/100 karakter</span>
                </label>
              </div>

              <!-- Asta Cita -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Asta Cita</span>
                  <span class="label-text-alt">Opsional - singkat visi/tujuan</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered w-full"
                  placeholder="Tuliskan Asta Cita singkat (misal: Meningkatkan kualitas layanan)"
                  v-model="form.astaCita"
                />
                <label class="label">
                  <span class="label-text-alt">Contoh: Meningkatkan kualitas layanan publik melalui digitalisasi proses</span>
                </label>
              </div>

              <!-- SDGs -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">SDGs (Tujuan Pembangunan Berkelanjutan)</span>
                  <span class="label-text-alt">Pilih semua yang relevan</span>
                </label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <label v-for="sdg in sdgOptions" :key="sdg.id" class="flex items-center gap-2">
                    <input type="checkbox" class="checkbox" :value="sdg.id" v-model="form.sdgs" />
                    <span class="text-sm">{{ sdg.id }} - {{ sdg.name }}</span>
                  </label>
                </div>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Deskripsi Proyek *</span>
                </label>
                <textarea
                  class="textarea textarea-bordered w-full h-32"
                  placeholder="Jelaskan latar belakang, tujuan, dan ringkasan produk pembelajaran Anda..."
                  v-model="form.description"
                  :maxlength="500"
                  required
                  @input="form.description = form.description.slice(0, 500)"
                ></textarea>
                <label class="label">
                  <span class="label-text-alt text-xs text-gray-500">{{ form.description.length }}/500 karakter</span>
                </label>
              </div>

              <!-- Publikasi Media Section -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Publikasi Media</span>
                  <span class="label-text-alt">Opsional</span>
                </label>
                <div class="space-y-4">
                  <!-- Media Sosial -->
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
                      </svg>
                      Media Sosial
                    </h4>
                    
                    <div class="space-y-3">
                      <div v-for="(item, index) in form.publikasi.mediaSosial" :key="index" class="flex gap-2">
                        <div class="form-control flex-1">
                          <input 
                            type="text" 
                            placeholder="Platform (Instagram, Facebook, Twitter, LinkedIn, TikTok, dll)"
                            class="input input-bordered input-sm"
                            v-model="item.platform"
                          />
                        </div>
                        <div class="form-control flex-1">
                          <input 
                            type="url" 
                            placeholder="https://link-media-sosial.com"
                            class="input input-bordered input-sm"
                            v-model="item.linkMedia"
                          />
                        </div>
                        <button 
                          type="button" 
                          class="btn btn-ghost btn-sm text-red-500"
                          @click="removeMediaSosial(index)"
                          v-if="form.publikasi.mediaSosial.length > 1"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <button 
                        type="button" 
                        class="btn btn-outline btn-sm"
                        @click="addMediaSosial"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Media Sosial
                      </button>
                    </div>
                  </div>

                  <!-- Media Massa -->
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      Media Massa & Portal Berita
                    </h4>
                    
                    <div class="space-y-3">
                      <div v-for="(item, index) in form.publikasi.mediaMassa" :key="index" class="flex gap-2">
                        <div class="form-control flex-1">
                          <input 
                            type="text" 
                            placeholder="Nama media (contoh: Kompas, Detik, CNN Indonesia)"
                            class="input input-bordered input-sm"
                            v-model="item.namaMedia"
                          />
                        </div>
                        <div class="form-control flex-1">
                          <input 
                            type="url" 
                            placeholder="https://link-berita.com"
                            class="input input-bordered input-sm"
                            v-model="item.linkBerita"
                          />
                        </div>
                        <button 
                          type="button" 
                          class="btn btn-ghost btn-sm text-red-500"
                          @click="removeMediaMassa(index)"
                          v-if="form.publikasi.mediaMassa.length > 1"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <button 
                        type="button" 
                        class="btn btn-outline btn-sm"
                        @click="addMediaMassa"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Media Massa
                      </button>
                    </div>
                  </div>
                </div>
                <label class="label">
                  <span class="label-text-alt">Tambahkan link publikasi untuk meningkatkan visibilitas proyek Anda</span>
                </label>
              </div>


              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold whitespace-normal break-words">Berapa perkiraan nilai ekonomi yang dihasilkan dari produk pembelajaran atau dari penerapan hasil pelatihan yang Anda ikuti? *</span>
                  </label>
                  <select class="select select-bordered w-full" v-model="form.nilaiEkonomi" required @change="onNilaiEkonomiChange">
                    <option value="">Pilih Nilai Ekonomi</option>
                    <option v-for="option in nilaiEkonomiOptions" :key="option" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>

                <div class="form-control" v-if="form.nilaiEkonomi">
                  <label class="label">
                    <span class="label-text font-semibold">Detail Nilai Ekonomi *</span>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text">Rp</span>
                    <input 
                      type="text" 
                      placeholder="Masukkan nilai ekonomi yang tepat"
                      class="input input-bordered w-full"
                      v-model="form.detailNilaiEkonomi"
                      @input="formatCurrency"
                      required
                    />
                  </div>
                  <label class="label">
                    <span class="label-text-alt">Masukkan nilai ekonomi dalam rupiah</span>
                  </label>
                </div>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Kata Kunci (Tags)</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Pisahkan dengan koma. Misal: digitalisasi, pelayanan, inovasi"
                  class="input input-bordered w-full"
                  v-model="form.tagsInput"
                  @blur="processTags"
                />
                <label class="label">
                  <span class="label-text-alt">Gunakan kata kunci yang relevan agar proyek mudah ditemukan</span>
                </label>
                <div class="flex flex-wrap gap-2 mt-2" v-if="form.tags.length > 0">
                  <span 
                    v-for="(tag, index) in form.tags" 
                    :key="index"
                    class="badge badge-outline gap-2"
                  >
                    {{ tag }}
                    <button 
                      type="button" 
                      class="btn btn-ghost btn-xs"
                      @click="removeTag(index)"
                    >
                      ✕
                    </button>
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Tanggal Mulai</span>
                  </label>
                  <input 
                    type="date" 
                    class="input input-bordered w-full"
                    v-model="form.startDate"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Target Selesai</span>
                  </label>
                  <input 
                    type="date" 
                    class="input input-bordered w-full"
                    v-model="form.endDate"
                  />
                </div>
              </div>
            </div>

            <!-- Step 3: File Upload -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Upload File Laporan</h2>
              
              <!-- Main Document -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Dokumen Utama *</span>
                </label>
                <UploadFile @fileUploaded="handleMainFileUploaded" @uploadError="handleUploadError" />
              </div>

              <!-- Supporting Documents -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Dokumen Pendukung</span>
                  <span class="label-text-alt">Opsional</span>
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input 
                    type="file" 
                    class="hidden" 
                    ref="supportFileInput"
                    @change="handleSupportFiles"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                    multiple
                  />
                  <p class="text-gray-600 mb-2">Upload file pendukung (gambar, excel, dll)</p>
                  <p class="text-sm text-gray-500 mb-4">PDF, DOC, JPG, PNG, XLS (Max 5MB per file)</p>
                  <button 
                    type="button" 
                    class="btn btn-outline btn-sm"
                    @click="$refs.supportFileInput.click()"
                  >
                    Tambah File
                  </button>
                </div>
                
                <!-- Support Files List -->
                <div v-if="form.supportFiles.length > 0" class="mt-4 space-y-2">
                  <div 
                    v-for="(file, index) in form.supportFiles" 
                    :key="index"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div class="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p class="font-medium">{{ file.filename }}</p>
                        <p class="text-sm text-gray-500">{{ formatFileSize(file.size) }} • Google Drive</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <a 
                        :href="file.shareUrl" 
                        target="_blank"
                        class="btn btn-ghost btn-xs text-blue-500"
                      >
                        Lihat
                      </a>
                      <button 
                        type="button" 
                        class="btn btn-ghost btn-xs text-red-500"
                        @click="removeSupportFile(index)"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Upload Guidelines -->
              <div class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 class="font-bold">Panduan Upload:</h3>
                  <div class="text-sm mt-1">
                    <p>• Dokumen utama harus berisi laporan lengkap produk pembelajaran</p>
                    <p>• Gunakan format yang mudah dibaca (PDF lebih direkomendasikan)</p>
                    <p>• File pendukung dapat berupa gambar, data, atau material tambahan</p>
                    <p>• Pastikan tidak ada informasi sensitif/rahasia dalam dokumen</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 4: Review -->
            <div v-if="currentStep === 4" class="space-y-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Review & Submit</h2>
              
              <div class="bg-gray-50 rounded-lg p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="font-semibold text-gray-700">Nama Lengkap:</p>
                    <p>{{ form.authorName }}</p>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-700">Email:</p>
                    <p>{{ form.email }}</p>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-700">Kategori Instansi:</p>
                    <p>{{ getKategoriInstansiName(form.kategoriInstansi) }}</p>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-700">Kementerian/Lembaga/Pemerintah Daerah:</p>
                    <p>{{ getInstansiName(form.institution) }}</p>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-700">Program Pelatihan:</p>
                    <p>{{ getTrainingName(form.training) }}</p>
                  </div>
                </div>
                
                <div>
                  <p class="font-semibold text-gray-700">Judul Proyek:</p>
                  <p>{{ form.title }}</p>
                </div>
                
                <div>
                  <p class="font-semibold text-gray-700">Deskripsi:</p>
                  <p class="text-sm">{{ form.description }}</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="font-semibold text-gray-700">Range Nilai Ekonomi:</p>
                    <p class="text-sm">{{ form.nilaiEkonomi }}</p>
                  </div>
                  <div v-if="form.detailNilaiEkonomi">
                    <p class="font-semibold text-gray-700">Detail Nilai Ekonomi:</p>
                    <p class="text-sm font-medium text-green-600">Rp {{ form.detailNilaiEkonomi }}</p>
                  </div>
                </div>

                <!-- Review Publikasi -->
                <div v-if="hasPublikasi" class="border-t pt-4">
                  <p class="font-semibold text-gray-700 mb-3">Publikasi Media:</p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <!-- Media Sosial -->
                    <div v-if="getMediaSosialLinks().length > 0">
                      <p class="font-medium text-gray-600 mb-2">Media Sosial:</p>
                      <div class="space-y-1">
                        <div v-for="link in getMediaSosialLinks()" :key="link.linkMedia" class="flex items-center gap-2">
                          <span class="badge badge-outline badge-xs">{{ link.platform }}</span>
                          <a :href="link.linkMedia" target="_blank" class="text-blue-500 hover:underline text-xs truncate">
                            {{ link.linkMedia }}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Media Massa -->
                    <div v-if="getMediaMassaLinks().length > 0">
                      <p class="font-medium text-gray-600 mb-2">Media Massa:</p>
                      <div class="space-y-1">
                        <div v-for="media in getMediaMassaLinks()" :key="media.linkBerita" class="flex items-center gap-2">
                          <span class="badge badge-outline badge-xs">{{ media.namaMedia }}</span>
                          <a :href="media.linkBerita" target="_blank" class="text-blue-500 hover:underline text-xs truncate">
                            {{ media.linkBerita }}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p class="font-semibold text-gray-700">Total File:</p>
                    <span class="badge badge-secondary">{{ getTotalFiles() }} file</span>
                  </div>
                  <div v-if="form.mainFileData">
                    <p class="font-semibold text-gray-700">Dokumen Utama:</p>
                    <span class="badge badge-primary">{{ form.mainFileData.filename }}</span>
                  </div>
                  <div v-if="form.supportFiles.length > 0">
                    <p class="font-semibold text-gray-700">File Pendukung:</p>
                    <span class="badge badge-outline">{{ form.supportFiles.length }} file</span>
                  </div>
                </div>
                
                <div v-if="form.tags.length > 0">
                  <p class="font-semibold text-gray-700">Tags:</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="tag in form.tags" :key="tag" class="badge badge-outline badge-sm">{{ tag }}</span>
                  </div>
                </div>
              </div>

              <!-- Terms and Conditions -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" class="checkbox checkbox-primary" v-model="form.agreeTerms" />
                  <span class="label-text">
                    Saya menyetujui bahwa proyek ini dapat dibagikan secara publik untuk tujuan pembelajaran dan berbagi pengetahuan
                  </span>
                </label>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" class="checkbox checkbox-primary" v-model="form.agreeAccuracy" />
                  <span class="label-text">
                    Saya bertanggung jawab atas keakuratan data dan tidak ada informasi rahasia dalam dokumen yang diupload
                  </span>
                </label>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-8 border-t">
              <button 
                type="button" 
                class="btn btn-outline"
                :class="{ 'btn-disabled': currentStep === 1 }"
                @click="prevStep"
                v-if="currentStep > 1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Sebelumnya
              </button>
              <div v-else></div>

              <button 
                v-if="currentStep < 4"
                type="button" 
                class="btn btn-primary"
                @click="nextStep"
                :disabled="!canProceed"
              >
                Selanjutnya
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button 
                v-else
                type="submit" 
                class="btn btn-success"
                :disabled="!canSubmit"
                :class="{ 'loading': isSubmitting }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {{ isSubmitting ? 'Mengupload...' : 'Submit Proyek' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRaw } from 'vue'
import UploadFile from "~/components/UploadFile.vue"
// Page metadata
useHead({
  title: 'Upload Produk Pembelajaran - Astina',
  meta: [
  { name: 'description', content: 'Upload laporan produk pembelajaran Anda' }
  ]
})

// Reactive data
const currentStep = ref(1)
const isSubmitting = ref(false)
const instansiOptions = ref([])
const kategoriInstansiOptions = ref([])
const pelatihanOptions = ref([])
const lemdikOptions = ref([])

const form = reactive({
  // Step 1
  authorName: '',
  email: '',
  kategoriInstansi: '',
  institution: '',
  lembagaDiklat: '',
  training: '',
  nip: '',
  nomorKra: '',
  
  // Step 2
  title: '',
  description: '',
  publikasi: {
    mediaSosial: [
      { platform: '', linkMedia: '' }
    ],
    mediaMassa: [
      { namaMedia: '', linkBerita: '' }
    ]
  },
  // New fields
  astaCita: '',
  sdgs: [],
  nilaiEkonomi: '',
  detailNilaiEkonomi: '',
  progress: 0,
  tagsInput: '',
  tags: [],
  startDate: '',
  endDate: '',
  
  // Step 3
  mainFile: null,
  mainFileData: null, // Store uploaded file data from Dropbox
  supportFiles: [],
  
  // Step 4
  agreeTerms: false,
  agreeAccuracy: false
})

const nilaiEkonomiOptions = computed(() => {
  // Cari pelatihan yang dipilih berdasarkan ID
  const selected = pelatihanOptions.value.find(p => p.id === form.training)
  const id = selected?.id
  if (id === 1 || id === 2) {
    return [
      'Kurang dari Rp.100.000.000,- (seratus juta rupiah)',
      'Rp100.000.000,- s.d. Rp1.000.000.000,-',
      'Rp1.000.000.001,- s.d. Rp10.000.000.000,-',
      'Lebih dari Rp10.000.000.000,- (sepuluh miliar rupiah)'
    ]
  } else if (id === 3 || id === 4) {
    return [
      'Kurang dari Rp 50.000.000 (lima puluh juta rupiah)',
      'Rp 50.000.000,- s.d Rp 100.000.000,-',
      'Rp 100.000.001,- s.d Rp 500.000.000,-',
      'Lebih dari Rp 500.000.000,- (lima ratus juta rupiah)'
    ]
  }
  return []
})

// SDG options (simplified subset)
const sdgOptions = ref([
  { id: 1, name: 'Tanpa Kemiskinan' },
  { id: 3, name: 'Kesehatan yang Baik' },
  { id: 4, name: 'Pendidikan Berkualitas' },
  { id: 8, name: 'Pekerjaan Layak & Pertumbuhan Ekonomi' },
  { id: 9, name: 'Infrastruktur, Industri & Inovasi' },
  { id: 11, name: 'Kota & Permukiman yang Berkelanjutan' },
  { id: 13, name: 'Tindakan Iklim' }
])

// Fetch kategori
const kategoriOptions = ref([]);
onMounted(async () => {
  const res = await fetch('/api/kategori');
  const json = await res.json();
  if (json.success) kategoriOptions.value = json.data;
});

// Fetch instansi
const instansiKategoriOptions = ref([]);
onMounted(async () => {
  const res = await fetch('/api/kategori/instansi');
  const json = await res.json();
  if (json.success) instansiKategoriOptions.value = json.data;
});

// Filter instansi sesuai kategori yang dipilih
const filteredInstansiOptions = computed(() => {
  const kategori = instansiKategoriOptions.value.find(k => Number(k.id) === Number(form.kategoriInstansi));
  return kategori ? kategori.instansi : [];
});

// Computed properties
const canProceed = computed(() => {
  const result = (() => {
    switch (currentStep.value) {
      case 1:
        return form.authorName && form.email && form.kategoriInstansi && form.institution && form.lembagaDiklat && form.training
      case 2:
        return form.title && form.description && form.nilaiEkonomi && form.detailNilaiEkonomi
      case 3:
        return form.mainFileData // Check for uploaded file data instead of file object
      case 4:
        return form.agreeTerms && form.agreeAccuracy
      default:
        return false
    }
  })()
  
  console.log('canProceed debug:', {
    currentStep: currentStep.value,
    result,
    form: {
      authorName: form.authorName,
      email: form.email,
      kategoriInstansi: form.kategoriInstansi,
      institution: form.institution,
      lembagaDiklat: form.lembagaDiklat,
      training: form.training,
      title: form.title,
      description: form.description,
  astaCita: form.astaCita || null,
  sdgs: Array.isArray(form.sdgs) ? form.sdgs : [],
      nilaiEkonomi: form.nilaiEkonomi,
      detailNilaiEkonomi: form.detailNilaiEkonomi,
      mainFileData: form.mainFileData,
      agreeTerms: form.agreeTerms,
      agreeAccuracy: form.agreeAccuracy
    }
  })
  
  return result
})

const canSubmit = computed(() => {
  const result = canProceed.value && !isSubmitting.value
  console.log('canSubmit debug:', {
    canProceed: canProceed.value,
    isSubmitting: isSubmitting.value,
    result
  })
  return result
})

// Computed untuk publikasi
const hasPublikasi = computed(() => {
  const medsos = form.publikasi.mediaSosial.some(item => 
    item.platform.trim() !== '' && item.linkMedia.trim() !== ''
  )
  const mediaMassa = form.publikasi.mediaMassa.some(item => 
    item.namaMedia.trim() !== '' && item.linkBerita.trim() !== ''
  )
  return medsos || mediaMassa
})

const getMediaSosialLinks = () => {
  return form.publikasi.mediaSosial.filter(item => 
    item.platform.trim() !== '' && item.linkMedia.trim() !== ''
  )
}

const getMediaMassaLinks = () => {
  return form.publikasi.mediaMassa.filter(item => 
    item.namaMedia.trim() !== '' && item.linkBerita.trim() !== ''
  )
}

// Methods
const onKategoriChange = () => {
  // Reset pilihan instansi ketika kategori berubah
  form.institution = ''
}

const onNilaiEkonomiChange = () => {
  // Reset detail nilai ekonomi ketika range berubah
  form.detailNilaiEkonomi = ''
}

const formatCurrency = (event) => {
  let value = event.target.value.replace(/[^\d]/g, '') // Hanya angka
  
  if (value) {
    // Format dengan pemisah ribuan
    value = parseInt(value).toLocaleString('id-ID')
  }
  
  form.detailNilaiEkonomi = value
  event.target.value = value
}

const addMediaMassa = () => {
  form.publikasi.mediaMassa.push({ namaMedia: '', linkBerita: '' })
}

const removeMediaMassa = (index) => {
  if (form.publikasi.mediaMassa.length > 1) {
    form.publikasi.mediaMassa.splice(index, 1)
  }
}

const addMediaSosial = () => {
  form.publikasi.mediaSosial.push({ platform: '', linkMedia: '' })
}

const removeMediaSosial = (index) => {
  if (form.publikasi.mediaSosial.length > 1) {
    form.publikasi.mediaSosial.splice(index, 1)
  }
}

const nextStep = () => {
  if (canProceed.value && currentStep.value < 4) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const processTags = () => {
  if (form.tagsInput.trim()) {
    const newTags = form.tagsInput
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag && !form.tags.includes(tag))
    
    form.tags.push(...newTags)
    form.tagsInput = ''
  }
}

const removeTag = (index) => {
  form.tags.splice(index, 1)
}

const handleMainFile = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
    form.mainFile = file
  } else {
    alert('File terlalu besar. Maksimal 10MB.')
  }
}

const removeMainFile = () => {
  form.mainFile = null
}

const removeSupportFile = (index) => {
  form.supportFiles.splice(index, 1)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getKategoriInstansiName = (id) => {
  const kategori = kategoriInstansiOptions.value.find(k => Number(k.kategori_id) === Number(id))
  return kategori ? kategori.kategori_name : ''
}

const getInstansiName = (id) => {
  // Cari di semua kategori
  for (const kategori of kategoriInstansiOptions.value) {
    const instansi = kategori.instansi.find(i => Number(i.instansi_id) === Number(id))
    if (instansi) return instansi.nama_instansi
  }
  return ''
}

const getLemdikName = (id) => {
  const lemdik = lemdikOptions.value.find(l => Number(l.id) === Number(id))
  return lemdik ? lemdik.namalemdik : ''
}

const getTrainingName = (id) => {
  const training = pelatihanOptions.value.find(p => Number(p.id) === Number(id))
  return training ? training.nama : ''
}

// File upload handlers
const handleMainFileUploaded = (fileData) => {
  form.mainFileData = fileData
  form.mainFile = null // Clear the file object since we have the uploaded data
}

const handleUploadError = (error) => {
  alert(`Error uploading file: ${error}`)
}

// Support file upload with Google Drive
const { uploadToGoogleDrive } = useFileUpload()

const handleSupportFiles = async (event) => {
  const files = Array.from(event.target.files)
  
  for (const file of files) {
    if (file.size <= 5 * 1024 * 1024) { // 5MB limit per file
      try {
        const result = await uploadToGoogleDrive(file)
        if (result.success && result.data) {
          form.supportFiles.push({
            ...result.data,
            originalFile: file
          })
        } else {
          alert(`Failed to upload ${file.name}: ${result.error}`)
        }
      } catch (error) {
        alert(`Error uploading ${file.name}: ${error.message}`)
      }
    } else {
      alert(`File ${file.name} terlalu besar. Maksimal 5MB per file.`)
    }
  }
}

const getTotalFiles = () => {
  return (form.mainFileData ? 1 : 0) + form.supportFiles.length
}

function validateProjectData(projectData) {
  const requiredFields = [
    'userId',
    'instansiId',
    'kategoriInstansiId',
    'lemdikId',
    'pelatihanId',
    'title',
    'description',
    'status'
  ]
  for (const field of requiredFields) {
    if (
      projectData[field] === undefined ||
      projectData[field] === null ||
      (typeof projectData[field] === 'string' && projectData[field].trim() === '')
    ) {
      return `Field ${field} wajib diisi.`
    }
  }
  return null
}

const submitProject = async () => {
  isSubmitting.value = true
  try {
    // Step 1: Get file URL from uploaded data
    const mainFileUrl = form.mainFileData?.url || null
    if (!mainFileUrl) {
      throw new Error('File utama belum diupload')
    }
    
    // Step 2: Get institution, lemdik, and training IDs from selected values
    // Gunakan data mentah (toRaw) untuk pencarian dan validasi
    const kategoriOptionsRaw = kategoriInstansiOptions.value.map(kat => toRaw(kat))
    const lemdikOptionsRaw = lemdikOptions.value.map(lem => toRaw(lem))
    const pelatihanOptionsRaw = pelatihanOptions.value.map(pel => toRaw(pel))
    
    // instansi sudah nested di kategori
    const selectedKategori = kategoriOptionsRaw.find(kat => Number(kat.id ?? kat.kategori_id) === Number(form.kategoriInstansi))
    const selectedInstansi = selectedKategori?.instansi?.map(inst => toRaw(inst)).find(inst => Number(inst.instansi_id) === Number(form.institution))
    const selectedLemdik = lemdikOptionsRaw.find(lem => Number(lem.id) === Number(form.lembagaDiklat))
    const selectedPelatihan = pelatihanOptionsRaw.find(pel => Number(pel.id) === Number(form.training))
    
    console.log('Selected:', {
      selectedInstansi,
      selectedKategori,
      selectedLemdik,
      selectedPelatihan
    })
    
    if (!selectedInstansi || !selectedKategori || !selectedLemdik || !selectedPelatihan) {
      console.log('ERROR DETAIL:', {
        selectedInstansi,
        selectedKategori,
        selectedLemdik,
        selectedPelatihan,
        formValues: {
          kategoriInstansi: form.kategoriInstansi,
          institution: form.institution,
          lembagaDiklat: form.lembagaDiklat,
          training: form.training
        }
      })
      throw new Error('Data instansi, kategori instansi, lemdik, atau pelatihan tidak valid')
    }
    
    // Step 3: Create project using the new API
    const projectData = {
      userId: 1, // TODO: Get from authentication/session
      instansiId: Number(selectedInstansi.instansi_id),
      kategoriInstansiId: Number(selectedKategori.kategori_id),
      lemdikId: Number(selectedLemdik.id),
      pelatihanId: Number(selectedPelatihan.id),
      title: form.title,
      description: form.description,
      nilaiEkonomi: form.nilaiEkonomi,
      detailNilaiEkonomi: Number(form.detailNilaiEkonomi.replace(/[^\d]/g, '')),
      publikasiMediaSosial: Array.isArray(form.publikasi.mediaSosial) ? form.publikasi.mediaSosial.filter(item => item.platform && item.linkMedia) : [],
      publikasiMediaMassa: Array.isArray(form.publikasi.mediaMassa) ? form.publikasi.mediaMassa.filter(item => item.namaMedia && item.linkBerita) : [],
      tags: Array.isArray(form.tags) ? form.tags : [],
      startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
      mainFileUrl: mainFileUrl,
      status: 'submitted',
      isApproved: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    console.log('Payload sebelum submit:', projectData)
    
    // Validasi data sebelum submit
    const validationError = validateProjectData(projectData)
    if (validationError) {
      throw new Error(validationError)
    }
    
    // Step 4: Submit project to API
    const projectResponse = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData)
    })
    
    const projectResult = await projectResponse.json()
    
    if (!projectResponse.ok || !projectResult.success) {
      throw new Error(projectResult.message || 'Gagal membuat project')
    }
    
    const newProject = projectResult.data
    console.log('Project berhasil dibuat:', newProject)
    
    // Step 5: Upload support files if any
    if (form.supportFiles.length > 0) {
      console.log('Uploading support files...')
      
      for (const supportFile of form.supportFiles) {
        try {
          const supportFileData = {
            projectId: newProject.id,
            fileUrl: supportFile.url || supportFile.shareUrl,
            fileName: supportFile.filename,
            fileType: supportFile.mimeType || 'document'
          }
          
          const supportResponse = await fetch('/api/project/support', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(supportFileData)
          })
          
          const supportResult = await supportResponse.json()
          
          if (!supportResponse.ok || !supportResult.success) {
            console.error('Gagal upload support file:', supportFile.filename, supportResult.message)
          } else {
            console.log('Support file berhasil diupload:', supportFile.filename)
          }
        } catch (supportError) {
          console.error('Error uploading support file:', supportFile.filename, supportError)
        }
      }
    }
    
    // Step 6: Success
    alert('Proyek berhasil disubmit!')
    
    // Clear form and redirect
    if (typeof window !== 'undefined') {
      localStorage.removeItem('project-draft')
    }
    
    // Redirect to project list or detail page
    await navigateTo('/daftar-proyek')
    
  } catch (error) {
    console.error('Submit error:', error)
    alert(`Terjadi kesalahan saat mengupload: ${error.message}`)
  } finally {
    isSubmitting.value = false
  }
}

// Auto-save draft (optional)
watchEffect(() => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('project-draft', JSON.stringify({
      ...form,
      mainFile: null, // Don't save file objects
      supportFiles: []
    }))
  }
})

// Load draft and fetch instansi & pelatihan on mount
onMounted(async () => {
  if (typeof window !== 'undefined') {
    const draft = localStorage.getItem('project-draft')
    if (draft) {
      const parsed = JSON.parse(draft)
      Object.assign(form, parsed)
    }
  }
  // Fetch kategori instansi options from API
  try {
    const res = await fetch('/api/instansi/kategori')
    const data = await res.json()
    if (data.success && Array.isArray(data.data)) {
      kategoriInstansiOptions.value = data.data
    }
  } catch (err) {
    console.error('Gagal fetch kategori instansi:', err)
  }
  
  // Fetch lemdik options from API
  try {
    const res = await fetch('/api/lemdik')
    const data = await res.json()
    if (data.success && Array.isArray(data.data)) {
      lemdikOptions.value = data.data
    }
  } catch (err) {
    console.error('Gagal fetch lemdik:', err)
  }
  // Fetch pelatihan options from API
  try {
    const res = await fetch('/api/pelatihan')
    const data = await res.json()
    if (data.success && Array.isArray(data.data)) {
      pelatihanOptions.value = data.data
    }
  } catch (err) {
    console.error('Gagal fetch pelatihan:', err)
  }
})
  // Validasi ulang value form setelah semua data di-fetch
  watch(
    [kategoriInstansiOptions, lemdikOptions, pelatihanOptions],
    () => {
      // Kategori Instansi
      if (
        !form.kategoriInstansi ||
        !kategoriInstansiOptions.value.some(k => Number(k.kategori_id) === Number(form.kategoriInstansi))
      ) {
        form.kategoriInstansi = Number(kategoriInstansiOptions.value[0]?.kategori_id) || ''
      }
      // Instansi
      let allInstansi = []
      kategoriInstansiOptions.value.forEach(k => {
        if (Array.isArray(k.instansi)) allInstansi.push(...k.instansi)
      })
      if (
        !form.institution ||
        !allInstansi.some(i => Number(i.instansi_id) === Number(form.institution))
      ) {
        // Pilih instansi pertama dari kategori yang dipilih
        const selectedKategori = kategoriInstansiOptions.value.find(k => Number(k.kategori_id) === Number(form.kategoriInstansi))
        form.institution = Number(selectedKategori?.instansi?.[0]?.instansi_id) || ''
      }
      // Lemdik
      if (
        !form.lembagaDiklat ||
        !lemdikOptions.value.some(l => Number(l.id) === Number(form.lembagaDiklat))
      ) {
        form.lembagaDiklat = Number(lemdikOptions.value[0]?.id) || ''
      }
      // Pelatihan
      if (
        !form.training ||
        !pelatihanOptions.value.some(p => Number(p.id) === Number(form.training))
      ) {
        form.training = Number(pelatihanOptions.value[0]?.id) || ''
      }
    },
    { immediate: true }
  )
</script>

<style scoped>
.steps .step:before {
  content: counter(step-counter);
}

.file-drop-zone {
  transition: all 0.3s ease;
}

.file-drop-zone:hover {
  border-color: #3B82F6;
  background-color: #F8FAFC;
}
</style>
