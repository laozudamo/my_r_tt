import request from '@/utils/request.js'

export function list (params) {
  return request({
    url: '/configuration/fuzz',
    method: 'get',
    params
  })
}

export function create (data) {
  return request({
    url: '/configuration/fuzz',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/configuration/fuzz',
    method: 'patch',
    data
  })
}

export function details (params) {
  return request({
    url: '/configuration/fuzz_detail',
    method: 'get',
    params
  })
}

export function copy (data) {
  return request({
    url: '/configuration/fuzz_copy',
    method: 'post',
    data
  })
}

export function del (data) {
  return request({
    url: '/configuration/fuzz',
    method: 'delete',
    data
  })
}