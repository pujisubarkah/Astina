import jwt from 'jsonwebtoken'
import { db } from '../../db'
import { eq } from 'drizzle-orm'
import { users } from '../../database/schema/users'

export default defineEventHandler(async (event) => {
  // Get authorization header
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - No token provided'
    })
  }

  const token = authHeader.substring(7) // Remove 'Bearer ' prefix

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any

    if (!decoded || !decoded.userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - Invalid token'
      })
    }

    // Get user data from database
    const user = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1)

    if (!user || user.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    const foundUser = user[0]

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = foundUser

    return {
      success: true,
      user: userWithoutPassword
    }
  } catch (error) {
    console.error('User API error:', error)

    if (error instanceof jwt.JsonWebTokenError) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - Invalid token'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})