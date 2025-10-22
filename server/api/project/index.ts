import { project } from '~/server/database/schema/project'
import { eq, desc, asc, and, or, like, count } from 'drizzle-orm'
import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  
  switch (method) {
    case 'GET':
      return await handleGet(event)
    case 'POST':
      return await handlePost(event)
    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
  }
})

// GET - Fetch projects with pagination and filters
async function handleGet(event: any) {
  try {
    const query = getQuery(event)
    const {
      page = 1,
      limit = 10,
      search,
      instansiId,
      pelatihanId,
      status,
      isApproved,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = query

    const offset = (Number(page) - 1) * Number(limit)

    // Build where conditions
    const conditions = []
    
    if (search) {
      conditions.push(
        or(
          like(project.title, `%${search}%`),
          like(project.description, `%${search}%`)
        )
      )
    }
    
    if (instansiId) {
      conditions.push(eq(project.instansiId, Number(instansiId)))
    }
    
    if (pelatihanId) {
      conditions.push(eq(project.pelatihanId, Number(pelatihanId)))
    }
    
    if (status) {
      conditions.push(eq(project.status, String(status)))
    }
    
    if (isApproved !== undefined) {
      conditions.push(eq(project.isApproved, Boolean(isApproved)))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    // Get total count
    const totalResult = await db
      .select({ count: count() })
      .from(project)
      .where(whereClause)
    
    const total = totalResult[0].count

    // Get projects with proper sorting
    let orderByClause
    switch (sortBy) {
      case 'title':
        orderByClause = sortOrder === 'desc' ? desc(project.title) : asc(project.title)
        break
      case 'status':
        orderByClause = sortOrder === 'desc' ? desc(project.status) : asc(project.status)
        break
      case 'updatedAt':
        orderByClause = sortOrder === 'desc' ? desc(project.updatedAt) : asc(project.updatedAt)
        break
      default:
        orderByClause = sortOrder === 'desc' ? desc(project.createdAt) : asc(project.createdAt)
    }

    const projects = await db
      .select()
      .from(project)
      .where(whereClause)
      .orderBy(orderByClause)
      .limit(Number(limit))
      .offset(offset)

    return {
      success: true,
      data: projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(total),
        totalPages: Math.ceil(Number(total) / Number(limit))
      }
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects'
    })
  }
}

