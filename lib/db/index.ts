// Mock database connection untuk development
// Akan diganti dengan real database connection nanti

export const db = {
  select: () => ({
    from: () => ({
      where: () => ({
        orderBy: () => ({
          limit: () => ({
            offset: () => Promise.resolve([])
          })
        })
      })
    })
  }),
  insert: () => ({
    values: () => ({
      returning: () => Promise.resolve([])
    })
  }),
  update: () => ({
    set: () => ({
      where: () => ({
        returning: () => Promise.resolve([])
      })
    })
  }),
  delete: () => ({
    where: () => ({
      returning: () => Promise.resolve([])
    })
  })
}

// Type untuk compatibility
export type DbType = typeof db