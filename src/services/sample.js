import request from '@/utils/request';

export async function addSample(params) {
  return request('/api/sample/addSample', {
    method: 'POST',
    data: params,
  });
}

export async function getSample(params) {
  return request('/api/sample/getSample', {
    method: 'GET',
    params,
  });
}

export async function deleSample(params) {
  return request('/api/sample/deleSample', {
    method: 'POST',
    data: params,
  });
}

export async function changeSample(params) {
  return request('/api/sample/changeSample', {
    method: 'POST',
    data: params,
  });
}

export async function searchSample(params) {
  return request('/api/sample/searchSample', {
    method: 'GET',
    params,
  });
}
