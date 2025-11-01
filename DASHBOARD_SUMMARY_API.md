# Dashboard Summary API Documentation

## Overview
API endpoint tunggal yang menggabungkan data dari tiga endpoint berbeda untuk dashboard summary.

## Endpoint

### GET /api/dashboard/summary
Mengambil data gabungan dari:
- `/api/proper/summary_program` - Summary per program pelatihan
- `/api/proper/summary_instansi` - Summary per kategori instansi
- `/api/abstract/summary_kata_kunci` - Summary kata kunci per instansi

## Response Structure

```json
{
  "success": true,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "data": {
    "summary_program": {
      "total_program": 5,
      "programs": [
        {
          "programId": 1,
          "programNama": "Program A",
          "count": 25
        }
      ]
    },
    "summary_instansi": {
      "total_kategori": 5,
      "categories": [
        {
          "kategori_id": 1,
          "kategori_name": "Kementerian",
          "total_proyek": 150,
          "total_instansi": 20,
          "detail_instansi": [
            {
              "instansi_id": 1,
              "nama_instansi": "Kementerian Lingkungan Hidup",
              "total_proyek": 15
            }
          ]
        }
      ]
    },
    "summary_kata_kunci": {
      "total_instansi": 45,
      "total_kategori": 4,
      "categories": [
        {
          "kategori_id": 1,
          "kategori_name": "Kementerian",
          "total_instansi": 12,
          "total_keywords": 150,
          "instansi": [
            {
              "instansi_id": 1,
              "nama_instansi": "Kementerian Lingkungan Hidup",
              "id_instansi_kategori": 1,
              "kategori_name": "Kementerian",
              "total_keywords": 25,
              "top_keywords": [
                {
                  "keyword": "lingkungan",
                  "count": 10
                },
                {
                  "keyword": "sustainable",
                  "count": 8
                }
              ]
            }
          ]
        }
      ]
    },
    "overview": {
      "total_program": 5,
      "total_instansi_kategori": 5,
      "total_instansi_with_keywords": 45,
      "total_proyek": 500,
      "total_keywords": 1200
    }
  }
}
```

## Data Structure Details

### summary_program
- Menampilkan jumlah proyek per program pelatihan
- Diurutkan berdasarkan jumlah terbanyak

### summary_instansi  
- Mengelompokkan proyek berdasarkan kategori instansi
- Menyediakan detail per instansi dalam setiap kategori
- Kategori: Kementerian, Lembaga, Pemerintah Provinsi, Kabupaten, Kota

### summary_kata_kunci
- Menganalisis kata kunci dari abstract proyek
- Mengelompokkan berdasarkan instansi dan kategori
- Menyediakan top 10 kata kunci per instansi

### overview
- Ringkasan agregat dari semua data
- Memberikan gambaran umum statistik dashboard

## Usage Example

```javascript
// Frontend Nuxt 3
const { data: dashboardData } = await $fetch('/api/dashboard/summary')

// Akses data program
console.log(dashboardData.data.summary_program.programs)

// Akses data instansi
console.log(dashboardData.data.summary_instansi.categories)

// Akses data kata kunci
console.log(dashboardData.data.summary_kata_kunci.categories)

// Akses overview
console.log(dashboardData.data.overview)
```

## Error Responses

```json
{
  "statusCode": 500,
  "statusMessage": "Internal server error"
}
```

## Benefits

1. **Single Request**: Mengurangi jumlah HTTP request dari 3 menjadi 1
2. **Consistent Data**: Data yang konsisten dalam satu waktu snapshot
3. **Better Performance**: Mengurangi overhead network dan database
4. **Aggregated Overview**: Menyediakan statistik gabungan yang berguna
5. **Structured Response**: Data terorganisir dengan baik untuk frontend

## Migration Guide

### Before (3 separate requests):
```javascript
const programData = await $fetch('/api/proper/summary_program')
const instansiData = await $fetch('/api/proper/summary_instansi') 
const keywordData = await $fetch('/api/abstract/summary_kata_kunci')
```

### After (1 request):
```javascript
const { data } = await $fetch('/api/dashboard/summary')
const programData = data.summary_program
const instansiData = data.summary_instansi
const keywordData = data.summary_kata_kunci
const overview = data.overview // bonus aggregated data
```