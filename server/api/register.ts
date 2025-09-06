import bcrypt from 'bcryptjs'
import { db } from '../db'
import { eq } from 'drizzle-orm'
import { users } from '../database/schema/users'

export default defineEventHandler(async (event) => {
  const { name, username, email, password, institutionId, position } = await readBody(event)

  // Validate input
  if (!name || !username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, username, and password are required'
    })
  }

  try {
    // Check if username already exists
    const existingUser = await db.select().from(users).where(eq(users.username, username)).limit(1)
    
    if (existingUser && existingUser.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Username already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = await db.insert(users).values({
      name,
      username,
      password: hashedPassword,
      roleId: 2, // Default to regular user role
    }).returning({
      id: users.id,
      name: users.name,
      username: users.username,
      roleId: users.roleId
    })

    return {
      success: true,
      message: 'Registration successful',
      user: newUser[0]
    }
  } catch (error) {
    console.error('Registration error:', error)
    
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
