export default defineEventHandler(async (event) => {
  try {
    // Get query parameters
    const query = getQuery(event)
    const { projectId, limit = 50, offset = 0 } = query

    // Mock media coverage data
    const mediaCoverage = [
      {
        id: '1',
        projectId: '1',
        title: 'Kemendagri Luncurkan Sistem Perizinan Digital UMKM',
        mediaOutlet: 'Kompas.com',
        mediaType: 'online',
        url: 'https://kompas.com/news/perizinan-digital-umkm',
        publishedDate: '2024-06-15T10:00:00.000Z',
        reach: 150000,
        engagement: 2500,
        sentiment: 'positive',
        content: 'Kementerian Dalam Negeri meluncurkan sistem perizinan digital untuk UMKM...',
        keywords: ['digitalisasi', 'perizinan', 'UMKM', 'kemendagri']
      },
      {
        id: '2',
        projectId: '2',
        title: 'Portal Kesehatan Online Permudah Akses Layanan Masyarakat',
        mediaOutlet: 'Detik.com',
        mediaType: 'online',
        url: 'https://detik.com/news/portal-kesehatan-online',
        publishedDate: '2024-04-10T14:30:00.000Z',
        reach: 120000,
        engagement: 1800,
        sentiment: 'positive',
        content: 'Kementerian Kesehatan meluncurkan portal kesehatan online...',
        keywords: ['kesehatan', 'portal', 'online', 'pelayanan']
      },
      {
        id: '3',
        projectId: '1',
        title: 'Transformasi Digital Perizinan UMKM di Era Modern',
        mediaOutlet: 'Republika',
        mediaType: 'print',
        publishedDate: '2024-07-20T08:00:00.000Z',
        reach: 80000,
        engagement: 450,
        sentiment: 'positive',
        content: 'Digitalisasi perizinan UMKM menjadi terobosan baru...',
        keywords: ['transformasi digital', 'perizinan', 'UMKM']
      },
      {
        id: '4',
        projectId: '3',
        title: 'SIMS: Revolusi Manajemen Sekolah Digital',
        mediaOutlet: 'Tempo.co',
        mediaType: 'online',
        url: 'https://tempo.co/news/sims-revolusi-sekolah',
        publishedDate: '2024-11-10T16:45:00.000Z',
        reach: 200000,
        engagement: 3200,
        sentiment: 'positive',
        content: 'Sistem Informasi Manajemen Sekolah mengubah cara pengelolaan...',
        keywords: ['SIMS', 'sekolah', 'digital', 'manajemen']
      },
      {
        id: '5',
        projectId: '2',
        title: 'E-Health: Inovasi Pelayanan Kesehatan Digital',
        mediaOutlet: 'Metro TV',
        mediaType: 'broadcast',
        publishedDate: '2024-05-15T19:00:00.000Z',
        reach: 180000,
        engagement: 850,
        sentiment: 'positive',
        content: 'Laporan khusus tentang inovasi e-health di Indonesia...',
        keywords: ['e-health', 'inovasi', 'kesehatan', 'digital']
      }
    ]

    // Apply filters
    let filteredCoverage = mediaCoverage

    if (projectId) {
      filteredCoverage = filteredCoverage.filter(coverage => coverage.projectId === projectId)
    }

    // Apply pagination
    const startIndex = Number(offset)
    const endIndex = startIndex + Number(limit)
    const paginatedCoverage = filteredCoverage.slice(startIndex, endIndex)

    // Calculate stats
    const totalReach = filteredCoverage.reduce((sum, item) => sum + item.reach, 0)
    const totalEngagement = filteredCoverage.reduce((sum, item) => sum + item.engagement, 0)
    const sentimentBreakdown = filteredCoverage.reduce((acc, item) => {
      acc[item.sentiment] = (acc[item.sentiment] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const mediaTypeBreakdown = filteredCoverage.reduce((acc, item) => {
      acc[item.mediaType] = (acc[item.mediaType] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      success: true,
      data: {
        coverage: paginatedCoverage,
        total: filteredCoverage.length,
        stats: {
          totalReach,
          totalEngagement,
          sentimentBreakdown,
          mediaTypeBreakdown
        },
        limit: Number(limit),
        offset: Number(offset)
      }
    }
  } catch (error) {
    console.error('Media coverage API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch media coverage',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})
