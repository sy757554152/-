import {
  addMainPic as addPic,
  getMainPic as getPic,
  deleMainPic as delePic,
} from '@/services/mainPic';
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

    *getMainPic(_, { call, put }) {
      const response = yield call(getPic);
      const { status, data } = response;
      if (status === 'ok') {
        yield put({
          type: 'saveMainPicModel',
          payload: data,
        });
      } else {
        message.error('获取数据错误，请刷新重试！');
      }
    },

    *deleMainPic({ payload }, { call, put }) {
      const { value = {} } = payload;
      const response = yield call(delePic, value);
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getPic);
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          yield put({
            type: 'saveMainPicModel',
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
    saveMainPicModel(state, action) {
      return { ...state, mainPicList: action.payload || [] };
    },
  },
};
export default MainPicModel;
