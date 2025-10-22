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
              
              <!-- NIP dan Program Pelatihan di atas -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
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
                    @input="onNipOrPelatihanChange"
                  />
                  <label class="label">
                    <span class="label-text-alt text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Data akan terisi otomatis jika NIP dan Program Pelatihan sudah terdaftar
                    </span>
                  </label>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Program Pelatihan *</span>
                  </label>
                  <select class="select select-bordered w-full" v-model="form.training" required @change="onNipOrPelatihanChange">
                    <option :value="''">Pilih Program Pelatihan</option>
                    <option v-for="pelatihan in pelatihanOptions" :key="pelatihan.id" :value="Number(pelatihan.id)">
                      {{ pelatihan.nama }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Loading indicator for auto-fill -->
              <div v-if="isLoadingAutoFill" class="flex items-center justify-center p-4 bg-yellow-50 rounded-lg">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-yellow-700">Sedang mencari data yang sesuai...</span>
              </div>

              <!-- Auto-fill success message -->
              <div v-if="autoFillMessage" class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ autoFillMessage }}</span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Nama Lengkap *</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama lengkap Anda"
                    class="input input-bordered w-full"
                    :class="{ 'input-success': form.isAutoFilled }"
                    v-model="form.authorName"
                    required
                  />
                  <label v-if="form.isAutoFilled" class="label">
                    <span class="label-text-alt text-green-600">✓ Terisi otomatis</span>
                  </label>
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
                    <span class="label-text font-semibold">Nomor KRA</span>
                    <span class="label-text-alt text-gray-500">Otomatis terisi jika data ditemukan</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Akan terisi otomatis jika NIP dan Program Pelatihan terdaftar"
                    class="input input-bordered w-full bg-gray-50"
                    :class="{ 'input-success bg-green-50': form.isAutoFilled && form.nomorKra }"
                    v-model="form.nomorKra"
                    readonly
                    disabled
                  />
                  <label v-if="form.isAutoFilled && form.nomorKra" class="label">
                    <span class="label-text-alt text-green-600">✓ Terisi otomatis</span>
                  </label>
                  <label v-else class="label">
                    <span class="label-text-alt text-gray-500">Field ini tidak dapat diedit manual</span>
                  </label>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Kategori Instansi *</span>
                  </label>
                  <select class="select select-bordered w-full" 
                    :class="{ 'select-success': form.isAutoFilled }"
                    v-model="form.kategoriInstansi" required @change="onKategoriChange">
                    <option :value="''">Pilih Kategori Instansi</option>
                    <option v-for="kategori in kategoriOptions" :key="kategori.id" :value="Number(kategori.id)">
                      {{ kategori.nama }}
                    </option>
                  </select>
                  <label v-if="form.isAutoFilled" class="label">
                    <span class="label-text-alt text-green-600">✓ Terisi otomatis</span>
                  </label>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Kementerian/Lembaga/Pemerintah Daerah *</span>
                  </label>
                  <!-- Searchable Combobox for Instansi -->
                  <div class="relative">
                    <input
                      type="text"
                      class="input input-bordered w-full"
                      :class="{ 'input-success': form.isAutoFilled }"
                      placeholder="Ketik untuk mencari instansi..."
                      v-model="instansiQuery"
                      :disabled="!form.kategoriInstansi"
                      @focus="instansiOpen = true"
                      @input="onInstansiInput"
                    />
                    <ul v-if="instansiOpen && filteredInstansiQuery.length > 0" class="absolute z-50 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
                      <li
                        v-for="inst in filteredInstansiQuery"
                        :key="inst.instansi_id"
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        @click="selectInstansi(inst)"
                      >
                        {{ inst.nama_instansi }}
                      </li>
                    </ul>
                  </div>
                  <input type="hidden" :value="form.institution" />
                  <label v-if="form.isAutoFilled" class="label">
                    <span class="label-text-alt text-green-600">✓ Terisi otomatis</span>
                  </label>
                </div>

                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">Lembaga Diklat *</span>
                    </label>
                    <!-- Searchable Combobox for Lembaga Diklat -->
                    <div class="relative">
                      <input
                        type="text"
                        class="input input-bordered w-full"
                        :class="{ 'input-success': form.isAutoFilled }"
                        placeholder="Ketik untuk mencari Lembaga Diklat..."
                        v-model="lemdikQuery"
                        @focus="lemdikOpen = true"
                        @input="onLemdikInput"
                      />
                      <ul v-if="lemdikOpen && filteredLemdikQuery.length > 0" class="absolute z-50 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
                        <li
                          v-for="lem in filteredLemdikQuery"
                          :key="lem.id"
                          class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          @click="selectLemdik(lem)"
                        >
                          {{ lem.namalemdik }}
                        </li>
                      </ul>
                    </div>
                    <input type="hidden" :value="form.lembagaDiklat" />
                    <label v-if="form.isAutoFilled" class="label">
                      <span class="label-text-alt text-green-600">✓ Terisi otomatis</span>
                    </label>
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
                  :class="{ 'input-success': form.isAutoFilled && form.title }"
                  v-model="form.title"
                  required
                />
                <label class="label">
                  <span class="label-text-alt">{{ form.title.length }}/100 karakter</span>
                  <span v-if="form.isAutoFilled && form.title" class="label-text-alt text-green-600">✓ Terisi otomatis</span>
                </label>
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

              <!-- Asta Cita (dropdown) -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Asta Cita</span>
                  <span class="label-text-alt">Pilih salah satu Asta Cita</span>
                </label>
                <select class="select select-bordered w-full" v-model="form.astaCitaKe" @change="updateAstaCitaText">
                  <option value="">-- Pilih Asta Cita --</option>
                  <option v-for="opt in astacitaOptions" :key="opt.id" :value="opt.astacita_ke">
                    {{ opt.astacita_ke }} - {{ opt.astacita }}
                  </option>
                </select>
                <label class="label">
                  <span class="label-text-alt">Jika ingin, Anda bisa menambahkan catatan tambahan di kolom deskripsi.</span>
                </label>
              </div>

              <!-- SDGs -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">SDGs (Tujuan Pembangunan Berkelanjutan)</span>
                  <span class="label-text-alt">Pilih semua yang relevan</span>
                </label>
                <select class="select select-bordered w-full" v-model="form.sdgsKe" @change="updateSdgText">
                  <option value="">-- Pilih SDG --</option>
                  <option v-for="sdg in sdgOptions" :key="sdg.id" :value="sdg.tujuan_ke">{{ sdg.tujuan_ke }} - {{ sdg.sdgs }}</option>
                </select>
                <label class="label">
                  <span class="label-text-alt">Pilih SDG yang paling relevan.</span>
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
              
              <!-- Pertanyaan Awal: Apakah ada berkas pendukung -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Apakah produk pembelajaran memiliki berkas pendukung? *</span>
                </label>
                <div class="flex gap-4">
                  <label class="label cursor-pointer">
                    <input 
                      type="radio" 
                      name="hasBerkas" 
                      class="radio radio-primary" 
                      :value="true"
                      v-model="form.hasBerkasPendukung"
                    />
                    <span class="label-text ml-2">Ya</span>
                  </label>
                  <label class="label cursor-pointer">
                    <input 
                      type="radio" 
                      name="hasBerkas" 
                      class="radio radio-primary" 
                      :value="false"
                      v-model="form.hasBerkasPendukung"
                    />
                    <span class="label-text ml-2">Tidak</span>
                  </label>
                </div>
              </div>

              <!-- Jika Ya, tampilkan pilihan metode upload -->
              <div v-if="form.hasBerkasPendukung" class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Metode upload produk pembelajaran *</span>
                </label>
                <div class="flex gap-4">
                  <label class="label cursor-pointer">
                    <input 
                      type="radio" 
                      name="metodeUpload" 
                      class="radio radio-primary" 
                      value="link"
                      v-model="form.metodeUpload"
                    />
                    <span class="label-text ml-2">Melalui Link</span>
                  </label>
                  <label class="label cursor-pointer">
                    <input 
                      type="radio" 
                      name="metodeUpload" 
                      class="radio radio-primary" 
                      value="upload"
                      v-model="form.metodeUpload"
                    />
                    <span class="label-text ml-2">Upload File</span>
                  </label>
                </div>
              </div>

              <!-- Main Document -->
              <div v-if="form.hasBerkasPendukung" class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Dokumen Utama *</span>
                </label>
                
                <!-- Jika memilih melalui link -->
                <div v-if="form.metodeUpload === 'link'">
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/d/your-file-id/view"
                    class="input input-bordered w-full"
                    v-model="form.mainFileLink"
                    required
                  />
                  <label class="label">
                    <span class="label-text-alt">Lampirkan link/tautan dokumen produk pembelajaran yang telah diupload di GDrive/OneDrive dengan akses yang diatur terbuka (Anyone can view)</span>
                  </label>
                </div>
                
                <!-- Jika memilih upload file -->
                <div v-else-if="form.metodeUpload === 'upload'">
                  <UploadFile @fileUploaded="handleMainFileUploaded" @uploadError="handleUploadError" />
                </div>
              </div>

              <!-- Cover -->
              <div v-if="form.hasBerkasPendukung && form.metodeUpload" class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Cover (gambar)</span>
                  <span class="label-text-alt">Opsional - upload cover sebagai gambar (JPG/PNG)</span>
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <!-- Jika metode upload file -->
                  <template v-if="form.metodeUpload === 'upload'">
                    <input 
                      type="file" 
                      class="hidden" 
                      ref="supportFileInput"
                      @change="handleSupportFiles"
                      accept=".jpg,.jpeg,.png"
                      multiple
                    />
                    <p class="text-gray-600 mb-2">Upload cover (gambar: JPG/PNG)</p>
                    <p class="text-sm text-gray-500 mb-4">Preferensi: resolusi baik untuk thumbnail (Max 5MB)</p>
                    <button 
                      type="button" 
                      class="btn btn-outline btn-sm"
                      @click="$refs.supportFileInput.click()"
                    >
                      Tambah Cover
                    </button>
                  </template>
                  <!-- Jika metode link -->
                  <template v-else-if="form.metodeUpload === 'link'">
                    <p class="text-gray-600 mb-2">Masukkan link file pendukung (Google Drive, OneDrive, dll.)</p>
                    <div class="space-y-2">
                      <div v-for="(link, idx) in form.supportLinks" :key="idx" class="flex gap-2">
                        <input 
                          type="url" 
                          v-model="form.supportLinks[idx]" 
                          class="input input-bordered flex-1 input-sm" 
                          placeholder="https://drive.google.com/file/d/your-file-id/view"
                        />
                        <button type="button" class="btn btn-ghost btn-sm text-red-500" @click="removeSupportLink(idx)">✕</button>
                      </div>
                      <button type="button" class="btn btn-outline btn-sm" @click="addSupportLink">Tambah Link</button>
                    </div>
                    <label class="label">
                      <span class="label-text-alt">Lampirkan link file pendukung dengan akses yang diatur terbuka (Anyone can view)</span>
                    </label>
                  </template>
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
                    <p class="font-semibold text-gray-700">Berkas Pendukung:</p>
                    <span class="badge badge-secondary">{{ form.hasBerkasPendukung ? 'Ya' : 'Tidak' }}</span>
                  </div>
                  <div v-if="form.hasBerkasPendukung && form.metodeUpload">
                    <p class="font-semibold text-gray-700">Metode Upload:</p>
                    <span class="badge badge-outline">{{ form.metodeUpload === 'link' ? 'Melalui Link' : 'Upload File' }}</span>
                  </div>
                  <div v-if="form.hasBerkasPendukung">
                    <p class="font-semibold text-gray-700">Total File:</p>
                    <span class="badge badge-secondary">{{ getTotalFiles() }} file</span>
                  </div>
                </div>
                
                <div v-if="form.hasBerkasPendukung" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div v-if="form.mainFileData && form.metodeUpload === 'upload'">
                    <p class="font-semibold text-gray-700">Dokumen Utama:</p>
                    <span class="badge badge-primary">{{ form.mainFileData.filename }}</span>
                  </div>
                  <div v-if="form.mainFileLink && form.metodeUpload === 'link'">
                    <p class="font-semibold text-gray-700">Link Dokumen Utama:</p>
                    <a :href="form.mainFileLink" target="_blank" class="text-blue-500 hover:underline text-sm truncate block">
                      {{ form.mainFileLink }}
                    </a>
                  </div>
                  <div v-if="form.supportFiles.length > 0">
                    <p class="font-semibold text-gray-700">File Pendukung:</p>
                    <span class="badge badge-outline">{{ form.supportFiles.length }} file</span>
                  </div>
                  <div v-if="form.supportLinks.filter(l => l && l.trim()).length > 0">
                    <p class="font-semibold text-gray-700">Link Pendukung:</p>
                    <span class="badge badge-outline">{{ form.supportLinks.filter(l => l && l.trim()).length }} link</span>
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

