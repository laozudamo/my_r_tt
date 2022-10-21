import request from '@/utils/request.js'

// DDos
function DDosType (type) {
  function list (params) {
    return request({
      url: `cases/attack/dos/list_query?protocol_server_type=${type}`,
      method: 'get',
      params
    })
  }

  // 新增
  function create (data) {
    return request({
      url: `cases/attack/dos/list_create`,
      method: 'post',
      data
    })
  }

  // 修改
  function update (data) {
    return request({
      url: `cases/attack/dos/list_update`,
      method: 'patch',
      data
    })
  }

  // 删除
  function del (data) {
    return request({
      url: 'cases/attack/dos/list_delete',
      method: 'delete',
      data
    })
  }

  function copy (params) {
    return request({
      url: 'cases/attack/dos/cpy',
      method: 'post',
      params
    })
  }

  function detail (params) {
    return request({
      url: `cases/attack/dos/detail`,
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
    detail
  }
}

export {
  DDosType
}