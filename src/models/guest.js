import { addGuest as addPic } from '@/services/guest';
import { message } from 'antd';
import { history } from 'umi';

const GuestModel = {
  namespace: 'guest',
  state: {
    guestList: [],
  },
  effects: {
    *addGuest({ payload }, { call }) {
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
    saveGuestModel(state, action) {
      return { ...state, guestList: action.payload || [] };
    },
  },
};
export default GuestModel;
