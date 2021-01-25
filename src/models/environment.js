import { addEnvironment as addPic } from '@/services/environment';
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
          history.go(0);
        }, 1000);
      } else {
        message.error('录入数据错误，请重试！');
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
