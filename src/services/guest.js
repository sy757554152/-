import request from '@/utils/request';

export async function addGuest(params) {
  return request('/api/guest/addGuest', {
    method: 'POST',
    data: params,
  });
}
