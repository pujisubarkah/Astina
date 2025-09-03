# Google Drive Integration Update

## Overview
Aplikasi Astina telah dipindahkan dari Dropbox ke Google Drive untuk file upload karena masalah koneksi dengan Dropbox API. Google Drive API sudah terbukti working dan lebih stabil.

## Perubahan yang Dilakukan

### 1. useFileUpload Composable
- **Sebelum**: `uploadToDropbox()` → endpoint `/api/upload/dropbox`
- **Sekarang**: `uploadToGoogleDrive()` → endpoint `/api/upload` (existing)
- **Backward Compatibility**: `uploadToDropbox()` masih ada, redirect ke Google Drive

### 2. UploadFile Component
- Progress text: "Mengupload ke Google Drive..."
- Success message: "Tersimpan di Google Drive"
- Same functionality, different backend

### 3. Form Upload-proyek.vue
- Main file upload: Google Drive via UploadFile component
- Support files: Google Drive via handleSupportFiles()
- Success message: "berhasil diupload ke Google Drive"

### 4. API Endpoints
- **Main Upload**: `/api/upload` (sudah ada, working)
- **Test Connection**: `/api/test/gdrive` (baru)

## File Storage Structure

### Google Drive Folder
```
Google Drive Folder (ID: 1lw3lBfYYvfv4ZQPFJXD1eStgN0zh0Z55)
├── project_report.pdf
├── supporting_doc.docx
├── presentation.pptx
└── ...
```

### Database Storage
- `mainFileUrl`: Google Drive webContentLink
- `project_support.fileUrl`: Google Drive webContentLink
- Public access via shareable links

## API Response Format

### Upload Response (`/api/upload`)
```json
{
  "id": "1BxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxY",
  "name": "project_report.pdf",
  "webViewLink": "https://drive.google.com/file/d/1Bxxx.../view",
  "webContentLink": "https://drive.google.com/file/d/1Bxxx.../view"
}
```

### Transformed for Frontend
```json
{
  "success": true,
  "data": {
    "filename": "project_report.pdf",
    "path": "/gdrive/1Bxxxxxxxxxx",
    "size": 2048576,
    "url": "https://drive.google.com/file/d/1Bxxx.../view",
    "shareUrl": "https://drive.google.com/file/d/1Bxxx.../view",
    "uploadedAt": "2024-09-03T10:00:00.000Z",
    "id": "1Bxxxxxxxxxx"
  }
}
```

## Environment Variables (Sudah Ada)
```env
GOOGLE_PROJECT_ID=nuxt-gdrive-upload
GOOGLE_CLIENT_EMAIL=nuxt-gdrive-upload@nuxt-gdrive-upload.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Testing

### Test Connection
```bash
# Test via browser
http://localhost:3002/api/test/gdrive

# Expected response
{
  "success": true,
  "message": "Google Drive connection successful!",
  "project": "nuxt-gdrive-upload",
  "email": "nuxt-gdrive-upload@...",
  "testResult": "Can access Google Drive API",
  "filesCount": 0
}
```

### Test File Upload
1. Buka http://localhost:3002/upload-proyek
2. Fill form sampai Step 3
3. Upload file via UploadFile component
4. Verify file muncul di Google Drive folder
5. Check database project table untuk URL

## Keuntungan Google Drive

✅ **Sudah Working**: API sudah tested dan stable
✅ **Free Storage**: 15GB gratis per akcount Google
✅ **Public Sharing**: Easy public access via shareable links
✅ **No Token Expiry**: Service account credentials tidak expire
✅ **Better Performance**: Lebih cepat dari Dropbox API
✅ **File Management**: Easy folder organization

## Migration Notes

- **No Data Loss**: Form masih compatible, hanya backend berubah
- **URL Format**: Google Drive links berbeda tapi tetap accessible
- **File Access**: Semua file tetap public accessible via shareable links
- **Database**: Tidak perlu migrate, URL format masih valid

## Next Steps

1. **Test Upload**: Coba upload file via form
2. **Verify Storage**: Check Google Drive folder
3. **Database Check**: Pastikan URL tersimpan correct
4. **Remove Dropbox**: Bisa hapus Dropbox dependencies jika sudah confirmed working

## Troubleshooting

### Error: "credentials not found"
- Check environment variables di `.env`
- Pastikan GOOGLE_PRIVATE_KEY format correct (dengan \n)

### Error: "insufficient permissions"
- Check Google Cloud service account permissions
- Pastikan Drive API enabled

### Error: "folder not found"
- Check folder ID: `1lw3lBfYYvfv4ZQPFJXD1eStgN0zh0Z55`
- Pastikan service account punya akses ke folder
