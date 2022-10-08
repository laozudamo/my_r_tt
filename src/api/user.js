import request from '@/utils/request'


export function login(data) {
    return request({
        url: '/users/login',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: '/users/logout',
        method: 'DELETE',
    })
}

export function getInfo() {
    return request({
        url: '/users/details',
        method: 'post',
    })
}

export function getOperateLog(params) {
    return request({
        url: '/users/action/list',
        params
    })
}