import { project } from '~/server/database/schema/project'
import { eq } from 'drizzle-orm'
import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project ID is required'
    })
  }

  switch (method) {
    case 'GET':
      return await handleGetById(Number(id))
    case 'PUT':
      return await handleUpdateById(event, Number(id))
    case 'DELETE':
      return await handleDeleteById(Number(id))
    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
  }
})

// GET - Fetch single project by ID
async function handleGetById(id: number) {
  try {
    const projects = await db
      .select()
      .from(project)
      .where(eq(project.id, id))
      .limit(1)

    if (projects.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    return {
      success: true,
      data: projects[0]
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch project'
    })
  }
}

// PUT - Update project by ID
async function handleUpdateById(event: any, id: number) {
  try {
    const body = await readBody(event)

    // Check if project exists
    const existingProject = await db
      .select()
      .from(project)
      .where(eq(project.id, id))
      .limit(1)

    if (existingProject.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    const updatedProject = await db
      .update(project)
      .set({
        ...body,
        updatedAt: new Date()
      })
      .where(eq(project.id, id))
      .returning()

    return {
      success: true,
      data: updatedProject[0],
      message: 'Project updated successfully'
    }
  } catch (error) {
    console.error('Error updating project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update project'
    })
  }
}

// DELETE - Delete project by ID
async function handleDeleteById(id: number) {
  try {
    // Check if project exists
    const existingProject = await db
      .select()
      .from(project)
      .where(eq(project.id, id))
      .limit(1)

    if (existingProject.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    await db
      .delete(project)
      .where(eq(project.id, id))

    return {
      success: true,
      message: 'Project deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete project'
    })
  }
}
