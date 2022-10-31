import request from '@/utils/request.js'

export function list (params) {
  return request({
    url: '/cases/fuzz_test',
    method: 'get',
    params
  })
}

export function create (data) {
  return request({
    url: '/cases/fuzz_test',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: 'cases/fuzz_test',
    method: 'patch',
    data
  })
}

export function del (data) {
  return request({
    url: 'cases/fuzz_test',
    method: 'delete',
    data
  })
}