import request from '@/utils/request.js'

// 任务列表接口
export function list (params) {
  return request({
    url: '/tasks/task',
    method: 'get',
    params
  })
}

// 新增任务接口
export function create (data) {
  return request({
    url: '/tasks/task',
    method: 'post',
    data
  })
}

// 修改一条任务接口
export function update (data) {
  return request({
    url: '/tasks/task',
    method: 'patch',
    data
  })
}

// 修改一条任务接口
export function del (params) {
  return request({
    url: '/tasks/task',
    method: 'delete',
    params
  })
}