<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4 text-blue-700">Data Master Usulan</h1>

    <p class="text-sm text-gray-700 mb-6">Daftar peserta yang telah masuk ke database. Gunakan tabel di bawah untuk meninjau nama, nomor identitas, dan jabatan peserta.</p>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">NIP/NRP</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Jabatan</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-for="(peserta, index) in dataPeserta" :key="index" class="hover:bg-slate-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{{ peserta.nama }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ peserta.nip }}</td>
              <td class="px-6 py-4 text-sm text-slate-900">{{ peserta.jabatan }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <div class="text-sm text-slate-700">
          Menampilkan {{ dataPeserta.length }} peserta
        </div>
        <div class="flex space-x-2">
          <button
            class="px-3 py-1 border border-slate-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Sebelumnya
          </button>
          <button
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
import { ref } from 'vue'

definePageMeta({ layout: 'slug' })

// Data dummy peserta
const dataPeserta = ref([
  {
    nama: 'Dr. Ahmad Budiman S.Sos M.Si',
    nip: '198501012010011001',
    jabatan: 'Kepala Bidang Perencanaan'
  },
  {
    nama: 'Siti Nurhaliza S.AP M.AP',
    nip: '198612152011012002',
    jabatan: 'Kepala Seksi Monitoring'
  },
  {
    nama: 'Budi Santoso S.Kom M.Kom',
    nip: '199003202015021001',
    jabatan: 'Analis Kebijakan'
  },
  {
    nama: 'Dewi Lestari S.E M.M',
    nip: '198803102012012003',
    jabatan: 'Kepala Sub Bagian Kepegawaian'
  },
  {
    nama: 'Eko Prasetyo S.H M.H',
    nip: '199205152017011002',
    jabatan: 'Jaksa Muda'
  },
  {
    nama: 'Rina Wijaya S.Psi M.Psi',
    nip: '199108242016012001',
    jabatan: 'Kepala Seksi SDM'
  },
  {
    nama: 'Agus Setiawan S.T M.T',
    nip: '198905132014011001',
    jabatan: 'Kepala Bidang Infrastruktur'
  },
  {
    nama: 'Maya Sari S.Ak M.Ak',
    nip: '199212102017012002',
    jabatan: 'Analis Keuangan'
  },
  {
    nama: 'Bambang Hartono S.I.P M.Si',
    nip: '198706152013011001',
    jabatan: 'Kepala Seksi Hubungan Masyarakat'
  },
  {
    nama: 'Lina Marlina S.Kom M.Kom',
    nip: '199403152018012001',
    jabatan: 'Analis Sistem Informasi'
  }
])
</script>

