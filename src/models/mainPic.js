import { addMainPic as addPic } from '@/services/mainPic';
import { message } from 'antd';
import { history } from 'umi';

const MainPicModel = {
  namespace: 'mainPic',
  state: {
    mainPicList: [],
  },
  effects: {
    *addMainPic({ payload }, { call }) {
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
    saveMainPicModel(state, action) {
      return { ...state, MainPicModel: action.payload || [] };
    },
  },
};
export default MainPicModel;
