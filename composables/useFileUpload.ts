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

      uploadProgress.value = 50 // Simulate progress

      // Upload to Dropbox (using working dropbox endpoint)
      const response = await $fetch<any>('/api/upload/dropbox', {
        method: 'POST',
        body: formData
      })

      if (response && (response.id || response.name)) {
        uploadProgress.value = 100
        
        // Format response to match expected structure
        return {
          success: true,
          data: {
            filename: response.name || file.name,
            path: `/dropbox/${response.id || 'upload'}`,
            size: response.size || file.size,
            url: response.webContentLink || response.url,
            shareUrl: response.webViewLink || response.url,
            uploadedAt: new Date().toISOString(),
            id: response.id || `dropbox_${Date.now()}`
          }
        }
      } else {
        throw new Error('Upload failed - no response data')
      }

    } catch (error: any) {
      console.error('Dropbox upload error:', error)
      uploadError.value = error.message || 'Terjadi kesalahan saat upload ke Dropbox'
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
