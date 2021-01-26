import { addVideo as add, getVideo as get, deleVideo as dele } from '@/services/video';
import { message } from 'antd';
import { history } from 'umi';

const VideoModel = {
  namespace: 'video',
  state: {
    videoList: [],
  },
  effects: {
    *addVideo({ payload }, { call }) {
      const response = yield call(add, payload);
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

    *getVideo(_, { call, put }) {
      const response = yield call(get);
      const { status, data } = response;
      if (status === 'ok') {
        yield put({
          type: 'saveVideoModel',
          payload: data,
        });
      } else {
        message.error('获取数据错误，请刷新重试！');
      }
    },

    *deleVideo({ payload }, { call, put }) {
      const { value = {} } = payload;
      const response = yield call(dele, value);
      const { status } = response;
      if (status === 'ok') {
        const res = yield call(get);
        const { data = [], status: sign } = res;
        if (sign === 'ok') {
          yield put({
            type: 'saveVideoModel',
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
    saveVideoModel(state, action) {
      return { ...state, videoList: action.payload || [] };
    },
  },
};
export default VideoModel;
