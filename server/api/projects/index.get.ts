export default defineEventHandler(async (event) => {
  try {
    // Get query parameters
    const query = getQuery(event)
    const { limit = 50, offset = 0, search, category, status } = query

    // Mock projects data
    const projects = [
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
        createdAt: '2024-01-15T00:00:00.000Z',
        updatedAt: '2024-12-01T00:00:00.000Z'
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
        createdAt: '2023-08-01T00:00:00.000Z',
        updatedAt: '2024-03-31T00:00:00.000Z'
      },
      {
        id: '3',
        title: 'Sistem Informasi Manajemen Sekolah',
        description: 'SIMS untuk mengelola data sekolah secara digital',
        category: 'digitalisasi',
        status: 'active',
        progressPercentage: 85,
        user: {
          id: '3',
          name: 'Maya Sari',
          email: 'maya.sari@kemdikbud.go.id',
          instansi: 'Kemdikbud'
        },
        institution: {
          id: '3',
          name: 'Kementerian Pendidikan',
          shortName: 'Kemdikbud'
        },
        createdAt: '2024-02-01T00:00:00.000Z',
        updatedAt: '2024-11-15T00:00:00.000Z'
      },
      {
        id: '4',
        title: 'SAKIP Digital Monitoring',
        description: 'Sistem monitoring SAKIP berbasis digital',
        category: 'sakip_reformasi',
        status: 'active',
        progressPercentage: 60,
        user: {
          id: '4',
          name: 'Ahmad Rahman',
          email: 'ahmad.rahman@bpkp.go.id',
          instansi: 'BPKP'
        },
        institution: {
          id: '4',
          name: 'BPKP',
          shortName: 'BPKP'
        },
        createdAt: '2024-03-01T00:00:00.000Z',
        updatedAt: '2024-12-01T00:00:00.000Z'
      }
    ]

    // Apply filters
    let filteredProjects = projects

    if (search) {
      const searchTerm = search.toString().toLowerCase()
      filteredProjects = filteredProjects.filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.user.name.toLowerCase().includes(searchTerm)
      )
    }

    if (category) {
      filteredProjects = filteredProjects.filter(project => project.category === category)
    }

    if (status) {
      filteredProjects = filteredProjects.filter(project => project.status === status)
    }

    // Apply pagination
    const startIndex = Number(offset)
    const endIndex = startIndex + Number(limit)
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex)

    return {
      success: true,
      data: {
        projects: paginatedProjects,
        total: filteredProjects.length,
        limit: Number(limit),
        offset: Number(offset)
      }
    }
  } catch (error) {
    console.error('Projects API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})
