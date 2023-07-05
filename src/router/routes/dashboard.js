export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Home.vue'),
    meta: {
      title: 'Dashboard - propertyNet',
      requiresAuth: true,
    },
  },
  {
    path: '/faqs',
    name: 'faqs',
    component: () => import('@/views/faqs/FAQS.vue'),
    meta: {
      title: 'FAQs - propertyNet',
      requiresAuth: true,
      resource: 'FAQs',
      pageTitle: 'FAQS',
      breadcrumb: [
        {
          text: 'FAQS',
        },
        {
          text: 'List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/faqs/add',
    name: 'add-faq',
    component: () => import('@/views/faqs/control-faqs/AddEditFAQ.vue'),
    meta: {
      title: 'Add FAQS - propertyNet',
      requiresAuth: false,
      resource: 'offers',
      pageTitle: 'FAQS',
      breadcrumb: [
        {
          text: 'FAQS',
          to: '/faqs',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/faqs/edit/:id',
    name: 'edit-faq',
    component: () => import('@/views/faqs/control-faqs/AddEditFAQ.vue'),
    meta: {
      title: 'Edit FAQS - propertyNet',
      requiresAuth: false,
      pageTitle: 'FAQS',

      breadcrumb: [
        {
          text: 'FAQS',
          to: '/faqs',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/features',
    name: 'features',
    component: () => import('@/views/features/Features.vue'),
    meta: {
      title: 'Features - propertyNet',
      requiresAuth: true,
      resource: 'features',
      pageTitle: 'Features',
      breadcrumb: [
        {
          text: 'Features',
        },
        {
          text: 'List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/features/add',
    name: 'add-features',
    component: () => import('@/views/features/control-features/AddEditFeature.vue'),
    meta: {
      title: 'Add Features - propertyNet',
      requiresAuth: false,
      resource: 'offers',
      pageTitle: 'Features',
      breadcrumb: [
        {
          text: 'Features',
          to: '/features',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/features/edit/:id',
    name: 'edit-features',
    component: () => import('@/views/features/control-features/AddEditFeature.vue'),
    meta: {
      title: 'Edit Features - propertyNet',
      requiresAuth: false,
      pageTitle: 'Features',
      breadcrumb: [
        {
          text: 'Features',
          to: '/features',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },

  {
    path: '/testimonials',
    name: 'testimonials',
    component: () => import('@/views/testimonials/Testimonial.vue'),
    meta: {
      title: 'Testimonials',
      requiresAuth: true,
      pageTitle: 'Testimonials',
      resource: 'testimonials',
    },
  },
  {
    path: '/testimonials/add',
    name: 'add-testimonial',
    component: () => import('@/views/testimonials/control-testimonial/AddEditTestimonial.vue'),
    meta: {
      title: 'Add Testimonial - propertyNet',
      requiresAuth: false,
      pageTitle: 'Testimonials',
      breadcrumb: [
        {
          text: 'Testimonials',
          to: '/testimonials',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/testimonials/edit/:id',
    name: 'edit-testimonial',
    component: () => import('@/views/testimonials/control-testimonial/AddEditTestimonial.vue'),
    meta: {
      title: 'Edit Testimonial - propertyNet',
      requiresAuth: false,
      pageTitle: 'Testimonials',
      breadcrumb: [
        {
          text: 'Testimonials',
          to: '/testimonials',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: () => import('@/views/about-us/AboutUs.vue'),
    meta: {
      title: 'About us',
      requiresAuth: true,
      pageTitle: 'About us',

      resource: 'about-us',
    },
  },
  {
    path: '/about-us/add',
    name: 'add-about-us',
    component: () => import('@/views/about-us/control-about-us/AddEditAboutUs.vue'),
    meta: {
      title: 'Add About us - propertyNet',
      requiresAuth: false,
      pageTitle: 'About us',
      breadcrumb: [
        {
          text: 'About us',
          to: '/about-us',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/about-us/edit/:id',
    name: 'edit-about-us',
    component: () => import('@/views/about-us/control-about-us/AddEditAboutUs.vue'),
    meta: {
      title: 'Edit About us - propertyNet',
      requiresAuth: false,
      pageTitle: 'About us',
      breadcrumb: [
        {
          text: 'About us',
          to: '/about-us',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/about-us-features',
    name: 'about-us-features',
    component: () => import('@/views/about-us-features/Features.vue'),
    meta: {
      title: 'About Us Features - propertyNet',
      requiresAuth: true,
      resource: 'features',
      pageTitle: 'About Us Features',
      breadcrumb: [
        {
          text: 'About Us Features',
        },
        {
          text: 'List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/about-us-features/add',
    name: 'add-about-us-features',
    component: () => import('@/views/about-us-features/control-features/AddEditFeature.vue'),
    meta: {
      title: 'Add About Us Features - propertyNet',
      requiresAuth: false,
      resource: 'offers',
      pageTitle: 'About Us Features',
      breadcrumb: [
        {
          text: 'About Us Features',
          to: '/about-us-features',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/about-us-features/edit/:id',
    name: 'edit-about-us-features',
    component: () => import('@/views/about-us-features/control-features/AddEditFeature.vue'),
    meta: {
      title: 'Edit About Us Features - propertyNet',
      requiresAuth: false,
      pageTitle: 'About Us Features',
      breadcrumb: [
        {
          text: 'About Us Features',
          to: '/about-us-features',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },

  {
    path: '/service-features',
    name: 'service-features',
    component: () => import('@/views/service-features/Features.vue'),
    meta: {
      title: 'Services Features - propertyNet',
      requiresAuth: true,
      resource: 'features',
      pageTitle: 'Services Features',
      breadcrumb: [
        {
          text: 'Services Features',
        },
        {
          text: 'List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/service-features/add',
    name: 'add-service-features',
    component: () => import('@/views/service-features/control-features/AddEditFeature.vue'),
    meta: {
      title: 'Add Services Features - propertyNet',
      requiresAuth: false,
      resource: 'offers',
      pageTitle: 'Services Features',
      breadcrumb: [
        {
          text: 'Services Features',
          to: '/service-features',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/service-features/edit/:id',
    name: 'edit-service-features',
    component: () => import('@/views/service-features/control-features/AddEditFeature.vue'),
    meta: {
      title: 'Edit Services Features - propertyNet',
      requiresAuth: false,
      pageTitle: 'Services Features',
      breadcrumb: [
        {
          text: 'Services Features',
          to: '/service-features',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },

  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/services/Services.vue'),
    meta: {
      title: 'Services',
      requiresAuth: true,
      pageTitle: 'Services',

      resource: 'service',
    },
  },
  {
    path: '/services/add',
    name: 'add-service',
    component: () => import('@/views/services/control-service/AddEditService.vue'),
    meta: {
      title: 'Add Service - propertyNet',
      requiresAuth: false,
      pageTitle: 'Services',
      breadcrumb: [
        {
          text: 'Services',
          to: '/services',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/service/edit/:id',
    name: 'edit-service',
    component: () => import('@/views/services/control-service/AddEditService.vue'),
    meta: {
      title: 'Edit Service- propertyNet',
      requiresAuth: false,
      pageTitle: 'Services',
      breadcrumb: [
        {
          text: 'Services',
          to: '/services',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sliders',
    name: 'sliders',
    component: () => import('@/views/sliders/Sliders.vue'),
    meta: {
      title: 'Sliders',
      requiresAuth: true,
      pageTitle: 'Sliders',

      resource: 'sliders',
    },
  },
  {
    path: '/sliders/add',
    name: 'add-slider',
    component: () => import('@/views/sliders/control-sliders/AddEditSliders.vue'),
    meta: {
      title: 'Add Slider - propertyNet',
      requiresAuth: false,
      pageTitle: 'Sliders',
      breadcrumb: [
        {
          text: 'Sliders',
          to: '/sliders',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sliders/edit/:id',
    name: 'edit-slider',
    component: () => import('@/views/sliders/control-sliders/AddEditSliders.vue'),
    meta: {
      title: 'Edit Slider - propertyNet',
      requiresAuth: false,
      pageTitle: 'Sliders',
      breadcrumb: [
        {
          text: 'Sliders',
          to: '/sliders',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/social',
    name: 'social',
    component: () => import('@/views/social/Social.vue'),
    meta: {
      title: 'Social - propertyNet',
      requiresAuth: true,
      pageTitle: 'Social',
      breadcrumb: [
        {
          text: 'Social',
          active: true,
        },

      ],
    },
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/clients/Clients.vue'),
    meta: {
      title: 'Clients - propertyNet',
      requiresAuth: true,
      pageTitle: 'Clients',

      breadcrumb: [
        {
          text: 'Clients',
          active: true,
        },

      ],
    },
  },

  {
    path: '/clients/add',
    name: 'add-partner',
    component: () => import('@/views/clients/control-clients/AddClients.vue'),
    meta: {
      title: 'Add Partner - propertyNet',
      requiresAuth: false,
      pageTitle: 'Clients',
      breadcrumb: [
        {
          text: 'Clients',
          to: '/clients',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/clients/edit/:id',
    name: 'edit-partner',
    component: () => import('@/views/clients/control-clients/AddClients.vue'),
    meta: {
      title: 'Edit Clients - propertyNet',
      requiresAuth: false,
      pageTitle: 'Clients',
      breadcrumb: [
        {
          text: 'Clients',
          to: '/clients',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/categories/Categories.vue'),
    meta: {
      title: 'Categories - propertyNet',
      requiresAuth: true,
      pageTitle: 'Categories',
      breadcrumb: [
        {
          text: 'Categories',
          active: true,
        },

      ],
    },
  },
  {
    path: '/categories/view/:id',
    name: 'view-category',
    component: () => import('@/views/categories/control-categories/ViewCategory.vue'),
    meta: {
      title: 'view Categories - propertyNet',
      requiresAuth: false,
      pageTitle: 'Categories',
      breadcrumb: [
        {
          text: 'Categories',
          to: '/categories',
        },
        {
          text: 'view',
          active: true,
        },
      ],
    },
  },
  {
    path: '/categories/add',
    name: 'add-categories',
    component: () => import('@/views/categories/control-categories/AddEditCategories.vue'),
    meta: {
      title: 'Add Categories - propertyNet',
      requiresAuth: false,
      pageTitle: 'Categories',
      breadcrumb: [
        {
          text: 'Categories',
          to: '/categories',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/categories/edit/:id',
    name: 'edit-categories',
    component: () => import('@/views/categories/control-categories/AddEditCategories.vue'),
    meta: {
      title: 'Edit Categories - propertyNet',
      requiresAuth: false,
      pageTitle: 'Categories',
      breadcrumb: [
        {
          text: 'Categories',
          to: '/categories',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('@/views/contacts/Contacts.vue'),
    meta: {
      title: 'Contacts',
      requiresAuth: true,
      pageTitle: 'Contacts',

      breadcrumb: [
        {
          text: 'Contacts',
          active: true,
        },

      ],
    },
  },
  {
    path: '/contacts/view/:id',
    name: 'view-contact',
    component: () => import('@/views/contacts/ViewContact.vue'),
    meta: {
      title: 'Contacts',
      requiresAuth: true,
      pageTitle: 'Contacts',
      breadcrumb: [
        {
          text: 'Contacts',
          to: '/contacts',
        },
        {
          text: 'view',
          active: true,
        },
      ],
    },

  },
]
