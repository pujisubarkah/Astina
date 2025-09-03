import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
    const { username, password } = body

    // Validate input
    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username and password are required'
      })
    }

    console.log('Login attempt for username:', username)

    // Find user by username
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)
    
    if (user.length === 0) {
      console.log('User not found:', username)
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password'
      })
    }

    const foundUser = user[0]
    console.log('User found:', foundUser.username)

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password)
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username)
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password'
      })
    }

    console.log('Password valid, generating token...')

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: foundUser.id, 
        username: foundUser.username,
        roleId: foundUser.roleId
      },
      process.env.JWT_SECRET || 'default-secret-key',
      { expiresIn: '24h' }
    )

    // Update last login timestamp
    await db
      .update(users)
      .set({ updatedAt: new Date() })
      .where(eq(users.id, foundUser.id))

    console.log('Login successful for user:', username)

    return {
      success: true,
      message: 'Login successful',
      user: {
        id: foundUser.id,
        name: foundUser.name,
        username: foundUser.username,
        roleId: foundUser.roleId
      },
      token
    }

  } catch (error: any) {
    console.error('Login error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error during login'
    })
  }
})
