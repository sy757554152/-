import request from '@/utils/request';

export async function addEnvironment(params) {
  return request('/api/environment/addEnvironment', {
    method: 'POST',
    data: params,
  });
}

export async function getEnvironment() {
  return request('/api/environment/getEnvironment', {
    method: 'GET',
  });
}

export async function deleEnvironment(params) {
  return request('/api/environment/deleEnvironment', {
    method: 'POST',
    data: params,
  });
}
