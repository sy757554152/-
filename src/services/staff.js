import request from '@/utils/request';

export async function addStaff(params) {
  return request('/api/staff/addStaff', {
    method: 'POST',
    data: params,
  });
}

export async function getStaff() {
  return request('/api/staff/getStaff', {
    method: 'GET',
  });
}

export async function deleStaff(params) {
  return request('/api/staff/deleStaff', {
    method: 'POST',
    data: params,
  });
}
