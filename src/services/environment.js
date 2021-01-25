import request from '@/utils/request';

export async function addEnvironment(params) {
  return request('/api/environment/addEnvironment', {
    method: 'POST',
    data: params,
  });
}
