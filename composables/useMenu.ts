export interface MenuItem {
  id: string
  label: string
  icon: string
  route: string
  roles?: string[] // Array of roles that can access this menu
  children?: MenuItem[]
}

export interface MenuSection {
  id: string
  title: string
  items: MenuItem[]
  roles?: string[] // Array of roles that can access this section
}

export const useMenu = () => {
  // Define all available menu items
  const allMenuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M8 15l4-4 4 4',
      route: '', // Will be set dynamically for users ([slug]/dashboard)
      roles: ['user']
    },
  
    {
      id: 'upload-proper',
      label: 'Upload Proper',
      icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
      route: '', // Will be set dynamically for users ([slug]/upload_proper)
      roles: ['user']
    },
    {
      id: 'peta',
      label: 'Peta',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      route: '/peta',
      roles: ['admin', 'user']
    },
    {
      id: 'monitoring',
      label: 'Monitoring',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      route: '/monitoring',
      roles: ['admin', 'user']
    },
    {
      id: 'statistik',
      label: 'Statistik',
      icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      route: '/statistik',
      roles: ['admin', 'user']
    },
    // Admin-only menus (simplified)
    {
      id: 'admin-dashboard',
      label: 'Admin Dashboard',
      icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2',
      route: '/admin/dashboard',
      roles: ['admin']
    },
    {
      id: 'admin-approval',
      label: 'Approval',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      route: '/admin/approval',
      roles: ['admin']
    }
  ]

  // Define menu sections
  const menuSections: MenuSection[] = [
    {
      id: 'admin-section',
      title: 'Admin Menu',
      roles: ['admin'],
      items: []
    },
    {
      id: 'main-section', 
      title: 'Menu Utama',
      roles: ['admin', 'user'],
      items: []
    },
    {
      id: 'monitoring-section',
      title: 'Monitoring & Analytics',
      roles: ['admin', 'user'],
      items: []
    }
  ]

  // Function to get menu items by role with dynamic routes
  const getMenuByRole = (userRole: string, userSlug?: string) => {
    const role = userRole?.toLowerCase() || 'user'
    
    // Helper function to set dynamic routes for user-specific menus
    const setDynamicRoute = (item: MenuItem): MenuItem => {
      if (role === 'user' && userSlug) {
        switch (item.id) {
          case 'dashboard':
            return { ...item, route: `/${userSlug}/dashboard` }
          case 'upload-proper':
            return { ...item, route: `/${userSlug}/upload_proper` }
          default:
            return item
        }
      }
      return item
    }
    
    // Filter items by role and set dynamic routes
    const adminItems = allMenuItems.filter(item => 
      item.roles?.includes('admin') && role === 'admin'
    )
    
    const mainItems = allMenuItems.filter(item => 
      item.roles?.includes(role) && 
      ['dashboard', 'daftar-proyek', 'upload-proper', 'peta'].includes(item.id)
    ).map(setDynamicRoute)
    
    const monitoringItems = allMenuItems.filter(item => 
      item.roles?.includes(role) && 
      ['monitoring', 'statistik'].includes(item.id)
    )
    
    const sections: MenuSection[] = []
    
    // Add admin section only for admin users
    if (role === 'admin' && adminItems.length > 0) {
      sections.push({
        id: 'admin-section',
        title: 'Admin Menu',
        roles: ['admin'],
        items: [
          ...allMenuItems.filter(item => 
            item.id === 'admin-dashboard' || 
            item.id === 'admin-approval'
          )
        ]
      })
    }
    
    // Add main section
    sections.push({
      id: 'main-section',
      title: role === 'admin' ? 'Menu Utama' : 'Menu Utama',
      roles: ['admin', 'user'],
      items: mainItems
    })
    
    // Add monitoring section
    sections.push({
      id: 'monitoring-section', 
      title: 'Monitoring & Analytics',
      roles: ['admin', 'user'],
      items: monitoringItems
    })
    
    return sections.filter(section => 
      section.roles?.includes(role) && section.items.length > 0
    )
  }

  // Function to check if user has access to a menu item
  const hasAccess = (menuItem: MenuItem, userRole: string) => {
    const role = userRole?.toLowerCase() || 'user'
    return menuItem.roles?.includes(role) || false
  }

  // Function to get all menu items (for admin)
  const getAllMenuItems = () => allMenuItems

  // Function to get menu item by ID
  const getMenuItemById = (id: string) => {
    return allMenuItems.find(item => item.id === id)
  }

  return {
    getMenuByRole,
    hasAccess,
    getAllMenuItems,
    getMenuItemById,
    allMenuItems,
    menuSections
  }
}
