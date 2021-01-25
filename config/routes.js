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
            path: '/uploadStaffPic',
            name: 'uploadStaffPic',
            icon: 'smile',
            routes: [
              {
                path: '/uploadStaffPic/upload',
                name: 'upload',
                icon: 'smile',
                component: './uploadStaffPic/upload',
              },
              {
                path: '/uploadStaffPic/manage',
                name: 'manage',
                icon: 'smile',
                component: './uploadStaffPic/manage',
              },
            ],
          },
          {
            path: '/uploadMainPic',
            name: 'uploadMainPic',
            icon: 'smile',
            routes: [
              {
                path: '/uploadMainPic/upload',
                name: 'upload',
                icon: 'smile',
                component: './uploadMainPic/upload',
              },
              {
                path: '/uploadMainPic/manage',
                name: 'manage',
                icon: 'smile',
                component: './uploadMainPic/manage',
              },
            ],
          },
          {
            path: '/environment',
            name: 'environment',
            icon: 'smile',
            routes: [
              {
                path: '/environment/upload',
                name: 'upload',
                icon: 'smile',
                component: './environment/upload',
              },
              {
                path: '/environment/manage',
                name: 'manage',
                icon: 'smile',
                component: './environment/manage',
              },
            ],
          },
          {
            path: '/sample',
            name: 'sample',
            icon: 'smile',
            routes: [
              {
                path: '/sample/upload',
                name: 'upload',
                icon: 'smile',
                component: './sample/upload',
              },
              {
                path: '/sample/manage',
                name: 'manage',
                icon: 'smile',
                component: './sample/manage',
              },
            ],
          },
          {
            path: '/guest',
            name: 'guest',
            icon: 'smile',
            routes: [
              {
                path: '/guest/upload',
                name: 'upload',
                icon: 'smile',
                component: './guest/upload',
              },
              {
                path: '/guest/manage',
                name: 'manage',
                icon: 'smile',
                component: './guest/manage',
              },
            ],
          },
          {
            path: '/video',
            name: 'video',
            icon: 'smile',
            routes: [
              {
                path: '/video/upload',
                name: 'upload',
                icon: 'smile',
                component: './video/upload',
              },
              {
                path: '/video/manage',
                name: 'manage',
                icon: 'smile',
                component: './video/manage',
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
