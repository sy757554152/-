import request from '@/utils/request';

export async function addGuest(params) {
  return request('/api/guest/addGuest', {
    method: 'POST',
    data: params,
  });
}

export async function getGuest(params) {
  return request('/api/guest/getGuest', {
    method: 'GET',
    params,
  });
}

export async function deleGuest(params) {
  return request('/api/guest/deleGuest', {
    method: 'POST',
    data: params,
  });
}

export async function getUserList() {
  return request('/api/guest/getUserList', {
    method: 'GET',
  });
}

export async function deleUser(params) {
  return request('/api/guest/deleUser', {
    method: 'POST',
    data: params,
  });
}

export async function searchUser(params) {
  return request('/api/guest/searchUser', {
    method: 'POST',
    data: params,
  });
}

export async function addUser(params) {
  return request('/api/guest/addUser', {
    method: 'POST',
    data: params,
  });
}

export async function changeUser(params) {
  return request('/api/guest/changeUser', {
    method: 'POST',
    data: params,
  });
}

export async function searchGuest(params) {
  return request('/api/guest/searchGuest', {
    method: 'GET',
    params,
  });
}

export async function changeGuest(params) {
  return request('/api/guest/changeGuest', {
    method: 'POST',
    data: params,
  });
}
