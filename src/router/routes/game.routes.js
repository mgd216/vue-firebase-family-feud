const Game = () => import('@/views/game/Game')

export default [
  {
    path: '/game',
    name: 'Game',
    component: Game,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
      appTitle: 'Game',
    },
  },
]
