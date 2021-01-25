import request from '@/utils/request';

export async function addVideo(params) {
  return request('/api/video/addVideo', {
    method: 'POST',
    data: params,
  });
}
