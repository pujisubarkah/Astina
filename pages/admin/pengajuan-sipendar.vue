<template>
  <div class="p-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">Pengajuan Sipendar</h1>
      <p class="text-slate-600">Kelola pengajuan program SIPENDAR dari berbagai instansi</p>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Total Pengajuan</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Menunggu Review</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.pending }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Disetujui</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.approved }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-red-100 text-red-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-600">Ditolak</p>
            <p class="text-2xl font-bold text-slate-900">{{ stats.rejected }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex flex-wrap gap-4 items-end">
        <div class="flex-1 min-w-64">
          <label class="block text-sm font-medium text-slate-700 mb-2">Cari</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Cari nama atau NIP..."
            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="min-w-48">
          <label class="block text-sm font-medium text-slate-700 mb-2">Instansi</label>
          <select
            v-model="filters.instansiId"
            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Instansi</option>
            <option v-for="inst in instansiOptions" :key="inst.instansi_id" :value="inst.instansi_id">
              {{ inst.nama_instansi }}
            </option>
          </select>
        </div>

        <div class="min-w-48">
          <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
          <select
            v-model="filters.status"
            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="pending">Menunggu Review</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>

        <button
          @click="applyFilters"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Terapkan Filter
        </button>
        
        <button
          @click="resetFilters"
          class="px-6 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Applications Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between items-center">
        <div class="flex items-center gap-4">
          <h3 class="text-lg font-medium text-slate-900">Daftar Pengajuan</h3>
          <div class="flex items-center gap-2">
            <label class="text-sm text-slate-600">Tampilkan:</label>
            <select
              v-model="itemsPerPage"
              @change="changeItemsPerPage"
              class="px-3 py-1 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
            <span class="text-sm text-slate-600">baris</span>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">NIP</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Instansi</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pangkat/Golongan</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Jabatan</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Eselon</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-for="(item, index) in applications" :key="item.id" class="hover:bg-slate-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ item.nip || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{{ item.nama || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ item.instansi || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ item.pangkat_golongan || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ item.jabatan || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ item.eselon || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(item.status)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ getStatusText(item.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex gap-2">
                  <button
                    v-if="item.status === 'pending'"
                    @click="approveApplication(item)"
                    class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-xs"
                  >
                    Setujui
                  </button>
                  <button
                    v-if="item.status === 'pending'"
                    @click="rejectApplication(item)"
                    class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs"
                  >
                    Tolak
                  </button>
                  <button
                    @click="viewApplication(item)"
                    class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  >
                    Detail
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <div class="text-sm text-slate-700">
          Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} sampai {{ Math.min(currentPage * itemsPerPage, totalItems) }} dari {{ totalItems }} hasil
        </div>
        <div class="flex space-x-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-slate-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Sebelumnya
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-slate-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Page meta
definePageMeta({
  layout: 'admin'
})

// Reactive data
const stats = ref({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0
})

const applications = ref([])
const instansiOptions = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = ref(0)
const totalPages = ref(0)

const filters = ref({
  search: '',
  instansiId: '',
  status: ''
})

// Methods
const applyFilters = () => {
  currentPage.value = 1
  fetchApplications()
}

const resetFilters = () => {
  filters.value = {
    search: '',
    instansiId: '',
    status: ''
  }
  currentPage.value = 1
  fetchApplications()
}

const fetchInstansiOptions = async () => {
  try {
    const res = await fetch('/api/instansi')
    if (!res.ok) return
    const response = await res.json()
    if (response.success && response.data) {
      instansiOptions.value = response.data
    }
  } catch (e) {
    console.warn('Failed to fetch instansi options:', e)
  }
}

const fetchApplications = async () => {
  try {
    // This would be replaced with actual API call
    // For now, using mock data
    applications.value = [
      {
        id: 1,
        nip: '198501012010011001',
        nama: 'Ahmad Surya Wijaya',
        instansi: 'Kementerian Agama',
        pangkat_golongan: 'Pembina / IV/a',
        jabatan: 'Kepala Seksi',
        eselon: 'IV/a',
        keterangan: 'Memenuhi syarat',
        status: 'pending'
      },
      {
        id: 2,
        nip: '198703152011012002',
        nama: 'Siti Nurhaliza',
        instansi: 'Kementerian Keuangan',
        pangkat_golongan: 'Penata Tk.I / III/d',
        jabatan: 'Kepala Sub Bagian',
        eselon: 'IV/b',
        keterangan: 'Sudah diverifikasi',
        status: 'approved'
      },
      {
        id: 3,
        nip: '198209082009011003',
        nama: 'Budi Santoso',
        instansi: 'Kementerian Dalam Negeri',
        pangkat_golongan: 'Pembina / IV/a',
        jabatan: 'Kabid Administrasi',
        eselon: 'III/b',
        keterangan: 'Menunggu verifikasi',
        status: 'pending'
      },
      {
        id: 4,
        nip: '199001052015011004',
        nama: 'Rina Marlina',
        instansi: 'BPS Provinsi Jawa Barat',
        pangkat_golongan: 'Penata / III/c',
        jabatan: 'Staf Ahli',
        eselon: '-',
        keterangan: 'Dokumen tidak lengkap',
        status: 'rejected'
      }
    ]
    
    // Calculate stats
    stats.value.total = applications.value.length
    stats.value.pending = applications.value.filter(a => a.status === 'pending').length
    stats.value.approved = applications.value.filter(a => a.status === 'approved').length
    stats.value.rejected = applications.value.filter(a => a.status === 'rejected').length
    
    totalItems.value = applications.value.length
    totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value)
  } catch (error) {
    console.error('Error fetching applications:', error)
  }
}

const changeItemsPerPage = () => {
  currentPage.value = 1
  fetchApplications()
}

const approveApplication = async (item) => {
  // Implement approval logic
  if (confirm(`Apakah Anda yakin ingin menyetujui pengajuan dari ${item.nama}?`)) {
    try {
      // TODO: Call API to approve
      // await fetch(`/api/pengajuan/${item.id}/approve`, { method: 'POST' })
      
      item.status = 'approved'
      item.keterangan = 'Disetujui oleh admin'
      
      // Update stats
      stats.value.pending--
      stats.value.approved++
      
      alert('Pengajuan berhasil disetujui')
    } catch (error) {
      console.error('Error approving application:', error)
      alert('Gagal menyetujui pengajuan')
    }
  }
}

const rejectApplication = async (item) => {
  const reason = prompt(`Masukkan alasan penolakan untuk ${item.nama}:`)
  
  if (reason) {
    try {
      // TODO: Call API to reject
      // await fetch(`/api/pengajuan/${item.id}/reject`, { 
      //   method: 'POST',
      //   body: JSON.stringify({ reason })
      // })
      
      item.status = 'rejected'
      item.keterangan = reason
      
      // Update stats
      stats.value.pending--
      stats.value.rejected++
      
      alert('Pengajuan berhasil ditolak')
    } catch (error) {
      console.error('Error rejecting application:', error)
      alert('Gagal menolak pengajuan')
    }
  }
}

const viewApplication = (item) => {
  // Navigate to detail page
  console.log('Viewing application:', item.id)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchApplications()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchApplications()
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID')
}

const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-slate-100 text-slate-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'Menunggu Review'
    case 'approved':
      return 'Disetujui'
    case 'rejected':
      return 'Ditolak'
    default:
      return status
  }
}

// Lifecycle
onMounted(() => {
  fetchInstansiOptions()
  fetchApplications()
})
</script>