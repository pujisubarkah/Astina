<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Peta Kabupaten Provinsi {{ idProvinsi }}</h1>
    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else>
      <svg viewBox="0 0 800 600" class="w-full h-auto">
        <g v-for="kab in kabupatenData" :key="kab.id_kabupaten">
          <path
            :d="kab.svg_path"
            :fill="getColor(kab.jumlah)"
            stroke="#333"
            stroke-width="1"
            @click="selectKabupaten(kab)"
            style="cursor:pointer"
          />
        </g>
      </svg>
      <div class="mt-6">
        <h2 class="text-lg font-semibold mb-2">Statistik Kabupaten</h2>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th>Kabupaten</th>
              <th>Jumlah Proper</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="kab in kabupatenData" :key="kab.id_kabupaten">
              <td>{{ kab.id_kabupaten }}</td>
              <td>{{ kab.jumlah }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const idProvinsi = route.params.id || route.query.id_provinsi || ''
const kabupatenData = ref([])
const loading = ref(true)

function getColor(jumlah) {
  // Contoh: gradient dari biru ke merah
  if (!jumlah || jumlah === '0') return '#e0e0e0'
  const max = Math.max(...kabupatenData.value.map(k => Number(k.jumlah) || 0))
  const percent = max ? Number(jumlah) / max : 0
  // Biru (#3b82f6) ke Merah (#ef4444)
  const r = Math.round(59 + (239 - 59) * percent)
  const g = Math.round(130 + (68 - 130) * percent)
  const b = Math.round(246 + (68 - 246) * percent)
  return `rgb(${r},${g},${b})`
}

function selectKabupaten(kab) {
  alert(`Kabupaten ID: ${kab.id_kabupaten}\nJumlah Proper: ${kab.jumlah}`)
}

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch(`/api/proper/kabupaten/${idProvinsi}`)
    const json = await res.json()
    kabupatenData.value = json.data || []
  } catch (e) {
    kabupatenData.value = []
  }
  loading.value = false
})
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 6px 12px;
}
th {
  background: #f3f4f6;
}
</style>
