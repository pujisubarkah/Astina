export const useFileUpload = () => {
  const isUploading = ref(false)
  const uploadProgress = ref(0)
  const uploadError = ref<string | null>(null)

  const uploadToDropbox = async (file: File): Promise<{
    success: boolean
    data?: {
      filename: string
      path: string
      size: number
      url: string
      shareUrl: string
      uploadedAt: string
      id?: string
    }
    error?: string
  }> => {
    isUploading.value = true
    uploadProgress.value = 0
    uploadError.value = null

    try {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File terlalu besar. Maksimal 10MB.')
      }

      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'image/jpeg',
        'image/png',
        'image/gif',
        'text/plain'
      ]

      if (!allowedTypes.includes(file.type)) {
        throw new Error('Tipe file tidak didukung. Gunakan PDF, DOC, XLS, PPT, JPG, PNG, atau TXT.')
      }

      // Create FormData
      const formData = new FormData()
      formData.append('file', file)

      uploadProgress.value = 30 // Initial progress

      try {
        // Try Cloudinary upload first (new unified endpoint)
        console.log('Attempting Cloudinary upload (/api/upload)...')
        const response = await $fetch<any>('/api/upload', {
          method: 'POST',
          body: formData
        })

        uploadProgress.value = 100

        if (response && response.success && response.data) {
          console.log('Cloudinary upload successful')
          // Cloudinary response typically contains secure_url, public_id, etc.
          const data = response.data
          return {
            success: true,
            data: {
              filename: data.original_filename || file.name,
              path: data.public_id ? `${data.public_id}` : `/cloud/${Date.now()}`,
              size: data.bytes || file.size,
              url: data.secure_url || data.url,
              shareUrl: data.secure_url || data.url,
              uploadedAt: data.created_at || new Date().toISOString(),
              id: data.public_id || `cloud_${Date.now()}`
            }
          }
        } else {
          throw new Error('No response data from Cloudinary')
        }

      } catch (cloudError: any) {
        console.warn('Cloudinary upload failed, trying Dropbox then local...', cloudError?.message || cloudError)

        // If Cloudinary fails, fallback to Dropbox
        try {
          uploadProgress.value = 50
          console.log('Attempting Dropbox upload as fallback...')
          const response = await $fetch<any>('/api/upload/dropbox', {
            method: 'POST',
            body: formData
          })

          uploadProgress.value = 100

          if (response && (response.data)) {
            console.log('Dropbox upload successful')
            return {
              success: true,
              data: {
                filename: response.data.filename || file.name,
                path: response.data.path || `/dropbox/${Date.now()}`,
                size: response.data.size || file.size,
                url: response.data.url,
                shareUrl: response.data.shareUrl || response.data.url,
                uploadedAt: response.data.uploadedAt || new Date().toISOString(),
                id: response.data.id || `dropbox_${Date.now()}`
              }
            }
          } else {
            throw new Error('No response data from Dropbox')
          }
        } catch (dropboxError: any) {
          console.warn('Dropbox upload failed, trying local upload...', dropboxError?.message || dropboxError)

          // If Dropbox fails, fallback to local upload
          uploadProgress.value = 50
          const localResponse = await $fetch<any>('/api/upload-local', {
            method: 'POST',
            body: formData
          })

          uploadProgress.value = 100

          if (localResponse && localResponse.success) {
            console.log('Local upload successful as fallback')
            return {
              success: true,
              data: {
                filename: localResponse.filename || file.name,
                path: localResponse.path || `/local/${Date.now()}`,
                size: localResponse.size || file.size,
                url: localResponse.url || `/uploads/${localResponse.filename}`,
                shareUrl: localResponse.url || `/uploads/${localResponse.filename}`,
                uploadedAt: new Date().toISOString(),
                id: `local_${Date.now()}`
              }
            }
          } else {
            throw new Error('Cloudinary, Dropbox, and local upload all failed')
          }
        }
      }

    } catch (error: any) {
      console.error('Upload error:', error)
      uploadError.value = error.message || 'Terjadi kesalahan saat upload'
      return {
        success: false,
        error: uploadError.value || undefined
      }
    } finally {
      isUploading.value = false
    }
  }

  // Keep backward compatibility
  const uploadToGoogleDrive = uploadToDropbox

  const resetUploadState = () => {
    isUploading.value = false
    uploadProgress.value = 0
    uploadError.value = null
  }

  return {
    isUploading: readonly(isUploading),
    uploadProgress: readonly(uploadProgress),
    uploadError: readonly(uploadError),
    uploadToDropbox,
    uploadToGoogleDrive, // backward compatibility - now points to Dropbox
    resetUploadState
  }
}
