import request from '@/utils/request';

export async function addVideo(params) {
  return request('/api/video/addVideo', {
    method: 'POST',
    data: params,
  });
}

export async function getVideo() {
  return request('/api/video/getVideo', {
    method: 'GET',
  });
}

export async function deleVideo(params) {
  return request('/api/video/deleVideo', {
    method: 'POST',
    data: params,
  });
}
