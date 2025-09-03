import { project } from '~/server/database/schema/project'
import { eq } from 'drizzle-orm'
import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  
  if (method !== 'PUT') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  return await handleApproval(event)
})

// PUT - Update project approval status
async function handleApproval(event: any) {
  try {
    const body = await readBody(event)
    const {
      projectId,
      isApproved,
      isApprovedByLanri,
      approvedAt,
      approvedByLanriAt,
      status
    } = body

    if (!projectId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project ID is required'
      })
    }

    // Check if project exists
    const existingProject = await db
      .select()
      .from(project)
      .where(eq(project.id, Number(projectId)))
      .limit(1)

    if (existingProject.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date()
    }

    if (isApproved !== undefined) {
      updateData.isApproved = Boolean(isApproved)
      if (isApproved) {
        updateData.approvedAt = approvedAt ? new Date(approvedAt) : new Date()
      } else {
        updateData.approvedAt = null
      }
    }

    if (isApprovedByLanri !== undefined) {
      updateData.isApprovedByLanri = Boolean(isApprovedByLanri)
      if (isApprovedByLanri) {
        updateData.approvedByLanriAt = approvedByLanriAt ? new Date(approvedByLanriAt) : new Date()
      } else {
        updateData.approvedByLanriAt = null
      }
    }

    if (status) {
      updateData.status = status
    }

    const updatedProject = await db
      .update(project)
      .set(updateData)
      .where(eq(project.id, Number(projectId)))
      .returning()

    return {
      success: true,
      data: updatedProject[0],
      message: 'Project approval status updated successfully'
    }
  } catch (error) {
    console.error('Error updating project approval:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update project approval'
    })
  }
}
