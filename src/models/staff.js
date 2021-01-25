import {
  addStaff as add,
  getStaff as getAllStaff,
  deleStaff as dele,
  addStaffPic as addPic,
} from '@/services/staff';
import { message } from 'antd';
import { history } from 'umi';

const StaffModel = {
  namespace: 'staff',
  state: {
    staffList: [],
  },
  effects: {
    *addStaff({ payload }, { call }) {
      const response = yield call(add, payload);
      const { status } = response;
      if (status === 'ok') {
        message.success('录入成功！');
        setTimeout(() => {
          history.go(0);
        }, 1000);
      } else {
        message.error('录入数据错误，请重试！');
      }
    },

    *addStaffPic({ payload }, { call }) {
      const response = yield call(addPic, payload);
      const { status } = response;
      if (status === 'ok') {
        message.success('录入成功！');
        setTimeout(() => {
          history.go(0);
        }, 1000);
      } else {
        message.error('录入数据错误，请重试！');
      }
    },

    *getStaff(_, { call, put }) {
      const response = yield call(getAllStaff);
      const { status, data } = response;
      if (status === 'ok') {
        yield put({
          type: 'saveStaffList',
          payload: data,
        });
      } else {
        message.error('获取数据错误，请刷新重试！');
      }
    },
    *deleStaff({ payload }, { call, put }) {
      const { value = {} } = payload;
      const response = yield call(dele, value);
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getAllStaff);
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          yield put({
            type: 'saveStaffList',
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
  },

  reducers: {
    saveStaffList(state, action) {
      return { ...state, staffList: action.payload || [] };
    },
  },
};
export default StaffModel;
