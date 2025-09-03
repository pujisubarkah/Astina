import bcrypt from 'bcryptjs'
import { db } from '~/server/db'
import { users } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Only allow POST method
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    const { name, username, password, roleId = 1 } = body

    // Validate input
    if (!name || !username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name, username, and password are required'
      })
    }

    console.log('Creating user:', { name, username, roleId })

    // Check if username already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)
    
    if (existingUser.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Username already exists'
      })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const newUser = await db
      .insert(users)
      .values({
        name,
        username,
        password: hashedPassword,
        roleId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning({
        id: users.id,
        name: users.name,
        username: users.username,
        roleId: users.roleId
      })

    console.log('User created successfully:', newUser[0])

    return {
      success: true,
      message: 'User created successfully',
      user: newUser[0]
    }

  } catch (error: any) {
    console.error('Create user error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error during user creation'
    })
  }
})
