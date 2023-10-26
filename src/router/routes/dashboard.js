export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Home.vue'),
    meta: {
      title: 'Dashboard - ISSAGATE',
      requiresAuth: true,
    },
  },

  {
    path: '/brands',
    name: 'brands',
    component: () => import('@/views/brands/Brands.vue'),
    meta: {
      title: 'Brands - ISSAGATE',
      requiresAuth: true,
      pageTitle: 'brands',
      breadcrumb: [
        {
          text: 'Brands',
          active: true,
        },

      ],
    },
  },

  {
    path: '/brands/add',
    name: 'add-brands',
    component: () => import('@/views/brands/control-brands/AddEditBrands.vue'),
    meta: {
      title: 'Add brands - ISSAGATE',
      requiresAuth: false,
      pageTitle: 'Brands',
      breadcrumb: [
        {
          text: 'Brands',
          to: '/brands',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/brands/edit/:id',
    name: 'edit-brands',
    component: () => import('@/views/brands/control-brands/AddEditBrands.vue'),
    meta: {
      title: 'Edit brands - ISSAGATE',
      requiresAuth: false,
      pageTitle: 'brands',
      breadcrumb: [
        {
          text: 'brands',
          to: '/brands',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },

]
