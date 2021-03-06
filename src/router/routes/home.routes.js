const Home = () => import('@/views/home/Home')

export default [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
]
