import request from '@/utils/request.js'

function protocol (type) {

  function list (params) {
    return request({
      url: `/cases/${type}_test`,
      method: 'get',
      params
    })
  }

  function create (data) {
    return request({
      url: `/cases/${type}_test`,
      method: 'post',
      data
    })
  }

  function update (data) {
    return request({
      url: `cases/${type}_test`,
      method: 'patch',
      data
    })
  }

  function copy (data) {
    return request({
      url: `cases/${type}_copy`,
      method: 'post',
      data
    })
  }

  function details (params) {
    return request({
      url: `cases/${type}_detail`,
      method: 'get',
      params
    })
  }

  function del (data) {
    return request({
      url: `cases/${type}_test`,
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
export { protocol }