// Helper to coerce numbers safely; returns undefined for '', null, NaN
const maybeNumber = (v) => {
  if (v === undefined || v === null || v === '') return undefined
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}

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
  proper_id: null, // ID dari tabel proper untuk tracking
  isAutoFilled: false, // Flag untuk menandai data yang terisi otomatis
  
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
  astaCitaKe: '',
  sdgsKe: '',
  sdgsText: '',
  nilaiEkonomi: '',
  detailNilaiEkonomi: '',
  progress: 0,
  tagsInput: '',
  tags: [],
  startDate: '',
  endDate: '',
  
  // Step 3
  hasBerkasPendukung: null, // true/false untuk apakah ada berkas pendukung
  metodeUpload: '', // 'link' atau 'upload'
  mainFile: null,
  mainFileData: null, // Store uploaded file data from Dropbox
  // If training requires link-based upload (pelatihan 3/4) we store link(s)
  mainFileLink: '',
  supportLinks: [''],
  supportFiles: [],
  
  // Step 4
  agreeTerms: false,
  agreeAccuracy: false
})

// State untuk auto-fill
const isLoadingAutoFill = ref(false)
const autoFillMessage = ref('')

// Asta Cita options fetched from API
const astacitaOptions = ref([])

const fetchAstaCitaOptions = async () => {
  try {
    const res = await fetch('/api/astacita')
    const json = await res.json()
    if (json.success && Array.isArray(json.data)) {
      astacitaOptions.value = json.data
    }
  } catch (e) {
    astacitaOptions.value = []
  }
}

