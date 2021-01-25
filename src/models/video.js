import { addVideo as add } from '@/services/video';
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
  },

  reducers: {
    saveVideoModel(state, action) {
      return { ...state, videoList: action.payload || [] };
    },
  },
};
export default VideoModel;
