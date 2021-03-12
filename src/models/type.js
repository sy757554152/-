import { getAllType, deleType as dele, addType as add } from '@/services/type';
import { message } from 'antd';

const TypeModel = {
  namespace: 'type',
  state: {
    pictureType: [],
    videoType: [],
  },
  effects: {
    *getType({ payload }, { call, put }) {
      const { type } = payload;
      const response = yield call(getAllType, { type });
      const { status, data = [] } = response;
      if (status === 'ok') {
        data.filter((val, index) => {
          const arrData = val;
          const key = index + 1;
          arrData.key = key.toString();
          return arrData;
        });
        if (type === 'picture') {
          yield put({
            type: 'savePictureType',
            payload: data,
          });
        } else if (type === 'video') {
          yield put({
            type: 'saveVideoType',
            payload: data,
          });
        }
      } else {
        message.error('获取数据失败，请刷新页面重试！');
      }
    },

    *deleType({ payload }, { call, put }) {
      const { type, value } = payload;
      const response = yield call(dele, { type, value });
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getAllType, { type });
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          data.filter((val, index) => {
            const arrData = val;
            const key = index + 1;
            arrData.key = key.toString();
            return arrData;
          });
          if (type === 'picture') {
            yield put({
              type: 'savePictureType',
              payload: data,
            });
          } else if (type === 'video') {
            yield put({
              type: 'saveVideoType',
              payload: data,
            });
          }
          message.success('删除成功');
        } else {
          message.error('获取信息错误，请刷新重试');
        }
      } else {
        message.error('删除数据错误，请重试！');
      }
    },

    *addType({ payload }, { call, put }) {
      const { type, typeName, typeId } = payload;
      const response = yield call(add, { type, typeName, typeId });
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(getAllType, { type });
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          data.filter((val, index) => {
            const arrData = val;
            const key = index + 1;
            arrData.key = key.toString();
            return arrData;
          });
          if (type === 'picture') {
            yield put({
              type: 'savePictureType',
              payload: data,
            });
          } else if (type === 'video') {
            yield put({
              type: 'saveVideoType',
              payload: data,
            });
          }
          message.success('添加成功');
        } else {
          message.error('获取信息错误，请刷新重试');
        }
      } else {
        message.error('添加数据失败，请重试！');
      }
    },
  },

  reducers: {
    savePictureType(state, action) {
      return { ...state, pictureType: action.payload || [] };
    },
    saveVideoType(state, action) {
      return { ...state, videoType: action.payload || [] };
    },
  },
};
export default TypeModel;
