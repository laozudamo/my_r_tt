import request from '@/utils/request.js'

export function list(params) {
  return request({
      url: '/configuration/list',
      method: 'get',
      params
  })
}

export function details(params){
  return request({
      url:'configuration/detalis',
      params
  })
}

export function create(data){
  return request({
      url:'configuration/create',
      method:"post",
      data
  })
}

export function del(data){
  return request({
      url:'configuration/delete',
      method:'delete',
      data
  })
}

export function update(data){
  return request({
      url:'configuration/update',
      method:'put',
      data
  })
}

export function copy(data){
  return request({
      url:'configuration/copy',
      method:'post',
      data
  })
}