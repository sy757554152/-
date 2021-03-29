import {
  addStaff as add,
  getStaff as getAllStaff,
  deleStaff as dele,
  addStaffPic as addPic,
  getStaffPic as getPic,
  deleStaffPic as delePic,
  changeStaff as change,
  changeStaffPic as changePic,
  addStaffType as addType,
  getStaffType as getType,
  deleStaffType as deleType,
} from '@/services/staff';
import { message } from 'antd';
import { history } from 'umi';

const StaffModel = {
  namespace: 'staff',
  state: {
    staffList: [],
    staffPicList: [],
    typeList: [],
  },
  effects: {
    *addStaff({ payload }, { call }) {
      const response = yield call(add, payload);
      const { status } = response;
      if (status === 'ok') {
        message.success('录入成功！');
        setTimeout(() => {
          history.push('/innerStaff/getStaff');
        }, 1000);
      } else {
        message.error('录入数据错误，请重试！');
      }
    },

    *addStaffType({ payload }, { call }) {
      const response = yield call(addType, payload);
      const { status } = response;
      if (status === 'ok') {
        message.success('添加成功！');
        setTimeout(() => {
          history.push({
            pathname: '/innerStaff/showStaffType',
          });
        }, 1000);
      } else {
        message.error('录入数据错误，请重试！');
      }
    },

    *addStaffPic({ payload }, { call }) {
      const { fs, staffId } = payload;
      const response = yield call(addPic, fs);
      const { status } = response;
      if (status === 'ok') {
        message.success('录入成功！');
        setTimeout(() => {
          history.push({
            pathname: '/uploadStaffPic/manage',
            query: {
              value: {
                staffId,
              },
            },
          });
        }, 1000);
      } else {
        message.error('录入数据错误，请重试！');
      }
    },

    *getStaff(_, { call, put }) {
      const response = yield call(getAllStaff);
      const { status, data } = response;
      if (status === 'ok') {
        data.filter((val, index) => {
          const arrData = val;
          const key = index + 1;
          arrData.key = key.toString();
          return arrData;
        });
        yield put({
          type: 'saveStaffList',
          payload: data,
        });
      } else {
        message.error('获取数据错误，请刷新重试！');
      }
    },

    *getStaffType(_, { call, put }) {
      const response = yield call(getType);
      const { status, data } = response;
      if (status === 'ok') {
        data.filter((val, index) => {
          const arrData = val;
          const key = index + 1;
          arrData.key = key.toString();
          return arrData;
        });
        yield put({
          type: 'saveTypeList',
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
          data.filter((val, index) => {
            const arrData = val;
            const key = index + 1;
            arrData.key = key.toString();
            return arrData;
          });
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
    *deleStaffType({ payload }, { call, put }) {
      const response = yield call(deleType, payload);
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getType);
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          data.filter((val, index) => {
            const arrData = val;
            const key = index + 1;
            arrData.key = key.toString();
            return arrData;
          });
          yield put({
            type: 'saveTypeList',
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

    *getStaffPic({ payload }, { call, put }) {
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
          type: 'saveStaffPicList',
          payload: data,
        });
      } else {
        message.error('获取数据错误，请刷新重试！');
      }
    },

    *deleStaffPic({ payload }, { call, put }) {
      const { value = {} } = payload;
      const { staffId } = value;
      const response = yield call(delePic, value);
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getPic, { staffId });
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          data.filter((val, index) => {
            const arrData = val;
            const key = index + 1;
            arrData.key = key.toString();
            return arrData;
          });
          yield put({
            type: 'saveStaffPicList',
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

    *changeStaff({ payload }, { call }) {
      const response = yield call(change, payload);
      const { status } = response;
      if (status === 'ok') {
        message.success('修改成功！');
        setTimeout(() => {
          history.push('/innerStaff/getStaff');
        }, 1000);
      } else {
        message.error('修改数据错误，请重试！');
      }
    },

    *changeStaffPic({ payload, callback }, { call, put }) {
      const { fs, staffId } = payload;
      const response = yield call(changePic, fs);
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getPic, { staffId });
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          data.filter((val, index) => {
            const arrData = val;
            const key = index + 1;
            arrData.key = key.toString();
            return arrData;
          });
          yield put({
            type: 'saveStaffPicList',
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
    saveStaffList(state, action) {
      return { ...state, staffList: action.payload || [] };
    },
    saveStaffPicList(state, action) {
      return { ...state, staffPicList: action.payload || [] };
    },
    saveTypeList(state, action) {
      return { ...state, typeList: action.payload || [] };
    },
  },
};
export default StaffModel;
