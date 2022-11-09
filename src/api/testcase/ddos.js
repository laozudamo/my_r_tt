import request from '@/utils/request'

// 待修改
function ddos (type) {
  function list (params) {
    return request({
      url: `cases/attack/dos/list_query?protocol_server_type=${type}`,
      method: 'get',
      params
    })
  }

  function create (data) {
    return request({
      url: `cases/attack/dos/list_create?protocol_server_type=${type}`,
      method: 'post',
      data
    })
  }


  function update (data) {
    return request({
      url: `cases/attack/dos/list_update?protocol_server_type=${type}`,
      method: 'put',
      data
    })
  }

  function del (data) {
    return request({
      url: 'cases/attack/dos/list_delete',
      method: 'delete',
      data
    })
  }

  function copy (data) {
    return request({
      url: 'cases/attack/dos/cpy',
      method: 'post',
      data
    })
  }

  function details (params) {
    return request({
      url: 'cases/attack/dos/detail',
      method: 'get',
      params
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
  ddos
}
