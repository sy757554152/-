export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          },
          // {
          //   name: 'list.table-list',
          //   icon: 'table',
          //   path: '/list',
          //   component: './ListTableList',
          // },
          {
            name: 'staff',
            icon: 'table',
            path: '/staffManagement',
            authority: ['admin'],
            routes: [
              {
                path: '/staffManagement/addManager',
                name: 'addManager',
                icon: 'smile',
                component: './staffManagement/addManager',
                authority: ['admin'],
              },
              {
                path: '/staffManagement/allManager',
                name: 'allManager',
                icon: 'smile',
                component: './staffManagement/allManager',
                authority: ['admin'],
              },
            ],
          },
          {
            path: '/changePassword',
            name: 'changePassword',
            icon: 'smile',
            component: './changePassword/index',
          },
          {
            path: '/type',
            name: 'type',
            icon: 'smile',
            routes: [
              {
                path: '/type/picture',
                name: 'photo',
                icon: 'smile',
                component: './type/photo',
              },
              {
                path: '/type/video',
                name: 'video',
                icon: 'smile',
                component: './type/video',
              },
            ],
          },
          {
            path: '/getForm',
            name: 'getForm',
            icon: 'smile',
            routes: [
              {
                path: '/getForm/call',
                name: 'call',
                icon: 'smile',
                component: './getForm/call',
              },
              {
                path: '/getForm/called',
                name: 'called',
                icon: 'smile',
                component: './getForm/called',
              },
            ],
          },
          {
            path: '/innerStaff',
            name: 'innerStaff',
            icon: 'smile',
            routes: [
              {
                path: '/innerStaff/addStaff',
                name: 'addStaff',
                icon: 'smile',
                component: './innerStaff/addStaff',
                authority: ['admin'],
              },
              {
                path: '/innerStaff/getStaff',
                name: 'getStaff',
                icon: 'smile',
                component: './innerStaff/getStaff',
                authority: ['admin'],
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
