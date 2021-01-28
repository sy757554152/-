import { addSample as addPic, getSample as getPic, deleSample as delePic } from '@/services/sample';
import { message } from 'antd';
import { history } from 'umi';

const SampleModel = {
  namespace: 'sample',
  state: {
    sampleList: [],
  },
  effects: {
    *addSample({ payload }, { call }) {
      const response = yield call(addPic, payload);
      const { status } = response;
      if (status === 'ok') {
        message.success('录入成功！');
        setTimeout(() => {
          history.push('/sample/manage');
        }, 1000);
      } else {
        message.error('录入数据错误，请重试！');
      }
    },

    *getSample(_, { call, put }) {
      const response = yield call(getPic);
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
      const response = yield call(delePic, value);
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getPic);
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
  },

  reducers: {
    saveSampleModel(state, action) {
      return { ...state, sampleList: action.payload || [] };
    },
  },
};
export default SampleModel;
