export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/authentication/Login.vue'),
    meta: {
      layout: 'full',
      action: 'read',
      resource: 'Auth',
    },
  },

  {
    path: '/not-authorized',
    name: 'not-authorized',
    component: () => import('@/views/authentication/NotAuth.vue'),
    meta: {
      layout: 'full',
      action: 'read',
      resource: 'Auth',
    },
  },
]
