import {
  queryCurrent,
  query as queryUsers,
  addManager,
  searchManager,
  getAllManager,
  DeleManager,
  changePassword as changePass,
  checkPassword,
} from '@/services/user';
import { getToken } from '@/utils/cookie';
import { message } from 'antd';
import { history } from 'umi';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    managerList: [],
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
            history.push('/staffManagement/allManager');
          }, 3000);
        } else {
          message.error('添加错误，请重试');
        }
      } else {
        message.error('用户id重复，请重新输入！');
      }
    },

    *getAllUser({ payload }, { call, put }) {
      const { currentUser: UserData = {} } = payload;
      const id = getToken('token');
      const { userid = id } = UserData;
      const response = yield call(getAllManager, { userid });
      const { data = [], status } = response;
      if (status === 'ok') {
        data.filter((val, index) => {
          const value = val;
          const key = index + 1;
          value.key = key.toString();
          return value;
        });
        yield put({
          type: 'saveAllUser',
          payload: data,
        });
      } else {
        message.error('获取信息错误，请刷新重试');
      }
    },

    *deleManager({ payload }, { call, put }) {
      const { value = {} } = payload;
      const response = yield call(DeleManager, value);
      const { status } = response;
      if (status === 'ok') {
        const userid = getToken('token');
        const res = yield call(getAllManager, { userid });
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          data.filter((val, index) => {
            const arrData = val;
            const key = index + 1;
            arrData.key = key.toString();
            return arrData;
          });
          yield put({
            type: 'saveAllUser',
            payload: data,
          });
          message.success('删除成功！');
        } else {
          message.error('获取信息错误，请刷新重试');
        }
      } else {
        message.error('删除错误，请重试');
      }
    },

    *changePassword({ payload }, { call }) {
      const { userid, newPassword, oldPassword } = payload;
      const response = yield call(checkPassword, { userid, oldPassword });
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(changePass, { userid, newPassword });
        const { status: sign } = res;
        if (sign === 'ok') {
          message.success('修改成功！');
          setTimeout(() => {
            history.push('/welcome');
          }, 3000);
        } else {
          message.error('修改失败，请重试！');
        }
      } else {
        message.error('旧密码错误，请重试');
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    saveAllUser(state, action) {
      return { ...state, managerList: action.payload || [] };
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
