// Client-side composables for API calls
export const useApi = () => {
  // Dashboard stats
  const getDashboardStats = async () => {
    try {
      const response = await $fetch('/api/dashboard/stats') as any
      return response.data
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      throw error
    }
  }

  // Projects
  const getProjects = async (params: {
    limit?: number
    offset?: number
    search?: string
    category?: string
    status?: string
  } = {}) => {
    try {
      const query = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          query.append(key, value.toString())
        }
      })
      
      const queryString = query.toString()
      const url = `/api/projects${queryString ? `?${queryString}` : ''}`
      
      const response = await $fetch(url) as any
      return response.data
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      throw error
    }
  }

  const getProjectById = async (id: string) => {
    try {
      const response = await $fetch(`/api/projects/${id}`) as any
      return response.data
    } catch (error) {
      console.error('Failed to fetch project:', error)
      throw error
    }
  }

  // Media coverage
  const getMediaCoverage = async (params: {
    projectId?: string
    limit?: number
    offset?: number
  } = {}) => {
    try {
      const query = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          query.append(key, value.toString())
        }
      })
      
      const queryString = query.toString()
      const url = `/api/media/coverage${queryString ? `?${queryString}` : ''}`
      
      const response = await $fetch(url) as any
      return response.data
    } catch (error) {
      console.error('Failed to fetch media coverage:', error)
      throw error
    }
  }

  // Users
  const getUsers = async () => {
    try {
      const response = await $fetch('/api/users') as any
      return response.data
    } catch (error) {
      console.error('Failed to fetch users:', error)
      throw error
    }
  }

  // Institutions
  const getInstitutions = async () => {
    try {
      const response = await $fetch('/api/institutions') as any
      return response.data
    } catch (error) {
      console.error('Failed to fetch institutions:', error)
      throw error
    }
  }

  return {
    getDashboardStats,
    getProjects,
    getProjectById,
    getMediaCoverage,
    getUsers,
    getInstitutions
  }
}
