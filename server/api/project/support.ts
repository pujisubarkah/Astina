import { projectSupport } from '~/server/database/schema/project_support'
import { eq, and } from 'drizzle-orm'
import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  
  switch (method) {
    case 'GET':
      return await handleGet(event)
    case 'POST':
      return await handlePost(event)
    case 'DELETE':
      return await handleDelete(event)
    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
  }
})

// GET - Fetch support files for a project
async function handleGet(event: any) {
  try {
    const query = getQuery(event)
    const { projectId } = query

    if (!projectId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project ID is required'
      })
    }

    const supportFiles = await db
      .select()
      .from(projectSupport)
      .where(eq(projectSupport.projectId, Number(projectId)))

    return {
      success: true,
      data: supportFiles
    }
  } catch (error) {
    console.error('Error fetching support files:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch support files'
    })
  }
}

// POST - Add support file to project
async function handlePost(event: any) {
  try {
    const body = await readBody(event)
    const {
      projectId,
      fileUrl,
      fileName,
      fileType
    } = body

    // Validation
    if (!projectId || !fileUrl || !fileName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: projectId, fileUrl, fileName'
      })
    }

    const newSupportFile = await db
      .insert(projectSupport)
      .values({
        projectId: Number(projectId),
        fileUrl,
        fileName,
        fileType: fileType || 'document'
      })
      .returning()

    return {
      success: true,
      data: newSupportFile[0],
      message: 'Support file added successfully'
    }
  } catch (error) {
    console.error('Error adding support file:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add support file'
    })
  }
}

// DELETE - Remove support file
async function handleDelete(event: any) {
  try {
    const query = getQuery(event)
    const { id, projectId } = query

    if (!id || !projectId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Support file ID and project ID are required'
      })
    }

    // Check if support file exists and belongs to the project
    const existingFile = await db
      .select()
      .from(projectSupport)
      .where(
        and(
          eq(projectSupport.id, Number(id)),
          eq(projectSupport.projectId, Number(projectId))
        )
      )
      .limit(1)

    if (existingFile.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Support file not found'
      })
    }

    await db
      .delete(projectSupport)
      .where(eq(projectSupport.id, Number(id)))

    return {
      success: true,
      message: 'Support file deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting support file:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete support file'
    })
  }
}
