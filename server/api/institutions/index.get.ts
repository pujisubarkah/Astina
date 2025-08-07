export default defineEventHandler(async (event) => {
  try {
    // Mock data for institutions - replace with real database query later
    const institutions = [
      {
        id: 1,
        name: "Kementerian Sosial",
        shortName: "Kemensos",
        type: "ministry",
        category: "government",
        description: "Kementerian yang menangani urusan sosial dan kesejahteraan rakyat",
        address: "Jl. Saharjo No. 31, Jakarta Selatan",
        phone: "+62-21-8370-5111",
        email: "info@kemensos.go.id",
        website: "https://kemensos.go.id",
        isActive: true,
        totalProjects: 15,
        activeProjects: 8,
        totalBudget: "125000000000",
        completedProjects: 7,
        createdAt: new Date('2024-01-01')
      },
      {
        id: 2,
        name: "Balai Penelitian dan Pengembangan Kesejahteraan Sosial",
        shortName: "Balitbangsos",
        type: "research_institute",
        category: "government",
        description: "Lembaga penelitian dan pengembangan di bidang kesejahteraan sosial",
        address: "Jl. Dewi Sartika No. 200, Cawang, Jakarta Timur",
        phone: "+62-21-8090-8796",
        email: "info@balitbangsos.kemensos.go.id",
        website: "https://balitbangsos.kemensos.go.id",
        isActive: true,
        totalProjects: 12,
        activeProjects: 6,
        totalBudget: "85000000000",
        completedProjects: 6,
        createdAt: new Date('2024-01-01')
      },
      {
        id: 3,
        name: "Badan Perencanaan Pembangunan Nasional",
        shortName: "Bappenas",
        type: "planning_agency",
        category: "government",
        description: "Badan perencanaan pembangunan nasional",
        address: "Jl. Taman Suropati No. 2, Jakarta Pusat",
        phone: "+62-21-392-6248",
        email: "info@bappenas.go.id",
        website: "https://bappenas.go.id",
        isActive: true,
        totalProjects: 8,
        activeProjects: 4,
        totalBudget: "200000000000",
        completedProjects: 4,
        createdAt: new Date('2024-01-01')
      },
      {
        id: 4,
        name: "Kementerian Keuangan",
        shortName: "Kemenkeu",
        type: "ministry",
        category: "government",
        description: "Kementerian yang menangani urusan keuangan negara",
        address: "Jl. Dr. Wahidin Raya No. 1, Jakarta Pusat",
        phone: "+62-21-384-5563",
        email: "info@kemenkeu.go.id",
        website: "https://kemenkeu.go.id",
        isActive: true,
        totalProjects: 5,
        activeProjects: 3,
        totalBudget: "75000000000",
        completedProjects: 2,
        createdAt: new Date('2024-01-01')
      },
      {
        id: 5,
        name: "Universitas Indonesia",
        shortName: "UI",
        type: "university",
        category: "academic",
        description: "Universitas negeri terkemuka di Indonesia",
        address: "Kampus UI Depok, Jawa Barat",
        phone: "+62-21-7863-5555",
        email: "info@ui.ac.id",
        website: "https://ui.ac.id",
        isActive: true,
        totalProjects: 3,
        activeProjects: 2,
        totalBudget: "25000000000",
        completedProjects: 1,
        createdAt: new Date('2024-01-01')
      }
    ]

    return {
      success: true,
      data: {
        institutions,
        total: institutions.length,
        summary: {
          totalInstitutions: institutions.length,
          activeInstitutions: institutions.filter(i => i.isActive).length,
          totalProjects: institutions.reduce((sum, i) => sum + i.totalProjects, 0),
          totalBudget: institutions.reduce((sum, i) => sum + parseInt(i.totalBudget), 0).toString(),
          byType: institutions.reduce((acc, inst) => {
            acc[inst.type] = (acc[inst.type] || 0) + 1
            return acc
          }, {} as Record<string, number>),
          byCategory: institutions.reduce((acc, inst) => {
            acc[inst.category] = (acc[inst.category] || 0) + 1
            return acc
          }, {} as Record<string, number>)
        }
      }
    }
  } catch (error) {
    console.error('Error fetching institutions:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch institutions'
    })
  }
})
