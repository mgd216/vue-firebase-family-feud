const UserList = () => import('@/views/user/UserList.vue')
const UserProfile = () => import('@/views/user/UserProfile.vue')
const UserProfileEntry = () => import('@/views/user/UserProfileEntry.vue')

export default [
  {
    path: '/user-list',
    name: 'UserList',
    component: UserList,
    meta: {
      requiresAuth: true,
      appTitle: 'Users',
    },
  },
  {
    path: '/user-profile/:uid?',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      requiresAuth: true,
      appTitle: 'Users',
    },
  },
  {
    path: '/user-profile-entry/:id?',
    name: 'UserProfileEntry',
    component: UserProfileEntry,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      appTitle: 'Users',
    },
  },
]
