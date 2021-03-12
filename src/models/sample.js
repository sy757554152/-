import {
  addSample as addPic,
  getSample as getPic,
  deleSample as delePic,
  changeSample as change,
  searchSample as searchPic,
} from '@/services/sample';
import { message } from 'antd';
import { history } from 'umi';

const SampleModel = {
  namespace: 'sample',
  state: {
    sampleList: [],
  },
  effects: {
    *addSample({ payload }, { call }) {
      const { fs, staffId } = payload;
      const response = yield call(addPic, fs);
      const { status } = response;
      if (status === 'ok') {
        message.success('录入成功！');
        setTimeout(() => {
          history.push({
            pathname: '/sample/manage',
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

    *getSample({ payload }, { call, put }) {
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
          type: 'saveSampleModel',
          payload: data,
        });
      } else {
        message.error('获取数据错误，请刷新重试！');
      }
    },

    *deleSample({ payload }, { call, put }) {
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
            type: 'saveSampleModel',
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

    *changeSample({ payload, callback }, { call, put }) {
      const { fs, staffId } = payload;
      const response = yield call(change, fs);
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
            type: 'saveSampleModel',
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

    *searchSample({ payload }, { call, put }) {
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
          type: 'saveSampleModel',
          payload: data,
        });
        message.success('查找成功！');
      } else {
        message.error('查找错误，请刷新重试');
      }
    },
  },

  reducers: {
    saveSampleModel(state, action) {
      return { ...state, sampleList: action.payload || [] };
    },
  },
};
export default SampleModel;
