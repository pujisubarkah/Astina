<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4 text-blue-700">Setujui Produk</h1>
    <p>Halaman ini digunakan untuk meninjau dan menyetujui produk pembelajaran yang diajukan oleh user.</p>

    <div class="mb-6">
      <div class="flex gap-3 items-center">
        <input v-model="filters.q" placeholder="Cari judul, instansi, atau NIP" class="input input-bordered w-96" />
        <select v-model="filters.pelatihanId" class="select select-bordered">
          <option value="">Semua Pelatihan</option>
          <option v-for="p in pelatihanOptions" :key="p.id" :value="p.id">{{ p.nama }}</option>
        </select>
        <select v-model="filters.isApproved" class="select select-bordered">
          <option value="">Semua Status</option>
          <option :value="false">Menunggu</option>
          <option :value="true">Disetujui</option>
        </select>
        <button class="btn btn-sm btn-primary" @click="fetchProjects">Terapkan</button>
        <button class="btn btn-sm" @click="resetFilters">Reset</button>
      </div>
    </div>

    <!-- Projects table -->
    <div class="overflow-x-auto bg-white rounded shadow"> 
      <table class="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Pelatihan</th>
            <th>Instansi / NIP</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, idx) in projects" :key="p.id">
            <td>{{ idx + 1 }}</td>
            <td class="max-w-xs break-words">{{ p.title }}</td>
            <td>{{ lookupPelatihan(p.pelatihanId) }}</td>
            <td>{{ p.instansiName || '-' }} / {{ p.nip || '-' }}</td>
            <td>{{ formatDate(p.createdAt) }}</td>
            <td>
              <span v-if="p.isApproved" class="text-green-600">Disetujui</span>
              <span v-else class="text-yellow-600">Menunggu</span>
            </td>
            <td>
              <button v-if="!p.isApproved" class="btn btn-xs btn-success mr-2" @click="approve(p)">Setujui</button>
              <button v-if="p.isApproved" class="btn btn-xs btn-warning mr-2" @click="unapprove(p)">Batalkan</button>
              <button class="btn btn-xs btn-outline" @click="openDetail(p)">Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Tambahkan logic approval proyek di sini
definePageMeta({
  layout: 'admin'
})

import { ref, onMounted } from 'vue'

const projects = ref([])
const pelatihanOptions = ref([])

const filters = ref({
  q: '',
  pelatihanId: '',
  isApproved: ''
})

function resetFilters() {
  filters.value = { q: '', pelatihanId: '', isApproved: '' }
  fetchProjects()
}

function formatDate(d) {
  if (!d) return '-'
  try { return new Date(d).toLocaleString() } catch { return d }
}

async function fetchPelatihanOptions() {
  try {
    const res = await fetch('/api/pelatihan')
    if (!res.ok) return
    pelatihanOptions.value = await res.json()
  } catch (e) {
    // ignore
  }
}

function lookupPelatihan(id) {
  const p = pelatihanOptions.value.find(x => Number(x.id) === Number(id))
  return p ? p.nama : '-'
}

async function fetchProjects() {
  try {
    const params = new URLSearchParams()
    if (filters.value.q) params.append('q', filters.value.q)
    if (filters.value.pelatihanId) params.append('pelatihan_id', filters.value.pelatihanId)
    if (filters.value.isApproved !== '') params.append('isApproved', String(filters.value.isApproved))

    const res = await fetch('/api/project' + (params.toString() ? `?${params.toString()}` : ''))
    if (!res.ok) {
      console.error('Failed to load projects')
      return
    }
    const json = await res.json()
    projects.value = json.data || json
  } catch (error) {
    console.error('Error fetching projects', error)
  }
}

async function approve(p) {
  try {
    const res = await fetch('/api/project/approval', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: p.id, isApproved: true })
    })
    if (res.ok) {
      await fetchProjects()
    } else {
      alert('Gagal menyetujui proyek')
    }
  } catch (e) { console.error(e); alert('Gagal menyetujui proyek') }
}

async function unapprove(p) {
  try {
    const res = await fetch('/api/project/approval', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: p.id, isApproved: false })
    })
    if (res.ok) await fetchProjects()
  } catch (e) { console.error(e) }
}

function openDetail(p) {
  // open project detail in new tab — adjust route if your detail page path differs
  window.open(`/proyek/${p.id}`,'_blank')
}

onMounted(() => {
  fetchPelatihanOptions()
  fetchProjects()
})
</script>
