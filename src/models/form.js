import { getForm as getData, deleForm as dele, searchForm as search } from '@/services/form';
import { message } from 'antd';
import { history } from 'umi';

const FormModel = {
  namespace: 'form',
  state: {
    callList: [],
    alreadyList: [],
  },
  effects: {
    *getForm({ payload }, { call, put }) {
      const { type } = payload;
      const response = yield call(getData, { type });
      const { status, data = [] } = response;
      if (status === 'ok') {
        data.filter((val, index) => {
          const arrData = val;
          const key = index + 1;
          arrData.key = key.toString();
          return arrData;
        });
        if (type === false) {
          yield put({
            type: 'saveCallList',
            payload: data,
          });
        } else if (type === true) {
          yield put({
            type: 'saveAlreadyList',
            payload: data,
          });
        }
      } else {
        message.error('获取数据失败，请刷新页面重试！');
      }
    },

    *deleForm({ payload }, { call }) {
      const { value } = payload;
      const response = yield call(dele, { value });
      const { status } = response;
      if (status === 'ok') {
        message.success('删除成功！');
        setTimeout(() => {
          history.go(0);
        }, 1000);
      } else {
        message.error('删除数据错误，请重试！');
      }
    },

    *searchForm({ payload }, { call, put }) {
      const { type } = payload;
      const response = yield call(search, payload);
      const { status, data = [] } = response;
      if (status === 'ok') {
        data.filter((val, index) => {
          const arrData = val;
          const key = index + 1;
          arrData.key = key.toString();
          return arrData;
        });
        if (type === false) {
          yield put({
            type: 'saveCallList',
            payload: data,
          });
        } else if (type === true) {
          yield put({
            type: 'saveAlreadyList',
            payload: data,
          });
        }
      } else {
        message.error('获取数据失败，请刷新页面重试！');
      }
    },
  },

  reducers: {
    saveCallList(state, action) {
      return { ...state, callList: action.payload || [] };
    },
    saveAlreadyList(state, action) {
      return { ...state, alreadyList: action.payload || [] };
    },
  },
};
export default FormModel;
