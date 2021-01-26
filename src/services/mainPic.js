import request from '@/utils/request';

export async function addMainPic(params) {
  return request('/api/mainpic/addMainPic', {
    method: 'POST',
    data: params,
  });
}

export async function getMainPic() {
  return request('/api/mainpic/getMainPic', {
    method: 'GET',
  });
}

export async function deleMainPic(params) {
  return request('/api/mainpic/deleMainPic', {
    method: 'POST',
    data: params,
  });
}
