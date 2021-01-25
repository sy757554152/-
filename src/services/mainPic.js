import request from '@/utils/request';

export async function addMainPic(params) {
  return request('/api/mainpic/addMainPic', {
    method: 'POST',
    data: params,
  });
}
