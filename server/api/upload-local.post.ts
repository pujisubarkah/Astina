import formidable from "formidable"
import fs from "fs"
import path from "path"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default defineEventHandler(async (event) => {
  try {
    const form = formidable({ multiples: false })

    // Parse file dari request
    const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
      form.parse(event.node.req, (err: any, fields: formidable.Fields, files: formidable.Files) => {
        if (err) reject(err)
        else resolve({ fields, files })
      })
    })

    const fileField = files.file
    const file: formidable.File | undefined = Array.isArray(fileField) ? fileField[0] : fileField

    if (!file) {
      throw new Error("No file uploaded")
    }

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

    // Return file info
    const fileUrl = `/uploads/${newFileName}`
    
    return {
      id: timestamp.toString(),
      name: originalName,
      url: fileUrl,
      size: file.size,
      type: file.mimetype,
      message: "File uploaded successfully to local storage"
    }

  } catch (error: any) {
    console.error('Upload error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Upload failed'
    })
  }
})
