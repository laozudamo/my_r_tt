import request from '@/utils/request.js'

// 子
function webDet (id) {

  function list (params) {
    return request({
      url: `attack/intrusion/list?intrusion_class_id=${id}`,
      method: 'get',
      params
    })
  }

  function create (data) {
    return request({
      url: 'attack/intrusion/create',
      method: 'post',
      data
    })
  }

  function update (data) {
    return request({
      url: 'attack/intrusion/update',
      method: 'put',
      data
    })
  }

  function details (params) {
    return request({
      url: 'attack/intrusion',
      method: 'get',
      params
    })
  }

  function copy (data) {
    return request({
      url: 'attack/intrusion/copy',
      method: 'post',
      data
    })
  }

  function del (data) {
    return request({
      url: 'attack/intrusion/delete',
      method: 'delete',
      data
    })
  }

  return {
    list,
    create,
    update,
    del,
    copy,
    details
  }
}

// fu
function webClass () {
  function list (params) {
    return request({
      url: 'attack/intrusion/classes/list?type=2',
      method: 'get',
      params
    })
  }

  function create (data) {
    return request({
      url: 'attack/intrusion/classes/create',
      method: 'post',
      data
    })
  }

  function update (data) {
    return request({
      url: 'attack/intrusion/classes/update',
      method: 'put',
      data
    })
  }

  function details (params) {
    return request({
      url: 'attack/intrusion/classes/details',
      method: 'get',
      params
    })
  }

  function copy (data) {
    return request({
      url: 'attack/intrusion/classes/copy',
      method: 'post',
      data
    })
  }

  function del (data) {
    return request({
      url: 'attack/intrusion/classes/delete',
      method: 'delete',
      data
    })
  }

  return {
    list,
    create,
    update,
    del,
    copy,
    details
  }
}

export {
  webDet,
  webClass
}