const updateAstaCitaText = () => {
  const selected = astacitaOptions.value.find(a => Number(a.astacita_ke) === Number(form.astaCitaKe) || Number(a.id) === Number(form.astaCitaKe))
  form.astaCita = selected ? selected.astacita : ''
}

const updateSdgText = () => {
  const selected = sdgOptions.value.find(s => Number(s.tujuan_ke) === Number(form.sdgsKe) || Number(s.id) === Number(form.sdgsKe))
  form.sdgsText = selected ? selected.sdgs : ''
}

const nilaiEkonomiOptions = computed(() => {
  // Cari pelatihan yang dipilih berdasarkan ID (gunakan cast ke Number untuk aman)
  const selected = pelatihanOptions.value.find(p => Number(p.id) === Number(form.training))
  const id = Number(selected?.id)

  // Gunakan label yang konsisten dan mudah dibaca
  if (id === 1 || id === 2) {
    return [
      'Kurang dari Rp 100.000.000',
      'Rp 100.000.000 - Rp 1.000.000.000',
      'Rp 1.000.000.001 - Rp 10.000.000.000',
      'Lebih dari Rp 10.000.000.000'
    ]
  } else if (id === 3 || id === 4) {
    return [
      'Kurang dari Rp 50.000.000',
      'Rp 50.000.000 - Rp 100.000.000',
      'Rp 100.000.001 - Rp 500.000.000',
      'Lebih dari Rp 500.000.000'
    ]
  }

  return []
})

