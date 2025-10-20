# Upload Proyek Form Integration

## Overview
Form `upload-proyek.vue` telah berhasil diintegrasikan dengan API Project yang baru. Form ini sekarang menggunakan endpoint `/api/project` untuk menyimpan data produk pembelajaran.

## Flow Proses Submit

### 1. Upload File (Step 3)
```javascript
// TODO: Implement actual file upload to Google Drive/Dropbox
// Saat ini menggunakan URL simulasi
let mainFileUrl = `https://drive.google.com/file/uploaded/${Date.now()}`
```

### 2. Create Project (API POST /api/project)
```javascript
const projectData = {
  userId: 1, // TODO: Get from authentication/session
  instansiId: selectedInstansi.instansi_id,
  lemdikId: selectedLemdik.id,
  pelatihanId: selectedPelatihan.id,
  title: form.title,
  description: form.description,
  nilaiEkonomi: form.nilaiEkonomi,
  mainFileUrl: mainFileUrl,
  status: 'submitted'
}
```

### 3. Add Support Files (API POST /api/project/support)
```javascript
for (const file of form.supportFiles) {
  await $fetch('/api/project/support', {
    method: 'POST',
    body: {
      projectId: projectId,
      fileUrl: supportFileUrl,
      fileName: file.name,
      fileType: file.type || 'document'
    }
  })
}
```

### 4. Save User Info (API POST /api/proper)
```javascript
await $fetch('/api/proper', {
  method: 'POST',
  body: {
    nama: form.authorName,
    no_identitas: form.nip,
    email: form.email,
    instansi_id: selectedInstansi.instansi_id,
    lemdik_id: selectedLemdik.id,
    nomor_kra: form.nomorKra,
    program_id: selectedPelatihan.id
  }
})
```

## Data Mapping

### Form Fields → Database
- `form.title` → `project.title`
- `form.description` → `project.description`
- `form.nilaiEkonomi` → `project.nilaiEkonomi`
- `form.institution` (ID) → `project.instansiId`
- `form.lembagaDiklat` (ID) → `project.lemdikId`
- `form.training` (ID) → `project.pelatihanId`

### Dropdown Data Sources
- **Instansi**: `/api/instansi` → `instansiOptions`
- **Lemdik**: `/api/lemdik` → `lemdikOptions`
- **Pelatihan**: `/api/pelatihan` → `pelatihanOptions`

## Key Changes Made

1. **API Endpoint**: Changed from `/api/proper` only to `/api/project` + `/api/project/support`
2. **Data Structure**: Updated to match project schema requirements
3. **ID Mapping**: Fixed dropdown values to use IDs instead of names
4. **Error Handling**: Improved error messages and logging
5. **File Upload**: Prepared structure for actual file upload implementation

## TODO Items

1. **File Upload Integration**: Implement actual file upload to Google Drive/Dropbox
2. **Authentication**: Get real userId from session/auth
3. **Form Validation**: Add more robust client-side validation
4. **Progress Indicator**: Show upload progress for large files
5. **Draft Saving**: Enhance draft saving with file references

## Testing

To test the form:
1. Fill all required fields in steps 1-2
2. Upload main file in step 3
3. Review and submit in step 4
4. Check database for new project record
5. Verify support files are saved correctly

## API Endpoints Used

- `POST /api/project` - Create new project
- `POST /api/project/support` - Add support files
- `POST /api/proper` - Save user tracking info
- `GET /api/instansi` - Load institution options
- `GET /api/lemdik` - Load training institution options
- `GET /api/pelatihan` - Load training program options
