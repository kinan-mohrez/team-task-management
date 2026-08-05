export const API_ENDPOINTS = {
  auth: {
    base: '/auth',
    login: '/login',
  },

  users: {
    base: '/users',
  },

  projects: {
    base: '/projects',
  },

  tasks: {
    base: '/tasks',
  },

  teams: {
    base: '/teams',
  },
} as const;
