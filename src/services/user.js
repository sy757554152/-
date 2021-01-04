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

export async function getAllManager(params) {
  return request('/api/user/getAllManager', {
    method: 'GET',
    params,
  });
}

export async function DeleManager(params) {
  return request('/api/user/DeleManager', {
    method: 'POST',
    data: params,
  });
}

export async function checkPassword(params) {
  return request('/api/user/checkPassword', {
    method: 'POST',
    data: params,
  });
}

export async function changePassword(params) {
  return request('/api/user/changePassword', {
    method: 'POST',
    data: params,
  });
}
