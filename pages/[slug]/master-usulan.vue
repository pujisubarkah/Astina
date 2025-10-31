<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4 text-blue-700">Data Master Usulan</h1>

    <p class="text-sm text-gray-700 mb-6">Daftar peserta yang telah masuk ke database. Gunakan tabel di bawah untuk meninjau nama, nomor identitas, dan jabatan/eselon peserta.</p>

    <div class="bg-white rounded shadow-sm p-4">
      <div v-if="loading" class="p-6 text-center text-gray-500">Memuat data peserta...</div>

      <div v-else>
        <table v-if="rows && rows.length" class="min-w-full table-auto text-sm">
          <thead>
            <tr class="bg-gray-100 text-left text-xs text-gray-600">
              <th class="px-4 py-2">No</th>
              <th class="px-4 py-2">Nama Lengkap / NIP/NRP</th>
              <th class="px-4 py-2">Jabatan / Eselon</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, idx) in rows" :key="r.id" class="border-t">
              <td class="px-4 py-3 align-top">{{ idx + 1 }}</td>
              <td class="px-4 py-3">
                <div class="font-medium">{{ r.nama || '-' }}</div>
                <div class="text-xs text-gray-500">{{ r.noIdentitas || '-' }}</div>
              </td>
              <td class="px-4 py-3">
                <div>{{ r.nomorKra || r.proyekPerubahan || '-' }}</div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="p-6 text-center text-gray-600">Belum ada peserta yang terdaftar.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({ layout: 'slug' })

const route = useRoute()
// Allow caller to override the data API via ?api=/api/my-endpoint
const apiUrl = route?.query?.api ? String(route.query.api) : '/api/proper'

const rows = ref([])
const loading = ref(true)

async function fetchRows() {
  loading.value = true
  try {
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error('Gagal mengambil data dari ' + apiUrl)
    const json = await res.json()
    if (json && json.success && Array.isArray(json.data)) {
      rows.value = json.data
    } else if (Array.isArray(json)) {
      // fallback if endpoint returns array directly
      rows.value = json
    } else if (json && Array.isArray(json.rows)) {
      // some endpoints return { rows: [...] }
      rows.value = json.rows
    } else {
      rows.value = []
    }
  } catch (err) {
    console.error('Fetch proper error', err)
    rows.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRows()
})
</script>

<style scoped>
/* Simple table responsiveness */
table { width: 100%; border-collapse: collapse; }
th, td { vertical-align: top; }
</style>
