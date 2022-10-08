import request from '@/utils/request.js'

// 接口配置
function getPortInfo () {
    return request({
        url: '/devices/show_manage/'
    })
}

function upDatePort (data) {
    return request({
        url: '/devices/config_manage/',
        method: 'post',
        data
    })
}

// 机箱上所有的板卡槽位以及板卡下的所有端口
function getCardInfo () {
    return request({
        url: '/devices/show_business/',
        method: 'post',
    })
}
// 板卡类型、端口类型
// 该接口调用需要接连服务端口
function cardPortInfo (data) {
    return request({
        url: "/devices/show_system_info/",
        method: "post",
        data
    })
}

// 机箱的系统版本
function chassisSystemInfo () {
    return request({
        method: "get",
        url: "/devices/show_system_version/",
    })
}

export {
    getPortInfo,
    upDatePort,
    getCardInfo,
    cardPortInfo,
    chassisSystemInfo,
}