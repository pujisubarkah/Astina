export default defineEventHandler(async (event) => {
  try {
    // Use mock data directly for now to avoid import issues
    const stats = {
      total: 156,
      completed: 89,
      active: 67,
      averageProgress: 73
    }

    const projectsByCategory = [
      { category: 'digitalisasi', count: 62 },
      { category: 'sakip_reformasi', count: 45 },
      { category: 'manajemen_perubahan', count: 32 },
      { category: 'inovasi', count: 17 }
    ]

    const projectsByInstitution = [
      { institution: 'Kemendagri', shortName: 'Kemendagri', count: 25 },
      { institution: 'Kemenkes', shortName: 'Kemenkes', count: 22 },
      { institution: 'Kemdikbudristek', shortName: 'Kemdikbud', count: 20 },
      { institution: 'Kementerian PUPR', shortName: 'PUPR', count: 18 },
      { institution: 'BPKP', shortName: 'BPKP', count: 15 }
    ]

    const mediaStats = {
      totalArticles: 287,
      totalReach: 2450000,
      byType: [
        { type: 'online', count: 189 },
        { type: 'print', count: 98 },
        { type: 'broadcast', count: 65 },
        { type: 'social', count: 89 }
      ]
    }
    
    return {
      success: true,
      data: {
        stats,
        projectsByCategory,
        projectsByInstitution,
        mediaStats
      }
    }
  } catch (error) {
    console.error('API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'API request failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})
