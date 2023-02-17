export default [
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404/index.vue'),
    meta: {
      meta: '404',
      permissions: ['user', 'admin']
    }
  },
  {
    path: '/',
    redirect: '/login',
    meta: {
      permissions: ['user', 'admin']
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    meta: {
      label: '登录',
      permissions: ['user', 'admin']
    }
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/booksManagement',
    component: () => import('../layout/index.vue'),
    meta: {
      permissions: ['user', 'admin']
    },
    children: [
      // 图书管理
      {
        path: 'booksManagement',
        name: 'booksManagement',
        component: () => import('../views/BooksManagement/index.vue'),
        meta: {
          label: '图书管理',
          permissions: ['admin']
        }
      },
      // 用户管理
      {
        path: 'usersManagement',
        name: 'usersManagement',
        component: () => import('../views/usersManagement/index.vue'),
        meta: {
          label: '用户管理',
          permissions: ['admin']
        }
      },
    ]
  }
]
