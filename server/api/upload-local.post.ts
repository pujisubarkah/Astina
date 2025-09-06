import formidable from "formidable"
import fs from "fs"
import path from "path"

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    console.log('Local upload request received')
    
    const form = formidable({ 
      multiples: false,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      keepExtensions: true
    })

    // Parse file dari request
    const [fields, files] = await form.parse(event.node.req)
    
    const fileField = files.file
    const file: formidable.File | undefined = Array.isArray(fileField) ? fileField[0] : fileField

    if (!file) {
      throw createError({
        statusCode: 400,
        statusMessage: "No file uploaded"
      })
    }

    console.log('File info:', {
      name: file.originalFilename,
      size: file.size,
      type: file.mimetype
    })

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.originalFilename || 'upload'
    const extension = path.extname(originalName)
    const baseName = path.basename(originalName, extension)
    const newFileName = `${baseName}_${timestamp}${extension}`
    const newPath = path.join(uploadsDir, newFileName)

    // Move file to uploads directory
    fs.copyFileSync(file.filepath, newPath)
    fs.unlinkSync(file.filepath) // Clean up temp file

    console.log('File saved to:', newPath)

    // Return file info in expected format
    const fileUrl = `/uploads/${newFileName}`
    
    return {
      success: true,
      filename: originalName,
      path: `/uploads/${newFileName}`,
      size: file.size,
      url: fileUrl,
      type: file.mimetype,
      uploadedAt: new Date().toISOString(),
      message: "File uploaded successfully to local storage"
    }

  } catch (error: any) {
    console.error('Local upload error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Local upload failed'
    })
  }
})
