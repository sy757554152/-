import { addSample as addPic } from '@/services/sample';
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
          history.go(0);
        }, 1000);
      } else {
        message.error('录入数据错误，请重试！');
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
