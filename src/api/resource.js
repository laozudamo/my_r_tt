import request from '@/utils/request.js'

// 获取网络拓扑模版列表
export function topuLists (params) {
  return request({
    url: 'configuration/list',
    method: 'get',
    params
  })
}

// 获取网络拓扑详情接口
export function topuDetail(id) {
  return request({
    url: `configuration/detalis?pk=${id}`,
    method: 'get',
  })
}

// 修改网络拓扑内容接口
export function putTopu(data) {
  return request({
    url: 'configuration/update',
    method: 'put',
    data
  })
}

//TODO 等待修改 删除网络拓扑对象接口
export function topuDel(data) {
  return request({
    url: 'configuration/delete',
    method: 'put',
    data
  })
}

//创建网络拓扑对象接口
export function newTopu (data) {
  return request({
    url: 'configuration/create',
    method: 'post',
    data
  })
}
