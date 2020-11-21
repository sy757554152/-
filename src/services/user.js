import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent(params) {
  return request('/api/user/homePage', {
    method: 'POST',
    data: params,
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function addManager(params) {
  return request('/api/user/addManager', {
    method: 'POST',
    data: params,
  });
}

export async function searchManager(params) {
  return request('/api/user/searchManager', {
    method: 'GET',
    params,
  });
}

export async function getAllManager() {
  return request('/api/user/getAllManager');
}
