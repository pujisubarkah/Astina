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

    const {
      userId,
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
      status = 'draft',
      isApproved = false
    } = body

    // Wajib ada
    if (!userId || !instansiId || !kategoriInstansiId || !lemdikId || !pelatihanId || !title || !description) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: userId, instansiId, kategoriInstansiId, lemdikId, pelatihanId, title, description'
      })
    }

    const projectData: any = {
      userId: Number(userId),
      instansiId: Number(instansiId),
      kategoriInstansiId: Number(kategoriInstansiId),
      lemdikId: Number(lemdikId),
      pelatihanId: Number(pelatihanId),
      title: String(title),
      description: String(description),
      status: String(status),
      isApproved: Boolean(isApproved),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Nilai ekonomi
    if (nilaiEkonomi) {
      projectData.nilaiEkonomi = String(nilaiEkonomi)
    }
    if (detailNilaiEkonomi) {
      const cleanAmount =
        typeof detailNilaiEkonomi === 'string'
          ? parseInt(detailNilaiEkonomi.replace(/[^\d]/g, ''), 10)
          : Number(detailNilaiEkonomi)
      if (!isNaN(cleanAmount)) {
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