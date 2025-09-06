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
      status = 'draft'
    } = body

    // Validation
    if (!userId || !instansiId || !kategoriInstansiId || !lemdikId || !pelatihanId || !title || !description) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: userId, instansiId, kategoriInstansiId, lemdikId, pelatihanId, title, description'
      })
    }

    // Parse and clean data
    const projectData: any = {
      userId: Number(userId),
      instansiId: Number(instansiId),
      kategoriInstansiId: Number(kategoriInstansiId),
      lemdikId: Number(lemdikId),
      pelatihanId: Number(pelatihanId),
      title,
      description,
      status,
      updatedAt: new Date()
    }

    // Optional fields
    if (nilaiEkonomi) {
      projectData.nilaiEkonomi = String(nilaiEkonomi)
    }

    if (detailNilaiEkonomi) {
      // Remove formatting and convert to number
      const cleanAmount = typeof detailNilaiEkonomi === 'string' 
        ? parseInt(detailNilaiEkonomi.replace(/[^\d]/g, ''))
        : Number(detailNilaiEkonomi)
      projectData.detailNilaiEkonomi = cleanAmount
    }

    if (publikasiMediaSosial && Array.isArray(publikasiMediaSosial)) {
      // Filter out empty entries
      const validMediaSosial = publikasiMediaSosial.filter(item => 
        item.platform && item.platform.trim() !== '' && 
        item.linkMedia && item.linkMedia.trim() !== ''
      )
      if (validMediaSosial.length > 0) {
        projectData.publikasiMediaSosial = validMediaSosial
      }
    }

    if (publikasiMediaMassa && Array.isArray(publikasiMediaMassa)) {
      // Filter out empty entries
      const validMediaMassa = publikasiMediaMassa.filter(item => 
        item.namaMedia && item.namaMedia.trim() !== '' && 
        item.linkBerita && item.linkBerita.trim() !== ''
      )
      if (validMediaMassa.length > 0) {
        projectData.publikasiMediaMassa = validMediaMassa
      }
    }

    if (tags && Array.isArray(tags) && tags.length > 0) {
      // Filter out empty tags
      const validTags = tags.filter(tag => tag && tag.trim() !== '')
      if (validTags.length > 0) {
        projectData.tags = validTags
      }
    }

    if (startDate) {
      projectData.startDate = new Date(startDate)
    }

    if (endDate) {
      projectData.endDate = new Date(endDate)
    }

    if (mainFileUrl) {
      projectData.mainFileUrl = mainFileUrl
    }

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
    
    // More specific error handling
    if (error instanceof Error && error.message.includes('required')) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create project'
    })
  }
}