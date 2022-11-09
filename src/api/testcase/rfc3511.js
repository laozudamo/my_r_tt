import request from '@/utils/request.js'

function http () {

  function list (params) {
    return request({
      url: '/cases/http_test',
      method: 'get',
      params
    })
  }

  function create (data) {
    return request({
      url: '/cases/http_test',
      method: 'post',
      data
    })
  }

  function update (data) {
    return request({
      url: 'cases/http_test',
      method: 'patch',
      data
    })
  }

  function copy (data) {
    return request({
      url: 'cases/http_copy',
      method: 'post',
      data
    })
  }

  function details (params) {
    return request({
      url: 'cases/http_detail',
      method: 'get',
      params
    })
  }

  function del (data) {
    return request({
      url: 'cases/http_test',
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

function https () {

  function list (params) {
    return request({
      url: '/cases/https_test',
      method: 'get',
      params
    })
  }

  function create (data) {
    return request({
      url: '/cases/https_test',
      method: 'post',
      data
    })
  }

  function update (data) {
    return request({
      url: 'cases/https_test',
      method: 'patch',
      data
    })
  }

  function copy (data) {
    return request({
      url: 'cases/https_copy',
      method: 'post',
      data
    })
  }

  function details (params) {
    return request({
      url: 'cases/https_detail',
      method: 'get',
      params
    })
  }

  function del (data) {
    return request({
      url: 'cases/https_test',
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
  http,
  https
}