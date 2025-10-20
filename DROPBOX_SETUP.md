# Dropbox Integration Setup

## Overview
Astina aplikasi sekarang menggunakan Dropbox untuk menyimpan file upload dari form produk pembelajaran. File-file akan diupload ke folder `/astina/uploads/` di Dropbox dan dibuat shared link untuk akses publik.

## Setup Dropbox App

### 1. Buat Dropbox App
1. Kunjungi https://www.dropbox.com/developers/apps
2. Klik "Create app"
3. Pilih "Scoped access"
4. Pilih "Full Dropbox" atau "App folder" (recommend App folder)
5. Beri nama app: "Astina File Upload"

### 2. Konfigurasi Permission
Di App settings, pada bagian "Permissions", aktifkan:
- `files.content.write` - Upload files
- `files.content.read` - Read uploaded files  
- `sharing.write` - Create shared links
- `sharing.read` - Read shared link settings

### 3. Generate Access Token
1. Di tab "Settings", scroll ke "OAuth 2"
2. Klik "Generate access token"
3. Copy token yang dihasilkan

### 4. Setup Environment Variables
Buat file `.env` di root project:
```env
DROPBOX_ACCESS_TOKEN=sl.xxxxxxxxxxxxxxxxxxxxxxxxx
DROPBOX_CLIENT_ID=xxxxxxxxx  
DROPBOX_CLIENT_SECRET=xxxxxxxxx
```

## API Endpoints

### Upload File
**POST** `/api/upload/dropbox`

**Request:**
- Form data dengan field `file`
- Max file size: 10MB
- Allowed types: PDF, DOC, XLS, PPT, JPG, PNG, TXT

**Response:**
```json
{
  "success": true,
  "data": {
    "filename": "1693737600000_document.pdf",
    "path": "/astina/uploads/1693737600000_document.pdf",
    "size": 2048576,
    "url": "https://dl.dropboxusercontent.com/s/xxx/file.pdf",
    "shareUrl": "https://dropbox.com/s/xxx/file.pdf?dl=0",
    "uploadedAt": "2024-09-03T10:00:00.000Z"
  }
}
```

## Frontend Integration

### useFileUpload Composable
```typescript
const { uploadToDropbox, isUploading, uploadProgress, uploadError } = useFileUpload()

const result = await uploadToDropbox(file)
if (result.success) {
  console.log('File uploaded:', result.data.url)
}
```

### UploadFile Component
```vue
<UploadFile @fileUploaded="handleFileUploaded" @uploadError="handleUploadError" />
```

## File Structure
```
/astina/uploads/
├── 1693737600000_project_report.pdf
├── 1693737601000_supporting_doc.docx
└── 1693737602000_presentation.pptx
```

## Features

✅ **Auto File Naming**: Timestamp prefix untuk avoid conflicts
✅ **File Validation**: Size dan type checking
✅ **Progress Tracking**: Real-time upload progress
✅ **Error Handling**: Comprehensive error messages
✅ **Public Access**: Auto-generated shared links
✅ **Direct Download**: URLs yang langsung bisa diakses

## Security Notes

- Access token disimpan di server-side only
- File di-upload ke folder terpisah (`/astina/uploads/`)
- Shared links bersifat public tapi URL sulit ditebak
- File size limited ke 10MB untuk main file, 5MB untuk support files

## Usage in Project Form

1. **Main Document**: Menggunakan UploadFile component
2. **Support Files**: Multiple file upload dengan progress tracking
3. **Database Storage**: URL Dropbox disimpan di database
4. **File Management**: User bisa view dan delete uploaded files

## Troubleshooting

### Error: "Invalid access token"
- Pastikan token Dropbox valid dan tidak expired
- Regenerate token di Dropbox App console

### Error: "Insufficient space"
- Cek storage quota Dropbox
- Clean up old files jika perlu

### Error: "Path write error"
- Pastikan path `/astina/uploads/` accessible
- Check app permissions

### Upload stuck atau gagal
- Cek koneksi internet
- Verify file size limits
- Check file type restrictions

## Development

### Test Upload
```bash
curl -X POST http://localhost:3000/api/upload/dropbox \
  -F "file=@test.pdf"
```

### View Files
Check Dropbox app folder untuk melihat uploaded files

### Monitor Errors
Check server logs untuk debugging upload issues
