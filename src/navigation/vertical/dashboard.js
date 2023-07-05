export default [
  {
    title: 'Dashboards',
    route: 'dashboard',
    icon: 'HomeIcon',

  },
  {
    title: 'Sliders',
    route: 'sliders',
    icon: 'ImageIcon',
    action: 'browes',
  },
  {
    title: 'Testimonials',
    route: 'testimonials',
    icon: 'UserIcon',
    action: 'browes',
  },
  {
    title: 'Clients',
    route: 'clients',
    icon: 'UsersIcon',
    action: 'browes',
  },
  {
    title: 'Social',
    route: 'social',
    icon: 'TwitchIcon',
    action: 'browes',
  },
  {
    title: 'Categories',
    route: 'categories',
    icon: 'LayersIcon',
    action: 'browes',
  },
  {
    title: 'Features',
    route: 'features',
    icon: 'FeatherIcon',
    action: 'browes',

  },
  {
    title: 'About Us',
    icon: 'InfoIcon',
    children: [
      {
        title: 'Sections',
        route: 'about-us',
        action: 'browes',

      },
      {
        title: 'Features',
        route: 'about-us-features',
        action: 'browes',

      },
    ],
  },
  {
    title: 'Services',
    icon: 'BookIcon',
    children: [
      {
        title: 'Sections',
        route: 'services',
        action: 'browes',

      },
      {
        title: 'Features',
        route: 'service-features',
        action: 'browes',

      },
    ],
  },

  {
    title: 'Contacts',
    route: 'contacts',
    icon: 'MailIcon',
    action: 'browes',

  },

  {
    title: 'FAQS',
    route: 'faqs',
    icon: 'HelpCircleIcon',
    action: 'browes',

  },

]
