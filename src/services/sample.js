import request from '@/utils/request';

export async function addSample(params) {
  return request('/api/sample/addSample', {
    method: 'POST',
    data: params,
  });
}
