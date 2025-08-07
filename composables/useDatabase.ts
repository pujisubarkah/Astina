// Simple database operations for Astina
// This is a simplified version to avoid complex dependencies

export const useDatabase = () => {
  // Mock data for now - replace with real database calls later
  const getProjectStats = async () => {
    return {
      total: 156,
      completed: 89,
      active: 67,
      averageProgress: 73
    }
  }

  const getProjectsByCategory = async () => {
    return [
      { category: 'digitalisasi', count: 62 },
      { category: 'sakip_reformasi', count: 45 },
      { category: 'manajemen_perubahan', count: 32 },
      { category: 'inovasi', count: 17 }
    ]
  }

  const getProjectsByInstitution = async () => {
    return [
      { institution: 'Kemendagri', shortName: 'Kemendagri', count: 25 },
      { institution: 'Kemenkes', shortName: 'Kemenkes', count: 22 },
      { institution: 'Kemdikbudristek', shortName: 'Kemdikbud', count: 20 },
      { institution: 'Kementerian PUPR', shortName: 'PUPR', count: 18 },
      { institution: 'BPKP', shortName: 'BPKP', count: 15 }
    ]
  }

  const getMediaStats = async () => {
    return {
      totalArticles: 287,
      totalReach: 2450000,
      byType: [
        { type: 'online', count: 189 },
        { type: 'print', count: 98 },
        { type: 'broadcast', count: 65 },
        { type: 'social', count: 89 }
      ]
    }
  }

  const getProjects = async (limit = 50, offset = 0) => {
    // Mock projects data
    return [
      {
        id: '1',
        title: 'Digitalisasi Sistem Perizinan UMKM',
        description: 'Implementasi sistem digital untuk perizinan UMKM',
        category: 'digitalisasi',
        status: 'active',
        progressPercentage: 75,
        user: {
          id: '1',
          name: 'Budi Santoso',
          email: 'budi.santoso@kemendagri.go.id',
          instansi: 'Kemendagri'
        },
        institution: {
          id: '1',
          name: 'Kementerian Dalam Negeri',
          shortName: 'Kemendagri'
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-12-01')
      },
      {
        id: '2',
        title: 'E-Government Pelayanan Kesehatan',
        description: 'Portal terintegrasi layanan kesehatan online',
        category: 'digitalisasi',
        status: 'completed',
        progressPercentage: 100,
        user: {
          id: '2',
          name: 'Sari Dewi',
          email: 'sari.dewi@kemenkes.go.id',
          instansi: 'Kemenkes'
        },
        institution: {
          id: '2',
          name: 'Kementerian Kesehatan',
          shortName: 'Kemenkes'
        },
        createdAt: new Date('2023-08-01'),
        updatedAt: new Date('2024-03-31')
      }
    ]
  }

  const getProjectById = async (id: string) => {
    const projects = await getProjects()
    return projects.find(p => p.id === id) || null
  }

  const createProject = async (projectData: any) => {
    // Mock create - return the data with an ID
    return {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  const updateProject = async (id: string, updates: any) => {
    // Mock update
    return {
      id,
      ...updates,
      updatedAt: new Date()
    }
  }

  const searchProjects = async (searchTerm: string, category?: string, status?: string) => {
    const projects = await getProjects()
    return projects.filter(project => {
      const matchesSearch = !searchTerm || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = !category || project.category === category
      const matchesStatus = !status || project.status === status
      
      return matchesSearch && matchesCategory && matchesStatus
    })
  }

  const getMediaCoverage = async (projectId?: string) => {
    // Mock media coverage data
    return [
      {
        id: '1',
        projectId: '1',
        title: 'Kemendagri Luncurkan Sistem Perizinan Digital',
        mediaOutlet: 'Kompas.com',
        mediaType: 'online',
        url: 'https://kompas.com/news/perizinan-digital',
        publishedDate: new Date('2024-06-15'),
        reach: 150000,
        engagement: 2500,
        sentiment: 'positive'
      },
      {
        id: '2',
        projectId: '2',
        title: 'Portal Kesehatan Online Permudah Akses Layanan',
        mediaOutlet: 'Detik.com',
        mediaType: 'online',
        url: 'https://detik.com/news/portal-kesehatan',
        publishedDate: new Date('2024-04-10'),
        reach: 120000,
        engagement: 1800,
        sentiment: 'positive'
      }
    ].filter(coverage => !projectId || coverage.projectId === projectId)
  }

  const getUsers = async () => {
    return [
      {
        id: '1',
        name: 'Budi Santoso',
        email: 'budi.santoso@kemendagri.go.id',
        instansi: 'Kemendagri',
        jabatan: 'Direktur Reformasi Birokrasi'
      },
      {
        id: '2',
        name: 'Sari Dewi',
        email: 'sari.dewi@kemenkes.go.id',
        instansi: 'Kemenkes',
        jabatan: 'Kepala Bagian Inovasi'
      }
    ]
  }

  const getUserById = async (id: string) => {
    const users = await getUsers()
    return users.find(u => u.id === id) || null
  }

  const getInstitutions = async () => {
    return [
      {
        id: '1',
        name: 'Kementerian Dalam Negeri',
        shortName: 'Kemendagri',
        type: 'kementerian'
      },
      {
        id: '2',
        name: 'Kementerian Kesehatan',
        shortName: 'Kemenkes',
        type: 'kementerian'
      },
      {
        id: '3',
        name: 'BPKP',
        shortName: 'BPKP',
        type: 'lembaga'
      }
    ]
  }

  return {
    // Projects
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    searchProjects,
    
    // Statistics
    getProjectStats,
    getProjectsByCategory,
    getProjectsByInstitution,
    
    // Media
    getMediaCoverage,
    getMediaStats,
    
    // Users & Institutions
    getUsers,
    getUserById,
    getInstitutions
  }
}
