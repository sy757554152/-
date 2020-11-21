import { queryCurrent, query as queryUsers, addManager, searchManager } from '@/services/user';
import { getToken } from '@/utils/cookie';
import { message } from 'antd';
import { history } from 'umi';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    ManagerList: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const name = getToken('userName');
      const id = getToken('token');
      const payload = {
        name,
        id,
      };
      const response = yield call(queryCurrent, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *addUser({ payload }, { call }) {
      // console.log(payload)
      const { id } = payload;
      const res = yield call(searchManager, id);
      const { status } = res;
      if (status === 'ok') {
        const response = yield call(addManager, payload);
        const { status: userStatus } = response;
        if (userStatus === 'ok') {
          message.success('添加成功！');
          setTimeout(() => {
            history.push('/welcome');
          }, 3000);
        } else {
          message.error('添加错误，请重试');
        }
      } else {
        message.error('用户id重复，请重新输入！');
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
