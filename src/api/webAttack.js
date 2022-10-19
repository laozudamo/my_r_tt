import request from '@/utils/request.js'

// 获取攻击列表
export function attackList (params) {
  return request({
    url: '/security/attack/intrusion/list',
    method: 'get',
    params
  })
}