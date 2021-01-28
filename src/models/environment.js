import {
  addEnvironment as addPic,
  getEnvironment as getPic,
  deleEnvironment as delePic,
} from '@/services/environment';
import { message } from 'antd';
import { history } from 'umi';

const EnvironmentModel = {
  namespace: 'environment',
  state: {
    environmentList: [],
  },
  effects: {
    *addEnvironment({ payload }, { call }) {
      const response = yield call(addPic, payload);
      const { status } = response;
      if (status === 'ok') {
        message.success('录入成功！');
        setTimeout(() => {
          history.push('/environment/manage');
        }, 1000);
      } else {
        message.error('录入数据错误，请重试！');
      }
    },

    *getEnvironmentPic(_, { call, put }) {
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
          type: 'saveEnvironmentModel',
          payload: data,
        });
      } else {
        message.error('获取数据错误，请刷新重试！');
      }
    },

    *deleEnvironmentPic({ payload }, { call, put }) {
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
            type: 'saveEnvironmentModel',
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
    saveEnvironmentModel(state, action) {
      return { ...state, environmentList: action.payload || [] };
    },
  },
};
export default EnvironmentModel;