// POST - Create new project
async function handlePost(event: any) {
  try {
    const body = await readBody(event)
    console.log('Received body:', body)

    // debug: detect any fields sent as empty string which may later coerce to NaN
    const emptyStringFields: string[] = []
    Object.keys(body || {}).forEach((k) => {
      if (body[k] === '') emptyStringFields.push(k)
    })
    if (emptyStringFields.length > 0) {
      console.warn('Request contains empty-string fields (may cause numeric NaN):', emptyStringFields)
    }

    // detailed per-field diagnostics for incoming body
    try {
      const fieldDiagnostics = Object.keys(body || {}).map((k) => {
        const val = body[k]
        const t = typeof val
        let preview: any = val
        try {
          if (val === null) preview = 'null'
          else if (val === undefined) preview = 'undefined'
          else if (typeof val === 'object') preview = Array.isArray(val) ? `[array:${val.length}]` : '[object]'
          else if (typeof val === 'string' && val.length > 100) preview = `${val.slice(0, 100)}...`
        } catch (e) {
          preview = String(val)
        }
        const isEmptyString = val === ''
        const isNaNString = typeof val === 'string' && val.toLowerCase() === 'nan'
        const numericValue = Number(val)
        const isNumeric = Number.isFinite(numericValue)
        return {
          key: k,
          type: t,
          preview,
          isEmptyString,
          isNaNString,
          numericValue: isNumeric ? numericValue : null,
          isNumeric
        }
      })
      console.log('Incoming field diagnostics:', fieldDiagnostics)
    } catch (e) {
      console.warn('Failed to produce incoming field diagnostics', e)
    }

    const {
      userId,
      nip,
      instansiId,
      kategoriInstansiId,
      lemdikId,
      pelatihanId,
      title,
      description,
      nilaiEkonomi,
      detailNilaiEkonomi,
      publikasiMediaSosial,
      publikasiMediaMassa,
      tags,
      startDate,
      endDate,
      mainFileUrl,
      sdgs,
      astacita,
      properId,
      status = 'draft',
      isApproved = false
    } = body

    // Wajib ada
    // Helper: coerce to finite number or undefined
    const toNumber = (v: any) => {
      if (v === null || v === undefined || v === '') return undefined
      const n = Number(v)
      return Number.isFinite(n) ? n : undefined
    }

    // Validate required fields and numeric conversions
    const missing: string[] = []
    if (userId === undefined || userId === null || String(userId) === '') missing.push('userId')
    if (instansiId === undefined || instansiId === null || String(instansiId) === '') missing.push('instansiId')
    if (kategoriInstansiId === undefined || kategoriInstansiId === null || String(kategoriInstansiId) === '') missing.push('kategoriInstansiId')
    if (lemdikId === undefined || lemdikId === null || String(lemdikId) === '') missing.push('lemdikId')
    if (pelatihanId === undefined || pelatihanId === null || String(pelatihanId) === '') missing.push('pelatihanId')
    if (!title) missing.push('title')
    if (!description) missing.push('description')
    if (!nip) missing.push('nip')

    if (missing.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
        message: `Missing required fields: ${missing.join(', ')}`
      })
    }

    // parse/validate numeric ids
    const userIdNum = toNumber(userId)
    const instansiIdNum = toNumber(instansiId)
    const kategoriInstansiIdNum = toNumber(kategoriInstansiId)
    const lemdikIdNum = toNumber(lemdikId)
    const pelatihanIdNum = toNumber(pelatihanId)

    console.log('Parsed numeric ids:', {
      userIdNum,
      instansiIdNum,
      kategoriInstansiIdNum,
      lemdikIdNum,
      pelatihanIdNum
    })

    const invalidNums: string[] = []
    if (userIdNum === undefined) invalidNums.push('userId')
    if (instansiIdNum === undefined) invalidNums.push('instansiId')
    if (kategoriInstansiIdNum === undefined) invalidNums.push('kategoriInstansiId')
    if (lemdikIdNum === undefined) invalidNums.push('lemdikId')
    if (pelatihanIdNum === undefined) invalidNums.push('pelatihanId')

    if (invalidNums.length > 0) {
      console.warn('Invalid numeric fields in request:', invalidNums)
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid numeric fields',
        message: `The following fields must be valid numbers: ${invalidNums.join(', ')}`
      })
    }

    // Cek duplikasi: kombinasi nip + pelatihanId harus unik
    try {
      const existing = await db
        .select()
        .from(project)
        .where(and(eq(project.nip, String(nip)), eq(project.pelatihanId, Number(pelatihanId))))

      if (Array.isArray(existing) && existing.length > 0) {
        throw createError({
          statusCode: 409,
          statusMessage: 'Duplicate',
          message: 'Anda telah mengisi form ini sebelumnya untuk kombinasi NIP dan Program Pelatihan yang sama.'
        })
      }
    } catch (dupError) {
      const e: any = dupError
      if (e && e.statusCode === 409) throw e
      // if other DB errors, continue to regular flow so error handling below captures it
    }

    const projectData: any = {
      userId: userIdNum,
      nip: String(nip),
      instansiId: instansiIdNum,
      kategoriInstansiId: kategoriInstansiIdNum,
      lemdikId: lemdikIdNum,
      pelatihanId: pelatihanIdNum,
      title: String(title),
      description: String(description),
      status: String(status),
      isApproved: Boolean(isApproved),
      // optional master refs
      sdgs: sdgs !== undefined && sdgs !== null ? Number(sdgs) : undefined,
      astacita: astacita !== undefined && astacita !== null ? Number(astacita) : undefined,
      properId: properId !== undefined && properId !== null ? Number(properId) : undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Nilai ekonomi
    if (nilaiEkonomi) {
      projectData.nilaiEkonomi = String(nilaiEkonomi)
    }
    if (detailNilaiEkonomi) {
      const cleanAmountRaw = typeof detailNilaiEkonomi === 'string'
        ? detailNilaiEkonomi.replace(/[^\d-]/g, '')
        : String(detailNilaiEkonomi)
      const cleanAmount = toNumber(cleanAmountRaw)
      if (cleanAmount !== undefined) {
        projectData.detailNilaiEkonomi = cleanAmount
      }
    }

    // JSONB publikasi media sosial
    if (publikasiMediaSosial) {
      try {
        const sosialArr = Array.isArray(publikasiMediaSosial)
          ? publikasiMediaSosial
          : JSON.parse(publikasiMediaSosial)
        projectData.publikasiMediaSosial = Array.isArray(sosialArr) ? sosialArr : []
      } catch (e) {
        projectData.publikasiMediaSosial = []
      }
    } else {
      projectData.publikasiMediaSosial = []
    }

    // JSONB publikasi media massa
    if (publikasiMediaMassa) {
      try {
        const massaArr = Array.isArray(publikasiMediaMassa)
          ? publikasiMediaMassa
          : JSON.parse(publikasiMediaMassa)
        projectData.publikasiMediaMassa = Array.isArray(massaArr) ? massaArr : []
      } catch (e) {
        projectData.publikasiMediaMassa = []
      }
    } else {
      projectData.publikasiMediaMassa = []
    }

    // JSONB tags
    if (tags) {
      try {
        const tagsArr = Array.isArray(tags) ? tags : JSON.parse(tags)
        projectData.tags = Array.isArray(tagsArr) ? tagsArr : []
      } catch (e) {
        projectData.tags = []
      }
    } else {
      projectData.tags = []
    }

    // Date handling
    if (startDate) projectData.startDate = new Date(startDate)
    if (endDate) projectData.endDate = new Date(endDate)
    if (mainFileUrl) projectData.mainFileUrl = String(mainFileUrl)

  // ensure JSONB/defaults for optional arrays
  if (!projectData.publikasiMediaSosial) projectData.publikasiMediaSosial = []
  if (!projectData.publikasiMediaMassa) projectData.publikasiMediaMassa = []
  if (!projectData.tags) projectData.tags = []

  // optional master refs: sdgs, astacita, properId — coerce safely
  const sdgsNum = toNumber(sdgs)
  const astacitaNum = toNumber(astacita)
  const properIdNum = toNumber(properId)
  if (sdgsNum !== undefined) projectData.sdgs = sdgsNum
  if (astacitaNum !== undefined) projectData.astacita = astacitaNum
  if (properIdNum !== undefined) projectData.properId = properIdNum

    // debug: show projectData before insert
    // also show per-field diagnostics for projectData
    try {
      const projectDiagnostics = Object.keys(projectData || {}).map((k) => {
        const val = projectData[k]
        return {
          key: k,
          type: typeof val,
          preview: typeof val === 'string' && val.length > 100 ? `${val.slice(0, 100)}...` : val,
          isNaNString: typeof val === 'string' && val.toLowerCase() === 'nan',
          isInvalidNumber: typeof val === 'number' && !Number.isFinite(val)
        }
      })
      console.log('Project data before sanitization (per-field):', projectDiagnostics)
    } catch (e) {
      console.warn('Failed to produce projectData diagnostics', e)
    }
    console.log('Project data before sanitization:', projectData)

    // Sanitization: remove undefined/null or non-finite numeric values and 'NaN' strings
    const removedKeys: string[] = []
    Object.keys(projectData).forEach((k) => {
      const val = projectData[k]
      const isNaNString = typeof val === 'string' && val.toLowerCase() === 'nan'
      const isInvalidNumber = typeof val === 'number' && !Number.isFinite(val)
      if (val === undefined || val === null || isNaNString || isInvalidNumber) {
        removedKeys.push(k)
        delete projectData[k]
      }
    })

    if (removedKeys.length > 0) {
      console.warn('Removed invalid keys from projectData before insert:', removedKeys)
      console.log('Project data after sanitization:', projectData)
    }

    // Insert ke DB
    const newProject = await db
      .insert(project)
      .values(projectData)
      .returning()

    return {
      success: true,
      data: newProject[0],
      message: 'Project created successfully'
    }
  } catch (error) {
    console.error('Error creating project:', error)
    console.log('Error object:', error)
    console.dir(error, { depth: null })
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create project',
      message: error instanceof Error ? error.message : String(error)
    })
  }
}