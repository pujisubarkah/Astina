import { dbx } from '~/lib/dropbox'
import formidable from 'formidable'
import { readFileSync } from 'fs'

export default defineEventHandler(async (event) => {
  // Add CORS headers
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  })

  if (getMethod(event) === 'OPTIONS') {
    return ''
  }

  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  console.log('Dropbox upload request received')

  try {
    // Check if Dropbox token exists
    if (!process.env.DROPBOX_ACCESS_TOKEN) {
      console.error('DROPBOX_ACCESS_TOKEN not found in environment')
      throw createError({
        statusCode: 500,
        statusMessage: 'Dropbox configuration missing'
      })
    }

    console.log('Parsing form data...')
    
    // Parse form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      keepExtensions: true
    })

    const [fields, files] = await form.parse(event.node.req)
    console.log('Form parsed successfully, files:', Object.keys(files))
    
    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file
    
    if (!uploadedFile) {
      console.error('No file found in request')
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    }

    console.log('File info:', {
      name: uploadedFile.originalFilename,
      size: uploadedFile.size,
      type: uploadedFile.mimetype
    })

    // Read file content
    const fileContent = readFileSync(uploadedFile.filepath)
    console.log('File content read, size:', fileContent.length)
    
    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}_${uploadedFile.originalFilename}`
    const dropboxPath = `/astina/uploads/${filename}`

    console.log('Uploading to Dropbox path:', dropboxPath)

    // Upload to Dropbox
    const uploadResponse = await dbx.filesUpload({
      path: dropboxPath,
      contents: fileContent,
      mode: { '.tag': 'add' },
      autorename: true
    })

    console.log('Upload successful:', uploadResponse.result.name)

    // Create shared link
    console.log('Creating shared link...')
    const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
      path: uploadResponse.result.path_display || dropboxPath,
      settings: {
        requested_visibility: { '.tag': 'public' }
      }
    })

    console.log('Shared link created:', sharedLinkResponse.result.url)

    // Convert Dropbox share URL to direct download URL
    const shareUrl = sharedLinkResponse.result.url
    const directUrl = shareUrl.replace('dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '')

    const result = {
      success: true,
      data: {
        filename: uploadResponse.result.name,
        path: uploadResponse.result.path_display,
        size: uploadResponse.result.size,
        url: directUrl,
        shareUrl: shareUrl,
        uploadedAt: new Date().toISOString()
      },
      message: 'File uploaded successfully to Dropbox'
    }

    console.log('Upload complete, returning result')
    return result

  } catch (error: any) {
    console.error('Dropbox upload error:', error)
    console.error('Error details:', error.error)
    
    // Handle specific Dropbox errors
    if (error.error && error.error['.tag']) {
      const errorTag = error.error['.tag']
      if (errorTag === 'path_write_error') {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid file path or file already exists'
        })
      } else if (errorTag === 'insufficient_space') {
        throw createError({
          statusCode: 507,
          statusMessage: 'Insufficient storage space in Dropbox'
        })
      }
    }

    // Handle auth errors
    if (error.status === 401) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Dropbox authentication failed. Please check access token.'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Upload failed: ${error.message || 'Unknown error'}`
    })
  }
})
