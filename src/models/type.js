import { getAllType, deleType as dele, addType as add } from '@/services/type';
import { message } from 'antd';
import { history } from 'umi';

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

    *deleType({ payload }, { call }) {
      const { type, value } = payload;
      const response = yield call(dele, { type, value });
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

    *addType({ payload }, { call }) {
      const { type, typeName, typeId } = payload;
      const response = yield call(add, { type, typeName, typeId });
      const { status } = response;
      if (status === 'ok') {
        if (type === 'picture') {
          message.success('添加类型成功！');
          setTimeout(() => {
            history.go(0);
          }, 1000);
        } else if (type === 'video') {
          message.success('添加类型成功！');
          setTimeout(() => {
            history.go(0);
          }, 1000);
        } else {
          message.error('添加数据失败，请重试！');
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
