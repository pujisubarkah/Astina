# Dropbox Token Setup Guide

## Masalah yang Terjadi
Access token Dropbox yang ada sudah expired, sehingga file upload ke Dropbox gagal dengan error 401.

## Solusi Sementara
Sistem sekarang sudah dimodifikasi dengan **fallback mechanism**:
1. Mencoba upload ke Dropbox terlebih dahulu
2. Jika Dropbox gagal, otomatis fallback ke local storage
3. File tetap bisa diupload dan disimpan

## Cara Memperbarui Dropbox Token

### 1. Buka Dropbox App Console
- Kunjungi: https://www.dropbox.com/developers/apps
- Login dengan akun Dropbox Anda

### 2. Pilih App yang Sudah Ada
- Cari aplikasi yang sudah dibuat sebelumnya (kemungkinan bernama "Astina" atau sejenisnya)
- Jika tidak ada, buat app baru:
  - Pilih "Scoped access"
  - Pilih "Full Dropbox"
  - Beri nama aplikasi (misal: "Astina File Upload")

### 3. Generate Access Token Baru
- Di halaman app, scroll ke bawah ke bagian "OAuth 2"
- Klik "Generate access token"
- Copy token yang dihasilkan

### 4. Update .env File
- Buka file `.env` di root project
- Update baris `DROPBOX_ACCESS_TOKEN` dengan token baru:
```
DROPBOX_ACCESS_TOKEN=sl.xxxxxxxxxxxxxxxxx
```

### 5. Restart Development Server
- Stop server yang sedang berjalan (Ctrl+C)
- Jalankan kembali: `pnpm dev`

## Permissions yang Diperlukan
Pastikan app Dropbox memiliki permissions berikut:
- `files.content.write` - Untuk upload file
- `files.content.read` - Untuk akses file
- `sharing.write` - Untuk membuat shared link

## Testing
Setelah update token, coba upload file di halaman `/upload-proyek` untuk memastikan:
1. Upload ke Dropbox berhasil (akan menampilkan "Dropbox" sebagai storage)
2. Jika masih gagal, sistem akan fallback ke local storage

## Catatan
- Access token Dropbox biasanya memiliki masa berlaku yang sangat panjang (tidak expired)
- Jika token sering expired, pertimbangkan menggunakan OAuth flow yang proper
- Local storage fallback memastikan aplikasi tetap berfungsi meski Dropbox bermasalah
