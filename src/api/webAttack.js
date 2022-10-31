import request from '@/utils/request.js'

// 获取攻击列表
export function attackList (params) {
  return request({
    url: '/security/attack/intrusion/list',
    method: 'get',
    params
  })
}

// 获取攻击库分类列表接口
export function attackClass (params) {
  return request({
    url: 'security/attack/intrusion/classes',
    method: 'get',
    params
  })
}

// 删除攻击接口
export function attackdel (data) {
  return request({
    url: '/security/attack/intrusion/delete',
    method: 'delete',
    data
  })
}

// 修改攻击接口
export function attackUpdate (data) {
  return request({
    url: '/security/attack/intrusion/update',
    method: 'put',
    data
  })
}

// 新建攻击接口
export function attackCreate (data) {
  return request({
    url: '/security/attack/intrusion/create',
    method: 'post',
    data
  })
}

// 获取攻击详情接口
export function attackDetail (params) {
  return request({
    url: '/security/attack/intrusion',
    method: 'get',
    params
  })
}

export function copy(data){
  return request({
      url:`/security/attack/intrusion/copy`,
      method:'post',
      data
  })
}