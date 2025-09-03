# Google Drive Setup - Service Account Key Regeneration

## Masalah Saat Ini
Error: `error:1E08010C:DECODER routines::unsupported`
- Ini masalah compatibility antara private key format dan OpenSSL di Node.js v22
- Perlu regenerate service account key dengan format yang lebih kompatibel

## Langkah-langkah Regenerate Key

### 1. Buka Google Cloud Console
- Go to: https://console.cloud.google.com/
- Pilih project: `nuxt-gdrive-upload`

### 2. Navigate ke Service Accounts
- Menu: IAM & Admin > Service Accounts
- Cari service account: `nuxt-gdrive-upload@nuxt-gdrive-upload.iam.gserviceaccount.com`

### 3. Generate New Key
- Click pada service account
- Tab "Keys"
- Click "Add Key" > "Create new key"
- **Pilih format: JSON** (bukan P12)
- Download file JSON

### 4. Extract dari JSON File
Dari file JSON yang di-download, ambil:
```json
{
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  "project_id": "..."
}
```

### 5. Update .env
```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMII...\n-----END PRIVATE KEY-----"
```

**IMPORTANT**: Pastikan format di .env menggunakan `\n` (bukan `\\n`)

## Alternative: Upload JSON File Directly
Atau bisa upload entire JSON file ke server dan load sebagai file.
