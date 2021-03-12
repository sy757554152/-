import {
  addGuest as addPic,
  getGuest as getPic,
  deleGuest as delePic,
  getUserList,
  deleUser as deleUserList,
  searchUser,
  addUser as addUserList,
  changeUser as changeUserValue,
  searchGuest as searchPic,
  changeGuest as change,
} from '@/services/guest';
import { message } from 'antd';
import { history } from 'umi';

function userMerge(arr) {
  const data = [];
  const params = arr;
  params.forEach((value) => {
    const userValue = value;
    const { userId, title, staffName, staffId } = userValue;
    let flag = true;
    data.map((val) => {
      if (val.userId === userId) {
        flag = false;
        const workValue = {
          title,
          staffName,
          staffId,
        };
        val.work.push(workValue);
      }
      return val;
    });
    if (flag) {
      userValue.work = [];
      const workValue = {
        title,
        staffName,
        staffId,
      };
      userValue.work.push(workValue);
      data.push(userValue);
    }
  });
  return data;
}

const GuestModel = {
  namespace: 'guest',
  state: {
    guestList: [],
    userList: [],
  },
  effects: {
    *addGuest({ payload }, { call }) {
      const { fs, userId } = payload;
      const response = yield call(addPic, fs);
      const { status } = response;
      if (status === 'ok') {
        message.success('录入成功！');
        setTimeout(() => {
          history.push({
            pathname: '/guest/manage',
            query: {
              value: { userId },
            },
          });
        }, 1000);
      } else {
        message.error('录入数据错误，请重试！');
      }
    },

    *getGuest({ payload }, { call, put }) {
      const response = yield call(getPic, payload);
      const { status, data } = response;
      if (status === 'ok') {
        data.filter((val, index) => {
          const arrData = val;
          const key = index + 1;
          arrData.key = key.toString();
          return arrData;
        });
        yield put({
          type: 'saveGuestModel',
          payload: data,
        });
      } else {
        message.error('获取数据错误，请刷新重试！');
      }
    },

    *deleGuest({ payload }, { call, put }) {
      const { value = {}, userId } = payload;
      const response = yield call(delePic, value);
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getPic, { userId });
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          data.filter((val, index) => {
            const arrData = val;
            const key = index + 1;
            arrData.key = key.toString();
            return arrData;
          });
          yield put({
            type: 'saveGuestModel',
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

    *getUser(_, { call, put }) {
      const response = yield call(getUserList);
      const { status, data } = response;
      if (status === 'ok') {
        data.filter((val, index) => {
          const arrData = val;
          const key = index + 1;
          arrData.key = key.toString();
          return arrData;
        });
        const dataValue = userMerge(data);
        yield put({
          type: 'saveUserList',
          payload: dataValue,
        });
      } else {
        message.error('获取数据错误，请刷新重试！');
      }
    },

    *deleUser({ payload }, { call, put }) {
      const { value = {} } = payload;
      const response = yield call(deleUserList, value);
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getUserList);
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          data.filter((val, index) => {
            const arrData = val;
            const key = index + 1;
            arrData.key = key.toString();
            return arrData;
          });
          const dataValue = userMerge(data);
          yield put({
            type: 'saveUserList',
            payload: dataValue,
          });
          message.success('删除成功！');
        } else {
          message.error('获取信息错误，请刷新重试');
        }
      } else {
        message.error('删除错误，请重试');
      }
    },

    *searchUserList({ payload }, { call, put }) {
      const response = yield call(searchUser, payload);
      const { data = [], status } = response;
      if (status === 'ok') {
        data.filter((val, index) => {
          const arrData = val;
          const key = index + 1;
          arrData.key = key.toString();
          return arrData;
        });
        yield put({
          type: 'saveUserList',
          payload: data,
        });
        message.success('查找成功！');
      } else {
        message.error('查找失败，请刷新重试！');
      }
    },

    *addUser({ payload }, { call }) {
      const response = yield call(addUserList, payload);
      const { status } = response;
      if (status === 'ok') {
        message.success('添加成功！');
        setTimeout(() => {
          history.push('/guest/userList');
        }, 1000);
      } else {
        message.error('添加失败，请刷新重试！');
      }
    },

    *changeUser({ payload }, { call }) {
      const response = yield call(changeUserValue, payload);
      const { status } = response;
      if (status === 'ok') {
        message.success('修改成功！');
        setTimeout(() => {
          history.push('/guest/userList');
        }, 1000);
      } else {
        message.error('修改失败，请刷新重试！');
      }
    },

    *searchGuest({ payload }, { call, put }) {
      const response = yield call(searchPic, payload);
      const { data, status } = response;
      if (status === 'ok') {
        data.filter((val, index) => {
          const arrData = val;
          const key = index + 1;
          arrData.key = key.toString();
          return arrData;
        });
        yield put({
          type: 'saveGuestModel',
          payload: data,
        });
        message.success('查找成功！');
      } else {
        message.error('查找错误，请刷新重试');
      }
    },

    *changeGuest({ payload, callback }, { call, put }) {
      const { fs, userId } = payload;
      const response = yield call(change, fs);
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getPic, { userId });
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          data.filter((val, index) => {
            const arrData = val;
            const key = index + 1;
            arrData.key = key.toString();
            return arrData;
          });
          yield put({
            type: 'saveGuestModel',
            payload: data,
          });
          message.success('修改成功！');
          callback(true);
        } else {
          message.error('获取信息错误，请刷新重试');
          callback(false);
        }
      } else {
        message.error('修改数据错误，请刷新重试！');
        callback(false);
      }
    },
  },

  reducers: {
    saveGuestModel(state, action) {
      return { ...state, guestList: action.payload || [] };
    },
    saveUserList(state, action) {
      return { ...state, userList: action.payload || [] };
    },
  },
};
export default GuestModel;
