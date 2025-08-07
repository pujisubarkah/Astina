// composables/useProvinsi.ts
// Composable untuk akses data provinsi via API backend

export const useProvinsi = () => {
  // Ambil semua data provinsi
  const getProvinsi = async () => {
    return await $fetch('/api/provinsi')
  }

  // Tambah data provinsi baru
  const addProvinsi = async (payload: { nama: string, svgPath?: string, idProvinsi?: number }) => {
    return await $fetch('/api/provinsi', { method: 'POST', body: payload })
  }

  return { getProvinsi, addProvinsi }
}