const Admin = () => import('@/views/admin/Admin')

export default [
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
      appTitle: 'Admin',
    },
  },
]