// SDGs will be fetched from API
const sdgOptions = ref([])
const fetchSdgOptions = async () => {
  try {
    const res = await fetch('/api/sdgs')
    const json = await res.json()
    if (json.success && Array.isArray(json.data)) sdgOptions.value = json.data
  } catch (e) {
    sdgOptions.value = []
  }
}

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

// Searchable combobox state for Instansi
const instansiQuery = ref('')
const instansiOpen = ref(false)
const filteredInstansiQuery = computed(() => {
  const list = filteredInstansiOptions.value || []
  const q = instansiQuery.value.trim().toLowerCase()
  if (!q) return list
  return list.filter(i => (i.nama_instansi || '').toLowerCase().includes(q))
})

function onInstansiInput() {
  instansiOpen.value = true
}

function selectInstansi(inst) {
  form.institution = Number(inst.instansi_id)
  instansiQuery.value = inst.nama_instansi
  instansiOpen.value = false
}

// Close dropdown when clicking outside
if (process.client) {
  window.addEventListener('click', (e) => {
    const path = e.composedPath ? e.composedPath() : []
    // crude check: close both dropdowns on outside click
    const clickedInput = path.some((el) => {
      try {
        return el && el.classList && typeof el.classList.contains === 'function' && el.classList.contains('input')
      } catch (err) {
        return false
      }
    })
    if (!clickedInput) {
      instansiOpen.value = false
      lemdikOpen.value = false
    }
  })
}

