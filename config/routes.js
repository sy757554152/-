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
                component: './staffManagement/addManager',
                authority: ['admin'],
              },
              {
                path: '/staffManagement/allManager',
                name: 'allManager',
                component: './staffManagement/allManager',
                authority: ['admin'],
              },
            ],
          },
          {
            path: '/changePassword',
            name: 'changePassword',
            icon: 'LockOutlined',
            component: './changePassword/index',
          },
          {
            path: '/type',
            name: 'type',
            icon: 'FileAddOutlined',
            routes: [
              {
                path: '/type/picture',
                name: 'photo',
                component: './type/photo',
              },
              {
                path: '/type/video',
                name: 'video',
                component: './type/video',
              },
            ],
          },
          {
            path: '/getForm',
            name: 'getForm',
            icon: 'FileTextOutlined',
            routes: [
              {
                path: '/getForm/call',
                name: 'call',
                component: './getForm/call',
              },
              {
                path: '/getForm/called',
                name: 'called',
                component: './getForm/called',
              },
            ],
          },
          {
            path: '/innerStaff',
            name: 'innerStaff',
            icon: 'UserAddOutlined',
            authority: ['admin'],
            routes: [
              {
                path: '/innerStaff/addStaff',
                name: 'addStaff',
                component: './innerStaff/addStaff',
                authority: ['admin'],
              },
              {
                path: '/innerStaff/getStaff',
                name: 'getStaff',
                component: './innerStaff/getStaff',
                authority: ['admin'],
              },
              {
                path: '/innerStaff/changeStaff',
                hideInMenu: true,
                name: 'changeStaff',
                component: './innerStaff/changeStaff',
                authority: ['admin'],
              },
            ],
          },
          {
            path: '/uploadStaffPic',
            name: 'uploadStaffPic',
            icon: 'FileImageOutlined',
            routes: [
              {
                path: '/uploadStaffPic/upload',
                name: 'upload',
                component: './uploadStaffPic/upload',
              },
              {
                path: '/uploadStaffPic/manage',
                name: 'manage',
                component: './uploadStaffPic/manage',
                hideInMenu: true,
              },
              {
                path: '/uploadStaffPic/getStaff',
                name: 'getStaff',
                component: './uploadStaffPic/getStaff',
              },
            ],
          },
          {
            path: '/uploadMainPic',
            name: 'uploadMainPic',
            icon: 'PictureOutlined',
            routes: [
              {
                path: '/uploadMainPic/upload',
                name: 'upload',
                component: './uploadMainPic/upload',
              },
              {
                path: '/uploadMainPic/manage',
                name: 'manage',
                component: './uploadMainPic/manage',
              },
            ],
          },
          {
            path: '/environment',
            name: 'environment',
            icon: 'EnvironmentOutlined',
            routes: [
              {
                path: '/environment/upload',
                name: 'upload',
                component: './environment/upload',
              },
              {
                path: '/environment/manage',
                name: 'manage',
                component: './environment/manage',
              },
            ],
          },
          {
            path: '/sample',
            name: 'sample',
            icon: 'TagsOutlined',
            routes: [
              {
                path: '/sample/upload',
                name: 'upload',
                component: './sample/upload',
              },
              {
                path: '/sample/manage',
                name: 'manage',
                component: './sample/manage',
                hideInMenu: true,
              },
              {
                path: '/sample/getStaff',
                name: 'getStaff',
                component: './sample/getStaff',
              },
            ],
          },
          {
            path: '/guest',
            name: 'guest',
            icon: 'FundViewOutlined',
            routes: [
              {
                path: '/guest/userList',
                name: 'userList',
                component: './guest/userList',
              },
              {
                path: '/guest/addUser',
                name: 'addUser',
                component: './guest/addUser',
                hideInMenu: true,
              },
              {
                path: '/guest/detail',
                name: 'detail',
                component: './guest/detail',
                hideInMenu: true,
              },
              {
                path: '/guest/upload',
                name: 'upload',
                component: './guest/upload',
              },
              {
                path: '/guest/manage',
                name: 'manage',
                component: './guest/manage',
                hideInMenu: true,
              },
            ],
          },
          {
            path: '/video',
            name: 'video',
            icon: 'VideoCameraOutlined',
            routes: [
              {
                path: '/video/upload',
                name: 'upload',
                component: './video/upload',
              },
              {
                path: '/video/manage',
                name: 'manage',
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
