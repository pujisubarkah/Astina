import formidable from 'formidable'
import { PassThrough } from 'stream'
import fs from 'fs'
import cloudinary from '~/server/utils/cloudinary'

export const config = {
  api: {
    bodyParser: false, // disable default body parser for multipart
  },
}

export default defineEventHandler(async (event) => {
  try {
    const form = formidable({
      maxFileSize: 50 * 1024 * 1024, // 50MB
      keepExtensions: true
    })

    const [fields, files] = await form.parse(event.node.req)
    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file

    if (!uploadedFile) {
      throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
    }

    // Upload to Cloudinary using upload_stream
    const filePath = (uploadedFile as any).filepath
    const buffer: Buffer = filePath ? await fs.promises.readFile(filePath) : Buffer.from('')

    const streamUpload = () => new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'astina/uploads' },
        (error: any, result: any) => {
          if (error) return reject(error)
          resolve(result)
        }
      )
      if (buffer && buffer.length) {
        const passthrough = new PassThrough()
        passthrough.end(buffer)
        passthrough.pipe(uploadStream)
      } else if (filePath) {
        const readStream = fs.createReadStream(filePath)
        readStream.pipe(uploadStream)
      } else {
        reject(new Error('No file buffer or path available for upload'))
      }
    })

    const result = await streamUpload()

    return {
      success: true,
      message: 'File uploaded successfully to Cloudinary',
      data: result
    }
  } catch (error: any) {
    console.error('Cloudinary upload error:', error)
    throw createError({ statusCode: 500, statusMessage: error.message || 'Upload failed' })
  }
})