// Searchable combobox state for Lemdik
const lemdikQuery = ref('')
const lemdikOpen = ref(false)
const filteredLemdikQuery = computed(() => {
  const list = lemdikOptions.value || []
  const q = lemdikQuery.value.trim().toLowerCase()
  if (!q) return list
  return list.filter(l => (l.namalemdik || '').toLowerCase().includes(q))
})

function onLemdikInput() {
  lemdikOpen.value = true
}

function selectLemdik(lem) {
  form.lembagaDiklat = Number(lem.id)
  lemdikQuery.value = lem.namalemdik
  lemdikOpen.value = false
}

// Computed properties
const canProceed = computed(() => {
  const result = (() => {
    switch (currentStep.value) {
      case 1:
        return form.authorName && form.email && form.kategoriInstansi && form.institution && form.lembagaDiklat && form.training
      case 2:
        return form.title && form.description && form.nilaiEkonomi && form.detailNilaiEkonomi
      case 3:
        // Jika tidak ada berkas pendukung, bisa langsung lanjut
        if (form.hasBerkasPendukung === false) {
          return true
        }
        // Jika ada berkas pendukung, harus pilih metode dan isi sesuai metode
        if (form.hasBerkasPendukung === true) {
          if (!form.metodeUpload) return false
          if (form.metodeUpload === 'link') {
            return form.mainFileLink && form.mainFileLink.trim() !== ''
          }
          if (form.metodeUpload === 'upload') {
            return form.mainFileData
          }
        }
        // Jika belum pilih ya/tidak
        return form.hasBerkasPendukung !== null
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
  form.institution = undefined
}

// Fungsi untuk auto-fill data berdasarkan NIP dan Program Pelatihan
const autoFillFromProper = async () => {
  // Reset pesan dan status auto-fill
  autoFillMessage.value = ''
  form.isAutoFilled = false
  
  // Validasi input
  if (!form.nip || !form.training) {
    return
  }

  isLoadingAutoFill.value = true

  try {
    const response = await fetch(`/api/proper/autofill?nip=${encodeURIComponent(form.nip)}&pelatihanId=${form.training}`)
    const result = await response.json()

    if (result.success && result.data) {
      const data = result.data
      
      // Fill form data
      form.proper_id = data.proper_id
      form.authorName = data.authorName
      form.email = data.email || form.email // Gunakan yang sudah ada jika kosong
      form.kategoriInstansi = data.kategoriInstansi
      form.institution = data.institution
      form.lembagaDiklat = data.lembagaDiklat
      form.title = data.title
      form.nomorKra = data.nomorKra || ''
      
      // Update combobox queries
      instansiQuery.value = data.institutionName
      lemdikQuery.value = data.lembagaDiklatName
      
      // Set flag auto-filled
      form.isAutoFilled = true
      autoFillMessage.value = result.message
      
      // Auto-hide message after 5 seconds
      setTimeout(() => {
        autoFillMessage.value = ''
      }, 5000)

    } else {
      // Data tidak ditemukan, reset flag dan clear auto-filled fields
      form.isAutoFilled = false
      form.proper_id = null
      form.nomorKra = '' // Reset nomor KRA
      
      if (result.message && result.message !== 'Data tidak ditemukan untuk NIP dan Program Pelatihan tersebut') {
        console.warn('Auto-fill warning:', result.message)
      }
    }
  } catch (error) {
    console.error('Error during auto-fill:', error)
    form.isAutoFilled = false
    form.proper_id = null
    form.nomorKra = '' // Reset nomor KRA on error
  } finally {
    isLoadingAutoFill.value = false
  }
}

// Handler untuk perubahan NIP atau Program Pelatihan
const onNipOrPelatihanChange = () => {
  // Debounce untuk menghindari terlalu banyak request
  clearTimeout(window.autoFillTimeout)
  window.autoFillTimeout = setTimeout(() => {
    autoFillFromProper()
  }, 500) // 500ms delay
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

const addSupportLink = () => {
  if (!Array.isArray(form.supportLinks)) {
    form.supportLinks = []
  }
  form.supportLinks.push('')
}

const removeSupportLink = (index) => {
  form.supportLinks.splice(index, 1)
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
  // If metode upload is not 'upload', ignore file input
  if (form.metodeUpload !== 'upload') {
    return
  }

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
  if (!form.hasBerkasPendukung) return 0
  
  let total = 0
  
  // Count main file/link
  if (form.metodeUpload === 'upload' && form.mainFileData) {
    total += 1
  } else if (form.metodeUpload === 'link' && form.mainFileLink && form.mainFileLink.trim()) {
    total += 1
  }
  
  // Count support files/links
  total += form.supportFiles.length
  total += form.supportLinks.filter(l => l && l.trim()).length
  
  return total
}

function validateProjectData(projectData) {
  const requiredFields = [
    'userId',
    'instansiId',
    'kategoriInstansiId',
    'lemdikId',
    'pelatihanId',
    'nip',
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
    // Step 1: Get file URL from uploaded data or link depending on user choice
    let mainFileUrl = null
    
    // Jika tidak ada berkas pendukung, set null
    if (form.hasBerkasPendukung === false) {
      mainFileUrl = null
    } else if (form.hasBerkasPendukung === true) {
      // Jika ada berkas pendukung, ambil sesuai metode yang dipilih
      if (form.metodeUpload === 'link') {
        mainFileUrl = form.mainFileLink ? String(form.mainFileLink).trim() : null
        if (!mainFileUrl) {
          throw new Error('Silakan masukkan link file utama')
        }
      } else if (form.metodeUpload === 'upload') {
        mainFileUrl = form.mainFileData?.url || null
        if (!mainFileUrl) {
          throw new Error('File utama belum diupload')
        }
      } else {
        throw new Error('Silakan pilih metode upload')
      }
    } else {
      throw new Error('Silakan pilih apakah ada berkas pendukung')
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
    // Helper to coerce numbers safely; returns undefined for '', null, NaN
    const maybeNumber = (v) => {
      if (v === undefined || v === null || v === '') return undefined
      const n = Number(v)
      return Number.isFinite(n) ? n : undefined
    }

    const instansiIdSafe = maybeNumber(selectedInstansi?.instansi_id)
    const kategoriInstansiIdSafe = maybeNumber(selectedKategori?.kategori_id ?? selectedKategori?.id ?? selectedKategori?.kategori_id)
    const lemdikIdSafe = maybeNumber(selectedLemdik?.id)
    const pelatihanIdSafe = maybeNumber(selectedPelatihan?.id)
    const detailNilaiSafe = (() => {
      if (!form.detailNilaiEkonomi) return undefined
      const cleaned = String(form.detailNilaiEkonomi).replace(/[^\d-]/g, '')
      return maybeNumber(cleaned)
    })()
    const sdgsKeSafe = maybeNumber(form.sdgsKe)
    const astaCitaKeSafe = maybeNumber(form.astaCitaKe)

    const projectData = {
      userId: 1, // TODO: Get from authentication/session
      nip: String(form.nip || ''),
      title: form.title,
      description: form.description,
      nilaiEkonomi: form.nilaiEkonomi || undefined,
      publikasiMediaSosial: Array.isArray(form.publikasi.mediaSosial) ? form.publikasi.mediaSosial.filter(item => item.platform && item.linkMedia) : [],
      publikasiMediaMassa: Array.isArray(form.publikasi.mediaMassa) ? form.publikasi.mediaMassa.filter(item => item.namaMedia && item.linkBerita) : [],
      tags: Array.isArray(form.tags) ? form.tags : [],
      mainFileUrl: mainFileUrl,
      supportLinks: Array.isArray(form.supportLinks) ? form.supportLinks.filter(l => l && l.trim() !== '') : [],
      status: 'submitted',
      isApproved: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Tambahkan proper_id jika data berasal dari auto-fill
    if (form.proper_id) {
      projectData.properId = form.proper_id
    }

    if (instansiIdSafe !== undefined) projectData.instansiId = instansiIdSafe
    if (kategoriInstansiIdSafe !== undefined) projectData.kategoriInstansiId = kategoriInstansiIdSafe
    if (lemdikIdSafe !== undefined) projectData.lemdikId = lemdikIdSafe
    if (pelatihanIdSafe !== undefined) projectData.pelatihanId = pelatihanIdSafe
    if (detailNilaiSafe !== undefined) projectData.detailNilaiEkonomi = detailNilaiSafe
    if (sdgsKeSafe !== undefined) projectData.sdgs = sdgsKeSafe
    if (astaCitaKeSafe !== undefined) projectData.astacita = astaCitaKeSafe
    if (form.sdgsText) projectData.sdgsText = form.sdgsText
    if (form.astaCita) projectData.astaCita = form.astaCita
    if (form.startDate) projectData.startDate = new Date(form.startDate).toISOString()
    if (form.endDate) projectData.endDate = new Date(form.endDate).toISOString()
    
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
    
    if (!projectResponse.ok) {
      // Handle duplicate (409) specially
      if (projectResponse.status === 409) {
        alert(projectResult.message || 'Anda telah mengisi form ini sebelumnya untuk kombinasi NIP dan Program Pelatihan yang sama.')
        return
      }
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

// Watch for changes in hasBerkasPendukung to reset related fields
watch(() => form.hasBerkasPendukung, (newVal) => {
  if (newVal === false) {
    // Reset all file-related fields when user selects "Tidak"
    form.metodeUpload = ''
    form.mainFileLink = ''
    form.mainFileData = null
    form.mainFile = null
    form.supportFiles = []
    form.supportLinks = ['']
  }
})

// Watch for changes in metodeUpload to reset related fields
watch(() => form.metodeUpload, (newVal) => {
  if (newVal === 'link') {
    // Clear uploaded file data when switching to link method
    form.mainFileData = null
    form.mainFile = null
    form.supportFiles = []
  } else if (newVal === 'upload') {
    // Clear link data when switching to upload method
    form.mainFileLink = ''
    form.supportLinks = ['']
  }
})

// Watch for manual changes to auto-filled fields to reset auto-fill status
watch([
  () => form.authorName,
  () => form.email,
  () => form.kategoriInstansi,
  () => form.institution,
  () => form.lembagaDiklat,
  () => form.title,
  () => form.nomorKra
], () => {
  // Reset auto-fill status if user manually edits fields
  if (form.isAutoFilled) {
    // Small delay to avoid triggering on programmatic changes
    setTimeout(() => {
      autoFillMessage.value = ''
    }, 100)
  }
}, { deep: false })

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
  // Fetch Asta Cita options
  try {
    await fetchAstaCitaOptions()
  } catch (e) {
    console.error('Gagal fetch Asta Cita options:', e)
  }
  // Fetch SDG options
  try {
    await fetchSdgOptions()
  } catch (e) {
    console.error('Gagal fetch SDG options:', e)
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
        form.kategoriInstansi = maybeNumber(kategoriInstansiOptions.value[0]?.kategori_id)
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
        form.institution = maybeNumber(selectedKategori?.instansi?.[0]?.instansi_id)
      }
      // Lemdik
      if (
        !form.lembagaDiklat ||
        !lemdikOptions.value.some(l => Number(l.id) === Number(form.lembagaDiklat))
      ) {
        form.lembagaDiklat = maybeNumber(lemdikOptions.value[0]?.id)
      }
      // Pelatihan
      if (
        !form.training ||
        !pelatihanOptions.value.some(p => Number(p.id) === Number(form.training))
      ) {
        form.training = maybeNumber(pelatihanOptions.value[0]?.id)
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
