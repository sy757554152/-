import request from '@/utils/request';

export async function deleForm(params) {
  return request('/api/form/deleForm', {
    method: 'POST',
    data: params,
  });
}

export async function getForm(params) {
  return request('/api/form/getForm', {
    method: 'GET',
    params,
  });
}
