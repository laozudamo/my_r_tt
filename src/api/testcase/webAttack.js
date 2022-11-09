import request from '@/utils/request.js'

export function list (params) {

  // type 2
  return request({
    url: '/security/webattack/intrusion/usecase/list?type=2',
    method: 'get',
    params
  })
}

export function create (data) {
  return request({
    url: '/security/webattack/intrusion/usecase/create',
    method: 'post',
    data
  })
}

// 搜索库
export function search (params) {
  return request({
    url: 'attack/intrusion/classes/search',
    method: 'get',
    params
  })
}

export function update (data) {
  return request({
    url: '/security/webattack/intrusion/usecase/update',
    method: 'put',
    data
  })
}

export function copy (data) {
  return request({
    url: 'security/webattack/intrusion/usecase/copy',
    method: 'post',
    data
  })
}

export function details (params) {
  return request({
    url: '/security/webattack/intrusion/usecase/details',
    method: 'get',
    params
  })
}

export function del (data) {
  return request({
    url: '/security/webattack/intrusion/usecase/delete',
    method: 'delete',
    data
  })
}