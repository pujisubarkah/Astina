import jwt from 'jsonwebtoken'

interface User {
  id: number
  name: string
  username: string
  roleId: number
}

interface LoginResponse {
  success: boolean
  message: string
  user: User
  token: string
}

export const useAuth = () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // Check if user is logged in
  const isLoggedIn = computed(() => {
    return !!token.value && !!user.value
  })

  // Initialize auth state from localStorage (client side only)
  const initAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('user_data')
      
      if (storedToken && storedUser) {
        try {
          // Verify token is not expired
          const decoded = jwt.decode(storedToken) as any
          if (decoded && decoded.exp * 1000 > Date.now()) {
            token.value = storedToken
            user.value = JSON.parse(storedUser)
          } else {
            // Token expired, clear storage
            clearAuth()
          }
        } catch (error) {
          console.error('Error parsing stored auth data:', error)
          clearAuth()
        }
      }
    }
  }

  // Login function
  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response: LoginResponse = await $fetch('/api/login', {
        method: 'POST',
        body: credentials
      })

      if (response.success) {
        token.value = response.token
        user.value = response.user

        // Store in localStorage
        if (process.client) {
          localStorage.setItem('auth_token', response.token)
          localStorage.setItem('user_data', JSON.stringify(response.user))
        }

        return { success: true, user: response.user }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Logout function
  const logout = () => {
    token.value = null
    user.value = null
    
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  }

  // Clear auth data
  const clearAuth = () => {
    logout()
  }

  // Get auth headers for API calls
  const getAuthHeaders = () => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  // Check user role
  const hasRole = (roleId: number) => {
    return user.value?.roleId === roleId
  }

  // Get user info
  const getUserInfo = () => {
    return user.value
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isLoggedIn,
    initAuth,
    login,
    logout,
    clearAuth,
    getAuthHeaders,
    hasRole,
    getUserInfo
  }
}
