import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from '../db'
import { eq } from 'drizzle-orm'
import { users } from '../database/schema/users'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  // Validate input
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username and password are required'
    })
  }

  try {
    // Find user by username
    const user = await db.select().from(users).where(eq(users.username, username)).limit(1)
    
    if (!user || user.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    const foundUser = user[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, foundUser.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        roleId: foundUser.roleId
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = foundUser

    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token
    }
  } catch (error) {
    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
