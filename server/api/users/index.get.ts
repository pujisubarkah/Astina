export default defineEventHandler(async (event) => {
  try {
    // Mock data for users - replace with real database query later
    const users = [
      {
        id: 1,
        name: "Dr. Ahmad Sudrajat",
        email: "ahmad.sudrajat@kemensos.go.id",
        role: "admin",
        institutionId: 1,
        institutionName: "Kementerian Sosial",
        position: "Direktur Rehabilitasi Sosial",
        isActive: true,
        createdAt: new Date('2024-01-15'),
        lastLogin: new Date('2024-12-28')
      },
      {
        id: 2,
        name: "Siti Nurhaliza, S.Sos",
        email: "siti.nurhaliza@balitbangsos.go.id",
        role: "coordinator",
        institutionId: 2,
        institutionName: "Balitbangsos Kemensos",
        position: "Peneliti Madya",
        isActive: true,
        createdAt: new Date('2024-02-01'),
        lastLogin: new Date('2024-12-27')
      },
      {
        id: 3,
        name: "Budi Santoso, M.Si",
        email: "budi.santoso@bappenas.go.id",
        role: "viewer",
        institutionId: 3,
        institutionName: "Bappenas",
        position: "Analis Kebijakan",
        isActive: true,
        createdAt: new Date('2024-02-10'),
        lastLogin: new Date('2024-12-26')
      },
      {
        id: 4,
        name: "Maria Kusuma, S.Kom",
        email: "maria.kusuma@kemensos.go.id",
        role: "operator",
        institutionId: 1,
        institutionName: "Kementerian Sosial",
        position: "Staff IT",
        isActive: true,
        createdAt: new Date('2024-03-01'),
        lastLogin: new Date('2024-12-28')
      },
      {
        id: 5,
        name: "Rahmat Hidayat, S.E",
        email: "rahmat.hidayat@kemenkeu.go.id",
        role: "viewer",
        institutionId: 4,
        institutionName: "Kementerian Keuangan",
        position: "Analis Anggaran",
        isActive: false,
        createdAt: new Date('2024-03-15'),
        lastLogin: new Date('2024-12-20')
      }
    ]

    return {
      success: true,
      data: {
        users,
        total: users.length,
        summary: {
          totalUsers: users.length,
          activeUsers: users.filter(u => u.isActive).length,
          adminUsers: users.filter(u => u.role === 'admin').length,
          byInstitution: users.reduce((acc, user) => {
            acc[user.institutionName] = (acc[user.institutionName] || 0) + 1
            return acc
          }, {} as Record<string, number>)
        }
      }
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users'
    })
  }
})
