import request from '@/utils/request';

export async function addGuest(params) {
  return request('/api/guest/addGuest', {
    method: 'POST',
    data: params,
  });
}

export async function getGuest() {
  return request('/api/guest/getGuest', {
    method: 'GET',
  });
}

export async function deleGuest(params) {
  return request('/api/guest/deleGuest', {
    method: 'POST',
    data: params,
  });
}
