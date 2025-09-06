import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { db } from '~/server/db'
import { project } from '~/server/database/schema/project'
import { parse } from 'csv-parse/sync'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  bodyParser: false
}

export default defineEventHandler(async (event) => {
  // JWT auth check
  let authHeader = event.req.headers['authorization'] || event.req.headers['Authorization']
  if (Array.isArray(authHeader)) authHeader = authHeader[0]
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return { success: false, message: 'Unauthorized: No token provided.' }
  }
  const token = authHeader.split(' ')[1]
  try {
    const user = verify(token, process.env.JWT_SECRET || 'secret-key')
    if (!user) {
      return { success: false, message: 'Unauthorized: Invalid token.' }
    }
  } catch (err) {
    return { success: false, message: 'Unauthorized: Invalid token.' }
  }
  try {
    const form = formidable({ multiples: false })
    const [fields, files] = await form.parse(event.node.req)
    const file = Array.isArray(files.file) ? files.file[0] : files.file
    if (!file) {
      return { success: false, message: 'File CSV tidak ditemukan.' }
    }
    const csvBuffer = await fs.promises.readFile(file.filepath)
    const csvText = csvBuffer.toString('utf-8')
    const records: any[] = parse(csvText, {
      columns: true,
      skip_empty_lines: true
    })
    let imported = 0
    for (const row of records) {
      // Validasi minimal kolom
      if (!row.proyekPerubahan) continue
      try {
        await db.insert(project).values({
          title: row.title || row.proyekPerubahan || 'Imported Project', // Add required title
          description: row.description || row.proyekPerubahan || '', // Required description
          userId: Number(row.userId) || 1, // default user
          instansiId: Number(row.idInstansi) || 1,
          kategoriInstansiId: Number(row.kategoriInstansiId) || 1,
          lemdikId: Number(row.lemdikId) || 1, // default lemdik
          pelatihanId: Number(row.pelatihan_id) || 1,
          nilaiEkonomi: row.nilaiEkonomi || null,
          detailNilaiEkonomi: row.detailNilaiEkonomi ? Number(row.detailNilaiEkonomi) : null,
          publikasiMediaSosial: row.publikasiMediaSosial ? JSON.parse(row.publikasiMediaSosial) : null,
          publikasiMediaMassa: row.publikasiMediaMassa ? JSON.parse(row.publikasiMediaMassa) : null,
          tags: row.tags ? JSON.parse(row.tags) : null,
          startDate: row.startDate ? new Date(row.startDate) : null,
          endDate: row.endDate ? new Date(row.endDate) : null,
          mainFileUrl: row.mainFileUrl || null,
          status: row.status || 'draft',
          createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
          updatedAt: new Date(),
          isApproved: row.isApproved === 'true' || row.isApproved === true || false
        })
        imported++
      } catch (e) {
        console.warn('Failed to import row:', e)
        // skip error
      }
    }
    return { success: true, count: imported }
  } catch (err) {
    return { success: false, message: 'Gagal import CSV.' }
  }
})
