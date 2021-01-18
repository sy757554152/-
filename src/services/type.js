import request from '@/utils/request';

// export async function queryCurrent(params) {
//   return request('/api/user/homePage', {
//     method: 'POST',
//     data: params,
//   });
// }
export async function getAllType(params) {
  return request('/api/type/getAllType', {
    method: 'GET',
    params,
  });
}

export async function deleType(params) {
  return request('/api/type/deleType', {
    method: 'POST',
    data: params,
  });
}

export async function addType(params) {
  return request('/api/type/addType', {
    method: 'POST',
    data: params,
  });
}
