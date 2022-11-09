import request from '@/utils/request'

export function getAllUsers() {
  return request({
    url: '/users/list',
    method: 'get',
  })
}


export function addUser(data) {
  return request({
    url: '/users/add_user',
    method: 'post',
    data
  })
}

export function deleteUser(params) {
  return request({
    url: '/users/delete/',
    method: 'DELETE',
    params
  })
}


export function editUser(data) {
  return request({
    url: '/users/update/password',
    method: 'post',
    data
  })
}

export function deableUser(data) {
  return request({
    url: '/users/is_delete',
    method: 'put',
    data
  })
}