import request from '@/utils/request.js'

export function portList () {
  return request({
    url: '/ports/ports',
    method: 'get',
  })
}



export function cpuList (params) {
  return request({
    url: '/ports/ports',
    method: 'get',
    params
  })
}

// 这是formData
export function portBind(data) {
  return request({
    url: '/ports/ports',
    method: 'post',
    data
  })
}

// JSON
export function portUnbind(data) {
  return request({
    url: '/ports/ports',
    method: 'delete',
    data
  })
}

export function cpuBind(data) {
  return request({
    url: '/ports/cpu_cores',
    method: 'post',
    data
  })
}