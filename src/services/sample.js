import request from '@/utils/request';

export async function addSample(params) {
  return request('/api/sample/addSample', {
    method: 'POST',
    data: params,
  });
}

export async function getSample() {
  return request('/api/sample/getSample', {
    method: 'GET',
  });
}

export async function deleSample(params) {
  return request('/api/sample/deleSample', {
    method: 'POST',
    data: params,
  });
}
